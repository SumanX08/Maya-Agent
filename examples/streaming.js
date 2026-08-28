import "dotenv/config";

import {
  Agent,
  OpenAIProvider,
  EventBus
} from "../src/index.js";

const eventBus =
  new EventBus();

eventBus.on(
  "run.stream",
  event => {

    if (
      event.type ===
      "text.delta"
    ) {
      process.stdout.write(
        event.delta
      );
    }

    if (
      event.type ===
      "completed"
    ) {
      console.log(
        "\n\n✅ Stream completed"
      );
    }
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
      "StreamingAgent",

    instructions: `
You are a helpful assistant.

Give a clear explanation
with several paragraphs.
`,

    model:
      provider,

    eventBus
  });

await agent.stream(
  "Explain how AI agents work."
);