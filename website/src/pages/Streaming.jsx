import { Radio, Terminal, MessageSquare, Zap } from "lucide-react";

import SectionIntro from "../components/docs/SectionIntro";
import FeatureCard from "../components/docs/FeatureCard";
import CodeBlock from "../components/docs/CodeBlock";

export default function Streaming() {
  return (
    <article>
      <SectionIntro
        label="Streaming"
        title="Streaming"
        description="Observe model output incrementally through Maya-Agent's event system."
      />

      {/* Overview */}
      <section className="space-y-5">
        <p className="text-[15px] leading-8 text-slate-400">
          Streaming allows applications to receive model output while
          generation is still in progress instead of waiting for the complete
          response.
        </p>

        <p className="text-[15px] leading-8 text-slate-400">
          Maya-Agent exposes streaming through its runtime event system, making
          it possible to build responsive chat interfaces, CLI applications,
          progress indicators, and other interactive agent experiences.
        </p>
      </section>

      {/* How it works */}
      <section className="mt-14">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-emerald-500/20 bg-emerald-500/5">
            <Radio size={15} className="text-emerald-400" />
          </div>

          <h2 className="text-xl font-semibold text-white">
            How it works
          </h2>
        </div>

        <p className="text-[15px] leading-8 text-slate-400">
          As the configured model provider produces output, Maya-Agent emits
          streaming events through the runtime event bus. Applications can
          subscribe to these events and process each piece of output as it
          arrives.
        </p>

        <CodeBlock>
{`eventBus.on("run.stream", (event) => {
  if (event.type === "text.delta") {
    process.stdout.write(event.delta);
  }
});`}
        </CodeBlock>
      </section>

      {/* Event flow */}
      <section className="mt-14">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-emerald-500/20 bg-emerald-500/5">
            <Zap size={15} className="text-emerald-400" />
          </div>

          <h2 className="text-xl font-semibold text-white">
            Event-driven output
          </h2>
        </div>

        <p className="mb-6 text-[15px] leading-8 text-slate-400">
          The event system keeps streaming separate from application logic.
          Consumers can decide how each event should be displayed, stored, or
          forwarded.
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          <FeatureCard title="text.delta">
            Incremental text produced during model generation.
          </FeatureCard>

          <FeatureCard title="Runtime events">
            Subscribe to the agent runtime and react to output as it arrives.
          </FeatureCard>
        </div>
      </section>

      {/* CLI example */}
      <section className="mt-14">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-emerald-500/20 bg-emerald-500/5">
            <Terminal size={15} className="text-emerald-400" />
          </div>

          <h2 className="text-xl font-semibold text-white">
            CLI streaming
          </h2>
        </div>

        <p className="text-[15px] leading-8 text-slate-400">
          A CLI application can write each incoming text delta directly to
          standard output, creating a live response experience.
        </p>

        <CodeBlock>
{`eventBus.on("run.stream", ({ type, delta }) => {
  if (type !== "text.delta") return;

  process.stdout.write(delta);
});`}
        </CodeBlock>
      </section>

      {/* Use cases */}
      <section className="mt-14">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-emerald-500/20 bg-emerald-500/5">
            <MessageSquare size={15} className="text-emerald-400" />
          </div>

          <h2 className="text-xl font-semibold text-white">
            Common use cases
          </h2>
        </div>

        <div className="space-y-3">
          <FeatureCard title="Chat interfaces">
            Display responses progressively instead of waiting for the entire
            generation to finish.
          </FeatureCard>

          <FeatureCard title="CLI applications">
            Stream generated output directly to the terminal.
          </FeatureCard>

          <FeatureCard title="Progress indicators">
            React to runtime events while an agent is executing.
          </FeatureCard>

          <FeatureCard title="Interactive agents">
            Build interfaces that respond immediately to model activity.
          </FeatureCard>
        </div>
      </section>

      {/* Note */}
      <div className="mt-14 rounded-xl border border-emerald-500/15 bg-emerald-500/[0.035] p-5">
        <p className="text-sm font-medium text-emerald-400">
          Streaming is event-driven
        </p>

        <p className="mt-2 text-sm leading-7 text-slate-500">
          Your application controls how streamed events are consumed. This
          keeps the runtime flexible while allowing different interfaces to
          build their own streaming experience.
        </p>
      </div>
    </article>
  );
}