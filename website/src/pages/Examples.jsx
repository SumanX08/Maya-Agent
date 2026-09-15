import SectionIntro from "../components/docs/SectionIntro";
import CodeBlock from "../components/docs/CodeBlock";

export default function Examples() {
  return (
    <>
      <SectionIntro
        label="EXAMPLES"
        title="Examples"
        description="Combine Maya-Agent primitives to build practical agentic workflows."
      />

      <h2 className="mt-10 text-2xl font-semibold">
        Agent with tools
      </h2>

      <CodeBlock>
{`const agent = new Agent({
  name: "Assistant",
  instructions:
    "Use available tools when necessary.",
  model: "gpt-4.1-mini",
  tools: [weatherTool],
});

const result = await agent.run(
  "What's the weather in Delhi?"
);`}
      </CodeBlock>

      <h2 className="mt-10 text-2xl font-semibold">
        Agent with memory
      </h2>

      <CodeBlock>
{`const session = new Session();

session.addMessage({
  role: "user",
  content: "I prefer JavaScript.",
});

const result = await agent.run(
  "What language do I prefer?",
  { session }
);`}
      </CodeBlock>

      <h2 className="mt-10 text-2xl font-semibold">
        Structured extraction
      </h2>

      <CodeBlock>
{`const result = await agent.run(
  "Extract the customer's name and email."
);

console.log(result.output);`}
      </CodeBlock>

      <div className="mt-10 rounded-xl border border-emerald-500/15 bg-emerald-500/3 p-5">
        <p className="text-sm leading-7 text-slate-400">
          Maya-Agent is designed to be composable. Start with a simple
          agent and add tools, memory, guardrails, handoffs, or
          structured output as your application grows.
        </p>
      </div>
    </>
  );
}