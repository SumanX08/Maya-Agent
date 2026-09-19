# Maya-Agent

An open-source AI Agent SDK built from scratch with JavaScript.

Maya-Agent provides a modular runtime for building AI agents with:

- LLM-powered agents
- Function calling and tools
- Session memory
- Long-term graph memory
- Automatic memory extraction
- Relationship building
- Input, tool, and output guardrails
- Structured outputs with Zod
- Retries and timeouts
- Multi-agent handoffs
- Streaming responses
- Event-based tracing
- Background graph workers
- OpenAI and Gemini providers

The project is designed to keep the core agent runtime understandable, modular, and extensible.

## Installation

```bash
npm install maya-agent
```

For tools and structured output, install Zod in your application:

```bash
npm install zod
```

## Quick Start

```js
import "dotenv/config";
import {
  Agent,
  OpenAIProvider,
} from "maya-agent";

const model = new OpenAIProvider({
  model: "gpt-4.1-mini",
});

const agent = new Agent({
  name: "Assistant",
  instructions: "You are a helpful AI assistant.",
  model,
});

const result = await agent.run(
  "Explain what an AI agent is in one sentence."
);

console.log(result.output);
```

## Features

### Agent Execution

Create and run agents with instructions, models, tools, memory, guardrails, handoffs, and background workers.

```js
import {
  Agent,
  OpenAIProvider,
} from "maya-agent";

const model = new OpenAIProvider({
  model: "gpt-4.1-mini",
});

const agent = new Agent({
  name: "Assistant",
  instructions: "You are a helpful AI assistant.",
  model,
  maxSteps: 10,
  timeoutMs: 15000,
});

const result = await agent.run(
  "What is an AI agent?"
);

console.log(result.output);
```

A run returns information including the run ID, agent name, session ID, output, usage, and messages.

## Tools

Maya-Agent supports function calling through validated tools.

Tools can be created with the `tool()` helper and a Zod input schema:

```js
import { tool } from "maya-agent";
import { z } from "zod";

const calculator = tool({
  name: "calculator",
  description: "Add two numbers together.",
  schema: z.object({
    a: z.number(),
    b: z.number(),
  }),
  execute: async ({ a, b }) => {
    return a + b;
  },
});
```

Add tools to an agent:

```js
const agent = new Agent({
  name: "Calculator",
  instructions: "Use the calculator for arithmetic.",
  model,
  tools: [calculator],
});

const result = await agent.run(
  "What is 127 + 358?"
);

console.log(result.output);
```

The agent can expose the configured tools to the model, execute tool calls, and continue the agent loop with the tool result.

## Session Memory

Sessions store conversation history for an agent.

The simplest way to create a session is through the agent:

```js
const session = agent.createSession();

await agent.run(
  "My name is Suman.",
  { session }
);

const result = await agent.run(
  "What is my name?",
  { session }
);

console.log(result.output);
```

The same session can be reused across multiple runs.

Maya-Agent also provides session stores:

```js
import {
  InMemorySessionStore,
  FileSessionStore,
} from "maya-agent";
```

`InMemorySessionStore` keeps sessions in memory, while `FileSessionStore` provides file-backed session storage.

## Graph Memory

Maya-Agent supports long-term memory using a graph database such as Neo4j.

Graph memory can represent entities and relationships such as:

```text
Suman
  |
  └── WORKS_ON ──> Maya-Agent
                       |
                       ├── USES ──> Node.js
                       |
                       └── USES ──> Neo4j
```

### Connect to Neo4j

Configure:

```env
NEO4J_URI=your_neo4j_uri
NEO4J_USERNAME=your_username
NEO4J_PASSWORD=your_password
NEO4J_DATABASE=neo4j
```

Then:

```js
import {
  GraphClient,
  GraphMemory,
} from "maya-agent";

const client = new GraphClient();

await client.connect();

const memory = new GraphMemory({
  client,
});
```

### Store a fact

```js
await memory.rememberFact({
  subject: {
    id: "suman",
    name: "Suman",
    type: "Person",
  },
  relation: "WORKS_ON",
  object: {
    id: "maya-agent",
    name: "Maya-Agent",
    type: "Project",
  },
});
```

Retrieve connected context:

```js
const context = await memory.getNeighborhood("suman");

console.log(context);
```

## Automatic Memory Extraction

Maya-Agent includes a background worker that can extract entities and relationships from completed agent runs.

The extraction pipeline can produce entities such as:

```text
Suman
Maya-Agent
```

and relationships such as:

```text
Suman --WORKS_ON--> Maya-Agent
```

