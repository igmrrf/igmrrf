import Link from "next/link";
import { getAllBlogPosts } from "@/lib/mdx";
import { ArrowRight } from "lucide-react";

interface RecommendedReadsProps {
  currentSlug: string;
  tags: string[];
}

export async function RecommendedReads({ currentSlug, tags = [] }: RecommendedReadsProps) {
  const allPosts = await getAllBlogPosts();

  // Filter out current post and find related ones by tags, then fallback to recent
  const recommended = allPosts
    .filter((post) => post.slug !== currentSlug)
    .sort((a, b) => {
      const aTags = a.tags || [];
      const bTags = b.tags || [];
      const aCommonTags = aTags.filter((tag) => tags.includes(tag)).length;
      const bCommonTags = bTags.filter((tag) => tags.includes(tag)).length;
      return bCommonTags - aCommonTags;
    })
    .slice(0, 2);

  if (recommended.length === 0) return null;

  return (
    <div className="flex flex-col gap-8 pt-12 border-t border-border mt-16">
      <div className="flex items-center gap-3 text-[10px] font-mono tracking-[0.4em] uppercase text-primary font-bold">
        Recommend.fetch_related()
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {recommended.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group flex flex-col justify-between gap-6 p-6 sm:p-8 border border-border bg-background/60 hover:bg-muted/40 transition-all"
          >
            <div className="flex flex-col gap-3">
              <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
                {new Date(post.date).toLocaleDateString()} {"// REL_IDX"}
              </span>
              <h4 className="text-lg sm:text-xl font-black uppercase italic tracking-tight group-hover:text-primary transition-colors">
                {post.title}
              </h4>
              <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                {post.summary}
              </p>
            </div>
            <div className="flex items-center gap-2 text-[10px] font-mono font-black uppercase tracking-widest text-primary">
              Execute.read() <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
