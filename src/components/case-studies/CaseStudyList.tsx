"use client";

import Link from "next/link";
import { ArrowRight, Calendar, Github } from "lucide-react";
import { motion } from "framer-motion";
import { CaseStudy } from "@/schemas/portfolio";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
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

export function CaseStudyList({
  studies,
}: {
  studies: (CaseStudy & { slug: string })[];
}) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-2 border-t border-l border-border"
    >
      {studies.map((study, i) => (
        <motion.div key={study.slug} variants={item}>
          <div className="group flex flex-col justify-between gap-8 p-8 md:p-10 border-r border-b border-border bg-background/70 hover:bg-muted/40 transition-all relative overflow-hidden h-full">
            <div className="flex flex-col gap-4 relative z-10">
              <div className="flex flex-wrap items-center justify-between gap-4 text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
                <span className="flex items-center gap-1.5 px-2 py-0.5 border border-border bg-accent/30 text-foreground font-bold">
                  <Calendar className="h-3 w-3 text-primary" />{" "}
                  {new Date(study.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                  })}
                </span>
                <Link
                  href={study.githubUrl}
                  target="_blank"
                  className="flex items-center gap-1.5 hover:text-primary transition-colors"
                  aria-label="GitHub Repository"
                >
                  <Github className="h-3.5 w-3.5" /> Source
                </Link>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black group-hover:text-primary transition-colors leading-tight uppercase italic tracking-tight break-words">
                {study.title}
              </h2>

              <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 font-medium">
                {study.summary}
              </p>

              <div className="flex flex-wrap gap-1.5 pt-2">
                {study.techStack.map((tag) => (
                  <span
                    key={tag}
                    className="text-[9px] font-mono px-2 py-0.5 border border-border bg-accent/30 text-muted-foreground uppercase"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-border/50 flex items-center justify-between">
              <Link
                href={`/case-studies/${study.slug}`}
                className="inline-flex items-center gap-2 text-[10px] font-mono tracking-[0.2em] uppercase font-black text-primary hover:tracking-[0.25em] transition-all"
              >
                Case_Study.view() <ArrowRight className="h-3 w-3" />
              </Link>
              <span className="text-[10px] font-mono text-muted-foreground/60 font-bold">
                0{i + 1}
              </span>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
