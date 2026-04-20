import { Github, Code2, Terminal, ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Projects | Software Ecosystems",
  description:
    "A comprehensive list of engineering projects and open-source contributions by igmrrf.",
};

const projects = [
  {
    title: "BugRelay",
    description:
      "Multi-tenant bug reporting platform with verified company ownership and scalable data pipelines.",
    techStack: ["Next.js", "Prisma", "PostgreSQL", "TypeScript"],
    githubUrl: "https://github.com/igmrrf/bugrelay",
  },
  {
    title: "Node Clean TS",
    description:
      "A production-ready template for building scalable Node.js systems with strict decoupling and DI.",
    techStack: ["Node.js", "TypeScript", "Dependency Injection", "Vitest"],
    githubUrl: "https://github.com/igmrrf/Node_Clean_Architecture_TS",
  },
  {
    title: "vi-mongo.nvim",
    description:
      "Asynchronous MongoDB explorer for Neovim, featuring non-blocking TUI interactions via Lua coroutines.",
    techStack: ["Lua", "Neovim API", "MongoDB"],
    githubUrl: "https://github.com/igmrrf/vi-mongo.nvim",
  },
  {
    title: "SmartX Mobile",
    description:
      "Enterprise mobile application with standardized AppLayout and unified design system.",
    techStack: ["React Native", "TypeScript", "Biome"],
    githubUrl: "https://github.com/igmrrf",
  },
];

export default function ProjectsPage() {
  return (
    <div className="flex flex-col gap-24 max-w-6xl mx-auto">
      <div className="flex flex-col gap-6 border-l-4 border-primary pl-10 py-6 bg-accent/20">
        <div className="flex items-center gap-3 text-[10px] font-mono tracking-[0.4em] uppercase text-primary">
          <Terminal className="h-3 w-3" />
          Inventory.list_all()
        </div>
        <h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase italic leading-none">
          Build_Log
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed font-medium">
          A collection of open-source contributions, technical templates, and
          specialized tooling.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 border-t border-l border-border">
        {projects.map((project, i) => (
          <div
            key={i}
            className="group flex flex-col gap-8 p-12 border-r border-b border-border bg-background transition-all hover:bg-muted relative"
          >
            <div className="flex items-center justify-between">
              <div className="h-12 w-12 border border-border bg-accent/50 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                <Code2 className="h-6 w-6" />
              </div>
              <div className="flex gap-4">
                <Link
                  href={project.githubUrl}
                  target="_blank"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Github className="h-5 w-5" />
                </Link>
              </div>
              <div className="absolute top-4 right-4 text-[10px] font-mono text-muted-foreground/30">
                // REF_00{i + 1}
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <h3 className="text-3xl font-black uppercase italic tracking-tighter group-hover:text-primary transition-colors leading-none break-words line-clamp-2">
                {project.title.replace(/ /g, "_")}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed font-medium">
                {project.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              {project.techStack.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] font-mono px-3 py-1 border border-border bg-accent text-muted-foreground uppercase tracking-widest"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-auto pt-8">
              <Link
                href={project.githubUrl}
                target="_blank"
                className="inline-flex items-center gap-3 text-[10px] font-mono font-black uppercase tracking-widest text-primary hover:tracking-[0.2em] transition-all"
              >
                Repo.open_source() <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
