import { AIProvider, Message } from "../types";
import { createSSEToTextStream } from "../streamUtils";

export class GroqProvider implements AIProvider {
  name = "Groq";
  private apiKey: string;
  private modelName: string;

  constructor(apiKey: string, modelName: string) {
    this.apiKey = apiKey;
    this.modelName = modelName;
  }

  async generateResponse(messages: Message[]): Promise<string> {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        model: this.modelName,
        messages: messages.map((m) => ({
          role: m.role,
          content: m.content,
        })),
        temperature: 0.6,
        max_tokens: 1024,
      }),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(
        `Groq Error (${response.status}): ${error?.error?.message || response.statusText}`
      );
    }

    const data = await response.json();
    return data.choices?.[0]?.message?.content || "";
  }

  async generateStream(messages: Message[]): Promise<ReadableStream<Uint8Array>> {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        model: this.modelName,
        messages: messages.map((m) => ({
          role: m.role,
          content: m.content,
        })),
        temperature: 0.6,
        max_tokens: 1024,
        stream: true,
      }),
    });

    if (!response.ok || !response.body) {
      const error = await response.json().catch(() => ({}));
      throw new Error(
        `Groq Streaming Error (${response.status}): ${error?.error?.message || response.statusText}`
      );
    }

    return createSSEToTextStream(response.body);
  }
}
