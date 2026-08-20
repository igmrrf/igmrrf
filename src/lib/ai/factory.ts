import { AIProvider, Message } from "./types";
import { GeminiProvider } from "./providers/gemini";
import { OpenAIProvider } from "./providers/openai";
import { GroqProvider } from "./providers/groq";

class MockProvider implements AIProvider {
  name = "Mock (Development)";
  async generateResponse(messages: Message[]): Promise<string> {
    const lastMsg = messages[messages.length - 1]?.content || "";
    return `[AI ARCHITECT OFFLINE] To enable real-time AI responses, configure your free AI API key (Google Gemini from aistudio.google.com or Groq from console.groq.com) in .env.local.\n\nQuery received: "${lastMsg}".`;
  }

  async generateStream(messages: Message[]): Promise<ReadableStream<Uint8Array>> {
    const responseText = await this.generateResponse(messages);
    const encoder = new TextEncoder();
    const words = responseText.split(" ");

    return new ReadableStream<Uint8Array>({
      async start(controller) {
        for (let i = 0; i < words.length; i++) {
          const chunk = (i === 0 ? "" : " ") + words[i];
          controller.enqueue(encoder.encode(chunk));
          await new Promise((r) => setTimeout(r, 20));
        }
        controller.close();
      },
    });
  }
}

export function getAIProvider(): AIProvider {
  const provider = (process.env.AI_PROVIDER || "gemini").toLowerCase();
  const apiKey =
    process.env.AI_API_KEY ||
    process.env.GROQ_API_KEY ||
    process.env.GEMINI_API_KEY ||
    "";

  // Default models per provider
  const defaultModel =
    provider === "groq"
      ? "llama-3.3-70b-versatile"
      : provider === "gemini"
      ? "gemini-1.5-flash"
      : "gpt-4o";

  const modelName = process.env.AI_MODEL_NAME || defaultModel;

  if (!apiKey) {
    return new MockProvider();
  }

  switch (provider) {
    case "groq":
      return new GroqProvider(apiKey, modelName);
    case "gemini":
      return new GeminiProvider(apiKey, modelName);
    case "openai":
      return new OpenAIProvider(apiKey, modelName);
    default:
      console.warn(`[AI Factory] Unsupported provider: ${provider}. Using Mock.`);
      return new MockProvider();
  }
}
