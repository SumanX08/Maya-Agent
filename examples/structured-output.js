import "dotenv/config";

import { z } from "zod";

import {
  Agent,
  OpenAIProvider
} from "../src/index.js";

const provider =
  new OpenAIProvider({
    model: "gpt-4.1-mini"
  });

const outputSchema =
  z.object({
    answer: z.string(),

    confidence:
      z.number()
        .min(0)
        .max(1),

    topics:
      z.array(
        z.string()
      )
  });

const agent =
  new Agent({
    name: "StructuredResearchAgent",

    instructions: `
You are a research assistant.

Answer the user's question clearly.

Return:
- answer: a concise explanation
- confidence: your confidence from 0 to 1
- topics: important topics discussed
`,

    model: provider,

    outputSchema
  });

try {
  const result =
    await agent.run(
      "Explain what an AI agent is."
    );

  console.log(
    "\n🤖 Structured result:"
  );

  console.dir(
    result.output,
    {
      depth: null
    }
  );

} catch (error) {
  console.log(
    "\n❌ Error:"
  );

  console.dir(
    {
      name: error.name,
      message: error.message,
      issues: error.issues,
      rawOutput:
        error.rawOutput
    },
    {
      depth: null
    }
  );
}