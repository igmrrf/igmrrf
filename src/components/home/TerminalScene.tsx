"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { Pause, Play } from "lucide-react";
import { useIsMounted } from "@/hooks/useIsMounted";

export function TerminalScene() {
  const prefersReducedMotion = useReducedMotion();
  const mounted = useIsMounted();
  const reducedMotion = mounted && prefersReducedMotion;
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(false);
  const scene = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(x, { stiffness: 90, damping: 22 });
  const rotateY = useSpring(y, { stiffness: 90, damping: 22 });
  const moving = !reducedMotion && !paused && visible;

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    if (scene.current) observer.observe(scene.current);
    const visibility = () => { if (document.hidden) setVisible(false); else if (scene.current) { const rect = scene.current.getBoundingClientRect(); setVisible(rect.bottom > 0 && rect.top < window.innerHeight); } };
    document.addEventListener("visibilitychange", visibility);
    return () => { observer.disconnect(); document.removeEventListener("visibilitychange", visibility); };
  }, []);

  return (
    <div ref={scene} className="terminal-scene" onPointerMove={(event) => {
      if (!moving || event.pointerType !== "mouse") return;
      const bounds = event.currentTarget.getBoundingClientRect();
      x.set((0.5 - (event.clientY - bounds.top) / bounds.height) * 12);
      y.set(((event.clientX - bounds.left) / bounds.width - 0.5) * 16);
    }} onPointerLeave={() => { x.set(0); y.set(0); }}>
      <div className="scene-grid" aria-hidden="true" />
      <motion.div className="scene-tilt" style={{ rotateX: moving ? rotateX : 0, rotateY: moving ? rotateY : 0 }}>
        <div className="scene-float" style={{ animationPlayState: moving ? "running" : "paused" }}>
          <div className="scene-layer scene-layer-back" aria-hidden="true" />
          <div className="scene-layer scene-layer-middle" aria-hidden="true" />
          <div className="scene-window">
            <div className="flex items-center gap-2 border-b border-border px-5 py-4"><span className="size-2 rounded-full bg-red-400" /><span className="size-2 rounded-full bg-amber-400" /><span className="size-2 rounded-full bg-emerald-400" /><span className="ml-auto text-xs text-muted-foreground">~/francis</span></div>
            <div className="p-6 sm:p-8 font-mono text-sm leading-8">
              <p><span className="text-primary">❯</span> whoami</p>
              <p className="text-muted-foreground">Engineer. Builder. Terminal person.</p>
              <p className="mt-4"><span className="text-primary">❯</span> cat philosophy.txt</p>
              <p className="text-muted-foreground">Value begets peace.</p>
              <p className="mt-4"><span className="text-primary">❯</span> explore <span className="text-muted-foreground">--curiosity</span></p>
              <button type="button" onClick={() => window.dispatchEvent(new Event("open-terminal"))} className="mt-4 w-full border border-primary/40 bg-primary/5 px-3 py-2 text-primary hover:bg-primary hover:text-primary-foreground transition-colors text-left">Open interactive terminal ↗</button>
            </div>
          </div>
        </div>
      </motion.div>
      <div className="relative flex items-center justify-between gap-2 px-4 text-xs text-muted-foreground font-mono">
        <span>fish spirit. web native.</span>
        <button type="button" disabled={!!reducedMotion} onClick={() => setPaused(!paused)} aria-pressed={paused || !!reducedMotion} className="flex items-center gap-2 p-3 hover:text-foreground disabled:opacity-70">{paused || reducedMotion ? <Play size={13} /> : <Pause size={13} />}{reducedMotion ? "Motion reduced" : paused ? "Resume motion" : "Pause motion"}</button>
      </div>
    </div>
  );
}
