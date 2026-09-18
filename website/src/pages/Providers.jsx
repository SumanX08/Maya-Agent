import SectionIntro from "../components/docs/SectionIntro";
import CodeBlock from "../components/docs/CodeBlock";
import FeatureCard from "../components/docs/FeatureCard";

export default function Providers() {
  return (
    <div>
      <SectionIntro
        eyebrow="Runtime"
        title="Providers"
        description="Maya-Agent separates agent logic from model providers, so the same agent runtime can work with different LLM backends."
      />

      {/* Overview */}
      <section className="mt-12">
        <h2 className="font-display text-2xl font-semibold text-white">
          Provider abstraction
        </h2>

        <p className="mt-4 max-w-3xl text-[15px] leading-7 text-slate-400">
          Providers implement the model interface used by Maya-Agent. Your
          agent works with a provider without needing to know how the underlying
          model API is called.
        </p>

        <div className="mt-7 grid gap-4 md:grid-cols-2">
          <FeatureCard
            title="OpenAI"
            description="Use OpenAI models through OpenAIProvider."
          />

          <FeatureCard
            title="Gemini"
            description="Use Google Gemini models through GeminiProvider."
          />
        </div>
      </section>

      {/* OpenAI */}
      <section className="mt-16">
        <h2 className="font-display text-2xl font-semibold text-white">
          OpenAI
        </h2>

        <p className="mt-4 max-w-3xl text-[15px] leading-7 text-slate-400">
          Configure an OpenAI provider with your API key and model name.
          Maya-Agent reads the API key from the environment.
        </p>

        <CodeBlock language="env">
          {`OPENAI_API_KEY=your_api_key`}
        </CodeBlock>

        <CodeBlock language="javascript">
          {`import "dotenv/config";
import { OpenAIProvider } from "maya-agent";

const model = new OpenAIProvider({
  model: "gpt-4.1-mini",
});

console.log(model.model);`}
        </CodeBlock>

        <p className="mt-4 text-sm leading-6 text-slate-500">
          If the API key is not configured, the provider throws an error when
          initialized.
        </p>
      </section>

      {/* Gemini */}
      <section className="mt-16">
        <h2 className="font-display text-2xl font-semibold text-white">
          Gemini
        </h2>

        <p className="mt-4 max-w-3xl text-[15px] leading-7 text-slate-400">
          Gemini can be used through the same provider abstraction. Configure
          the Gemini API key and select the model you want to use.
        </p>

        <CodeBlock language="env">
          {`GEMINI_API_KEY=your_api_key`}
        </CodeBlock>

        <CodeBlock language="javascript">
          {`import "dotenv/config";
import { GeminiProvider } from "maya-agent";

const model = new GeminiProvider({
  model: "gemini-3.6-flash",
});

console.log(model.model);`}
        </CodeBlock>
      </section>

      {/* Direct generation */}
      <section className="mt-16">
        <h2 className="font-display text-2xl font-semibold text-white">
          Generate directly
        </h2>

        <p className="mt-4 max-w-3xl text-[15px] leading-7 text-slate-400">
          Providers can also be used directly without creating an Agent. Both
          providers expose the same generation interface.
        </p>

        <CodeBlock language="javascript">
          {`const result = await model.generate({
  instructions: "You are a concise assistant.",
  messages: [
    {
      role: "user",
      content: "What is an AI agent? Answer in one sentence.",
    },
  ],
});

console.log(result.output);`}
        </CodeBlock>
      </section>

      {/* Same interface */}
      <section className="mt-16">
        <h2 className="font-display text-2xl font-semibold text-white">
          Same agent, different provider
        </h2>

        <p className="mt-4 max-w-3xl text-[15px] leading-7 text-slate-400">
          Because the agent depends on the provider abstraction, switching
          between supported providers only requires changing the model
          instance.
        </p>

        <CodeBlock language="javascript">
          {`import {
  Agent,
  OpenAIProvider,
  GeminiProvider,
} from "maya-agent";

const model = new OpenAIProvider({
  model: "gpt-4.1-mini",
});

// You can switch the provider without changing the Agent API.
// const model = new GeminiProvider({
//   model: "gemini-3.6-flash",
// });

const agent = new Agent({
  name: "Assistant",
  instructions: "You are a helpful assistant.",
  model,
});

const result = await agent.run(
  "Explain retrieval augmented generation."
);

console.log(result.output);`}
        </CodeBlock>
      </section>

      {/* Provider contract */}
      <section className="mt-16">
        <h2 className="font-display text-2xl font-semibold text-white">
          Provider contract
        </h2>

        <p className="mt-4 max-w-3xl text-[15px] leading-7 text-slate-400">
          Custom providers can implement the model provider interface and plug
          into the same agent runtime.
        </p>

        <CodeBlock language="javascript">
          {`import { ModelProvider } from "maya-agent";

class CustomProvider extends ModelProvider {
  async generate({ instructions, messages }) {
    // Call your model API here.
  }

  async stream({ instructions, messages }) {
    // Return a streaming response.
  }
}`}
        </CodeBlock>
      </section>

      {/* Verified */}
      <section className="mt-16">
        <div className="rounded-xl border border-emerald-500/15 bg-emerald-500/[0.03] p-6">
          <div className="font-mono text-[11px] uppercase tracking-wider text-emerald-500">
            Verified
          </div>

          <h3 className="mt-3 font-display text-lg font-semibold text-white">
            OpenAI + Gemini tested
          </h3>

          <p className="mt-2 text-sm leading-6 text-slate-400">
            Both providers were tested directly from a consumer project
            installed with the published{" "}
            <span className="font-mono text-slate-300">maya-agent</span>{" "}
            package.
          </p>
        </div>
      </section>
    </div>
  );
}