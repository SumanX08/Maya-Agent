import SectionIntro from "../components/docs/SectionIntro";

export default function Introduction() {
  return (
    <>
      <SectionIntro
        label="INTRODUCTION"
        title="Maya-Agent"
        description="An open-source JavaScript SDK for building reliable AI agents with tools, memory, guardrails, handoffs, graph intelligence, and observability."
      />

      <div className="my-10 h-px bg-emerald-500/10" />

      <h2 className="text-2xl font-semibold">
        Build agents. Own the runtime.
      </h2>

      <p className="mt-4 leading-7 text-slate-400">
        Maya-Agent provides the core runtime primitives required
        to build agentic applications without hiding the execution
        loop behind another agent framework.
      </p>

      <h2 className="mt-12 text-2xl font-semibold">
        Why Maya-Agent?
      </h2>

      <p className="mt-4 leading-7 text-slate-400">
        The SDK gives developers direct control over agent
        execution while providing production-oriented capabilities
        such as tool calling, retries, guardrails, persistent
        memory, graph memory, handoffs, events, and tracing.
      </p>

      <div className="mt-10 rounded-xl border border-emerald-500/15 bg-emerald-500/[0.03] p-5">
        <p className="text-sm leading-6 text-slate-400">
          <span className="font-semibold text-emerald-400">
            Philosophy:
          </span>{" "}
          keep the runtime visible, composable, and extensible.
        </p>
      </div>
    </>
  );
}