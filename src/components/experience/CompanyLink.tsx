"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import companies from "@/data/companies.json";

type Company = { name: string; url?: string; tagline: string };

const registry = companies as Record<string, Company>;

/** Long enough that skimming a row does not flash seven cards at you. */
const OPEN_DELAY_MS = 140;
/** Short grace period so the pointer can cross the gap into the card. */
const CLOSE_DELAY_MS = 120;
/** Card height plus its offset — below this, the card opens upward instead. */
const CARD_CLEARANCE_PX = 320;

export function CompanyLink({ slug }: { slug: string }) {
  const company = registry[slug];
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState<"below" | "above">("below");
  const anchorRef = useRef<HTMLAnchorElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => () => clearTimeout(timer.current ?? undefined), []);

  // A typo'd slug should be obvious in the page, not silently swallowed.
  if (!company) return <span>{slug}</span>;

  // Nothing to preview for a company whose site is gone; the name still reads
  // the same, it just does not pretend to be a link.
  if (!company.url) return <span>{company.name}</span>;

  const url = company.url;

  const show = () => {
    clearTimeout(timer.current ?? undefined);
    timer.current = setTimeout(() => {
      const rect = anchorRef.current?.getBoundingClientRect();
      if (rect) {
        setPlacement(
          window.innerHeight - rect.bottom < CARD_CLEARANCE_PX ? "above" : "below",
        );
      }
      setOpen(true);
    }, OPEN_DELAY_MS);
  };

  const hide = () => {
    clearTimeout(timer.current ?? undefined);
    timer.current = setTimeout(() => setOpen(false), CLOSE_DELAY_MS);
  };

  return (
    <span
      className="relative inline-flex"
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      <Link
        ref={anchorRef}
        href={url}
        target="_blank"
        rel="noreferrer noopener"
        // The dotted underline is the affordance at rest; the card is the reward.
        className="inline-flex items-center gap-1 border-b border-dotted border-current hover:border-solid focus-visible:border-solid focus-visible:outline-none transition-colors"
        onClick={() => setOpen(false)}
      >
        {company.name}
        <ArrowUpRight className="h-2.5 w-2.5 shrink-0" aria-hidden />
      </Link>

      <AnimatePresence>
        {open && (
          <motion.span
            role="tooltip"
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: placement === "below" ? -6 : 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: placement === "below" ? -6 : 6 }}
            transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
            // Hidden below md: a preview card is meaningless without a pointer,
            // and on a phone it would just cover the bullet you were reading.
            // font-sans/normal-case/tracking-normal reset the card out of the
            // mono-uppercase context of the row label it is anchored to.
            className={`absolute left-0 z-50 hidden w-[320px] cursor-default border border-border bg-background font-sans normal-case tracking-normal text-foreground shadow-[0_20px_50px_-20px_rgba(0,0,0,0.5)] md:block ${
              placement === "below" ? "top-full mt-3" : "bottom-full mb-3"
            }`}
          >
            <span className="block border-b border-border bg-muted/40">
              <Image
                src={`/img/companies/${slug}.jpg`}
                alt=""
                width={800}
                height={450}
                className="block h-auto w-full"
              />
            </span>

            <span className="flex flex-col gap-2 p-4">
              <span className="text-sm font-black uppercase italic tracking-tighter">
                {company.name}
              </span>
              <span className="text-xs leading-relaxed font-medium text-muted-foreground">
                {company.tagline}
              </span>
              <span className="flex items-center gap-1.5 pt-1 font-mono text-[10px] uppercase tracking-widest text-primary">
                {new URL(url).hostname.replace(/^www\./, "")}
                <ArrowUpRight className="h-3 w-3" aria-hidden />
              </span>
            </span>
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}
