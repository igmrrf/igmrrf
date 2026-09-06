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
 * The moment someone uses the theme toggle the two disagree.
 *
 * Two things make this fiddlier than setting an attribute:
 *
 * 1. Phones ignore a `content` edit. Rewriting the existing tags leaves the
 *    correct colour sitting in the DOM while the bar keeps its old one until
 *    the next navigation. Replacing the element is what the browsers actually
 *    notice, so this owns one tag of its own and rebuilds it on every change.
 * 2. React owns the tags from the viewport export and re-emits them on every
 *    client-side navigation, so they cannot be removed — React would later try
 *    to remove nodes that are already gone. Ours is prepended instead: the
 *    browser takes the first tag whose media matches, and a tag with no media
 *    always matches, so ours wins wherever React puts the others.
 */
export function ThemeColorSync() {
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    if (!resolvedTheme) return;
    const color =
      resolvedTheme === "dark" ? THEME_COLORS.dark : THEME_COLORS.light;

    let ours: HTMLMetaElement | null = null;

    const apply = () => {
      // The browser reads the first tag whose media matches; if that is already
      // ours, showing the right colour, touching it again would only feed the
      // observer its own mutation.
      const chosen = Array.from(
        document.querySelectorAll<HTMLMetaElement>('meta[name="theme-color"]'),
      ).find((tag) => !tag.media || matchMedia(tag.media).matches);
      if (ours && ours.content === color && chosen === ours) return;
      ours?.remove();
      const meta = document.createElement("meta");
      meta.name = "theme-color";
      meta.content = color;
      document.head.prepend(meta);
      ours = meta;
    };

    apply();
    // React re-emitting its own theme-color tags can push ours out of first
    // place; this puts it back.
    const observer = new MutationObserver(apply);
    observer.observe(document.head, { childList: true });

    return () => {
      observer.disconnect();
      ours?.remove();
    };
  }, [resolvedTheme]);

  return null;
}
