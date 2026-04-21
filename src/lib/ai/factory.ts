import { AIProvider, Message } from "./types";
import { GeminiProvider } from "./providers/gemini";
import { OpenAIProvider } from "./providers/openai";

class MockProvider implements AIProvider {
  name = "Mock (Development)";
  async generateResponse(messages: Message[]): Promise<string> {
    const lastMsg = messages[messages.length - 1].content;
    return `[MOCK MODE] Since AI_API_KEY is missing, I'm simulating a response. You asked: "${lastMsg}". Please add your API key to .env.local to enable real LLM integration.`;
  }
}

export function getAIProvider(): AIProvider {
  const provider = (process.env.AI_PROVIDER || "gemini").toLowerCase();
  const apiKey = process.env.AI_API_KEY || "";
  const modelName =
    process.env.AI_MODEL_NAME ||
    (provider === "gemini" ? "gemini-3.1-pro-preview" : "gpt-4o");

  if (!apiKey) {
    if (process.env.NODE_ENV === "production") {
      throw new Error(
        `CRITICAL: AI_API_KEY is missing for production provider: ${provider}`,
      );
    }
    console.warn(
      `[AI Factory] Missing AI_API_KEY for ${provider}. Falling back to MockProvider.`,
    );
    return new MockProvider();
  }

  switch (provider) {
    case "gemini":
      return new GeminiProvider(apiKey, modelName);
    case "openai":
      return new OpenAIProvider(apiKey, modelName);
    default:
      console.error(
        `[AI Factory] Unsupported provider: ${provider}. Using Mock.`,
      );
      return new MockProvider();
  }
}
