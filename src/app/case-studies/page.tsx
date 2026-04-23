import { Terminal } from "lucide-react";
import { getAllCaseStudies } from "@/lib/mdx";
import { CaseStudyList } from "@/components/case-studies/CaseStudyList";

export const metadata = {
  title: "Case Studies | System Architect",
  description:
    "Deep dives into distributed systems, engineering research, and high-scale architectures by igmrrf.",
};

export default async function CaseStudiesPage() {
  const studies = await getAllCaseStudies();

  return (
    <div className="flex flex-col gap-16 max-w-6xl mx-auto">
      <div className="flex flex-col gap-6 border-l-4 border-primary pl-8 py-4">
        <div className="text-[10px] font-mono tracking-[0.4em] uppercase text-primary">
          Entity.case_studies()
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-7xl font-black tracking-tighter uppercase italic">
          Selected_Briefs
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed font-medium">
          Detailed technical analysis of complex systems, from fintech pipelines
          to terminal-based developer tooling.
        </p>
      </div>

      <CaseStudyList studies={studies} />
    </div>
  );
}
