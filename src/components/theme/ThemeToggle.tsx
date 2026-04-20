"use client";

import * as React from "react";
import { Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-10 h-10 border border-border bg-accent/20 flex items-center justify-center opacity-50">
        <div className="w-4 h-4 border border-primary/20 animate-pulse" />
      </div>
    );
  }

  const modes = [
    { name: "light", icon: Sun },
    { name: "dark", icon: Moon },
    { name: "system", icon: Monitor },
  ] as const;

  const currentIdx = modes.findIndex((m) => m.name === theme) ?? 2;
  const nextMode = modes[(currentIdx + 1) % modes.length].name;

  return (
    <button
      onClick={() => setTheme(nextMode)}
      className="group relative w-10 h-10 border border-border bg-accent/20 flex items-center justify-center hover:bg-primary transition-all active:scale-90"
      aria-label={`Current theme: ${theme}. Switch to ${nextMode} mode.`}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={theme}
          initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10"
        >
          {theme === "light" && <Sun className="h-4 w-4 text-primary group-hover:text-primary-foreground" />}
          {theme === "dark" && <Moon className="h-4 w-4 text-primary group-hover:text-primary-foreground" />}
          {theme === "system" && <Monitor className="h-4 w-4 text-primary group-hover:text-primary-foreground" />}
        </motion.div>
      </AnimatePresence>

      {/* Industrial Accent */}
      <div className="absolute top-0 right-0 w-1.5 h-1.5 border-r border-t border-primary/40 group-hover:border-primary-foreground" />
      <div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-l border-b border-primary/40 group-hover:border-primary-foreground" />
      
      {/* Tooltip-like indicator */}
      <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[8px] font-mono tracking-tighter opacity-0 group-hover:opacity-100 transition-opacity uppercase text-muted-foreground whitespace-nowrap">
        theme.{theme}
      </span>
    </button>
  );
}
