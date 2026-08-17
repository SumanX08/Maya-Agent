import "dotenv/config";

import {
  Agent,
  OpenAIProvider
} from "../src/index.js";

const model = new OpenAIProvider({
  model: "gpt-4.1-mini"
});

const agent = new Agent({
  name: "Assistant",

  instructions:
    "You are a helpful AI assistant. Give clear and concise answers.",

  model
});

const result = await agent.run(
  "Explain what an AI agent is in simple terms."
);

console.log("\nAgent:", result.agent);
console.log("Run ID:", result.runId);
console.log("\nResponse:\n");
console.log(result.output);