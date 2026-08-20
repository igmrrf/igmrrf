export interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface AIProvider {
  name: string;
  generateResponse(messages: Message[]): Promise<string>;
  generateStream(messages: Message[]): Promise<ReadableStream<Uint8Array>>;
}

export interface AIConfig {
  provider: 'groq' | 'gemini' | 'openai';
  apiKey: string;
  modelName: string;
}
