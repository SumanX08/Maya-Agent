import SectionIntro from "../components/docs/SectionIntro";
import CodeBlock from "../components/docs/CodeBlock";

export default function Installation() {
  return (
    <>
      <SectionIntro
        label="INSTALLATION"
        title="Installation"
        description="Install Maya-Agent directly from npm and configure your model provider."
      />

      <CodeBlock>
        npm install maya-agent
      </CodeBlock>

      <h2 className="mt-10 text-2xl font-semibold">
        Environment variables
      </h2>

      <p className="mt-4 leading-7 text-slate-400">
        Configure the API key required by the model provider
        you are using.
      </p>

      <CodeBlock>
{`OPENAI_API_KEY=your_api_key
GOOGLE_API_KEY=your_api_key`}
      </CodeBlock>
    </>
  );
}