"use client";

import { Github, Linkedin, Twitter, Terminal, ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function AboutPage() {
  return (
    <motion.div
      variants={container}
      initial={false}
      animate="show"
      className="flex flex-col gap-24 max-w-6xl mx-auto"
    >
      <motion.div
        variants={item}
        className="flex flex-col gap-6 border-l-4 border-primary pl-10 py-6 bg-accent/20"
      >
        <div className="flex items-center gap-3 text-[10px] font-mono tracking-[0.4em] uppercase text-primary">
          <Terminal className="h-3 w-3" />
          Entity.profile_fetch()
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-8xl font-black tracking-tighter uppercase italic leading-none">
          Francis Igbiriki
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed font-medium">
          System Architect specializing in high-performance distributed systems
          and Clean Architecture.
        </p>
      </motion.div>

      <motion.div
        variants={item}
        className="prose dark:prose-invert max-w-none 
        prose-headings:font-black prose-headings:uppercase prose-headings:italic prose-headings:tracking-tighter
        prose-strong:text-primary font-medium leading-relaxed"
      >
        <h2>Engineering_Philosophy</h2>
        <p>
          I operate under the core maxim that{" "}
          <strong>&quot;Value Begets Peace&quot;</strong>. I believe that code should be
          more than just functional; it should be{" "}
          <strong>maintainable, scalable, and business-centric</strong>. This is
          why I&apos;m an advocate for <strong>Clean Architecture</strong>
          and strict type systems. By decoupling business logic from
          infrastructure, we create systems that can evolve with the needs of
          the organization without crumbling under technical debt.
        </p>
        <p>
          My approach is rooted in a unique cross-disciplinary genesis:
          combining the physical logic of{" "}
          <strong>Mechanical Engineering</strong>, the strategic dynamics of{" "}
          <strong>Business Administration (MBA)</strong>, and the digital
          abstraction of <strong>Computer Science</strong>. This triad allows me
          to architect products where software seamlessly integrates with
          physical supply chains and commercial imperatives.
        </p>

        <h2>Technical_Stack.json</h2>
        <p>
          With years of experience in the TypeScript ecosystem, I&apos;ve built
          everything from complex fintech integrations to high-performance TUI
          tools. I specialize in:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 not-prose mt-8">
          {[
            {
              label: "Languages",
              items: [
                "TypeScript",
                "Go",
                "Rust",
                "Python",
                "C/C++",
                "Solidity",
                "Lua",
              ],
            },
            {
              label: "Frontend",
              items: [
                "React",
                "Next.js",
                "Flutter",
                "React Native",
                "Tailwind CSS",
              ],
            },
            {
              label: "Backend",
              items: [
                "Node.js",
                "Nest.js",
                "Go (Gin)",
                "FastAPI",
                "Rust (Tokio)",
              ],
            },
            {
              label: "Infrastructure",
              items: [
                "PostgreSQL",
                "MongoDB",
                "Redis",
                "Docker",
                "CI/CD",
                "Neo4j",
              ],
            },
          ].map((stack, i) => (
            <div key={i} className="p-6 border border-border bg-accent/20">
              <h4 className="text-[10px] font-mono font-black uppercase tracking-widest text-primary mb-3 underline decoration-primary/30 underline-offset-8">
                {stack.label}
              </h4>
              <div className="flex flex-wrap gap-2">
                {stack.items.map((item) => (
                  <span
                    key={item}
                    className="text-[10px] font-mono uppercase tracking-tighter text-muted-foreground"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="not-prose mt-4 flex justify-end">
          <Link
            href="/stack"
            className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-primary hover:underline group"
          >
            Explore Interactive Tech Stack Matrix & Graph <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <h2 className="mt-16">Kernel_Activity</h2>
        <p>
          I am a <strong>Terminal Maximalist</strong>. I deliberately bypass
          resource-heavy IDEs for a highly customized, keyboard-driven workflow
          centered around
          <strong> Neovim, Tmux, and Lua</strong>. This extreme optimization
          allows for micro-efficiencies and absolute control over the
          computational environment.
        </p>
        <p>
          When I&apos;m not architecting systems, you can find me contributing to
          open-source, building specialized Neovim plugins like{" "}
          <code>pack.nvim</code> and <code>distract.nvim</code>, or sharing
          architectural solutions on{" "}
          <strong>Stack Overflow</strong>, where I maintain authority on deep
          debugging for LSP configurations and modern framework friction points.
        </p>

        <h2 id="contributions" className="mt-16">Open-source contributions</h2>
        <p>
          Patches merged into projects I do not own — from one-line corrections
          to a full SDK overhaul. Listed because a merged pull request is worth
          more than a fork: the fix reaches everyone, and nobody inherits a copy
          to maintain.
        </p>
        <div className="not-prose mt-8 flex flex-col gap-px bg-border border border-border">
          {[
            {
              repo: "fuadop/sendchamp-sdk",
              pr: "#67, #74",
              note: "Call & Email services, rebuilt type surface, rewritten test suites",
              scale: "30 files",
              href: "https://github.com/fuadop/sendchamp-sdk/pull/67",
              caseStudy: "/case-studies/sendchamp-sdk",
            },
            {
              repo: "kopecmaciej/vi-mongo.nvim",
              pr: "#6",
              note: "Opt-in persistent TUI buffer, window-targeting fix, termopen migration",
              scale: "+50/-16",
              href: "https://github.com/kopecmaciej/vi-mongo.nvim/pull/6",
              caseStudy: "/case-studies/vi-mongo-nvim",
            },
            {
              repo: "colinhacks/zod",
              pr: "#4649",
              note: "Replaced a reference to a non-existent error instance",
              scale: "+1/-1",
              href: "https://github.com/colinhacks/zod/pull/4649",
              caseStudy: null,
            },
            {
              repo: "apple/pkl",
              pr: "#84",
              note: "Corrected the Loading Modules example to match its config",
              scale: "+4/-4",
              href: "https://github.com/apple/pkl/pull/84",
              caseStudy: null,
            },
          ].map((c) => (
            <div
              key={c.repo}
              className="bg-background p-5 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 hover:bg-accent/20 transition-colors"
            >
              <Link
                href={c.href}
                target="_blank"
                className="text-xs font-mono font-bold tracking-tight text-primary hover:underline shrink-0 sm:w-64"
              >
                {c.repo}{" "}
                <span className="text-muted-foreground font-medium">{c.pr}</span>
              </Link>
              <p className="text-xs text-muted-foreground leading-relaxed flex-1">
                {c.note}
              </p>
              <div className="flex items-center gap-4 shrink-0">
                <span className="text-xs font-mono text-muted-foreground">
                  {c.scale}
                </span>
                {c.caseStudy && (
                  <Link
                    href={c.caseStudy}
                    className="text-[10px] font-mono uppercase tracking-widest text-primary hover:underline"
                  >
                    Case Study
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        variants={item}
        className="flex flex-wrap gap-px bg-border border border-border"
      >
        {[
          { label: "GHUB", icon: Github, href: "https://github.com/igmrrf" },
          {
            label: "LINK",
            icon: Linkedin,
            href: "https://linkedin.com/in/igmrrf",
          },
          { label: "TWT", icon: Twitter, href: "https://x.com/igmrrf" },
        ].map((social, i) => (
          <Link
            key={i}
            href={social.href}
            target="_blank"
            className="flex-1 flex items-center justify-center gap-3 bg-background py-8 text-[10px] font-mono tracking-widest uppercase hover:bg-muted transition-colors group"
          >
            <social.icon className="h-4 w-4 group-hover:text-primary transition-colors" />{" "}
            {social.label}
          </Link>
        ))}
      </motion.div>
    </motion.div>
  );
}
