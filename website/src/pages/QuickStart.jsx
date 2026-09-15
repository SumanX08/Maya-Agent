import SectionIntro from "../components/docs/SectionIntro";
import CodeBlock from "../components/docs/CodeBlock";

export default function QuickStart() {
  return (
    <>
      <SectionIntro
        label="QUICK START"
        title="Quick Start"
        description="Create your first Maya-Agent agent in a few lines."
      />

      <CodeBlock>
{`import { Agent } from "maya-agent";

const agent = new Agent({
  name: "Maya",
  instructions: "You are a helpful AI assistant.",
  model: "gpt-4.1-mini",
});

const result = await agent.run(
  "Explain quantum computing"
);

console.log(result);`}
      </CodeBlock>

      <h2 className="mt-10 text-2xl font-semibold">
        Runtime loop
      </h2>

      <p className="mt-4 leading-7 text-slate-400">
        Maya-Agent sends the input to the model, processes tool calls
        when requested, feeds tool results back into the conversation,
        and continues until a final response is produced or the runtime
        reaches its configured limits.
      </p>

      <div className="mt-6 space-y-2">
        {[
          "User input",
          "Model generation",
          "Tool execution",
          "Tool results",
          "Next model step",
          "Final result",
        ].map((step, index) => (
          <div
            key={step}
            className="rounded-lg border border-white/5 bg-white/2 p-4 text-sm text-slate-300"
          >
            <span className="mr-3 font-mono text-emerald-400">
              {String(index + 1).padStart(2, "0")}
            </span>
            {step}
          </div>
        ))}
      </div>
    </>
  );
}