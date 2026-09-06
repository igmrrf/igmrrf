"use client";

import { useEffect } from "react";
import { useTheme } from "next-themes";
import { THEME_COLORS } from "@/lib/theme-colors";

/**
 * Follows the theme toggle with a theme-color tag of its own, prepended so it
 * beats the media-scoped ones from the viewport export. The tag is rebuilt
 * rather than edited because browsers ignore a changed `content` attribute,
 * and React's own tags are left alone because it removes them itself later.
 */
export function ThemeColorSync() {
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    if (!resolvedTheme) return;
    const color =
      resolvedTheme === "dark" ? THEME_COLORS.dark : THEME_COLORS.light;

    let ours: HTMLMetaElement | null = null;

    const apply = () => {
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
    // Client-side navigation re-emits React's tags, which can outrank ours.
    const observer = new MutationObserver(apply);
    observer.observe(document.head, { childList: true });

    return () => {
      observer.disconnect();
      ours?.remove();
    };
  }, [resolvedTheme]);

  return null;
}
