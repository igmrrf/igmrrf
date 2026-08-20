import { NextResponse } from "next/server";
import { prepareChunksFromCaseStudies, prepareChunksFromBlog } from "@/lib/ai/ingestion";
import { getAIProvider } from "@/lib/ai/factory";

async function findRelevantContext(query: string): Promise<string> {
  try {
    const [caseStudies, blogPosts] = await Promise.all([
      prepareChunksFromCaseStudies(),
      prepareChunksFromBlog(),
    ]);

    const allChunks = [...caseStudies, ...blogPosts];
    const q = query.toLowerCase();

    // Find chunks that match keywords in title or body
    const matching = allChunks.filter(
      (chunk) =>
        chunk.text.toLowerCase().includes(q) ||
        chunk.metadata.title.toLowerCase().includes(q)
    );

    if (matching.length > 0) {
      return matching.map((c) => c.text).slice(0, 4).join("\n\n---\n\n");
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
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Invalid messages payload" },
        { status: 400 }
      );
    }

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
- Engineering Maxim: Anchor trade-off discussions in Clean Architecture principles and business value ("Value Begets Peace").`;

    const fullMessages = [
      { role: "system" as const, content: systemPrompt },
      ...messages,
    ];

    const provider = getAIProvider();

    // 3. Generate Streamed Response
    const stream = await provider.generateStream(fullMessages);

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Transfer-Encoding": "chunked",
        "Cache-Control": "no-cache, no-transform",
      },
    });
  } catch (error: unknown) {
    console.error("Chat API error:", error);
    const message =
      error instanceof Error ? error.message : "Failed to process chat stream";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
