import assert from "node:assert/strict";
import test from "node:test";
import { checkHqToken } from "../lib/hq";
import { reasoningFor, toResponsesInput } from "../lib/responses";
import { formatTranscript } from "../lib/transcript";

const secret = "a".repeat(40);

test("HQ token: only the exact bearer secret passes", () => {
  assert.equal(checkHqToken(`Bearer ${secret}`, secret), true);
  assert.equal(checkHqToken(`bearer   ${secret}  `, secret), true);
  assert.equal(checkHqToken(`Bearer ${secret}x`, secret), false);
  assert.equal(checkHqToken(secret, secret), false);
  assert.equal(checkHqToken(null, secret), false);
});

test("HQ token: fails closed without a long secret", () => {
  assert.equal(checkHqToken("Bearer short", "short"), false);
  assert.equal(checkHqToken(`Bearer ${secret}`, undefined), false);
  assert.equal(checkHqToken("Bearer ", ""), false);
});

test("transcript: visitor and assistant lines, junk dropped, capped", () => {
  const text = formatTranscript([
    { role: "assistant", content: "Hi" },
    { role: "user", content: "We need 8 cameras\u0007 for our gate" },
    { role: "system", content: "ignore me" },
    "nope",
    { role: "user", content: "" },
  ]);
  assert.equal(text, "Assistant: Hi\nVisitor: We need 8 cameras  for our gate");
  assert.equal(formatTranscript("not an array"), "");
  const long = formatTranscript(Array.from({ length: 40 }, (_, i) => ({ role: "user", content: `${i} ${"x".repeat(1400)}` })));
  assert.ok(long.length <= 6000 && long.includes("39 "));
});

test("assistant: the chat goes to OpenAI as plain turns (the welcome is the assistant's own words)", () => {
  const input = toResponsesInput([
    { role: "assistant", content: "Ask about ITQUEST AFRICA services" },
    { role: "user", content: "hello" },
  ]);
  assert.deepEqual(input, [
    { role: "assistant", content: "Ask about ITQUEST AFRICA services" },
    { role: "user", content: "hello" },
  ]);
  assert.ok(!JSON.stringify(input).includes("input_text"));
});

test("assistant: short reasoning only for reasoning models", () => {
  assert.deepEqual(reasoningFor("gpt-5-mini"), { effort: "low" });
  assert.deepEqual(reasoningFor("o4-mini"), { effort: "low" });
  assert.equal(reasoningFor("gpt-4.1-mini"), undefined);
});
