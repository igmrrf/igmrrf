"use client";

import React, { useState } from "react";
import { Check, Copy, Terminal } from "lucide-react";

interface PreProps extends React.HTMLAttributes<HTMLPreElement> {
  children?: React.ReactNode;
}

export function CodeBlock({ children, ...props }: PreProps) {
  const [copied, setCopied] = useState(false);

  // Extract raw text from children for copying
  const getTextContent = (node: React.ReactNode): string => {
    if (!node) return "";
    if (typeof node === "string" || typeof node === "number") return String(node);
    if (Array.isArray(node)) return node.map(getTextContent).join("");
    if (React.isValidElement<{ children?: React.ReactNode }>(node) && node.props && node.props.children) {
      return getTextContent(node.props.children);
    }
    return "";
  };

  const handleCopy = async () => {
    const text = getTextContent(children);
    if (!text) return;

    try {
      await navigator.clipboard.writeText(text.trim());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy code", err);
    }
  };

  // Try to detect language from child code element className (e.g. language-bash)
  let language = "code";
  if (
    React.isValidElement<{ className?: string }>(children) &&
    typeof children.props.className === "string"
  ) {
    const match = children.props.className.match(/language-(\w+)/);
    if (match) {
      language = match[1];
    }
  }

  return (
    <div className="relative group my-6 border border-border bg-zinc-950 text-zinc-100 dark:bg-black/80 backdrop-blur-sm overflow-hidden shadow-md">
      {/* Code Header Bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-zinc-900/90 border-b border-zinc-800 text-[11px] font-mono select-none">
        <div className="flex items-center gap-2 text-zinc-400">
          <Terminal className="h-3.5 w-3.5 text-primary" />
          <span className="uppercase tracking-widest text-[10px] font-bold text-zinc-300">
            {language}
          </span>
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2 py-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors text-[10px] font-mono uppercase tracking-wider"
          aria-label="Copy Code"
          title="Copy code to clipboard"
        >
          {copied ? (
            <>
              <Check className="h-3 w-3 text-emerald-400" />
              <span className="text-emerald-400">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="h-3 w-3" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code Body */}
      <div className="p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed text-zinc-200">
        <pre {...props} className="bg-transparent! p-0! m-0! border-none! text-zinc-200!">
          {children}
        </pre>
      </div>
    </div>
  );
}
