"use client";

import { Suspense, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ActiveCallMonitor } from "@/components/call/active-call-monitor";
import { ReconnectScreen } from "@/components/call/reconnect-screen";
import { useCallStatus } from "@/lib/hooks/use-call-status";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, AlertCircle } from "lucide-react";
import Link from "next/link";
import type { Call } from "@/types";

function ActiveCallContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callId = searchParams.get("id");

  const [call, setCall] = useState<Call | null>(null);
  const [loading, setLoading] = useState(true);
  const [humanDetected, setHumanDetected] = useState(false);

  const { status, error, isConnected, unmute, endCall } = useCallStatus({
    callId: callId || "",
    onHumanDetected: () => setHumanDetected(true),
    onCallEnded: () => router.push("/dashboard"),
  });

  // Fetch initial call data
  useEffect(() => {
    if (!callId) {
      setLoading(false);
      return;
    }

    fetch(`/api/calls/${callId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.call) {
          setCall(data.call);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [callId]);

  // Update call with real-time status
  useEffect(() => {
    if (call && status) {
      setCall((prev) =>
        prev
          ? {
              ...prev,
              status: status.status,
              ivrPath: status.ivrPath,
            }
          : prev
      );
    }
  }, [call, status]);

  const handleBack = () => {
    router.push("/dashboard");
  };

  const handleEnd = async () => {
    await endCall();
    router.push("/dashboard");
  };

  const handleSavePath = (path: string[]) => {
    // In production: POST to /api/paths
    console.log("Saving path:", path);
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Card className="p-8 text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-violet-600" />
          <p className="text-muted-foreground">Loading call...</p>
        </Card>
      </div>
    );
  }

  // No call ID or call not found
  if (!callId || !call) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Card className="p-8 text-center max-w-md">
          <AlertCircle className="w-12 h-12 text-amber-500 mx-auto mb-4" />
          <h2 className="text-lg font-semibold mb-2">No Active Call</h2>
          <p className="text-muted-foreground mb-6">
            There&apos;s no active call to monitor. Start a new call to get started.
          </p>
          <Link href="/calls/new">
            <Button>Start New Call</Button>
          </Link>
        </Card>
      </div>
    );
  }

  // Error state
  if (error && !isConnected) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Card className="p-8 text-center max-w-md">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-lg font-semibold mb-2">Connection Lost</h2>
          <p className="text-muted-foreground mb-6">
            We lost connection to your call. The call may still be active.
          </p>
          <div className="flex gap-3 justify-center">
            <Button variant="outline" onClick={() => window.location.reload()}>
              Retry
            </Button>
            <Link href="/dashboard">
              <Button>Back to Dashboard</Button>
            </Link>
          </div>
        </Card>
      </div>
    );
  }

  // Human detected - show reconnect screen
  if (humanDetected || call.status === "human" || call.status === "live") {
    return (
      <ReconnectScreen
        call={call}
        onEnd={handleEnd}
        onSavePath={handleSavePath}
      />
    );
  }

  // Active call monitoring
  return (
    <ActiveCallMonitor
      call={call}
      onBack={handleBack}
      onEnd={handleEnd}
      elapsedSeconds={status?.elapsedSeconds}
      audioLevel={status?.audioLevel}
    />
  );
}

export default function ActiveCallPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-[60vh]">
          <Card className="p-8 text-center">
            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-violet-600" />
            <p className="text-muted-foreground">Loading...</p>
          </Card>
        </div>
      }
    >
      <ActiveCallContent />
    </Suspense>
  );
}
