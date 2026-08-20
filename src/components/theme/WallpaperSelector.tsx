"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Sliders, X, Check, Terminal } from "lucide-react";
import { useWallpaper } from "./WallpaperProvider";
import { motion, AnimatePresence } from "framer-motion";

export const WallpaperSelector: React.FC = () => {
  const { currentWallpaper, wallpaperId, opacity, setWallpaperId, setOpacity, wallpapers } =
    useWallpaper();
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end" ref={panelRef}>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-3 border border-border bg-background/80 backdrop-blur-md shadow-2xl text-foreground hover:text-primary hover:border-primary transition-all active:scale-95 flex items-center gap-2 group"
        aria-label="Customize Terminal Background and Opacity"
        title="Terminal Wallpaper & Opacity Settings"
      >
        <Sliders size={18} className="text-primary group-hover:rotate-45 transition-transform" />
        <span className="hidden sm:inline font-mono text-[10px] uppercase tracking-widest font-black">
          Style.cfg
        </span>
      </button>

      {/* Settings Popover Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.96 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute bottom-16 right-0 w-[340px] sm:w-[400px] border border-border bg-background/95 backdrop-blur-xl shadow-2xl p-6 flex flex-col gap-6"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border pb-4">
              <div className="flex items-center gap-2">
                <Terminal className="h-4 w-4 text-primary" />
                <span className="font-mono text-xs font-black uppercase tracking-wider text-foreground">
                  Terminal.wallpaper_select()
                </span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 border border-border hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Close Settings"
              >
                <X size={14} />
              </button>
            </div>

            {/* Terminal Opacity Selector */}
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                <span>Terminal Opacity</span>
                <span className="text-primary font-bold">{Math.round(opacity * 100)}%</span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { label: "85%", val: 0.85 },
                  { label: "90% (Std)", val: 0.90 },
                  { label: "95%", val: 0.95 },
                  { label: "100%", val: 1.00 },
                ].map((item) => (
                  <button
                    key={item.val}
                    onClick={() => setOpacity(item.val)}
                    className={`py-1.5 px-2 border text-[10px] font-mono uppercase tracking-wider transition-all ${
                      Math.abs(opacity - item.val) < 0.01
                        ? "border-primary bg-primary text-primary-foreground font-black"
                        : "border-border hover:border-primary/50 text-muted-foreground"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Wallpapers Grid */}
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                <span>Select Wallpaper</span>
                <span>{wallpaperId ? currentWallpaper?.name : "None (Solid)"}</span>
              </div>

              <div className="grid grid-cols-3 gap-2.5 max-h-[220px] overflow-y-auto pr-1">
                {/* None / Solid Option */}
                <button
                  onClick={() => setWallpaperId(null)}
                  className={`relative flex flex-col items-center justify-center p-3 border h-20 transition-all ${
                    wallpaperId === null
                      ? "border-primary ring-1 ring-primary bg-accent/40"
                      : "border-border hover:border-border/80 bg-accent/10"
                  }`}
                >
                  <div className="w-6 h-6 border border-dashed border-border flex items-center justify-center mb-1 text-muted-foreground">
                    <X size={12} />
                  </div>
                  <span className="text-[9px] font-mono uppercase tracking-tighter text-muted-foreground">
                    None / Solid
                  </span>
                  {wallpaperId === null && (
                    <div className="absolute top-1 right-1 p-0.5 bg-primary text-primary-foreground">
                      <Check size={10} />
                    </div>
                  )}
                </button>

                {/* Akane Wallpapers */}
                {wallpapers.map((wp) => {
                  const isSelected = wallpaperId === wp.id;
                  return (
                    <button
                      key={wp.id}
                      onClick={() => setWallpaperId(wp.id)}
                      className={`relative group overflow-hidden border h-20 transition-all ${
                        isSelected
                          ? "border-primary ring-2 ring-primary"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <div className="relative w-full h-full">
                        <Image
                          src={wp.thumbnail}
                          alt={wp.name}
                          fill
                          sizes="120px"
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-background/20 group-hover:bg-transparent transition-colors" />
                        <span className="absolute bottom-1 left-1 bg-background/80 backdrop-blur-xs px-1 text-[8px] font-mono uppercase text-foreground">
                          {wp.name}
                        </span>
                        {isSelected && (
                          <div className="absolute top-1 right-1 p-0.5 bg-primary text-primary-foreground shadow-md">
                            <Check size={10} />
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Footer summary */}
            <div className="text-[9px] font-mono uppercase text-muted-foreground/70 border-t border-border/50 pt-3 flex justify-between items-center">
              <span>Terminal mode: 0.90 translucent</span>
              <span className="text-primary font-bold">AKANE_PACK</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
