import { getCaseStudyBySlug, getCaseStudySlugs } from "@/lib/mdx";
import { notFound } from "next/navigation";
import { ArrowLeft, Github, Calendar, Target, Zap } from "lucide-react";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";

export async function generateStaticParams() {
  const slugs = getCaseStudySlugs();
  return slugs.map((slug) => ({
    slug: slug.replace(/\.mdx?$/, ""),
  }));
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let study;
  try {
    study = await getCaseStudyBySlug(slug);
  } catch (e) {
    notFound();
  }

  const { meta, content } = study;

  return (
    <div className="flex flex-col gap-12 max-w-6xl mx-auto">
      <Link
        href="/case-studies"
        className="flex items-center gap-2 text-[10px] font-mono tracking-widest uppercase text-muted-foreground hover:text-primary transition-colors group w-fit"
      >
        <ArrowLeft className="h-3 w-3 transition-transform group-hover:-translate-x-1" />
        Back.to_feed()
      </Link>

      <div className="flex flex-col gap-8 border-l-4 border-primary pl-8 py-4 bg-accent/10">
        <div className="flex flex-wrap items-center gap-4 text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
          <span className="flex items-center gap-1.5 px-2 py-1 border border-border bg-background">
            <Calendar className="h-3 w-3" /> {new Date(meta.date).toLocaleDateString()}
          </span>
          <Link
            href={meta.githubUrl}
            target="_blank"
            className="flex items-center gap-1.5 px-2 py-1 border border-primary/30 bg-primary/5 text-primary hover:bg-primary hover:text-primary-foreground transition-all"
          >
            <Github className="h-3 w-3" /> View_Source
          </Link>
        </div>
        <h1 className="text-4xl md:text-7xl font-black uppercase italic tracking-tighter leading-none">
          {meta.title.replace(/ /g, "_")}
        </h1>
        <p className="text-xl text-muted-foreground font-medium max-w-2xl leading-relaxed">
          {meta.summary}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-8 border border-border bg-accent/5 flex flex-col gap-4">
          <div className="flex items-center gap-2 text-[10px] font-mono font-black uppercase text-primary">
            <Target className="h-3 w-3" /> Business_Value.emit()
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {meta.businessValue}
          </p>
        </div>
        <div className="p-8 border border-border bg-accent/5 flex flex-col gap-4">
          <div className="flex items-center gap-2 text-[10px] font-mono font-black uppercase text-primary">
            <Zap className="h-3 w-3" /> Technical_Tradeoffs.log()
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {meta.technicalTradeOffs}
          </p>
        </div>
      </div>

      <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:font-black prose-headings:uppercase prose-headings:italic prose-headings:tracking-tighter prose-strong:text-primary mt-8">
        <MDXRemote source={content} />
      </div>

      <div className="flex flex-wrap gap-2 pt-8 border-t border-border">
        {meta.techStack.map((tag: string) => (
          <span
            key={tag}
            className="text-[10px] font-mono px-3 py-1 border border-border bg-accent text-muted-foreground uppercase tracking-widest"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
