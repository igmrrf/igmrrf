"use client";

import { Component, type ReactNode, useState } from "react";
import dynamic from "next/dynamic";
import { LayoutGrid, Network, GitMerge, Box } from "lucide-react";
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

const SpatialGraphView = dynamic(() => import("./views/SpatialGraphView"), {
  ssr: false,
  loading: () => <p role="status" className="p-8 font-mono text-sm">Loading the 3D explorer…</p>,
});

class GraphBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? <p role="status" className="p-8 text-muted-foreground">This visualization could not load. Select Matrix Grid to browse the full toolkit.</p> : this.props.children; }
}

export type ViewType = "matrix" | "nodegraph" | "radial" | "spatial";

interface TechStackViewerProps {
  data: ParsedTechStack;
}

export default function TechStackViewer({ data }: TechStackViewerProps) {
  const [currentView, setCurrentView] = useState<ViewType>("matrix");

  const views = [
    { id: "matrix" as const, label: "Matrix Grid", icon: LayoutGrid },
    { id: "nodegraph" as const, label: "2D Graph", icon: Network },
    { id: "radial" as const, label: "Radial Map", icon: GitMerge },
    { id: "spatial" as const, label: "3D Explorer", icon: Box },
  ];

  return (
    <div className="w-full h-full flex flex-col relative">
      {/* Top View Selector Bar */}
      <div aria-label="Visualization mode" className="relative z-30 flex flex-wrap justify-center gap-1 bg-background/90 border border-border p-2">
        {views.map((view) => {
          const Icon = view.icon;
          const isActive = currentView === view.id;
          return (
            <button
              key={view.id}
              aria-pressed={isActive}
              onClick={() => setCurrentView(view.id)}
              className={`flex items-center justify-center gap-2 px-3 py-3 text-xs font-mono transition-colors whitespace-nowrap ${
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
      <div className={`w-full ${currentView === "matrix" ? "" : "h-[65dvh] min-h-[460px]"}`}>
        {currentView === "matrix" && (
          <StackMatrixView hierarchy={data.hierarchy} />
        )}
        <GraphBoundary key={currentView}>
        {currentView === "nodegraph" && <NodeGraphView data={data.graph} />}
        {currentView === "radial" && (
          <RadialMindMapView data={data.hierarchy} />
        )}
        {currentView === "spatial" && <SpatialGraphView data={data.graph} />}
        </GraphBoundary>
      </div>
    </div>
  );
}
