"use client";

import Link from "next/link";
import { ArrowRight, Calendar, Tag } from "lucide-react";
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
} as const;

const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
  },
} as const;

export function BlogList({ posts }: { posts: any[] }) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-2 border-t border-l border-border"
    >
      {posts.map((post) => (
        <motion.div key={post.slug} variants={item}>
          <Link
            href={`/blog/${post.slug}`}
            className="group flex flex-col gap-8 p-10 border-r border-b border-border bg-background transition-all hover:bg-muted relative overflow-hidden"
          >
            <div className="flex flex-col gap-4 relative z-10">
              <div className="flex flex-wrap items-center gap-4 text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
                <span className="flex items-center gap-1.5 px-2 py-1 border border-border bg-accent">
                  <Calendar className="h-3 w-3" />{" "}
                  {new Date(post.date).toLocaleDateString()}
                </span>
                <div className="flex gap-2">
                  {post.tags.slice(0, 2).map((tag: string) => (
                    <span
                      key={tag}
                      className="flex items-center gap-1 text-primary"
                    >
                      <Tag className="h-3 w-3" /> {tag}
                    </span>
                  ))}
                </div>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black group-hover:text-primary transition-colors leading-none uppercase italic tracking-tighter break-words line-clamp-2 min-h-[4rem]">
                {post.title.replace(/ /g, "_")}
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                {post.summary}
              </p>
            </div>
            <div className="mt-auto flex items-center gap-2 text-[10px] font-mono tracking-[0.2em] uppercase font-black group-hover:text-primary">
              Read_Entry{" "}
              <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
            </div>

            {/* Decorative Index */}
            <div className="absolute top-4 right-4 text-[40px] font-black text-border/20 select-none group-hover:text-primary/10 transition-colors">
              //
            </div>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
}
