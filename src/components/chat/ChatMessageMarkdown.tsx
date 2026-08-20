"use client";

import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Check, Copy, Terminal } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatMessageMarkdownProps {
  content: string;
  isStreaming?: boolean;
}

function ChatCodeBlock({ language, code }: { language: string; code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!code) return;
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy code to clipboard", err);
    }
  };

  return (
    <div className="relative my-3 border border-border bg-zinc-950 text-zinc-100 rounded-none overflow-hidden shadow-sm">
      {/* Code Header */}
      <div className="flex items-center justify-between px-3 py-1.5 bg-zinc-900 border-b border-zinc-800 text-[11px] font-mono select-none">
        <div className="flex items-center gap-1.5 text-zinc-400">
          <Terminal className="h-3 w-3 text-primary" />
          <span className="uppercase tracking-wider text-[10px] font-bold text-zinc-300">
            {language || "code"}
          </span>
        </div>

        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-1 px-2 py-0.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors text-[10px] font-mono uppercase tracking-wider"
          title="Copy code"
          aria-label="Copy code"
        >
          {copied ? (
            <>
              <Check className="h-3 w-3 text-emerald-400" />
              <span className="text-emerald-400 text-[10px]">Copied</span>
            </>
          ) : (
            <>
              <Copy className="h-3 w-3" />
              <span className="text-[10px]">Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code Content */}
      <div className="p-3.5 overflow-x-auto text-xs font-mono leading-relaxed text-zinc-200">
        <pre className="m-0 p-0 bg-transparent border-0 font-mono text-xs">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
}

export const ChatMessageMarkdown: React.FC<ChatMessageMarkdownProps> = ({
  content,
  isStreaming,
}) => {
  return (
    <div className="chat-markdown text-sm leading-relaxed overflow-hidden break-words space-y-2">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1({ children }) {
            return (
              <h1 className="text-base sm:text-lg font-black font-mono tracking-tight uppercase border-b border-border/40 pb-1 mt-4 mb-2">
                {children}
              </h1>
            );
          },
          h2({ children }) {
            return (
              <h2 className="text-sm sm:text-base font-bold font-mono tracking-tight uppercase mt-3 mb-1.5 text-foreground">
                {children}
              </h2>
            );
          },
          h3({ children }) {
            return (
              <h3 className="text-xs sm:text-sm font-bold font-mono tracking-wide uppercase mt-2.5 mb-1 text-foreground/90">
                {children}
              </h3>
            );
          },
          h4({ children }) {
            return (
              <h4 className="text-xs font-semibold font-mono tracking-wider uppercase mt-2 mb-1 text-muted-foreground">
                {children}
              </h4>
            );
          },
          p({ children }) {
            return <p className="mb-2 last:mb-0 leading-relaxed font-sans">{children}</p>;
          },
          ul({ children }) {
            return <ul className="list-disc list-outside ml-4 space-y-1 mb-2 font-sans">{children}</ul>;
          },
          ol({ children }) {
            return <ol className="list-decimal list-outside ml-4 space-y-1 mb-2 font-sans">{children}</ol>;
          },
          li({ children }) {
            return <li className="leading-relaxed pl-0.5">{children}</li>;
          },
          blockquote({ children }) {
            return (
              <blockquote className="border-l-2 border-primary/70 pl-3 my-2.5 py-1 bg-accent/20 italic text-muted-foreground text-xs font-mono">
                {children}
              </blockquote>
            );
          },
          hr() {
            return <hr className="border-border my-3" />;
          },
          a({ href, children }) {
            return (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline underline-offset-4 hover:opacity-80 font-medium transition-opacity"
              >
                {children}
              </a>
            );
          },
          table({ children }) {
            return (
              <div className="overflow-x-auto my-3 border border-border">
                <table className="w-full text-xs text-left border-collapse font-mono">
                  {children}
                </table>
              </div>
            );
          },
          thead({ children }) {
            return <thead className="bg-accent/40 border-b border-border">{children}</thead>;
          },
          th({ children }) {
            return <th className="px-3 py-2 font-bold uppercase tracking-wider text-[10px] text-foreground">{children}</th>;
          },
          td({ children }) {
            return <td className="px-3 py-2 border-b border-border/50 text-foreground/90">{children}</td>;
          },
          code({ className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            const rawContent = String(children);
            const isMultiline = rawContent.includes("\n");

            if (!match && !isMultiline) {
              return (
                <code
                  className={cn(
                    "px-1.5 py-0.5 bg-accent/60 text-foreground border border-border/50 font-mono text-[11px] font-semibold"
                  )}
                  {...props}
                >
                  {children}
                </code>
              );
            }

            return (
              <ChatCodeBlock
                language={match ? match[1] : "text"}
                code={rawContent.replace(/\n$/, "")}
              />
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>

      {isStreaming && (
        <span className="inline-block w-2 h-4 ml-1 bg-primary align-middle animate-pulse" />
      )}
    </div>
  );
};
