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
    const callId = url.searchParams.get("callId");
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

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
            statusCallback: `${appUrl}/api/webhooks/twilio/conference?conference=${conferenceName}&callId=${callId}`,
          }, conferenceName!);
        } else if (role === "target") {
          // Target company - start conference on their answer
          dial.conference({
            startConferenceOnEnter: true,
            endConferenceOnExit: true,
            statusCallbackEvent: ["join", "leave", "mute", "hold", "speaker"],
            statusCallback: `${appUrl}/api/webhooks/twilio/conference?conference=${conferenceName}&callId=${callId}`,
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
      
      case "gather-ivr": {
        // Gather DTMF input for IVR navigation
        const gather = response.gather({
          numDigits: 1,
          action: `${appUrl}/api/webhooks/twilio/voice?action=ivr-response&conference=${conferenceName}&callId=${callId}`,
          timeout: 10,
        });
        gather.say("I'll help you navigate. What option do you need?");
        
        // If no input, just hold
        response.redirect(`${appUrl}/api/webhooks/twilio/voice?action=hold&conference=${conferenceName}&callId=${callId}`);
        break;
      }
      
      case "ivr-response": {
        // Handle IVR digit press
        const formData = await request.formData();
        const digits = formData.get("Digits") as string;
        
        if (digits) {
          // Play the digit tone and redirect back to hold
          response.play({ digits });
        }
        
        response.redirect(`${appUrl}/api/webhooks/twilio/voice?action=hold&conference=${conferenceName}&callId=${callId}`);
        break;
      }
      
      case "hold": {
        // Just wait in the conference
        response.pause({ length: 30 });
        response.redirect(`${appUrl}/api/webhooks/twilio/voice?action=hold&conference=${conferenceName}&callId=${callId}`);
        break;
      }

      default: {
        // Default: simple response
        response.say("Welcome to OnHoldBot. Please wait while we connect your call.");
        response.pause({ length: 1 });
        
        // Join the conference to stay connected
        if (conferenceName) {
          const dial = response.dial();
          dial.conference({
            startConferenceOnEnter: true,
            endConferenceOnExit: true,
            statusCallbackEvent: ["join", "leave", "mute", "hold", "speaker"],
            statusCallback: `${appUrl}/api/webhooks/twilio/conference?conference=${conferenceName}&callId=${callId}`,
          }, conferenceName);
        }
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
