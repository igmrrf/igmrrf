import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { AppLayout } from "@/components/layout/AppLayout";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { WallpaperProvider } from "@/components/theme/WallpaperProvider";
import { ThemeColorSync } from "@/components/theme/ThemeColorSync";
import { THEME_COLORS, THEME_COLOR_INIT_SCRIPT } from "@/lib/theme-colors";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://theldo.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    template: "%s | The LDO",
    default: "The LDO | Francis Igbiriki — System Architect & Founder",
  },
  description:
    "System Architect and Founder with 7+ years of experience architecting scalable Fintech, Web3, and distributed systems for 500k+ users.",
  keywords: [
    "Francis Igbiriki",
    "igmrrf",
    "System Architect",
    "Software Architect",
    "Clean Architecture",
    "Fintech",
    "Distributed Systems",
    "TypeScript",
    "Go",
    "Rust",
    "Web3",
    "Neovim",
    "The LDO",
  ],
  authors: [{ name: "Francis Igbiriki", url: "https://github.com/igmrrf" }],
  creator: "Francis Igbiriki",
  publisher: "The LDO",
  openGraph: {
    title: "The LDO | Francis Igbiriki — System Architect & Founder",
    description:
      "Architecting resilient systems through high-craft engineering and clean technical decoupling.",
    url: siteUrl,
    siteName: "The LDO",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The LDO | Francis Igbiriki — System Architect",
    description:
      "High-performance distributed systems, Clean Architecture, and terminal-first engineering.",
    creator: "@igmrrf",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  // iOS ignores the manifest's display mode; without this a home-screen
  // shortcut opens in a Safari tab.
  appleWebApp: {
    capable: true,
    title: "The_LDO",
    statusBarStyle: "default",
  },
  // `capable` only emits the unprefixed spelling; older iOS wants this one.
  other: {
    "apple-mobile-web-app-capable": "yes",
  },
};

export const viewport: Viewport = {
  // The first paint's colour; THEME_COLOR_INIT_SCRIPT corrects a saved theme
  // that disagrees with the OS.
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: THEME_COLORS.light },
    { media: "(prefers-color-scheme: dark)", color: THEME_COLORS.dark },
  ],
  // Scrollbars, form controls and overscroll follow the scheme.
  colorScheme: "light dark",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: "Francis Igbiriki",
      alternateName: "igmrrf",
      jobTitle: "Senior Software Architect & Founder",
      url: siteUrl,
      sameAs: [
        "https://github.com/igmrrf",
        "https://linkedin.com/in/igmrrf",
        "https://x.com/igmrrf",
      ],
      knowsAbout: [
        "System Architecture",
        "Clean Architecture",
        "Distributed Systems",
        "Fintech",
        "Web3",
        "TypeScript",
        "Go",
        "Rust",
        "Python",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "The LDO",
      description:
        "System Architect portfolio, case studies, and engineering publications by Francis Igbiriki.",
      publisher: {
        "@id": `${siteUrl}/#person`,
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Metadata is emitted above this point, so the script can see it. */}
        <script dangerouslySetInnerHTML={{ __html: THEME_COLOR_INIT_SCRIPT }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${bricolage.variable} ${jetbrains.variable} antialiased selection:bg-primary selection:text-primary-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ThemeColorSync />
          <WallpaperProvider>
            <AppLayout>{children}</AppLayout>
          </WallpaperProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
