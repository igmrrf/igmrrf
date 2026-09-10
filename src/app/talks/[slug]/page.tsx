import { getTalkBySlug, getTalkSlugs } from "@/lib/mdx";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Calendar,
  Download,
  Github,
  MapPin,
  Play,
  Timer,
} from "lucide-react";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { CodeBlock } from "@/components/blog/CodeBlock";
import { DeckEmbed } from "@/components/talks/DeckEmbed";

export async function generateStaticParams() {
  const slugs = getTalkSlugs();
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
    const talk = await getTalkBySlug(slug);
    return {
      title: talk.meta.title,
      description: talk.meta.summary,
      alternates: { canonical: `/talks/${slug}` },
      openGraph: {
        title: `${talk.meta.title} | Talk | The LDO`,
        description: talk.meta.summary,
        type: "article",
        publishedTime: talk.meta.date,
      },
      twitter: {
        card: "summary_large_image",
        title: talk.meta.title,
        description: talk.meta.summary,
      },
    };
  } catch {
    return {
      title: "Talk Not Found",
    };
  }
}

const mdxComponents = {
  pre: CodeBlock,
};

export default async function TalkPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let talk;
  try {
    talk = await getTalkBySlug(slug);
  } catch {
    notFound();
  }

  const { meta, content } = talk;

  return (
    <div className="flex flex-col gap-12 max-w-5xl mx-auto">
      <Link
        href="/talks"
        className="flex items-center gap-2 text-[10px] font-mono tracking-widest uppercase text-muted-foreground hover:text-primary transition-colors group w-fit"
      >
        <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
        Back_to_Talks.log
      </Link>

      <div className="flex flex-col gap-8 border-l-4 border-primary pl-8 py-6 bg-accent/15">
        <div className="flex flex-wrap items-center gap-3 text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
          <span className="flex items-center gap-1.5 px-2.5 py-1 border border-border bg-background font-bold text-foreground">
            <Calendar className="h-3.5 w-3.5 text-primary" />{" "}
            {new Date(meta.date).toLocaleDateString("en-US", {
              timeZone: "UTC",
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </span>
          <span className="px-2.5 py-1 border border-border bg-background font-bold text-foreground">
            {meta.event}
          </span>
          {meta.location && (
            <span className="flex items-center gap-1.5 px-2.5 py-1 border border-border">
              <MapPin className="h-3.5 w-3.5 text-primary" /> {meta.location}
            </span>
          )}
          {meta.durationMinutes && (
            <span className="flex items-center gap-1.5 px-2.5 py-1 border border-border">
              <Timer className="h-3.5 w-3.5 text-primary" />{" "}
              {meta.durationMinutes} min
            </span>
          )}
        </div>

        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase italic tracking-tight leading-tight break-words text-foreground">
          {meta.title}
        </h1>

        <p className="text-lg text-muted-foreground font-medium max-w-3xl leading-relaxed">
          {meta.summary}
        </p>

        <div className="flex flex-wrap items-center gap-3 text-[10px] font-mono uppercase tracking-widest">
          {meta.deckSlug && (
            <a
              href={`/decks/${meta.deckSlug}/`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-2.5 py-1 border border-primary/40 bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-all font-bold"
            >
              <Play className="h-3.5 w-3.5" /> Open_Slides
            </a>
          )}
          {meta.pdf && (
            <a
              href={meta.pdf}
              className="flex items-center gap-1.5 px-2.5 py-1 border border-border hover:border-primary hover:text-primary transition-all font-bold"
            >
              <Download className="h-3.5 w-3.5" /> Slides.pdf
            </a>
          )}
          {meta.repoUrl && (
            <a
              href={meta.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-2.5 py-1 border border-border hover:border-primary hover:text-primary transition-all font-bold"
            >
              <Github className="h-3.5 w-3.5" /> Reference_Implementation
            </a>
          )}
          {meta.videoUrl && (
            <a
              href={meta.videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-2.5 py-1 border border-border hover:border-primary hover:text-primary transition-all font-bold"
            >
              <Play className="h-3.5 w-3.5" /> Recording
            </a>
          )}
        </div>
      </div>

      {meta.deckSlug && (
        <DeckEmbed deckSlug={meta.deckSlug} title={meta.title} />
      )}

      <div
        className="prose dark:prose-invert max-w-none
          prose-headings:font-black prose-headings:uppercase prose-headings:italic prose-headings:tracking-tight prose-headings:text-foreground
          prose-p:text-base sm:prose-p:text-[17px] prose-p:leading-relaxed prose-p:text-foreground/90
          prose-strong:text-foreground prose-strong:font-bold
          mt-4"
      >
        <MDXRemote source={content} components={mdxComponents} />
      </div>

      <div className="flex flex-wrap gap-2 pt-8 border-t border-border">
        {meta.tags.map((tag: string) => (
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
