"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import ForceGraph3D, { ForceGraphMethods, NodeObject } from "react-force-graph-3d";
import { useTheme } from "next-themes";
import { useReducedMotion } from "framer-motion";
import type { GraphData } from "@/lib/parseTechStack";
import { useElementSize } from "@/hooks/useElementSize";

type TechNode = GraphData["nodes"][number];

export default function SpatialGraphView({ data }: { data: GraphData }) {
  const graph = useRef<ForceGraphMethods<TechNode> | undefined>(undefined);
  const { ref, width, height } = useElementSize();
  const { resolvedTheme } = useTheme();
  const reducedMotion = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const [lostContext, setLostContext] = useState(false);
  const [selected, setSelected] = useState("");
  // Force graph mutates its inputs. Each view owns an isolated simulation.
  const graphData = useMemo(() => ({ nodes: data.nodes.map((node) => ({ ...node })), links: data.links.map((link) => ({ ...link })) }), [data]);
  const selectedNode = data.nodes.find((node) => node.id === selected);

  useEffect(() => {
    if (!width || !height || lostContext) return;
    const instance = graph.current;
    const element = ref.current;
    if (!instance || !element) return;
    instance.renderer().setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    const canvas = instance.renderer().domElement;
    const contextLost = (event: Event) => { event.preventDefault(); setLostContext(true); };
    canvas.addEventListener("webglcontextlost", contextLost);
    let inView = true;
    const update = () => {
      if (paused || document.hidden || !inView) instance.pauseAnimation();
      else instance.resumeAnimation();
    };
    const observer = new IntersectionObserver(([entry]) => { inView = entry.isIntersecting; update(); });
    observer.observe(element);
    document.addEventListener("visibilitychange", update);
    update();
    return () => { observer.disconnect(); document.removeEventListener("visibilitychange", update); canvas.removeEventListener("webglcontextlost", contextLost); };
  }, [paused, width, height, ref, lostContext]);

  function focusNode(node: NodeObject<TechNode>) {
    setSelected(node.id);
    const position = { x: node.x || 0, y: node.y || 0, z: node.z || 0 };
    graph.current?.cameraPosition({ x: position.x, y: position.y, z: position.z + 160 }, position, reducedMotion ? 0 : 650);
  }

  return (
    <div ref={ref} className="relative w-full h-full min-h-96">
      {lostContext ? <p role="status" className="p-8">The 3D view is unavailable on this device. Switch to the Matrix Grid to explore every technology.</p> : width > 0 && height > 0 && <ForceGraph3D
        ref={graph} graphData={graphData} width={width} height={height}
        backgroundColor={resolvedTheme === "dark" ? "#080c10" : "#ffffff"}
        nodeAutoColorBy="group" nodeLabel="name" nodeRelSize={3} nodeResolution={8}
        linkColor={() => resolvedTheme === "dark" ? "#94a3b8" : "#475569"} linkOpacity={0.3}
        warmupTicks={100} cooldownTicks={0} showNavInfo={false} enableNodeDrag={false}
        onNodeClick={focusNode}
      />}
      {!lostContext && <>
      <div className="absolute top-3 left-3 right-3 flex flex-wrap gap-2 items-center bg-background/95 border border-border p-3">
        <label htmlFor="spatial-node" className="sr-only">Inspect a technology in 3D</label>
        <select id="spatial-node" value={selected} onChange={(event) => { const node = graphData.nodes.find((item) => item.id === event.target.value); if (node) focusNode(node); }} className="min-w-0 flex-1 max-w-full bg-background border border-border p-2 text-sm">
          <option value="">Inspect a technology…</option>{data.nodes.map((node) => <option key={node.id} value={node.id}>{node.name}</option>)}
        </select>
        <button onClick={() => graph.current?.zoomToFit(reducedMotion ? 0 : 500, 50)} className="border border-border p-2 text-xs">Fit view</button>
        <button aria-pressed={paused} onClick={() => setPaused(!paused)} className="border border-border p-2 text-xs">{paused ? "Resume 3D" : "Pause 3D"}</button>
      </div>
      <div className="absolute bottom-3 left-3 right-3 bg-background/95 border border-border p-3 text-xs text-muted-foreground">
        {selectedNode ? <p className="mb-2 text-foreground">{selectedNode.name} · {selectedNode.category || "Technology domain"}</p> : null}
        Drag to orbit · Scroll to zoom · Select a technology above for keyboard navigation. The Matrix Grid contains the same information.
      </div>
      </>}
    </div>
  );
}
