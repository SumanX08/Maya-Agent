import SectionIntro from "../components/docs/SectionIntro";
import CodeBlock from "../components/docs/CodeBlock";
import FeatureCard from "../components/docs/FeatureCard";

export default function Handoffs() {
  return (
    <>
      <SectionIntro
        label="HANDOFFS"
        title="Handoffs"
        description="Delegate work between specialized agents while keeping the workflow inside the same runtime."
      />

      <CodeBlock>
{`const researcher = new Agent({
  name: "Researcher",
  instructions:
    "Research technical topics.",
  model: "gpt-4.1-mini",
});

const writer = new Agent({
  name: "Writer",
  instructions:
    "Turn research into clear writing.",
  model: "gpt-4.1-mini",
});`}
      </CodeBlock>

      <h2 className="mt-10 text-2xl font-semibold">
        Why use handoffs?
      </h2>

      <FeatureCard title="Specialization">
        Give different agents focused responsibilities instead of one
        agent handling every task.
      </FeatureCard>

      <FeatureCard title="Shared execution context">
        The handoff can continue from the existing session and
        conversation state.
      </FeatureCard>

      <FeatureCard title="Loop protection">
        Runtime limits prevent uncontrolled agent-to-agent delegation.
      </FeatureCard>

      <p className="mt-8 leading-7 text-slate-400">
        Maya-Agent also exposes handoff lifecycle events so applications
        can observe when delegation starts, completes, or fails.
      </p>
    </>
  );
}