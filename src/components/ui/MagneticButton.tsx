"use client";

import React, { useRef, useState } from "react";
import { motion, useSpring, useTransform } from "framer-motion";
import Link from "next/link";

export function MagneticButton({ href, children, className = "" }: { href: string, children: React.ReactNode, className?: string }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [hovered, setHovered] = useState(false);

  // Physics springs for ultra-smooth magnetic pull
  const x = useSpring(0, { stiffness: 150, damping: 15, mass: 0.1 });
  const y = useSpring(0, { stiffness: 150, damping: 15, mass: 0.1 });

  // Parallax effect for the text inside the button (moves half as much)
  const textX = useTransform(x, (val) => val * 0.4);
  const textY = useTransform(y, (val) => val * 0.4);

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;
    
    // Move the button by 20% of the mouse's distance from the center
    x.set(distanceX * 0.2);
    y.set(distanceY * 0.2);
  };

  const handlePointerLeave = () => {
    setHovered(false);
    // Snap back to 0,0 gracefully
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div style={{ x, y }} className="inline-block relative z-10">
      <Link
        ref={ref}
        href={href}
        className={`group relative overflow-hidden bg-foreground text-background flex items-center justify-center transition-colors duration-500 ${className}`}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={handlePointerLeave}
        onPointerMove={handlePointerMove}
      >
        <motion.span 
          style={{ x: textX, y: textY }}
          className="relative z-10 flex items-center justify-center gap-3 w-full h-full group-hover:text-primary-foreground transition-colors duration-300"
        >
          {children}
        </motion.span>
        
        {/* Animated Background Fill */}
        <motion.div 
          className="absolute inset-0 bg-primary z-0"
          initial={{ y: "100%", borderRadius: "50% 50% 0 0" }}
          animate={{ 
            y: hovered ? "0%" : "100%", 
            borderRadius: hovered ? "0% 0% 0 0" : "50% 50% 0 0" 
          }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        />
      </Link>
    </motion.div>
  );
}
