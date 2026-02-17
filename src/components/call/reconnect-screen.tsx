"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CallBridgeDiagram } from "./call-bridge-diagram";
import { CheckCircle, PhoneOff, Save } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Call } from "@/types";

interface ReconnectScreenProps {
  call: Call;
  onEnd?: () => void;
  onSavePath?: (path: string[]) => void;
}

function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  if (mins === 0) return `${secs}s`;
  return `${mins} min ${secs}s`;
}

export function ReconnectScreen({
  call,
  onEnd,
  onSavePath,
}: ReconnectScreenProps) {
  const [showSavePrompt, setShowSavePrompt] = useState(false);

  // Vibrate on mount
  useEffect(() => {
    if (typeof navigator !== "undefined" && "vibrate" in navigator) {
      navigator.vibrate([200, 100, 200]);
    }
  }, []);

  // Show save prompt after 3s
  useEffect(() => {
    const timer = setTimeout(() => {
      if (call.ivrPath.length > 0) {
        setShowSavePrompt(true);
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, [call.ivrPath.length]);

  const holdDuration = call.holdDuration ?? 0;
  const path = call.ivrPath.map((s) => s.input);

  return (
    <div className="min-h-screen bg-green-500 flex flex-col items-center justify-center p-4 text-white">
      {/* Success icon */}
      <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center mb-6">
        <CheckCircle className="w-16 h-16 text-white" />
      </div>

      {/* Status */}
      <h1 className="text-2xl font-bold mb-2">Human on the line.</h1>
      <p className="text-green-100 mb-4">Connecting you now.</p>

      {/* Company + duration */}
      <div className="text-center mb-8">
        <p className="font-semibold text-lg">{call.companyName}</p>
        <p className="text-green-100">
          You waited: {formatDuration(holdDuration)}
        </p>
      </div>

      {/* Bridge diagram */}
      <Card className="w-full max-w-sm bg-white/10 border-white/20 p-4 mb-8">
        <div className="flex items-center justify-center gap-4">
          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mb-1">
              <span className="text-green-500 font-bold">YOU</span>
            </div>
            <Badge className="bg-white text-green-600 text-xs">live</Badge>
          </div>
          
          <div className="w-16 h-1 bg-white rounded-full" />
          
          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mb-1">
              <span className="text-green-500 text-2xl">👤</span>
            </div>
            <Badge className="bg-white text-green-600 text-xs">agent</Badge>
          </div>
        </div>
      </Card>

      {/* Instructions */}
      <p className="text-green-100 mb-8 text-center">
        You&apos;re live — speak normally.
      </p>

      {/* End call button */}
      <Button
        variant="secondary"
        size="lg"
        onClick={onEnd}
        className="mb-6"
      >
        <PhoneOff className="w-4 h-4 mr-2" />
        End Call
      </Button>

      {/* Save path prompt */}
      {showSavePrompt && path.length > 0 && (
        <Card className="w-full max-w-sm bg-white/10 border-white/20 p-4 animate-in fade-in slide-in-from-bottom-4">
          <div className="flex items-start gap-3">
            <Save className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-medium text-sm mb-1">Save path for next time?</p>
              <p className="text-xs text-green-100 mb-3">
                {path.join(" → ")}
              </p>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => {
                    onSavePath?.(path);
                    setShowSavePrompt(false);
                  }}
                >
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Save
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-white hover:bg-white/10"
                  onClick={() => setShowSavePrompt(false)}
                >
                  Dismiss
                </Button>
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
