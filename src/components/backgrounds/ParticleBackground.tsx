"use client";

import React, { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import { useTheme } from "next-themes";
import * as THREE from "three";

function ParticleField({ isDark }: { isDark: boolean }) {
  const ref = useRef<THREE.Points>(null);
  const mouse = useRef({ x: 0, y: 0 });

  // Generate 4000 random points in a sphere mathematically
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < 4000; i++) {
      // Random distribution in a sphere
      const r = 2.5 * Math.cbrt(Math.random());
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);
      temp.push(x, y, z);
    }
    return new Float32Array(temp);
  }, []);

  // Track global mouse position for parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame((state, delta) => {
    if (ref.current) {
      // Slow constant cosmic drift
      ref.current.rotation.x -= delta * 0.05;
      ref.current.rotation.y -= delta * 0.07;

      // Subtle parallax reaction to mouse
      const targetX = mouse.current.x * 0.15;
      const targetY = mouse.current.y * 0.15;
      ref.current.position.x += (targetX - ref.current.position.x) * 0.02;
      ref.current.position.y += (targetY - ref.current.position.y) * 0.02;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref as any} positions={particles} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color={isDark ? "#ffffff" : "#000000"}
          size={0.006}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={isDark ? 0.3 : 0.15}
        />
      </Points>
    </group>
  );
}

export function ParticleBackground() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <ParticleField isDark={isDark} />
      </Canvas>
    </div>
  );
}
