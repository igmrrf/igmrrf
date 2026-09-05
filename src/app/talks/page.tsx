import { Terminal } from "lucide-react";
import { getAllTalks } from "@/lib/mdx";
import { TalkList } from "@/components/talks/TalkList";

export const metadata = {
  title: "Talks | System Architect",
  description:
    "Conference talks and technical sessions by igmrrf — slides, references, and the code behind them.",
};

export default async function TalksPage() {
  const talks = await getAllTalks();

  return (
    <div className="flex flex-col gap-16 max-w-6xl mx-auto">
      <div className="flex flex-col gap-6 border-l-4 border-primary pl-8 py-4">
        <div className="flex items-center gap-2.5 text-[10px] font-mono tracking-[0.4em] uppercase text-primary font-bold">
          <Terminal className="h-3.5 w-3.5" />
          Entity.talks()
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-7xl font-black tracking-tighter uppercase italic">
          Stage_Notes
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed font-medium">
          Conference sessions and technical deep-dives. Every deck is here in
          full, alongside the reference implementation it was built on.
        </p>
      </div>

      {talks.length > 0 ? (
        <TalkList talks={talks} />
      ) : (
        <p className="font-mono text-sm text-muted-foreground">
          No talks published yet.
        </p>
      )}
    </div>
  );
}
