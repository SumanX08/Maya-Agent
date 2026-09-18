import SectionIntro from "../components/docs/SectionIntro";
import CodeBlock from "../components/docs/CodeBlock";
import FeatureCard from "../components/docs/FeatureCard";

export default function StructuredOutput() {
  return (
    <div>
      <SectionIntro
        eyebrow="Runtime"
        title="Structured Output"
        description="Define the shape of an agent's response with Zod and let Maya-Agent validate the model output before returning it."
      />

      {/* Overview */}
      <section className="mt-12">
        <h2 className="font-display text-2xl font-semibold text-white">
          Why structured output?
        </h2>

        <p className="mt-4 max-w-3xl text-[15px] leading-7 text-slate-400">
          Normal model responses are usually plain text. Structured output
          lets you define a predictable data shape for your application.
          Maya-Agent uses a Zod schema to describe and validate that shape.
        </p>

        <div className="mt-7 grid gap-4 md:grid-cols-2">
          <FeatureCard
            title="Schema-first"
            description="Define the expected response shape with Zod."
          />

          <FeatureCard
            title="Runtime validation"
            description="Invalid model output is rejected before it reaches your application."
          />
        </div>
      </section>

      {/* Define schema */}
      <section className="mt-16">
        <h2 className="font-display text-2xl font-semibold text-white">
          Define a schema
        </h2>

        <p className="mt-4 max-w-3xl text-[15px] leading-7 text-slate-400">
          Create a Zod object describing exactly what you want the model to
          return.
        </p>

        <CodeBlock language="javascript">
          {`import { z } from "zod";

const PersonSchema = z.object({
  name: z.string(),
  role: z.string(),
  experience_years: z.number(),
});`}
        </CodeBlock>
      </section>

      {/* Attach to agent */}
      <section className="mt-16">
        <h2 className="font-display text-2xl font-semibold text-white">
          Attach it to an agent
        </h2>

        <p className="mt-4 max-w-3xl text-[15px] leading-7 text-slate-400">
          Pass the schema through the agent's{" "}
          <span className="font-mono text-slate-300">outputSchema</span>{" "}
          option.
        </p>

        <CodeBlock language="javascript">
          {`import {
  Agent,
  OpenAIProvider,
} from "maya-agent";
import { z } from "zod";

const model = new OpenAIProvider({
  model: "gpt-4.1-mini",
});

const PersonSchema = z.object({
  name: z.string(),
  role: z.string(),
  experience_years: z.number(),
});

const agent = new Agent({
  name: "Profile Extractor",
  instructions:
    "Extract the person's profile information.",
  model,
  outputSchema: PersonSchema,
});`}
        </CodeBlock>
      </section>

      {/* Run */}
      <section className="mt-16">
        <h2 className="font-display text-2xl font-semibold text-white">
          Run the agent
        </h2>

        <p className="mt-4 max-w-3xl text-[15px] leading-7 text-slate-400">
          Once the schema is attached, the agent returns structured data
          instead of an unstructured text response.
        </p>

        <CodeBlock language="javascript">
          {`const result = await agent.run(
  "Suman is a software engineer with 2 years of experience."
);

console.log(result.output);`}
        </CodeBlock>
      </section>

      {/* Result */}
      <section className="mt-16">
        <h2 className="font-display text-2xl font-semibold text-white">
          Result
        </h2>

        <CodeBlock language="javascript">
          {`{
  name: "Suman",
  role: "software engineer",
  experience_years: 2
}`}
        </CodeBlock>

        <p className="mt-4 max-w-3xl text-[15px] leading-7 text-slate-400">
          The returned{" "}
          <span className="font-mono text-slate-300">output</span> is a
          JavaScript object that has already been validated against the Zod
          schema.
        </p>
      </section>

      {/* Validation */}
      <section className="mt-16">
        <h2 className="font-display text-2xl font-semibold text-white">
          Validation failures
        </h2>

        <p className="mt-4 max-w-3xl text-[15px] leading-7 text-slate-400">
          If the model returns data that does not match the schema,
          Maya-Agent throws an{" "}
          <span className="font-mono text-slate-300">
            OutputValidationError
          </span>
          .
        </p>

        <CodeBlock language="javascript">
          {`import { OutputValidationError } from "maya-agent";

try {
  const result = await agent.run(input);

  console.log(result.output);
} catch (error) {
  if (error instanceof OutputValidationError) {
    console.log(error.message);
    console.log(error.issues);
    console.log(error.rawOutput);
  }
}`}
        </CodeBlock>

        <p className="mt-4 text-sm leading-6 text-slate-500">
          The error exposes the validation issues along with the raw model
          output, making schema mismatches easier to debug.
        </p>
      </section>

      {/* Providers */}
      <section className="mt-16">
        <h2 className="font-display text-2xl font-semibold text-white">
          Provider support
        </h2>

        <p className="mt-4 max-w-3xl text-[15px] leading-7 text-slate-400">
          Structured output works with the supported OpenAI and Gemini
          providers.
        </p>

        <div className="mt-7 grid gap-4 md:grid-cols-2">
          <FeatureCard
            title="OpenAI"
            description="Uses the provider's structured response format and validates the result with Zod."
          />

          <FeatureCard
            title="Gemini"
            description="Uses Gemini's native JSON structured-output configuration and validates the result with Zod."
          />
        </div>
      </section>

      {/* OpenAI */}
      <section className="mt-16">
        <h2 className="font-display text-2xl font-semibold text-white">
          OpenAI example
        </h2>

        <CodeBlock language="javascript">
          {`const model = new OpenAIProvider({
  model: "gpt-4.1-mini",
});

const agent = new Agent({
  name: "Profile Extractor",
  instructions:
    "Extract the person's profile information.",
  model,
  outputSchema: PersonSchema,
});

const result = await agent.run(
  "Suman is a software engineer with 2 years of experience."
);

console.log(result.output);`}
        </CodeBlock>
      </section>

      {/* Gemini */}
      <section className="mt-16">
        <h2 className="font-display text-2xl font-semibold text-white">
          Gemini example
        </h2>

        <CodeBlock language="javascript">
          {`const model = new GeminiProvider({
  model: "gemini-3.6-flash",
});

const agent = new Agent({
  name: "Profile Extractor",
  instructions:
    "Extract the person's profile information.",
  model,
  outputSchema: PersonSchema,
});

const result = await agent.run(
  "Suman is a software engineer with 2 years of experience."
);

console.log(result.output);`}
        </CodeBlock>

        <p className="mt-4 text-sm leading-6 text-slate-500">
          Maya-Agent converts the Zod schema into Gemini's supported JSON
          schema format before sending the request.
        </p>
      </section>

      {/* Complete example */}
      <section className="mt-16">
        <h2 className="font-display text-2xl font-semibold text-white">
          Complete example
        </h2>

        <CodeBlock language="javascript">
          {`import "dotenv/config";
import {
  Agent,
  OpenAIProvider,
  OutputValidationError,
} from "maya-agent";
import { z } from "zod";

const model = new OpenAIProvider({
  model: "gpt-4.1-mini",
});

const PersonSchema = z.object({
  name: z.string(),
  role: z.string(),
  experience_years: z.number(),
});

const agent = new Agent({
  name: "Profile Extractor",
  instructions:
    "Extract the person's profile information.",
  model,
  outputSchema: PersonSchema,
});

try {
  const result = await agent.run(
    "Suman is a software engineer with 2 years of experience."
  );

  console.log(result.output);
} catch (error) {
  if (error instanceof OutputValidationError) {
    console.error("Validation failed:", error.issues);
  } else {
    throw error;
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
            Structured output was tested from a consumer project using the
            published Maya-Agent package. Both providers returned a validated
            JavaScript object matching the same Zod schema.
          </p>
        </div>
      </section>
    </div>
  );
}