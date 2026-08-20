import { getBlogPostBySlug, getBlogPostSlugs, getAllBlogPosts } from "@/lib/mdx";
import { MDXRemote } from "next-mdx-remote/rsc";
import { ArrowLeft, ArrowRight, Calendar, Clock, Tag, Terminal, User } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { GiscusComments } from "@/components/blog/GiscusComments";
import { RecommendedReads } from "@/components/blog/RecommendedReads";
import { ReadingProgressBar } from "@/components/blog/ReadingProgressBar";
import { CodeBlock } from "@/components/blog/CodeBlock";

export async function generateStaticParams() {
  const slugs = getBlogPostSlugs();
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
    const post = await getBlogPostBySlug(slug);
    return {
      title: {
        absolute: post.meta.title,
      },
      description: post.meta.summary,
      openGraph: {
        title: post.meta.title,
        description: post.meta.summary,
        type: "article",
        publishedTime: post.meta.date,
      },
    };
  } catch {
    return {
      title: {
        absolute: "Article Not Found",
      },
    };
  }
}

// Custom MDX components to enhance readability
const mdxComponents = {
  pre: CodeBlock,
};

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let post;
  let allPosts;
  try {
    post = await getBlogPostBySlug(slug);
    allPosts = await getAllBlogPosts();
  } catch {
    notFound();
  }

  // Calculate previous and next posts
  const currentIndex = allPosts.findIndex((p) => p.slug === slug);
  const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const nextPost =
    currentIndex >= 0 && currentIndex < allPosts.length - 1
      ? allPosts[currentIndex + 1]
      : null;

  return (
    <article className="relative">
      {/* Scroll Progress Bar */}
      <ReadingProgressBar />

      <div className="flex flex-col gap-12 max-w-6xl mx-auto">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between border-b border-border/60 pb-4">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-[10px] font-mono tracking-widest uppercase text-muted-foreground transition-colors hover:text-primary group"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
            Back_to_Articles.log
          </Link>
          <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
            DOC_ID: {slug}
          </span>
        </div>

        {/* Article Header Card */}
        <header className="flex flex-col gap-6 p-8 sm:p-12 border border-border bg-background/80 backdrop-blur-md">
          <div className="flex items-center gap-2.5 text-[10px] font-mono tracking-[0.3em] uppercase text-primary font-bold">
            <Terminal className="h-3.5 w-3.5" />
            <span>ARTICLE_STREAM // DEV_NOTES</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-6xl font-black tracking-tight leading-[1.05] uppercase italic text-foreground break-words">
            {post.meta.title}
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed font-medium max-w-4xl">
            {post.meta.summary}
          </p>

          {/* Meta Information Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-border/60 text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
            <div className="flex flex-wrap items-center gap-4">
              <span className="flex items-center gap-1.5 px-2.5 py-1 border border-border bg-accent/30 text-foreground font-bold">
                <Calendar className="h-3.5 w-3.5 text-primary" />{" "}
                {new Date(post.meta.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>

              <span className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-primary" /> {post.readingTime}
              </span>

              <span className="flex items-center gap-1.5">
                <User className="h-3.5 w-3.5 text-primary" /> Francis Igbiriki
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {post.meta.tags?.map((tag: string) => (
                <span
                  key={tag}
                  className="flex items-center gap-1 px-2.5 py-1 border border-border bg-accent/20 text-primary text-[9px] font-bold"
                >
                  <Tag className="h-2.5 w-2.5" /> {tag}
                </span>
              ))}
            </div>
          </div>
        </header>

        {/* Article Prose Content */}
        <div className="prose dark:prose-invert max-w-none px-2 sm:px-4
          prose-headings:font-black prose-headings:uppercase prose-headings:italic prose-headings:tracking-tight prose-headings:text-foreground
          prose-h1:text-3xl sm:prose-h1:text-4xl prose-h1:mt-14 prose-h1:mb-6
          prose-h2:text-2xl sm:prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-4 prose-h2:border-b prose-h2:border-border/60 prose-h2:pb-2
          prose-h3:text-xl sm:prose-h3:text-2xl prose-h3:mt-10 prose-h3:mb-3
          prose-p:text-base sm:prose-p:text-[17px] prose-p:leading-[1.8] prose-p:text-foreground/90 prose-p:font-normal
          prose-a:text-primary prose-a:font-semibold hover:prose-a:underline
          prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:bg-accent/20 prose-blockquote:p-6 prose-blockquote:my-8 prose-blockquote:text-foreground/90 prose-blockquote:italic
          prose-ul:my-6 prose-ul:list-disc prose-ul:pl-6 prose-li:my-2 prose-li:leading-relaxed prose-li:text-foreground/90
          prose-ol:my-6 prose-ol:list-decimal prose-ol:pl-6 prose-ol:leading-relaxed prose-ol:text-foreground/90
          prose-strong:text-foreground prose-strong:font-bold
          prose-code:text-primary prose-code:font-mono prose-code:text-sm prose-code:bg-accent/40 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-xs
          prose-hr:my-14 prose-hr:border-border
        ">
          <MDXRemote source={post.content} components={mdxComponents} />
        </div>

        {/* Previous / Next Article Navigation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-border/80">
          {prevPost ? (
            <Link
              href={`/blog/${prevPost.slug}`}
              className="flex flex-col gap-2 p-6 sm:p-8 border border-border bg-background/60 hover:bg-muted/40 transition-all group"
            >
              <span className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-widest text-muted-foreground group-hover:text-primary">
                <ArrowLeft className="h-3 w-3 transition-transform group-hover:-translate-x-1" />
                Previous Article
              </span>
              <span className="font-bold text-base sm:text-lg text-foreground group-hover:text-primary transition-colors line-clamp-2">
                {prevPost.title}
              </span>
            </Link>
          ) : (
            <div className="p-6 border border-dashed border-border/50 text-muted-foreground/50 font-mono text-[10px] uppercase flex items-center justify-center">
              {"// FIRST_POST_IN_STREAM"}
            </div>
          )}

          {nextPost ? (
            <Link
              href={`/blog/${nextPost.slug}`}
              className="flex flex-col gap-2 p-6 sm:p-8 border border-border bg-background/60 hover:bg-muted/40 transition-all group text-right"
            >
              <span className="flex items-center justify-end gap-1.5 font-mono text-[9px] uppercase tracking-widest text-muted-foreground group-hover:text-primary">
                Next Article
                <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
              </span>
              <span className="font-bold text-base sm:text-lg text-foreground group-hover:text-primary transition-colors line-clamp-2">
                {nextPost.title}
              </span>
            </Link>
          ) : (
            <div className="p-6 border border-dashed border-border/50 text-muted-foreground/50 font-mono text-[10px] uppercase flex items-center justify-center text-right">
              {"// LATEST_POST_IN_STREAM"}
            </div>
          )}
        </div>

        {/* GitHub Discussions Community Comments & Reactions */}
        <GiscusComments />

        {/* Recommended Reads */}
        <RecommendedReads currentSlug={slug} tags={post.meta.tags || []} />
      </div>
    </article>
  );
}
