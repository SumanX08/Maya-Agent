import SectionIntro from "../components/docs/SectionIntro";
import CodeBlock from "../components/docs/CodeBlock";
import FeatureCard from "../components/docs/FeatureCard";

export default function Streaming() {
  return (
    <>
      <SectionIntro
        label="STREAMING"
        title="Streaming"
        description="Observe model output incrementally through Maya-Agent's event system."
      />

      <p className="mt-6 leading-7 text-slate-400">
        Streaming allows applications to receive output while the
        model is still generating instead of waiting for the entire
        response.
      </p>

      <FeatureCard title="run.stream">
        Streaming data is emitted through the runtime event system as
        the provider produces output.
      </FeatureCard>

      <CodeBlock>
{`eventBus.on("run.stream", (event) => {
  if (event.type === "text.delta") {
    process.stdout.write(event.delta);
  }
});`}
      </CodeBlock>

      <p className="mt-6 leading-7 text-slate-400">
        Streaming is useful for chat interfaces, CLI applications,
        progress indicators, and other interactive agent experiences.
      </p>
    </>
  );
}