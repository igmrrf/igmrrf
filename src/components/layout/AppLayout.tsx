"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Menu,
  X,
  BookText,
  PenTool,
  Briefcase,
  User,
  MessageSquare,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

interface AppLayoutProps {
  children: React.ReactNode;
}

const navLinks = [
  { href: "/case-studies", label: "Case Studies", icon: BookText },
  { href: "/blog", label: "Blog", icon: PenTool },
  { href: "/projects", label: "Projects", icon: Briefcase },
  { href: "/about", label: "About", icon: User },
];

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground relative overflow-hidden">
      {/* Structural Accent */}
      <div className="fixed top-0 left-0 w-1 h-full bg-border/20 z-0" />

      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-6 flex h-16 items-center justify-between">
          <div className="flex items-center gap-12">
            <Link href="/" className="flex items-center space-x-2 group">
              <span className="text-xl font-black tracking-tighter uppercase italic group-hover:text-primary transition-colors">
                igmrrf
                <span className="text-primary group-hover:text-foreground">
                  .dev
                </span>
              </span>
            </Link>
            <nav className="hidden md:flex items-center space-x-8 text-xs font-mono tracking-widest uppercase">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="transition-all hover:text-primary hover:tracking-[0.2em]"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/chat"
              className="hidden sm:inline-flex items-center justify-center border border-primary px-5 py-2 text-[10px] font-mono tracking-widest uppercase text-primary hover:bg-primary hover:text-primary-foreground transition-all active:scale-95"
            >
              System.init()
            </Link>

            <ThemeToggle />

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 border border-border bg-accent/50 text-primary hover:bg-primary hover:text-primary-foreground transition-all active:scale-90"
              aria-label="Toggle Menu"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Overlay - Absolute */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="md:hidden absolute top-16 left-0 w-full border-b border-border bg-background/95 backdrop-blur-xl z-[100] shadow-2xl"
            >
              <nav className="flex flex-col p-8 gap-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-4 text-xs font-mono tracking-[0.2em] uppercase py-4 border-b border-border/30 hover:text-primary transition-all group"
                  >
                    <link.icon className="h-4 w-4 text-primary opacity-50 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </Link>
                ))}
                <Link
                  href="/chat"
                  onClick={() => setIsMenuOpen(false)}
                  className="mt-6 inline-flex items-center justify-center gap-3 border border-primary p-5 text-[10px] font-mono tracking-[0.3em] uppercase text-primary hover:bg-primary hover:text-primary-foreground transition-all"
                >
                  <MessageSquare className="h-4 w-4" /> System.init()
                </Link>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="flex-1 container mx-auto px-6 py-12 md:py-20 relative z-10">
        {children}
      </main>

      <footer className="border-t border-border bg-accent/30 py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-end">
            <div className="flex flex-col gap-6">
              <div className="text-2xl font-black tracking-tighter uppercase italic">
                igmrrf<span className="text-primary">_arch</span>
              </div>
              <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground leading-relaxed max-w-sm">
                Architecting resilient systems through high-craft engineering
                and clean technical decoupling.
              </p>
            </div>
            <div className="flex flex-col items-end gap-6">
              <div className="flex items-center space-x-8 text-[10px] font-mono tracking-widest uppercase text-muted-foreground">
                <Link
                  href="https://github.com/igmrrf"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-primary transition-colors underline decoration-border underline-offset-4"
                >
                  GHUB
                </Link>
                <Link
                  href="https://linkedin.com/in/igmrrf"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-primary transition-colors underline decoration-border underline-offset-4"
                >
                  LINK
                </Link>
                <Link
                  href="https://x.com/igmrrf"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-primary transition-colors underline decoration-border underline-offset-4"
                >
                  TWT
                </Link>
              </div>
              <p className="text-[10px] font-mono uppercase tracking-tighter text-muted-foreground/50">
                &copy; {new Date().getFullYear()} igmrrf.v4 // STABLE_BUILD
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
