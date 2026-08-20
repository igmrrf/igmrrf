'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { useTheme } from 'next-themes';
import { HierarchicalData } from '@/lib/parseTechStack';

type ExtendedHierarchyNode = d3.HierarchyPointNode<HierarchicalData> & {
  _children?: ExtendedHierarchyNode[] | null;
  id?: string;
  x0?: number;
  y0?: number;
};

export default function RadialMindMapView({ data }: { data: HierarchicalData }) {
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
          height: containerRef.current.getBoundingClientRect().height,
        });
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!data || !svgRef.current || dimensions.width === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const radius = Math.max(300, Math.min(dimensions.width, dimensions.height) / 2 - 50);

    const root = d3.hierarchy<HierarchicalData>(data) as ExtendedHierarchyNode;
    const tree = d3
      .tree<HierarchicalData>()
      .size([2 * Math.PI, radius])
      .separation((a, b) => (a.parent === b.parent ? 1 : 2) / a.depth);

    // Initialize the tree with all categories collapsed by default
    root.each((d) => {
      const node = d as ExtendedHierarchyNode;
      node.id = node.data.name + Math.random().toString(36).substring(2, 9);
      node._children = node.children as ExtendedHierarchyNode[] | undefined;
      if (node.depth === 1 && node.children) {
        node.children = undefined;
      }
    });

    const g = svg.append('g');

    const zoom = d3
      .zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.1, 4])
      .on('zoom', (event) => {
        g.attr('transform', event.transform);
      });

    svg.call(zoom);

    svg.call(
      zoom.transform,
      d3.zoomIdentity
        .translate(dimensions.width / 2, dimensions.height / 2)
        .scale(dimensions.width < 600 ? 0.6 : 1)
    );

    const gLink = g
      .append('g')
      .attr('fill', 'none')
      .attr('stroke', 'currentColor')
      .attr('stroke-opacity', 0.4)
      .attr('stroke-width', 1.5);

    const gNode = g.append('g');
    const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

    function update(source: ExtendedHierarchyNode) {
      const nodes = root.descendants() as ExtendedHierarchyNode[];
      const links = root.links();

      tree(root);

      const transition = svg.transition().duration(500);

      // Links
      const link = gLink
        .selectAll<SVGPathElement, d3.HierarchyPointLink<HierarchicalData>>('path')
        .data(links as d3.HierarchyPointLink<HierarchicalData>[], (d) => (d.target as ExtendedHierarchyNode).id || '');

      const linkEnter = link
        .enter()
        .append('path')
        .attr(
          'd',
          d3
            .linkRadial<d3.HierarchyPointLink<HierarchicalData>, ExtendedHierarchyNode>()
            .angle((d) => (d as ExtendedHierarchyNode).x0 || (d as ExtendedHierarchyNode).x)
            .radius((d) => (d as ExtendedHierarchyNode).y0 || (d as ExtendedHierarchyNode).y) as unknown as string
        )
        .attr('stroke-opacity', 0);

      link
        .merge(linkEnter)
        .transition(transition as unknown as d3.Transition<d3.BaseType, unknown, null, undefined>)
        .attr(
          'd',
          d3
            .linkRadial<d3.HierarchyPointLink<HierarchicalData>, ExtendedHierarchyNode>()
            .angle((d) => (d as ExtendedHierarchyNode).x)
            .radius((d) => (d as ExtendedHierarchyNode).y) as unknown as string
        )
        .attr('stroke-opacity', 0.4);

      link
        .exit()
        .transition(transition as unknown as d3.Transition<d3.BaseType, unknown, null, undefined>)
        .attr(
          'd',
          d3
            .linkRadial<d3.HierarchyPointLink<HierarchicalData>, ExtendedHierarchyNode>()
            .angle((d) => (d as ExtendedHierarchyNode).x)
            .radius((d) => (d as ExtendedHierarchyNode).y) as unknown as string
        )
        .attr('stroke-opacity', 0)
        .remove();

      // Nodes
      const node = gNode
        .selectAll<SVGGElement, ExtendedHierarchyNode>('g.node')
        .data(nodes, (d) => d.id || '');

      const nodeEnter = node
        .enter()
        .append('g')
        .attr('class', 'node')
        .attr(
          'transform',
          `rotate(${(((source.x0 ?? source.x) * 180) / Math.PI - 90)}) translate(${source.y0 ?? source.y},0)`
        )
        .attr('fill-opacity', 0)
        .attr('stroke-opacity', 0);

      nodeEnter
        .append('circle')
        .attr('r', (d) => (d.depth === 0 ? 8 : d.depth === 1 ? 6 : 4))
        .attr('fill', (d) =>
          d._children && !d.children
            ? '#3b82f6'
            : colorScale(d.data.category || d.data.name)
        )
        .attr('stroke', 'var(--stroke-color)')
        .attr('stroke-width', 2)
        .style('cursor', 'pointer')
        .on('click', (_event, d) => {
          const targetNode = d as ExtendedHierarchyNode;
          if (targetNode.children) {
            targetNode._children = targetNode.children as ExtendedHierarchyNode[];
            targetNode.children = undefined;
          } else if (targetNode._children) {
            targetNode.children = targetNode._children;
            targetNode._children = null;
          } else {
            window.open(
              `https://www.google.com/search?q=${encodeURIComponent(
                targetNode.data.name + ' technology'
              )}`,
              '_blank'
            );
            return;
          }
          update(targetNode);
        });

      const textNode = nodeEnter
        .append('text')
        .attr('dy', '0.31em')
        .text((d) => d.data.name)
        .attr('font-size', (d) => (d.depth === 0 ? '14px' : d.depth === 1 ? '12px' : '10px'))
        .attr('font-weight', (d) => (d.depth <= 1 ? 'bold' : 'normal'))
        .attr('fill', 'currentColor')
        .style('cursor', 'pointer')
        .on('click', (_event, d) => {
          const targetNode = d as ExtendedHierarchyNode;
          if (targetNode.children || targetNode._children) {
            if (targetNode.children) {
              targetNode._children = targetNode.children as ExtendedHierarchyNode[];
              targetNode.children = undefined;
            } else {
              targetNode.children = targetNode._children || undefined;
              targetNode._children = null;
            }
            update(targetNode);
          } else {
            window.open(
              `https://www.google.com/search?q=${encodeURIComponent(
                targetNode.data.name + ' technology'
              )}`,
              '_blank'
            );
          }
        });

      textNode
        .clone(true)
        .lower()
        .attr('stroke', 'var(--bg-color)')
        .attr('stroke-width', 3)
        .attr('stroke-linejoin', 'round');

      const nodeUpdate = node
        .merge(nodeEnter)
        .transition(transition as unknown as d3.Transition<d3.BaseType, unknown, null, undefined>)
        .attr(
          'transform',
          (d) => `rotate(${((d.x * 180) / Math.PI - 90)}) translate(${d.y},0)`
        )
        .attr('fill-opacity', 1)
        .attr('stroke-opacity', 1);

      nodeUpdate
        .select('circle')
        .attr('fill', (d) =>
          d._children && !d.children
            ? '#3b82f6'
            : colorScale(d.data.category || d.data.name)
        );

      nodeUpdate
        .selectAll<SVGTextElement, ExtendedHierarchyNode>('text')
        .attr('x', (d) => (d.x < Math.PI === !(d.children || d._children) ? 8 : -8))
        .attr('text-anchor', (d) => (d.x < Math.PI === !(d.children || d._children) ? 'start' : 'end'))
        .attr('transform', (d) => (d.x >= Math.PI ? 'rotate(180)' : ''));

      node
        .exit()
        .transition(transition as unknown as d3.Transition<d3.BaseType, unknown, null, undefined>)
        .attr(
          'transform',
          `rotate(${((source.x * 180) / Math.PI - 90)}) translate(${source.y},0)`
        )
        .attr('fill-opacity', 0)
        .attr('stroke-opacity', 0)
        .remove();

      root.eachBefore((d) => {
        const node = d as ExtendedHierarchyNode;
        node.x0 = node.x;
        node.y0 = node.y;
      });
    }

    root.x0 = Math.PI;
    root.y0 = 0;

    update(root);
  }, [data, dimensions]);

  return (
    <div
      ref={containerRef}
      className="w-full h-full pt-16 cursor-grab active:cursor-grabbing text-zinc-800 dark:text-zinc-200 relative bg-transparent"
      style={
        {
          '--bg-color': isDark ? '#09090b' : '#f9fafb',
          '--stroke-color': isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)',
        } as React.CSSProperties
      }
    >
      <svg ref={svgRef} width="100%" height="100%" style={{ backgroundColor: 'transparent' }} />
      <div className="absolute bottom-4 left-4 text-xs font-mono bg-zinc-200 dark:bg-black/70 text-zinc-800 dark:text-white px-3 py-2 rounded flex flex-col gap-1 pointer-events-none border border-border">
        <span>🖱️ Scroll to Zoom • Drag to Pan</span>
        <span>👉 Click nodes to Expand / Collapse</span>
        <span>🔗 Click outer items to Search</span>
      </div>
    </div>
  );
}
