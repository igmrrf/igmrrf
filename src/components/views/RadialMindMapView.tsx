'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { useTheme } from 'next-themes';

export default function RadialMindMapView({ data }: { data: any }) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [dimensions, setDimensions] = useState({ width: 1000, height: 1000 });

  useEffect(() => {
    if (!containerRef.current) return;
    const { width, height } = containerRef.current.getBoundingClientRect();
    setDimensions({ width, height });

    const handleResize = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.getBoundingClientRect().width,
          height: containerRef.current.getBoundingClientRect().height
        });
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!data || !svgRef.current || dimensions.width === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    // Ensure the tree has enough physical layout space even on tiny screens.
    // The user can always pan around using d3-zoom.
    const radius = Math.max(300, Math.min(dimensions.width, dimensions.height) / 2 - 50);

    const root = d3.hierarchy(data);
    const tree = d3.tree<any>()
      .size([2 * Math.PI, radius])
      .separation((a, b) => (a.parent == b.parent ? 1 : 2) / a.depth);

    // Initialize the tree with all categories collapsed by default to reduce clutter
    root.each((d: any) => {
      d.id = d.data.name + Math.random().toString(36).substr(2, 9);
      d._children = d.children;
      // Collapse everything at depth 1
      if (d.depth === 1 && d.children) {
        d.children = null;
      }
    });

    const g = svg.append("g");

    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.1, 4])
      .on("zoom", (event) => {
        g.attr("transform", event.transform);
      });

    svg.call(zoom);

    svg.call(
      zoom.transform,
      d3.zoomIdentity.translate(dimensions.width / 2, dimensions.height / 2).scale(dimensions.width < 600 ? 0.6 : 1)
    );

    const gLink = g.append("g")
      .attr("fill", "none")
      .attr("stroke", "currentColor")
      .attr("stroke-opacity", 0.4)
      .attr("stroke-width", 1.5);

    const gNode = g.append("g");

    const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

    function update(source: any) {
      const nodes = root.descendants();
      const links = root.links();

      tree(root); // Recompute layout

      const transition = svg.transition().duration(500);

      // Links
      const link = gLink.selectAll("path")
        .data(links, (d: any) => d.target.id);

      const linkEnter = link.enter().append("path")
        .attr("d", d3.linkRadial<any, any>()
          .angle(source.x0 || source.x)
          .radius(source.y0 || source.y))
        .attr("stroke-opacity", 0);

      link.merge(linkEnter as any).transition(transition as any)
        .attr("d", d3.linkRadial<any, any>()
          .angle((d: any) => d.x)
          .radius((d: any) => d.y))
        .attr("stroke-opacity", 0.4);

      link.exit().transition(transition as any)
        .attr("d", d3.linkRadial<any, any>()
          .angle(source.x)
          .radius(source.y))
        .attr("stroke-opacity", 0)
        .remove();

      // Nodes
      const node = gNode.selectAll("g.node")
        .data(nodes, (d: any) => d.id);

      const nodeEnter = node.enter().append("g")
        .attr("class", "node")
        .attr("transform", `rotate(${(source.x0 || source.x) * 180 / Math.PI - 90}) translate(${source.y0 || source.y},0)`)
        .attr("fill-opacity", 0)
        .attr("stroke-opacity", 0);

      nodeEnter.append("circle")
        .attr("r", (d: any) => d.depth === 0 ? 8 : d.depth === 1 ? 6 : 4)
        .attr("fill", (d: any) => d._children ? "#3b82f6" : colorScale(d.data.category || d.data.name))
        .attr("stroke", "var(--stroke-color)")
        .attr("stroke-width", 2)
        .style("cursor", "pointer")
        .on("click", (event, d: any) => {
          if (d.children) {
            d._children = d.children;
            d.children = null;
          } else if (d._children) {
            d.children = d._children;
            d._children = null;
          } else {
            // Leaf node, maybe search?
            window.open(`https://www.google.com/search?q=${d.data.name}+technology`, '_blank');
            return;
          }
          update(d);
        })
        .on("mouseover", function() { d3.select(this).attr("stroke", "#3b82f6").attr("stroke-width", 4); })
        .on("mouseout", function() { d3.select(this).attr("stroke", "var(--stroke-color)").attr("stroke-width", 2); });

      const textNode = nodeEnter.append("text")
        .attr("dy", "0.31em")
        .text((d: any) => d.data.name)
        .attr("font-size", (d: any) => d.depth === 0 ? "14px" : d.depth === 1 ? "12px" : "10px")
        .attr("font-weight", (d: any) => d.depth <= 1 ? "bold" : "normal")
        .attr("fill", "currentColor")
        .style("cursor", "pointer")
        .on("click", (event, d: any) => {
          if (d.children || d._children) {
            if (d.children) {
              d._children = d.children;
              d.children = null;
            } else {
              d.children = d._children;
              d._children = null;
            }
            update(d);
          } else {
            window.open(`https://www.google.com/search?q=${d.data.name}+technology`, '_blank');
          }
        })
        .on("mouseover", function() { d3.select(this).attr("fill", "#3b82f6"); })
        .on("mouseout", function() { d3.select(this).attr("fill", "currentColor"); });
        
      textNode.clone(true).lower()
        .attr("stroke", "var(--bg-color)")
        .attr("stroke-width", 3)
        .attr("stroke-linejoin", "round");

      const nodeUpdate = node.merge(nodeEnter as any).transition(transition as any)
        .attr("transform", (d: any) => `rotate(${d.x * 180 / Math.PI - 90}) translate(${d.y},0)`)
        .attr("fill-opacity", 1)
        .attr("stroke-opacity", 1);

      // Transition the circle color to indicate expand/collapse state
      nodeUpdate.select("circle")
        .attr("fill", (d: any) => d._children && !d.children ? "#3b82f6" : colorScale(d.data.category || d.data.name));

      nodeUpdate.selectAll("text")
        .attr("x", (d: any) => d.x < Math.PI === !(d.children || d._children) ? 8 : -8)
        .attr("text-anchor", (d: any) => d.x < Math.PI === !(d.children || d._children) ? "start" : "end")
        .attr("transform", (d: any) => d.x >= Math.PI ? "rotate(180)" : "");

      node.exit().transition(transition as any)
        .attr("transform", `rotate(${source.x * 180 / Math.PI - 90}) translate(${source.y},0)`)
        .attr("fill-opacity", 0)
        .attr("stroke-opacity", 0)
        .remove();

      root.eachBefore((d: any) => {
        d.x0 = d.x;
        d.y0 = d.y;
      });
    }

    // Initialize source values
    (root as any).x0 = Math.PI;
    (root as any).y0 = 0;
    
    update(root);

  }, [data, dimensions]);

  return (
    <div 
      ref={containerRef} 
      className="w-full h-full pt-16 cursor-grab active:cursor-grabbing text-zinc-800 dark:text-zinc-200 relative bg-transparent"
      style={{
        '--bg-color': isDark ? '#09090b' : '#f9fafb',
        '--stroke-color': isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)'
      } as React.CSSProperties}
    >
      <svg ref={svgRef} width="100%" height="100%" style={{ backgroundColor: 'transparent' }}></svg>
      <div className="absolute bottom-4 left-4 text-xs font-mono bg-zinc-200 dark:bg-black/50 text-zinc-800 dark:text-white px-3 py-2 rounded flex flex-col gap-1 pointer-events-none">
        <span>🖱️ Scroll to Zoom • Drag to Pan</span>
        <span>👉 Click nodes to Expand / Collapse</span>
        <span>🔗 Click outer items to Search</span>
      </div>
    </div>
  );
}
