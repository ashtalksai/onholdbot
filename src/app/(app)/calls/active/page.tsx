"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ActiveCallMonitor } from "@/components/call/active-call-monitor";
import { ReconnectScreen } from "@/components/call/reconnect-screen";
import type { Call } from "@/types";

// Mock active call
const mockActiveCall: Call = {
  id: "active-1",
  userId: "user-1",
  companyName: "Comcast Billing",
  phoneNumber: "1-800-934-6489",
  reason: "Billing dispute",
  status: "holding",
  ivrPath: [
    { input: "2", prompt: "Press 2 for billing", timestamp: Date.now() - 120000 },
    { input: "3", prompt: "Press 3 for account issues", timestamp: Date.now() - 90000 },
  ],
  startedAt: new Date(Date.now() - 22 * 60 * 1000),
  holdDuration: 22 * 60,
};

export default function ActiveCallPage() {
  const router = useRouter();
  const [call, setCall] = useState<Call>(mockActiveCall);
  const [humanDetected, setHumanDetected] = useState(false);

  // Simulate human detection after 5 seconds (for demo)
  // In production: SSE from /api/calls/[id]/status
  // useEffect(() => {
  //   const timer = setTimeout(() => setHumanDetected(true), 5000);
  //   return () => clearTimeout(timer);
  // }, []);

  const handleBack = () => {
    router.push("/dashboard");
  };

  const handleEnd = () => {
    // In production: POST to /api/calls/[id]/end
    router.push("/dashboard");
  };

  const handleSavePath = (path: string[]) => {
    // In production: POST to /api/paths
    console.log("Saving path:", path);
  };

  if (humanDetected) {
    return (
      <ReconnectScreen
        call={call}
        onEnd={handleEnd}
        onSavePath={handleSavePath}
      />
    );
  }

  return (
    <ActiveCallMonitor
      call={call}
      onBack={handleBack}
      onEnd={handleEnd}
    />
  );
}
