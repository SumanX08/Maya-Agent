import CodeBlock from "./CodeBlock";

function SectionIntro({ label, title, description }) {
  return (
    <>
      <p className="mb-4 font-mono text-xs tracking-[0.2em] text-emerald-400">
        {label}
      </p>

      <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
        {title}
      </h1>

      <p className="mt-5 text-lg leading-8 text-slate-400">
        {description}
      </p>
    </>
  );
}

function FeatureCard({ title, children }) {
  return (
    <div className="mt-5 rounded-xl border border-emerald-500/15 bg-[#0a100e] p-5">
      <h3 className="font-semibold text-white">{title}</h3>

      <p className="mt-2 text-sm leading-7 text-slate-400">
        {children}
      </p>
    </div>
  );
}

export default function DocsContent({ activeSection }) {
  return (
    <main className="min-w-0 flex-1 px-6 py-12 md:px-12 lg:px-20">
      <div className="mx-auto max-w-3xl">

        {/* =====================================================
            INTRODUCTION
        ====================================================== */}

        {activeSection === "Introduction" && (
          <>
            <SectionIntro
              label="INTRODUCTION"
              title="Maya-Agent"
              description="An open-source JavaScript SDK for building reliable AI agents with tools, memory, guardrails, handoffs, graph intelligence, and observability."
            />

            <div className="my-10 h-px bg-emerald-500/10" />

            <h2 className="text-2xl font-semibold">
              Build agents. Own the runtime.
            </h2>

            <p className="mt-4 leading-7 text-slate-400">
              Maya-Agent gives developers direct control over the agent
              execution loop instead of hiding it behind a high-level
              abstraction.
            </p>

            <h2 className="mt-12 text-2xl font-semibold">
              Core capabilities
            </h2>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {[
                "Multi-step agent runtime",
                "Custom tools",
                "Input / tool / output guardrails",
                "Agent handoffs",
                "Session memory",
                "Neo4j graph memory",
                "Background workers",
                "Structured output",
                "Streaming",
                "Events and tracing",
                "Retries and timeouts",
                "Model providers",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-lg border border-emerald-500/10 bg-emerald-500/[0.025] px-4 py-3 text-sm text-slate-300"
                >
                  {item}
                </div>
              ))}
            </div>

            <div className="mt-10 rounded-xl border border-emerald-500/15 bg-emerald-500/[0.03] p-5">
              <p className="text-sm leading-7 text-slate-400">
                <span className="font-semibold text-emerald-400">
                  Philosophy:
                </span>{" "}
                keep the runtime visible, composable, and extensible.
              </p>
            </div>
          </>
        )}

        {/* =====================================================
            INSTALLATION
        ====================================================== */}

        {activeSection === "Installation" && (
          <>
            <SectionIntro
              label="INSTALLATION"
              title="Installation"
              description="Install Maya-Agent directly from npm and configure the provider you want to use."
            />

            <CodeBlock>
              npm install maya-agent
            </CodeBlock>

            <h2 className="mt-10 text-2xl font-semibold">
              Environment variables
            </h2>

            <p className="mt-4 leading-7 text-slate-400">
              Add the API key for the provider used by your application.
            </p>

            <CodeBlock>
{`OPENAI_API_KEY=your_api_key
GOOGLE_API_KEY=your_api_key`}
            </CodeBlock>

            <div className="mt-6 rounded-xl border border-emerald-500/15 bg-[#0a100e] p-5">
              <p className="text-sm leading-7 text-slate-400">
                Never commit API keys to source control. Use environment
                variables or your deployment platform's secret manager.
              </p>
            </div>
          </>
        )}

        {/* =====================================================
            QUICK START
        ====================================================== */}

        {activeSection === "Quick Start" && (
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
              The runtime loop
            </h2>

            <p className="mt-4 leading-7 text-slate-400">
              A run starts with user input, executes the model, detects
              tool calls, executes tools when necessary, and continues
              until a final response is produced or the maximum step
              limit is reached.
            </p>

            <div className="mt-6 grid gap-2">
              {[
                "1. User input",
                "2. Input guardrails",
                "3. Model generation",
                "4. Tool or handoff execution",
                "5. Tool results returned to the model",
                "6. Output guardrails",
                "7. Structured output validation",
                "8. Final result",
              ].map((step) => (
                <div
                  key={step}
                  className="rounded-lg border border-white/5 bg-white/[0.02] px-4 py-3 text-sm text-slate-300"
                >
                  {step}
                </div>
              ))}
            </div>
          </>
        )}

        {/* =====================================================
            AGENTS
        ====================================================== */}

        {activeSection === "Agents" && (
          <>
            <SectionIntro
              label="AGENTS"
              title="Agents"
              description="Agents combine instructions, a model, tools, memory, guardrails, and runtime controls."
            />

            <CodeBlock>
{`const agent = new Agent({
  name: "Research Agent",
  instructions:
    "You are a helpful research assistant.",

  model: "gpt-4.1-mini",

  tools: [
    searchTool,
  ],

  maxSteps: 10,
  timeoutMs: 30000,
});`}
            </CodeBlock>

            <h2 className="mt-10 text-2xl font-semibold">
              Runtime controls
            </h2>

            <FeatureCard title="maxSteps">
              Limits how many model/tool iterations an agent can execute.
              If the limit is exceeded, the runtime fails safely instead
              of looping indefinitely.
            </FeatureCard>

            <FeatureCard title="timeoutMs">
              Applies a timeout to model calls so a stalled provider
              request does not block the runtime indefinitely.
            </FeatureCard>

            <FeatureCard title="retryPolicy">
              Controls retry behavior for failed model calls.
            </FeatureCard>

            <FeatureCard title="outputSchema">
              Enables structured response validation before returning the
              final result.
            </FeatureCard>
          </>
        )}

        {/* =====================================================
            TOOLS
        ====================================================== */}

        {activeSection === "Tools" && (
          <>
            <SectionIntro
              label="TOOLS"
              title="Tools"
              description="Give agents capabilities through custom asynchronous tools."
            />

            <p className="mt-8 leading-7 text-slate-400">
              Tools are exposed to the model as function definitions.
              When the model requests a tool, Maya-Agent resolves the
              requested tool, parses its arguments, executes it, and
              returns the result to the model.
            </p>

            <CodeBlock>
{`const weatherTool = new Tool({
  name: "get_weather",
  description: "Get the current weather for a city.",

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
              Execution flow
            </h2>

            <div className="mt-6 space-y-2">
              {[
                "Model requests a function",
                "Maya-Agent finds the registered tool",
                "Arguments are parsed",
                "Tool guardrails run",
                "Tool executes asynchronously",
                "Result is added to the model context",
                "Agent continues the loop",
              ].map((item, index) => (
                <div
                  key={item}
                  className="flex gap-4 rounded-lg border border-white/5 bg-white/[0.02] p-4"
                >
                  <span className="font-mono text-emerald-400">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span className="text-sm text-slate-300">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </>
        )}

        {/* =====================================================
            GUARDRAILS
        ====================================================== */}

        {activeSection === "Guardrails" && (
          <>
            <SectionIntro
              label="GUARDRAILS"
              title="Guardrails"
              description="Control agent execution by validating inputs, tool calls, and model outputs."
            />

            <h2 className="mt-10 text-2xl font-semibold">
              Three execution stages
            </h2>

            <FeatureCard title="Input guardrails">
              Run before the user's input enters the model execution
              loop. A failed guardrail raises a GuardrailError and stops
              the run.
            </FeatureCard>

            <FeatureCard title="Tool guardrails">
              Run before a tool executes and receive the selected tool,
              its arguments, run ID, and session.
            </FeatureCard>

            <FeatureCard title="Output guardrails">
              Run after the model produces a final response and before
              that response is returned to the caller.
            </FeatureCard>

            <CodeBlock>
{`const safeInput = new Guardrail({
  name: "Safe Input",

  check: async ({ input }) => {
    if (input.includes("blocked")) {
      return {
        passed: false,
        message: "Input is not allowed.",
      };
    }

    return { passed: true };
  },
});`}
            </CodeBlock>

            <p className="mt-4 leading-7 text-slate-400">
              Failed checks emit a{" "}
              <code className="text-emerald-400">
                guardrail.triggered
              </code>{" "}
              event and raise a structured guardrail error.
            </p>
          </>
        )}

        {/* =====================================================
            HANDOFFS
        ====================================================== */}

        {activeSection === "Handoffs" && (
          <>
            <SectionIntro
              label="HANDOFFS"
              title="Handoffs"
              description="Delegate a task from one specialized agent to another while preserving the current session."
            />

            <CodeBlock>
{`const researchAgent = new Agent({
  name: "Research Agent",
  instructions:
    "You research technical topics.",
  model: "gpt-4.1-mini",
});

const writingAgent = new Agent({
  name: "Writing Agent",
  instructions:
    "You turn research into clear writing.",
  model: "gpt-4.1-mini",
});

const manager = new Agent({
  name: "Manager",
  instructions:
    "Delegate research and writing tasks.",
  model: "gpt-4.1-mini",

  handoffs: [
    researchAgent,
    writingAgent,
  ],
});`}
            </CodeBlock>

            <h2 className="mt-10 text-2xl font-semibold">
              Context preservation
            </h2>

            <p className="mt-4 leading-7 text-slate-400">
              Handoffs run the target agent using the existing session,
              allowing the conversation context to continue across
              agents.
            </p>

            <h2 className="mt-10 text-2xl font-semibold">
              Handoff limits
            </h2>

            <p className="mt-4 leading-7 text-slate-400">
              Maya-Agent tracks handoffs in session metadata and enforces
              the configured maximum handoff count to prevent runaway
              delegation loops.
            </p>

            <p className="mt-4 text-sm text-slate-500">
              Handoff lifecycle events include{" "}
              <code className="text-emerald-400">
                handoff.started
              </code>
              ,{" "}
              <code className="text-emerald-400">
                handoff.completed
              </code>
              , and{" "}
              <code className="text-emerald-400">
                handoff.failed
              </code>
              .
            </p>
          </>
        )}

        {/* =====================================================
            MEMORY
        ====================================================== */}

        {activeSection === "Memory" && (
          <>
            <SectionIntro
              label="MEMORY"
              title="Memory"
              description="Persist conversation state across agent runs using sessions and session stores."
            />

            <h2 className="mt-10 text-2xl font-semibold">
              Sessions
            </h2>

            <p className="mt-4 leading-7 text-slate-400">
              A session stores the messages associated with an agent
              interaction. User and assistant messages are added to the
              session during execution.
            </p>

            <CodeBlock>
{`session.addMessage({
  role: "user",
  content: input,
});

const messages =
  session.getMessages();`}
            </CodeBlock>

            <h2 className="mt-10 text-2xl font-semibold">
              Session persistence
            </h2>

            <p className="mt-4 leading-7 text-slate-400">
              Maya-Agent separates session state from the storage
              implementation through a SessionStore abstraction.
            </p>

            <FeatureCard title="FileSessionStore">
              Provides a simple persistent session storage option for
              local development and lightweight applications.
            </FeatureCard>

            <FeatureCard title="SessionStore">
              Defines the storage abstraction so applications can provide
              their own persistence implementation.
            </FeatureCard>
          </>
        )}

        {/* =====================================================
            GRAPH MEMORY
        ====================================================== */}

        {activeSection === "Graph Memory" && (
          <>
            <SectionIntro
              label="GRAPH MEMORY"
              title="Graph Memory"
              description="Give agents long-term memory based on entities and relationships stored in a graph."
            />

            <p className="mt-6 leading-7 text-slate-400">
              Graph memory stores relationships such as users,
              technologies, projects, preferences, and other entities.
              During a run, relevant graph knowledge can be retrieved
              and added to the model context.
            </p>

            <CodeBlock>
{`const memory = new GraphMemory({
  graphClient,
});

const knowledge =
  await memory.retrieve({
    entityIds: ["user-123"],
  });`}
            </CodeBlock>

            <h2 className="mt-10 text-2xl font-semibold">
              Relationship representation
            </h2>

            <CodeBlock>
{`User
  └── PREFERS ──> JavaScript

Project
  └── USES ──> Neo4j

User
  └── WORKS_ON ──> Project`}
            </CodeBlock>

            <p className="mt-4 leading-7 text-slate-400">
              Retrieved relationships can be transformed into contextual
              statements before being supplied to the model.
            </p>
          </>
        )}

        {/* =====================================================
            BACKGROUND WORKERS
        ====================================================== */}

        {activeSection === "Background Workers" && (
          <>
            <SectionIntro
              label="BACKGROUND WORKERS"
              title="Background Workers"
              description="Move long-term memory processing outside the main agent execution path."
            />

            <FeatureCard title="Memory Extraction Worker">
              Extracts entities, facts, and useful memory from agent
              interactions.
            </FeatureCard>

            <FeatureCard title="Relationship Builder Worker">
              Builds meaningful relationships between graph entities and
              updates the graph as new information becomes available.
            </FeatureCard>

            <FeatureCard title="Graph Maintenance Worker">
              Performs graph maintenance such as improving graph quality,
              handling stale information, and keeping relationships
              consistent.
            </FeatureCard>

            <h2 className="mt-10 text-2xl font-semibold">
              Why workers?
            </h2>

            <p className="mt-4 leading-7 text-slate-400">
              Memory extraction and graph maintenance can be expensive
              background operations. Keeping them separate from the
              synchronous agent loop helps keep the main interaction
              focused on producing a response.
            </p>
          </>
        )}

        {/* =====================================================
            PROVIDERS
        ====================================================== */}

        {activeSection === "Providers" && (
          <>
            <SectionIntro
              label="PROVIDERS"
              title="Model Providers"
              description="Use a provider abstraction so the agent runtime is not tightly coupled to a single model vendor."
            />

            <h2 className="mt-10 text-2xl font-semibold">
              OpenAI
            </h2>

            <CodeBlock>
{`import { OpenAIProvider } from "maya-agent";

const model = new OpenAIProvider({
  model: "gpt-4.1-mini",
});`}
            </CodeBlock>

            <h2 className="mt-10 text-2xl font-semibold">
              Google Gemini
            </h2>

            <CodeBlock>
{`import { GeminiProvider } from "maya-agent";

const model = new GeminiProvider({
  model: "gemini-3.6-flash",
});`}
            </CodeBlock>

            <h2 className="mt-10 text-2xl font-semibold">
              Provider interface
            </h2>

            <p className="mt-4 leading-7 text-slate-400">
              The runtime communicates with models through a common
              provider interface. This keeps model-specific API details
              inside provider implementations rather than inside the
              agent runtime.
            </p>

            <div className="mt-6 rounded-xl border border-emerald-500/15 bg-emerald-500/[0.03] p-5">
              <p className="text-sm leading-7 text-slate-400">
                Additional providers can follow the same provider
                contract without changing the core agent loop.
              </p>
            </div>
          </>
        )}

        {/* =====================================================
            STRUCTURED OUTPUT
        ====================================================== */}

        {activeSection === "Structured Output" && (
          <>
            <SectionIntro
              label="STRUCTURED OUTPUT"
              title="Structured Output"
              description="Validate model responses against a schema before returning them to your application."
            />

            <CodeBlock>
{`import { z } from "zod";

const Person = z.object({
  name: z.string(),
  age: z.number(),
});

const agent = new Agent({
  name: "Extractor",
  instructions:
    "Extract the person's information.",
  model: "gpt-4.1-mini",
  outputSchema: Person,
});

const result = await agent.run(
  "John is 28 years old."
);

console.log(result.output);`}
            </CodeBlock>

            <h2 className="mt-10 text-2xl font-semibold">
              Validation flow
            </h2>

            <div className="mt-6 space-y-2">
              {[
                "Model is instructed to return JSON",
                "Response is parsed as JSON",
                "Schema safeParse() validates the result",
                "Validated data becomes the final output",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-lg border border-white/5 bg-white/[0.02] p-4 text-sm text-slate-300"
                >
                  {item}
                </div>
              ))}
            </div>

            <p className="mt-6 leading-7 text-slate-400">
              Invalid JSON or schema validation failures produce an
              OutputValidationError instead of silently returning
              malformed data.
            </p>
          </>
        )}

        {/* =====================================================
            STREAMING
        ====================================================== */}

        {activeSection === "Streaming" && (
          <>
            <SectionIntro
              label="STREAMING"
              title="Streaming"
              description="Receive model output incrementally instead of waiting for the complete response."
            />

            <CodeBlock>
{`const result = await agent.stream(
  "Explain how neural networks work."
);

console.log(result.output);`}
            </CodeBlock>

            <h2 className="mt-10 text-2xl font-semibold">
              Stream events
            </h2>

            <p className="mt-4 leading-7 text-slate-400">
              The streaming runtime consumes the provider's async stream
              and emits incremental text events through the event bus.
            </p>

            <CodeBlock>
{`eventBus.on("run.stream", (event) => {
  if (event.type === "text.delta") {
    process.stdout.write(event.delta);
  }

  if (event.type === "completed") {
    console.log("\\nDone");
  }
});`}
            </CodeBlock>

            <p className="mt-4 text-sm leading-7 text-slate-500">
              The runtime handles{" "}
              <code className="text-emerald-400">
                response.output_text.delta
              </code>{" "}
              events and emits them as{" "}
              <code className="text-emerald-400">
                run.stream
              </code>{" "}
              events.
            </p>
          </>
        )}

        {/* =====================================================
            TRACING
        ====================================================== */}

        {activeSection === "Tracing" && (
          <>
            <SectionIntro
              label="TRACING"
              title="Tracing & Events"
              description="Observe what happens inside an agent run through structured runtime events."
            />

            <h2 className="mt-10 text-2xl font-semibold">
              Runtime events
            </h2>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {[
                "run.stream",
                "run.retry",
                "guardrail.triggered",
                "handoff.started",
                "handoff.completed",
                "handoff.failed",
              ].map((event) => (
                <div
                  key={event}
                  className="rounded-lg border border-emerald-500/10 bg-[#0a100e] p-4"
                >
                  <code className="text-sm text-emerald-400">
                    {event}
                  </code>
                </div>
              ))}
            </div>

            <h2 className="mt-10 text-2xl font-semibold">
              Retry visibility
            </h2>

            <p className="mt-4 leading-7 text-slate-400">
              Failed model attempts can trigger retry events containing
              information such as the current step, attempt number,
              next attempt, delay, and error.
            </p>

            <h2 className="mt-10 text-2xl font-semibold">
              Trace collection
            </h2>

            <p className="mt-4 leading-7 text-slate-400">
              TraceCollector provides a central place for collecting
              execution information so applications can inspect agent
              behavior and reliability.
            </p>
          </>
        )}

        {/* =====================================================
            EXAMPLES
        ====================================================== */}

        {activeSection === "Examples" && (
          <>
            <SectionIntro
              label="EXAMPLES"
              title="Examples"
              description="Combine Maya-Agent primitives to build practical agentic workflows."
            />

            <h2 className="mt-10 text-2xl font-semibold">
              Agent with a tool
            </h2>

            <CodeBlock>
{`const calculator = new Tool({
  name: "calculate",
  description: "Perform a calculation.",

  execute: async ({ expression }) => {
    return evaluate(expression);
  },
});

const agent = new Agent({
  name: "Calculator",
  instructions:
    "Use the calculator when necessary.",
  model: "gpt-4.1-mini",
  tools: [calculator],
});

const result = await agent.run(
  "Calculate 125 * 24"
);`}
            </CodeBlock>

            <h2 className="mt-10 text-2xl font-semibold">
              Multi-agent workflow
            </h2>

            <CodeBlock>
{`const researcher = new Agent({
  name: "Researcher",
  instructions:
    "Research the requested topic.",
  model: "gpt-4.1-mini",
});

const writer = new Agent({
  name: "Writer",
  instructions:
    "Turn research into a concise article.",
  model: "gpt-4.1-mini",
});

const orchestrator = new Agent({
  name: "Orchestrator",
  instructions:
    "Delegate tasks to the appropriate agent.",
  model: "gpt-4.1-mini",
  handoffs: [
    researcher,
    writer,
  ],
});`}
            </CodeBlock>

            <h2 className="mt-10 text-2xl font-semibold">
              Structured extraction
            </h2>

            <CodeBlock>
{`const result = await agent.run(
  "Extract the customer's name and email."
);

// result.output is validated
// against the configured schema.
console.log(result.output);`}
            </CodeBlock>

            <div className="mt-10 rounded-xl border border-emerald-500/15 bg-emerald-500/[0.03] p-5">
              <p className="text-sm leading-7 text-slate-400">
                These primitives are designed to be composed. Start with
                a simple agent and add tools, memory, guardrails,
                handoffs, or structured output only when your application
                needs them.
              </p>
            </div>
          </>
        )}

      </div>
    </main>
  );
}