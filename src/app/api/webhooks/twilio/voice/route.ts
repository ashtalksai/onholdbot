import { NextRequest, NextResponse } from "next/server";
import twilio from "twilio";

const VoiceResponse = twilio.twiml.VoiceResponse;

// POST /api/webhooks/twilio/voice - Handle Twilio voice events
export async function POST(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const action = url.searchParams.get("action");
    const conferenceName = url.searchParams.get("conference");
    const role = url.searchParams.get("role"); // "user" or "target"

    const response = new VoiceResponse();

    switch (action) {
      case "join-conference": {
        // Join the conference
        const dial = response.dial();
        
        if (role === "user") {
          // User joins muted, we handle their audio
          dial.conference({
            muted: true,
            startConferenceOnEnter: false,
            endConferenceOnExit: false,
            waitUrl: "", // No hold music for user
            statusCallbackEvent: ["join", "leave", "mute", "hold", "speaker"],
            statusCallback: `${process.env.NEXT_PUBLIC_APP_URL}/api/webhooks/twilio/conference?conference=${conferenceName}`,
          }, conferenceName!);
        } else if (role === "target") {
          // Target company - start conference on their answer
          dial.conference({
            startConferenceOnEnter: true,
            endConferenceOnExit: true,
            statusCallbackEvent: ["join", "leave", "mute", "hold", "speaker"],
            statusCallback: `${process.env.NEXT_PUBLIC_APP_URL}/api/webhooks/twilio/conference?conference=${conferenceName}`,
          }, conferenceName!);
        }
        break;
      }

      case "connect-user": {
        // Connect user to the existing conference
        const dial = response.dial();
        dial.conference({
          muted: true, // Start muted
          beep: "false" as const,
          startConferenceOnEnter: false,
          endConferenceOnExit: false,
        }, conferenceName!);
        break;
      }

      default: {
        // Default: simple response
        response.say("Welcome to OnHoldBot. Please wait while we connect your call.");
        response.pause({ length: 1 });
        
        // In a real implementation, we would:
        // 1. Stream audio to OpenAI for analysis
        // 2. Detect IVR prompts and respond
        // 3. Detect human voice and trigger unmute
        break;
      }
    }

    return new NextResponse(response.toString(), {
      headers: {
        "Content-Type": "application/xml",
      },
    });
  } catch (error) {
    console.error("Error in voice webhook:", error);
    
    const response = new VoiceResponse();
    response.say("An error occurred. Please try again later.");
    response.hangup();

    return new NextResponse(response.toString(), {
      headers: {
        "Content-Type": "application/xml",
      },
    });
  }
}

// Support GET for Twilio's initial requests
export async function GET(request: NextRequest) {
  return POST(request);
}
