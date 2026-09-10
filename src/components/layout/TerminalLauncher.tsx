"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { Terminal, X } from "lucide-react";
import { destinations, resolveCommand, shellCommands } from "@/lib/terminal";
import { useIsMounted } from "@/hooks/useIsMounted";

export function TerminalLauncher() {
  const dialog = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  const outputRef = useRef<HTMLDivElement>(null);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const draft = useRef("");
  const [output, setOutput] = useState([{ command: "", text: "Type help, or pick a destination below. This is a fish-inspired website shell." }]);
  const router = useRouter();
  const pathname = usePathname();
  const mounted = useIsMounted();
  const suggestion = input ? [...history].reverse().concat(shellCommands).find((c) => c.startsWith(input) && c !== input) : undefined;

  useEffect(() => {
    const open = () => {
      if (!dialog.current?.open) { returnFocus.current = document.activeElement instanceof HTMLElement ? document.activeElement : null; dialog.current?.showModal(); }
      inputRef.current?.focus();
    };
    const shortcut = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        if (dialog.current?.open) dialog.current.close();
        else open();
      }
    };
    window.addEventListener("keydown", shortcut);
    window.addEventListener("open-terminal", open);
    return () => {
      window.removeEventListener("keydown", shortcut);
      window.removeEventListener("open-terminal", open);
    };
  }, []);

  useEffect(() => {
    outputRef.current?.scrollTo({ top: outputRef.current.scrollHeight });
  }, [output]);

  function execute() {
    if (!input.trim()) return;
    const result = input.trim() === "pwd" ? { output: `~${pathname === "/" ? "" : pathname}` } : resolveCommand(input);
    setHistory((previous) => [...previous, input.trim()].slice(-50));
    setHistoryIndex(-1);
    setInput("");
    if (result.action === "clear") setOutput([]);
    else if (result.action === "exit" || result.href) {
      dialog.current?.close();
      if (result.href) router.push(result.href);
    } else setOutput((previous) => [...previous, { command: input, text: result.output || "" }].slice(-30));
  }

  return (
    <>
      <button ref={trigger} type="button" onClick={() => window.dispatchEvent(new Event("open-terminal"))} className="flex min-h-11 items-center gap-2 border border-border px-3 font-mono text-xs hover:bg-accent" aria-label="Open terminal" aria-haspopup="dialog" aria-keyshortcuts="Meta+k Control+k">
        <Terminal size={16} /><span className="hidden xl:inline">Terminal</span><kbd className="hidden lg:inline text-muted-foreground">⌘/Ctrl K</kbd>
      </button>
      <dialog ref={dialog} className="terminal-dialog" aria-labelledby="terminal-title" onClose={() => (returnFocus.current?.isConnected ? returnFocus.current : trigger.current)?.focus({ preventScroll: true })} onClick={(event) => { if (event.target === event.currentTarget) dialog.current?.close(); }}>
        <div className="border border-border bg-background shadow-2xl">
          <div className="flex items-center justify-between border-b border-border px-5 py-3">
            <h2 id="terminal-title" className="font-mono text-sm font-medium">visitor@igmrrf <span className="text-muted-foreground">— fish-inspired shell</span></h2>
            <button type="button" onClick={() => dialog.current?.close()} className="p-3 hover:bg-accent" aria-label="Close terminal"><X size={18} /></button>
          </div>
          <div ref={outputRef} role="log" aria-label="Terminal output" aria-live="polite" className="max-h-52 overflow-y-auto p-5 font-mono text-sm space-y-4">
            {output.map((line, index) => <div key={index}>{line.command && <p className="text-primary mb-1">❯ {line.command}</p>}<p className="text-muted-foreground whitespace-pre-wrap break-words">{line.text}</p></div>)}
          </div>
          <form onSubmit={(event) => { event.preventDefault(); execute(); }} className="border-y border-border p-5">
            <label htmlFor="shell-input" className="block font-mono text-xs mb-3 text-muted-foreground"><span className="text-primary">visitor</span>@igmrrf <span className="text-primary">~{mounted && pathname !== "/" ? pathname : ""}</span></label>
            <div className="flex items-center gap-3 font-mono text-base">
              <span aria-hidden="true" className="text-primary">❯</span>
              <input id="shell-input" ref={inputRef} value={input} maxLength={200} autoComplete="off" autoCapitalize="none" spellCheck={false} aria-label="Terminal command" aria-describedby="shell-hint" placeholder="Try cd projects" className="min-w-0 flex-1 bg-transparent outline-none" onChange={(event) => { setInput(event.target.value); setHistoryIndex(-1); }} onKeyDown={(event) => {
                if ((event.key === "Tab" && !event.shiftKey || event.key === "ArrowRight" && event.currentTarget.selectionStart === input.length) && suggestion) {
                  event.preventDefault(); setInput(suggestion);
                } else if (event.key === "ArrowUp" && history.length) {
                  event.preventDefault(); if (historyIndex === -1) draft.current = input;
                  const index = Math.min(historyIndex + 1, history.length - 1); setHistoryIndex(index); setInput(history[history.length - 1 - index]);
                } else if (event.key === "ArrowDown" && historyIndex >= 0) {
                  event.preventDefault(); const index = historyIndex - 1; setHistoryIndex(index); setInput(index < 0 ? draft.current : history[history.length - 1 - index]);
                } else if (event.ctrlKey && event.key === "l") {
                  event.preventDefault(); setOutput([]);
                }
              }} />
              <button className="border border-border px-3 py-2 text-xs hover:bg-accent" type="submit">Run ↵</button>
            </div>
            <p id="shell-hint" className="mt-3 min-h-5 text-xs font-mono text-muted-foreground">{suggestion ? <button type="button" onClick={() => { setInput(suggestion); inputRef.current?.focus(); }}>↳ {suggestion} <span className="opacity-70">[Tab to complete]</span></button> : "↑↓ history · Tab complete · Esc close"}</p>
          </form>
          <nav aria-label="Terminal destinations" className="grid grid-cols-2 sm:grid-cols-3 gap-1 p-3">
            {destinations.map((destination) => <Link key={destination.command} href={destination.href} onClick={() => dialog.current?.close()} className="p-3 hover:bg-accent"><span className="block text-sm">{destination.label}</span><span className="block text-xs text-muted-foreground font-mono">cd {destination.command}</span></Link>)}
          </nav>
        </div>
      </dialog>
    </>
  );
}
