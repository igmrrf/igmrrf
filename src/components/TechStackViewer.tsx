"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { LayoutGrid, Network, GitMerge } from "lucide-react";
import { ParsedTechStack } from "@/lib/parseTechStack";
import StackMatrixView from "./views/StackMatrixView";

// Dynamically load canvas/d3 views to prevent SSR mismatch
const NodeGraphView = dynamic(() => import("./views/NodeGraphView"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center font-mono text-xs text-muted-foreground">
      Initializing 2D Graph...
    </div>
  ),
});

const RadialMindMapView = dynamic(() => import("./views/RadialMindMapView"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center font-mono text-xs text-muted-foreground">
      Initializing Radial Map...
    </div>
  ),
});

export type ViewType = "matrix" | "nodegraph" | "radial";

interface TechStackViewerProps {
  data: ParsedTechStack;
}

export default function TechStackViewer({ data }: TechStackViewerProps) {
  const [currentView, setCurrentView] = useState<ViewType>("matrix");

  const views = [
    { id: "matrix" as const, label: "Matrix Grid", icon: LayoutGrid },
    { id: "nodegraph" as const, label: "2D Graph", icon: Network },
    { id: "radial" as const, label: "Radial Map", icon: GitMerge },
  ];

  return (
    <div className="w-full h-full flex flex-col relative">
      {/* Top View Selector Bar */}
      <div className="absolute top-2 left-4 right-4 md:top-4 md:left-1/2 md:right-auto md:-translate-x-1/2 z-30 flex bg-background/90 backdrop-blur-md border border-border p-1 shadow-lg">
        {views.map((view) => {
          const Icon = view.icon;
          const isActive = currentView === view.id;
          return (
            <button
              key={view.id}
              onClick={() => setCurrentView(view.id)}
              className={`flex items-center justify-center gap-2 px-4 py-2 text-xs font-mono uppercase tracking-wider transition-all whitespace-nowrap ${
                isActive
                  ? "bg-primary text-primary-foreground font-black shadow-sm"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <Icon size={14} />
              {view.label}
            </button>
          );
        })}
      </div>

      {/* View Content */}
      <div className="grow w-full h-full pt-4">
        {currentView === "matrix" && (
          <StackMatrixView hierarchy={data.hierarchy} />
        )}
        {currentView === "nodegraph" && <NodeGraphView data={data.graph} />}
        {currentView === "radial" && (
          <RadialMindMapView data={data.hierarchy} />
        )}
      </div>
    </div>
  );
}
