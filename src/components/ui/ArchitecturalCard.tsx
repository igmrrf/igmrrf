"use client";

import React from "react";
import { LucideIcon, Layers, Cpu, ShieldCheck, Zap } from "lucide-react";

interface ArchitecturalCardProps {
  index: number;
  title: string;
  desc: string;
  iconType?: "rsc" | "system" | "security" | "perf";
}

const ICONS: Record<string, LucideIcon> = {
  rsc: Layers,
  system: Cpu,
  security: ShieldCheck,
  perf: Zap,
};

export function ArchitecturalCard({
  title,
  desc,
  index,
  iconType = "system",
}: ArchitecturalCardProps) {
  const Icon = ICONS[iconType] || Cpu;

  return (
    <div className="flex flex-col gap-6 p-8 md:p-10 border-r border-b border-border bg-background/60 hover:bg-muted/40 transition-colors relative h-full group">
      <div className="flex items-center justify-between">
        <div className="p-2 border border-border bg-accent/30 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
          <Icon className="h-5 w-5" />
        </div>
        <span className="text-[10px] font-mono text-muted-foreground font-bold">
          0{index}
        </span>
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-black uppercase tracking-tight italic group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {desc}
        </p>
      </div>

      {/* Industrial Corner Accent */}
      <div className="absolute top-0 right-0 w-1.5 h-1.5 border-r border-t border-primary/40 opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  );
}
