"use client";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Phone, Mic, MicOff, Clock, User, CheckCircle } from "lucide-react";
import type { UserCallState, BotState, CompanyState } from "@/types";

interface CallBridgeDiagramProps {
  userState: UserCallState;
  botState: BotState;
  companyState: CompanyState;
  className?: string;
}

export function CallBridgeDiagram({
  userState,
  botState,
  companyState,
  className,
}: CallBridgeDiagramProps) {
  return (
    <div className={cn("flex items-center justify-between p-4", className)}>
      {/* User node */}
      <div className="text-center">
        <div
          className={cn(
            "w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-2 transition-all duration-300",
            userState === "live"
              ? "bg-green-500"
              : "bg-slate-300"
          )}
        >
          {userState === "live" ? (
            <Mic className="w-7 h-7 text-white" />
          ) : (
            <MicOff className="w-7 h-7 text-slate-600" />
          )}
          {userState === "live" && (
            <div className="absolute inset-0 rounded-full bg-green-500 pulse-ring" />
          )}
        </div>
        <p className="text-sm font-bold">YOU</p>
        <Badge
          variant={userState === "live" ? "default" : "secondary"}
          className={cn(
            "text-xs",
            userState === "live" && "bg-green-500"
          )}
        >
          {userState}
        </Badge>
      </div>

      {/* Connection line 1 */}
      <div className="flex-1 mx-3 h-1 relative">
        <div
          className={cn(
            "absolute inset-0 rounded-full",
            userState === "live" ? "bg-green-300" : "bg-violet-200"
          )}
        />
        {botState === "active" && (
          <div
            className={cn(
              "absolute inset-0 rounded-full connection-active",
              userState === "live" ? "text-green-500" : "text-violet-500"
            )}
          />
        )}
      </div>

      {/* Bot node */}
      <div className="text-center relative">
        <div
          className={cn(
            "w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-2 transition-all duration-300",
            botState === "active" ? "bg-violet-600" : "bg-slate-300"
          )}
        >
          <Phone className={cn("w-7 h-7", botState === "active" ? "text-white" : "text-slate-600")} />
          {botState === "active" && (
            <div className="absolute inset-0 rounded-full bg-violet-600 pulse-ring" />
          )}
        </div>
        <p className="text-sm font-bold">BOT</p>
        <Badge
          className={cn(
            "text-xs",
            botState === "active" ? "bg-violet-600" : "bg-slate-300"
          )}
        >
          {botState}
        </Badge>
      </div>

      {/* Connection line 2 */}
      <div className="flex-1 mx-3 h-1 relative">
        <div
          className={cn(
            "absolute inset-0 rounded-full",
            companyState === "human" ? "bg-green-300" : "bg-amber-200"
          )}
        />
        {(companyState === "hold" || companyState === "human") && (
          <div
            className={cn(
              "absolute inset-0 rounded-full connection-active",
              companyState === "human" ? "text-green-500" : "text-amber-500"
            )}
          />
        )}
      </div>

      {/* Company node */}
      <div className="text-center">
        <div
          className={cn(
            "w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-2 transition-all duration-300",
            companyState === "human"
              ? "bg-green-500"
              : companyState === "hold"
              ? "bg-amber-500"
              : "bg-slate-300"
          )}
        >
          {companyState === "human" ? (
            <User className="w-7 h-7 text-white" />
          ) : companyState === "hold" ? (
            <Clock className="w-7 h-7 text-white" />
          ) : (
            <Phone className="w-7 h-7 text-slate-600" />
          )}
        </div>
        <p className="text-sm font-bold">COMPANY</p>
        <Badge
          variant="outline"
          className={cn(
            "text-xs",
            companyState === "human" && "border-green-500 text-green-600 bg-green-50",
            companyState === "hold" && "border-amber-500 text-amber-600 bg-amber-50",
            companyState === "ringing" && "border-slate-300 text-slate-600"
          )}
        >
          {companyState === "human" ? "agent" : companyState}
        </Badge>
      </div>
    </div>
  );
}
