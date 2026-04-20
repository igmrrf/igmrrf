import { NextResponse } from 'next/server';
import { prepareChunksFromCaseStudies } from '@/lib/ai/ingestion';
import { getAIProvider } from '@/lib/ai/factory';

// Mock vector search for the prototype
async function findRelevantContext(query: string) {
  const chunks = await prepareChunksFromCaseStudies();
  // Simple keyword matching for the mock-up
  const relevant = chunks.filter(chunk => 
    chunk.text.toLowerCase().includes(query.toLowerCase()) ||
    chunk.metadata.title.toLowerCase().includes(query.toLowerCase())
  );
  
  return relevant.length > 0 ? relevant.map(c => c.text).join('\n\n---\n\n') : chunks.map(c => c.text).slice(0, 2).join('\n\n---\n\n');
}

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const lastMessage = messages[messages.length - 1].content;
    
    // 1. Retrieve Context
    const context = await findRelevantContext(lastMessage);

    // 2. Generate Prompt for LLM
    const systemPrompt = `You are an AI Architect representing 'igmrrf' (Francis Igbiriki). 
    Your goal is to explain his technical decisions, engineering trade-offs, and project architectures 
    based on the context provided. Be professional, direct, and technical.
    
    Context:
    ${context}
    
    If the answer isn't in the context, be honest about it but provide general engineering wisdom 
    aligned with igmrrf's 'Clean Architecture' philosophy.`;

    // 3. Get AI Provider and Generate Response
    const provider = getAIProvider();
    const fullMessages = [
      { role: 'system', content: systemPrompt },
      ...messages
    ];

    const responseText = await provider.generateResponse(fullMessages);

    return NextResponse.json({ 
      content: responseText,
      role: 'assistant'
    });

  } catch (error: any) {
    console.error('Chat error:', error);
    return NextResponse.json({ error: error.message || 'Failed to process chat request' }, { status: 500 });
  }
}
