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
      history,
      generationConfig: {
        maxOutputTokens: 1024,
      },
    });

    const lastMessage = userMessages[userMessages.length - 1];
    const prompt = systemMessage
      ? `System Instructions: ${systemMessage.content}\n\nUser: ${lastMessage?.content || ""}`
      : lastMessage?.content || "";

    return { chat, prompt };
  }

  async generateResponse(messages: Message[]): Promise<string> {
    const { chat, prompt } = this.buildChat(messages);
    const result = await chat.sendMessage(prompt);
    return result.response.text();
  }

  async generateStream(messages: Message[]): Promise<ReadableStream<Uint8Array>> {
    const { chat, prompt } = this.buildChat(messages);
    const result = await chat.sendMessageStream(prompt);
    const encoder = new TextEncoder();

    return new ReadableStream<Uint8Array>({
      async start(controller) {
        try {
          for await (const chunk of result.stream) {
            const text = chunk.text();
            if (text) {
              controller.enqueue(encoder.encode(text));
            }
          }
          controller.close();
        } catch (err) {
          controller.error(err);
        }
      },
    });
  }
}
