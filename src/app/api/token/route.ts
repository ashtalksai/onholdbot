import { NextRequest, NextResponse } from "next/server";
import { generateAccessToken } from "@/lib/twilio/client";

// Generate Twilio access token for client-side calling
export async function POST(request: NextRequest) {
  try {
    // In production: get identity from auth session
    const body = await request.json().catch(() => ({}));
    const identity = body.identity || `user-${Date.now()}`;

    const token = generateAccessToken(identity);

    return NextResponse.json({
      token,
      identity,
    });
  } catch (error) {
    console.error("Error generating token:", error);
    return NextResponse.json(
      { error: "Failed to generate token" },
      { status: 500 }
    );
  }
}
