import { GenerativeModel, GoogleGenerativeAI } from "@google/generative-ai";
import { AIProvider, Message } from "../types";

export class GeminiProvider implements AIProvider {
  name = "Gemini";
  private genAI: GoogleGenerativeAI;
  private model: GenerativeModel;

  constructor(apiKey: string, modelName: string) {
    this.genAI = new GoogleGenerativeAI(apiKey);
    this.model = this.genAI.getGenerativeModel({ model: modelName });
  }

  private buildChat(messages: Message[]) {
    const systemMessage = messages.find((m) => m.role === "system");
    const userMessages = messages.filter((m) => m.role !== "system");

    const history = [];
    let foundFirstUser = false;

    for (const msg of userMessages.slice(0, -1)) {
      if (msg.role === "user") {
        foundFirstUser = true;
      }

      if (foundFirstUser) {
        history.push({
          role: msg.role === "user" ? "user" : "model",
          parts: [{ text: msg.content }],
        });
      }
    }

    const chat = this.model.startChat({
      systemInstruction: systemMessage?.content,
      history,
      generationConfig: {
        maxOutputTokens: 1024,
      },
    });

    const lastMessage = userMessages[userMessages.length - 1];
    const prompt = lastMessage?.content || "";

    return { chat, prompt };
  }

  async generateResponse(messages: Message[]): Promise<string> {
    const { chat, prompt } = this.buildChat(messages);
    const result = await chat.sendMessage(prompt);
    return result.response.text();
  }

  async generateStream(messages: Message[], signal?: AbortSignal): Promise<ReadableStream<Uint8Array>> {
    const { chat, prompt } = this.buildChat(messages);
    const result = await chat.sendMessageStream(prompt, { signal });
    const encoder = new TextEncoder();
    const iterator = result.stream[Symbol.asyncIterator]();

    return new ReadableStream<Uint8Array>({
      async pull(controller) {
        try {
          const { done, value } = await iterator.next();
          if (done) controller.close();
          else controller.enqueue(encoder.encode(value.text()));
        } catch (err) {
          controller.error(err);
        }
      },
      async cancel() { await iterator.return?.(undefined); },
    });
  }
}
