import SectionIntro from "../components/docs/SectionIntro";
import CodeBlock from "../components/docs/CodeBlock";
import FeatureCard from "../components/docs/FeatureCard";

export default function Streaming() {
  return (
    <div>
      <SectionIntro
        eyebrow="Runtime"
        title="Streaming"
        description="Stream model output incrementally through a provider-independent agent interface and react to text deltas as they arrive."
      />

      {/* Overview */}
      <section className="mt-12">
        <h2 className="font-display text-2xl font-semibold text-white">
          Stream responses
        </h2>

        <p className="mt-4 max-w-3xl text-[15px] leading-7 text-slate-400">
          Instead of waiting for the complete model response, use
          <span className="mx-1 font-mono text-slate-300">agent.stream()</span>
          to receive generated text incrementally.
        </p>

        <div className="mt-7 grid gap-4 md:grid-cols-2">
          <FeatureCard
            title="Incremental output"
            description="Receive text as it is generated instead of waiting for the full response."
          />

          <FeatureCard
            title="Provider independent"
            description="The agent exposes the same streaming interface across supported providers."
          />
        </div>
      </section>

      {/* Basic usage */}
      <section className="mt-16">
        <h2 className="font-display text-2xl font-semibold text-white">
          Basic usage
        </h2>

        <p className="mt-4 max-w-3xl text-[15px] leading-7 text-slate-400">
          Create an agent normally, then call{" "}
          <span className="font-mono text-slate-300">stream()</span> with the
          user's input.
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
  name: "Streaming Assistant",
  instructions:
    "You are a concise helpful assistant.",
  model,
});

const result = await agent.stream(
  "Explain how an AI agent works."
);

console.log(result.output);`}
        </CodeBlock>
      </section>

      {/* EventBus */}
      <section className="mt-16">
        <h2 className="font-display text-2xl font-semibold text-white">
          Listen to stream events
        </h2>

        <p className="mt-4 max-w-3xl text-[15px] leading-7 text-slate-400">
          The EventBus emits{" "}
          <span className="font-mono text-slate-300">run.stream</span> events
          while the response is being generated.
        </p>

        <CodeBlock language="javascript">
          {`import {
  Agent,
  OpenAIProvider,
  EventBus,
} from "maya-agent";

const eventBus = new EventBus();

eventBus.on("run.stream", (event) => {
  if (event.type === "text.delta") {
    process.stdout.write(event.delta);
  }

  if (event.type === "completed") {
    console.log("\\nStream completed.");
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

await agent.stream(
  "Explain how an AI agent works."
);`}
        </CodeBlock>
      </section>

      {/* Text deltas */}
      <section className="mt-16">
        <h2 className="font-display text-2xl font-semibold text-white">
          Text deltas
        </h2>

        <p className="mt-4 max-w-3xl text-[15px] leading-7 text-slate-400">
          Each text update is normalized into a{" "}
          <span className="font-mono text-slate-300">
            type: "text.delta"
          </span>{" "}
          event.
        </p>

        <CodeBlock language="javascript">
          {`{
  type: "text.delta",
  delta: "An AI agent"
}`}
        </CodeBlock>

        <p className="mt-4 max-w-3xl text-sm leading-6 text-slate-500">
          The provider may choose different chunk sizes. Your application only
          needs to handle the normalized Maya-Agent event.
        </p>
      </section>

      {/* Providers */}
      <section className="mt-16">
        <h2 className="font-display text-2xl font-semibold text-white">
          Supported providers
        </h2>

        <p className="mt-4 max-w-3xl text-[15px] leading-7 text-slate-400">
          Maya-Agent's streaming interface has been tested with both OpenAI
          and Gemini.
        </p>

        <div className="mt-7 grid gap-4 md:grid-cols-2">
          <FeatureCard
            title="OpenAI"
            description="Uses the OpenAI Responses streaming API and normalizes text deltas."
          />

          <FeatureCard
            title="Gemini"
            description="Uses Gemini's generateContentStream API and normalizes streamed text chunks."
          />
        </div>
      </section>

      {/* Gemini */}
      <section className="mt-16">
        <h2 className="font-display text-2xl font-semibold text-white">
          Gemini streaming
        </h2>

        <CodeBlock language="javascript">
          {`import "dotenv/config";
import {
  Agent,
  GeminiProvider,
  EventBus,
} from "maya-agent";

const eventBus = new EventBus();

eventBus.on("run.stream", (event) => {
  if (event.type === "text.delta") {
    process.stdout.write(event.delta);
  }
});

const model = new GeminiProvider({
  model: "gemini-3.6-flash",
});

const agent = new Agent({
  name: "Streaming Assistant",
  instructions:
    "You are a concise helpful assistant.",
  model,
  eventBus,
});

await agent.stream(
  "Explain how an AI agent works."
);`}
        </CodeBlock>
      </section>

      {/* Streaming result */}
      <section className="mt-16">
        <h2 className="font-display text-2xl font-semibold text-white">
          Final result
        </h2>

        <p className="mt-4 max-w-3xl text-[15px] leading-7 text-slate-400">
          After the stream finishes, the complete accumulated response is
          returned and stored in the session.
        </p>

        <CodeBlock language="javascript">
          {`{
  runId: "...",
  agent: "Streaming Assistant",
  sessionId: "...",
  output: "Complete generated response..."
}`}
        </CodeBlock>
      </section>

      {/* Tracing */}
      <section className="mt-16">
        <h2 className="font-display text-2xl font-semibold text-white">
          Streaming + tracing
        </h2>

        <p className="mt-4 max-w-3xl text-[15px] leading-7 text-slate-400">
          Streaming lifecycle events are also available through the tracing
          system. See the Tracing section for collecting and inspecting them.
        </p>

        <CodeBlock language="javascript">
          {`import {
  EventBus,
  TraceCollector,
} from "maya-agent";

const eventBus = new EventBus();

const traces = new TraceCollector({
  eventBus,
});

// After agent.stream() completes:
const runTrace = traces.getRun(runId);

console.log(runTrace);`}
        </CodeBlock>
      </section>

      {/* Verified */}
      <section className="mt-16">
        <div className="rounded-xl border border-emerald-500/15 bg-emerald-500/[0.03] p-6">
          <div className="font-mono text-[11px] uppercase tracking-wider text-emerald-500">
            Verified
          </div>

          <h3 className="mt-3 font-display text-lg font-semibold text-white">
            OpenAI + Gemini streaming
          </h3>

          <p className="mt-2 text-sm leading-6 text-slate-400">
            Text streaming and streaming traces were tested from a consumer
            project with both supported providers.
          </p>
        </div>
      </section>
    </div>
  );
}