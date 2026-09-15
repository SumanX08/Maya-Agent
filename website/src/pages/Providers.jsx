import SectionIntro from "../components/docs/SectionIntro";
import CodeBlock from "../components/docs/CodeBlock";
import FeatureCard from "../components/docs/FeatureCard";

export default function Providers() {
  return (
    <>
      <SectionIntro
        label="PROVIDERS"
        title="Model Providers"
        description="Connect the agent runtime to different LLM providers through a provider abstraction."
      />

      <FeatureCard title="OpenAI">
        Use OpenAI models through the built-in OpenAI provider.
      </FeatureCard>

      <CodeBlock>
{`const agent = new Agent({
  name: "Maya",
  instructions: "You are helpful.",
  model: "gpt-4.1-mini",
});`}
      </CodeBlock>

      <FeatureCard title="Google Gemini">
        Maya-Agent also includes a Gemini provider for Google models.
      </FeatureCard>

      <CodeBlock>
{`const model = new GeminiProvider({
  model: "gemini-3.6-flash",
});`}
      </CodeBlock>

      <h2 className="mt-10 text-2xl font-semibold">
        Provider abstraction
      </h2>

      <p className="mt-4 leading-7 text-slate-400">
        Model-specific communication lives inside provider
        implementations while the agent runtime works against a common
        model interface.
      </p>
    </>
  );
}