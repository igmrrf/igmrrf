import { z } from "zod";

export const ChatRequestSchema = z.object({
  messages: z.array(z.object({
    role: z.enum(["user", "assistant"]),
    content: z.string().trim().min(1).max(4000),
  }).strict()).min(1).max(20),
}).strict().refine(({ messages }) => messages.at(-1)?.role === "user", "The last message must be from the user");

export class ChatRequestError extends Error {
  status: number;
  constructor(message: string, status: number) { super(message); this.status = status; }
}

export async function readChatRequest(request: Request) {
  if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) throw new ChatRequestError("Expected JSON", 415);
  if (!request.body) throw new ChatRequestError("Missing request body", 400);
  const reader = request.body.getReader();
  const decoder = new TextDecoder();
  let bytes = 0;
  let body = "";
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      bytes += value.byteLength;
      if (bytes > 32_768) { await reader.cancel(); throw new ChatRequestError("Conversation is too long. Start a new chat.", 413); }
      body += decoder.decode(value, { stream: true });
    }
  } finally { reader.releaseLock(); }
  body += decoder.decode();
  let json: unknown;
  try { json = JSON.parse(body); } catch { throw new ChatRequestError("Invalid JSON", 400); }
  const result = ChatRequestSchema.safeParse(json);
  if (!result.success) throw new ChatRequestError("Send 1–20 user/assistant messages, each up to 4,000 characters, ending with a user message.", 400);
  return result.data;
}

// Per-instance backstop. The deployment's edge limiter must cover all instances.
const requests = new Map<string, { count: number; expires: number }>();
export function allowChatRequest(key: string, now = Date.now()): boolean {
  for (const [id, entry] of requests) if (entry.expires <= now) requests.delete(id);
  const entry = requests.get(key);
  if (entry) { if (entry.count >= 10) return false; entry.count++; return true; }
  if (requests.size >= 1000) return false;
  requests.set(key, { count: 1, expires: now + 60_000 });
  return true;
}
