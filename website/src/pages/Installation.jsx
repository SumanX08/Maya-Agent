import { CheckCircle2, Info } from "lucide-react";

import SectionIntro from "../components/docs/SectionIntro";
import CodeBlock from "../components/docs/CodeBlock";
import FeatureCard from "../components/docs/FeatureCard";

export default function Installation() {
  return (
    <>
      <SectionIntro
        label="INSTALLATION"
        title="Installation"
        description="Install Maya-Agent, configure a model provider, and verify that your environment is ready to build your first agent."
      />

      <div className="my-12 h-px bg-emerald-500/10" />

      {/* 01 — Install */}
      <section>
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-emerald-500/60">
            01
          </span>

          <h2 className="font-display text-2xl font-semibold tracking-tight text-white md:text-3xl">
            Install Maya-Agent
          </h2>
        </div>

        <p className="mt-5 text-[15px] leading-8 text-slate-400">
          Maya-Agent is distributed as an npm package. Install it in
          your JavaScript or Node.js project:
        </p>

        <CodeBlock language="bash">
          npm install maya-agent
        </CodeBlock>

        <p className="text-sm leading-7 text-slate-500">
          The package is published as an ES module. Use it from a
          modern Node.js project with ESM imports.
        </p>
      </section>

      {/* 02 — Provider */}
      <section className="mt-16">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-emerald-500/60">
            02
          </span>

          <h2 className="font-display text-2xl font-semibold tracking-tight text-white md:text-3xl">
            Choose a model provider
          </h2>
        </div>

        <p className="mt-5 text-[15px] leading-8 text-slate-400">
          Maya-Agent separates the agent runtime from the model
          provider. The SDK currently includes providers for OpenAI
          and Google Gemini.
        </p>

        <div className="mt-7 grid gap-4 md:grid-cols-2">
          <FeatureCard title="OpenAI">
            Use the built-in OpenAIProvider. It reads
            OPENAI_API_KEY from the environment and defaults to
            gpt-4.1-mini.
          </FeatureCard>

          <FeatureCard title="Google Gemini">
            Use the built-in GeminiProvider. It reads
            GEMINI_API_KEY from the environment and defaults to
            gemini-3.6-flash.
          </FeatureCard>
        </div>
      </section>

      {/* 03 — Environment */}
      <section className="mt-16">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-emerald-500/60">
            03
          </span>

          <h2 className="font-display text-2xl font-semibold tracking-tight text-white md:text-3xl">
            Configure environment variables
          </h2>
        </div>

        <p className="mt-5 text-[15px] leading-8 text-slate-400">
          Create a{" "}
          <code className="text-emerald-400">.env</code> file in the
          root of your application and add the API key for the
          provider you want to use.
        </p>

        <CodeBlock language="env">
{`# OpenAI
OPENAI_API_KEY=your_openai_api_key

# Google Gemini
GEMINI_API_KEY=your_gemini_api_key`}
        </CodeBlock>

        <div className="mt-6 flex gap-3 rounded-xl border border-emerald-500/15 bg-emerald-500/[0.035] p-4">
          <Info
            size={16}
            className="mt-0.5 shrink-0 text-emerald-400"
          />

          <p className="text-sm leading-6 text-slate-400">
            You only need the API key for the provider you are
            using. Never commit your{" "}
            <code className="text-slate-300">.env</code> file or API
            keys to source control.
          </p>
        </div>
      </section>

      {/* 04 — dotenv */}
      <section className="mt-16">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-emerald-500/60">
            04
          </span>

          <h2 className="font-display text-2xl font-semibold tracking-tight text-white md:text-3xl">
            Load your environment
          </h2>
        </div>

        <p className="mt-5 text-[15px] leading-8 text-slate-400">
          Maya-Agent includes{" "}
          <code className="text-emerald-400">dotenv</code> as a
          package dependency, so you do not need to install it
          separately.
        </p>

        <p className="mt-4 text-[15px] leading-8 text-slate-400">
          In your application entry point, load the{" "}
          <code className="text-emerald-400">.env</code> file before
          creating the provider:
        </p>

        <CodeBlock language="javascript">
{`import "dotenv/config";

import { OpenAIProvider } from "maya-agent";

const model = new OpenAIProvider({
  model: "gpt-4.1-mini",
});`}
        </CodeBlock>

        <p className="text-sm leading-7 text-slate-500">
          For Gemini, replace{" "}
          <code className="text-slate-300">OpenAIProvider</code> with{" "}
          <code className="text-slate-300">GeminiProvider</code>:
        </p>

        <CodeBlock language="javascript">
{`import "dotenv/config";

import { GeminiProvider } from "maya-agent";

const model = new GeminiProvider({
  model: "gemini-3.6-flash",
});`}
        </CodeBlock>
      </section>

      {/* 05 — Neo4j */}
      <section className="mt-16">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-emerald-500/60">
            05
          </span>

          <h2 className="font-display text-2xl font-semibold tracking-tight text-white md:text-3xl">
            Optional: Neo4j
          </h2>
        </div>

        <p className="mt-5 text-[15px] leading-8 text-slate-400">
          Neo4j is only required when using Maya-Agent's graph
          capabilities. Basic agent execution does not require a
          Neo4j database.
        </p>

        <p className="mt-4 text-[15px] leading-8 text-slate-400">
          If you are using{" "}
          <code className="text-emerald-400">GraphClient</code> or
          graph memory, configure the connection with:
        </p>

        <CodeBlock language="env">
{`NEO4J_URI=neo4j://localhost:7687
NEO4J_USERNAME=neo4j
NEO4J_PASSWORD=your_password

# Optional — defaults to "neo4j"
NEO4J_DATABASE=neo4j`}
        </CodeBlock>

        <p className="text-sm leading-7 text-slate-500">
          Neo4j configuration is covered in detail in the{" "}
          <span className="text-slate-300">Graph Memory</span>{" "}
          section.
        </p>
      </section>

      {/* 06 — Verify */}
      <section className="mt-16">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-emerald-500/60">
            06
          </span>

          <h2 className="font-display text-2xl font-semibold tracking-tight text-white md:text-3xl">
            Verify the installation
          </h2>
        </div>

        <p className="mt-5 text-[15px] leading-8 text-slate-400">
          Once your API key is configured, initialize a provider to
          verify that Maya-Agent can read your environment and create
          the underlying model client.
        </p>

        <CodeBlock language="javascript">
{`import "dotenv/config";

import { OpenAIProvider } from "maya-agent";

const model = new OpenAIProvider({
  model: "gpt-4.1-mini",
});

console.log("Provider:", model.model);`}
        </CodeBlock>

        <div className="mt-6 flex items-start gap-3 rounded-xl border border-white/[0.07] bg-white/[0.02] p-4">
          <CheckCircle2
            size={16}
            className="mt-0.5 shrink-0 text-emerald-400"
          />

          <div>
            <p className="text-sm font-medium text-slate-300">
              Expected result
            </p>

            <p className="mt-1 text-sm leading-6 text-slate-500">
              The script should print the configured model name:
            </p>

            <code className="mt-2 block font-mono text-xs text-emerald-400/80">
              Provider: gpt-4.1-mini
            </code>
          </div>
        </div>

        <div className="mt-4 rounded-xl border border-white/[0.07] bg-white/[0.02] p-4">
          <p className="text-sm leading-6 text-slate-500">
            If the API key is missing, the provider constructor
            throws an error such as{" "}
            <code className="text-slate-300">
              OPENAI_API_KEY is not configured
            </code>
            .
          </p>
        </div>
      </section>

      {/* 07 — Security */}
      <section className="mt-16">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-emerald-500/60">
            07
          </span>

          <h2 className="font-display text-2xl font-semibold tracking-tight text-white md:text-3xl">
            Keep your keys secure
          </h2>
        </div>

        <p className="mt-5 text-[15px] leading-8 text-slate-400">
          Add your environment file to{" "}
          <code className="text-emerald-400">.gitignore</code>:
        </p>

        <CodeBlock language="gitignore">
          .env
        </CodeBlock>

        <p className="text-sm leading-7 text-slate-500">
          API keys should remain on the server side and should never
          be exposed in browser-side application code.
        </p>
      </section>

      {/* Next */}
      <section className="mt-16 rounded-2xl border border-emerald-500/15 bg-emerald-500/[0.025] p-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-emerald-500/70">
          NEXT STEP
        </p>

        <h3 className="mt-3 font-display text-lg font-semibold text-white">
          Build your first agent
        </h3>

        <p className="mt-2 text-sm leading-7 text-slate-500">
          Your provider is configured. Continue to Quick Start to
          create an Agent and run your first request.
        </p>
      </section>
    </>
  );
}