import test from "node:test";
import assert from "node:assert/strict";
import { z } from "zod";

import { Tool } from "../src/index.js";

test("Tool executes with valid input", async () => {
  const addTool = new Tool({
    name: "add",
    description: "Adds two numbers",
    schema: z.object({
      a: z.number(),
      b: z.number()
    }),
    execute: async ({ a, b }) => a + b
  });

  const result = await addTool.run({
    a: 5,
    b: 3
  });

  assert.equal(result, 8);
});

test("Tool rejects invalid input", async () => {
  const addTool = new Tool({
    name: "add",
    description: "Adds two numbers",
    schema: z.object({
      a: z.number(),
      b: z.number()
    }),
    execute: async ({ a, b }) => a + b
  });

  await assert.rejects(
    () =>
      addTool.run({
        a: "5",
        b: 3
      }),
    /Invalid input/
  );
});

test("Tool requires a name", () => {
  assert.throws(
    () =>
      new Tool({
        description: "Test tool",
        schema: z.object({}),
        execute: async () => {}
      }),
    /Tool name is required/
  );
});