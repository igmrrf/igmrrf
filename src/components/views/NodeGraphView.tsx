"use client";

import { useRef, useEffect, useState } from "react";
import ForceGraph3D from "react-force-graph-3d";
import ForceGraph2D from "react-force-graph-2d";
import { useTheme } from "next-themes";
// @ts-ignore
import SpriteText from "three-spritetext";
import * as THREE from "three";
import { Box, Square } from "lucide-react";

interface TechGraphProps {
  data: {
    nodes: any[];
    links: any[];
  };
}

export default function TechGraph({ data }: TechGraphProps) {
  const fg3DRef = useRef<any>(null);
  const fg2DRef = useRef<any>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const [viewMode, setViewMode] = useState<"2d" | "3d">("3d");
  const { theme } = useTheme();

  const isDark = theme === "dark";

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight - 80,
      });
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="w-full h-[calc(100vh-80px)] overflow-hidden bg-gray-50 dark:bg-zinc-950 relative">
      {/* Floating Toggle Button */}
      <div className="absolute top-20 right-4 z-50 flex bg-white dark:bg-zinc-900 rounded-lg shadow-md border border-gray-200 dark:border-zinc-800 p-1">
        <button
          onClick={() => setViewMode("2d")}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
            viewMode === "2d"
              ? "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
              : "text-gray-600 dark:text-zinc-400 hover:bg-gray-100 dark:hover:bg-zinc-800"
          }`}
        >
          <Square size={16} />
          2D View
        </button>
        <button
          onClick={() => setViewMode("3d")}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
            viewMode === "3d"
              ? "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
              : "text-gray-600 dark:text-zinc-400 hover:bg-gray-100 dark:hover:bg-zinc-800"
          }`}
        >
          <Box size={16} />
          3D View
        </button>
      </div>

      {viewMode === "3d" ? (
        <ForceGraph3D
          ref={fg3DRef}
          graphData={data}
          nodeLabel="name"
          nodeAutoColorBy="group"
          nodeRelSize={6}
          width={dimensions.width}
          height={dimensions.height}
          onNodeClick={(node: any) => {
            const distance = 80;
            const distRatio = 1 + distance / Math.hypot(node.x, node.y, node.z);
            fg3DRef.current?.cameraPosition(
              {
                x: node.x * distRatio,
                y: node.y * distRatio,
                z: node.z * distRatio,
              },
              node,
              2000,
            );
          }}
          linkColor={() =>
            isDark ? "rgba(255, 255, 255, 0.15)" : "rgba(0, 0, 0, 0.15)"
          }
          backgroundColor={isDark ? "#09090b" : "#f9fafb"}
          nodeThreeObject={(node: any) => {
            const group = new THREE.Group();

            const geometry = new THREE.SphereGeometry(node.val, 16, 16);
            const material = new THREE.MeshLambertMaterial({
              color: node.color || "#3b82f6",
              transparent: true,
              opacity: 0.9,
            });
            const sphere = new THREE.Mesh(geometry, material);
            group.add(sphere);

            const sprite = new SpriteText(node.name);
            sprite.color = isDark ? "#e4e4e7" : "#18181b";
            sprite.textHeight = node.val > 5 ? 4 : 2;
            sprite.position.y = node.val + (node.val > 5 ? 4 : 2);

            if (node.val <= 5) {
              sprite.material.opacity = 0.6;
              sprite.material.transparent = true;
            }

            group.add(sprite);

            return group;
          }}
        />
      ) : (
        <ForceGraph2D
          ref={fg2DRef}
          graphData={data}
          nodeLabel="name"
          nodeAutoColorBy="group"
          nodeRelSize={6}
          width={dimensions.width}
          height={dimensions.height}
          onNodeClick={(node: any) => {
            fg2DRef.current?.centerAt(node.x, node.y, 1000);
            fg2DRef.current?.zoom(8, 2000);
          }}
          linkColor={() =>
            isDark ? "rgba(255, 255, 255, 0.15)" : "rgba(0, 0, 0, 0.15)"
          }
          backgroundColor={isDark ? "#09090b" : "#f9fafb"}
          nodeCanvasObject={(node: any, ctx, globalScale) => {
            const label = node.name;
            const fontSize = Math.max(12 / globalScale, 2);
            ctx.font = `${fontSize}px Inter, Sans-Serif`;

            ctx.beginPath();
            ctx.arc(node.x, node.y, node.val, 0, 2 * Math.PI, false);
            ctx.fillStyle = node.color || "#3b82f6";
            ctx.fill();

            if (globalScale > 1.2 || node.val > 5) {
              ctx.textAlign = "center";
              ctx.textBaseline = "middle";
              ctx.fillStyle = isDark ? "#e4e4e7" : "#18181b";
              ctx.fillText(label, node.x, node.y + node.val + 2 + fontSize);
            }
          }}
        />
      )}
    </div>
  );
}
