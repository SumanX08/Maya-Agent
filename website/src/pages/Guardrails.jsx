import SectionIntro from "../components/docs/SectionIntro";
import CodeBlock from "../components/docs/CodeBlock";
import FeatureCard from "../components/docs/FeatureCard";

export default function Guardrails() {
  return (
    <>
      <SectionIntro
        label="GUARDRAILS"
        title="Guardrails"
        description="Control agent execution by validating inputs, tool calls, and outputs."
      />

      <h2 className="mt-10 text-2xl font-semibold">
        Three guardrail stages
      </h2>

      <FeatureCard title="Input guardrails">
        Validate user input before the agent proceeds with execution.
      </FeatureCard>

      <FeatureCard title="Tool guardrails">
        Validate tool calls before the tool is executed.
      </FeatureCard>

      <FeatureCard title="Output guardrails">
        Validate the final model output before it is returned.
      </FeatureCard>

      <h2 className="mt-10 text-2xl font-semibold">
        Example
      </h2>

      <CodeBlock>
{`const safeInput = new Guardrail({
  name: "Safe Input",

  check: async ({ input }) => {
    if (input.includes("blocked")) {
      return {
        passed: false,
        message: "Input is not allowed.",
      };
    }

    return { passed: true };
  },
});`}
      </CodeBlock>

      <p className="mt-4 leading-7 text-slate-400">
        When a guardrail fails, Maya-Agent stops the affected execution
        path and raises a structured guardrail error instead of silently
        continuing.
      </p>
    </>
  );
}