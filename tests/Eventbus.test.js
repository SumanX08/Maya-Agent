import test from "node:test";
import assert from "node:assert/strict";

import { EventBus } from "../src/index.js";

test("EventBus calls registered listener", () => {
  const eventBus = new EventBus();

  let received = null;

  eventBus.on("test.event", data => {
    received = data;
  });

  eventBus.emit("test.event", {
    message: "Hello"
  });

  assert.deepEqual(received, {
    message: "Hello"
  });
});

test("EventBus supports multiple listeners", () => {
  const eventBus = new EventBus();

  let count = 0;

  eventBus.on("test.event", () => {
    count++;
  });

  eventBus.on("test.event", () => {
    count++;
  });

  eventBus.emit("test.event");

  assert.equal(count, 2);
});

test("EventBus handles events with no listeners", () => {
  const eventBus = new EventBus();

  assert.doesNotThrow(() => {
    eventBus.emit("unknown.event", {
      test: true
    });
  });
});