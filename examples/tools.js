import "dotenv/config";
import { z } from "zod";

import {
  Agent,
  OpenAIProvider,
  tool
} from "../src/index.js";

const calculator = tool({
  name: "calculator",

  description:
    "Calculate a mathematical expression.",

  schema: z.object({
    expression: z
      .string()
      .describe(
        "Mathematical expression to calculate"
      )
  }),

  execute: async ({ expression }) => {
    const result = Function(
      `"use strict"; return (${expression})`
    )();

    return {
      expression,
      result
    };
  }
});

const agent = new Agent({
  name: "CalculatorAgent",

  instructions:
    "You are a helpful assistant. Use the calculator tool whenever mathematical calculation is required.",

  model: new OpenAIProvider({
    model: "gpt-4.1-mini"
  }),

  tools: [
    calculator
  ]
});

const result = await agent.run(
  "What is 125 * 48?"
);

console.log(result);