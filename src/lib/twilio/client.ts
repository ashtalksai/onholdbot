import twilio from "twilio";
import AccessToken from "twilio/lib/jwt/AccessToken";

const VoiceGrant = AccessToken.VoiceGrant;

// Twilio client for REST API calls
export function getTwilioClient() {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;

  if (!accountSid || !authToken) {
    throw new Error("Missing Twilio credentials");
  }

  return twilio(accountSid, authToken);
}

// Generate access token for browser-based calling
export function generateAccessToken(identity: string): string {
  const accountSid = process.env.TWILIO_ACCOUNT_SID!;
  const apiKey = process.env.TWILIO_API_KEY!;
  const apiSecret = process.env.TWILIO_API_SECRET!;

  // Create access token
  const token = new AccessToken(accountSid, apiKey, apiSecret, {
    identity,
    ttl: 3600, // 1 hour
  });

  // Grant voice capability
  const voiceGrant = new VoiceGrant({
    outgoingApplicationSid: process.env.TWILIO_TWIML_APP_SID,
    incomingAllow: true,
  });

  token.addGrant(voiceGrant);

  return token.toJwt();
}

// Generate a unique conference name
export function generateConferenceName(callId: string): string {
  return `onhold-${callId}`;
}
