'use client';

import { Briefcase, Download, ExternalLink, Terminal, Award, GraduationCap, Code2 } from "lucide-react";
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
      className="flex flex-col gap-24 max-w-6xl mx-auto"
    >
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12 border-l-4 border-primary pl-10 py-6 bg-accent/20">
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-3 text-[10px] font-mono tracking-[0.4em] uppercase text-primary">
            <Terminal className="h-3 w-3" />
            System.logs_history()
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-8xl font-black tracking-tighter uppercase italic leading-none">
            Experience
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed font-medium">
            Software Engineer and Founder with 7 years’ experience architecting scalable Fintech and Web3 solutions for 500k+ users.
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

      {/* Experience Feed */}
      <section className="flex flex-col gap-12">
        <div className="flex items-center gap-4">
          <div className="h-px flex-1 bg-border" />
          <h2 className="text-[10px] font-mono font-black uppercase tracking-[0.3em] text-primary">Work_History.log</h2>
          <div className="h-px flex-1 bg-border" />
        </div>

        <div className="flex flex-col border border-border">
          {experiences.map((exp, i) => (
            <div
              key={i}
              className="group grid grid-cols-1 md:grid-cols-12 border-b border-border last:border-b-0 transition-colors hover:bg-muted/30"
            >
              <div className="md:col-span-3 p-10 border-r-0 md:border-r border-border bg-accent/10 flex flex-col gap-2">
                <div className="text-[10px] font-mono font-black uppercase tracking-widest text-primary/50">
                  Period.ts
                </div>
                <div className="text-sm font-bold font-mono tracking-tighter">
                  {exp.period}
                </div>
                {exp.location && (
                  <div className="text-[10px] font-mono text-muted-foreground uppercase mt-2">
                    {exp.location}
                  </div>
                )}
              </div>

              <div className="md:col-span-9 p-10 flex flex-col gap-8">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-3 text-[10px] font-mono tracking-widest uppercase text-primary">
                    <Briefcase className="h-3 w-3" /> {exp.company}
                  </div>
                  <h3 className="text-3xl font-black uppercase tracking-tighter italic group-hover:text-primary transition-colors">
                    {exp.role}
                  </h3>
                </div>

                <ul className="flex flex-col gap-4">
                  {exp.highlights.map((highlight, j) => (
                    <li key={j} className="text-sm text-muted-foreground leading-relaxed font-medium flex gap-3">
                      <span className="text-primary mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full bg-primary" />
                      {highlight}
                    </li>
                  ))}
                </ul>

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
      </section>

      {/* Skills Matrix */}
      <section className="flex flex-col gap-12">
        <div className="flex items-center gap-4">
          <div className="h-px flex-1 bg-border" />
          <h2 className="text-[10px] font-mono font-black uppercase tracking-[0.3em] text-primary">Core_Capabilities.sys</h2>
          <div className="h-px flex-1 bg-border" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-border">
          {Object.entries(skills).map(([category, list], i) => (
            <div key={i} className="p-10 border-r border-b border-border bg-accent/5 flex flex-col gap-6">
              <h4 className="text-[10px] font-mono font-black uppercase tracking-widest text-primary underline decoration-primary/30 underline-offset-8">
                {category.replace(/([A-Z])/g, ' $1')}
              </h4>
              <div className="flex flex-wrap gap-x-4 gap-y-2">
                {list.map((skill) => (
                  <span key={skill} className="text-xs font-bold uppercase tracking-tight italic text-foreground/80">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Education & Recognition */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-border border border-border">
        {/* Education */}
        <div className="bg-background p-12 flex flex-col gap-10">
          <div className="flex items-center gap-3 text-[10px] font-mono tracking-widest uppercase text-primary">
            <GraduationCap className="h-4 w-4" /> Scientific_Foundation
          </div>
          <div className="flex flex-col gap-12">
            {education.map((edu, i) => (
              <div key={i} className="flex flex-col gap-4">
                <div className="flex flex-col">
                  <span className="text-[10px] font-mono text-muted-foreground uppercase">{edu.period}</span>
                  <h3 className="text-2xl font-black uppercase tracking-tighter italic">{edu.school}</h3>
                  <span className="text-sm font-bold text-primary">{edu.degree}</span>
                </div>
                <div className="text-[10px] font-mono text-muted-foreground leading-relaxed uppercase tracking-wider">
                  Minor: {edu.minor.join(" / ")}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Awards */}
        <div className="bg-accent/10 p-12 flex flex-col gap-10">
          <div className="flex items-center gap-3 text-[10px] font-mono tracking-widest uppercase text-primary">
            <Award className="h-4 w-4" /> Recognition.emit()
          </div>
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-mono text-muted-foreground uppercase">Nov 2019</span>
              <h3 className="text-xl font-black uppercase tracking-tighter italic">2nd Runner Up: NDDC Hackathon</h3>
              <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest">NDDC Headquarters</p>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-mono text-muted-foreground uppercase">Jun 2014</span>
              <h3 className="text-xl font-black uppercase tracking-tighter italic">Diploma - Desktop Publishing</h3>
              <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest">Ebitare Computer Training Institute</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <div className="flex flex-col items-center gap-8 py-20 border border-border bg-accent/20 relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-full h-1 bg-primary/20" />
        <h4 className="text-[10px] font-mono font-black uppercase tracking-[0.4em] text-primary">
          End_of_Stream.eof
        </h4>
        <p className="text-sm text-center max-w-md text-muted-foreground px-10 font-medium leading-relaxed">
          Combining Mechanical Engineering fundamentals with MBA strategic insights to drive innovation in high-scale systems.
        </p>
        <div className="flex gap-4">
          <Link
            href="/chat"
            className="px-8 py-4 border border-primary text-primary font-mono text-[10px] tracking-widest uppercase hover:bg-primary hover:text-primary-foreground transition-all active:scale-95"
          >
            System.init()
          </Link>
          <Link
            href="https://linkedin.com/in/igmrrf"
            target="_blank"
            className="px-8 py-4 border border-border font-mono text-[10px] tracking-widest uppercase hover:bg-muted transition-all flex items-center gap-2 active:scale-95"
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
    role: "Senior Software Engineer",
    company: "Lingawa",
    location: "New York",
    period: "Mar 2025 - Feb 2026",
    highlights: [
      "Engineered system-wide optimizations reducing API response times by 89% and server resource usage by 50% through advanced query aggregation, Redis caching, and dependency injection refactoring.",
      "Architected and delivered a gamified onboarding experience integrating Stripe and OAuth, resulting in an 18% visitor conversion rate.",
      "Integrated Mixpanel and Zoho telemetry to drive data-backed UI redesigns targeting lesson booking flow drop-offs."
    ],
    stack: ["Node.js", "Redis", "Stripe", "OAuth", "Mixpanel", "Zoho"],
  },
  {
    role: "Co-Founder",
    company: "NPC Labs",
    location: "New Jersey",
    period: "Dec 2022 - Mar 2025",
    highlights: [
      "Secured partnership to patent proprietary NFC technology for 'phygital' asset logistics.",
      "Migrated infrastructure to Layer-2 (Base, Polygon) and built failover systems to maintain 99% uptime.",
      "Orchestrated core MVP securing $250k initial funding with CI/CD pipelines (GitHub Actions, Docker) and monitoring (Sentry, PostHog)."
    ],
    stack: ["Solidity", "Base", "Polygon", "Docker", "Sentry", "PostHog"],
  },
  {
    role: "Software Engineer",
    company: "Kunda Box",
    location: "Washington",
    period: "Apr 2023 - Oct 2024",
    highlights: [
      "Architected a custom Ethereum-Classic local testnet containerized via Docker for gas-free testing.",
      "Optimized high-volume media rendering via server-side image processing (Sharp/FFmpeg) for adaptive generation.",
      "Revitalized legacy Node.js/MongoDB backend by refactoring 'callback hell' into modern Async/Await patterns."
    ],
    stack: ["Ethereum-Classic", "Docker", "Sharp", "FFmpeg", "MongoDB", "Node.js"],
  },
  {
    role: "Software Engineer",
    company: "VeendHQ",
    location: "Lagos",
    period: "Apr 2022 - Dec 2022",
    highlights: [
      "Engineered fully automated credit decisioning pipeline with real-time identity verification and credit scoring.",
      "Architected a campaign automation engine (Termii & Kue) reducing merchant operational costs by ~90%.",
      "Led insurance implementation into multi-tenant lending system, increasing lending pool by 60%."
    ],
    stack: ["Node.js", "PostgreSQL", "Termii", "Kue", "Identity Verification"],
  },
  {
    role: "Backend Engineer",
    company: "Akaani",
    location: "New York",
    period: "Jul 2021 - Apr 2022",
    highlights: [
      "Spearheaded server design using Node.js, integrating AI-driven meal recommendations (Lu Service).",
      "Engineered comprehensive testing suite (Mocha, Jest, Supertest) and automation scripts for base code generation."
    ],
    stack: ["Node.js", "Mocha", "Jest", "Supertest", "AI/ML"],
  },
];

const skills = {
  Languages: ["C/C++", "C#", "Rust", "Go", "TypeScript", "JavaScript", "Python", "Solidity", "Lua"],
  Frameworks: ["Next.js", "React", "React Native", "Flutter", "Vue.js", "Nest.js", "Express.js", "FastAPI", "TailwindCSS"],
  Infrastructure: ["PostgreSQL", "MongoDB", "MySQL", "Redis", "Docker", "GitHub Actions", "Layer-2 (Base/Polygon)"],
};

const education = [
  {
    school: "Miva Open University",
    degree: "Masters Business Administration",
    period: "Sep 2025 - Present",
    minor: ["Disruptive Innovation", "Digital Transformation", "Supply Chain", "Leadership"]
  },
  {
    school: "Niger Delta University",
    degree: "Bachelor of Science, Mechanical Engineering",
    period: "Dec 2015 - Jul 2021",
    minor: ["Numerical Methods", "Computational Logic", "Control Systems", "Engineering Statistics"]
  }
];
