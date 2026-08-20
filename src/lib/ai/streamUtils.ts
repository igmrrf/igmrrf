export function createSSEToTextStream(
  byteStream: ReadableStream<Uint8Array>
): ReadableStream<Uint8Array> {
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();
  let buffer = "";

  const transformStream = new TransformStream<Uint8Array, Uint8Array>({
    transform(chunk, controller) {
      buffer += decoder.decode(chunk, { stream: true });
      const lines = buffer.split("\n");
      // Keep the last incomplete line in buffer
      buffer = lines.pop() || "";

      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith(":") || !trimmed.startsWith("data:")) {
          continue;
        }

        const dataStr = trimmed.replace(/^data:\s*/, "");
        if (dataStr === "[DONE]") {
          return;
        }

        try {
          const parsed = JSON.parse(dataStr);
          const deltaContent = parsed.choices?.[0]?.delta?.content;
          if (deltaContent) {
            controller.enqueue(encoder.encode(deltaContent));
          }
        } catch {
          // Incomplete JSON segment; skip
        }
      }
    },
    flush(controller) {
      if (buffer.trim()) {
        const trimmed = buffer.trim();
        if (trimmed.startsWith("data:") && trimmed !== "data: [DONE]") {
          try {
            const dataStr = trimmed.replace(/^data:\s*/, "");
            const parsed = JSON.parse(dataStr);
            const deltaContent = parsed.choices?.[0]?.delta?.content;
            if (deltaContent) {
              controller.enqueue(encoder.encode(deltaContent));
            }
          } catch {
            // ignore
          }
        }
      }
    },
  });

  return byteStream.pipeThrough(transformStream);
}
