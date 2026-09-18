import SectionIntro from "../components/docs/SectionIntro";
import CodeBlock from "../components/docs/CodeBlock";
import FeatureCard from "../components/docs/FeatureCard";

export default function Examples() {
  return (
    <div>
      <SectionIntro
        eyebrow="Examples"
        title="Build with Maya-Agent"
        description="Practical examples showing how Maya-Agent's core runtime features fit together."
      />

      {/* Basic Agent */}
      <section className="mt-12">
        <h2 className="font-display text-2xl font-semibold text-white">
          Basic agent
        </h2>

        <p className="mt-4 max-w-3xl text-[15px] leading-7 text-slate-400">
          Start with a model provider and an Agent instance, then call
          <span className="mx-1 font-mono text-slate-300">run()</span>
          to execute it.
        </p>

        <CodeBlock language="javascript">
          {`import "dotenv/config";
import {
  Agent,
  OpenAIProvider,
} from "maya-agent";

const model = new OpenAIProvider({
  model: "gpt-4.1-mini",
});

const agent = new Agent({
  name: "Assistant",
  instructions:
    "You are a helpful assistant.",
  model,
});

const result = await agent.run(
  "What is an AI agent?"
);

console.log(result.output);`}
        </CodeBlock>
      </section>

      {/* Tools */}
      <section className="mt-16">
        <h2 className="font-display text-2xl font-semibold text-white">
          Agent with a tool
        </h2>

        <p className="mt-4 max-w-3xl text-[15px] leading-7 text-slate-400">
          Give an agent access to functions it can invoke during a run.
        </p>

        <CodeBlock language="javascript">
          {`import "dotenv/config";
import {
  Agent,
  OpenAIProvider,
  tool,
} from "maya-agent";
import { z } from "zod";

const calculator = tool({
  name: "calculator",
  description: "Add two numbers together.",
  schema: z.object({
    a: z.number(),
    b: z.number(),
  }),
  execute: async ({ a, b }) => {
    return a + b;
  },
});

const model = new OpenAIProvider({
  model: "gpt-4.1-mini",
});

const agent = new Agent({
  name: "Calculator",
  instructions:
    "Use the calculator tool when arithmetic is required.",
  model,
  tools: [calculator],
});

const result = await agent.run(
  "What is 127 + 358?"
);

console.log(result.output);`}
        </CodeBlock>
      </section>

      {/* Guardrails */}
      <section className="mt-16">
        <h2 className="font-display text-2xl font-semibold text-white">
          Protect an agent with guardrails
        </h2>

        <p className="mt-4 max-w-3xl text-[15px] leading-7 text-slate-400">
          Guardrails can validate input before the agent starts processing it.
        </p>

        <CodeBlock language="javascript">
          {`import "dotenv/config";
import {
  Agent,
  Guardrail,
  OpenAIProvider,
} from "maya-agent";

const safetyGuardrail = new Guardrail({
  name: "Password Protection",
  validate: async ({ input }) => {
    if (input.toLowerCase().includes("password")) {
      return {
        passed: false,
        message: "Passwords are not allowed.",
      };
    }

    return true;
  },
});

const model = new OpenAIProvider({
  model: "gpt-4.1-mini",
});

const agent = new Agent({
  name: "Safe Assistant",
  instructions:
    "You are a helpful assistant.",
  model,
  guardrails: {
    input: [safetyGuardrail],
  },
});

const result = await agent.run(
  "Tell me how to create a password."
);`}
        </CodeBlock>

        <p className="mt-4 text-sm leading-6 text-slate-500">
          A failed guardrail raises a GuardrailError and stops the run.
        </p>
      </section>

      {/* Handoffs */}
      <section className="mt-16">
        <h2 className="font-display text-2xl font-semibold text-white">
          Multi-agent handoff
        </h2>

        <p className="mt-4 max-w-3xl text-[15px] leading-7 text-slate-400">
          Agents can hand work to another specialized agent when a different
          capability is required.
        </p>

        <CodeBlock language="javascript">
          {`import "dotenv/config";
import {
  Agent,
  HandoffManager,
  OpenAIProvider,
} from "maya-agent";

const model = new OpenAIProvider({
  model: "gpt-4.1-mini",
});

const billingAgent = new Agent({
  name: "Billing Specialist",
  instructions:
    "Handle billing and payment issues.",
  model,
});

const supportAgent = new Agent({
  name: "Support Assistant",
  instructions:
    "Help customers and hand billing issues to the billing specialist.",
  model,
  handoffs: [billingAgent],
});

const result = await supportAgent.run(
  "I was charged twice for my subscription."
);

console.log(result.output);`}
        </CodeBlock>

        <p className="mt-4 text-sm leading-6 text-slate-500">
          Maya-Agent automatically exposes configured handoffs as tools during
          agent execution.
        </p>
      </section>

      {/* Session Memory */}
      <section className="mt-16">
        <h2 className="font-display text-2xl font-semibold text-white">
          Reuse session memory
        </h2>

        <p className="mt-4 max-w-3xl text-[15px] leading-7 text-slate-400">
          Reuse the same session across multiple runs to maintain conversation
          history.
        </p>

        <CodeBlock language="javascript">
          {`import "dotenv/config";
import {
  Agent,
  OpenAIProvider,
} from "maya-agent";

const model = new OpenAIProvider({
  model: "gpt-4.1-mini",
});

const agent = new Agent({
  name: "Memory Assistant",
  instructions:
    "Remember information from the current conversation.",
  model,
});

const session = agent.createSession();

await agent.run(
  "My name is Suman.",
  { session }
);

const result = await agent.run(
  "What is my name?",
  { session }
);

console.log(result.output);`}
        </CodeBlock>
      </section>

      {/* Graph Memory */}
      <section className="mt-16">
        <h2 className="font-display text-2xl font-semibold text-white">
          Store knowledge in graph memory
        </h2>

        <p className="mt-4 max-w-3xl text-[15px] leading-7 text-slate-400">
          GraphMemory can store entities and relationships in Neo4j and
          retrieve their connected context.
        </p>

        <CodeBlock language="javascript">
          {`import "dotenv/config";
import {
  GraphClient,
  GraphMemory,
} from "maya-agent";

const client = new GraphClient();
await client.connect();

const memory = new GraphMemory({
  client,
});

await memory.rememberFact({
  subject: {
    id: "sumanx",
    name: "Suman",
    type: "Person",
  },
  relation: "WORKS_ON",
  object: {
    id: "maya-agent",
    name: "Maya-Agent",
    type: "Project",
  },
});

const context = await memory.getNeighborhood(
  "sumanx"
);

console.log(context);

await client.close();`}
        </CodeBlock>
      </section>

      {/* Background Workers */}
      <section className="mt-16">
        <h2 className="font-display text-2xl font-semibold text-white">
          Background memory workers
        </h2>

        <p className="mt-4 max-w-3xl text-[15px] leading-7 text-slate-400">
          Background workers can process completed runs and maintain graph
          memory asynchronously.
        </p>

        <CodeBlock language="javascript">
          {`import "dotenv/config";
import {
  Agent,
  BackgroundWorkerManager,
  GraphMaintenanceWorker,
  MemoryExtractionWorker,
  RelationshipBuilderWorker,
} from "maya-agent";

const workers = new BackgroundWorkerManager({
  workers: [
    new MemoryExtractionWorker(/* ... */),
    new RelationshipBuilderWorker(/* ... */),
    new GraphMaintenanceWorker(/* ... */),
  ],
});

const agent = new Agent({
  name: "Knowledge Assistant",
  instructions:
    "You are a helpful assistant.",
  model,
  backgroundWorkers: workers,
});

const result = await agent.run(
  "Tell me about my project."
);`}
        </CodeBlock>

        <p className="mt-4 text-sm leading-6 text-slate-500">
          Worker construction depends on the graph and model components used
          by each worker. See Background Workers for the complete setup.
        </p>
      </section>

      {/* Structured Output */}
      <section className="mt-16">
        <h2 className="font-display text-2xl font-semibold text-white">
          Structured output
        </h2>

        <p className="mt-4 max-w-3xl text-[15px] leading-7 text-slate-400">
          Use a Zod schema when the application needs structured model output.
        </p>

        <CodeBlock language="javascript">
          {`import "dotenv/config";
import {
  Agent,
  OpenAIProvider,
} from "maya-agent";
import { z } from "zod";

const profileSchema = z.object({
  name: z.string(),
  role: z.string(),
  experience_years: z.number(),
});

const model = new OpenAIProvider({
  model: "gpt-4.1-mini",
});

const agent = new Agent({
  name: "Profile Extractor",
  instructions:
    "Extract the person's professional profile.",
  model,
  outputSchema: profileSchema,
});

const result = await agent.run(
  "My name is Suman. I am a software engineer with 2 years of experience."
);

console.log(result.output);`}
        </CodeBlock>
      </section>

      {/* Streaming + Tracing */}
      <section className="mt-16">
        <h2 className="font-display text-2xl font-semibold text-white">
          Streaming with tracing
        </h2>

        <p className="mt-4 max-w-3xl text-[15px] leading-7 text-slate-400">
          Combine streaming output with TraceCollector to inspect the
          streaming lifecycle.
        </p>

        <CodeBlock language="javascript">
          {`import "dotenv/config";
import {
  Agent,
  EventBus,
  OpenAIProvider,
  TraceCollector,
} from "maya-agent";

const eventBus = new EventBus();

const traces = new TraceCollector({
  eventBus,
});

eventBus.on("run.stream", (event) => {
  if (event.type === "text.delta") {
    process.stdout.write(event.delta);
  }
});

const model = new OpenAIProvider({
  model: "gpt-4.1-mini",
});

const agent = new Agent({
  name: "Streaming Assistant",
  instructions:
    "You are a concise helpful assistant.",
  model,
  eventBus,
});

const result = await agent.stream(
  "Explain how an AI agent works."
);

console.log("\\n\\nTrace:");
console.dir(
  traces.getRun(result.runId),
  { depth: null }
);

traces.destroy();`}
        </CodeBlock>
      </section>

      {/* Feature matrix */}
      <section className="mt-16">
        <h2 className="font-display text-2xl font-semibold text-white">
          What's covered
        </h2>

        <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <FeatureCard
            title="Agents"
            description="Runtime loop, sessions, tools, limits and execution."
          />

          <FeatureCard
            title="Tools"
            description="Schema-validated function calling."
          />

          <FeatureCard
            title="Guardrails"
            description="Input, tool and output validation."
          />

          <FeatureCard
            title="Handoffs"
            description="Delegate work between specialized agents."
          />

          <FeatureCard
            title="Memory"
            description="Session and persistent graph-based memory."
          />

          <FeatureCard
            title="Runtime"
            description="Providers, structured output, streaming and tracing."
          />
        </div>
      </section>

      {/* Closing */}
      <section className="mt-16 pb-8">
        <div className="rounded-xl border border-white/8 bg-[#080d0b] p-7">
          <div className="font-mono text-[11px] uppercase tracking-wider text-emerald-500">
            Maya-Agent
          </div>

          <h2 className="mt-3 font-display text-2xl font-semibold text-white">
            Build agents, not just prompts.
          </h2>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">
            These examples combine the runtime primitives documented
            throughout Maya-Agent. Start small, then add the capabilities your
            application actually needs.
          </p>
        </div>
      </section>
    </div>
  );
}