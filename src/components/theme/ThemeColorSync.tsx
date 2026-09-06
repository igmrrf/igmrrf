"use client";

import { useEffect } from "react";
import { useTheme } from "next-themes";
import { THEME_COLORS } from "@/lib/theme-colors";

/**
 * Keeps the browser chrome — the iOS status bar, the Android address bar, the
 * navigation bar of an installed PWA — on the same theme as the page.
 *
 * The `themeColor` entries in the viewport export are scoped to
 * `prefers-color-scheme`, which is only right while the site follows the OS.
 * The moment someone uses the theme toggle the two disagree, so every
 * theme-color tag is overwritten with the resolved colour — all of them,
 * because the browser honours the first tag whose media matches and we stop
 * caring which one that is once they all agree.
 *
 * The observer is not defensive coding: Next re-emits its metadata on every
 * client-side navigation, and one of those fresh tags carries the media-scoped
 * colour again. Without it, a reader whose OS is light and who chose dark gets
 * a white bar over a black page the moment they open a case study.
 */
export function ThemeColorSync() {
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    if (!resolvedTheme) return;
    const color =
      resolvedTheme === "dark" ? THEME_COLORS.dark : THEME_COLORS.light;

    const apply = () => {
      document.querySelectorAll('meta[name="theme-color"]').forEach((tag) => {
        // Writing only on a real difference is what keeps the observer from
        // re-triggering itself forever.
        if (tag.getAttribute("content") !== color) {
          tag.setAttribute("content", color);
        }
      });
    };

    apply();
    const observer = new MutationObserver(apply);
    observer.observe(document.head, {
      childList: true,
      subtree: true,
      attributeFilter: ["content", "media"],
    });
    return () => observer.disconnect();
  }, [resolvedTheme]);

  return null;
}
