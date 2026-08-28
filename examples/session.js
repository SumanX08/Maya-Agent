import "dotenv/config";

import {
  Agent,
  OpenAIProvider
} from "../src/index.js";

const agent = new Agent({
  name: "Assistant",

  instructions:
    "You are a helpful assistant. Remember information from the current conversation.",

  model: new OpenAIProvider({
    model: "gpt-4.1-mini"
  })
});

const session = agent.createSession();

const first = await agent.run(
  "My name is Suman and I'm building an AI Agent SDK.",
  { session }
);

console.log("\nAssistant:", first.output);

const second = await agent.run(
  "What am I building?",
  { session }
);

console.log("\nAssistant:", second.output);

console.log("\nSession ID:", session.id);