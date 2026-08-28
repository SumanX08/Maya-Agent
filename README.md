# Maya-Agent

An open-source AI Agent SDK built from scratch with JavaScript.

Maya-Agent provides a modular foundation for building AI agents with:

- 🤖 LLM-powered agents
- 🛠️ Function calling and tools
- 💬 Session memory
- 🧠 Long-term graph memory
- 🔗 Automatic relationship building
- 🛡️ Input, output, and tool guardrails
- 📦 Structured outputs with Zod
- 🔄 Retries and timeouts
- 🔀 Multi-agent handoffs
- 🌊 Streaming responses
- 📊 Event-based tracing
- ⚙️ Background workers

The project is designed to be simple, extensible, and easy to understand.

---

## Features

### 🤖 Agent Execution

Create and run AI agents with instructions, models, tools, memory, guardrails, and background workers.

```js
import {
  Agent,
  OpenAIProvider
} from "./src/index.js";

const model = new OpenAIProvider({
  model: "gpt-4.1-mini"
});

const agent = new Agent({
  name: "Assistant",
  instructions: "You are a helpful AI assistant.",
  model
});

const result = await agent.run(
  "What is an AI agent?"
);

console.log(result.output);
```

---

## 🛠️ Tools

Maya-Agent supports function calling through validated tools.

Tools use Zod schemas for input validation.

```js
import { Tool } from "./src/index.js";
import { z } from "zod";

const weatherTool = new Tool({
  name: "getWeather",

  description:
    "Get the weather for a city.",

  schema: z.object({
    city: z.string()
  }),

  execute: async ({ city }) => {
    return {
      city,
      temperature: "28°C"
    };
  }
});
```

Add the tool to an agent:

```js
const agent = new Agent({
  name: "WeatherAgent",

  instructions:
    "You are a helpful weather assistant.",

  model,

  tools: [
    weatherTool
  ]
});
```

---

## 💬 Session Memory

Sessions store conversation history for an agent.

```js
import { Session } from "./src/index.js";

const session = new Session();

session.addMessage({
  role: "user",
  content: "Hello!"
});

console.log(
  session.getMessages()
);
```

Maya-Agent also includes:

```js
import {
  InMemorySessionStore,
  FileSessionStore
} from "./src/index.js";
```

---

## 🧠 Graph Memory

Maya-Agent supports long-term memory using a graph database.

The graph can store:

- Entities
- Technologies
- Projects
- People
- Relationships

Example:

```text
Suman
  │
  └── WORKS_ON ──> Maya-Agent
                        │
                        ├── USES ──> Node.js
                        │
                        └── USES ──> Neo4j
```

### Setup Graph Memory

```js
import {
  GraphClient,
  GraphMemory
} from "./src/index.js";

const graph = new GraphClient();

const graphMemory =
  new GraphMemory(graph);
```

Attach graph memory to an agent:

```js
const agent = new Agent({
  name: "MemoryAgent",

  instructions:
    "You are a helpful assistant.",

  model,

  memory: graphMemory
});
```

---

## 🧠 Automatic Memory Extraction

Background workers can extract entities and relationships from conversations.

```js
import {
  MemoryExtractionModel,
  MemoryExtractionWorker
} from "./src/index.js";

const extractionModel =
  new MemoryExtractionModel({
    model
  });

const memoryWorker =
  new MemoryExtractionWorker({
    extractionModel,
    graphMemory,
    eventBus
  });
```

Attach the worker:

```js
const agent = new Agent({
  name: "MemoryAgent",

  instructions:
    "You are a helpful assistant.",

  model,

  eventBus,

  backgroundWorkers: [
    memoryWorker
  ]
});
```

Example extracted memory:

```text
Maya-Agent --USES--> Node.js
Maya-Agent --USES--> Neo4j
```

---

## 🔗 Relationship Builder

Maya-Agent can analyze existing graph knowledge and infer additional relationships.

For example:

```text
Suman --WORKS_ON--> Maya-Agent

Maya-Agent --USES--> Node.js
```

The relationship builder may infer:

```text
Suman --USES--> Node.js
```

Relationship candidates can include:

- Source entity
- Target entity
- Relationship type
- Confidence
- Reason

Maya-Agent also avoids creating duplicate relationships.

---

## 🧹 Graph Maintenance

Graph relationships can be maintained in the background.

Maintenance can:

- Scan existing relationships
- Update confidence scores
- Remove outdated relationships
- Track maintenance timestamps
- Skip relationships that do not require updates

Example:

```text
relationshipsScanned: 5
relationshipsUpdated: 2
relationshipsRemoved: 0
relationshipsSkipped: 3
```

---

## 🛡️ Guardrails

Maya-Agent supports guardrails at multiple stages.

### Input Guardrails

Validate user input before the model is called.

```js
import { Guardrail } from "./src/index.js";

const noEmptyInput =
  new Guardrail({
    name: "no-empty-input",

    validate: ({ input }) => {
      return {
        passed:
          input.trim().length > 0,

        message:
          "Input cannot be empty."
      };
    }
  });
```

