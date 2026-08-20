"use client";

import React, { useRef, useEffect, useState } from "react";
import ForceGraph2D, { ForceGraphMethods, NodeObject } from "react-force-graph-2d";
import { useTheme } from "next-themes";
import { ZoomIn, ZoomOut, RotateCcw } from "lucide-react";

export interface CustomNode extends NodeObject {
  id: string;
  name: string;
  group: number;
  val: number;
  category?: string;
  x?: number;
  y?: number;
}

export interface CustomLink {
  source: string | CustomNode;
  target: string | CustomNode;
}

interface TechGraphProps {
  data: {
    nodes: CustomNode[];
    links: CustomLink[];
  };
}

export default function NodeGraphView({ data }: TechGraphProps) {
  const fg2DRef = useRef<ForceGraphMethods<CustomNode, CustomLink> | undefined>(undefined);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const { resolvedTheme } = useTheme();

  const isDark = resolvedTheme === "dark";

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight - 120,
      });
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleZoomIn = () => {
    if (fg2DRef.current) {
      fg2DRef.current.zoom(fg2DRef.current.zoom() * 1.3, 400);
    }
  };

  const handleZoomOut = () => {
    if (fg2DRef.current) {
      fg2DRef.current.zoom(fg2DRef.current.zoom() / 1.3, 400);
    }
  };

  const handleResetZoom = () => {
    if (fg2DRef.current) {
      fg2DRef.current.centerAt(0, 0, 800);
      fg2DRef.current.zoom(1, 800);
    }
  };

  return (
    <div className="w-full h-full overflow-hidden relative">
      {/* Zoom Controls */}
      <div className="absolute top-20 right-6 z-30 flex flex-col gap-1.5 bg-background/90 backdrop-blur-md p-1.5 border border-border">
        <button
          onClick={handleZoomIn}
          className="p-2 border border-border hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
          title="Zoom In"
          aria-label="Zoom In"
        >
          <ZoomIn size={14} />
        </button>
        <button
          onClick={handleZoomOut}
          className="p-2 border border-border hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
          title="Zoom Out"
          aria-label="Zoom Out"
        >
          <ZoomOut size={14} />
        </button>
        <button
          onClick={handleResetZoom}
          className="p-2 border border-border hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
          title="Reset View"
          aria-label="Reset View"
        >
          <RotateCcw size={14} />
        </button>
      </div>

      <ForceGraph2D
        ref={fg2DRef}
        graphData={data}
        nodeLabel="name"
        nodeAutoColorBy="group"
        nodeRelSize={5}
        width={dimensions.width}
        height={dimensions.height}
        onNodeClick={(node: CustomNode) => {
          if (node.id === "root" || !node.category) {
            if (typeof node.x === "number" && typeof node.y === "number") {
              fg2DRef.current?.centerAt(node.x, node.y, 800);
              fg2DRef.current?.zoom(2.5, 800);
            }
          } else {
            window.open(
              `https://www.google.com/search?q=${encodeURIComponent(
                node.name + " technology"
              )}`,
              "_blank"
            );
          }
        }}
        linkColor={() =>
          isDark ? "rgba(255, 255, 255, 0.12)" : "rgba(0, 0, 0, 0.12)"
        }
        backgroundColor="rgba(0,0,0,0)"
        nodeCanvasObject={(node: CustomNode, ctx: CanvasRenderingContext2D, globalScale: number) => {
          const isRoot = node.id === "root";
          const isCategory = !isRoot && !node.category;
          const label = node.name;
          const nodeRadius = isRoot ? 10 : isCategory ? 7 : 4;
          const fontSize = isRoot
            ? Math.max(14 / globalScale, 4)
            : isCategory
            ? Math.max(11 / globalScale, 3)
            : Math.max(9 / globalScale, 2);

          ctx.font = `${isRoot || isCategory ? "bold" : "normal"} ${fontSize}px JetBrains Mono, monospace`;

          const nx = node.x ?? 0;
          const ny = node.y ?? 0;

          // Draw node circle
          ctx.beginPath();
          ctx.arc(nx, ny, nodeRadius, 0, 2 * Math.PI, false);
          ctx.fillStyle = isRoot
            ? isDark
              ? "#ffffff"
              : "#000000"
            : isCategory
            ? isDark
              ? "#a1a1aa"
              : "#52525b"
            : isDark
            ? "#71717a"
            : "#a1a1aa";
          ctx.fill();

          // Border on nodes
          ctx.lineWidth = 1.5 / globalScale;
          ctx.strokeStyle = isDark ? "#27272a" : "#e4e4e7";
          ctx.stroke();

          // Render label
          if (globalScale > 0.8 || isRoot || isCategory) {
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillStyle = isDark ? "#f4f4f5" : "#18181b";
            ctx.fillText(label, nx, ny + nodeRadius + fontSize + 1);
          }
        }}
      />

      <div className="absolute bottom-4 left-6 text-[10px] font-mono bg-background/80 backdrop-blur-xs text-muted-foreground border border-border px-3 py-1.5 pointer-events-none">
        • Click any node to inspect & search • Scroll to zoom • Drag to pan
      </div>
    </div>
  );
}
