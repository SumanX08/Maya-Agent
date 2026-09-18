import { ArrowRight, CheckCircle2 } from "lucide-react";

import SectionIntro from "../components/docs/SectionIntro";
import CodeBlock from "../components/docs/CodeBlock";
import FeatureCard from "../components/docs/FeatureCard";

export default function QuickStart() {
  return (
    <>
      <SectionIntro
        label="QUICK START"
        title="Build your first agent"
        description="Create a model provider, give an agent its instructions, run it, and work with the result."
      />

      <div className="my-12 h-px bg-emerald-500/10" />

      {/* 01 — Provider */}
      <section>
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-emerald-500/60">
            01
          </span>

          <h2 className="font-display text-2xl font-semibold tracking-tight text-white md:text-3xl">
            Create a model provider
          </h2>
        </div>

        <p className="mt-5 text-[15px] leading-8 text-slate-400">
          An agent needs a model to generate responses. Maya-Agent
          keeps the model provider separate from the agent runtime.
        </p>

        <CodeBlock language="javascript">
{`import "dotenv/config";

import { OpenAIProvider } from "maya-agent";

const model = new OpenAIProvider({
  model: "gpt-4.1-mini",
});`}
        </CodeBlock>

        <p className="text-sm leading-7 text-slate-500">
          The provider reads{" "}
          <code className="text-slate-300">OPENAI_API_KEY</code>{" "}
          from your environment.
        </p>
      </section>

      {/* 02 — Agent */}
      <section className="mt-16">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-emerald-500/60">
            02
          </span>

          <h2 className="font-display text-2xl font-semibold tracking-tight text-white md:text-3xl">
            Create an agent
          </h2>
        </div>

        <p className="mt-5 text-[15px] leading-8 text-slate-400">
          Create an{" "}
          <code className="text-emerald-400">Agent</code> and give it
          a name, instructions, and the model provider you created.
        </p>

        <CodeBlock language="javascript">
{`import { Agent } from "maya-agent";

const agent = new Agent({
  name: "Assistant",
  instructions: "You are a helpful assistant.",
  model,
});`}
        </CodeBlock>

        <p className="text-sm leading-7 text-slate-500">
          The instructions define the agent's behavior and are passed
          to the model during execution.
        </p>
      </section>

      {/* 03 — Run */}
      <section className="mt-16">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-emerald-500/60">
            03
          </span>

          <h2 className="font-display text-2xl font-semibold tracking-tight text-white md:text-3xl">
            Run the agent
          </h2>
        </div>

        <p className="mt-5 text-[15px] leading-8 text-slate-400">
          Call{" "}
          <code className="text-emerald-400">agent.run()</code> with
          the user's input.
        </p>

        <CodeBlock language="javascript">
{`const result = await agent.run(
  "Explain what an AI agent is in one sentence."
);`}
        </CodeBlock>

        <div className="mt-6 flex items-start gap-3 rounded-xl border border-emerald-500/15 bg-emerald-500/[0.035] p-4">
          <CheckCircle2
            size={16}
            className="mt-0.5 shrink-0 text-emerald-400"
          />

          <p className="text-sm leading-6 text-slate-400">
            <code className="text-slate-300">agent.run()</code> is
            asynchronous, so use{" "}
            <code className="text-slate-300">await</code> or handle
            the returned Promise.
          </p>
        </div>
      </section>

      {/* 04 — Result */}
      <section className="mt-16">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-emerald-500/60">
            04
          </span>

          <h2 className="font-display text-2xl font-semibold tracking-tight text-white md:text-3xl">
            Read the result
          </h2>
        </div>

        <p className="mt-5 text-[15px] leading-8 text-slate-400">
          The returned object contains the generated output along
          with execution metadata.
        </p>

        <CodeBlock language="javascript">
{`console.log(result.output);`}
        </CodeBlock>

        <p className="text-sm leading-7 text-slate-500">
          The result also contains a unique run ID, session ID, token
          usage information, and the messages exchanged during the
          run.
        </p>

        <CodeBlock language="javascript">
{`console.log(result.runId);
console.log(result.sessionId);
console.log(result.usage);
console.log(result.messages);`}
        </CodeBlock>
      </section>

      {/* 05 — Complete */}
      <section className="mt-16">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-emerald-500/60">
            05
          </span>

          <h2 className="font-display text-2xl font-semibold tracking-tight text-white md:text-3xl">
            Complete example
          </h2>
        </div>

        <p className="mt-5 text-[15px] leading-8 text-slate-400">
          Put everything together in a single file:
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
  instructions: "You are a helpful assistant.",
  model,
});

const result = await agent.run(
  "Explain what an AI agent is in one sentence."
);

console.log("Output:", result.output);`}
        </CodeBlock>

        <div className="mt-6 rounded-xl border border-white/[0.07] bg-white/[0.02] p-5">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-600">
            Example output
          </p>

          <p className="mt-4 text-sm leading-7 text-slate-400">
            Your exact response will depend on the model, but the
            result will be available through{" "}
            <code className="text-emerald-400">
              result.output
            </code>
            .
          </p>
        </div>
      </section>

      {/* 06 — Mental model */}
      <section className="mt-16">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-emerald-500/60">
            06
          </span>

          <h2 className="font-display text-2xl font-semibold tracking-tight text-white md:text-3xl">
            What's happening?
          </h2>
        </div>

        <p className="mt-5 text-[15px] leading-8 text-slate-400">
          At a high level, the flow looks like this:
        </p>

        <div className="mt-7 grid gap-3 sm:grid-cols-4">
          <FeatureCard title="Provider">
            Connects the agent runtime to the language model.
          </FeatureCard>

          <FeatureCard title="Agent">
            Defines the agent's identity and instructions.
          </FeatureCard>

          <FeatureCard title="Run">
            Starts an execution with the user's input.
          </FeatureCard>

          <FeatureCard title="Result">
            Returns the generated output and execution metadata.
          </FeatureCard>
        </div>
      </section>

      {/* Next */}
      <section className="mt-16 rounded-2xl border border-emerald-500/15 bg-emerald-500/[0.025] p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-emerald-500/70">
              NEXT STEP
            </p>

            <h3 className="mt-3 font-display text-lg font-semibold text-white">
              Give your agent tools
            </h3>

            <p className="mt-2 text-sm leading-7 text-slate-500">
              Agents become more useful when they can interact with
              external systems through tools.
            </p>
          </div>

          <ArrowRight
            size={18}
            className="mt-1 shrink-0 text-emerald-400/60"
          />
        </div>
      </section>
    </>
  );
}