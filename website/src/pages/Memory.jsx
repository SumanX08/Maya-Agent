import SectionIntro from "../components/docs/SectionIntro";
import CodeBlock from "../components/docs/CodeBlock";
import FeatureCard from "../components/docs/FeatureCard";

export default function Memory() {
  return (
    <div>
      <SectionIntro
        eyebrow="MEMORY"
        title="Memory"
        description="Keep conversation history across multiple agent runs with built-in sessions."
      />

      <div className="space-y-12">
        {/* 01 */}
        <section>
          <h2 className="mb-4 text-2xl font-semibold">
            01 — Built-in session memory
          </h2>

          <p className="leading-7 text-white/65">
            Maya-Agent automatically maintains conversation history through
            sessions. You do not need to configure a separate memory provider
            for basic conversational context.
          </p>

          <p className="mt-4 leading-7 text-white/65">
            When you run an agent with a session, previous messages are passed
            back to the model on subsequent runs.
          </p>
        </section>

        {/* 02 */}
        <section>
          <h2 className="mb-4 text-2xl font-semibold">
            02 — Create a session
          </h2>

          <p className="mb-4 leading-7 text-white/65">
            Create a session using the agent's{" "}
            <code className="font-mono text-sm text-emerald-400">
              createSession()
            </code>{" "}
            method.
          </p>

          <CodeBlock language="javascript">
            {`const session = agent.createSession();

console.log(session.id);`}
          </CodeBlock>
        </section>

        {/* 03 */}
        <section>
          <h2 className="mb-4 text-2xl font-semibold">
            03 — Reuse a session
          </h2>

          <p className="mb-4 leading-7 text-white/65">
            Pass the same session to multiple{" "}
            <code className="font-mono text-sm text-emerald-400">
              agent.run()
            </code>{" "}
            calls to preserve conversation history.
          </p>

          <CodeBlock language="javascript">
            {`const session = agent.createSession();

await agent.run(
  "My name is Suman.",
  { session }
);

const result = await agent.run(
  "What is my name?",
  { session }
);

console.log(result.output);`}
          </CodeBlock>
        </section>

        {/* 04 */}
        <section>
          <h2 className="mb-4 text-2xl font-semibold">
            04 — Inspect conversation history
          </h2>

          <p className="mb-4 leading-7 text-white/65">
            A session exposes its stored messages through{" "}
            <code className="font-mono text-sm text-emerald-400">
              getMessages()
            </code>
            .
          </p>

          <CodeBlock language="javascript">
            {`const messages = session.getMessages();

console.log(messages);`}
          </CodeBlock>

          <p className="mt-4 leading-7 text-white/65">
            Messages are stored as objects containing a{" "}
            <code className="font-mono text-sm text-emerald-400">
              role
            </code>{" "}
            and{" "}
            <code className="font-mono text-sm text-emerald-400">
              content
            </code>
            .
          </p>
        </section>

        {/* 05 */}
        <section>
          <h2 className="mb-4 text-2xl font-semibold">
            05 — Session methods
          </h2>

          <div className="grid gap-4 md:grid-cols-2">
            <FeatureCard title="addMessage()">
              Add a user, assistant, or other message to the session history.
            </FeatureCard>

            <FeatureCard title="getMessages()">
              Return a copy of the messages stored in the session.
            </FeatureCard>

            <FeatureCard title="clear()">
              Remove all messages from the session.
            </FeatureCard>

            <FeatureCard title="toJSON()">
              Serialize the session, including its metadata and messages.
            </FeatureCard>
          </div>
        </section>

        {/* 06 */}
        <section>
          <h2 className="mb-4 text-2xl font-semibold">
            06 — Session stores
          </h2>

          <p className="mb-4 leading-7 text-white/65">
            Agents use an{" "}
            <code className="font-mono text-sm text-emerald-400">
              InMemorySessionStore
            </code>{" "}
            by default.
          </p>

          <CodeBlock language="javascript">
            {`const agent = new Agent({
  name: "Assistant",
  instructions: "You are a helpful assistant.",
  model,
});`}
          </CodeBlock>

          <p className="mt-4 leading-7 text-white/65">
            You can also provide a custom session store when you need
            different persistence behavior.
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
} from "maya-agent";

const model = new OpenAIProvider({
  model: "gpt-4.1-mini",
});

const agent = new Agent({
  name: "Memory Assistant",
  instructions:
    "Use the conversation history to answer questions about previous messages.",
  model,
});

const session = agent.createSession();

await agent.run(
  "My name is Suman and I am learning AI engineering.",
  { session }
);

const result = await agent.run(
  "What is my name and what am I learning?",
  { session }
);

console.log(result.output);

console.log(session.getMessages());`}
          </CodeBlock>
        </section>

        {/* 08 */}
        <section>
          <h2 className="mb-4 text-2xl font-semibold">
            08 — Session vs Graph Memory
          </h2>

          <div className="grid gap-4 md:grid-cols-2">
            <FeatureCard title="Session Memory">
              Built-in conversation history for maintaining context across
              agent runs.
            </FeatureCard>

            <FeatureCard title="Graph Memory">
              Persistent, relationship-aware knowledge stored in Neo4j.
              See the Graph Memory section for details.
            </FeatureCard>
          </div>
        </section>
      </div>
    </div>
  );
}