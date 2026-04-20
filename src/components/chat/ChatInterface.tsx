'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Hello, I'm the AI Architect for igmrrf. Ask me anything about his architectural decisions, technical trade-offs, or specific case studies like BugRelay." }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });

      if (!response.ok) throw new Error('Failed to fetch response');

      const data = await response.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.content }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'assistant', content: "Sorry, I'm having trouble connecting to the RAG pipeline right now." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[70vh] max-w-4xl mx-auto border border-border rounded-3xl bg-background overflow-hidden shadow-2xl">
      <div className="flex-1 overflow-y-auto p-6 space-y-6" ref={scrollRef}>
        {messages.map((m, i) => (
          <div key={i} className={cn("flex gap-4 max-w-[80%]", m.role === 'user' ? "ml-auto flex-row-reverse" : "mr-auto")}>
            <div className={cn("w-8 h-8 rounded-full flex items-center justify-center shrink-0", m.role === 'user' ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground")}>
              {m.role === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
            </div>
            <div className={cn("p-4 rounded-2xl text-sm leading-relaxed shadow-sm", m.role === 'user' ? "bg-primary text-primary-foreground" : "bg-muted")}>
              {m.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex gap-4 mr-auto max-w-[80%]">
            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center shrink-0">
              <Bot className="h-4 w-4" />
            </div>
            <div className="p-4 rounded-2xl bg-muted shadow-sm flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" /> Thinking...
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="p-6 border-t border-border bg-muted/30 flex gap-4 items-center">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about architectural decisions..."
          className="flex-1 bg-background border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="bg-primary text-primary-foreground p-3 rounded-xl transition-all hover:bg-primary/90 disabled:opacity-50 active:scale-95"
        >
          <Send className="h-5 w-5" />
        </button>
      </form>
    </div>
  );
};
