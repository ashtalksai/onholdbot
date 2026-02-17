// Call states
export type CallStatus = 
  | "initiating"   // Call being set up
  | "navigating"   // AI navigating IVR
  | "holding"      // On hold, waiting for human
  | "human"        // Human detected
  | "live"         // User unmuted, talking to human
  | "ended"        // Call complete
  | "failed";      // Call failed

export type UserCallState = "muted" | "live";
export type BotState = "active" | "idle";
export type CompanyState = "ringing" | "hold" | "human";

// IVR path step
export interface IVRStep {
  input: string;      // What was pressed/said
  prompt?: string;    // What the IVR said (optional transcript)
  timestamp: number;
}

// Call record
export interface Call {
  id: string;
  userId: string;
  companyName: string;
  phoneNumber: string;
  reason?: string;
  status: CallStatus;
  ivrPath: IVRStep[];
  startedAt: Date;
  humanDetectedAt?: Date;
  endedAt?: Date;
  holdDuration?: number;  // seconds
  savedPath?: boolean;
}

// Saved phone tree path
export interface SavedPath {
  id: string;
  userId: string;
  companyName: string;
  phoneNumber: string;
  path: string[];       // ["2", "3", "hold"]
  successRate: number;  // 0-100
  useCount: number;
  lastUsedAt: Date;
  createdAt: Date;
}

// User
export interface User {
  id: string;
  email: string;
  phone?: string;
  plan: "free" | "basic" | "pro" | "enterprise";
  callsThisMonth: number;
  alertChannels: {
    push: boolean;
    sms: boolean;
    email: boolean;
  };
  createdAt: Date;
}

// Alert
export interface Alert {
  id: string;
  callId: string;
  channel: "push" | "sms" | "email";
  sentAt: Date;
  delivered: boolean;
}

// SSE call status event
export interface CallStatusEvent {
  status: CallStatus;
  userState: UserCallState;
  botState: BotState;
  companyState: CompanyState;
  elapsedSeconds: number;
  ivrPath: IVRStep[];
  audioLevel: number;  // 0-1 for visualizer
}

// Plan limits
export const PLAN_LIMITS = {
  free: { callsPerMonth: 3, savedPaths: 5 },
  basic: { callsPerMonth: -1, savedPaths: 50 }, // -1 = unlimited
  pro: { callsPerMonth: -1, savedPaths: -1 },
  enterprise: { callsPerMonth: -1, savedPaths: -1 },
} as const;
