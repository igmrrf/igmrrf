import { getBlogPostBySlug, getBlogPostSlugs } from "@/lib/mdx";
import { MDXRemote } from "next-mdx-remote/rsc";
import { ArrowLeft, Calendar, Tag, Terminal } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LikeButton } from "@/components/blog/LikeButton";
import { CommentSection } from "@/components/blog/CommentSection";
import { RecommendedReads } from "@/components/blog/RecommendedReads";
import * as motion from "framer-motion/client";

export async function generateStaticParams() {
  const slugs = getBlogPostSlugs();
  return slugs.map((slug) => ({
    slug: slug.replace(/\.mdx?$/, ""),
  }));
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  try {
    const post = await getBlogPostBySlug(slug);

    return (
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] } as const}
        className="flex flex-col gap-12 max-w-4xl mx-auto"
      >
        <div className="flex flex-col gap-8 pb-12 border-b border-border">
          <Link 
            href="/blog" 
            className="inline-flex items-center gap-2 text-[10px] font-mono tracking-widest uppercase text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-3 w-3" /> Back_to_Feed.log
          </Link>

          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3 text-[10px] font-mono tracking-[0.4em] uppercase text-primary">
              <Terminal className="h-3 w-3" />
              Entry_Stream.idx
            </div>
            <h1 className="text-4xl md:text-7xl font-black tracking-tighter uppercase italic leading-[0.9]">
              {post.meta.title}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
              <span className="flex items-center gap-1.5 px-2 py-1 border border-border bg-accent">
                <Calendar className="h-4 w-4 text-primary" /> {new Date(post.meta.date).toLocaleDateString()}
              </span>
              <div className="flex flex-wrap gap-3">
                {post.meta.tags.map((tag: string) => (
                  <span key={tag} className="flex items-center gap-1.5 text-primary">
                    <Tag className="h-3 w-3" /> {tag}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="pt-6 flex items-center justify-between border-t border-border mt-4">
              <div className="flex items-center gap-4">
                <LikeButton slug={slug} />
              </div>
              <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground/60 italic max-w-md text-right">
                {post.meta.summary}
              </div>
            </div>
          </div>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none pt-8 
          prose-headings:font-black prose-headings:uppercase prose-headings:italic prose-headings:tracking-tighter
          prose-a:text-primary hover:prose-a:underline 
          prose-img:sharp-border prose-pre:sharp-border prose-pre:bg-accent/50 prose-pre:border-border
          font-medium leading-relaxed">
          <MDXRemote source={post.content} />
        </div>

        <div className="mt-12 flex justify-center py-12 border-y border-border bg-accent/10">
           <LikeButton slug={slug} />
        </div>

        <CommentSection slug={slug} />
        
        <RecommendedReads currentSlug={slug} tags={post.meta.tags} />
      </motion.div>
    );
  } catch (error) {
    notFound();
  }
}
