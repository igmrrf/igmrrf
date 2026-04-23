"use client";

import { Github, Linkedin, Twitter, Terminal } from "lucide-react";
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
      initial="hidden"
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
          Francis_Igbiriki
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed font-medium">
          System Architect specializing in high-performance distributed systems
          and Clean Architecture.
        </p>
      </motion.div>

      <motion.div
        variants={item}
        className="prose prose-slate dark:prose-invert max-w-none 
        prose-headings:font-black prose-headings:uppercase prose-headings:italic prose-headings:tracking-tighter
        prose-strong:text-primary font-medium leading-relaxed"
      >
        <h2>Engineering_Philosophy</h2>
        <p>
          I operate under the core maxim that{" "}
          <strong>"Value Begets Peace"</strong>. I believe that code should be
          more than just functional; it should be{" "}
          <strong>maintainable, scalable, and business-centric</strong>. This is
          why I'm an advocate for <strong>Clean Architecture</strong>
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
          With years of experience in the TypeScript ecosystem, I've built
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
          When I'm not architecting systems, you can find me contributing to
          open-source, building specialized Neovim plugins like{" "}
          <code>vi-mongo.nvim</code>, or sharing architectural solutions on{" "}
          <strong>Stack Overflow</strong>, where I maintain authority on deep
          debugging for LSP configurations and modern framework friction points.
        </p>
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
