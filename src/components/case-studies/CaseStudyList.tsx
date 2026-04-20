"use client";

import Link from "next/link";
import { ArrowRight, Calendar, Clock, Database } from "lucide-react";
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
} as const;

const item = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } }
} as const;

export function CaseStudyList({ studies }: { studies: any[] }) {
  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="flex flex-col gap-1"
    >
      {studies.map((study, idx) => (
        <motion.article 
          key={study.slug} 
          variants={item}
          className="group relative flex flex-col gap-8 p-12 border border-border bg-background transition-all hover:bg-muted md:flex-row items-start"
        >
          <div className="flex flex-col gap-6 flex-1">
            <div className="flex items-center gap-6 text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground">
              <span className="flex items-center gap-2"><Calendar className="h-3 w-3" /> {study.date}</span>
              <span className="flex items-center gap-2"><Clock className="h-3 w-3" /> 10m_READ</span>
              <span className="text-primary font-black">ID: 00{idx + 1}</span>
            </div>
            <h2 className="text-4xl font-black group-hover:text-primary transition-colors uppercase italic tracking-tighter leading-none">
              <Link href={`/case-studies/${study.slug}`}>
                <span className="absolute inset-0" />
                {study.title.replace(/ /g, "_")}
              </Link>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl font-medium">
              {study.summary}
            </p>
            <div className="flex flex-wrap gap-2 pt-4">
              {study.techStack.map((tag: string) => (
                <span key={tag} className="text-[10px] font-mono px-3 py-1 border border-border bg-background text-muted-foreground uppercase tracking-wider">
                  {tag}
                </span>
              ))}
            </div>
            <div className="mt-6 flex items-center gap-3 text-[10px] font-mono font-black uppercase tracking-widest text-primary">
              Deploy.full_story() <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </div>
          </div>
          
          <div className="flex flex-col gap-8 md:w-1/3 p-10 border border-border bg-accent/30 relative">
            <div className="absolute top-0 right-0 p-2 opacity-10">
              <Database className="h-12 w-12" />
            </div>
            <div>
              <h4 className="text-[10px] font-mono font-black uppercase tracking-widest text-primary mb-3 underline decoration-primary/30 underline-offset-8">Business_Value</h4>
              <p className="text-sm leading-relaxed text-foreground font-medium">{study.businessValue}</p>
            </div>
            <div>
              <h4 className="text-[10px] font-mono font-black uppercase tracking-widest text-primary mb-3 underline decoration-primary/30 underline-offset-8">Technical_Trade_Off</h4>
              <p className="text-sm leading-relaxed italic text-muted-foreground">{study.technicalTradeOffs}</p>
            </div>
          </div>
        </motion.article>
      ))}
    </motion.div>
  );
}
