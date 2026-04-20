import { AIProvider, Message } from "../types";

export class OpenAIProvider implements AIProvider {
  name = "OpenAI";
  private apiKey: string;
  private modelName: string;

  constructor(apiKey: string, modelName: string) {
    this.apiKey = apiKey;
    this.modelName = modelName;
  }

  async generateResponse(messages: Message[]): Promise<string> {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        model: this.modelName,
        messages: messages.map(m => ({
          role: m.role,
          content: m.content,
        })),
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`OpenAI Error: ${error.error?.message || response.statusText}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  }
}
