"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Network, Globe2, GitMerge } from "lucide-react";

// Dynamically load all views to prevent SSR and bundle bloat
const NodeGraphView = dynamic(() => import("./views/NodeGraphView"), {
  ssr: false,
});
const WordSphereView = dynamic(() => import("./views/WordSphereView"), {
  ssr: false,
});
const RadialMindMapView = dynamic(() => import("./views/RadialMindMapView"), {
  ssr: false,
});

export type ViewType = "nodegraph" | "wordsphere" | "radial";

interface TechStackViewerProps {
  data: {
    graph: any;
    hierarchy: any;
  };
}

export default function TechStackViewer({ data }: TechStackViewerProps) {
  const [currentView, setCurrentView] = useState<ViewType>("nodegraph");

  const views = [
    { id: "nodegraph", label: "Node Graph", icon: Network },
    { id: "wordsphere", label: "Word Sphere", icon: Globe2 },
    { id: "radial", label: "Radial Map", icon: GitMerge },
  ] as const;

  return (
    <div className="w-full h-full flex flex-col relative">
      <div className="absolute top-2 left-2 right-2 md:top-4 md:left-1/2 md:right-auto md:-translate-x-1/2 z-50 flex bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md md:rounded-full rounded-xl shadow-lg border border-gray-200/50 dark:border-zinc-800/50 p-1.5 overflow-x-auto scrollbar-hide">
        {views.map((view) => {
          const Icon = view.icon;
          const isActive = currentView === view.id;
          return (
            <button
              key={view.id}
              onClick={() => setCurrentView(view.id)}
              className={`flex flex-col md:flex-row items-center gap-1 md:gap-2 px-3 py-2 md:px-4 md:py-2 rounded-lg md:rounded-full text-[10px] md:text-sm font-semibold transition-all whitespace-nowrap min-w-[33%] md:min-w-0 ${
                isActive
                  ? "bg-foreground text-background shadow-md"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <Icon size={18} className={isActive ? "" : ""} />
              {view.label}
            </button>
          );
        })}
      </div>

      {/* View Content */}
      <div className="grow w-full h-full">
        {currentView === "nodegraph" && <NodeGraphView data={data.graph} />}
        {currentView === "wordsphere" && <WordSphereView data={data.graph} />}
        {currentView === "radial" && (
          <RadialMindMapView data={data.hierarchy} />
        )}
      </div>
    </div>
  );
}
