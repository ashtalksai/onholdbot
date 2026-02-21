"use client";

import { useState, useEffect, useCallback } from "react";
import type { CallStatusEvent, CallStatus } from "@/types";

interface UseCallStatusOptions {
  callId: string;
  onHumanDetected?: () => void;
  onCallEnded?: () => void;
}

export function useCallStatus({
  callId,
  onHumanDetected,
  onCallEnded,
}: UseCallStatusOptions) {
  const [status, setStatus] = useState<CallStatusEvent | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (!callId) return;

    const eventSource = new EventSource(`/api/calls/${callId}/stream`);

    eventSource.onopen = () => {
      setIsConnected(true);
      setError(null);
    };

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        
        if (data.error) {
          setError(data.error);
          eventSource.close();
          return;
        }

        const newStatus = data as CallStatusEvent;
        
        // Check for human detection
        if (
          newStatus.status === "human" &&
          status?.status !== "human" &&
          onHumanDetected
        ) {
          onHumanDetected();
        }

        // Check for call end
        if (
          (newStatus.status === "ended" || newStatus.status === "failed") &&
          onCallEnded
        ) {
          onCallEnded();
        }

        setStatus(newStatus);
      } catch (e) {
        console.error("Error parsing SSE event:", e);
      }
    };

    eventSource.onerror = () => {
      setIsConnected(false);
      setError("Connection lost");
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [callId, onHumanDetected, onCallEnded, status?.status]);

  const unmute = useCallback(async () => {
    try {
      await fetch(`/api/calls/${callId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "unmute" }),
      });
    } catch (e) {
      console.error("Error unmuting:", e);
    }
  }, [callId]);

  const endCall = useCallback(async () => {
    try {
      await fetch(`/api/calls/${callId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "end" }),
      });
    } catch (e) {
      console.error("Error ending call:", e);
    }
  }, [callId]);

  return {
    status,
    error,
    isConnected,
    unmute,
    endCall,
  };
}
