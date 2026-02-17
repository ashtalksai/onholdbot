"use client";

import { cn } from "@/lib/utils";

interface AudioVisualizerProps {
  level: number; // 0-1
  bars?: number;
  className?: string;
  isActive?: boolean;
}

export function AudioVisualizer({
  level,
  bars = 8,
  className,
  isActive = true,
}: AudioVisualizerProps) {
  return (
    <div
      className={cn(
        "flex items-end justify-center gap-1 h-8",
        className
      )}
    >
      {Array.from({ length: bars }).map((_, i) => {
        // Create varied heights based on position and level
        const baseHeight = 20 + Math.sin(i * 0.8) * 15;
        const height = isActive ? baseHeight + level * 60 : 10;
        
        return (
          <div
            key={i}
            className={cn(
              "w-1 rounded-full transition-all",
              isActive ? "bg-violet-500 audio-bar" : "bg-slate-300"
            )}
            style={{
              height: `${Math.min(height, 100)}%`,
              animationDelay: `${i * 0.1}s`,
              animationPlayState: isActive ? "running" : "paused",
            }}
          />
        );
      })}
    </div>
  );
}
