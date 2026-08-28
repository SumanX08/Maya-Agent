import "dotenv/config";

import {
  Agent,
  OpenAIProvider,
  EventBus
} from "../src/index.js";

const eventBus =
  new EventBus();

eventBus.on(
  "run.retry",
  event => {
    console.log(
      "\n🔄 Retry event:"
    );

    console.dir(
      event,
      { depth: null }
    );
  }
);

const provider =
  new OpenAIProvider({
    model: "gpt-4.1-mini"
  });

const agent =
  new Agent({
    name: "ReliableAgent",

    instructions:
      "You are a helpful assistant.",

    model: provider,

    eventBus,

    timeoutMs: 1,

    retryPolicy: {
      maxAttempts: 3,
      delayMs: 300
    }
  });

try {

  await agent.run(
    "Explain AI agents."
  );

} catch (error) {

  console.log(
    "\n❌ Final error:"
  );

  console.log({
    message: error.message,
    code: error.code
  });
}