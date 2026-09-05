import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
