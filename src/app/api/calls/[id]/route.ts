import { NextRequest, NextResponse } from "next/server";
import { getCall, updateCallStatus } from "@/lib/calls";
import { getTwilioClient } from "@/lib/twilio/client";

// GET /api/calls/[id] - Get call status
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const call = getCall(id);

    if (!call) {
      return NextResponse.json(
        { error: "Call not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ call });
  } catch (error) {
    console.error("Error fetching call:", error);
    return NextResponse.json(
      { error: "Failed to fetch call" },
      { status: 500 }
    );
  }
}

// PATCH /api/calls/[id] - Update call status (manual controls)
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { action, conferenceSid, participantSid } = body;

    const call = getCall(id);
    if (!call) {
      return NextResponse.json(
        { error: "Call not found" },
        { status: 404 }
      );
    }

    const client = getTwilioClient();

    switch (action) {
      case "unmute":
        // Unmute user in Twilio conference
        updateCallStatus(id, "live");
        
        // If we have conference/participant info, unmute via API
        if (conferenceSid && participantSid) {
          try {
            await client.conferences(conferenceSid)
              .participants(participantSid)
              .update({ muted: false });
          } catch (e) {
            console.error("Failed to unmute via Twilio:", e);
          }
        }
        break;
        
      case "end":
        // End all conference legs
        updateCallStatus(id, "ended");
        
        // End the conference if we have the SID
        if (conferenceSid) {
          try {
            await client.conferences(conferenceSid)
              .update({ status: "completed" });
          } catch (e) {
            console.error("Failed to end conference via Twilio:", e);
          }
        }
        break;
        
      case "simulate-human":
        // Demo mode: simulate human detection
        if (process.env.DEMO_MODE === "true") {
          updateCallStatus(id, "human");
        }
        break;
        
      default:
        return NextResponse.json(
          { error: "Invalid action" },
          { status: 400 }
        );
    }

    return NextResponse.json({ call: getCall(id) });
  } catch (error) {
    console.error("Error updating call:", error);
    return NextResponse.json(
      { error: "Failed to update call" },
      { status: 500 }
    );
  }
}
