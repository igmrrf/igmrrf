"use client";

import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import * as THREE from "three";
import { useTheme } from "next-themes";

function HologramShape({ type, hovered, isDark }: { type: string, hovered: boolean, isDark: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      // Idle cosmic rotation
      meshRef.current.rotation.y += delta * 0.5;
      meshRef.current.rotation.x += delta * 0.2;

      // Accelerated spin when hovered
      if (hovered) {
        meshRef.current.rotation.y += delta * 2;
      }
      
      const targetScale = hovered ? 1.3 : 1;
      meshRef.current.scale.setScalar(THREE.MathUtils.lerp(meshRef.current.scale.x, targetScale, 0.1));
    }
  });

  const color = isDark ? (hovered ? "#ffffff" : "#71717a") : (hovered ? "#000000" : "#a1a1aa");

  let geometry;
  switch (type) {
    case 'box': geometry = <boxGeometry args={[1.5, 1.5, 1.5]} />; break;
    case 'cylinder': geometry = <cylinderGeometry args={[1, 1, 2, 32]} />; break;
    case 'octahedron': geometry = <octahedronGeometry args={[1.2, 0]} />; break;
    case 'torus': geometry = <torusGeometry args={[1, 0.4, 16, 100]} />; break;
    default: geometry = <sphereGeometry args={[1, 32, 32]} />;
  }

  return (
    <mesh ref={meshRef}>
      {geometry}
      <meshStandardMaterial 
        color={color} 
        wireframe={true} 
        transparent
        opacity={0.6}
      />
    </mesh>
  );
}

export function HologramCard({ title, desc, index, shapeType }: { title: string, desc: string, index: number, shapeType: string }) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const [hovered, setHovered] = useState(false);

  // 3D DOM Tilt effect physics
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setHovered(false);
  };

  return (
    <motion.div
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="flex flex-col gap-6 p-10 border-r border-b border-border group hover:bg-muted/50 transition-colors relative h-full bg-background/50 backdrop-blur-sm"
    >
      <div className="flex items-center justify-between pointer-events-none" style={{ transform: "translateZ(40px)", transformStyle: "preserve-3d" }}>
        {/* Hologram Canvas - Allowed to Overflow bounds! */}
        <div className="w-16 h-16 relative">
          <div className="absolute inset-[-60%] pointer-events-none overflow-visible">
            <Canvas camera={{ position: [0, 0, 5.5], fov: 45 }}>
              <ambientLight intensity={1} />
              <HologramShape type={shapeType} hovered={hovered} isDark={isDark} />
            </Canvas>
          </div>
        </div>
        <span className="text-[10px] font-mono text-muted-foreground">
          0{index}
        </span>
      </div>
      <div className="flex flex-col gap-2 pointer-events-none" style={{ transform: "translateZ(20px)", transformStyle: "preserve-3d" }}>
        <h3 className="text-lg font-black uppercase tracking-tight italic">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {desc}
        </p>
      </div>
    </motion.div>
  );
}
