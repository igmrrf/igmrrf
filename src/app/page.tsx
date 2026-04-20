"use client";

import Link from "next/link";
import { ArrowRight, Code2, Database, ShieldCheck, Zap } from "lucide-react";
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
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

export default function Home() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="flex flex-col gap-24 md:gap-40"
    >
      {/* Hero Section */}
      <section className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8 flex flex-col gap-8">
          <motion.div
            variants={item}
            className="flex items-center gap-3 text-[10px] font-mono tracking-[0.3em] uppercase text-primary"
          >
            <span className="w-8 h-[1px] bg-primary" />
            System Architect / Senior Engineer
          </motion.div>
          <motion.h1
            variants={item}
            className="text-5xl md:text-8xl font-black tracking-tighter uppercase italic leading-[0.85]"
          >
            Engineering <br />
            <span className="text-primary not-italic">Reliability</span> &{" "}
            <br />
            Scalability.
          </motion.h1>
          <motion.p
            variants={item}
            className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl font-medium"
          >
            Building the next generation of distributed systems with a focus on
            Clean Architecture and high-performance TypeScript ecosystems.
            Technical excellence meets business-critical value.
          </motion.p>
          <motion.div variants={item} className="flex flex-wrap gap-4 pt-6">
            <Link
              href="/case-studies"
              className="group relative px-8 py-4 bg-foreground text-background font-mono text-xs tracking-widest uppercase overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-3">
                Execute.studies(){" "}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
              <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </Link>
            <Link
              href="/chat"
              className="px-8 py-4 border border-border font-mono text-xs tracking-widest uppercase hover:bg-muted transition-colors"
            >
              Connect.stream()
            </Link>
          </motion.div>
        </div>

        <motion.div
          variants={item}
          className="hidden lg:flex lg:col-span-4 flex-col gap-4 border-l border-border pl-8 pt-12 italic"
        >
          <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground/60">
            Core_Stack.json
          </div>
          <div className="flex flex-col gap-2 text-sm font-bold">
            <span className="hover:text-primary cursor-default transition-colors">
              01. NEXT.JS_15
            </span>
            <span className="hover:text-primary cursor-default transition-colors">
              02. TYPESCRIPT_STRICT
            </span>
            <span className="hover:text-primary cursor-default transition-colors">
              03. DISTRIBUTED_POSTGRES
            </span>
            <span className="hover:text-primary cursor-default transition-colors">
              04. LLM_INGESTION_PIPES
            </span>
          </div>
        </motion.div>
      </section>

      {/* Expertise Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-l border-border">
        {[
          {
            icon: Code2,
            title: "Modern RSC",
            desc: "Ultra-fast Next.js architectures leveraging Server Components.",
          },
          {
            icon: Database,
            title: "System Design",
            desc: "Expertise in distributed data, caching, and clean decoupling.",
          },
          {
            icon: ShieldCheck,
            title: "Secure Ops",
            desc: "Rigorous focus on credential security and robust auth.",
          },
          {
            icon: Zap,
            title: "Max Perf",
            desc: "Optimizing for sub-second LCP and perfect Core Web Vitals.",
          },
        ].map((expertise, i) => (
          <motion.div
            key={i}
            variants={item}
            className="flex flex-col gap-6 p-10 border-r border-b border-border group hover:bg-muted/50 transition-colors"
          >
            <div className="flex items-center justify-between">
              <expertise.icon className="h-8 w-8 text-primary opacity-50 group-hover:opacity-100 transition-opacity" />
              <span className="text-[10px] font-mono text-muted-foreground">
                0{i + 1}
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-black uppercase tracking-tight italic">
                {expertise.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {expertise.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </section>

      {/* Featured Projects Preview */}
      <section className="flex flex-col gap-12">
        <motion.div
          variants={item}
          className="flex items-end justify-between border-b border-border pb-6"
        >
          <div className="flex flex-col gap-2">
            <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-primary">
              Portfolio.exe
            </div>
            <h2 className="text-4xl font-black tracking-tighter uppercase italic">
              Selected_Briefs
            </h2>
          </div>
          <Link
            href="/case-studies"
            className="font-mono text-[10px] tracking-widest uppercase hover:text-primary flex items-center gap-2 group mb-1"
          >
            Browse_All{" "}
            <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
          {[
            {
              title: "BugRelay",
              desc: "Scalable reporting infrastructure with multi-tenant identity verification.",
              tags: ["Next.js", "Prisma", "PostgreSQL"],
            },
            {
              title: "Enterprise Clean Architecture",
              desc: "Implementing strict decoupling and DI in high-scale Node.js systems.",
              tags: ["TypeScript", "Node.js", "Clean Architecture"],
            },
            {
              title: "vi-mongo.nvim",
              desc: "Asynchronous TUI database explorer built with Lua coroutines.",
              tags: ["Lua", "Neovim", "MongoDB"],
            },
          ].map((project, i) => (
            <motion.div
              key={i}
              variants={item}
              className="group flex flex-col gap-6 p-10 border border-border bg-background transition-all hover:bg-muted hover:z-10 relative"
            >
              <div className="flex flex-col gap-4 flex-1">
                <h3 className="text-2xl font-black uppercase tracking-tighter group-hover:text-primary transition-colors italic">
                  {project.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {project.desc}
                </p>
              </div>
              <div className="flex flex-wrap gap-2 pt-4">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-mono px-2 py-1 border border-border bg-accent text-muted-foreground uppercase"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </motion.div>
  );
}
