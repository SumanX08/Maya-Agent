import SectionIntro from "../components/docs/SectionIntro";
import CodeBlock from "../components/docs/CodeBlock";
import FeatureCard from "../components/docs/FeatureCard";

export default function Agents() {
  return (
    <>
      <SectionIntro
        label="AGENTS"
        title="Agents"
        description="Agents define the instructions, model, capabilities, and runtime behavior of an AI worker."
      />

      <CodeBlock>
{`const agent = new Agent({
  name: "Research Agent",
  instructions:
    "You are a helpful research assistant.",
  model: "gpt-4.1-mini",
});`}
      </CodeBlock>

      <h2 className="mt-10 text-2xl font-semibold">
        Running an agent
      </h2>

      <CodeBlock>
{`const result = await agent.run(
  "Research the history of neural networks."
);

console.log(result);`}
      </CodeBlock>

      <h2 className="mt-10 text-2xl font-semibold">
        Runtime controls
      </h2>

      <FeatureCard title="Instructions">
        Define the agent's behavior, role, and task-specific
        constraints.
      </FeatureCard>

      <FeatureCard title="Model">
        Select the model or provider used by the agent.
      </FeatureCard>

      <FeatureCard title="Max steps">
        Limits how many iterations the runtime can execute.
      </FeatureCard>

      <FeatureCard title="Timeouts and retries">
        Protect model calls from hanging indefinitely and retry
        transient failures.
      </FeatureCard>
    </>
  );
}