The worker is built from a memory extraction model and graph memory:

```js
import {
  MemoryExtractionModel,
  MemoryExtractionWorker,
} from "maya-agent";

const extractionModel = new MemoryExtractionModel({
  model,
});

const memoryWorker = new MemoryExtractionWorker({
  extractionModel,
  graphMemory,
  eventBus,
});
```

Attach background workers to an agent:

```js
const agent = new Agent({
  name: "Knowledge Assistant",
  instructions: "You are a helpful assistant.",
  model,
  eventBus,
  backgroundWorkers: [
    memoryWorker,
  ],
});
```

## Relationship Builder

The relationship builder analyzes existing graph context and can create additional relationships when they meet the configured criteria.

For example:

```text
Suman --WORKS_ON--> Maya-Agent
Maya-Agent --USES--> Node.js
```

can provide context for discovering another relationship between Suman and Node.js.

The relationship builder works with relationship candidates containing information such as:

- Source entity
- Target entity
- Relationship type
- Confidence
- Reason

Duplicate relationships are avoided.

## Graph Maintenance

Graph maintenance can run in the background after relationship building.

Maintenance can:

- Scan existing relationships
- Update relationship metadata
- Remove outdated relationships
- Track maintenance timestamps
- Skip relationships that do not require updates

A maintenance run reports information such as:

```text
relationshipsScanned
relationshipsUpdated
relationshipsRemoved
relationshipsSkipped
```

## Guardrails

Maya-Agent supports guardrails at multiple stages:

- Input guardrails
- Tool guardrails
- Output guardrails

Create a guardrail:

```js
import { Guardrail } from "maya-agent";

const noEmptyInput = new Guardrail({
  name: "no-empty-input",
  validate: ({ input }) => {
    return {
      passed: input.trim().length > 0,
      message: "Input cannot be empty.",
    };
  },
});
```

Attach it to an agent:

```js
const agent = new Agent({
  name: "Safe Assistant",
  instructions: "You are a helpful assistant.",
  model,
  guardrails: {
    input: [noEmptyInput],
  },
});
```

A failed guardrail stops the relevant execution path and raises a `GuardrailError`.

## Structured Output

Maya-Agent supports structured model responses using Zod schemas.

```js
import { z } from "zod";

const profileSchema = z.object({
  name: z.string(),
  role: z.string(),
  experience_years: z.number(),
});
```

Use the schema with an agent:

```js
const agent = new Agent({
  name: "Profile Extractor",
  instructions: "Extract the person's professional profile.",
  model,
  outputSchema: profileSchema,
});

const result = await agent.run(
  "My name is Suman. I am a software engineer with 2 years of experience."
);

console.log(result.output);
```

The SDK validates the structured response against the supplied Zod schema and can raise `OutputValidationError` when validation fails.

Structured output has been tested with both OpenAI and Gemini providers.

## Reliability

Maya-Agent provides retry and timeout support for model execution.

### Retry Policy

```js
import { RetryPolicy } from "maya-agent";

const retryPolicy = new RetryPolicy({
  maxAttempts: 3,
  initialDelay: 500,
  backoffMultiplier: 2,
});
```

The policy can be passed to an agent:

```js
const agent = new Agent({
  name: "Reliable Assistant",
  instructions: "You are a helpful assistant.",
  model,
  retryPolicy,
});
```

Example retry behavior:

```text
Attempt 1 -> Failed
Wait 500ms
Attempt 2 -> Failed
Wait 1000ms
Attempt 3 -> Success
```

### Timeouts

Protect model calls with a timeout:

```js
const agent = new Agent({
  name: "Reliable Assistant",
  instructions: "You are a helpful assistant.",
  model,
  timeoutMs: 10000,
});
```

Retries and timeouts can be combined to make model execution more resilient to transient failures.

## Agent Handoffs

Agents can transfer work to specialized agents.

```text
SupportAgent
     |
     | Billing issue
     v
BillingAgent
```

Configure a target agent:

```js
const billingAgent = new Agent({
  name: "Billing Specialist",
  instructions: "Handle billing and payment issues.",
  model,
});

const supportAgent = new Agent({
  name: "Support Assistant",
  instructions:
    "Handle support requests and delegate billing issues.",
  model,
  handoffs: [billingAgent],
});
```

Run the source agent:

```js
const result = await supportAgent.run(
  "I was charged twice for my subscription."
);

console.log(result.output);
```

Maya-Agent tracks handoff execution and enforces a configurable maximum handoff count.

## Streaming

Maya-Agent supports incremental text streaming through the provider abstraction.

