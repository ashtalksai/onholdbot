import { NextRequest, NextResponse } from "next/server";
import { getCallIdByConference, updateCallStatus, addIVRStep } from "@/lib/calls";

// POST /api/webhooks/twilio/conference - Handle conference events
export async function POST(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const conferenceName = url.searchParams.get("conference");

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

    const callId = getCallIdByConference(conferenceName);
    if (!callId) {
      console.error(`No call found for conference ${conferenceName}`);
      return NextResponse.json({ ok: true });
    }

    switch (eventType) {
      case "participant-join":
        // Participant joined the conference
        console.log(`Participant joined conference: ${callSid}`);
        break;

      case "participant-leave":
        // Participant left - check if call should end
        console.log(`Participant left conference: ${callSid}`);
        break;

      case "participant-speech-start":
        // Speech detected - could be human answering
        console.log(`Speech started in conference`);
        // TODO: Analyze audio to determine if human vs IVR
        break;

      case "participant-speech-stop":
        // Speech ended
        console.log(`Speech stopped in conference`);
        break;

      case "conference-end":
        // Conference ended
        updateCallStatus(callId, "ended");
        break;
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Error in conference webhook:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
