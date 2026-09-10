export function createSSEToTextStream(byteStream: ReadableStream<Uint8Array>): ReadableStream<Uint8Array> {
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();
  let buffer = "";
  let finished = false;

  function consume(line: string, controller: TransformStreamDefaultController<Uint8Array>) {
    const trimmed = line.trim();
    if (finished || !trimmed.startsWith("data:")) return;
    const data = trimmed.slice(5).trim();
    if (data === "[DONE]") { finished = true; controller.terminate(); return; }
    if (!data) return;
    // Complete but malformed events must fail visibly, not silently truncate a reply.
    const parsed = JSON.parse(data);
    if (parsed.error) throw new Error("The AI provider interrupted the response");
    const content = parsed.choices?.[0]?.delta?.content;
    if (typeof content === "string") controller.enqueue(encoder.encode(content));
  }

  return byteStream.pipeThrough(new TransformStream<Uint8Array, Uint8Array>({
    transform(chunk, controller) {
      buffer += decoder.decode(chunk, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop() || "";
      for (const line of lines) consume(line, controller);
    },
    flush(controller) {
      buffer += decoder.decode();
      if (buffer.trim()) consume(buffer, controller);
    },
  }));
}
