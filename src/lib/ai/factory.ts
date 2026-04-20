import { AIProvider } from "./types";
import { GeminiProvider } from "./providers/gemini";
import { OpenAIProvider } from "./providers/openai";

export function getAIProvider(): AIProvider {
  const provider = (process.env.AI_PROVIDER || 'gemini').toLowerCase();
  const apiKey = process.env.AI_API_KEY || '';
  const modelName = process.env.AI_MODEL_NAME || (provider === 'gemini' ? 'gemini-1.5-pro' : 'gpt-4o');

  if (!apiKey && process.env.NODE_ENV === 'production') {
    throw new Error(`AI_API_KEY is missing for provider: ${provider}`);
  }

  switch (provider) {
    case 'gemini':
      return new GeminiProvider(apiKey, modelName);
    case 'openai':
      return new OpenAIProvider(apiKey, modelName);
    default:
      throw new Error(`Unsupported AI provider: ${provider}`);
  }
}
