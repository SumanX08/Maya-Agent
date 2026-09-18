import {
  Brain,
  Boxes,
  GitBranch,
  Radio,
  ShieldCheck,
  Wrench,
} from "lucide-react";

import SectionIntro from "../components/docs/SectionIntro";
import FeatureCard from "../components/docs/FeatureCard";

const capabilities = [
  {
    icon: Boxes,
    title: "Agent Runtime",
    description:
      "Create agents with instructions, models, tools, sessions, guardrails, handoffs, and configurable execution limits.",
  },
  {
    icon: Wrench,
    title: "Tools",
    description:
      "Give agents capabilities through validated function tools and let the runtime handle tool execution.",
  },
  {
    icon: Brain,
    title: "Memory",
    description:
      "Maintain conversation state with sessions and extend it with persistent graph-based memory.",
  },
  {
    icon: ShieldCheck,
    title: "Guardrails",
    description:
      "Validate input, tool execution, and model output at explicit points in the agent lifecycle.",
  },
  {
    icon: GitBranch,
    title: "Agent Handoffs",
    description:
      "Route work between specialized agents while keeping handoff execution inside the runtime.",
  },
  {
    icon: Radio,
    title: "Events & Tracing",
    description:
      "Observe agent execution through an event-driven architecture and trace collection.",
  },
];

export default function Introduction() {
  return (
    <>
      <SectionIntro
        label="INTRODUCTION"
        title="Maya-Agent"
        description="An open-source JavaScript SDK for building AI agents with tools, memory, guardrails, handoffs, structured output, streaming, tracing, and reliability features."
      />

      <div className="my-12 h-px bg-emerald-500/10" />

      <section>
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-emerald-500/60">
            01
          </span>

          <h2 className="font-display text-2xl font-semibold tracking-tight text-white md:text-3xl">
            Build agents. Own the runtime.
          </h2>
        </div>

        <div className="mt-5 space-y-4 text-[15px] leading-8 text-slate-400">
          <p>
            Maya-Agent is an open-source JavaScript SDK built from
            scratch for understanding and building AI agent systems.
            Instead of hiding the execution model behind a large
            abstraction, the SDK exposes the core pieces that make an
            agent run.
          </p>

          <p>
            An agent can combine a model with tools, sessions,
            guardrails, memory, handoffs, background workers, and
            runtime events. These pieces are designed to remain
            modular so they can be composed around the needs of an
            application.
          </p>
        </div>
      </section>

      <section className="mt-16">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-emerald-500/60">
            02
          </span>

          <h2 className="font-display text-2xl font-semibold tracking-tight text-white md:text-3xl">
            What you can build with it
          </h2>
        </div>

        <p className="mt-5 max-w-2xl text-[15px] leading-8 text-slate-400">
          Maya-Agent provides the building blocks for applications
          that need more than a single model call.
        </p>

        <div className="mt-7 grid gap-4 md:grid-cols-2">
          {capabilities.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="group relative overflow-hidden rounded-xl border border-white/[0.08] bg-[#080d0b] p-5 transition duration-300 hover:border-emerald-500/25"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-emerald-500/15 bg-emerald-500/[0.05]">
                    <Icon
                      size={16}
                      className="text-emerald-400/80"
                    />
                  </div>

                  <div>
                    <h3 className="font-display text-sm font-semibold text-white">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mt-16">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-emerald-500/60">
            03
          </span>

          <h2 className="font-display text-2xl font-semibold tracking-tight text-white md:text-3xl">
            The core idea
          </h2>
        </div>

        <p className="mt-5 text-[15px] leading-8 text-slate-400">
          The goal is not to provide a black-box agent abstraction.
          Maya-Agent is designed around understandable runtime
          primitives that can be inspected, composed, and extended.
        </p>

        <div className="mt-7 overflow-hidden rounded-xl border border-emerald-500/15 bg-emerald-500/[0.03]">
          <div className="border-b border-emerald-500/10 px-5 py-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-emerald-500/60">
              Philosophy
            </span>
          </div>

          <div className="px-5 py-6">
            <p className="font-display text-lg font-medium leading-8 text-slate-200">
              Keep the runtime visible, composable, and extensible.
            </p>

            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-500">
              Each capability has a defined place in the runtime,
              making it easier to understand how an agent executes and
              how individual components can be replaced or extended.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-16">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-emerald-500/60">
            04
          </span>

          <h2 className="font-display text-2xl font-semibold tracking-tight text-white md:text-3xl">
            Where to go next
          </h2>
        </div>

        <div className="mt-5">
          <FeatureCard title="Start with Installation">
            Install Maya-Agent and configure the model provider before
            creating your first agent.
          </FeatureCard>

          <FeatureCard title="Then build an Agent">
            Learn the Agent configuration, execution lifecycle, and
            how sessions and runtime options fit together.
          </FeatureCard>

          <FeatureCard title="Add capabilities">
            Continue with tools, guardrails, memory, handoffs, and the
            runtime features as your agent grows.
          </FeatureCard>
        </div>
      </section>
    </>
  );
}