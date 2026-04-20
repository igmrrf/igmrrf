import { Github, Linkedin, Twitter, Terminal } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "About | Engineering Philosophy",
  description:
    "Learn more about igmrrf's background, technical stack, and engineering philosophy.",
};

export default function AboutPage() {
  return (
    <div className="flex flex-col gap-24 max-w-4xl mx-auto">
      <div className="flex flex-col gap-6 border-l-4 border-primary pl-10 py-6 bg-accent/20">
        <div className="flex items-center gap-3 text-[10px] font-mono tracking-[0.4em] uppercase text-primary">
          <Terminal className="h-3 w-3" />
          Entity.profile_fetch()
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-8xl font-black tracking-tighter uppercase italic leading-none">
          Francis_Igbiriki
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed font-medium">
          Senior Engineer specializing in high-performance distributed systems
          and Clean Architecture.
        </p>
      </div>

      <div
        className="prose prose-slate dark:prose-invert max-w-none 
        prose-headings:font-black prose-headings:uppercase prose-headings:italic prose-headings:tracking-tighter
        prose-strong:text-primary font-medium leading-relaxed"
      >
        <h2>Engineering_Philosophy</h2>
        <p>
          I believe that code should be more than just functional; it should be{" "}
          <strong>maintainable, scalable, and business-centric</strong>. This is
          why I'm an advocate for <strong>Clean Architecture</strong>
          and strict type systems. By decoupling business logic from
          infrastructure, we create systems that can evolve with the needs of
          the organization without crumbling under technical debt.
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
              label: "Architecture",
              items: ["DDD", "Clean Architecture", "Microservices"],
            },
            {
              label: "Frontend",
              items: ["Next.js", "RSC", "Tailwind CSS", "Framer Motion"],
            },
            {
              label: "Backend",
              items: ["Node.js", "TypeScript", "PostgreSQL", "Prisma"],
            },
            {
              label: "AI Systems",
              items: ["RAG Pipelines", "LLM Orchestration", "Vector DBs"],
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
          When I'm not architecting systems, you can find me contributing to
          open-source, building specialized Neovim plugins, or exploring the
          latest in terminal-based developer productivity tools.
        </p>
      </div>

      <div className="flex flex-wrap gap-px bg-border border border-border">
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
      </div>
    </div>
  );
}
