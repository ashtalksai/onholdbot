import { NextRequest, NextResponse } from "next/server";
import { getCall, updateCallStatus } from "@/lib/calls";
import type { CallStatus } from "@/types";

// POST /api/webhooks/twilio/status - Handle Twilio call status events
export async function POST(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const callId = url.searchParams.get("callId");

    if (!callId) {
      return NextResponse.json({ error: "Missing callId" }, { status: 400 });
    }

    const formData = await request.formData();
    const twilioStatus = formData.get("CallStatus") as string;
    const callSid = formData.get("CallSid") as string;

    console.log(`Call ${callId} status update: ${twilioStatus} (SID: ${callSid})`);

    const call = getCall(callId);
    if (!call) {
      console.error(`Call ${callId} not found`);
      return NextResponse.json({ ok: true });
    }

    // Map Twilio status to our call status
    let newStatus: CallStatus | null = null;

    switch (twilioStatus) {
      case "initiated":
      case "ringing":
        newStatus = "initiating";
        break;
      case "in-progress":
      case "answered":
        // Call answered - start navigating/holding
        newStatus = "navigating";
        break;
      case "completed":
      case "busy":
      case "no-answer":
      case "canceled":
      case "failed":
        newStatus = twilioStatus === "completed" ? "ended" : "failed";
        break;
    }

    if (newStatus) {
      updateCallStatus(callId, newStatus);
      console.log(`Updated call ${callId} to status: ${newStatus}`);

      // TODO: Send notifications when human detected
      // This would be triggered by audio analysis, not status callbacks
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Error in status webhook:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
