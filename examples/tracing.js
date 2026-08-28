import "dotenv/config";

import {
  Agent,
  OpenAIProvider,
  EventBus,
  TraceCollector
} from "../src/index.js";

const eventBus =
  new EventBus();

const tracer =
  new TraceCollector({
    eventBus
  });

eventBus.on(
  "trace",
  event => {
    console.log(
      "📊 TRACE:",
      event
    );
  }
);

const provider =
  new OpenAIProvider({
    model:
      "gpt-4.1-mini"
  });

const agent =
  new Agent({
    name:
      "TracingAgent",

    instructions:
      "You are a helpful assistant.",

    model:
      provider,

    eventBus
  });

const result =
  await agent.run(
    "Explain what an AI agent is."
  );


