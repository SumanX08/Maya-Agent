import "dotenv/config";

import {
  Agent,
  GeminiProvider
} from "../src/index.js";

const agent = new Agent({
  name: "GeminiAgent",

  instructions:
    "You are a helpful AI assistant.",

  model: new GeminiProvider({
    model: "gemini-3.6-flash"
  })
});

const result = await agent.run(
  "Explain what an AI agent is in simple words."
);

console.log("\n🤖 Response:\n");
console.log(result.output);