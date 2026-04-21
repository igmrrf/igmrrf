"use client";

import { Briefcase, Download, ExternalLink, Terminal } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ExperiencePage() {
  const resumePath = "/Francis Igbiriki - Software Engineer - Resume.pdf";
  const encodedResumePath = encodeURI(resumePath);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col gap-24 max-w-5xl mx-auto"
    >
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12 border-l-4 border-primary pl-10 py-6 bg-accent/20">
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-3 text-[10px] font-mono tracking-[0.4em] uppercase text-primary">
            <Terminal className="h-3 w-3" />
            System.logs_history()
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-8xl font-black tracking-tighter uppercase italic leading-none">
            Experience
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed font-medium">
            A chronological trace of professional outputs, architectural
            decisions, and system engineering.
          </p>
        </div>

        <Link
          href={encodedResumePath}
          download
          className="group relative px-8 py-4 bg-primary text-primary-foreground font-mono text-xs tracking-widest uppercase overflow-hidden shrink-0"
        >
          <span className="relative z-10 flex items-center gap-3">
            Download.pdf() <Download className="h-4 w-4" />
          </span>
          <div className="absolute inset-0 bg-foreground translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
        </Link>
      </div>

      {/* Main Experience Feed */}
      <div className="flex flex-col border-t border-border">
        {experiences.map((exp, i) => (
          <div
            key={i}
            className="group grid grid-cols-1 md:grid-cols-12 border-b border-border transition-colors hover:bg-muted/30"
          >
            {/* Metadata Col */}
            <div className="md:col-span-3 p-10 border-r-0 md:border-r border-border bg-accent/10 flex flex-col gap-2">
              <div className="text-[10px] font-mono font-black uppercase tracking-widest text-primary/50">
                Period.ts
              </div>
              <div className="text-sm font-bold font-mono tracking-tighter">
                {exp.period}
              </div>
            </div>

            {/* Content Col */}
            <div className="md:col-span-9 p-10 flex flex-col gap-8">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3 text-[10px] font-mono tracking-widest uppercase text-primary">
                  <Briefcase className="h-3 w-3" /> {exp.company}
                </div>
                <h3 className="text-3xl font-black uppercase tracking-tighter italic group-hover:text-primary transition-colors">
                  {exp.role}
                </h3>
              </div>

              <p className="text-base text-muted-foreground leading-relaxed max-w-3xl font-medium">
                {exp.desc}
              </p>

              <div className="flex flex-wrap gap-2">
                {exp.stack.map((tech) => (
                  <span
                    key={tech}
                    className="text-[10px] font-mono px-3 py-1 border border-border bg-background uppercase tracking-tighter"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer CTA */}
      <div className="flex flex-col items-center gap-8 py-20 border border-border bg-accent/20 relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-full h-1 bg-primary/20" />
        <h4 className="text-[10px] font-mono font-black uppercase tracking-[0.4em] text-primary">
          End_of_Stream.eof
        </h4>
        <p className="text-sm text-center max-w-md text-muted-foreground px-10">
          Interested in a deep-dive into specific project architectures or
          discussing a potential collaboration?
        </p>
        <div className="flex gap-4">
          <Link
            href="/chat"
            className="px-8 py-4 border border-primary text-primary font-mono text-[10px] tracking-widest uppercase hover:bg-primary hover:text-primary-foreground transition-all"
          >
            System.init()
          </Link>
          <Link
            href="https://linkedin.com/in/igmrrf"
            target="_blank"
            className="px-8 py-4 border border-border font-mono text-[10px] tracking-widest uppercase hover:bg-muted transition-all flex items-center gap-2"
          >
            LinkedIn <ExternalLink className="h-3 w-3" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

const experiences = [
  {
    role: "Senior Software Engineer / Architect",
    company: "SmartX Solutions",
    period: "2023 - Present",
    desc: "Architecting multi-tenant RAG pipelines and high-performance TypeScript ecosystems. Standardized AppLayout for cross-platform consistency and integrated Biome for linting/formatting across microservices.",
    stack: ["Next.js", "TypeScript", "PostgreSQL", "RAG", "Clean Architecture"],
  },
  {
    role: "Full-Stack Developer",
    company: "BugRelay (Freelance/Contract)",
    period: "2021 - 2023",
    desc: "Designed and implemented a scalable reporting infrastructure with multi-tenant identity verification. Focused on technical decoupling and database optimization.",
    stack: ["React", "Node.js", "Prisma", "Distributed Systems"],
  },
  {
    role: "Open Source Contributor",
    company: "Self-Directed",
    period: "2020 - 2021",
    desc: "Built 'vi-mongo.nvim', an asynchronous TUI database explorer using Lua coroutines. Explored terminal-based productivity and high-performance I/O patterns.",
    stack: ["Lua", "Neovim", "MongoDB", "Async Programming"],
  },
];
