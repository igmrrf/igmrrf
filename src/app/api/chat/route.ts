import { NextResponse } from "next/server";
import { prepareChunksFromCaseStudies, prepareChunksFromBlog } from "@/lib/ai/ingestion";
import { getAIProvider } from "@/lib/ai/factory";
import { allowChatRequest, ChatRequestError, readChatRequest } from "@/lib/ai/chat-request";

export const maxDuration = 60;

async function findRelevantContext(query: string): Promise<string> {
  try {
    const [caseStudies, blogPosts] = await Promise.all([
      prepareChunksFromCaseStudies(),
      prepareChunksFromBlog(),
    ]);

    const allChunks = [...caseStudies, ...blogPosts];
    const terms = [...new Set(query.toLowerCase().match(/[a-z0-9][a-z0-9.-]{2,}/g) || [])];

    // Find chunks that match keywords in title or body
    const matching = allChunks.map((chunk) => ({ chunk, score: terms.reduce((score, term) => score + (chunk.metadata.title.toLowerCase().includes(term) ? 4 : 0) + (chunk.text.toLowerCase().includes(term) ? 1 : 0), 0) }))
      .filter(({ score }) => score > 0).sort((a, b) => b.score - a.score).map(({ chunk }) => chunk);

    if (matching.length > 0) {
      return matching.slice(0, 4).map((c) => c.text).join("\n\n---\n\n").slice(0, 12000);
    }

    // Default to summary overview of top case studies
    return caseStudies
      .slice(0, 3)
      .map((c) => c.text)
      .join("\n\n---\n\n");
  } catch (err) {
    console.warn("Error loading knowledge chunks:", err);
    return "Knowledge context: Francis Igbiriki (igmrrf) is a Senior Software Architect specializing in Clean Architecture, Web3, and high-scale fintech systems.";
  }
}

export async function POST(req: Request) {
  try {
    const origin = req.headers.get("origin");
    if (origin && origin !== new URL(req.url).origin) return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
    const { messages } = await readChatRequest(req);
    // Use a proxy-overwritten header only when explicitly configured by the operator.
    const ipHeader = process.env.CHAT_TRUSTED_IP_HEADER;
    const clientKey = ipHeader ? req.headers.get(ipHeader)?.split(",")[0].trim() || "shared" : "shared";
    if (!allowChatRequest(clientKey)) return NextResponse.json({ error: "Too many requests. Please try again in a minute." }, { status: 429, headers: { "Retry-After": "60" } });

    const lastMessage = messages[messages.length - 1]?.content || "";

    // 1. Retrieve Knowledge Context
    const context = await findRelevantContext(lastMessage);

    // 2. Build Strict Guardrailed System Prompt
    const systemPrompt = `You are the AI System Architect representing Francis Igbiriki (also known as 'igmrrf' or 'The LDO').
Francis is a Senior Software Architect and Founder with 7+ years of experience specializing in high-performance distributed systems, Clean Architecture, high-scale fintech (OneRemit, VeendHQ), Web3/L2 infrastructure (NPC Labs), and keyboard-driven terminal workflows (Neovim/Lua/Tmux).

=== STRICT SCOPE & BOUNDARY DIRECTIVE ===
You are SOLELY authorized to assist with:
1. Francis Igbiriki (igmrrf): Background, career, experience, case studies (BugRelay, Funckage, OneRemit, Lingawa, NPC Labs, vi-mongo.nvim), engineering philosophy ("Value Begets Peace"), tech stack, and terminal setup.
2. Software & System Architecture: Clean Architecture, distributed systems design, backend/frontend engineering, API design, database modeling, caching, security/RBAC/TOTP, scalability, and technical trade-offs.

=== MANDATORY REJECTION OF OFF-TOPIC QUERIES ===
If the user asks ANY question that is NOT related to Francis Igbiriki or Software/System Architecture (for example: general knowledge trivia, recipes, pop culture, politics, homework, general fiction, or unrelated domains):
You MUST IMMEDIATELY REJECT the request with this exact format:
"// ACCESS_RESTRICTED // I am the dedicated AI Architect for Francis Igbiriki (igmrrf). I only answer questions related to Francis's technical background, case studies, or software & system architecture principles. Please feel free to ask about his system designs, Clean Architecture philosophy, or engineering trade-offs."
Do NOT attempt to answer, entertain, or partially fulfill off-topic queries under any circumstances.

=== KNOWLEDGE BASE CONTEXT ===
${context}

=== RESPONSE GUIDELINES ===
- Tone: Crisp, technical, authoritative, and direct.
- Format: Monospace backticks for tools, architectural layers, and code concepts.
- Ground biographical claims in the supplied context. If a detail is missing, say so rather than inventing it. Link visitors to /about, /experience, /case-studies, or /blog when useful.
- Engineering Maxim: Anchor trade-off discussions in Clean Architecture principles and business value ("Value Begets Peace").`;

    const fullMessages = [
      { role: "system" as const, content: systemPrompt },
      ...messages,
    ];

    const provider = getAIProvider();

    // 3. Generate Streamed Response
    const signal = AbortSignal.any([req.signal, AbortSignal.timeout(55_000)]);
    const stream = await provider.generateStream(fullMessages, signal);

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-store, no-transform",
        "X-Accel-Buffering": "no",
      },
    });
  } catch (error: unknown) {
    if (error instanceof ChatRequestError) return NextResponse.json({ error: error.message }, { status: error.status });
    console.error("Chat API error:", error);
    return NextResponse.json({ error: "The AI assistant is temporarily unavailable. Please try again, or explore the projects and experience pages." }, { status: 503 });
  }
}
