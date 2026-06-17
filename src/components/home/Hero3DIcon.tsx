"use client";

import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function RotatingGeometry() {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state, delta) => {
    if (meshRef.current) {
      // Base rotation
      meshRef.current.rotation.x += delta * 0.5;
      meshRef.current.rotation.y += delta * 0.5;

      // Accelerated rotation and scaling on hover
      const targetScale = hovered ? 1.5 : 1;
      const currentScale = meshRef.current.scale.x;
      meshRef.current.scale.setScalar(
        THREE.MathUtils.lerp(currentScale, targetScale, 0.1)
      );
      
      if (hovered) {
        meshRef.current.rotation.x += delta * 2;
        meshRef.current.rotation.y += delta * 2;
      }
    }
  });

  return (
    <mesh
      ref={meshRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <icosahedronGeometry args={[1.5, 0]} />
      <meshStandardMaterial 
        color={hovered ? (document.documentElement.classList.contains("dark") ? "#ffffff" : "#000000") : "#a1a1aa"} 
        wireframe={true} 
        wireframeLinewidth={2}
      />
    </mesh>
  );
}

export function Hero3DIcon() {
  return (
    <div className="w-24 h-24 absolute right-0 top-0 -mt-8 md:mt-0 md:-right-12 cursor-pointer z-0 opacity-50 hover:opacity-100 transition-opacity">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={1} />
        <directionalLight position={[10, 10, 5]} intensity={2} />
        <RotatingGeometry />
      </Canvas>
    </div>
  );
}
