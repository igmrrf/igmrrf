import Link from "next/link";
import { ArrowRight, GitPullRequest, Terminal } from "lucide-react";
import { BlogPost, CaseStudy } from "@/schemas/portfolio";
import { TerminalScene } from "./TerminalScene";

export default function HomeClient({ projects, posts }: {
  projects: (CaseStudy & { slug: string })[];
  posts: (BlogPost & { slug: string; readingTime: string })[];
}) {
  return (
    <div className="flex flex-col gap-20 md:gap-28">
      <section className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <div className="flex flex-col items-start gap-7">
          <p className="text-xs font-mono text-primary flex items-center gap-2"><Terminal size={15} /> ~/francis — welcome to my workspace</p>
          <h1 className="text-5xl sm:text-6xl xl:text-7xl font-bold tracking-tight leading-[1.04]">I’m Francis.<br /><span className="text-muted-foreground">I build systems<br />that work for people.</span></h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">Software & mechanical engineer, system architect, and open-source contributor. From fintech and distributed systems to the tools in my terminal, I care about making complex things useful.</p>
          <div className="flex flex-wrap gap-3">
            <Link href="/case-studies" className="inline-flex items-center gap-3 bg-primary text-primary-foreground px-6 py-3 text-sm font-medium hover:opacity-90">Explore my projects <ArrowRight size={16} /></Link>
            <Link href="/about" className="inline-flex items-center gap-3 border border-border px-6 py-3 text-sm font-medium hover:bg-accent">A little about me</Link>
          </div>
          <p className="text-xs text-muted-foreground font-mono leading-relaxed">Click around, or open the terminal with <kbd className="text-foreground">⌘ / Ctrl K</kbd>.<br />No commands required. Curiosity is enough.</p>
        </div>
        <TerminalScene />
      </section>

      <nav aria-label="Explore the portfolio" className="grid sm:grid-cols-2 lg:grid-cols-4 border-t border-l border-border">
        {[
          { href: "/experience", command: "experience", title: "The journey", text: "Teams, challenges, and what I’ve learned." },
          { href: "/blog", command: "blog", title: "The notebook", text: "Ideas, engineering decisions, and deep dives." },
          { href: "/about#contributions", command: "contributions", title: "Giving back", text: "Open-source patches that reach everyone." },
          { href: "/stack", command: "stack", title: "The toolkit", text: "Explore the technologies I work with." },
        ].map((item) => <Link key={item.href} href={item.href} className="group border-r border-b border-border p-6 hover:bg-accent transition-colors"><p className="font-mono text-xs text-primary mb-5">❯ cd {item.command}</p><h2 className="text-lg font-semibold mb-2 flex items-center justify-between">{item.title}<ArrowRight size={16} className="text-muted-foreground group-hover:text-primary" /></h2><p className="text-sm text-muted-foreground leading-relaxed">{item.text}</p></Link>)}
      </nav>

      <section className="space-y-8" aria-labelledby="projects-title">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-border pb-5"><div><p className="font-mono text-xs text-primary mb-3">01 / selected work</p><h2 id="projects-title" className="text-3xl sm:text-4xl font-semibold">Built with purpose.</h2></div><Link href="/case-studies" className="text-sm flex items-center gap-2 hover:text-primary">All projects <ArrowRight size={15} /></Link></div>
        <div className="grid md:grid-cols-3 gap-5">
          {projects.map((project, index) => <Link key={project.slug} href={`/case-studies/${project.slug}`} className="group flex flex-col border border-border bg-background/80 p-6 md:p-8 transition-colors hover:bg-accent"><span className="font-mono text-xs text-muted-foreground mb-8">0{index + 1} / case study</span><h3 className="text-xl font-semibold mb-3">{project.title}</h3><p className="text-sm text-muted-foreground leading-relaxed mb-6">{project.summary}</p><div className="mt-auto flex flex-wrap gap-2">{project.techStack.slice(0, 3).map((tag) => <span key={tag} className="text-xs font-mono text-muted-foreground border border-border px-2 py-1">{tag}</span>)}</div><span className="mt-7 inline-flex items-center gap-2 text-sm text-primary">Read the case study <ArrowRight size={15} /></span></Link>)}
        </div>
      </section>

      <section className="grid lg:grid-cols-3 gap-8" aria-labelledby="writing-title">
        <div><p className="font-mono text-xs text-primary mb-3">02 / from the notebook</p><h2 id="writing-title" className="text-3xl sm:text-4xl font-semibold mb-4">Thinking out loud.</h2><p className="text-muted-foreground leading-relaxed mb-6">Notes from building, debugging, and asking why.</p><Link href="/blog" className="inline-flex items-center gap-2 text-sm text-primary">All writing <ArrowRight size={15} /></Link></div>
        <div className="lg:col-span-2 border-t border-border">{posts.map((post) => <Link href={`/blog/${post.slug}`} key={post.slug} className="block py-6 border-b border-border group"><p className="text-xs text-muted-foreground font-mono mb-3"><time dateTime={post.date}>{post.date}</time> · {post.readingTime}</p><h3 className="text-xl font-semibold mb-2 group-hover:text-primary">{post.title}</h3><p className="text-sm text-muted-foreground leading-relaxed">{post.summary}</p></Link>)}</div>
      </section>

      <section className="border border-border bg-accent/40 p-7 sm:p-10 flex flex-col sm:flex-row items-start gap-6">
        <GitPullRequest className="text-primary shrink-0" size={28} /><div className="flex-1"><p className="font-mono text-xs text-primary mb-3">03 / upstream</p><h2 className="text-2xl font-semibold mb-3">Better tools, together.</h2><p className="text-muted-foreground leading-relaxed max-w-2xl">Contributions to Sendchamp SDK, vi-mongo.nvim, Zod, and Apple Pkl. Small fixes and deeper improvements, with the pull requests and reasoning to explore.</p></div><Link href="/about#contributions" className="inline-flex items-center gap-2 text-sm text-primary py-3">See contributions <ArrowRight size={15} /></Link>
      </section>
    </div>
  );
}
