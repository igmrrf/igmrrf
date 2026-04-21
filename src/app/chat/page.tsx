import { ChatInterface } from "@/components/chat/ChatInterface";
import { Terminal } from "lucide-react";

export const metadata = {
  title: "Architect Chat | AI Engineering Assistant",
  description:
    "Consult with our AI Architect on system design, technical trade-offs, and Clean Architecture.",
};

export default function ChatPage() {
  return (
    <div className="flex flex-col gap-24 max-w-6xl mx-auto">
      <div className="flex flex-col gap-6 border-l-4 border-primary pl-10 py-6 bg-accent/20">
        <div className="flex items-center gap-3 text-[10px] font-mono tracking-[0.4em] uppercase text-primary">
          <Terminal className="h-3 w-3" />
          Neural_Interface.init()
        </div>
        <h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase italic leading-none">
          AI_Architect
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed font-medium"> 
          Engage with a Retrieval-Augmented Generation (RAG) agent indexed on my
          case studies, repository structures, and architectural philosophy.
        </p>
      </div>

      <div className="border border-border p-px bg-border">
        <div className="bg-background p-1">
          <ChatInterface />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 border-t border-l border-border">
        {[
          {
            title: "Retrieval_Augmented",
            desc: "Indexed on local MDX narratives and key repository architectural documentation.",
          },
          {
            title: "Context_Aware",
            desc: "Provides technical explanations grounded in specific project trade-offs and business goals.",
          },
          {
            title: "Technical_Focus",
            desc: "Designed to answer 'why' and 'how' behind engineering decisions, not just 'what'.",
          },
        ].map((feature, i) => (
          <div
            key={i}
            className="flex flex-col gap-4 p-10 border-r border-b border-border bg-accent/10"
          >
            <h4 className="text-[10px] font-mono font-black uppercase tracking-widest text-primary underline decoration-primary/30 underline-offset-8 mb-2">
              {feature.title}
            </h4>
            <p className="text-sm text-muted-foreground leading-relaxed font-medium">
              {feature.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
