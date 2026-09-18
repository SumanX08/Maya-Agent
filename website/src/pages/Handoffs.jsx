import SectionIntro from "../components/docs/SectionIntro";
import CodeBlock from "../components/docs/CodeBlock";
import FeatureCard from "../components/docs/FeatureCard";

export default function Handoffs() {
  return (
    <div>
      <SectionIntro
        eyebrow="CORE"
        title="Handoffs"
        description="Let one agent delegate a conversation to another specialized agent."
      />

      <div className="space-y-12">
        {/* 01 */}
        <section>
          <h2 className="mb-4 text-2xl font-semibold">
            01 — What are handoffs?
          </h2>

          <p className="leading-7 text-white/65">
            Handoffs allow an agent to transfer a conversation to another
            agent when that agent is better suited to handle the request.
            Maya-Agent exposes configured agents as internal handoff tools,
            allowing the model to decide when delegation is needed.
          </p>
        </section>

        {/* 02 */}
        <section>
          <h2 className="mb-4 text-2xl font-semibold">
            02 — Create specialized agents
          </h2>

          <p className="mb-4 leading-7 text-white/65">
            Start by creating the agent that will receive the handoff.
          </p>

          <CodeBlock language="javascript">
            {`const billingAgent = new Agent({
  name: "Billing Specialist",
  instructions:
    "You handle billing questions. Answer briefly and clearly.",
  model,
});`}
          </CodeBlock>
        </section>

        {/* 03 */}
        <section>
          <h2 className="mb-4 text-2xl font-semibold">
            03 — Configure the handoff
          </h2>

          <p className="mb-4 leading-7 text-white/65">
            Add the target agent to the primary agent's{" "}
            <code className="font-mono text-sm text-emerald-400">
              handoffs
            </code>{" "}
            array.
          </p>

          <CodeBlock language="javascript">
            {`const supportAgent = new Agent({
  name: "Support Assistant",
  instructions:
    "If the user asks about billing, hand the conversation " +
    "to the Billing Specialist.",
  model,
  handoffs: [billingAgent],
  maxHandoffs: 3,
});`}
          </CodeBlock>
        </section>

        {/* 04 */}
        <section>
          <h2 className="mb-4 text-2xl font-semibold">
            04 — Automatic handoff tools
          </h2>

          <p className="leading-7 text-white/65">
            Maya-Agent automatically turns each configured handoff target
            into a model-callable function.
          </p>

          <p className="mt-4 leading-7 text-white/65">
            For an agent named{" "}
            <code className="font-mono text-sm text-emerald-400">
              Billing Specialist
            </code>
            , the generated tool is:
          </p>

          <div className="my-5 rounded-xl border border-white/10 bg-[#0b0f0d] p-5">
            <code className="font-mono text-sm text-emerald-400">
              handoff_to_billing_specialist
            </code>
          </div>

          <p className="leading-7 text-white/65">
            The model can call this function when the conversation should
            be transferred. It supplies a reason for the handoff.
          </p>

          <CodeBlock language="json">
            {`{
  "reason": "User was charged twice for subscription and needs billing help."
}`}
          </CodeBlock>
        </section>

        {/* 05 */}
        <section>
          <h2 className="mb-4 text-2xl font-semibold">
            05 — Handoff events
          </h2>

          <p className="mb-5 leading-7 text-white/65">
            Handoffs emit lifecycle events through the agent's{" "}
            <code className="font-mono text-sm text-emerald-400">
              EventBus
            </code>
            .
          </p>

          <div className="grid gap-4 md:grid-cols-2">
            <FeatureCard title="handoff.started">
              Emitted when the handoff begins. Includes the source agent,
              target agent, run ID, handoff count, and reason.
            </FeatureCard>

            <FeatureCard title="handoff.completed">
              Emitted after the target agent successfully completes the
              delegated run.
            </FeatureCard>

            <FeatureCard title="handoff.failed">
              Emitted when the target agent throws an error during the
              handoff.
            </FeatureCard>
          </div>
        </section>

        {/* 06 */}
        <section>
          <h2 className="mb-4 text-2xl font-semibold">
            06 — Limit handoffs
          </h2>

          <p className="mb-4 leading-7 text-white/65">
            Use{" "}
            <code className="font-mono text-sm text-emerald-400">
              maxHandoffs
            </code>{" "}
            to prevent unlimited delegation within a run.
          </p>

          <CodeBlock language="javascript">
            {`const supportAgent = new Agent({
  name: "Support Assistant",
  instructions: "...",
  model,
  handoffs: [billingAgent],
  maxHandoffs: 3,
});`}
          </CodeBlock>

          <p className="mt-4 leading-7 text-white/65">
            The default maximum is{" "}
            <code className="font-mono text-sm text-emerald-400">
              3
            </code>
            . If the limit is exceeded, the runtime throws an error instead
            of continuing the handoff chain.
          </p>
        </section>

        {/* 07 */}
        <section>
          <h2 className="mb-4 text-2xl font-semibold">
            07 — Complete example
          </h2>

          <CodeBlock language="javascript">
            {`import "dotenv/config";
import {
  Agent,
  OpenAIProvider,
  EventBus,
} from "maya-agent";

const model = new OpenAIProvider({
  model: "gpt-4.1-mini",
});

const eventBus = new EventBus();

eventBus.on("handoff.started", (event) => {
  console.log("Handoff started:", event);
});

eventBus.on("handoff.completed", (event) => {
  console.log("Handoff completed:", event);
});

const billingAgent = new Agent({
  name: "Billing Specialist",
  instructions:
    "You are a billing specialist. Help users with billing issues.",
  model,
  eventBus,
});

const supportAgent = new Agent({
  name: "Support Assistant",
  instructions:
    "If the user asks about billing, payments, invoices, " +
    "refunds, or duplicate charges, hand the conversation " +
    "to the Billing Specialist.",
  model,
  handoffs: [billingAgent],
  maxHandoffs: 3,
  eventBus,
});

const result = await supportAgent.run(
  "I was charged twice for my subscription. Please help me."
);

console.log(result.output);`}
          </CodeBlock>
        </section>

        {/* 08 */}
        <section>
          <h2 className="mb-4 text-2xl font-semibold">
            08 — How it works
          </h2>

          <div className="space-y-3">
            {[
              "The primary agent receives the user's request.",
              "The model decides whether another configured agent should handle it.",
              "Maya-Agent executes the generated handoff tool.",
              "The target agent runs with the existing session.",
              "Handoff lifecycle events are emitted.",
              "The target agent's result becomes the handoff result.",
            ].map((step, index) => (
              <div
                key={step}
                className="flex gap-4 rounded-xl border border-white/8 bg-white/[0.02] p-4"
              >
                <span className="font-mono text-sm text-emerald-400">
                  0{index + 1}
                </span>

                <p className="text-white/65">{step}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}