/**
 * Notification Service
 * Handles SMS, Push, and Email notifications when human detected
 */

import { getTwilioClient } from "./twilio/client";
import type { Call } from "@/types";

export interface NotificationOptions {
  sms?: boolean;
  push?: boolean;
  email?: boolean;
  userPhone?: string;
  userEmail?: string;
}

export interface NotificationResult {
  sms?: { success: boolean; error?: string };
  push?: { success: boolean; error?: string };
  email?: { success: boolean; error?: string };
}

/**
 * Send SMS notification using Twilio
 */
export async function sendSmsNotification(
  to: string,
  call: Call
): Promise<{ success: boolean; error?: string }> {
  try {
    const client = getTwilioClient();
    const from = process.env.TWILIO_PHONE_NUMBER;
    
    if (!from) {
      return { success: false, error: "Twilio phone number not configured" };
    }
    
    const holdDuration = call.humanDetectedAt
      ? Math.floor((call.humanDetectedAt.getTime() - call.startedAt.getTime()) / 1000 / 60)
      : 0;
    
    const body = `🎉 Human detected on your ${call.companyName || "support"} call! ` +
      `After ${holdDuration}min on hold. ` +
      `Open OnHoldBot now to speak with them.`;
    
    await client.messages.create({
      to,
      from,
      body,
    });
    
    console.log(`SMS sent to ${to} for call ${call.id}`);
    return { success: true };
  } catch (error) {
    console.error("SMS notification error:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "SMS failed" 
    };
  }
}

/**
 * Send push notification via web-push (for PWA)
 * Note: Requires push subscription setup on client
 */
export async function sendPushNotification(
  subscription: PushSubscriptionJSON,
  call: Call
): Promise<{ success: boolean; error?: string }> {
  // For MVP, we'll implement this as a stub
  // Full implementation would use web-push library
  console.log("Push notification stub - would send to:", subscription.endpoint);
  return { success: true };
}

/**
 * Send email notification
 * Note: Would use Resend or similar in production
 */
export async function sendEmailNotification(
  to: string,
  call: Call
): Promise<{ success: boolean; error?: string }> {
  // For MVP, just log
  console.log(`Email notification stub - would send to ${to} for call ${call.id}`);
  return { success: true };
}

/**
 * Send all configured notifications for a call
 */
export async function notifyHumanDetected(
  call: Call,
  options: NotificationOptions
): Promise<NotificationResult> {
  const result: NotificationResult = {};
  
  const promises: Promise<void>[] = [];
  
  if (options.sms && options.userPhone) {
    promises.push(
      sendSmsNotification(options.userPhone, call).then((r) => {
        result.sms = r;
      })
    );
  }
  
  if (options.push) {
    // Would require stored push subscription
    result.push = { success: true }; // Stub for MVP
  }
  
  if (options.email && options.userEmail) {
    promises.push(
      sendEmailNotification(options.userEmail, call).then((r) => {
        result.email = r;
      })
    );
  }
  
  await Promise.all(promises);
  
  return result;
}

// Store for demo user notification preferences
const userNotificationPrefs = new Map<string, NotificationOptions & { userPhone?: string }>();

export function setUserNotificationPrefs(
  userId: string, 
  prefs: NotificationOptions & { userPhone?: string }
) {
  userNotificationPrefs.set(userId, prefs);
}

export function getUserNotificationPrefs(userId: string): NotificationOptions & { userPhone?: string } {
  return userNotificationPrefs.get(userId) || { sms: true, push: true, email: false };
}
