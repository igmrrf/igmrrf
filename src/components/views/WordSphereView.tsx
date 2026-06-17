'use client';

import React, { useMemo, useEffect, useRef, useState } from 'react';

export default function WordSphereView({ data }: { data: any }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [radius, setRadius] = useState(250);
  
  // Interactive rotation state controlled by mouse drag
  const rotationRef = useRef({ x: 0, y: 0 });
  const isDragging = useRef(false);
  const hasDragged = useRef(false);
  const lastMousePos = useRef({ x: 0, y: 0 });
  
  // Auto-rotation state
  const autoRotationRef = useRef({ x: 0, y: 0 });

  const words = useMemo(() => {
    return data.nodes.filter((n: any) => n.id !== 'root' && n.id !== n.name);
  }, [data]);

  useEffect(() => {
    if (!containerRef.current) return;
    const handleResize = () => {
      if (containerRef.current) {
        const width = containerRef.current.getBoundingClientRect().width;
        // Keep it nicely padded on mobile screens
        setRadius(Math.min(250, width / 2 - 20));
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const points = useMemo(() => {
    if (radius === 0) return [];
    const pts = [];
    const phi = Math.PI * (3 - Math.sqrt(5)); 
    for (let i = 0; i < words.length; i++) {
      const y = 1 - (i / (words.length - 1)) * 2; 
      const r = Math.sqrt(1 - y * y); 
      const theta = phi * i; 
      const x = Math.cos(theta) * r;
      const z = Math.sin(theta) * r;
      pts.push({ word: words[i], x: x * radius, y: y * radius, z: z * radius });
    }
    return pts;
  }, [words]);

  useEffect(() => {
    let animationId: number;
    const animate = () => {
      // Auto rotate slowly if not dragging
      if (!isDragging.current) {
        autoRotationRef.current.x += 0.002;
        autoRotationRef.current.y += 0.001;
      }
      
      const rx = rotationRef.current.x + autoRotationRef.current.x;
      const ry = rotationRef.current.y + autoRotationRef.current.y;
      
      const container = document.getElementById('wordsphere-inner');
      if (container) {
        container.style.transform = `rotateX(${-ry}rad) rotateY(${rx}rad)`;
      }

      // We handle individual word facing the camera by counter-rotating them
      const items = document.querySelectorAll('.wordsphere-item');
      items.forEach((item: any) => {
        item.style.transform = `translate(-50%, -50%) rotateY(${-rx}rad) rotateX(${ry}rad)`;
      });

      animationId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animationId);
  }, []);

  const handlePointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    hasDragged.current = false;
    lastMousePos.current = { x: e.clientX, y: e.clientY };
    if (containerRef.current) containerRef.current.style.cursor = 'grabbing';
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    const deltaX = e.clientX - lastMousePos.current.x;
    const deltaY = e.clientY - lastMousePos.current.y;
    
    if (Math.abs(deltaX) > 2 || Math.abs(deltaY) > 2) {
      hasDragged.current = true;
    }
    
    rotationRef.current.x += deltaX * 0.01;
    rotationRef.current.y += deltaY * 0.01;
    
    lastMousePos.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = () => {
    isDragging.current = false;
    if (containerRef.current) containerRef.current.style.cursor = 'grab';
  };

  return (
    <div 
      ref={containerRef} 
      className="w-full h-full bg-zinc-950 flex items-center justify-center overflow-hidden pt-16 cursor-grab touch-none"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      <div className="absolute bottom-4 left-4 text-xs font-mono bg-white/10 text-white px-2 py-1 rounded">
        Drag to Spin 3D Sphere
      </div>

      <div 
        id="wordsphere-inner"
        className="relative"
        style={{
          width: 0,
          height: 0,
          transformStyle: 'preserve-3d',
        }}
      >
        {points.map((p, i) => {
          return (
            <div
              key={i}
              className="absolute top-0 left-0"
              style={{
                transform: `translate3d(${p.x}px, ${p.y}px, ${p.z}px)`,
                transformStyle: 'preserve-3d',
              }}
            >
              <div
                className="wordsphere-item absolute top-0 left-0 whitespace-nowrap font-bold hover:text-blue-400 cursor-pointer transition-colors"
                style={{
                  color: `hsl(${(i * 137.5) % 360}, 70%, 60%)`, 
                  textShadow: '0 0 10px rgba(0,0,0,0.8)',
                  fontSize: p.word.val > 5 ? '1.5rem' : '1rem'
                }}
                onClick={(e) => {
                  if (hasDragged.current) {
                    e.preventDefault();
                    e.stopPropagation();
                    return;
                  }
                  window.open(`https://www.google.com/search?q=${p.word.name}+technology`, '_blank');
                }}
                title={`Search ${p.word.name}`}
              >
                {p.word.name}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
