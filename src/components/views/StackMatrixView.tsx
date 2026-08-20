"use client";

import React, { useState, useMemo } from "react";
import { Search, ExternalLink, Filter, Layers } from "lucide-react";
import { HierarchicalData } from "@/lib/parseTechStack";

interface StackMatrixViewProps {
  hierarchy: HierarchicalData;
}

interface CategoryGroup {
  name: string;
  value?: number;
  category?: string;
  children: HierarchicalData[];
}

export default function StackMatrixView({ hierarchy }: StackMatrixViewProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = useMemo(() => {
    return hierarchy.children || [];
  }, [hierarchy]);

  const filteredCategories = useMemo<CategoryGroup[]>(() => {
    const query = searchQuery.trim().toLowerCase();

    const results: CategoryGroup[] = [];
    for (const cat of categories) {
      const matchesCategory =
        selectedCategory === "all" || cat.name === selectedCategory;
      if (!matchesCategory) continue;

      const matchingItems = (cat.children || []).filter((item) => {
        if (!query) return true;
        return (
          item.name.toLowerCase().includes(query) ||
          cat.name.toLowerCase().includes(query)
        );
      });

      if (matchingItems.length > 0) {
        results.push({
          ...cat,
          children: matchingItems,
        });
      }
    }
    return results;
  }, [categories, searchQuery, selectedCategory]);

  const totalSkillsCount = useMemo(() => {
    let count = 0;
    for (const cat of categories) {
      count += cat.children?.length || 0;
    }
    return count;
  }, [categories]);

  return (
    <div className="w-full h-full flex flex-col pt-16 px-4 md:px-8 max-w-6xl mx-auto overflow-y-auto">
      {/* Search & Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-8 bg-background/80 backdrop-blur-md p-4 border border-border">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search technologies (e.g., Rust, React, Docker, Next.js)..."
            className="w-full pl-9 pr-4 py-2 bg-background border border-border text-xs font-mono focus:outline-none focus:border-primary transition-colors text-foreground"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
          <Filter className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-background border border-border px-3 py-2 text-xs font-mono uppercase tracking-wider text-foreground focus:outline-none focus:border-primary"
          >
            <option value="all">All Domains ({totalSkillsCount})</option>
            {categories.map((cat) => (
              <option key={cat.name} value={cat.name}>
                {cat.name} ({cat.children?.length || 0})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Grid of Categories */}
      {filteredCategories.length === 0 ? (
        <div className="py-20 text-center border border-dashed border-border bg-accent/5 flex flex-col items-center gap-3">
          <Layers className="h-6 w-6 text-muted-foreground" />
          <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            NO_MATCHING_TECHNOLOGY // Search query yielded 0 results
          </span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-20">
          {filteredCategories.map((cat) => (
            <div
              key={cat.name}
              className="flex flex-col border border-border bg-background/60 p-6 group hover:border-primary/50 transition-colors"
            >
              <div className="flex items-center justify-between border-b border-border pb-3 mb-4">
                <h3 className="font-mono text-xs font-black uppercase tracking-wider text-primary">
                  {cat.name}
                </h3>
                <span className="font-mono text-[10px] text-muted-foreground">
                  {cat.children?.length || 0} items
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {cat.children?.map((item) => (
                  <a
                    key={item.name}
                    href={`https://www.google.com/search?q=${encodeURIComponent(
                      item.name + " technology"
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-mono border border-border/80 bg-accent/20 text-foreground/90 hover:border-primary hover:text-primary hover:bg-accent transition-all"
                  >
                    <span>{item.name}</span>
                    <ExternalLink className="h-2.5 w-2.5 opacity-40 hover:opacity-100" />
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
