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
          <div className="group flex flex-col gap-8 p-10 border-r border-b border-border bg-background transition-all hover:bg-muted relative overflow-hidden h-full">
            <div className="flex flex-col gap-4 relative z-10 flex-1">
              <div className="flex flex-wrap items-center gap-4 text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
                <span className="flex items-center gap-1.5 px-2 py-1 border border-border bg-accent text-primary">
                  <Calendar className="h-3 w-3" />{" "}
                  {new Date(study.date).toLocaleDateString()}
                </span>
                <Link
                  href={study.githubUrl}
                  target="_blank"
                  className="flex items-center gap-1.5 hover:text-primary transition-colors"
                >
                  <Github className="h-3 w-3" /> Repo
                </Link>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black group-hover:text-primary transition-colors leading-none uppercase italic tracking-tighter break-words">
                {study.title.replace(/ /g, "_")}
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                {study.summary}
              </p>

              <div className="flex flex-wrap gap-2 pt-2">
                {study.techStack.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-mono px-2 py-0.5 border border-border bg-accent/50 text-muted-foreground uppercase"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-8">
              <Link
                href={`/case-studies/${study.slug}`}
                className="inline-flex items-center gap-2 text-[10px] font-mono tracking-[0.2em] uppercase font-black text-primary hover:tracking-[0.3em] transition-all"
              >
                Case_Study.view() <ArrowRight className="h-3 w-3" />
              </Link>
            </div>

            {/* Decorative Index */}
            <div className="absolute top-4 right-4 text-[40px] font-black text-border/20 select-none group-hover:text-primary/10 transition-colors">
              // 0{i + 1}
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
