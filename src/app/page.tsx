import { getAllCaseStudies } from "@/lib/mdx";
import HomeClient from "@/components/home/HomeClient";

export default async function Home() {
  const studies = await getAllCaseStudies();
  // Filter for featured studies or just take top 3
  const featuredStudies = studies.filter(s => s.featured).slice(0, 3);
  const displayStudies = featuredStudies.length > 0 ? featuredStudies : studies.slice(0, 3);

  return <HomeClient projects={displayStudies} />;
}
