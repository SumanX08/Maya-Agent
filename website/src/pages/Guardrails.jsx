import {
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";

import SectionIntro from "../components/docs/SectionIntro";
import CodeBlock from "../components/docs/CodeBlock";
import FeatureCard from "../components/docs/FeatureCard";

export default function Guardrails() {
  return (
    <>
      <SectionIntro
        label="CORE"
        title="Guardrails"
        description="Validate agent inputs, tool calls, and model outputs with explicit checks around the runtime."
      />

      <div className="my-12 h-px bg-emerald-500/10" />

      {/* 01 */}
      <section>
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-emerald-500/60">
            01
          </span>

          <h2 className="font-display text-2xl font-semibold tracking-tight text-white md:text-3xl">
            What are guardrails?
          </h2>
        </div>

        <p className="mt-5 text-[15px] leading-8 text-slate-400">
          A guardrail is a validation function that runs at a
          specific point in the agent lifecycle. It can allow execution
          to continue or stop it with an explanatory message.
        </p>

        <p className="mt-4 text-[15px] leading-8 text-slate-400">
          Maya-Agent supports three guardrail stages:
        </p>

        <div className="mt-7 grid gap-4 md:grid-cols-3">
          <FeatureCard title="Input">
            Validate user input before the agent begins execution.
          </FeatureCard>

          <FeatureCard title="Tool">
            Validate tool-related execution during the agent loop.
          </FeatureCard>

          <FeatureCard title="Output">
            Validate the final model output before it is returned.
          </FeatureCard>
        </div>
      </section>

      {/* 02 */}
      <section className="mt-16">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-emerald-500/60">
            02
          </span>

          <h2 className="font-display text-2xl font-semibold tracking-tight text-white md:text-3xl">
            Create a guardrail
          </h2>
        </div>

        <p className="mt-5 text-[15px] leading-8 text-slate-400">
          Create a{" "}
          <code className="text-emerald-400">Guardrail</code> with a
          name and a{" "}
          <code className="text-emerald-400">validate</code> function.
        </p>

        <CodeBlock language="javascript">
{`import { Guardrail } from "maya-agent";

const noSecrets = new Guardrail({
  name: "No Secrets",

  validate: async ({ input }) => {
    if (input.toLowerCase().includes("password")) {
      return {
        passed: false,
        message: "Passwords are not allowed.",
      };
    }

    return {
      passed: true,
    };
  },
});`}
        </CodeBlock>

        <div className="mt-7 grid gap-4 md:grid-cols-2">
          <FeatureCard title="name">
            Identifies the guardrail.
          </FeatureCard>

          <FeatureCard title="validate">
            Receives runtime context and determines whether execution
            should continue.
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
            Allow or block execution
          </h2>
        </div>

        <p className="mt-5 text-[15px] leading-8 text-slate-400">
          The validation function can return either a boolean or an
          object containing{" "}
          <code className="text-emerald-400">passed</code> and an
          optional{" "}
          <code className="text-emerald-400">message</code>.
        </p>

        <CodeBlock language="javascript">
{`// Allow
return true;

// Block
return false;`}
        </CodeBlock>

        <p className="mt-4 text-sm leading-7 text-slate-500">
          For a custom failure message, return an object:
        </p>

        <CodeBlock language="javascript">
{`return {
  passed: false,
  message: "Passwords are not allowed.",
};`}
        </CodeBlock>
      </section>

      {/* 04 */}
      <section className="mt-16">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-emerald-500/60">
            04
          </span>

          <h2 className="font-display text-2xl font-semibold tracking-tight text-white md:text-3xl">
            Attach guardrails to an agent
          </h2>
        </div>

        <p className="mt-5 text-[15px] leading-8 text-slate-400">
          Guardrails are grouped by lifecycle stage through the{" "}
          <code className="text-emerald-400">guardrails</code>{" "}
          configuration.
        </p>

        <CodeBlock language="javascript">
{`const agent = new Agent({
  name: "Safe Assistant",
  instructions: "You are a helpful assistant.",
  model,

  guardrails: {
    input: [noSecrets],
    tool: [],
    output: [],
  },
});`}
        </CodeBlock>
      </section>

      {/* 05 */}
      <section className="mt-16">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-emerald-500/60">
            05
          </span>

          <h2 className="font-display text-2xl font-semibold tracking-tight text-white md:text-3xl">
            Input guardrails
          </h2>
        </div>

        <p className="mt-5 text-[15px] leading-8 text-slate-400">
          Input guardrails run before the agent proceeds with model
          execution. They are useful for rejecting requests that
          should not enter the agent runtime.
        </p>

        <CodeBlock language="javascript">
{`const noSecrets = new Guardrail({
  name: "No Secrets",

  validate: async ({ input }) => {
    if (input.toLowerCase().includes("password")) {
      return {
        passed: false,
        message: "Passwords are not allowed.",
      };
    }

    return {
      passed: true,
    };
  },
});`}
        </CodeBlock>

        <div className="mt-6 flex items-start gap-3 rounded-xl border border-emerald-500/15 bg-emerald-500/[0.035] p-4">
          <ShieldCheck
            size={16}
            className="mt-0.5 shrink-0 text-emerald-400"
          />

          <p className="text-sm leading-6 text-slate-400">
            When the guardrail returns{" "}
            <code className="text-slate-300">passed: false</code>,
            the agent execution is stopped and the returned message is
            surfaced as the error.
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
  Guardrail,
  OpenAIProvider,
} from "maya-agent";

const model = new OpenAIProvider({
  model: "gpt-4.1-mini",
});

const noSecrets = new Guardrail({
  name: "No Secrets",

  validate: async ({ input }) => {
    if (input.toLowerCase().includes("password")) {
      return {
        passed: false,
        message: "Passwords are not allowed.",
      };
    }

    return {
      passed: true,
    };
  },
});

const agent = new Agent({
  name: "Safe Assistant",
  instructions: "You are a helpful assistant.",
  model,

  guardrails: {
    input: [noSecrets],
  },
});

try {
  const result = await agent.run(
    "Tell me how to create a password."
  );

  console.log(result.output);
} catch (error) {
  console.log("Guardrail blocked:", error.message);
}`}
        </CodeBlock>

        <div className="mt-6 flex items-start gap-3 rounded-xl border border-emerald-500/15 bg-emerald-500/[0.035] p-4">
          <CheckCircle2
            size={16}
            className="mt-0.5 shrink-0 text-emerald-400"
          />

          <div>
            <p className="text-sm font-medium text-slate-300">
              Verified
            </p>

            <p className="mt-1 text-sm leading-6 text-slate-500">
              The test successfully stopped execution with:
            </p>

            <code className="mt-2 block font-mono text-xs text-emerald-400/80">
              Guardrail blocked: Passwords are not allowed.
            </code>
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
            Guardrail stages
          </h2>
        </div>

        <div className="mt-7 grid gap-4 md:grid-cols-3">
          <FeatureCard title="input">
            Runs against incoming user input.
          </FeatureCard>

          <FeatureCard title="tool">
            Runs around tool execution within the agent runtime.
          </FeatureCard>

          <FeatureCard title="output">
            Runs against the generated agent output.
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
              Connect agents with handoffs
            </h3>

            <p className="mt-2 text-sm leading-7 text-slate-500">
              Handoffs allow an agent to transfer execution to
              another specialized agent.
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