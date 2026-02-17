"use client";

import { useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CallCard } from "@/components/call/call-card";
import { Plus, Clock, ArrowRight } from "lucide-react";
import type { Call, CallStatus, IVRStep } from "@/types";

// Mock data
const mockLiveCall: Call = {
  id: "live-1",
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
};

const mockRecentCalls: Call[] = [
  {
    id: "1",
    userId: "user-1",
    companyName: "IRS",
    phoneNumber: "1-800-829-1040",
    status: "ended",
    ivrPath: [
      { input: "2", timestamp: Date.now() },
      { input: "1", timestamp: Date.now() },
      { input: "0", timestamp: Date.now() },
    ],
    startedAt: new Date(Date.now() - 60 * 60 * 1000),
    endedAt: new Date(Date.now() - 15 * 60 * 1000),
    holdDuration: 47 * 60,
  },
  {
    id: "2",
    userId: "user-1",
    companyName: "Aetna",
    phoneNumber: "1-800-123-4567",
    status: "ended",
    ivrPath: [
      { input: "1", timestamp: Date.now() },
      { input: "2", timestamp: Date.now() },
      { input: "0", timestamp: Date.now() },
    ],
    startedAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
    endedAt: new Date(Date.now() - 24 * 60 * 60 * 1000 + 35 * 60 * 1000),
    holdDuration: 31 * 60,
  },
  {
    id: "3",
    userId: "user-1",
    companyName: "AT&T",
    phoneNumber: "1-800-288-2020",
    status: "failed",
    ivrPath: [],
    startedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    endedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000 + 5 * 60 * 1000),
  },
];

// Calculate total saved time
const totalSavedSeconds = mockRecentCalls
  .filter((c) => c.status === "ended" && c.holdDuration)
  .reduce((sum, c) => sum + (c.holdDuration || 0), 0);

function formatTotalTime(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  if (hours > 0) return `${hours}h ${mins}min`;
  return `${mins}min`;
}

export default function DashboardPage() {
  const [liveCall] = useState<Call | null>(mockLiveCall);

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <Link href="/calls/new" className="md:hidden">
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            New Call
          </Button>
        </Link>
      </div>

      {/* Live call */}
      {liveCall && (
        <section>
          <div className="flex items-center gap-2 mb-3">
            <h2 className="font-semibold">Live</h2>
            <Badge className="bg-red-500 animate-pulse">1</Badge>
          </div>
          <CallCard
            call={liveCall}
            isLive
            onMonitor={() => console.log("Monitor call")}
            onEnd={() => console.log("End call")}
          />
        </section>
      )}

      {/* Recent calls */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold">Recent</h2>
          <Link
            href="/calls"
            className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1"
          >
            View all <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
        <div className="space-y-3">
          {mockRecentCalls.map((call) => (
            <CallCard
              key={call.id}
              call={call}
              onRetry={() => console.log("Retry call:", call.id)}
            />
          ))}
        </div>
      </section>

      {/* Stats */}
      <Card className="p-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
            <Clock className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Total saved this month</p>
            <p className="text-2xl font-bold text-green-600">
              {formatTotalTime(totalSavedSeconds)}
            </p>
          </div>
        </div>
      </Card>

      {/* Empty state for new users */}
      {!liveCall && mockRecentCalls.length === 0 && (
        <Card className="p-8 text-center">
          <div className="w-16 h-16 rounded-full bg-violet-100 flex items-center justify-center mx-auto mb-4">
            <Clock className="w-8 h-8 text-violet-600" />
          </div>
          <h2 className="text-lg font-semibold mb-2">No calls yet</h2>
          <p className="text-muted-foreground mb-4">
            Start your first call and never wait on hold again.
          </p>
          <Link href="/calls/new">
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Start a Call
            </Button>
          </Link>
        </Card>
      )}
    </div>
  );
}
