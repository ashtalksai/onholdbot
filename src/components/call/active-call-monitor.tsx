"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CallBridgeDiagram } from "./call-bridge-diagram";
import { AudioVisualizer } from "./audio-visualizer";
import { IVRPathDisplay } from "./ivr-path-display";
import { ArrowLeft, PhoneOff, Bell, BellOff, Music } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Call, CallStatusEvent, UserCallState, BotState, CompanyState } from "@/types";

interface ActiveCallMonitorProps {
  call: Call;
  onBack?: () => void;
  onEnd?: () => void;
}

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}

export function ActiveCallMonitor({
  call,
  onBack,
  onEnd,
}: ActiveCallMonitorProps) {
  // Simulated real-time state (in production: SSE from /api/calls/[id]/status)
  const [elapsed, setElapsed] = useState(0);
  const [audioLevel, setAudioLevel] = useState(0.3);
  const [userState, setUserState] = useState<UserCallState>("muted");
  const [botState, setBotState] = useState<BotState>("active");
  const [companyState, setCompanyState] = useState<CompanyState>(
    call.status === "holding" ? "hold" : call.status === "human" ? "human" : "ringing"
  );

  // Timer effect
  useEffect(() => {
    const interval = setInterval(() => {
      setElapsed((e) => e + 1);
      // Simulate audio level fluctuation
      setAudioLevel(0.2 + Math.random() * 0.5);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const isHolding = companyState === "hold";
  const isHuman = companyState === "human" || userState === "live";

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b px-4 py-3 flex items-center justify-between">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back
        </Button>
        <Button variant="destructive" size="sm" onClick={onEnd}>
          <PhoneOff className="w-4 h-4 mr-1" />
          End Call
        </Button>
      </header>

      {/* Main content */}
      <main className="flex-1 p-4 md:p-6 max-w-lg mx-auto w-full">
        {/* Company info */}
        <div className="text-center mb-6">
          <h1 className="text-xl font-bold">{call.companyName || "Unknown Company"}</h1>
          <p className="text-muted-foreground">{call.phoneNumber}</p>
        </div>

        {/* Bridge diagram */}
        <Card className="p-4 mb-6">
          <CallBridgeDiagram
            userState={userState}
            botState={botState}
            companyState={companyState}
          />
        </Card>

        {/* Status display */}
        <div className="text-center mb-6">
          {isHolding ? (
            <>
              <div className="flex items-center justify-center gap-2 text-amber-600 mb-2">
                <Music className="w-5 h-5" />
                <span className="font-semibold text-lg">HOLDING</span>
              </div>
              <p className="text-4xl font-mono font-bold mb-1">
                {formatTime(elapsed)}
              </p>
              <p className="text-sm text-muted-foreground">time on hold</p>
            </>
          ) : isHuman ? (
            <>
              <Badge className="bg-green-500 text-lg px-4 py-1 mb-2">
                HUMAN DETECTED
              </Badge>
              <p className="text-green-600 font-medium">
                Connecting you now...
              </p>
            </>
          ) : (
            <>
              <Badge variant="secondary" className="text-lg px-4 py-1 mb-2">
                NAVIGATING
              </Badge>
              <p className="text-muted-foreground">
                AI is navigating the phone menu
              </p>
            </>
          )}
        </div>

        {/* Audio visualizer */}
        {isHolding && (
          <Card className="p-4 mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-muted-foreground">Hold music detected</span>
              <AudioVisualizer level={audioLevel} isActive={isHolding} />
            </div>
            <p className="text-xs text-muted-foreground text-center">
              Listening for human voice...
            </p>
          </Card>
        )}

        {/* IVR path taken */}
        {call.ivrPath.length > 0 && (
          <Card className="p-4 mb-6">
            <h3 className="text-sm font-medium mb-2">IVR path taken:</h3>
            <IVRPathDisplay steps={call.ivrPath} compact />
          </Card>
        )}

        {/* Alert channels */}
        <Card className="p-4">
          <h3 className="text-sm font-medium mb-2">Alert when human picks up:</h3>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" defaultChecked className="rounded" />
              Push
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" defaultChecked className="rounded" />
              SMS
            </label>
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            You&apos;ll be unmuted instantly. No redialing.
          </p>
        </Card>
      </main>
    </div>
  );
}
