import { GoogleGenerativeAI } from "@google/generative-ai";
import { AIProvider, Message } from "../types";

export class GeminiProvider implements AIProvider {
  name = "Gemini";
  private genAI: GoogleGenerativeAI;
  private model: any;

  constructor(apiKey: string, modelName: string) {
    this.genAI = new GoogleGenerativeAI(apiKey);
    this.model = this.genAI.getGenerativeModel({ model: modelName });
  }

  async generateResponse(messages: Message[]): Promise<string> {
    const systemMessage = messages.find(m => m.role === 'system');
    const userMessages = messages.filter(m => m.role !== 'system');
    
    const chat = this.model.startChat({
      history: userMessages.slice(0, -1).map(m => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.content }],
      })),
      generationConfig: {
        maxOutputTokens: 1000,
      },
    });

    const lastMessage = userMessages[userMessages.length - 1];
    const prompt = systemMessage 
      ? `System Instructions: ${systemMessage.content}\n\nUser: ${lastMessage.content}`
      : lastMessage.content;

    const result = await chat.sendMessage(prompt);
    const response = await result.response;
    return response.text();
  }
}
