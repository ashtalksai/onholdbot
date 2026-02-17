"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { IVRPathDisplay, pathToString } from "./ivr-path-display";
import {
  Phone,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  RotateCcw,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import type { Call, CallStatus } from "@/types";

interface CallCardProps {
  call: Call;
  onMonitor?: () => void;
  onEnd?: () => void;
  onRetry?: () => void;
  isLive?: boolean;
  className?: string;
}

function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

const STATUS_CONFIG: Record<
  CallStatus,
  { icon: typeof Phone; color: string; label: string }
> = {
  initiating: { icon: Phone, color: "text-slate-500", label: "Starting..." },
  navigating: { icon: Phone, color: "text-violet-500", label: "Navigating" },
  holding: { icon: Clock, color: "text-amber-500", label: "On hold" },
  human: { icon: CheckCircle, color: "text-green-500", label: "Human detected!" },
  live: { icon: CheckCircle, color: "text-green-500", label: "Live" },
  ended: { icon: CheckCircle, color: "text-slate-500", label: "Completed" },
  failed: { icon: XCircle, color: "text-red-500", label: "Failed" },
};

export function CallCard({
  call,
  onMonitor,
  onEnd,
  onRetry,
  isLive = false,
  className,
}: CallCardProps) {
  const config = STATUS_CONFIG[call.status];
  const Icon = config.icon;
  const holdDuration = call.holdDuration ?? 0;

  return (
    <Card
      className={cn(
        "p-4 transition-all",
        isLive && "border-violet-500 border-2 bg-violet-50/50",
        className
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold truncate">{call.companyName || "Unknown"}</h3>
            {isLive && (
              <Badge className="bg-red-500 animate-pulse text-xs">
                LIVE
              </Badge>
            )}
          </div>
          
          <p className="text-sm text-muted-foreground mb-2">
            {call.phoneNumber}
          </p>

          <div className="flex items-center gap-2 text-sm">
            <Icon className={cn("w-4 h-4", config.color)} />
            <span className={config.color}>
              {config.label}
              {call.status === "holding" && ` — ${formatDuration(holdDuration)}`}
            </span>
          </div>

          {call.ivrPath.length > 0 && (
            <div className="mt-2">
              <span className="text-xs text-muted-foreground">Path: </span>
              <IVRPathDisplay steps={call.ivrPath} compact />
            </div>
          )}

          {call.status === "ended" && call.holdDuration && (
            <p className="text-sm text-green-600 mt-2">
              Saved: {Math.floor(call.holdDuration / 60)} min
            </p>
          )}

          {call.endedAt && (
            <p className="text-xs text-muted-foreground mt-1">
              {formatDistanceToNow(new Date(call.endedAt), { addSuffix: true })}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          {isLive && onMonitor && (
            <Button size="sm" variant="outline" onClick={onMonitor}>
              <Eye className="w-4 h-4 mr-1" />
              Monitor
            </Button>
          )}
          {isLive && onEnd && (
            <Button size="sm" variant="destructive" onClick={onEnd}>
              End
            </Button>
          )}
          {call.status === "failed" && onRetry && (
            <Button size="sm" variant="outline" onClick={onRetry}>
              <RotateCcw className="w-4 h-4 mr-1" />
              Retry
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}
