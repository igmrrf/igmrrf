import type { Metadata } from "next";
import { Bricolage_Grotesque, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { AppLayout } from "@/components/layout/AppLayout";

const bricolage = Bricolage_Grotesque({
  variable: "--font-sans",
  subsets: ["latin"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | igmrrf",
    default: "igmrrf | Senior Engineer & System Architect",
  },
  description:
    "Senior Engineer specializing in high-performance distributed systems, Clean Architecture, and automated RAG pipelines.",
  openGraph: {
    title: "igmrrf | Senior Engineer",
    description:
      "Architecting resilient systems through high-craft engineering and clean technical decoupling.",
    url: "https://igmrrf.dev",
    siteName: "igmrrf Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "igmrrf | Senior Engineer",
    description:
      "High-performance TypeScript ecosystems and Clean Architecture.",
    creator: "@igmrrf",
  },
  robots: {
    index: true,
    follow: true,
  },
};

import { ThemeProvider } from "@/components/theme/ThemeProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${bricolage.variable} ${jetbrains.variable} antialiased selection:bg-primary selection:text-primary-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AppLayout>{children}</AppLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