```js
import {
  Agent,
  OpenAIProvider,
  EventBus,
} from "maya-agent";

const eventBus = new EventBus();

eventBus.on("run.stream", (event) => {
  if (event.type === "text.delta") {
    process.stdout.write(event.delta);
  }
});

const agent = new Agent({
  name: "Streaming Assistant",
  instructions: "You are a concise helpful assistant.",
  model: new OpenAIProvider({
    model: "gpt-4.1-mini",
  }),
  eventBus,
});

const result = await agent.stream(
  "Explain how an AI agent works."
);

console.log("\n\nComplete response:");
console.log(result.output);
```

Streaming has been tested with OpenAI and Gemini providers.

Gemini uses its streaming generation API through `GeminiProvider`:

```js
import { GeminiProvider } from "maya-agent";

const model = new GeminiProvider({
  model: "gemini-3.6-flash",
});
```

The runtime normalizes provider-specific streamed text into `run.stream` events.

## Providers

Maya-Agent uses a provider abstraction so the agent runtime is not tied to one model vendor.

### OpenAI

```js
import { OpenAIProvider } from "maya-agent";

const model = new OpenAIProvider({
  model: "gpt-4.1-mini",
});
```

Set:

```env
OPENAI_API_KEY=your_openai_api_key
```

### Gemini

```js
import { GeminiProvider } from "maya-agent";

const model = new GeminiProvider({
  model: "gemini-3.6-flash",
});
```

Set:

```env
GEMINI_API_KEY=your_gemini_api_key
```

Both providers implement the common `ModelProvider` interface used by the agent runtime.

## Tracing

Maya-Agent includes event-based tracing for observing agent execution.

Create a trace collector from the same EventBus used by the agent:

```js
import {
  EventBus,
  TraceCollector,
} from "maya-agent";

const eventBus = new EventBus();

const traces = new TraceCollector({
  eventBus,
});
```

Attach the EventBus to the agent:

```js
const agent = new Agent({
  name: "Tracing Assistant",
  instructions: "You are a helpful assistant.",
  model,
  eventBus,
});
```

After a run:

```js
const result = await agent.run(
  "Explain retrieval augmented generation."
);

const trace = traces.getRun(result.runId);

console.dir(trace, {
  depth: null,
});
```

Trace events can include:

```text
model.started
model.completed
tool.started
tool.completed
stream.started
stream.delta
stream.completed
run.retry
```

TraceCollector also provides:

```js
traces.getRun(runId);
traces.clearRun(runId);
traces.clear();
traces.destroy();
```

## Event System

Maya-Agent uses an EventBus for runtime lifecycle events.

```js
import { EventBus } from "maya-agent";

const eventBus = new EventBus();

eventBus.on("run.completed", (event) => {
  console.log(
    "Agent run completed:",
    event.runId
  );
});
```

Events are used by tracing, handoffs, streaming, and background workers.

Examples include:

```text
run.started
run.completed
run.failed
run.retry
run.stream
handoff.started
handoff.completed
memory.extraction.started
memory.extraction.completed
relationship.building.started
relationship.building.completed
graph.maintenance.started
graph.maintenance.completed
```

## Architecture

```text
                    Agent
                      |
                      v
                 AgentRunner
                      |
        +-------------+-------------+
        |             |             |
        v             v             v
    Guardrails      Model         Memory
        |             |             |
        |             |             v
        |             |        Graph Memory
        |             |             |
        v             v             v
      Tools       Tool Calls   Background Workers
                      |
                      v
                Final Response
```

The runtime is intentionally split into small components so each part can be understood and extended independently.

## Project Structure

```text
Maya-Agent
|
+-- examples
|
+-- src
|   |
|   +-- agent
|   |   +-- Agent.js
|   |   +-- AgentRunner.js
|   |
|   +-- errors
|   |   +-- GuardrailError.js
|   |   +-- OutputValidationError.js
|   |
|   +-- events
|   |   +-- EventBus.js
|   |
|   +-- graph
|   |   +-- GraphClient.js
|   |
|   +-- guardrails
|   |   +-- Guardrail.js
|   |
|   +-- handoffs
|   |   +-- HandoffManager.js
|   |
|   +-- memory
|   |   +-- Session.js
|   |   +-- SessionStore.js
|   |   +-- FileSessionStore.js
|   |   +-- GraphMemory.js
|   |   +-- GraphRetriever.js
|   |   +-- MemoryExtractionModel.js
|   |   +-- MemorySchema.js
|   |   +-- RelationshipBuilderModel.js
|   |
|   +-- models
|   |   +-- ModelProvider.js
|   |   +-- OpenAIProvider.js
|   |   +-- GeminiProvider.js
|   |
|   +-- reliability
|   |   +-- RetryPolicy.js
|   |   +-- withTimeout.js
|   |
|   +-- tools
|   |   +-- Tool.js
|   |   +-- Tools.js
|   |
|   +-- tracing
|   |   +-- TraceCollector.js
|   |
|   +-- workers
|       +-- BackgroundWorkerManager.js
|       +-- MemoryExtractionWorker.js
|       +-- RelationshipBuilderWorker.js
|       +-- GraphMaintenanceWorker.js
|
+-- tests
+-- package.json
+-- README.md
```

