import { getAllBlogPosts } from "@/lib/mdx";
import { BlogList } from "@/components/blog/BlogList";

export const metadata = {
  title: "Blog | Engineering Insights & Architecture",
  description:
    "Deep dives into distributed systems, TypeScript architecture, and AI-driven automation pipelines.",
};

export default async function BlogPage() {
  const posts = await getAllBlogPosts();

  return (
    <div className="flex flex-col gap-16 max-w-6xl mx-auto">
      <div className="flex flex-col gap-6 border-l-4 border-primary pl-8 py-4">
        <div className="text-[10px] font-mono tracking-[0.4em] uppercase text-primary">
          Intel_Feed.log
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-7xl font-black tracking-tighter uppercase italic">
          Engineering_Insights
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed font-medium">
          Deep dives into distributed systems, TypeScript architecture, and
          AI-driven automation pipelines.
        </p>
      </div>

      <BlogList posts={posts} />
    </div>
  );
}
