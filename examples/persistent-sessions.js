import "dotenv/config";

import {
  Agent,
  OpenAIProvider
} from "../src/index.js";

import { FileSessionStore } from "../src/memory/FileSessionStore.js";

const sessionStore = new FileSessionStore();

const agent = new Agent({
  name: "Assistant",

  instructions:
    "Remember the conversation context.",

  model: new OpenAIProvider({
    model: "gpt-4.1-mini"
  }),

  sessionStore
});

const session = agent.createSession();

await agent.run(
  "My favorite programming language is JavaScript.",
  { session }
);

console.log(
  "Session saved:",
  session.id
);