## Installation from Source

Clone the repository:

```bash
git clone https://github.com/SumanX08/Maya-Agent.git
```

Move into the project:

```bash
cd Maya-Agent
```

Install dependencies:

```bash
npm install
```

## Environment Variables

For OpenAI:

```env
OPENAI_API_KEY=your_openai_api_key
```

For Gemini:

```env
GEMINI_API_KEY=your_gemini_api_key
```

For Neo4j graph memory:

```env
NEO4J_URI=your_neo4j_uri
NEO4J_USERNAME=your_username
NEO4J_PASSWORD=your_password
NEO4J_DATABASE=neo4j
```

## Running Tests

Run the test suite:

```bash
npm test
```

The SDK's core tests cover functionality including:

- Agent execution
- Tools
- Tool validation
- Sessions
- EventBus
- Guardrails
- Retry policies
- Handoffs
- Memory components
- Provider behavior

## Core Exports

Maya-Agent exports the main runtime components from the package entry point:

```js
import {
  Agent,
  BackgroundWorkerManager,
  EventBus,
  FileSessionStore,
  GeminiProvider,
  GraphClient,
  GraphMemory,
  GraphRetriever,
  Guardrail,
  GuardrailError,
  HandoffManager,
  InMemorySessionStore,
  MemoryExtractionModel,
  MemoryExtractionWorker,
  ModelProvider,
  OpenAIProvider,
  OutputValidationError,
  RelationshipBuilderModel,
  RelationshipBuilderWorker,
  RetryPolicy,
  Session,
  Tool,
  TraceCollector,
  tool,
  withTimeout,
  GraphMaintenanceWorker,
} from "maya-agent";
```

## Complete Agent Example

```js
import "dotenv/config";

import {
  Agent,
  OpenAIProvider,
  EventBus,
} from "maya-agent";

const eventBus = new EventBus();

const model = new OpenAIProvider({
  model: "gpt-4.1-mini",
});

const agent = new Agent({
  name: "Maya",
  instructions: "You are a helpful AI assistant.",
  model,
  eventBus,
  maxSteps: 10,
  timeoutMs: 15000,
  retryPolicy: {
    maxAttempts: 3,
    initialDelay: 500,
    backoffMultiplier: 2,
  },
});

const result = await agent.run(
  "Explain what an AI agent is."
);

console.log(result.output);
```

## Goals

The goal of Maya-Agent is to provide a clear and extensible foundation for building AI agents without hiding the core implementation behind a large framework.

The project focuses on understanding how an AI Agent SDK works internally.

Key goals:

- Keep the architecture understandable
- Make components modular
- Support extensibility
- Provide practical agent features
- Make the implementation easy to learn from
- Build an open-source foundation for future development

## Roadmap

Potential future improvements include:

- More model providers
- Persistent production-grade memory
- Advanced graph retrieval
- Better context management
- Parallel tool execution
- Tool approval workflows
- Advanced multi-agent orchestration
- Agent planning
- Evaluation framework
- OpenTelemetry support
- More streaming capabilities
- Plugin system
- CLI support
- Additional test coverage

## Why Maya-Agent?

Many AI agent frameworks abstract away how agents actually work.

Maya-Agent is built from scratch to explore the internal building blocks of an agent system:

```text
User Input
    |
    v
Guardrails
    |
    v
Memory Retrieval
    |
    v
Model Reasoning
    |
    v
Tool Calling
    |
    v
Tool Execution
    |
    v
Agent Loop
    |
    v
Output Validation
    |
    v
Final Response
    |
    v
Background Memory Processing
```

The goal is not to hide the runtime, but to make the runtime understandable.

## Contributing

Contributions, ideas, and improvements are welcome.

To contribute:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests where applicable
5. Submit a pull request

## License

MIT License

## Author

**Suman Preet Singh Bagal**

Built as an open-source AI Agent SDK from scratch.

## Repository

https://github.com/SumanX08/Maya-Agent
