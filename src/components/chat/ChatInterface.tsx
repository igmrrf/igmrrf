"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import {
  Send,
  Loader2,
  Terminal,
  ShieldAlert,
  Maximize2,
  Minimize2,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMounted } from "@/hooks/useIsMounted";
import { useWallpaper } from "@/components/theme/WallpaperProvider";
import { ChatMessageMarkdown } from "./ChatMessageMarkdown";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const INITIAL_MESSAGES: Message[] = [
  {
    role: "assistant",
    content:
      "Hello, I am the AI System Architect representing Francis Igbiriki (igmrrf). Ask me anything about his technical background, case studies (BugRelay, Funckage, OneRemit), Clean Architecture patterns, or system scalability trade-offs.",
  },
];

const SUGGESTED_PROMPTS = [
  "Explain the BugRelay Clean Architecture pattern",
  "How does Funckage optimize package management?",
  "What architectural solutions were built at NPC Labs for Web3?",
  "Tell me about your experience scaling FinTech at OneRemit & VeendHQ",
];

export const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const { currentWallpaper, opacity } = useWallpaper();
  const isMounted = useIsMounted();
  const containerRef = useRef<HTMLDivElement>(null);
  const savedScrollY = useRef<number>(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isGenerating, scrollToBottom]);

  const exitFullscreen = useCallback(() => {
    setIsFullscreen(false);
    setTimeout(() => {
      if (containerRef.current) {
        containerRef.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      } else {
        window.scrollTo({ top: savedScrollY.current, behavior: "smooth" });
      }
      inputRef.current?.focus({ preventScroll: true });
    }, 50);
  }, []);

  const enterFullscreen = useCallback(() => {
    savedScrollY.current = window.scrollY;
    setIsFullscreen(true);
    setTimeout(() => {
      inputRef.current?.focus({ preventScroll: true });
      scrollToBottom();
    }, 60);
  }, [scrollToBottom]);

  const toggleFullscreen = useCallback(() => {
    if (isFullscreen) {
      exitFullscreen();
    } else {
      enterFullscreen();
    }
  }, [isFullscreen, exitFullscreen, enterFullscreen]);

  // Handle Fullscreen Esc key and body scroll lock
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isFullscreen) {
        exitFullscreen();
      }
    };

    if (isFullscreen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isFullscreen, exitFullscreen]);

  const handleReset = () => {
    if (isGenerating) return;
    setMessages(INITIAL_MESSAGES);
    setInput("");
    inputRef.current?.focus({ preventScroll: true });
  };

  const handleSendPrompt = (promptText: string) => {
    if (isGenerating || !promptText.trim()) return;
    setInput(promptText);
    executeChat(promptText.trim());
  };

  const executeChat = useCallback(
    async (userText: string) => {
      if (!userText || isGenerating) return;

      const userMessage: Message = { role: "user", content: userText };
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
          if (
            next.length > 0 &&
            next[next.length - 1].role === "assistant" &&
            !next[next.length - 1].content
          ) {
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
        setTimeout(() => inputRef.current?.focus({ preventScroll: true }), 50);
      }
    },
    [messages, isGenerating]
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isGenerating) return;
    await executeChat(input.trim());
  };

  const chatMarkup = (
    <div
      ref={isFullscreen ? undefined : containerRef}
      className={cn(
        "flex flex-col transition-all duration-200",
        isFullscreen
          ? currentWallpaper
            ? "fixed inset-0 z-[9999] h-[100dvh] w-screen bg-transparent text-foreground overflow-hidden select-text"
            : "fixed inset-0 z-[9999] h-[100dvh] w-screen bg-background text-foreground overflow-hidden select-text"
          : "relative h-[78vh] max-w-4xl mx-auto border border-border bg-background/90 backdrop-blur-md shadow-2xl"
      )}
    >
      {/* Dynamic Wallpaper Background in Fullscreen */}
      {isFullscreen && currentWallpaper && (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
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

      {/* Terminal Bar Header */}
      <div
        className={cn(
          "flex items-center justify-between px-4 sm:px-6 py-3 border-b border-border shrink-0 select-none z-10",
          isFullscreen ? "bg-background/80 backdrop-blur-md" : "bg-accent/40"
        )}
      >
        <div className="flex items-center gap-3">
          <Terminal className="h-4 w-4 text-primary" />
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-black uppercase tracking-wider text-foreground">
              neural_session // rag_stream
            </span>
            {isFullscreen && (
              <span className="hidden sm:inline-flex items-center px-1.5 py-0.5 bg-primary/10 border border-primary/30 text-primary font-mono text-[9px] uppercase tracking-widest font-bold">
                FULLSCREEN_MODE
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          <div className="hidden sm:flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-mono text-muted-foreground uppercase">
              Guardrails_Active
            </span>
          </div>

          <div className="flex items-center gap-2 border-l border-border/80 pl-3">
            <button
              type="button"
              onClick={handleReset}
              disabled={isGenerating || messages.length <= 1}
              className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-accent/60 transition-colors disabled:opacity-30 disabled:pointer-events-none"
              title="Reset conversation"
              aria-label="Reset conversation"
            >
              <RotateCcw className="h-3.5 w-3.5" />
            </button>

            <button
              type="button"
              onClick={toggleFullscreen}
              className={cn(
                "flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono font-bold uppercase tracking-wider border transition-colors",
                isFullscreen
                  ? "border-primary bg-primary text-primary-foreground hover:bg-primary/90"
                  : "border-border/80 text-muted-foreground hover:text-foreground hover:bg-accent/60"
              )}
              title={isFullscreen ? "Exit Fullscreen (Esc)" : "Enter Fullscreen"}
              aria-label={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
            >
              {isFullscreen ? (
                <>
                  <Minimize2 className="h-3.5 w-3.5" />
                  <span className="text-[10px] font-mono">Exit (ESC)</span>
                </>
              ) : (
                <>
                  <Maximize2 className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline text-[10px] font-mono">Fullscreen</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Messages Stream */}
      <div
        className={cn(
          "flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 z-10 relative",
          isFullscreen && "max-w-4xl mx-auto w-full px-4 sm:px-8 py-8"
        )}
        ref={scrollRef}
      >
        {messages.map((m, i) => {
          const isRestricted = m.content.includes("// ACCESS_RESTRICTED //");
          const isCurrentStreaming =
            isGenerating && i === messages.length - 1 && m.role === "assistant";

          return (
            <div
              key={i}
              className={cn(
                "flex gap-3 sm:gap-4",
                m.role === "user"
                  ? "ml-auto flex-row-reverse max-w-[85%]"
                  : "mr-auto max-w-[94%] sm:max-w-[90%]"
              )}
            >
              <div
                className={cn(
                  "w-7 h-7 border flex items-center justify-center shrink-0 text-xs font-mono font-bold select-none",
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
                  "p-4 border text-sm leading-relaxed overflow-hidden",
                  m.role === "user"
                    ? "bg-primary text-primary-foreground border-primary font-mono text-xs"
                    : isRestricted
                    ? "bg-rose-950/20 border-rose-500/30 text-rose-200"
                    : "bg-background/80 border-border text-foreground/90"
                )}
              >
                <div className="text-[9px] font-mono uppercase tracking-widest opacity-60 mb-2 flex items-center justify-between select-none">
                  <span>{m.role === "user" ? "Client_Prompt" : "System_Response"}</span>
                  {isCurrentStreaming && (
                    <span className="text-primary font-bold animate-pulse text-[8px] flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping" />
                      STREAMING
                    </span>
                  )}
                </div>

                {m.role === "user" ? (
                  <div className="whitespace-pre-wrap font-mono text-xs">{m.content}</div>
                ) : (
                  <ChatMessageMarkdown
                    content={m.content}
                    isStreaming={isCurrentStreaming}
                  />
                )}
              </div>
            </div>
          );
        })}

        {/* Suggested Prompts when conversation is fresh */}
        {messages.length === 1 && !isGenerating && (
          <div className="pt-4 border-t border-border/40">
            <div className="flex items-center gap-2 mb-3 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
              <Sparkles className="h-3 w-3 text-primary" />
              <span>Suggested Inquiries</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {SUGGESTED_PROMPTS.map((prompt, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSendPrompt(prompt)}
                  className="text-left p-2.5 text-xs font-mono border border-border/60 bg-accent/20 hover:bg-accent hover:border-primary text-foreground/80 hover:text-foreground transition-all duration-150 flex items-start gap-2"
                >
                  <span className="text-primary font-bold select-none">&gt;</span>
                  <span>{prompt}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Input Prompt Form */}
      <div
        className={cn(
          "border-t border-border shrink-0 z-10 relative",
          isFullscreen ? "bg-background/85 backdrop-blur-md p-4 sm:py-5 border-t border-border/80 shadow-2xl" : "bg-accent/15"
        )}
      >
        <form
          onSubmit={handleSubmit}
          className={cn(
            "p-3 sm:p-4 flex gap-2 sm:gap-3 items-center",
            isFullscreen && "max-w-4xl mx-auto w-full p-0"
          )}
        >
          <div className="flex-1 flex items-center border border-border bg-background focus-within:border-primary px-3 py-1 transition-colors">
            <span className="text-primary font-mono text-xs font-bold mr-2 select-none">
              $&gt;
            </span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isGenerating}
              placeholder="Ask about Clean Architecture, system design, or case studies..."
              className="w-full py-2 bg-transparent text-xs font-mono text-foreground focus:outline-none placeholder:text-muted-foreground/60 disabled:opacity-50"
            />
          </div>
          <button
            type="submit"
            disabled={isGenerating || !input.trim()}
            className="bg-primary text-primary-foreground px-4 sm:px-6 py-2.5 font-mono text-[10px] uppercase tracking-widest font-black transition-all hover:bg-primary/90 disabled:opacity-40 active:scale-95 flex items-center gap-2 shrink-0"
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
    </div>
  );

  if (isFullscreen && isMounted) {
    return (
      <>
        {/* Invisible spacer in normal document flow while fullscreen is active */}
        <div
          ref={containerRef}
          aria-hidden="true"
          className="h-[78vh] max-w-4xl mx-auto border border-transparent pointer-events-none opacity-0"
        />
        {createPortal(chatMarkup, document.body)}
      </>
    );
  }

  return chatMarkup;
};
