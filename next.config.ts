import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [{ source: "/:path*", headers: [
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "X-Frame-Options", value: "SAMEORIGIN" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
    ] }];
  },
  async rewrites() {
    return {
      beforeFiles: [],

      // Runs AFTER static files in public/ are checked, so real deck assets
      // (/decks/<slug>/assets/*.js) are served directly and never rewritten.
      // This only handles the bare directory URL, which Next does not resolve
      // to index.html on its own.
      afterFiles: [
        {
          source: "/decks/:slug",
          destination: "/decks/:slug/index.html",
        },
      ],

      // Runs last, after pages and dynamic routes. A compiled Slidev deck is a
      // client-routed SPA, so a hard reload of /decks/<slug>/7 must fall back
      // to the deck's own shell rather than the portfolio's 404.
      fallback: [
        {
          source: "/decks/:slug/:path*",
          destination: "/decks/:slug/index.html",
        },
      ],
    };
  },
};

export default nextConfig;
