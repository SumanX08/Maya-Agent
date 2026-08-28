import test from "node:test";
import assert from "node:assert/strict";

import { Session } from "../src/index.js";

test("Session stores messages", () => {
  const session = new Session();

  session.addMessage({
    role: "user",
    content: "Hello"
  });

  session.addMessage({
    role: "assistant",
    content: "Hi there!"
  });

  const messages = session.getMessages();

  assert.equal(messages.length, 2);
  assert.equal(messages[0].role, "user");
  assert.equal(messages[0].content, "Hello");
  assert.equal(messages[1].role, "assistant");
});

test("New session starts empty", () => {
  const session = new Session();

  const messages = session.getMessages();

  assert.equal(messages.length, 0);
});