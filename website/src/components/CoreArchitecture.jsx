import {
  Bot,
  Wrench,
  ShieldCheck,
  GitBranch,
  Database,
  Network,
  Layers,
  Code2,
  Activity,
  Eye,
  Globe,
} from "lucide-react";

const features = [
  {
    title: "Agent Runtime",
    description: "Custom loop. Full lifecycle control.",
    icon: Bot,
  },
  {
    title: "Tool Calling",
    description: "Sync and async tools with typed parameters.",
    icon: Wrench,
  },
  {
    title: "Guardrails",
    description: "Input, output, and tool-level safety checks.",
    icon: ShieldCheck,
  },
  {
    title: "Handoffs",
    description: "Multi-agent orchestration and delegation.",
    icon: GitBranch,
  },
  {
    title: "Session & Memory",
    description: "Persistent context across conversations.",
    icon: Database,
  },
  {
    title: "Graph Memory",
    description: "Relationship-aware long-term intelligence.",
    icon: Network,
  },
  {
    title: "Background Workers",
    description: "Three independent graph processing threads.",
    icon: Layers,
  },
  {
    title: "Structured Output",
    description: "Validated strongly structured responses.",
    icon: Code2,
  },
  {
    title: "Streaming & Events",
    description: "Real-time runtime event subscriptions.",
    icon: Activity,
  },
  {
    title: "Tracing",
    description: "Full observability into every agent step.",
    icon: Eye,
  },
  {
    title: "Model Providers",
    description: "OpenAI, Gemini, and extensible adapters.",
    icon: Globe,
  },
];

export default function CoreArchitecture() {
  return (
    <section className="relative overflow-hidden border-t border-emerald-500/10 bg-[#070b0a] px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 text-center">
          <p className="mb-4 font-mono text-xs font-semibold tracking-[0.25em] text-emerald-400">
            CORE ARCHITECTURE
          </p>

          <h2 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
            One runtime. Everything an agent needs.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-400">
            Every primitive required for production-grade AI agents, built as
            first-class concepts in the SDK — not bolted on.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="group rounded-xl border border-emerald-500/15 bg-[#0b1210] p-6 transition duration-300 hover:-translate-y-1 hover:border-emerald-400/40 hover:bg-[#0d1714]"
              >
                <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-lg border border-emerald-500/20 bg-emerald-500/5">
                  <Icon
                    size={18}
                    className="text-emerald-400"
                  />
                </div>

                <h3 className="text-sm font-semibold text-white">
                  {feature.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}