import SectionIntro from "../components/docs/SectionIntro";
import CodeBlock from "../components/docs/CodeBlock";
import FeatureCard from "../components/docs/FeatureCard";

export default function Tracing() {
  return (
    <div>
      <SectionIntro
        eyebrow="Runtime"
        title="Tracing"
        description="Capture agent execution events with the EventBus and inspect the lifecycle of model calls, tools, retries, and streams."
      />

      {/* Overview */}
      <section className="mt-12">
        <h2 className="font-display text-2xl font-semibold text-white">
          Execution traces
        </h2>

        <p className="mt-4 max-w-3xl text-[15px] leading-7 text-slate-400">
          Maya-Agent emits trace events during runtime execution.{" "}
          <span className="font-mono text-slate-300">TraceCollector</span>{" "}
          listens to these events and groups them by run ID.
        </p>

        <div className="mt-7 grid gap-4 md:grid-cols-3">
          <FeatureCard
            title="Event-driven"
            description="Tracing is built on top of the existing EventBus."
          />

          <FeatureCard
            title="Per-run"
            description="Trace events are grouped by the agent run ID."
          />

          <FeatureCard
            title="In-memory"
            description="TraceCollector keeps the captured events in memory for inspection."
          />
        </div>
      </section>

      {/* Create collector */}
      <section className="mt-16">
        <h2 className="font-display text-2xl font-semibold text-white">
          Create a TraceCollector
        </h2>

        <p className="mt-4 max-w-3xl text-[15px] leading-7 text-slate-400">
          Create an EventBus and attach a TraceCollector to it.
        </p>

        <CodeBlock language="javascript">
          {`import {
  EventBus,
  TraceCollector,
} from "maya-agent";

const eventBus = new EventBus();

const traces = new TraceCollector({
  eventBus,
});`}
        </CodeBlock>
      </section>

      {/* Agent */}
      <section className="mt-16">
        <h2 className="font-display text-2xl font-semibold text-white">
          Attach it to an agent
        </h2>

        <p className="mt-4 max-w-3xl text-[15px] leading-7 text-slate-400">
          Pass the same EventBus to the agent so runtime events can be
          collected.
        </p>

        <CodeBlock language="javascript">
          {`import {
  Agent,
  OpenAIProvider,
  EventBus,
  TraceCollector,
} from "maya-agent";

const eventBus = new EventBus();

const traces = new TraceCollector({
  eventBus,
});

const model = new OpenAIProvider({
  model: "gpt-4.1-mini",
});

const agent = new Agent({
  name: "Traced Assistant",
  instructions:
    "You are a helpful assistant.",
  model,
  eventBus,
});`}
        </CodeBlock>
      </section>

      {/* Inspect */}
      <section className="mt-16">
        <h2 className="font-display text-2xl font-semibold text-white">
          Inspect a run
        </h2>

        <p className="mt-4 max-w-3xl text-[15px] leading-7 text-slate-400">
          After a run completes, use its{" "}
          <span className="font-mono text-slate-300">runId</span> to retrieve
          the collected events.
        </p>

        <CodeBlock language="javascript">
          {`const result = await agent.run(
  "Explain retrieval augmented generation."
);

const trace = traces.getRun(
  result.runId
);

console.dir(trace, {
  depth: null,
});`}
        </CodeBlock>
      </section>

      {/* Event types */}
      <section className="mt-16">
        <h2 className="font-display text-2xl font-semibold text-white">
          Trace events
        </h2>

        <p className="mt-4 max-w-3xl text-[15px] leading-7 text-slate-400">
          The runtime emits trace events around model execution, tool
          execution, retries, and streaming.
        </p>

        <CodeBlock language="text">
          {`model.started
model.completed

tool.started
tool.completed

stream.started
stream.delta
stream.completed

run.retry`}
        </CodeBlock>
      </section>

      {/* Model tracing */}
      <section className="mt-16">
        <h2 className="font-display text-2xl font-semibold text-white">
          Model traces
        </h2>

        <p className="mt-4 max-w-3xl text-[15px] leading-7 text-slate-400">
          Normal agent execution records when a model call starts and
          completes, including the execution duration and usage information.
        </p>

        <CodeBlock language="javascript">
          {`{
  runId: "...",
  agent: "Traced Assistant",
  type: "model.completed",
  step: 0,
  durationMs: 1250,
  usage: {
    input_tokens: 20,
    output_tokens: 50,
    total_tokens: 70
  },
  timestamp: "..."
}`}
        </CodeBlock>
      </section>

      {/* Tool traces */}
      <section className="mt-16">
        <h2 className="font-display text-2xl font-semibold text-white">
          Tool traces
        </h2>

        <p className="mt-4 max-w-3xl text-[15px] leading-7 text-slate-400">
          Tool execution records include the tool name and execution
          duration.
        </p>

        <CodeBlock language="javascript">
          {`{
  runId: "...",
  agent: "Traced Assistant",
  type: "tool.completed",
  tool: "calculator",
  durationMs: 18,
  timestamp: "..."
}`}
        </CodeBlock>
      </section>

      {/* Streaming traces */}
      <section className="mt-16">
        <h2 className="font-display text-2xl font-semibold text-white">
          Streaming traces
        </h2>

        <p className="mt-4 max-w-3xl text-[15px] leading-7 text-slate-400">
          Streaming runs produce lifecycle traces that show when streaming
          starts, when text deltas arrive, and when the stream finishes.
        </p>

        <CodeBlock language="javascript">
          {`[
  {
    type: "stream.started",
    runId: "...",
    timestamp: "..."
  },
  {
    type: "stream.delta",
    runId: "...",
    delta: "An AI agent...",
    timestamp: "..."
  },
  {
    type: "stream.completed",
    runId: "...",
    durationMs: 3068,
    timestamp: "..."
  }
]`}
        </CodeBlock>
      </section>

      {/* Manage traces */}
      <section className="mt-16">
        <h2 className="font-display text-2xl font-semibold text-white">
          Manage traces
        </h2>

        <CodeBlock language="javascript">
          {`// Get one run
traces.getRun(runId);

// Remove one run
traces.clearRun(runId);

// Remove all runs
traces.clear();

// Stop listening and clear traces
traces.destroy();`}
        </CodeBlock>
      </section>

      {/* Complete example */}
      <section className="mt-16">
        <h2 className="font-display text-2xl font-semibold text-white">
          Complete example
        </h2>

        <CodeBlock language="javascript">
          {`import "dotenv/config";

import {
  Agent,
  OpenAIProvider,
  EventBus,
  TraceCollector,
} from "maya-agent";

const eventBus = new EventBus();

const traces = new TraceCollector({
  eventBus,
});

const model = new OpenAIProvider({
  model: "gpt-4.1-mini",
});

const agent = new Agent({
  name: "Traced Assistant",
  instructions:
    "You are a helpful assistant.",
  model,
  eventBus,
});

const result = await agent.run(
  "Explain how an AI agent works."
);

console.log("Output:");
console.log(result.output);

console.log("\\nTrace:");
console.dir(
  traces.getRun(result.runId),
  { depth: null }
);

traces.destroy();`}
        </CodeBlock>
      </section>

      {/* Verified */}
      <section className="mt-16">
        <div className="rounded-xl border border-emerald-500/15 bg-emerald-500/[0.03] p-6">
          <div className="font-mono text-[11px] uppercase tracking-wider text-emerald-500">
            Verified
          </div>

          <h3 className="mt-3 font-display text-lg font-semibold text-white">
            Streaming traces tested
          </h3>

          <p className="mt-2 text-sm leading-6 text-slate-400">
            TraceCollector successfully captured streaming lifecycle events
            from both OpenAI and Gemini runs.
          </p>
        </div>
      </section>
    </div>
  );
}