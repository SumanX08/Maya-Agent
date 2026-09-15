import SectionIntro from "../components/docs/SectionIntro";
import CodeBlock from "../components/docs/CodeBlock";
import FeatureCard from "../components/docs/FeatureCard";

export default function Tools() {
  return (
    <>
      <SectionIntro
        label="TOOLS"
        title="Tools"
        description="Extend agents with custom asynchronous functions that can be selected and executed by the model."
      />

      <CodeBlock>
{`const weatherTool = new Tool({
  name: "get_weather",
  description: "Get weather for a city.",

  inputSchema: {
    type: "object",
    properties: {
      city: {
        type: "string",
      },
    },
    required: ["city"],
  },

  execute: async ({ city }) => {
    return {
      city,
      temperature: 28,
      condition: "Sunny",
    };
  },
});`}
      </CodeBlock>

      <h2 className="mt-10 text-2xl font-semibold">
        Registering tools
      </h2>

      <CodeBlock>
{`const agent = new Agent({
  name: "Weather Agent",
  instructions:
    "Use the weather tool when necessary.",
  model: "gpt-4.1-mini",
  tools: [weatherTool],
});`}
      </CodeBlock>

      <h2 className="mt-10 text-2xl font-semibold">
        Tool lifecycle
      </h2>

      <FeatureCard title="1. Model requests a tool">
        The model returns a tool call containing the tool name and
        arguments.
      </FeatureCard>

      <FeatureCard title="2. Arguments are parsed">
        Maya-Agent resolves the requested tool and parses its arguments.
      </FeatureCard>

      <FeatureCard title="3. Tool executes">
        The asynchronous tool function is executed.
      </FeatureCard>

      <FeatureCard title="4. Result returns to the model">
        The tool result is added to the conversation and the agent
        continues its runtime loop.
      </FeatureCard>
    </>
  );
}