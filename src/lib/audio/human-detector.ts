/**
 * Human Detection Module
 * 
 * Detects when a human agent picks up vs hold music/IVR prompts.
 * Uses audio analysis patterns:
 * - Hold music: repetitive patterns, consistent volume
 * - IVR: structured prompts with pauses, DTMF tones
 * - Human: variable speech patterns, conversational cadence
 */

import OpenAI from "openai";

export interface AudioAnalysisResult {
  isHuman: boolean;
  confidence: number;
  transcription?: string;
  reason: string;
}

// Pattern indicators
const IVR_PHRASES = [
  "press 1",
  "press 2",
  "press 3",
  "say or press",
  "for billing",
  "for technical",
  "for account",
  "main menu",
  "please hold",
  "your call is important",
  "estimated wait time",
  "all representatives are busy",
  "for english",
  "para español",
  "please listen carefully",
  "menu has changed",
  "thank you for calling",
];

const HUMAN_INDICATORS = [
  "how can i help you",
  "how may i help",
  "what can i do for you",
  "good morning",
  "good afternoon",
  "my name is",
  "speaking with",
  "who am i speaking",
  "can i get your",
  "what's your account",
  "let me pull up",
  "one moment please",
  "bear with me",
  "i understand",
  "i can help",
  "sorry to hear",
];

export function analyzeTranscription(text: string): AudioAnalysisResult {
  const normalized = text.toLowerCase();
  
  // Check for IVR indicators
  const ivrMatches = IVR_PHRASES.filter(phrase => normalized.includes(phrase));
  if (ivrMatches.length > 0) {
    return {
      isHuman: false,
      confidence: Math.min(0.9, 0.5 + ivrMatches.length * 0.1),
      transcription: text,
      reason: `IVR detected: "${ivrMatches[0]}"`,
    };
  }
  
  // Check for human indicators
  const humanMatches = HUMAN_INDICATORS.filter(phrase => normalized.includes(phrase));
  if (humanMatches.length > 0) {
    return {
      isHuman: true,
      confidence: Math.min(0.95, 0.6 + humanMatches.length * 0.1),
      transcription: text,
      reason: `Human speech detected: "${humanMatches[0]}"`,
    };
  }
  
  // Analyze speech patterns
  const words = text.split(/\s+/).length;
  const hasQuestionMark = text.includes("?");
  const isConversational = words > 5 && hasQuestionMark;
  
  if (isConversational) {
    return {
      isHuman: true,
      confidence: 0.65,
      transcription: text,
      reason: "Conversational speech pattern detected",
    };
  }
  
  // Default: uncertain, probably still IVR/hold
  return {
    isHuman: false,
    confidence: 0.4,
    transcription: text,
    reason: "No clear indicators, defaulting to non-human",
  };
}

/**
 * Transcribe audio buffer using OpenAI Whisper
 */
export async function transcribeAudio(
  audioBuffer: Buffer,
  openai: OpenAI
): Promise<string | null> {
  try {
    // Create a Blob from the buffer for the OpenAI API
    const blob = new Blob([new Uint8Array(audioBuffer)], { type: "audio/wav" });
    const file = new File([blob], "audio.wav", { type: "audio/wav" });
    
    const response = await openai.audio.transcriptions.create({
      file,
      model: "whisper-1",
      language: "en",
    });
    
    return response.text;
  } catch (error) {
    console.error("Transcription error:", error);
    return null;
  }
}

/**
 * Analyze audio characteristics
 * For MVP: uses simple amplitude/silence detection
 */
export function analyzeAudioCharacteristics(samples: number[]): {
  isSilence: boolean;
  isMusic: boolean;
  isSpeech: boolean;
  averageAmplitude: number;
} {
  if (samples.length === 0) {
    return {
      isSilence: true,
      isMusic: false,
      isSpeech: false,
      averageAmplitude: 0,
    };
  }
  
  const avg = samples.reduce((a, b) => a + Math.abs(b), 0) / samples.length;
  const max = Math.max(...samples.map(Math.abs));
  
  // Calculate variance for pattern detection
  const variance = samples.reduce((sum, s) => sum + Math.pow(Math.abs(s) - avg, 2), 0) / samples.length;
  const stdDev = Math.sqrt(variance);
  
  // Silence detection
  const isSilence = avg < 0.01;
  
  // Music tends to have consistent amplitude with low variance
  const isMusic = !isSilence && stdDev < avg * 0.3 && avg > 0.05;
  
  // Speech has variable amplitude with higher variance
  const isSpeech = !isSilence && stdDev > avg * 0.4;
  
  return {
    isSilence,
    isMusic,
    isSpeech,
    averageAmplitude: avg,
  };
}

/**
 * HumanDetector class - manages detection state across multiple audio chunks
 */
export class HumanDetector {
  private speechChunksInARow = 0;
  private silenceChunksInARow = 0;
  private lastTranscription: string | null = null;
  private openai: OpenAI | null = null;
  private onHumanDetected: ((result: AudioAnalysisResult) => void) | null = null;
  
  constructor(options?: {
    openaiApiKey?: string;
    onHumanDetected?: (result: AudioAnalysisResult) => void;
  }) {
    if (options?.openaiApiKey) {
      this.openai = new OpenAI({ apiKey: options.openaiApiKey });
    }
    this.onHumanDetected = options?.onHumanDetected || null;
  }
  
  /**
   * Process an audio chunk and determine if human detected
   */
  async processChunk(audioBuffer: Buffer): Promise<AudioAnalysisResult | null> {
    // Convert buffer to samples (assuming 16-bit PCM)
    const samples: number[] = [];
    for (let i = 0; i < audioBuffer.length; i += 2) {
      const sample = audioBuffer.readInt16LE(i) / 32768;
      samples.push(sample);
    }
    
    const characteristics = analyzeAudioCharacteristics(samples);
    
    if (characteristics.isSilence) {
      this.silenceChunksInARow++;
      this.speechChunksInARow = 0;
      return null;
    }
    
    if (characteristics.isMusic) {
      // Likely hold music - reset counters
      this.speechChunksInARow = 0;
      this.silenceChunksInARow = 0;
      return null;
    }
    
    if (characteristics.isSpeech) {
      this.speechChunksInARow++;
      this.silenceChunksInARow = 0;
      
      // After 3+ chunks of speech, transcribe and analyze
      if (this.speechChunksInARow >= 3 && this.openai) {
        const transcription = await transcribeAudio(audioBuffer, this.openai);
        
        if (transcription && transcription.trim().length > 0) {
          this.lastTranscription = transcription;
          const result = analyzeTranscription(transcription);
          
          if (result.isHuman && result.confidence > 0.6) {
            this.onHumanDetected?.(result);
            return result;
          }
        }
      }
    }
    
    return null;
  }
  
  reset() {
    this.speechChunksInARow = 0;
    this.silenceChunksInARow = 0;
    this.lastTranscription = null;
  }
}
