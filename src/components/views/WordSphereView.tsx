'use client';

import React, { useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import { useTheme } from 'next-themes';
import * as THREE from 'three';

function WordNode({ word, index, count, radius, isDark }: { word: any, index: number, count: number, radius: number, isDark: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  // Compute Fibonacci sphere position
  const pos = useMemo(() => {
    const phi = Math.PI * (3 - Math.sqrt(5));
    const y = 1 - (index / (count - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = phi * index;
    
    return new THREE.Vector3(
      Math.cos(theta) * r * radius,
      y * radius,
      Math.sin(theta) * r * radius
    );
  }, [index, count, radius]);

  // Make text always face the camera
  useFrame(({ camera }) => {
    if (meshRef.current) {
      meshRef.current.quaternion.copy(camera.quaternion);
    }
  });

  const baseLightness = isDark ? 60 : 35;
  const hoverLightness = isDark ? 80 : 20;
  const color = `hsl(${(index * 137.5) % 360}, 70%, ${hovered ? hoverLightness : baseLightness}%)`;
  const fontSize = word.val > 5 ? 1.5 : 1;

  return (
    <Text
      ref={meshRef as any}
      position={pos}
      fontSize={fontSize}
      color={color}
      anchorX="center"
      anchorY="middle"
      onPointerOver={() => {
        setHovered(true);
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = 'auto';
      }}
      onClick={(e) => {
        e.stopPropagation();
        window.open(`https://www.google.com/search?q=${word.name}+technology`, '_blank');
      }}
      outlineWidth={0.04}
      outlineColor={isDark ? "#000000" : "#ffffff"}
    >
      {word.name}
    </Text>
  );
}

function SphereScene({ words, isDark }: { words: any[], isDark: boolean }) {
  const groupRef = useRef<THREE.Group>(null);

  // Auto rotate the whole sphere slowly
  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {words.map((word, i) => (
        <WordNode 
          key={i} 
          word={word} 
          index={i} 
          count={words.length} 
          radius={12} 
          isDark={isDark} 
        />
      ))}
    </group>
  );
}

export default function WordSphereView({ data }: { data: any }) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  const words = useMemo(() => {
    return data.nodes.filter((n: any) => n.id !== 'root' && n.id !== n.name);
  }, [data]);

  return (
    <div className="w-full h-full pt-16 relative bg-transparent">
      <Canvas camera={{ position: [0, 0, 30], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <SphereScene words={words} isDark={isDark} />
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          rotateSpeed={0.5}
        />
      </Canvas>
      <div className="absolute bottom-4 left-4 text-xs font-mono bg-zinc-200 dark:bg-white/10 text-zinc-800 dark:text-white px-3 py-2 rounded pointer-events-none">
        Drag to Spin 3D Sphere
      </div>
    </div>
  );
}
