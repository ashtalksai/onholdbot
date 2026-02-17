"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Bell, Phone, Mail, CreditCard, User, LogOut } from "lucide-react";

export default function SettingsPage() {
  const [phone, setPhone] = useState("+1 555-123-4567");
  const [alerts, setAlerts] = useState({ push: true, sms: true, email: false });

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-6 max-w-2xl">
      <h1 className="text-2xl font-bold">Settings</h1>

      {/* Profile */}
      <Card className="p-4">
        <div className="flex items-center gap-3 mb-4">
          <User className="w-5 h-5 text-muted-foreground" />
          <h2 className="font-semibold">Profile</h2>
        </div>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Email</label>
            <p className="text-muted-foreground">john@example.com</p>
          </div>
          <div>
            <label className="text-sm font-medium block mb-1.5">Phone (for SMS alerts)</label>
            <Input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+1 555-000-0000"
            />
          </div>
        </div>
      </Card>

      {/* Notifications */}
      <Card className="p-4">
        <div className="flex items-center gap-3 mb-4">
          <Bell className="w-5 h-5 text-muted-foreground" />
          <h2 className="font-semibold">Notifications</h2>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Push notifications</p>
              <p className="text-sm text-muted-foreground">Get alerts on your device</p>
            </div>
            <Switch checked={alerts.push} onCheckedChange={(v) => setAlerts({ ...alerts, push: v })} />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">SMS alerts</p>
              <p className="text-sm text-muted-foreground">Text message when human picks up</p>
            </div>
            <Switch checked={alerts.sms} onCheckedChange={(v) => setAlerts({ ...alerts, sms: v })} />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Email notifications</p>
              <p className="text-sm text-muted-foreground">Call summaries via email</p>
            </div>
            <Switch checked={alerts.email} onCheckedChange={(v) => setAlerts({ ...alerts, email: v })} />
          </div>
        </div>
      </Card>

      {/* Plan */}
      <Card className="p-4">
        <div className="flex items-center gap-3 mb-4">
          <CreditCard className="w-5 h-5 text-muted-foreground" />
          <h2 className="font-semibold">Plan</h2>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <p className="font-medium">Free</p>
              <Badge variant="secondary">Current</Badge>
            </div>
            <p className="text-sm text-muted-foreground">3 calls per month</p>
          </div>
          <Button>Upgrade</Button>
        </div>
      </Card>

      {/* Sign out */}
      <Button variant="outline" className="w-full gap-2 text-red-600 hover:text-red-700">
        <LogOut className="w-4 h-4" />
        Sign Out
      </Button>
    </div>
  );
}
