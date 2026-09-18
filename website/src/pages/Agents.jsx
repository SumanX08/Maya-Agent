import { Bot, Settings2, Activity, Clock } from "lucide-react";

import SectionIntro from "../components/docs/SectionIntro";
import CodeBlock from "../components/docs/CodeBlock";
import FeatureCard from "../components/docs/FeatureCard";

export default function Agents() {
  return (
    <>
      <SectionIntro
        label="CORE"
        title="Agents"
        description="Create configurable AI agents with a model, instructions, tools, memory, guardrails, handoffs, and runtime controls."
      />

      <div className="my-12 h-px bg-emerald-500/10" />

      {/* 01 */}
      <section>
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-emerald-500/60">
            01
          </span>
          <h2 className="font-display text-2xl font-semibold tracking-tight text-white md:text-3xl">
            Create an agent
          </h2>
        </div>

        <p className="mt-5 text-[15px] leading-8 text-slate-400">
          The{" "}
          <code className="text-emerald-400">Agent</code> is the main
          entry point for running an AI agent. At minimum, provide a
          name, instructions, and model provider.
        </p>

        <CodeBlock language="javascript">
{`import {
  Agent,
  OpenAIProvider,
} from "maya-agent";

const model = new OpenAIProvider({
  model: "gpt-4.1-mini",
});

const agent = new Agent({
  name: "Research Assistant",
  instructions:
    "You are a concise research assistant.",
  model,
});`}
        </CodeBlock>
      </section>

      {/* 02 */}
      <section className="mt-16">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-emerald-500/60">
            02
          </span>
          <h2 className="font-display text-2xl font-semibold tracking-tight text-white md:text-3xl">
            Agent configuration
          </h2>
        </div>

        <p className="mt-5 text-[15px] leading-8 text-slate-400">
          The agent accepts configuration options that control its
          identity, behavior, model, execution, and capabilities.
        </p>

        <div className="mt-7 grid gap-4 md:grid-cols-2">
          <FeatureCard title="name">
            Identifies the agent during execution and in returned
            results.
          </FeatureCard>

          <FeatureCard title="instructions">
            Defines the behavior and system instructions given to the
            model.
          </FeatureCard>

          <FeatureCard title="model">
            Supplies the model provider responsible for generating
            responses.
          </FeatureCard>

          <FeatureCard title="maxSteps">
            Controls the maximum number of runtime steps available to
            an agent execution.
          </FeatureCard>
        </div>
      </section>

      {/* 03 */}
      <section className="mt-16">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-emerald-500/60">
            03
          </span>
          <h2 className="font-display text-2xl font-semibold tracking-tight text-white md:text-3xl">
            Run an agent
          </h2>
        </div>

        <p className="mt-5 text-[15px] leading-8 text-slate-400">
          Use{" "}
          <code className="text-emerald-400">agent.run()</code> to
          execute the agent with user input.
        </p>

        <CodeBlock language="javascript">
{`const result = await agent.run(
  "What is retrieval augmented generation?"
);

console.log(result.output);`}
        </CodeBlock>

        <p className="text-sm leading-7 text-slate-500">
          The method returns a Promise containing the execution
          result.
        </p>
      </section>

      {/* 04 */}
      <section className="mt-16">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-emerald-500/60">
            04
          </span>
          <h2 className="font-display text-2xl font-semibold tracking-tight text-white md:text-3xl">
            Execution result
          </h2>
        </div>

        <p className="mt-5 text-[15px] leading-8 text-slate-400">
          Each successful run returns the generated output together
          with execution metadata.
        </p>

        <CodeBlock language="javascript">
{`const result = await agent.run(
  "What is retrieval augmented generation?"
);

console.log(result.agent);
console.log(result.output);
console.log(result.runId);
console.log(result.sessionId);`}
        </CodeBlock>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <FeatureCard title="runId">
            A unique identifier for the current agent execution.
          </FeatureCard>

          <FeatureCard title="sessionId">
            Identifies the session associated with the execution.
          </FeatureCard>

          <FeatureCard title="agent">
            Contains the configured agent name.
          </FeatureCard>

          <FeatureCard title="output">
            Contains the final generated response.
          </FeatureCard>
        </div>
      </section>

      {/* 05 */}
      <section className="mt-16">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-emerald-500/60">
            05
          </span>
          <h2 className="font-display text-2xl font-semibold tracking-tight text-white md:text-3xl">
            Runtime controls
          </h2>
        </div>

        <p className="mt-5 text-[15px] leading-8 text-slate-400">
          Maya-Agent also exposes runtime controls that can be used
          when configuring more advanced agents.
        </p>

        <div className="mt-7 grid gap-4 md:grid-cols-2">
          <FeatureCard title="timeoutMs">
            Set a timeout for agent execution.
          </FeatureCard>

          <FeatureCard title="retryPolicy">
            Configure retry behavior for model execution.
          </FeatureCard>

          <FeatureCard title="eventBus">
            Connect an event bus to observe runtime events.
          </FeatureCard>

          <FeatureCard title="sessionStore">
            Configure how agent sessions are stored.
          </FeatureCard>
        </div>
      </section>

      {/* 06 */}
      <section className="mt-16">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-emerald-500/60">
            06
          </span>
          <h2 className="font-display text-2xl font-semibold tracking-tight text-white md:text-3xl">
            Add capabilities
          </h2>
        </div>

        <p className="mt-5 text-[15px] leading-8 text-slate-400">
          Agents can be extended with additional runtime capabilities
          through configuration.
        </p>

        <div className="mt-7 grid gap-4 md:grid-cols-2">
          <FeatureCard title="tools">
            Give the agent functions it can call during execution.
          </FeatureCard>

          <FeatureCard title="guardrails">
            Validate input and output around agent execution.
          </FeatureCard>

          <FeatureCard title="memory">
            Provide persistent context and graph-based memory.
          </FeatureCard>

          <FeatureCard title="handoffs">
            Allow execution to be transferred to another agent.
          </FeatureCard>
        </div>
      </section>

      {/* Complete example */}
      <section className="mt-16">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-emerald-500/60">
            07
          </span>
          <h2 className="font-display text-2xl font-semibold tracking-tight text-white md:text-3xl">
            Complete example
          </h2>
        </div>

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
  name: "Research Assistant",
  instructions:
    "You are a concise research assistant.",
  model,
  maxSteps: 3,
});

const result = await agent.run(
  "What is retrieval augmented generation?"
);

console.log("Agent:", result.agent);
console.log("Output:", result.output);
console.log("Run ID:", result.runId);
console.log("Session ID:", result.sessionId);`}
        </CodeBlock>
      </section>

      {/* Next */}
      <section className="mt-16 rounded-2xl border border-emerald-500/15 bg-emerald-500/[0.025] p-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-emerald-500/70">
          NEXT STEP
        </p>

        <h3 className="mt-3 font-display text-lg font-semibold text-white">
          Give your agent tools
        </h3>

        <p className="mt-2 text-sm leading-7 text-slate-500">
          Tools allow an agent to perform actions beyond generating
          text. Continue to Tools to define and execute agent
          capabilities.
        </p>
      </section>
    </>
  );
}