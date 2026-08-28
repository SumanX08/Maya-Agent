import "dotenv/config";

import {
  Agent,
  OpenAIProvider,
  EventBus
} from "../src/index.js";

const eventBus =
  new EventBus();

eventBus.on(
  "handoff.started",
  event => {
    console.log(
      "\n🔀 Handoff started:"
    );

    console.dir(
      event,
      { depth: null }
    );
  }
);

eventBus.on(
  "handoff.completed",
  event => {
    console.log(
      "\n✅ Handoff completed:"
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

const billingAgent =
  new Agent({
    name: "BillingAgent",

    instructions: `
You are a billing specialist.

Handle billing, invoices,
payments and subscription questions.

Answer the user directly.
`,

    model: provider,

    eventBus
  });

const supportAgent =
  new Agent({
    name: "SupportAgent",

    instructions: `
You are a customer support agent.

Handle general support questions.

If the user asks about billing,
payments, invoices or subscriptions,
transfer the task to BillingAgent.
`,

    model: provider,

    eventBus,

    handoffs: [
      billingAgent
    ],

    maxHandoffs: 3
  });

try {
  const result =
    await supportAgent.run(
      "I was charged twice for my subscription. Can you help me?"
    );

  console.log(
    "\n🤖 Final result:"
  );

  console.log(
    result.output
  );

} catch (error) {
  console.log(
    "\n❌ Handoff failed:"
  );

  console.dir(
    {
      name: error.name,
      message: error.message
    },
    { depth: null }
  );
}