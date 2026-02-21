import { NextRequest, NextResponse } from "next/server";
import { getCallIdByConference, getCall, updateCallStatus, addIVRStep } from "@/lib/calls";
import { notifyHumanDetected, getUserNotificationPrefs } from "@/lib/notifications";

// Track speech events per call for human detection
const speechTracker = new Map<string, { 
  startCount: number; 
  lastStart: number;
  consecutiveSpeech: number;
}>();

// POST /api/webhooks/twilio/conference - Handle conference events
export async function POST(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const conferenceName = url.searchParams.get("conference");
    const callIdParam = url.searchParams.get("callId");

    if (!conferenceName) {
      return NextResponse.json({ error: "Missing conference name" }, { status: 400 });
    }

    const formData = await request.formData();
    const eventType = formData.get("StatusCallbackEvent") as string;
    const callSid = formData.get("CallSid") as string;
    const conferenceSid = formData.get("ConferenceSid") as string;
    const coaching = formData.get("Coaching") as string;
    const hold = formData.get("Hold") as string;
    const muted = formData.get("Muted") as string;

    console.log(`Conference ${conferenceName} event: ${eventType}`, {
      callSid,
      conferenceSid,
      coaching,
      hold,
      muted,
    });

    const callId = callIdParam || getCallIdByConference(conferenceName);
    if (!callId) {
      console.error(`No call found for conference ${conferenceName}`);
      return NextResponse.json({ ok: true });
    }

    switch (eventType) {
      case "participant-join":
        // Participant joined the conference
        console.log(`Participant joined conference: ${callSid}`);
        // Update to holding status when target joins
        updateCallStatus(callId, "holding");
        break;

      case "participant-leave":
        // Participant left - check if call should end
        console.log(`Participant left conference: ${callSid}`);
        break;

      case "participant-speech-start":
        // Speech detected - track for human detection
        console.log(`Speech started in conference`);
        
        let tracker = speechTracker.get(callId);
        if (!tracker) {
          tracker = { startCount: 0, lastStart: Date.now(), consecutiveSpeech: 0 };
          speechTracker.set(callId, tracker);
        }
        
        tracker.startCount++;
        tracker.lastStart = Date.now();
        tracker.consecutiveSpeech++;
        
        // After sustained speech (3+ speech events), might be human
        // This is a simple heuristic - IVR tends to have long pauses between prompts
        if (tracker.consecutiveSpeech >= 3) {
          const call = getCall(callId);
          if (call && call.status !== "human" && call.status !== "live") {
            // Mark as potential human detection
            console.log(`🎉 Potential human detected on call ${callId}`);
            updateCallStatus(callId, "human");
            
            // Send notifications
            const prefs = getUserNotificationPrefs(call.userId);
            notifyHumanDetected(call, prefs).catch(console.error);
          }
        }
        break;

      case "participant-speech-stop":
        // Speech ended - reset consecutive counter after pause
        console.log(`Speech stopped in conference`);
        
        // Short delay before resetting - allows for natural pauses
        setTimeout(() => {
          const t = speechTracker.get(callId);
          if (t && Date.now() - t.lastStart > 5000) {
            // More than 5 seconds since last speech start - reset
            t.consecutiveSpeech = 0;
          }
        }, 5000);
        break;

      case "conference-end":
        // Conference ended
        updateCallStatus(callId, "ended");
        speechTracker.delete(callId);
        break;
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Error in conference webhook:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
