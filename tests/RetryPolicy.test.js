import test from "node:test";
import assert from "node:assert/strict";

import { RetryPolicy } from "../src/index.js";

test("RetryPolicy returns result on first successful attempt", async () => {
  const retry = new RetryPolicy({
    maxAttempts: 3,
    initialDelay: 10
  });

  let attempts = 0;

  const result = await retry.execute(async () => {
    attempts++;

    return "success";
  });

  assert.equal(result, "success");
  assert.equal(attempts, 1);
});

test("RetryPolicy retries after failure", async () => {
  const retry = new RetryPolicy({
    maxAttempts: 3,
    initialDelay: 10
  });

  let attempts = 0;

  const result = await retry.execute(async () => {
    attempts++;

    if (attempts < 3) {
      throw new Error("Temporary failure");
    }

    return "success";
  });

  assert.equal(result, "success");
  assert.equal(attempts, 3);
});

test("RetryPolicy throws after maximum attempts", async () => {
  const retry = new RetryPolicy({
    maxAttempts: 3,
    initialDelay: 10
  });

  let attempts = 0;

  await assert.rejects(
    async () => {
      await retry.execute(async () => {
        attempts++;

        throw new Error("Permanent failure");
      });
    },
    /Permanent failure/
  );

  assert.equal(attempts, 3);
});