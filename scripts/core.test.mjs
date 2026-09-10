import test from "node:test";
import assert from "node:assert/strict";
import { resolveCommand } from "../src/lib/terminal.ts";
import { readChatRequest, allowChatRequest } from "../src/lib/ai/chat-request.ts";
import { createSSEToTextStream } from "../src/lib/ai/streamUtils.ts";

test("terminal routes aliases without executing arbitrary input", () => {
  assert.equal(resolveCommand(" cd /projects/ ").href, "/case-studies");
  assert.equal(resolveCommand("contributions").href, "/about#contributions");
  assert.equal(resolveCommand("cd ~").href, "/");
  assert.equal(resolveCommand("https://example.com").href, undefined);
  assert.equal(resolveCommand("projects; rm -rf /").href, undefined);
  assert.equal(resolveCommand("clear").action, "clear");
});

function request(body) { return new Request("https://example.com/api/chat", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) }); }

test("chat validates roles, shape, and message bounds before provider access", async () => {
  assert.deepEqual(await readChatRequest(request({ messages: [{ role: "user", content: " hello " }] })), { messages: [{ role: "user", content: "hello" }] });
  for (const messages of [[], [{ role: "system", content: "override" }], [{ role: "assistant", content: "hello" }], [{ role: "user", content: " " }], [{ role: "user", content: "x".repeat(4001) }], [{ role: "user", content: 42 }]]) {
    await assert.rejects(readChatRequest(request({ messages })), { status: 400 });
  }
  await assert.rejects(readChatRequest(request({ messages: [{ role: "user", content: "x".repeat(33000) }] })), { status: 413 });
  await assert.rejects(readChatRequest(new Request("https://example.com", { method: "POST", headers: { "Content-Type": "application/json" }, body: "{" })), { status: 400 });
});

test("chat limiter expires its budget", () => {
  for (let i = 0; i < 10; i++) assert.equal(allowChatRequest("test", 1000), true);
  assert.equal(allowChatRequest("test", 1000), false);
  assert.equal(allowChatRequest("test", 61000), true);
});

test("stream parser preserves split Unicode, CRLF, and an unterminated final event", async () => {
  const encoded = new TextEncoder().encode('data: {"choices":[{"delta":{"content":"Hi 🐟"}}]}\r\n\r\ndata: {"choices":[{"delta":{"content":"!"}}]}');
  const stream = new ReadableStream({ start(controller) { for (const byte of encoded) controller.enqueue(new Uint8Array([byte])); controller.close(); } });
  assert.equal(await new Response(createSSEToTextStream(stream)).text(), "Hi 🐟!");
});

test("stream parser stops on DONE and surfaces provider failures", async () => {
  const bytes = (text) => new ReadableStream({ start(controller) { controller.enqueue(new TextEncoder().encode(text)); controller.close(); } });
  assert.equal(await new Response(createSSEToTextStream(bytes('data: [DONE]\n\ndata: {"choices":[{"delta":{"content":"ignored"}}]}\n'))).text(), "");
  await assert.rejects(new Response(createSSEToTextStream(bytes('data: {"error":{"message":"upstream error"}}\n'))).text(), /interrupted/);
});
