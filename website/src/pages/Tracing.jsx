import SectionIntro from "../components/docs/SectionIntro";
import FeatureCard from "../components/docs/FeatureCard";

export default function Tracing() {
  return (
    <>
      <SectionIntro
        label="TRACING"
        title="Tracing & Events"
        description="Observe agent execution through structured runtime events and trace collection."
      />

      <h2 className="mt-10 text-2xl font-semibold">
        Event system
      </h2>

      <p className="mt-4 leading-7 text-slate-400">
        Maya-Agent exposes runtime events for important execution
        stages, allowing applications to observe what the agent is
        doing.
      </p>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {[
          "run.stream",
          "run.retry",
          "guardrail.triggered",
          "handoff.started",
          "handoff.completed",
          "handoff.failed",
        ].map((event) => (
          <div
            key={event}
            className="rounded-lg border border-emerald-500/10 bg-[#0a100e] p-4"
          >
            <code className="text-sm text-emerald-400">
              {event}
            </code>
          </div>
        ))}
      </div>

      <h2 className="mt-10 text-2xl font-semibold">
        Trace collection
      </h2>

      <FeatureCard title="TraceCollector">
        Collect execution information so applications can inspect
        runtime behavior and reliability.
      </FeatureCard>

      <FeatureCard title="Retries">
        Retry events expose useful information about failed model
        attempts and retry behavior.
      </FeatureCard>
    </>
  );
}