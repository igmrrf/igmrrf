import { AIProvider } from "./types";
import { GeminiProvider } from "./providers/gemini";
import { OpenAIProvider } from "./providers/openai";
import { GroqProvider } from "./providers/groq";

class MockProvider implements AIProvider {
  name = "Offline";
  async generateResponse(): Promise<string> {
    return "The AI assistant is currently offline. You can still explore Francis’s [projects](/case-studies), [experience](/experience), and [writing](/blog), or [get in touch](mailto:francis.igbiriki@gmail.com).";
  }

  async generateStream(): Promise<ReadableStream<Uint8Array>> {
    const responseText = await this.generateResponse();
    const encoder = new TextEncoder();

    return new ReadableStream<Uint8Array>({
      start(controller) {
        controller.enqueue(encoder.encode(responseText));
        controller.close();
      },
    });
  }
}

export function getAIProvider(): AIProvider {
  const provider = (process.env.AI_PROVIDER || "gemini").toLowerCase();
  const apiKey =
    process.env.AI_API_KEY ||
    (provider === "groq" ? process.env.GROQ_API_KEY : provider === "openai" ? process.env.OPENAI_API_KEY : process.env.GEMINI_API_KEY) ||
    "";

  // Default models per provider
  const defaultModel =
    provider === "groq"
      ? "llama-3.3-70b-versatile"
      : provider === "gemini"
       ? "gemini-2.5-flash"
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
