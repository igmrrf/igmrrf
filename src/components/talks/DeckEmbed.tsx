"use client";

import { useState } from "react";
import { Maximize2, Play } from "lucide-react";

/**
 * The compiled Slidev deck is a standalone SPA served from /decks/<slug>/.
 * It is NOT bundled into the portfolio — a deck is several megabytes of Vue,
 * Shiki and Mermaid, and every talk would add that again.
 *
 * The iframe is therefore lazy: nothing loads until the visitor asks for it.
 */
export function DeckEmbed({ deckSlug, title }: { deckSlug: string; title: string }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const deckUrl = `/decks/${deckSlug}/`;

  return (
    <div className="border border-border bg-accent/20">
      <div className="flex items-center justify-between gap-4 border-b border-border px-4 py-2.5">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          Deck.embed(&quot;{deckSlug}&quot;)
        </span>
        <a
          href={deckUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-primary transition-all hover:tracking-[0.25em]"
        >
          Fullscreen <Maximize2 className="h-3 w-3" />
        </a>
      </div>

      {isLoaded ? (
        <iframe
          src={deckUrl}
          title={`${title} — slides`}
          loading="lazy"
          allow="fullscreen"
          className="aspect-video w-full border-0 bg-black"
        />
      ) : (
        <button
          type="button"
          onClick={() => setIsLoaded(true)}
          className="group flex aspect-video w-full flex-col items-center justify-center gap-4 bg-black/40 transition-colors hover:bg-black/20"
        >
          <span className="flex h-14 w-14 items-center justify-center border border-border bg-background transition-colors group-hover:border-primary">
            <Play className="h-5 w-5 text-primary" />
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
            Load slides
          </span>
        </button>
      )}

      <div className="border-t border-border px-4 py-2.5">
        <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground/70">
          Arrow keys navigate · <kbd className="text-foreground">O</kbd> overview ·{" "}
          <kbd className="text-foreground">P</kbd> presenter
        </span>
      </div>
    </div>
  );
}
