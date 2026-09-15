import SectionIntro from "../components/docs/SectionIntro";
import CodeBlock from "../components/docs/CodeBlock";
import FeatureCard from "../components/docs/FeatureCard";

export default function StructuredOutput() {
  return (
    <>
      <SectionIntro
        label="STRUCTURED OUTPUT"
        title="Structured Output"
        description="Validate model responses against a schema before returning them to your application."
      />

      <p className="mt-6 leading-7 text-slate-400">
        When an output schema is configured, Maya-Agent parses the
        model response and validates it before treating the result as
        successful output.
      </p>

      <CodeBlock>
{`const agent = new Agent({
  name: "Extractor",
  instructions:
    "Extract structured information.",
  model: "gpt-4.1-mini",
  outputSchema: personSchema,
});

const result = await agent.run(
  "John is 28 years old."
);`}
      </CodeBlock>

      <h2 className="mt-10 text-2xl font-semibold">
        Validation
      </h2>

      <FeatureCard title="JSON parsing">
        The model response must contain valid JSON when structured
        output is requested.
      </FeatureCard>

      <FeatureCard title="Schema validation">
        The parsed response is validated against the configured schema.
      </FeatureCard>

      <FeatureCard title="Safe failure">
        Invalid output results in an OutputValidationError rather than
        silently returning malformed data.
      </FeatureCard>
    </>
  );
}