import { getCaseStudyBySlug, getCaseStudySlugs } from "@/lib/mdx";
import { MDXRemote } from "next-mdx-remote/rsc";
import { ArrowLeft, Calendar, Github, Terminal } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import * as motion from "framer-motion/client";

export async function generateStaticParams() {
  const slugs = getCaseStudySlugs();
  return slugs.map((slug) => ({
    slug: slug.replace(/\.mdx?$/, ""),
  }));
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  try {
    const study = await getCaseStudyBySlug(slug);

    return (
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] } as const}
        className="flex flex-col gap-12 max-w-5xl mx-auto"
      >
        <div className="flex flex-col gap-8 pb-12 border-b border-border">
          <Link 
            href="/case-studies" 
            className="inline-flex items-center gap-2 text-[10px] font-mono tracking-widest uppercase text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-3 w-3" /> Back_to_Archive.idx
          </Link>

          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3 text-[10px] font-mono tracking-[0.4em] uppercase text-primary">
              <Terminal className="h-3 w-3" />
              Study_Analysis.log
            </div>
            <h1 className="text-4xl md:text-8xl font-black tracking-tighter uppercase italic leading-[0.85]">
              {study.meta.title}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-[10px] font-mono text-muted-foreground uppercase tracking-widest pt-4">
              <span className="flex items-center gap-1.5 px-2 py-1 border border-border bg-accent text-primary">
                <Calendar className="h-4 w-4" /> {study.meta.date}
              </span>
              <div className="flex flex-wrap gap-2">
                {study.meta.techStack.map((tag: string) => (
                  <span key={tag} className="px-2 py-1 border border-border bg-background">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="pt-6">
              <Link 
                href={study.meta.githubUrl} 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center gap-3 border border-foreground bg-foreground px-6 py-3 text-[10px] font-mono tracking-widest uppercase text-background hover:bg-transparent hover:text-foreground transition-all"
              >
                <Github className="h-4 w-4" /> Pull_Repository
              </Link>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 border border-border">
          <div className="flex flex-col gap-3 p-10 border-b md:border-b-0 md:border-r border-border bg-accent/20">
            <h4 className="text-[10px] font-mono font-black uppercase tracking-widest text-primary underline underline-offset-8 decoration-primary/30 mb-2">Business_Value</h4>
            <p className="text-sm leading-relaxed text-foreground font-medium">{study.meta.businessValue}</p>
          </div>
          <div className="flex flex-col gap-3 p-10 bg-accent/10 italic">
            <h4 className="text-[10px] font-mono font-black uppercase tracking-widest text-primary underline underline-offset-8 decoration-primary/30 mb-2">Technical_Trade_Off</h4>
            <p className="text-sm leading-relaxed text-muted-foreground">{study.meta.technicalTradeOffs}</p>
          </div>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none pt-12 
          prose-headings:font-black prose-headings:uppercase prose-headings:italic prose-headings:tracking-tighter
          prose-a:text-primary hover:prose-a:underline 
          prose-img:sharp-border prose-pre:sharp-border prose-pre:bg-accent/50 prose-pre:border-border
          font-medium leading-relaxed">
          <MDXRemote source={study.content} />
        </div>
      </motion.div>
    );
  } catch (error) {
    notFound();
  }
}
