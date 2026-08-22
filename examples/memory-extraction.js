import "dotenv/config";

import {
  OpenAIProvider,
  MemoryExtractionModel
} from "../src/index.js";

const model =
  new OpenAIProvider({
    model: "gpt-4.1-mini"
  });

const extractor =
  new MemoryExtractionModel({
    model
  });

const messages = [
  {
    role: "user",
    content:
      "I'm building an AI Agent SDK called SumanX using Node.js. I'm using Neo4j for graph memory."
  },

  {
    role: "assistant",
    content:
      "That sounds like an interesting project."
  }
];

const result =
  await extractor.extract(messages);

console.dir(result, {
  depth: null
});