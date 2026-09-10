"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  BookText,
  PenTool,
  User,
  History,
  Bot,
  Presentation,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { WallpaperSelector } from "@/components/theme/WallpaperSelector";
import { useWallpaper } from "@/components/theme/WallpaperProvider";
import { TerminalLauncher } from "./TerminalLauncher";

interface AppLayoutProps {
  children: React.ReactNode;
}

const navLinks = [
  { href: "/case-studies", label: "Projects", icon: BookText },
  { href: "/talks", label: "Talks", icon: Presentation },
  { href: "/experience", label: "Experience", icon: History },
  { href: "/blog", label: "Blog", icon: PenTool },
  { href: "/about", label: "About", icon: User },
];

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const menuButton = useRef<HTMLButtonElement>(null);
  const { currentWallpaper, opacity } = useWallpaper();

  useEffect(() => {
    if (!isMenuOpen) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setIsMenuOpen(false); menuButton.current?.focus(); }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [isMenuOpen]);

  return (
    <div
      className={`min-h-screen flex flex-col ${
        currentWallpaper ? "bg-transparent" : "bg-background"
      } text-foreground relative overflow-x-hidden selection:bg-primary selection:text-primary-foreground`}
    >
      <a href="#main-content" className="fixed top-2 left-4 z-[60] -translate-y-24 focus:translate-y-0 bg-primary text-primary-foreground px-5 py-3">Skip to content</a>
      {/* Dynamic Terminal Wallpaper Background with 0.90 Opacity Effect */}
      {currentWallpaper && (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-700 ease-out scale-100"
            style={{
              backgroundImage: `url(${currentWallpaper.url})`,
            }}
          />
          {/* Calibrated Terminal Opacity Backdrop Overlay */}
          <div
            className="absolute inset-0 bg-background transition-opacity duration-300 backdrop-blur-[2px]"
            style={{ opacity }}
          />
        </div>
      )}

      {/* Floating Wallpaper & Styling Controller */}
      <WallpaperSelector />

      {/* Structural Accent Line */}
      <div className="fixed top-0 left-0 w-1 h-full bg-border/20 z-0 pointer-events-none" />

      {/* Fixed Header */}
      <header className="fixed top-0 left-0 z-40 w-full border-b border-border bg-background/85 backdrop-blur-md transition-colors">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 flex h-16 items-center justify-between gap-3">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center space-x-2 group">
              <span className="text-xl font-black tracking-tighter uppercase italic group-hover:text-primary transition-colors">
                The
                <span className="text-primary group-hover:text-foreground">
                  _LDO
                </span>
              </span>
            </Link>

            <nav aria-label="Main navigation" className="hidden lg:flex items-center space-x-5 text-xs font-mono">
              {navLinks.map((link) => {
                const isActive =
                  pathname === link.href ||
                  (link.href !== "/" && pathname.startsWith(link.href));
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    aria-current={isActive ? "page" : undefined}
                    className={`transition-all hover:text-primary py-1 border-b-2 ${
                      isActive
                        ? "text-primary border-primary font-bold"
                        : "text-muted-foreground border-transparent hover:border-border"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="flex items-center gap-2">
            <TerminalLauncher />
            <Link
              href="/chat"
              className="hidden xl:inline-flex items-center gap-2 border border-primary/80 bg-primary/5 hover:bg-primary px-3 py-3 text-xs font-mono text-primary hover:text-primary-foreground transition-colors"
              title="Chat with the AI Architect about systems, architectures, and case studies"
            >
              <Bot className="h-3.5 w-3.5" />
              <span>Ask AI</span>
            </Link>

            <ThemeToggle />

            {/* Mobile Menu Toggle */}
            <button
              ref={menuButton}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-3 border border-border bg-accent/50 text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-navigation"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              id="mobile-navigation"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="lg:hidden absolute top-16 left-0 w-full max-h-[calc(100dvh-4rem)] overflow-y-auto border-b border-border bg-background/95 backdrop-blur-xl z-50 shadow-2xl"
            >
              <nav aria-label="Mobile navigation" className="flex flex-col p-6 gap-2">
                {navLinks.map((link) => {
                  const isActive =
                    pathname === link.href ||
                    (link.href !== "/" && pathname.startsWith(link.href));
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsMenuOpen(false)}
                      aria-current={isActive ? "page" : undefined}
                      className={`flex items-center gap-4 text-xs font-mono tracking-[0.2em] uppercase py-4 border-b border-border/30 transition-all group ${
                        isActive ? "text-primary font-bold" : "hover:text-primary"
                      }`}
                    >
                      <link.icon className="h-4 w-4 text-primary opacity-60 group-hover:opacity-100 transition-opacity" />
                      {link.label}
                    </Link>
                  );
                })}
                <Link
                  href="/chat"
                  onClick={() => setIsMenuOpen(false)}
                  className="mt-6 inline-flex items-center justify-center gap-2.5 border border-primary bg-primary/10 p-4 text-xs font-mono tracking-[0.2em] uppercase text-primary hover:bg-primary hover:text-primary-foreground transition-all font-bold"
                >
                  <Bot className="h-4 w-4" /> Ask AI Architect
                </Link>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content Area */}
      <main id="main-content" tabIndex={-1} className="flex-1 w-full min-w-0 container max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-16 mt-16 relative z-10">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-accent/20 py-16 relative z-10 backdrop-blur-xs">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-end">
            <div className="flex flex-col gap-5">
              <div className="text-2xl font-black tracking-tighter uppercase italic">
                The<span className="text-primary">_LDO</span>
              </div>
              <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground leading-relaxed max-w-sm">
                Francis Igbiriki — building useful systems, sharing what I learn,
                and making my terminal feel like home.
              </p>
              <a
                href="mailto:francis.igbiriki@gmail.com"
                className="text-[10px] font-mono uppercase tracking-widest text-primary hover:underline w-fit"
              >
                francis.igbiriki@gmail.com
              </a>
            </div>
            <div className="flex flex-col items-start md:items-end gap-6">
              <div className="flex flex-wrap items-center gap-6 sm:gap-8 text-[10px] font-mono tracking-widest uppercase text-muted-foreground">
                <Link
                  href="/stack"
                  className="hover:text-primary transition-colors underline decoration-border underline-offset-4"
                >
                  TECH STACK
                </Link>
                <Link
                  href="https://github.com/igmrrf"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-primary transition-colors underline decoration-border underline-offset-4"
                >
                  GITHUB
                </Link>
                <Link
                  href="https://linkedin.com/in/igmrrf"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-primary transition-colors underline decoration-border underline-offset-4"
                >
                  LINKEDIN
                </Link>
                <Link
                  href="https://x.com/igmrrf"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-primary transition-colors underline decoration-border underline-offset-4"
                >
                  X (TWITTER)
                </Link>
              </div>
              <p className="text-xs font-mono text-muted-foreground">
                &copy; {new Date().getFullYear()} igmrrf // SYSTEM_STABLE
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
