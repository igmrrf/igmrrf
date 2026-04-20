import Link from "next/link";
import { getAllBlogPosts } from "@/lib/mdx";
import { ArrowRight } from "lucide-react";

interface RecommendedReadsProps {
  currentSlug: string;
  tags: string[];
}

export async function RecommendedReads({ currentSlug, tags }: RecommendedReadsProps) {
  const allPosts = await getAllBlogPosts();
  
  // Filter out current post and find related ones by tags, then fallback to recent
  const recommended = allPosts
    .filter(post => post.slug !== currentSlug)
    .sort((a, b) => {
      const aCommonTags = a.tags.filter(tag => tags.includes(tag)).length;
      const bCommonTags = b.tags.filter(tag => tags.includes(tag)).length;
      return bCommonTags - aCommonTags;
    })
    .slice(0, 2);

  if (recommended.length === 0) return null;

  return (
    <div className="flex flex-col gap-10 pt-16 border-t border-border mt-20">
      <div className="flex items-center gap-3 text-[10px] font-mono tracking-[0.4em] uppercase text-primary">
        Recommend.fetch_related()
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border border border-border">
        {recommended.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group flex flex-col gap-6 p-10 bg-background transition-all hover:bg-muted"
          >
            <div className="flex flex-col gap-4">
              <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
                {new Date(post.date).toLocaleDateString()} // REL_IDX
              </span>
              <h4 className="text-xl font-black uppercase italic tracking-tighter group-hover:text-primary transition-colors">
                {post.title}
              </h4>
              <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                {post.summary}
              </p>
            </div>
            <div className="mt-auto flex items-center gap-3 text-[10px] font-mono font-black uppercase tracking-widest">
              Execute.read() <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
