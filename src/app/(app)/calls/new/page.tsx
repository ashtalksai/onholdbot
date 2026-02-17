"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Phone, Map, CheckCircle, Bot } from "lucide-react";
import Link from "next/link";
import type { SavedPath } from "@/types";

// Mock saved paths
const mockSavedPaths: SavedPath[] = [
  {
    id: "1",
    userId: "user-1",
    companyName: "Comcast Billing",
    phoneNumber: "1-800-934-6489",
    path: ["2", "3", "hold"],
    successRate: 94,
    useCount: 16,
    lastUsedAt: new Date(),
    createdAt: new Date(),
  },
  {
    id: "2",
    userId: "user-1",
    companyName: "IRS General",
    phoneNumber: "1-800-829-1040",
    path: ["2", "1", "0"],
    successRate: 61,
    useCount: 8,
    lastUsedAt: new Date(),
    createdAt: new Date(),
  },
];

export default function NewCallPage() {
  const router = useRouter();
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [reason, setReason] = useState("");
  const [useSavedPath, setUseSavedPath] = useState(true);
  const [alerts, setAlerts] = useState({ push: true, sms: true, email: false });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Find matching saved path
  const matchingPath = mockSavedPaths.find(
    (p) =>
      p.phoneNumber.replace(/\D/g, "") === phone.replace(/\D/g, "") ||
      p.companyName.toLowerCase().includes(company.toLowerCase())
  );

  // Format phone number
  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, "");
    if (digits.length <= 3) return digits;
    if (digits.length <= 6) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
    return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
  };

  const isValid = phone.replace(/\D/g, "").length >= 10 && (alerts.push || alerts.sms);

  const handleSubmit = async () => {
    if (!isValid) return;
    setIsSubmitting(true);

    // In production: POST to /api/calls
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Navigate to active call monitor
    router.push("/calls/active");
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-lg mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Link href="/dashboard">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <h1 className="text-xl font-bold">New Call</h1>
      </div>

      <div className="space-y-6">
        {/* Company name */}
        <div>
          <label className="block text-sm font-medium mb-1.5">
            Company (optional)
          </label>
          <Input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="e.g. Comcast"
          />
        </div>

        {/* Phone number */}
        <div>
          <label className="block text-sm font-medium mb-1.5">
            Their number *
          </label>
          <Input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(formatPhone(e.target.value))}
            placeholder="1-800-555-0123"
          />
        </div>

        {/* Saved path match */}
        {matchingPath && (
          <Card className="p-4 border-green-200 bg-green-50">
            <div className="flex items-start gap-3">
              <Map className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-sm">Saved path found</span>
                  <Badge variant="outline" className="text-xs border-green-500 text-green-700">
                    {matchingPath.successRate}% success
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  {matchingPath.companyName}
                </p>
                <p className="text-sm font-mono">
                  Path: {matchingPath.path.join(" → ")}
                </p>
                <label className="flex items-center gap-2 mt-3">
                  <Switch
                    checked={useSavedPath}
                    onCheckedChange={setUseSavedPath}
                  />
                  <span className="text-sm">Use this path</span>
                </label>
              </div>
            </div>
          </Card>
        )}

        {/* Reason */}
        <div>
          <label className="block text-sm font-medium mb-1.5">
            What do you need? (optional)
          </label>
          <Input
            type="text"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Billing dispute"
            maxLength={120}
          />
          <p className="text-xs text-muted-foreground mt-1">
            Helps AI explain if asked by agent
          </p>
        </div>

        {/* Alert channels */}
        <div>
          <label className="block text-sm font-medium mb-3">
            Alert me via:
          </label>
          <div className="flex flex-wrap gap-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={alerts.push}
                onChange={(e) => setAlerts({ ...alerts, push: e.target.checked })}
                className="rounded"
              />
              <span className="text-sm">Push</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={alerts.sms}
                onChange={(e) => setAlerts({ ...alerts, sms: e.target.checked })}
                className="rounded"
              />
              <span className="text-sm">SMS</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={alerts.email}
                onChange={(e) => setAlerts({ ...alerts, email: e.target.checked })}
                className="rounded"
              />
              <span className="text-sm">Email</span>
            </label>
          </div>
          {!alerts.push && !alerts.sms && (
            <p className="text-xs text-red-500 mt-2">
              Select at least Push or SMS to receive alerts
            </p>
          )}
        </div>

        {/* Submit */}
        <Button
          className="w-full gap-2"
          size="lg"
          disabled={!isValid || isSubmitting}
          onClick={handleSubmit}
        >
          {isSubmitting ? (
            "Starting call..."
          ) : (
            <>
              <Bot className="w-5 h-5" />
              Start Hold Call
            </>
          )}
        </Button>

        {/* Explainer */}
        <p className="text-xs text-center text-muted-foreground">
          You&apos;ll stay muted on the line. We&apos;ll unmute you the moment a human answers.
        </p>
      </div>
    </div>
  );
}