### Output Guardrails

Validate the model response before returning it.

Output guardrails can be used to:

- Block unwanted responses
- Validate formatting
- Enforce application rules
- Filter unsafe output

### Tool Guardrails

Validate tool execution before a tool runs.

```js
const dangerousToolGuardrail =
  new Guardrail({
    name:
      "block-dangerous-tools",

    validate: ({ tool }) => {
      if (
        tool.name === "deleteData"
      ) {
        return {
          passed: false,

          message:
            "Dangerous tool execution requires approval."
        };
      }

      return {
        passed: true
      };
    }
  });
```

---

## 📦 Structured Output

Maya-Agent supports structured model responses using Zod schemas.

```js
import { z } from "zod";

const outputSchema =
  z.object({
    answer: z.string(),

    confidence:
      z.number()
        .min(0)
        .max(1),

    topics:
      z.array(
        z.string()
      )
  });
```

Use it with an agent:

```js
const agent = new Agent({
  name: "ResearchAgent",

  instructions:
    "You are a research assistant.",

  model,

  outputSchema
});
```

Example result:

```js
{
  answer:
    "An AI agent is a system that can perceive, reason, and act toward a goal.",

  confidence: 0.95,

  topics: [
    "Artificial Intelligence",
    "AI Agents",
    "Autonomous Systems"
  ]
}
```

The final model response is validated against the provided Zod schema.

---

## 🔄 Reliability

Maya-Agent includes retry support for failed model calls.

```js
import {
  RetryPolicy
} from "./src/index.js";

const retryPolicy =
  new RetryPolicy({
    maxAttempts: 3,

    initialDelay: 500,

    backoffMultiplier: 2
  });
```

Example retry behavior:

```text
Attempt 1 → Failed

Wait 500ms

Attempt 2 → Failed

Wait 1000ms

Attempt 3 → Success
```

---

## ⏱️ Timeouts

Model calls can be protected using timeouts.

```js
const agent = new Agent({
  name: "ReliableAgent",

  instructions:
    "You are a helpful assistant.",

  model,

  timeoutMs: 10000
});
```

If the model does not respond within the configured timeout, the request can fail or retry according to the configured retry policy.

---

## 🔀 Agent Handoffs

Agents can transfer tasks to specialized agents.

Example:

```text
SupportAgent
      │
      │ Billing issue
      ▼
BillingAgent
```

```js
const supportAgent =
  new Agent({
    name: "SupportAgent",

    instructions:
      "Handle general support requests.",

    model,

    handoffs: [
      billingAgent
    ]
  });
```

The handoff system tracks:

- Run ID
- Source agent
- Target agent
- Handoff reason
- Handoff count

---

## 🌊 Streaming

Maya-Agent supports streaming model responses.

Streaming allows applications to display responses progressively instead of waiting for the complete response.

This is useful for:

- Chat applications
- CLI agents
- Real-time interfaces
- Long model responses

---

## 📊 Tracing

Maya-Agent includes event-based tracing for observing agent execution.

```js
import {
  TraceCollector
} from "./src/index.js";

const tracer =
  new TraceCollector();
```

Example trace events:

```text
model.started
model.completed
tool.started
tool.completed
```

Example trace:

```js
{
  runId:
    "14d2ce57-07d5-46d7-b05a-8c059ec0ebb9",

  agent:
    "TracingAgent",

  type:
    "model.completed",

  step: 0,

  durationMs: 33834,

  usage: {
    input_tokens: 24,
    output_tokens: 100,
    total_tokens: 124
  }
}
```

---

## ⚙️ Event System

Maya-Agent uses an event-driven architecture.

```js
import {
  EventBus
} from "./src/index.js";

const eventBus =
  new EventBus();
```

Listen for events:

```js
eventBus.on(
  "run.completed",

  event => {
    console.log(
      "Agent run completed:",
      event.runId
    );
  }
);
```

Example events include:

```text
run.completed
run.retry
guardrail.triggered
memory.extraction.completed
relationship.building.started
relationship.building.completed
```

---

## 🏗️ Architecture

```text
                ┌───────────────┐
                │     Agent     │
                └───────┬───────┘
                        │
                        ▼
                ┌───────────────┐
                │  AgentRunner  │
                └───────┬───────┘
                        │
          ┌─────────────┼─────────────┐
          │             │             │
          ▼             ▼             ▼
     Guardrails      Model         Memory
          │             │             │
          │             │             ▼
          │             │       Graph Memory
          │             │             │
          ▼             ▼             ▼
        Tools      Tool Calls    Background Workers
                        │
                        ▼
                  Final Response
```

---

## 📁 Project Structure

