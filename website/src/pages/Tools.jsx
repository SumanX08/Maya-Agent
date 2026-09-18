import { CheckCircle2, Code2, ShieldCheck, Wrench } from "lucide-react";

import SectionIntro from "../components/docs/SectionIntro";
import CodeBlock from "../components/docs/CodeBlock";
import FeatureCard from "../components/docs/FeatureCard";

export default function Tools() {
  return (
    <>
      <SectionIntro
        label="CORE"
        title="Tools"
        description="Give your agents capabilities beyond text generation with validated functions they can call during execution."
      />

      <div className="my-12 h-px bg-emerald-500/10" />

      {/* 01 */}
      <section>
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-emerald-500/60">
            01
          </span>

          <h2 className="font-display text-2xl font-semibold tracking-tight text-white md:text-3xl">
            What is a tool?
          </h2>
        </div>

        <p className="mt-5 text-[15px] leading-8 text-slate-400">
          A tool is a function that an agent can call when it needs to
          perform an action or retrieve information. Maya-Agent handles
          the tool-call loop and feeds the tool result back to the
          model.
        </p>

        <p className="mt-4 text-[15px] leading-8 text-slate-400">
          Tools are defined with a name, description, Zod schema, and
          execution function.
        </p>
      </section>

      {/* 02 */}
      <section className="mt-16">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-emerald-500/60">
            02
          </span>

          <h2 className="font-display text-2xl font-semibold tracking-tight text-white md:text-3xl">
            Define a tool
          </h2>
        </div>

        <CodeBlock language="javascript">
{`import { tool } from "maya-agent";
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
});`}
        </CodeBlock>

        <div className="mt-7 grid gap-4 md:grid-cols-2">
          <FeatureCard title="name">
            The unique name the model uses when requesting the tool.
          </FeatureCard>

          <FeatureCard title="description">
            Explains to the model when and why the tool should be used.
          </FeatureCard>

          <FeatureCard title="schema">
            A Zod schema that defines and validates the tool's input.
          </FeatureCard>

          <FeatureCard title="execute">
            The function that runs when the agent calls the tool.
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
            Attach tools to an agent
          </h2>
        </div>

        <p className="mt-5 text-[15px] leading-8 text-slate-400">
          Pass your tools through the{" "}
          <code className="text-emerald-400">tools</code> option when
          creating an agent.
        </p>

        <CodeBlock language="javascript">
{`const agent = new Agent({
  name: "Calculator Assistant",
  instructions:
    "Use the calculator whenever arithmetic is required.",
  model,
  tools: [calculator],
});`}
        </CodeBlock>
      </section>

      {/* 04 */}
      <section className="mt-16">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-emerald-500/60">
            04
          </span>

          <h2 className="font-display text-2xl font-semibold tracking-tight text-white md:text-3xl">
            Tool execution loop
          </h2>
        </div>

        <p className="mt-5 text-[15px] leading-8 text-slate-400">
          When the model decides to use a tool, Maya-Agent executes
          the function and continues the agent loop with the result.
        </p>

        <div className="mt-7 grid gap-3 sm:grid-cols-5">
          {[
            ["01", "User", "Sends input"],
            ["02", "Model", "Requests tool"],
            ["03", "Tool", "Executes function"],
            ["04", "Runtime", "Returns result"],
            ["05", "Model", "Generates response"],
          ].map(([number, title, description]) => (
            <div
              key={number}
              className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-4"
            >
              <span className="font-mono text-[10px] text-emerald-500/60">
                {number}
              </span>

              <p className="mt-3 font-display text-sm font-semibold text-white">
                {title}
              </p>

              <p className="mt-1 text-xs leading-5 text-slate-600">
                {description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-7 rounded-xl border border-emerald-500/15 bg-emerald-500/[0.025] p-5">
          <div className="flex items-start gap-3">
            <Code2
              size={16}
              className="mt-0.5 shrink-0 text-emerald-400"
            />

            <p className="text-sm leading-7 text-slate-400">
              An agent can execute multiple runtime steps when a tool
              call is required before producing its final response.
            </p>
          </div>
        </div>
      </section>

      {/* 05 */}
      <section className="mt-16">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-emerald-500/60">
            05
          </span>

          <h2 className="font-display text-2xl font-semibold tracking-tight text-white md:text-3xl">
            Validate tool input
          </h2>
        </div>

        <p className="mt-5 text-[15px] leading-8 text-slate-400">
          Tool arguments are validated against the Zod schema before
          the execution function receives them.
        </p>

        <CodeBlock language="javascript">
{`const weather = tool({
  name: "get_weather",
  description: "Get the weather for a city.",

  schema: z.object({
    city: z.string(),
  }),

  execute: async ({ city }) => {
    return getWeather(city);
  },
});`}
        </CodeBlock>

        <div className="mt-6 flex items-start gap-3 rounded-xl border border-white/[0.07] bg-white/[0.02] p-4">
          <ShieldCheck
            size={16}
            className="mt-0.5 shrink-0 text-emerald-400"
          />

          <p className="text-sm leading-6 text-slate-500">
            Using a schema keeps the tool boundary explicit and
            prevents the execution function from receiving arguments
            that do not match its expected structure.
          </p>
        </div>
      </section>

      {/* 06 */}
      <section className="mt-16">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-emerald-500/60">
            06
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
  tool,
} from "maya-agent";

import { z } from "zod";

const model = new OpenAIProvider({
  model: "gpt-4.1-mini",
});

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

const agent = new Agent({
  name: "Calculator Assistant",
  instructions:
    "Use the calculator whenever arithmetic is required.",
  model,
  tools: [calculator],
});

const result = await agent.run(
  "What is 127 + 358?"
);

console.log(result.output);`}
        </CodeBlock>

        <div className="mt-6 flex items-start gap-3 rounded-xl border border-emerald-500/15 bg-emerald-500/[0.035] p-4">
          <CheckCircle2
            size={16}
            className="mt-0.5 shrink-0 text-emerald-400"
          />

          <div>
            <p className="text-sm font-medium text-slate-300">
              Verified behavior
            </p>

            <p className="mt-1 text-sm leading-6 text-slate-500">
              The calculator tool executes and the agent continues to
              a second step before returning the final response.
            </p>
          </div>
        </div>
      </section>

      {/* 07 */}
      <section className="mt-16">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-emerald-500/60">
            07
          </span>

          <h2 className="font-display text-2xl font-semibold tracking-tight text-white md:text-3xl">
            Good tool design
          </h2>
        </div>

        <div className="mt-7 grid gap-4 md:grid-cols-2">
          <FeatureCard title="Keep descriptions clear">
            Tell the model exactly what the tool does and when it
            should be used.
          </FeatureCard>

          <FeatureCard title="Keep schemas precise">
            Define only the arguments the function actually needs.
          </FeatureCard>

          <FeatureCard title="Keep tools focused">
            A tool should generally perform one well-defined action.
          </FeatureCard>

          <FeatureCard title="Handle failures">
            Tool execution can fail, so external operations should
            handle errors appropriately.
          </FeatureCard>
        </div>
      </section>

      {/* Next */}
      <section className="mt-16 rounded-2xl border border-emerald-500/15 bg-emerald-500/[0.025] p-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-emerald-500/70">
          NEXT STEP
        </p>

        <h3 className="mt-3 font-display text-lg font-semibold text-white">
          Add guardrails
        </h3>

        <p className="mt-2 text-sm leading-7 text-slate-500">
          Tools give agents capabilities. Guardrails let you control
          what enters and leaves the agent runtime.
        </p>
      </section>
    </>
  );
}