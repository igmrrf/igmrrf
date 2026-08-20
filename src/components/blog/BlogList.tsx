"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Calendar,
  Clock,
  Search,
  Tag,
  SlidersHorizontal,
  X,
  BookOpen,
} from "lucide-react";
import { motion } from "framer-motion";
import { BlogPost } from "@/schemas/portfolio";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
} as const;

const item = {
  hidden: { opacity: 0, y: 15 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
  },
} as const;

interface BlogListProps {
  posts: (BlogPost & { slug: string; readingTime?: string })[];
}

export function BlogList({ posts }: BlogListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"newest" | "oldest">("newest");

  // Extract unique tags across all posts
  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    for (const post of posts) {
      if (post.tags && Array.isArray(post.tags)) {
        for (const tag of post.tags) {
          tagSet.add(tag);
        }
      }
    }
    return Array.from(tagSet).sort();
  }, [posts]);

  // Filter and sort posts
  const filteredPosts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return posts
      .filter((post) => {
        const matchesTag =
          selectedTag === "all" ||
          (post.tags && post.tags.includes(selectedTag));

        if (!matchesTag) return false;

        if (!query) return true;

        const inTitle = post.title.toLowerCase().includes(query);
        const inSummary = post.summary.toLowerCase().includes(query);
        const inTags = post.tags?.some((t) => t.toLowerCase().includes(query));

        return inTitle || inSummary || inTags;
      })
      .sort((a, b) => {
        const timeA = new Date(a.date).getTime();
        const timeB = new Date(b.date).getTime();
        return sortBy === "newest" ? timeB - timeA : timeA - timeB;
      });
  }, [posts, searchQuery, selectedTag, sortBy]);

  return (
    <div className="flex flex-col gap-10">
      {/* Search and Filter Controls Toolbar */}
      <div className="flex flex-col gap-5 p-6 border border-border bg-background/80 backdrop-blur-md">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search across articles, topics, keywords..."
              className="w-full pl-10 pr-9 py-2.5 bg-background border border-border text-xs font-mono focus:outline-none focus:border-primary text-foreground placeholder:text-muted-foreground/60 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground"
                aria-label="Clear Search"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4 text-muted-foreground shrink-0 hidden sm:inline" />
            <select
              value={sortBy}
              onChange={(e) =>
                setSortBy(e.target.value as "newest" | "oldest")
              }
              className="bg-background border border-border px-3 py-2.5 text-xs font-mono uppercase tracking-wider text-foreground focus:outline-none focus:border-primary"
            >
              <option value="newest">Sort: Newest First</option>
              <option value="oldest">Sort: Oldest First</option>
            </select>
          </div>
        </div>

        {/* Tag Filter Pills */}
        <div className="flex items-center gap-2 flex-wrap pt-2 border-t border-border/50">
          <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mr-1">
            Tags:
          </span>
          <button
            onClick={() => setSelectedTag("all")}
            className={`px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider border transition-all ${
              selectedTag === "all"
                ? "bg-primary text-primary-foreground border-primary font-black"
                : "border-border/80 bg-accent/20 text-muted-foreground hover:border-primary/50 hover:text-foreground"
            }`}
          >
            All ({posts.length})
          </button>
          {allTags.map((tag) => {
            const count = posts.filter((p) => p.tags?.includes(tag)).length;
            const isSelected = selectedTag === tag;
            return (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider border transition-all ${
                  isSelected
                    ? "bg-primary text-primary-foreground border-primary font-black"
                    : "border-border/80 bg-accent/20 text-muted-foreground hover:border-primary/50 hover:text-foreground"
                }`}
              >
                {tag} ({count})
              </button>
            );
          })}
        </div>

        {/* Feed Status Summary */}
        <div className="flex items-center justify-between text-[10px] font-mono text-muted-foreground pt-2 border-t border-border/30">
          <span>
            FEED_INDEX: Showing {filteredPosts.length} of {posts.length} articles
          </span>
          {(searchQuery || selectedTag !== "all") && (
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedTag("all");
              }}
              className="text-primary hover:underline uppercase tracking-wider"
            >
              Reset Filters [CLR]
            </button>
          )}
        </div>
      </div>

      {/* Blog Cards Grid */}
      {filteredPosts.length === 0 ? (
        <div className="py-24 text-center border border-dashed border-border bg-accent/5 flex flex-col items-center justify-center gap-4">
          <BookOpen className="h-8 w-8 text-muted-foreground/60" />
          <div className="flex flex-col gap-1">
            <h3 className="font-mono text-sm uppercase tracking-widest text-foreground font-black">
              NO_ARTICLES_FOUND
            </h3>
            <p className="text-xs font-mono text-muted-foreground max-w-sm">
              No published articles matched your search query or tag criteria.
            </p>
          </div>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedTag("all");
            }}
            className="mt-2 px-4 py-2 border border-primary text-primary font-mono text-[10px] uppercase tracking-widest hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            Clear_Search()
          </button>
        </div>
      ) : (
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          key={`${selectedTag}-${searchQuery}-${sortBy}`}
          className="grid grid-cols-1 md:grid-cols-2 border-t border-l border-border"
        >
          {filteredPosts.map((post, index) => (
            <motion.div key={post.slug} variants={item}>
              <Link
                href={`/blog/${post.slug}`}
                className="group flex flex-col justify-between gap-6 p-8 md:p-10 border-r border-b border-border bg-background/70 hover:bg-muted/40 transition-all relative h-full"
              >
                <div className="flex flex-col gap-4">
                  {/* Card Header Meta */}
                  <div className="flex flex-wrap items-center justify-between gap-3 text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1.5 px-2 py-0.5 border border-border bg-accent/30 text-foreground">
                        <Calendar className="h-3 w-3 text-primary" />{" "}
                        {new Date(post.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                      {post.readingTime && (
                        <span className="flex items-center gap-1 text-muted-foreground">
                          <Clock className="h-3 w-3" /> {post.readingTime}
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] font-mono text-border font-bold group-hover:text-primary/40 transition-colors select-none">
                      {"// " + String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="text-2xl font-black group-hover:text-primary transition-colors leading-tight uppercase italic tracking-tight break-words">
                    {post.title}
                  </h2>

                  {/* Summary */}
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 font-medium">
                    {post.summary}
                  </p>
                </div>

                {/* Card Footer */}
                <div className="flex flex-col gap-4 pt-4 border-t border-border/40 mt-4">
                  <div className="flex flex-wrap gap-1.5">
                    {post.tags?.map((tag: string) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1 text-[9px] font-mono px-2 py-0.5 border border-border/80 bg-accent/20 text-muted-foreground uppercase"
                      >
                        <Tag className="h-2.5 w-2.5 text-primary/70" /> {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 text-[10px] font-mono tracking-[0.2em] uppercase font-black text-primary group-hover:tracking-[0.25em] transition-all">
                    Read_Article{" "}
                    <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
