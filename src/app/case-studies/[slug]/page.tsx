import { getCaseStudyBySlug, getCaseStudySlugs } from "@/lib/mdx";
import { notFound } from "next/navigation";
import { ArrowLeft, Github, Calendar, Target, Zap } from "lucide-react";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { CodeBlock } from "@/components/blog/CodeBlock";

export async function generateStaticParams() {
  const slugs = getCaseStudySlugs();
  return slugs.map((slug) => ({
    slug: slug.replace(/\.mdx?$/, ""),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  try {
    const study = await getCaseStudyBySlug(slug);
    return {
      title: study.meta.title,
      description: study.meta.summary,
      openGraph: {
        title: `${study.meta.title} | Case Study | The LDO`,
        description: study.meta.summary,
        type: "article",
        publishedTime: study.meta.date,
      },
      twitter: {
        card: "summary_large_image",
        title: study.meta.title,
        description: study.meta.summary,
      },
    };
  } catch {
    return {
      title: "Case Study Not Found",
    };
  }
}

const mdxComponents = {
  pre: CodeBlock,
};

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let study;
  try {
    study = await getCaseStudyBySlug(slug);
  } catch {
    notFound();
  }

  const { meta, content } = study;

  return (
    <div className="flex flex-col gap-12 max-w-5xl mx-auto">
      <Link
        href="/case-studies"
        className="flex items-center gap-2 text-[10px] font-mono tracking-widest uppercase text-muted-foreground hover:text-primary transition-colors group w-fit"
      >
        <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
        Back_to_Case_Studies.log
      </Link>

      <div className="flex flex-col gap-8 border-l-4 border-primary pl-8 py-6 bg-accent/15">
        <div className="flex flex-wrap items-center gap-4 text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
          <span className="flex items-center gap-1.5 px-2.5 py-1 border border-border bg-background font-bold text-foreground">
            <Calendar className="h-3.5 w-3.5 text-primary" /> {new Date(meta.date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
          </span>
          <Link
            href={meta.githubUrl}
            target="_blank"
            className="flex items-center gap-1.5 px-2.5 py-1 border border-primary/40 bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-all font-bold"
          >
            <Github className="h-3.5 w-3.5" /> View_Source_Repository
          </Link>
        </div>

        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase italic tracking-tight leading-tight break-words text-foreground">
          {meta.title}
        </h1>

        <p className="text-lg text-muted-foreground font-medium max-w-3xl leading-relaxed">
          {meta.summary}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-8 border border-border bg-background/60 flex flex-col gap-3">
          <div className="flex items-center gap-2 text-xs font-mono font-black uppercase text-primary">
            <Target className="h-4 w-4" /> Business_Value.emit()
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {meta.businessValue}
          </p>
        </div>

        <div className="p-8 border border-border bg-background/60 flex flex-col gap-3">
          <div className="flex items-center gap-2 text-xs font-mono font-black uppercase text-primary">
            <Zap className="h-4 w-4" /> Technical_Tradeoffs.log()
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {meta.technicalTradeOffs}
          </p>
        </div>
      </div>

      <div className="prose dark:prose-invert max-w-none 
        prose-headings:font-black prose-headings:uppercase prose-headings:italic prose-headings:tracking-tight prose-headings:text-foreground
        prose-p:text-base sm:prose-p:text-[17px] prose-p:leading-relaxed prose-p:text-foreground/90
        prose-strong:text-foreground prose-strong:font-bold
        mt-8"
      >
        <MDXRemote source={content} components={mdxComponents} />
      </div>

      <div className="flex flex-wrap gap-2 pt-8 border-t border-border">
        {meta.techStack.map((tag: string) => (
          <span
            key={tag}
            className="text-[10px] font-mono px-3 py-1 border border-border bg-accent/30 text-muted-foreground uppercase tracking-widest"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
