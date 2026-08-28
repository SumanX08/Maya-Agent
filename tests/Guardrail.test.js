import test from "node:test";
import assert from "node:assert/strict";

import { Guardrail } from "../src/index.js";

test("Guardrail passes when validation succeeds", async () => {
  const guardrail = new Guardrail({
    name: "allow-input",
    validate: async () => ({
      passed: true
    })
  });

  const result = await guardrail.run({
    input: "Hello"
  });

  assert.equal(result.passed, true);
});

test("Guardrail fails when validation fails", async () => {
  const guardrail = new Guardrail({
    name: "block-input",
    validate: async () => ({
      passed: false,
      message: "Input is blocked"
    })
  });

  const result = await guardrail.run({
    input: "Blocked content"
  });

  assert.equal(result.passed, false);
  assert.equal(
    result.message,
    "Input is blocked"
  );
});

test("Guardrail requires a name", () => {
  assert.throws(
    () => {
      new Guardrail({
        validate: async () => ({
          passed: true
        })
      });
    },
    /Guardrail name is required/
  );
});

test("Guardrail requires a validate function", () => {
  assert.throws(
    () => {
      new Guardrail({
        name: "test-guardrail"
      });
    },
    /Guardrail validate function is required/
  );
});