```text
Maya-Agent
│
├── examples
│   ├── basic.js
│   ├── agent-memory.js
│   ├── guardrails.js
│   ├── structured-output.js
│   ├── reliability.js
│   ├── handoffs.js
│   └── tracing.js
│
├── src
│   │
│   ├── agent
│   │   ├── Agent.js
│   │   └── AgentRunner.js
│   │
│   ├── errors
│   │   ├── GuardrailError.js
│   │   └── OutputValidationError.js
│   │
│   ├── events
│   │   └── EventBus.js
│   │
│   ├── graph
│   │   └── GraphClient.js
│   │
│   ├── guardrails
│   │   └── Guardrail.js
│   │
│   ├── handoffs
│   │   └── HandoffManager.js
│   │
│   ├── memory
│   │   ├── Session.js
│   │   ├── SessionStore.js
│   │   ├── FileSessionStore.js
│   │   ├── GraphMemory.js
│   │   ├── GraphRetriever.js
│   │   ├── MemoryExtractionModel.js
│   │   └── RelationshipBuilderModel.js
│   │
│   ├── models
│   │   ├── ModelProvider.js
│   │   └── OpenAIProvider.js
│   │
│   ├── reliability
│   │   ├── RetryPolicy.js
│   │   └── withTimeout.js
│   │
│   ├── tools
│   │   ├── Tool.js
│   │   └── Tools.js
│   │
│   ├── tracing
│   │   └── TraceCollector.js
│   │
│   ├── workers
│   │   ├── MemoryExtractionWorker.js
│   │   ├── RelationshipBuilderWorker.js
│   │   └── BackgroundWorkerManager.js
│   │
│   └── index.js
│
├── tests
│
├── .env
├── .gitignore
├── package.json
└── README.md
```

---

## Installation

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

---

## Environment Variables

Create a `.env` file:

```env
OPENAI_API_KEY=your_openai_api_key
```

For graph memory, configure Neo4j:

```env
NEO4J_URI=your_neo4j_uri
NEO4J_USERNAME=your_username
NEO4J_PASSWORD=your_password
```

---

## Running an Example

```bash
node examples/basic.js
```

Example output:

```text
[Agent] Step 1

Agent: Assistant

Response:

An AI agent is a computer program that can observe,
make decisions, and take actions to achieve a goal.
```

---

## Testing

Run the test suite:

```bash
npm test
```

The current test suite covers core functionality including:

- Tools
- Tool validation
- Sessions
- EventBus
- Guardrails
- Retry policies

Example output:

```text
✔ EventBus calls registered listener
✔ EventBus supports multiple listeners
✔ Guardrail passes when validation succeeds
✔ Guardrail fails when validation fails
✔ RetryPolicy retries after failure
✔ Session stores messages
✔ Tool executes with valid input

pass
```

---

## Core Exports

Maya-Agent currently exports:

```js
export {
  Agent,
  ModelProvider,
  OpenAIProvider,

  Tool,
  tool,

  EventBus,

  Session,
  InMemorySessionStore,
  FileSessionStore,

  GraphClient,
  GraphMemory,
  GraphRetriever,

  MemoryExtractionModel,
  MemoryExtractionWorker,

  BackgroundWorkerManager,

  RelationshipBuilderModel,
  RelationshipBuilderWorker,

  Guardrail,
  GuardrailError,

  OutputValidationError,

  RetryPolicy,
  withTimeout,

  HandoffManager,

  TraceCollector
};
```

---

## Complete Agent Example

```js
import "dotenv/config";

import {
  Agent,
  OpenAIProvider,
  EventBus
} from "../src/index.js";

const eventBus =
  new EventBus();

const model =
  new OpenAIProvider({
    model: "gpt-4.1-mini"
  });

const agent =
  new Agent({
    name: "Maya",

    instructions:
      "You are a helpful AI assistant.",

    model,

    eventBus,

    maxSteps: 10,

    timeoutMs: 15000,

    retryPolicy: {
      maxAttempts: 3,
      initialDelay: 500,
      backoffMultiplier: 2
    }
  });

const result =
  await agent.run(
    "Explain what an AI agent is."
  );

console.log(
  result.output
);
```

---

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

---

## Roadmap

Future improvements may include:

- [ ] More model providers
- [ ] Persistent production-grade memory
- [ ] Advanced graph retrieval
- [ ] Better context management
- [ ] Parallel tool execution
- [ ] Tool approval workflows
- [ ] Advanced multi-agent orchestration
- [ ] Agent planning
- [ ] Evaluation framework
- [ ] OpenTelemetry support
- [ ] More streaming capabilities
- [ ] Plugin system
- [ ] CLI support
- [ ] Additional test coverage

---

## Why Maya-Agent?

Most AI agent frameworks abstract away how agents actually work.

Maya-Agent is being built from scratch to explore the internal building blocks of an agent system:

```text
User Input
    ↓
Guardrails
    ↓
Memory Retrieval
    ↓
Model Reasoning
    ↓
Tool Calling
    ↓
Tool Execution
    ↓
Agent Loop
    ↓
Output Validation
    ↓
Final Response
    ↓
Background Memory Processing
```

---

## Contributing

Contributions, ideas, and improvements are welcome.

To contribute:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests where applicable
5. Submit a pull request

---

## License

MIT License

---

## Author

**Suman Preet Singh Bagal**

Built as an open-source AI Agent SDK from scratch.

## Repository

https://github.com/SumanX08/Maya-Agent
