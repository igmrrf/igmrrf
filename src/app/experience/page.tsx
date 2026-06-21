"use client";

import {
  Briefcase,
  Download,
  ExternalLink,
  Terminal,
  Award,
  GraduationCap,
} from "lucide-react";
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

export default function ExperiencePage() {
  const resumePath = "/Igbiriki_Francis_Software_Architect.pdf";
  const encodedResumePath = encodeURI(resumePath);

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="flex flex-col gap-24 max-w-6xl mx-auto"
    >
      {/* Header Section */}
      <motion.div
        variants={item}
        className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12 border-l-4 border-primary pl-10 py-6 bg-accent/20"
      >
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-3 text-[10px] font-mono tracking-[0.4em] uppercase text-primary">
            <Terminal className="h-3 w-3" />
            System.logs_history()
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-8xl font-black tracking-tighter uppercase italic leading-none">
            Experience
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed font-medium">
            System Architect and Founder with 7 years’ experience architecting
            scalable Fintech and Web3 solutions for 500k+ users.
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
      </motion.div>

      {/* Experience Feed */}
      <section className="flex flex-col gap-12">
        <motion.div variants={item} className="flex items-center gap-4">
          <div className="h-px flex-1 bg-border" />
          <h2 className="text-[10px] font-mono font-black uppercase tracking-[0.3em] text-primary">
            Work_History.log
          </h2>
          <div className="h-px flex-1 bg-border" />
        </motion.div>

        <div className="flex flex-col border border-border">
          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              variants={item}
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
                    <li
                      key={j}
                      className="text-sm text-muted-foreground leading-relaxed font-medium flex gap-3"
                    >
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
            </motion.div>
          ))}
        </div>
      </section>

      {/* Skills Matrix */}
      <section className="flex flex-col gap-12">
        <motion.div variants={item} className="flex items-center gap-4">
          <div className="h-px flex-1 bg-border" />
          <h2 className="text-[10px] font-mono font-black uppercase tracking-[0.3em] text-primary">
            Core_Capabilities.sys
          </h2>
          <div className="h-px flex-1 bg-border" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-border">
          {Object.entries(skills).map(([category, list], i) => (
            <motion.div
              key={i}
              variants={item}
              className="p-10 border-r border-b border-border bg-accent/5 flex flex-col gap-6"
            >
              <h4 className="text-[10px] font-mono font-black uppercase tracking-widest text-primary underline decoration-primary/30 underline-offset-8">
                {category.replace(/([A-Z])/g, " $1")}
              </h4>
              <div className="flex flex-wrap gap-x-4 gap-y-2">
                {list.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs font-bold uppercase tracking-tight italic text-foreground/80"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Education & Recognition */}
      <motion.section
        variants={item}
        className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-border border border-border"
      >
        {/* Education */}
        <div className="bg-background p-12 flex flex-col gap-10">
          <div className="flex items-center gap-3 text-[10px] font-mono tracking-widest uppercase text-primary">
            <GraduationCap className="h-4 w-4" /> Scientific_Foundation
          </div>
          <div className="flex flex-col gap-12">
            {education.map((edu, i) => (
              <div key={i} className="flex flex-col gap-4">
                <div className="flex flex-col">
                  <span className="text-[10px] font-mono text-muted-foreground uppercase">
                    {edu.period}
                  </span>
                  <h3 className="text-2xl font-black uppercase tracking-tighter italic">
                    {edu.school}
                  </h3>
                  <span className="text-sm font-bold text-primary">
                    {edu.degree}
                  </span>
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
              <span className="text-[10px] font-mono text-muted-foreground uppercase">
                Nov 2019
              </span>
              <h3 className="text-xl font-black uppercase tracking-tighter italic">
                Winner: NDDC Hackathon
              </h3>
              <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
                NDDC Headquarters
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-mono text-muted-foreground uppercase">
                Active
              </span>
              <h3 className="text-xl font-black uppercase tracking-tighter italic">
                Stack Overflow Authority
              </h3>
              <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
                Top contributor for Neovim LSP & Biome.js configs
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Footer CTA */}
      <motion.div
        variants={item}
        className="flex flex-col items-center gap-8 py-20 border border-border bg-accent/20 relative overflow-hidden group"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-primary/20" />
        <h4 className="text-[10px] font-mono font-black uppercase tracking-[0.4em] text-primary">
          End_of_Stream.eof
        </h4>
        <p className="text-sm text-center max-w-md text-muted-foreground px-10 font-medium leading-relaxed">
          Combining Mechanical Engineering fundamentals with MBA strategic
          insights to drive innovation in high-scale systems.
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
      </motion.div>
    </motion.div>
  );
}

const experiences = [
  {
    role: "Senior Software Architect",
    company: "OneRemit",
    location: "Remote",
    period: "Feb 2026 - Present",
    highlights: [
      "Architected a complete cross-border payout integration end-to-end in record time. Unified four payment providers into a single abstract payout terminal with a poll-based status reconciliation system.",
      "Led security hardening by implementing TOTP, PAN encryption, foreign-login detection, KYC webhook handling, and role-based access control (RBAC).",
      "Designed a transactional email pipeline with Celery and SMTP fallback. Stood up staging infrastructure from scratch and built CI/CD pipelines across four repositories.",
      "Drove org-wide PostHog analytics adoption. Integrated Sentry and GTM with GDPR compliance. Built secure session lifecycle management flows with 2FA recovery.",
    ],
    stack: ["Python", "Celery", "Biome", "ruff", "PostHog", "Sentry"],
  },
  {
    role: "Senior Software Engineer",
    company: "Lingawa",
    location: "Remote",
    period: "Mar 2025 - Feb 2026",
    highlights: [
      "Engineered system-wide optimizations reducing API response times by 89% and load times by 75% through advanced query aggregation, custom JWT authentication, and Redis caching.",
      "Orchestrated containerized environments using Docker and Docker Compose, implementing dependency injection optimizations that reduced server resource consumption by 50%.",
      "Spearheaded the redesign of the lesson booking architecture to eliminate onboarding friction. Developed a high-conversion gamified onboarding flow integrating Stripe.",
      "Refactored Notification Services and Admin Dashboards, reducing API call times from 5 minutes to 90 seconds. Implemented robust telemetry using Mixpanel.",
    ],
    stack: ["Docker", "Redis", "JWT", "Stripe", "Mixpanel"],
  },
  {
    role: "Co-Founder & Chief Product Officer",
    company: "NPC Labs",
    location: "United States (Remote)",
    period: "Sep 2023 - Dec 2025",
    highlights: [
      "Designed a hybrid architecture integrating on-chain logic with off-chain services to solve critical interoperability limits.",
      "Mitigated user churn by leading the migration to Layer-2 solutions (Base, Polygon) and implementing rapid-failover backup systems to maintain 99% uptime.",
      "Secured a strategic partnership to patent proprietary NFC technology, resolving logistics friction points for 'Phygital' assets.",
      "Led cross-functional teams in product roadmapping and market analysis, directly driving revenue growth and product-market fit.",
    ],
    stack: ["Layer-2 (Base/Polygon)", "Web3", "Blockchain", "Architecture"],
  },
  {
    role: "Technical Lead Engineer",
    company: "NPC Labs",
    location: "US",
    period: "Dec 2022 - Sep 2023",
    highlights: [
      "Built and launched the initial MVP which secured $250,000 in pre-seed funding.",
      "Managed version control using Git and established robust CI/CD pipelines using GitHub Actions, Vercel, and Docker.",
      "Implemented comprehensive monitoring (Sentry, Loggly, PostHog) to proactively identify and resolve issues.",
      "Fostered collaboration between engineering, design, and marketing to ensure smooth product launches.",
    ],
    stack: [
      "Docker",
      "GitHub Actions",
      "Vercel",
      "Sentry",
      "PostHog",
      "Loggly",
    ],
  },
  {
    role: "Founder & Lead Engineer",
    company: "Ajian Labs",
    location: "NG",
    period: "Dec 2022 - Present",
    highlights: [
      "Led key technical decisions and aligned them with business objectives, crafting comprehensive Product Requirements Documents (PRDs) and Functional Requirements Documents (FRDs).",
      "Set up robust CI/CD pipelines using GitHub Actions, standardizing development flows and ensuring reliable, automated deployments.",
      "Served as the primary technical liaison, orchestrating communication between the company and external security auditors and API integration engineers.",
    ],
    stack: ["Architecture", "CI/CD", "GitHub Actions"],
  },
  {
    role: "Software Engineer",
    company: "Kunda Box",
    location: "US",
    period: "Apr 2023 - Jun 2023",
    highlights: [
      "Architected a custom local Ethereum Classic testnet containerized via Docker, enabling gas-free local testing.",
      "Optimized high-volume media rendering by implementing server-side image processing (Sharp/FFmpeg), ensuring rapid page loads across devices.",
      "Refactored legacy Node.js backends from callback-based patterns to Async/Await, establishing a rigorous CI/CD testing suite with 265+ coverage points.",
      "Employed Selenium and Jest for automated testing of user interactions, accelerating the initial launch by 25%.",
    ],
    stack: [
      "Ethereum Classic",
      "Docker",
      "Sharp",
      "FFmpeg",
      "Node.js",
      "Selenium",
      "Jest",
    ],
  },
  {
    role: "Software Engineer (Fintech)",
    company: "VeendHQ Inc.",
    location: "Wilmington, DE",
    period: "Apr 2022 - Dec 2022",
    highlights: [
      "Engineered a fully automated credit decisioning pipeline, eliminating manual underwriting by integrating real-time identity verification.",
      "Architected a campaign automation engine reducing user operational costs by ~90% and significantly increasing platform accessibility.",
      "Led rapid incident response and performed debugging to identify and fix critical loan disbursement failures within 90 minutes.",
      "Managed deployment pipelines using AWS, Docker, and Linux, increasing deployment frequency by 30%. Promoted to Team Lead within 7 months.",
    ],
    stack: ["Node.js", "AWS", "Docker", "Linux"],
  },
  {
    role: "Software Developer",
    company: "Akaani",
    location: "US",
    period: "Jul 2021 - Apr 2022",
    highlights: [
      "Designed and implemented the core server application using Node.js, Docker, and a robust testing suite (Mocha, Jest, Supertest).",
      "Integrated 'Lu' (Recommendation AI) for personalized meal suggestions and automated Slack webhooks for real-time operational alerts.",
      "Engineered CLI scripts to auto-generate boilerplate code and test cases, standardizing the codebase and accelerating new engineer onboarding.",
    ],
    stack: ["Node.js", "Docker", "Mocha", "Jest", "Supertest", "AI"],
  },
  {
    role: "Frontend Lead",
    company: "Vomoz Limited",
    location: "US",
    period: "Jan 2021 - Jul 2021",
    highlights: [
      "Directed the frontend architectural strategy, selecting a component-driven design system that accelerated product delivery by 50%.",
      "Engineered advanced state management (Redux) and error-handling layers to mask legacy system instability.",
      "Refactored API modules to simplify error handling, reducing integration time by 20% and increasing website leads by 200%.",
    ],
    stack: ["Redux", "Frontend Architecture", "API Integration"],
  },
  {
    role: "Frontend Developer Intern",
    company: "Afridash Limited",
    location: "Nigeria",
    period: "July 2019 - Dec 2019",
    highlights: [
      "Engineered interactive front-facing web pages using React.js, HTML5, and CSS3.",
      "Managed application state with class-based components and efficiently consumed RESTful APIs.",
      "Achieved 2nd Runner-up at the SDN Hackathon 2019 by architecting a fully functional PWA survey application.",
    ],
    stack: ["React.js", "HTML5", "CSS3", "REST APIs", "PWA"],
  },
  {
    role: "Contract Developer",
    company: "Freelance",
    location: "Nigeria",
    period: "Dec 2018 - Dec 2020",
    highlights: [
      "Upgraded clients’ existing infrastructures to modern web technologies (PWA), achieving 60% faster load times.",
      "Built pixel-perfect, responsive UIs from Figma designs, ensuring strict cross-browser compatibility and accessibility.",
      "Served as a dedicated DevOps engineer for legacy projects, managing server configurations and ongoing maintenance.",
      "Hosted and organized a free Web Development Boot Camp, teaching HTML, CSS, and JavaScript fundamentals to over 40 teenagers.",
    ],
    stack: ["PWA", "Figma", "DevOps", "HTML", "CSS", "JavaScript"],
  },
];

const skills = {
  Languages: [
    "TypeScript/JavaScript",
    "Go",
    "Rust",
    "Python",
    "C/C++",
    "C#",
    "Solidity",
    "Lua",
  ],
  Frameworks: [
    "Next.js",
    "React",
    "React Native",
    "Vue.js",
    "Nest.js",
    "Express.js",
    "FastAPI",
    "Redux",
    "TailwindCSS",
    "Selenium",
    "Tokio",
    "Flutter",
    "Gin",
  ],
  Infrastructure: [
    "PostgreSQL",
    "MongoDB",
    "MySQL",
    "Redis",
    "Neo4j",
    "IndexedDB",
    "SQLite",
    "AWS",
    "Docker",
    "Kubernetes",
    "Jenkins",
    "GitHub Actions",
    "Vercel",
    "Linux",
  ],
};

const education = [
  {
    school: "Miva Open University",
    degree: "Masters Business Administration",
    period: "Sep 2025 - Present",
    minor: [
      "Managing Disruptive Innovation",
      "Digital Business Transformation",
      "Supply Chain Management",
      "Organizational Behaviour & Leadership",
    ],
  },
  {
    school: "Niger Delta University",
    degree: "Bachelor of Science - Mechanical Engineering",
    period: "Dec 2015 - Jul 2021",
    minor: [
      "Numerical Methods & Computational Logic",
      "Control Systems Engineering",
      "Engineering Statistics",
      "Industrial Management",
    ],
  },
];
