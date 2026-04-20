export interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface AIProvider {
  name: string;
  generateResponse(messages: Message[]): Promise<string>;
}

export interface AIConfig {
  provider: 'gemini' | 'openai' | 'anthropic';
  apiKey: string;
  modelName: string;
}
