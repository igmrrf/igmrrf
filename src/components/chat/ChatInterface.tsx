"use client";

import React, { useState, useRef, useEffect } from "react";
import { Send, Loader2, Terminal, ShieldAlert } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hello, I am the AI System Architect representing Francis Igbiriki (igmrrf). Ask me anything about his technical background, case studies (BugRelay, Funckage, OneRemit), Clean Architecture patterns, or system scalability trade-offs.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isGenerating]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isGenerating) return;

    const userMessage: Message = { role: "user", content: input.trim() };
    const nextMessages = [...messages, userMessage];

    // Optimistically update messages with empty assistant placeholder
    setMessages([...nextMessages, { role: "assistant", content: "" }]);
    setInput("");
    setIsGenerating(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });

      if (!response.ok || !response.body) {
        throw new Error(`HTTP error ${response.status}`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let accumulated = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const textChunk = decoder.decode(value, { stream: true });
        accumulated += textChunk;

        setMessages((prev) => {
          const next = [...prev];
          if (next.length > 0) {
            next[next.length - 1] = {
              role: "assistant",
              content: accumulated,
            };
          }
          return next;
        });
      }
    } catch (error) {
      console.error("Stream reader error:", error);
      setMessages((prev) => {
        const next = [...prev];
        if (next.length > 0 && next[next.length - 1].role === "assistant" && !next[next.length - 1].content) {
          next[next.length - 1] = {
            role: "assistant",
            content:
              "// PIPELINE_ERROR // Failed to connect to the AI stream. Please ensure your AI API key is configured in .env.local.",
          };
        }
        return next;
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex flex-col h-[75vh] max-w-4xl mx-auto border border-border bg-background/90 backdrop-blur-md shadow-2xl">
      {/* Terminal Bar Header */}
      <div className="flex items-center justify-between px-6 py-3.5 border-b border-border bg-accent/20">
        <div className="flex items-center gap-2.5">
          <Terminal className="h-4 w-4 text-primary" />
          <span className="font-mono text-xs font-black uppercase tracking-wider text-foreground">
            neural_session // rag_stream_active
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] font-mono text-muted-foreground uppercase">
            Guardrails_Active
          </span>
        </div>
      </div>

      {/* Messages Stream */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6" ref={scrollRef}>
        {messages.map((m, i) => {
          const isRestricted = m.content.includes("// ACCESS_RESTRICTED //");
          const isCurrentStreaming = isGenerating && i === messages.length - 1 && m.role === "assistant";

          return (
            <div
              key={i}
              className={cn(
                "flex gap-4 max-w-[85%]",
                m.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
              )}
            >
              <div
                className={cn(
                  "w-7 h-7 border flex items-center justify-center shrink-0 text-xs font-mono font-bold",
                  m.role === "user"
                    ? "bg-primary text-primary-foreground border-primary"
                    : isRestricted
                    ? "bg-rose-500/20 text-rose-400 border-rose-500/40"
                    : "bg-accent/40 text-primary border-border"
                )}
              >
                {m.role === "user" ? (
                  "U"
                ) : isRestricted ? (
                  <ShieldAlert className="h-3.5 w-3.5" />
                ) : (
                  "AI"
                )}
              </div>
              <div
                className={cn(
                  "p-4 border text-sm leading-relaxed",
                  m.role === "user"
                    ? "bg-primary text-primary-foreground border-primary"
                    : isRestricted
                    ? "bg-rose-950/20 border-rose-500/30 text-rose-200"
                    : "bg-background/80 border-border text-foreground/90"
                )}
              >
                <div className="text-[9px] font-mono uppercase tracking-widest opacity-60 mb-1.5 flex items-center justify-between">
                  <span>{m.role === "user" ? "Client_Prompt" : "System_Response"}</span>
                  {isCurrentStreaming && (
                    <span className="text-primary font-bold animate-pulse text-[8px]">
                      ● STREAMING
                    </span>
                  )}
                </div>
                <div className="whitespace-pre-wrap font-sans text-sm leading-relaxed">
                  {m.content}
                  {isCurrentStreaming && (
                    <span className="inline-block w-2 h-4 ml-1 bg-primary align-middle animate-pulse" />
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Input Prompt Form */}
      <form
        onSubmit={handleSubmit}
        className="p-4 border-t border-border bg-accent/10 flex gap-3 items-center"
      >
        <div className="flex-1 flex items-center border border-border bg-background focus-within:border-primary px-3 py-1 transition-colors">
          <span className="text-primary font-mono text-xs font-bold mr-2 select-none">
            $&gt;
          </span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isGenerating}
            placeholder="Ask about Clean Architecture, system trade-offs, or case studies..."
            className="w-full py-2 bg-transparent text-xs font-mono text-foreground focus:outline-none placeholder:text-muted-foreground/60 disabled:opacity-50"
          />
        </div>
        <button
          type="submit"
          disabled={isGenerating || !input.trim()}
          className="bg-primary text-primary-foreground px-5 py-2.5 font-mono text-[10px] uppercase tracking-widest font-black transition-all hover:bg-primary/90 disabled:opacity-40 active:scale-95 flex items-center gap-2 shrink-0"
        >
          {isGenerating ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : (
            <Send className="h-3.5 w-3.5" />
          )}
          <span className="hidden sm:inline">Send</span>
        </button>
      </form>
    </div>
  );
};
