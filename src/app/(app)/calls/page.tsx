"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { CallCard } from "@/components/call/call-card";
import { Search, Phone } from "lucide-react";
import type { Call } from "@/types";

const mockCalls: Call[] = [
  {
    id: "1",
    userId: "user-1",
    companyName: "IRS",
    phoneNumber: "1-800-829-1040",
    status: "ended",
    ivrPath: [{ input: "2", timestamp: Date.now() }, { input: "1", timestamp: Date.now() }, { input: "0", timestamp: Date.now() }],
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
    ivrPath: [{ input: "1", timestamp: Date.now() }, { input: "2", timestamp: Date.now() }],
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

export default function CallsPage() {
  const [search, setSearch] = useState("");
  const filtered = mockCalls.filter((c) =>
    c.companyName.toLowerCase().includes(search.toLowerCase()) ||
    c.phoneNumber.includes(search)
  );

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-6">
      <h1 className="text-2xl font-bold">Call History</h1>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search calls..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="space-y-3">
        {filtered.map((call) => (
          <CallCard key={call.id} call={call} onRetry={() => {}} />
        ))}
        {filtered.length === 0 && (
          <Card className="p-8 text-center">
            <Phone className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">No calls found</p>
          </Card>
        )}
      </div>
    </div>
  );
}
