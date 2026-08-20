"use client";

import Link from "next/link";
import { ArrowRight, Github, Terminal } from "lucide-react";
import { motion } from "framer-motion";
import { CaseStudy } from "@/schemas/portfolio";
import { ArchitecturalCard } from "@/components/ui/ArchitecturalCard";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
} as const;

const item = {
  hidden: { opacity: 0, y: 15 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
  },
} as const;

export default function HomeClient({
  projects,
}: {
  projects: (CaseStudy & { slug: string })[];
}) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="flex flex-col gap-24 md:gap-36"
    >
      {/* Hero Section */}
      <section className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8 flex flex-col gap-8 relative">
          <motion.div
            variants={item}
            className="flex items-center gap-3 text-[10px] font-mono tracking-[0.3em] uppercase text-primary"
          >
            <Terminal className="h-3.5 w-3.5" />
            <span className="w-8 h-[1px] bg-primary" />
            Head of Product / System Architect
          </motion.div>

          <motion.h1
            variants={item}
            className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter uppercase italic leading-[0.9]"
          >
            Decentralized <br />
            <span className="text-primary not-italic">Distribution</span> & <br />
            Scale.
          </motion.h1>

          <motion.p
            variants={item}
            className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl font-medium"
          >
            Building the next generation of decentralized systems and product
            distribution networks. Bridging digital IP with global supply
            chains through elite engineering and strategic product leadership.
          </motion.p>

          <motion.div variants={item} className="flex flex-wrap gap-4 pt-4">
            <Link
              href="/stack"
              className="px-8 py-4 bg-primary text-primary-foreground font-mono text-xs tracking-widest uppercase hover:bg-primary/90 transition-all flex items-center gap-3 group active:scale-95 shadow-sm"
            >
              Connect.stack()
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/case-studies"
              className="px-8 py-4 border border-border bg-background/80 font-mono text-xs tracking-widest uppercase hover:bg-muted transition-colors flex items-center gap-2 active:scale-95"
            >
              Execute.case_studies()
            </Link>
          </motion.div>
        </div>

        <motion.div
          variants={item}
          className="hidden lg:flex lg:col-span-4 flex-col gap-5 border-l border-border pl-8 pt-8 italic bg-accent/10 p-6"
        >
          <div className="text-[10px] font-mono uppercase tracking-widest text-primary font-bold">
            Core_Directives.json
          </div>
          <div className="flex flex-col gap-3 text-xs font-bold font-mono">
            <div className="flex items-center gap-2 text-foreground/90">
              <span className="text-primary">01.</span> WEB3_DISTRIBUTION
            </div>
            <div className="flex items-center gap-2 text-foreground/90">
              <span className="text-primary">02.</span> CLEAN_ARCHITECTURE
            </div>
            <div className="flex items-center gap-2 text-foreground/90">
              <span className="text-primary">03.</span> HIGH_SCALE_FINTECH
            </div>
            <div className="flex items-center gap-2 text-foreground/90">
              <span className="text-primary">04.</span> TERMINAL_WORKFLOWS
            </div>
          </div>
          <div className="pt-4 border-t border-border/60 text-[10px] font-mono text-muted-foreground not-italic uppercase tracking-wider">
            STATUS: ACTIVE // DEPLOYED
          </div>
        </motion.div>
      </section>

      {/* Expertise Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-l border-border">
        {[
          {
            iconType: "rsc" as const,
            title: "Modern RSC",
            desc: "Ultra-fast Next.js architectures leveraging Server Components and strict decoupling.",
          },
          {
            iconType: "system" as const,
            title: "System Design",
            desc: "Expertise in distributed data, caching, CQRS, and resilient event brokers.",
          },
          {
            iconType: "security" as const,
            title: "Secure Ops",
            desc: "Rigorous focus on credential security, RBAC, TOTP, and zero-trust auth pipelines.",
          },
          {
            iconType: "perf" as const,
            title: "Max Perf",
            desc: "Optimizing for sub-second LCP, sub-millisecond hot paths, and sub-100ms APIs.",
          },
        ].map((expertise, i) => (
          <motion.div key={i} variants={item}>
            <ArchitecturalCard
              index={i + 1}
              iconType={expertise.iconType}
              title={expertise.title}
              desc={expertise.desc}
            />
          </motion.div>
        ))}
      </section>

      {/* Featured Projects Preview */}
      <section className="flex flex-col gap-10">
        <motion.div
          variants={item}
          className="flex items-end justify-between border-b border-border pb-6"
        >
          <div className="flex flex-col gap-2">
            <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-primary">
              Portfolio.exe
            </div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tighter uppercase italic">
              Selected_Briefs
            </h2>
          </div>
          <Link
            href="/case-studies"
            className="font-mono text-[10px] tracking-widest uppercase hover:text-primary flex items-center gap-2 group mb-1 text-muted-foreground"
          >
            Browse_All{" "}
            <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.slice(0, 3).map((project, i) => (
            <motion.div
              key={project.slug}
              variants={item}
              className="group flex flex-col justify-between p-8 border border-border bg-background/70 hover:bg-muted/40 transition-all relative"
            >
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-primary font-bold">
                    0{i + 1} {"// CASE_STUDY"}
                  </span>
                  <Link
                    href={project.githubUrl}
                    target="_blank"
                    className="text-muted-foreground hover:text-primary transition-colors p-1"
                    aria-label="GitHub Repository"
                  >
                    <Github className="h-4 w-4" />
                  </Link>
                </div>
                <h3 className="text-xl font-black uppercase tracking-tight group-hover:text-primary transition-colors italic">
                  {project.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {project.summary}
                </p>
              </div>

              <div className="flex flex-col gap-6 pt-6 mt-6 border-t border-border/50">
                <div className="flex flex-wrap gap-1.5">
                  {project.techStack.slice(0, 4).map((tag) => (
                    <span
                      key={tag}
                      className="text-[9px] font-mono px-2 py-0.5 border border-border bg-accent/40 text-muted-foreground uppercase"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <Link
                  href={`/case-studies/${project.slug}`}
                  className="inline-flex items-center gap-2 text-[10px] font-mono font-black uppercase text-primary group-hover:tracking-wider transition-all"
                >
                  View_Study <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </motion.div>
  );
}
