"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useScroll } from "framer-motion";
import { useTheme } from "next-themes";
import * as THREE from "three";

function TesseractCore({ isDark }: { isDark: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const lineRef = useRef<THREE.LineSegments>(null);

  // Define 16 vertices of a 4D hypercube
  const vertices4D = React.useMemo(() => {
    const v = [];
    for (let x = -1; x <= 1; x += 2)
      for (let y = -1; y <= 1; y += 2)
        for (let z = -1; z <= 1; z += 2)
          for (let w = -1; w <= 1; w += 2)
            v.push([x, y, z, w]);
    return v;
  }, []);

  // Define 32 edges connecting vertices that differ by exactly 1 coordinate
  const edgesIndex = React.useMemo(() => {
    const e = [];
    for (let i = 0; i < 16; i++) {
      for (let j = i + 1; j < 16; j++) {
        let diffs = 0;
        for (let k = 0; k < 4; k++) {
          if (vertices4D[i][k] !== vertices4D[j][k]) diffs++;
        }
        if (diffs === 1) e.push(i, j);
      }
    }
    return new Uint16Array(e);
  }, [vertices4D]);

  // Define 24 faces of the hypercube
  const facesIndex = React.useMemo(() => {
    const f = [];
    const axesPairs = [[0, 1], [0, 2], [0, 3], [1, 2], [1, 3], [2, 3]];
    
    axesPairs.forEach(([var1, var2]) => {
      const fixedAxes = [0, 1, 2, 3].filter((a) => a !== var1 && a !== var2);
      
      for (let fixedVal1 of [-1, 1]) {
        for (let fixedVal2 of [-1, 1]) {
          const faceVerts = [];
          // Winding order
          const variations = [[-1, -1], [1, -1], [1, 1], [-1, 1]];
          
          variations.forEach((v) => {
            const idx = vertices4D.findIndex((vert) => 
              vert[fixedAxes[0]] === fixedVal1 &&
              vert[fixedAxes[1]] === fixedVal2 &&
              vert[var1] === v[0] &&
              vert[var2] === v[1]
            );
            faceVerts.push(idx);
          });
          
          f.push(faceVerts[0], faceVerts[1], faceVerts[2]);
          f.push(faceVerts[0], faceVerts[2], faceVerts[3]);
        }
      }
    });
    return new Uint16Array(f);
  }, [vertices4D]);

  // Buffer geometry positions (16 vertices * 3 coords)
  const positions = React.useMemo(() => new Float32Array(16 * 3), []);
  const colors = React.useMemo(() => new Float32Array(16 * 3), []);

  const colorFront = React.useMemo(() => new THREE.Color(isDark ? "#ffffff" : "#000000"), [isDark]);
  const colorBack = React.useMemo(() => new THREE.Color(isDark ? "#27272a" : "#d4d4d8"), [isDark]);
  const tempColor = React.useMemo(() => new THREE.Color(), []);

  useFrame((state) => {
    if (!meshRef.current || !lineRef.current) return;
    
    const angleXW = state.clock.elapsedTime * 0.4;
    const angleYZ = state.clock.elapsedTime * 0.2;

    const cosXW = Math.cos(angleXW), sinXW = Math.sin(angleXW);
    const cosYZ = Math.cos(angleYZ), sinYZ = Math.sin(angleYZ);

    for (let i = 0; i < 16; i++) {
      const [x, y, z, w] = vertices4D[i];
      
      // Rotate in XW
      let rx = x * cosXW - w * sinXW;
      let rw = x * sinXW + w * cosXW;
      
      // Rotate in YZ
      let ry = y * cosYZ - z * sinYZ;
      let rz = y * sinYZ + z * cosYZ;

      // Project 4D to 3D
      const distance = 2.5;
      const factor = 1.8 / (distance - rw);
      
      const px = rx * factor;
      const py = ry * factor;
      const pz = rz * factor;

      positions[i * 3] = px;
      positions[i * 3 + 1] = py;
      positions[i * 3 + 2] = pz;

      // Depth coloring
      let depth = (pz + 1.5) / 3.0;
      depth = Math.max(0, Math.min(1, depth));
      tempColor.lerpColors(colorBack, colorFront, depth);
      colors[i * 3] = tempColor.r;
      colors[i * 3 + 1] = tempColor.g;
      colors[i * 3 + 2] = tempColor.b;
    }
    
    meshRef.current.geometry.attributes.position.needsUpdate = true;
    lineRef.current.geometry.attributes.position.needsUpdate = true;
    lineRef.current.geometry.attributes.color.needsUpdate = true;
  });

  return (
    <group>
      {/* Solid Faces */}
      <mesh ref={meshRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={16} array={positions} itemSize={3} />
          <bufferAttribute attach="index" array={facesIndex} count={facesIndex.length} itemSize={1} />
        </bufferGeometry>
        <meshBasicMaterial 
          color="#000000"
          transparent 
          opacity={isDark ? 0.6 : 0.8} 
          side={THREE.DoubleSide} 
          depthWrite={false}
        />
      </mesh>

      {/* Wireframe Edges */}
      <lineSegments ref={lineRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={16} array={positions} itemSize={3} />
          <bufferAttribute attach="attributes-color" count={16} array={colors} itemSize={3} />
          <bufferAttribute attach="index" array={edgesIndex} count={edgesIndex.length} itemSize={1} />
        </bufferGeometry>
        <lineBasicMaterial vertexColors={true} transparent opacity={0.8} />
      </lineSegments>
    </group>
  );
}

function ScrollGeometry({ isDark }: { isDark: boolean }) {
  const { scrollYProgress } = useScroll();
  const groupRef = useRef<THREE.Group>(null);
  const topRingRef = useRef<THREE.Mesh>(null);
  const bottomRingRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    // scrollYProgress.get() is native framer-motion, returning 0 to 1 based on page scroll
    const scroll = scrollYProgress.get();

    if (groupRef.current) {
      // The entire monolith rotates multiple times as you scroll down
      groupRef.current.rotation.x = scroll * Math.PI * 4;
      groupRef.current.rotation.y = scroll * Math.PI * 2;
    }

    if (topRingRef.current) {
      // The top ring physically slides upwards
      topRingRef.current.position.y = scroll * 3;
    }

    if (bottomRingRef.current) {
      // The bottom ring physically slides downwards
      bottomRingRef.current.position.y = scroll * -3;
    }
  });

  const ringColor = isDark ? "#ffffff" : "#000000";

  return (
    <group ref={groupRef}>
      {/* 4D Tesseract Core */}
      <TesseractCore isDark={isDark} />

      {/* Top Ring */}
      <mesh ref={topRingRef} rotation-x={Math.PI / 2}>
        <torusGeometry args={[2.5, 0.05, 16, 100]} />
        <meshStandardMaterial color={ringColor} transparent opacity={0.4} />
      </mesh>

      {/* Bottom Ring */}
      <mesh ref={bottomRingRef} rotation-x={Math.PI / 2}>
        <torusGeometry args={[3, 0.05, 16, 100]} />
        <meshStandardMaterial color={ringColor} transparent opacity={0.2} />
      </mesh>
    </group>
  );
}

export function ScrollDrivenModel() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <div className="fixed right-[-20%] md:right-0 top-0 w-[140%] md:w-1/2 h-screen z-[-1] pointer-events-none opacity-20 md:opacity-40">
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
        <ambientLight intensity={1} />
        <directionalLight position={[5, 5, 5]} intensity={2} />
        <ScrollGeometry isDark={isDark} />
      </Canvas>
    </div>
  );
}
