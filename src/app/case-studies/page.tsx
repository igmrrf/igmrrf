import { getAllCaseStudies } from "@/lib/mdx";
import { CaseStudyList } from "@/components/case-studies/CaseStudyList";
import { Terminal } from "lucide-react";

export const metadata = {
  title: "Case Studies | Engineering Narratives",
  description: "Deep-dive engineering narratives on complex system integrations and architectural decisions.",
};

export default async function CaseStudiesPage() {
  const studies = await getAllCaseStudies();

  return (
    <div className="flex flex-col gap-24 max-w-6xl mx-auto">
      <div className="flex flex-col gap-6 border-l-4 border-primary pl-10 py-6 bg-accent/20">
        <div className="flex items-center gap-3 text-[10px] font-mono tracking-[0.4em] uppercase text-primary">
          <Terminal className="h-3 w-3" />
          Archive.get_records()
        </div>
        <h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase italic leading-none">
          Case_Studies
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed font-medium">
          Detailed technical narratives exploring distributed systems, 
          architectural trade-offs, and high-value business outcomes.
        </p>
      </div>

      <CaseStudyList studies={studies} />
    </div>
  );
}
