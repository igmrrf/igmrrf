import { getAllCaseStudies, getAllBlogPosts } from "@/lib/mdx";
import HomeClient from "@/components/home/HomeClient";

export const metadata = { alternates: { canonical: "/" } };

export default async function Home() {
  const [studies, posts] = await Promise.all([getAllCaseStudies(), getAllBlogPosts()]);
  // Filter for featured studies or just take top 3
  const featuredStudies = studies.filter(s => s.featured).slice(0, 3);
  const displayStudies = featuredStudies.length > 0 ? featuredStudies : studies.slice(0, 3);

  return <HomeClient projects={displayStudies} posts={posts.slice(0, 3)} />;
}
