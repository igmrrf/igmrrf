"use client";

import React, { useState, useEffect, useRef } from "react";
import Giscus, { Mapping } from "@giscus/react";
import { useTheme } from "next-themes";
import { MessageSquare, Github, Info, Loader2 } from "lucide-react";
import { useIsMounted } from "@/hooks/useIsMounted";

export function GiscusComments() {
  const { resolvedTheme } = useTheme();
  const mounted = useIsMounted();
  const [isInView, setIsInView] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const repo = (process.env.NEXT_PUBLIC_GISCUS_REPO as `${string}/${string}`) || "igmrrf/igmrrf";
  const repoId =
    process.env.NEXT_PUBLIC_GISCUS_REPO_ID || "MDEwOlJlcG9zaXRvcnkyODgzMDE5OTE=";
  const category = process.env.NEXT_PUBLIC_GISCUS_CATEGORY || "General";
  const categoryId = process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID || "";
  const mapping = ((process.env.NEXT_PUBLIC_GISCUS_MAPPING as Mapping) || "title");

  const isConfigured = Boolean(repo && repoId && categoryId);

  // Viewport Intersection Observer for True Zero-Overhead Lazy Loading
  useEffect(() => {
    if (!containerRef.current || isInView) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
            break;
          }
        }
      },
      {
        rootMargin: "300px", // Trigger 300px before reaching the comments section
      }
    );

    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
    };
  }, [isInView]);

  return (
    <div
      ref={containerRef}
      className="flex flex-col gap-8 pt-12 border-t border-border mt-16"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5 text-[10px] font-mono tracking-[0.3em] uppercase text-primary font-bold">
          <MessageSquare className="h-3.5 w-3.5" />
          <span>GITHUB_DISCUSSIONS // COMMUNITY_STREAM</span>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] font-mono text-muted-foreground uppercase">
          <Github className="h-3.5 w-3.5 text-primary" />
          <span>Synced with {repo}</span>
        </div>
      </div>

      {!isConfigured ? (
        <div className="flex flex-col gap-4 p-8 border border-dashed border-border bg-background/60 backdrop-blur-md">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-foreground uppercase tracking-wider">
            <Info className="h-4 w-4 text-primary shrink-0" />
            <span>Almost Done: Select Discussion Category</span>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Your repository (<strong>{repo}</strong>) and repository ID are recognized!
            To complete the setup, select your discussion category (e.g. <strong>General</strong> or <strong>Announcements</strong>) on{" "}
            <a
              href="https://giscus.app"
              target="_blank"
              rel="noreferrer"
              className="text-primary underline font-bold"
            >
              giscus.app
            </a>{" "}
            and copy the <code className="text-primary font-mono">NEXT_PUBLIC_GISCUS_CATEGORY_ID</code> into <code className="text-primary font-mono">.env.local</code>.
          </p>
          <div className="p-4 bg-zinc-950 text-zinc-200 border border-border text-[11px] font-mono leading-relaxed overflow-x-auto">
            <code>
              NEXT_PUBLIC_GISCUS_REPO={repo}<br />
              NEXT_PUBLIC_GISCUS_REPO_ID={repoId}<br />
              NEXT_PUBLIC_GISCUS_CATEGORY=General<br />
              NEXT_PUBLIC_GISCUS_CATEGORY_ID=DIC_your_category_id_here<br />
              NEXT_PUBLIC_GISCUS_MAPPING=title
            </code>
          </div>
        </div>
      ) : null}

      {mounted && isConfigured && (
        <div className="p-6 sm:p-8 border border-border bg-background/80 backdrop-blur-md min-h-[220px]">
          {isInView ? (
            <Giscus
              id="comments"
              repo={repo}
              repoId={repoId}
              category={category}
              categoryId={categoryId}
              mapping={mapping}
              strict="0"
              reactionsEnabled="1"
              emitMetadata="0"
              inputPosition="bottom"
              theme={resolvedTheme === "dark" ? "transparent_dark" : "light"}
              lang="en"
              loading="lazy"
            />
          ) : (
            <div className="py-16 flex flex-col items-center justify-center gap-3 text-muted-foreground font-mono text-xs uppercase tracking-widest">
              <Loader2 className="h-5 w-5 animate-spin text-primary" />
              <span>Initializing Community Discussion Stream...</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
