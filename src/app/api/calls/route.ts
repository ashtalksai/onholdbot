import { NextRequest, NextResponse } from "next/server";
import { getTwilioClient, generateConferenceName } from "@/lib/twilio/client";
import { createCall, setConferenceCallId, getUserCalls } from "@/lib/calls";
import { setUserNotificationPrefs } from "@/lib/notifications";

// POST /api/calls - Initiate a new call
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { phoneNumber, companyName, reason, alerts, userPhone } = body;

    if (!phoneNumber) {
      return NextResponse.json(
        { error: "Phone number is required" },
        { status: 400 }
      );
    }

    // Clean phone number
    const cleanNumber = phoneNumber.replace(/\D/g, "");
    if (cleanNumber.length < 10) {
      return NextResponse.json(
        { error: "Invalid phone number" },
        { status: 400 }
      );
    }

    // In production: get userId from auth session
    const userId = "user-demo";

    // Save notification preferences
    if (alerts || userPhone) {
      setUserNotificationPrefs(userId, {
        sms: alerts?.sms ?? true,
        push: alerts?.push ?? true,
        email: alerts?.email ?? false,
        userPhone: userPhone || undefined,
      });
    }

    // Create call record
    const call = createCall({
      userId,
      companyName: companyName || "Unknown",
      phoneNumber: `+1${cleanNumber}`,
      reason,
    });

    const conferenceName = generateConferenceName(call.id);
    setConferenceCallId(conferenceName, call.id);

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    
    // Demo mode: skip actual Twilio call
    if (process.env.DEMO_MODE === "true") {
      console.log(`[DEMO] Would call ${call.phoneNumber} from ${process.env.TWILIO_PHONE_NUMBER}`);
      return NextResponse.json({
        callId: call.id,
        conferenceName,
        status: call.status,
        demo: true,
      });
    }

    const twilioClient = getTwilioClient();

    // Call the target number and connect to conference
    // Use machineDetection to detect IVR/voicemail vs human
    await twilioClient.calls.create({
      to: call.phoneNumber,
      from: process.env.TWILIO_PHONE_NUMBER!,
      url: `${appUrl}/api/webhooks/twilio/voice?action=join-conference&conference=${conferenceName}&role=target&callId=${call.id}`,
      statusCallback: `${appUrl}/api/webhooks/twilio/status?callId=${call.id}`,
      statusCallbackEvent: ["initiated", "ringing", "answered", "completed"],
      machineDetection: "Enable",
      machineDetectionTimeout: 5,
    });

    return NextResponse.json({
      callId: call.id,
      conferenceName,
      status: call.status,
    });
  } catch (error) {
    console.error("Error initiating call:", error);
    return NextResponse.json(
      { error: "Failed to initiate call" },
      { status: 500 }
    );
  }
}

// GET /api/calls - List user's calls
export async function GET(request: NextRequest) {
  try {
    // In production: get userId from auth session
    const userId = "user-demo";
    const calls = getUserCalls(userId);

    return NextResponse.json({ calls });
  } catch (error) {
    console.error("Error fetching calls:", error);
    return NextResponse.json(
      { error: "Failed to fetch calls" },
      { status: 500 }
    );
  }
}
