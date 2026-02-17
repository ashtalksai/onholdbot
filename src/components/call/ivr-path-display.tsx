"use client";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { ChevronRight } from "lucide-react";
import type { IVRStep } from "@/types";

interface IVRPathDisplayProps {
  steps: IVRStep[];
  currentStep?: number;
  className?: string;
  compact?: boolean;
}

export function IVRPathDisplay({
  steps,
  currentStep,
  className,
  compact = false,
}: IVRPathDisplayProps) {
  if (compact) {
    // Compact mode: just show the path as chips
    return (
      <div className={cn("flex items-center gap-1 flex-wrap", className)}>
        {steps.map((step, i) => (
          <span key={i} className="flex items-center">
            <Badge
              variant={i === currentStep ? "default" : "secondary"}
              className={cn(
                "text-xs font-mono",
                i < (currentStep ?? steps.length) && "bg-green-100 text-green-700"
              )}
            >
              {step.input}
            </Badge>
            {i < steps.length - 1 && (
              <ChevronRight className="w-3 h-3 text-muted-foreground mx-0.5" />
            )}
          </span>
        ))}
        {steps.length === 0 && (
          <span className="text-sm text-muted-foreground">Navigating...</span>
        )}
      </div>
    );
  }

  // Full mode: show prompts too
  return (
    <div className={cn("space-y-2", className)}>
      {steps.map((step, i) => (
        <div
          key={i}
          className={cn(
            "flex items-start gap-3 p-2 rounded-lg transition-colors",
            i === currentStep && "bg-violet-50 border border-violet-200",
            i < (currentStep ?? steps.length) && "opacity-60"
          )}
        >
          <Badge
            variant={i === currentStep ? "default" : "secondary"}
            className="text-xs font-mono flex-shrink-0"
          >
            {step.input}
          </Badge>
          {step.prompt && (
            <p className="text-sm text-muted-foreground flex-1 line-clamp-2">
              {step.prompt}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

// Helper to convert path array to display string
export function pathToString(path: string[]): string {
  return path.join(" → ");
}
