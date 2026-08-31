const leftLabels = [
  "Input Guard",
  "Graph Retrieval",
  "Output Guard",
];

const rightLabels = [
  "Memory",
  "Handoffs",
  "Retries",
];

const flowSteps = [
  "User Input",
  "Agent Runtime",
  "LLM Call",
  "Tool Execution",
  "Tool Results",
  "Final Output",
];

export default function AgentFlow() {
  return (
    <section className="relative overflow-hidden border-t border-emerald-500/10 bg-[#060a09] px-6 py-24">
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(rgba(34,197,94,0.25) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <p className="mb-4 font-mono text-xs font-semibold tracking-[0.25em] text-emerald-400">
            AGENT FLOW
          </p>

          <h2 className="text-4xl font-bold text-white md:text-5xl">
            Transparent by design.
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-slate-400">
            Every step of the agent execution loop is inspectable,
            interruptible, and extensible.
          </p>
        </div>

        <div className="mx-auto grid max-w-4xl grid-cols-1 items-center gap-8 md:grid-cols-[1fr_280px_1fr]">
          <div className="hidden flex-col gap-10 md:flex">
            {leftLabels.map((item) => (
              <div
                key={item}
                className="flex items-center justify-end gap-3 font-mono text-xs text-slate-500"
              >
                <span>{item}</span>
                <span className="h-px w-16 bg-emerald-500/20" />
                <span className="h-1.5 w-1.5 rounded-full border border-emerald-400/40" />
              </div>
            ))}
          </div>

          <div className="flex flex-col items-center">
            {flowSteps.map((step, index) => (
              <div key={step} className="flex flex-col items-center">
                <div
                  className={`flex h-11 w-56 items-center justify-center rounded-xl border text-sm font-semibold ${
                    index === 1
                      ? "border-emerald-400 bg-emerald-500/10 text-emerald-300 shadow-[0_0_30px_rgba(34,197,94,0.12)]"
                      : "border-white/10 bg-[#0c1311] text-slate-300"
                  }`}
                >
                  {step}
                </div>

                {index !== flowSteps.length - 1 && (
                  <div className="h-8 w-px bg-emerald-400/40" />
                )}
              </div>
            ))}
          </div>

          <div className="hidden flex-col gap-10 md:flex">
            {rightLabels.map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 font-mono text-xs text-slate-500"
              >
                <span className="h-1.5 w-1.5 rounded-full border border-emerald-400/40" />
                <span className="h-px w-16 bg-emerald-500/20" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}