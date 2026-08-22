import "dotenv/config";

import {
  Agent,
  OpenAIProvider,
  EventBus,
  GraphClient,
  GraphMemory,
  MemoryExtractionModel,
  MemoryExtractionWorker,
  RelationshipBuilderModel,
  RelationshipBuilderWorker
} from "../src/index.js";

const eventBus = new EventBus();

eventBus.on(
  "run.completed",
  event => {
    console.log(
      "\n🚀 Agent run completed:",
      event.runId
    );
  }
);

eventBus.on(
  "memory.extraction.completed",
  event => {
    console.log(
      "\n🧠 Background memory updated:",
      event
    );
  }
);

eventBus.on(
  "relationship.building.started",
  event => {
    console.log(
      "\n🔗 Relationship building started:",
      event
    );
  }
);

eventBus.on(
  "relationship.building.completed",
  event => {
    console.log(
      "\n🔗 Relationships updated:",
      event
    );
  }
);

const graph =
  new GraphClient();

const graphMemory =
  new GraphMemory(graph);

const provider =
  new OpenAIProvider({
    model: "gpt-4.1-mini"
  });

const extractionModel =
  new MemoryExtractionModel({
    model: provider
  });

const memoryWorker =
  new MemoryExtractionWorker({
    extractionModel,
    graphMemory,
    eventBus
  });

const relationshipModel =
  new RelationshipBuilderModel({
    model: provider
  });

const relationshipWorker =
  new RelationshipBuilderWorker({
    relationshipModel,
    graphMemory,
    eventBus
  });

const agent =
  new Agent({
    name: "SumanAssistant",

    instructions:
      "You are a helpful personal assistant.",

    model: provider,

    eventBus,

    backgroundWorkers: [
      memoryWorker,
      relationshipWorker
    ]
  });

const result =
  await agent.run(
    "I'm building an AI Agent SDK called SumanX using Node.js and Neo4j."
  );

console.log(
  "\n🤖 Agent response:"
);

console.log(result.output);

// Demo only:
// keep process alive so background workers
// can finish before Neo4j is closed.
await new Promise(
  resolve => setTimeout(resolve, 10000)
);

await graph.close();