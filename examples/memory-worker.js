import "dotenv/config";

import {
  OpenAIProvider,
  MemoryExtractionModel,
  MemoryExtractionWorker,
  GraphClient,
  GraphMemory,
  EventBus
} from "../src/index.js";

const eventBus = new EventBus();

eventBus.on(
  "memory.extraction.started",
  event => {
    console.log(
      "🧠 Memory extraction started:",
      event
    );
  }
);

eventBus.on(
  "memory.extraction.completed",
  event => {
    console.log(
      "✅ Memory extraction completed:",
      event
    );
  }
);

eventBus.on(
  "memory.extraction.failed",
  event => {
    console.error(
      "❌ Memory extraction failed:",
      event.error
    );
  }
);

const graph = new GraphClient();

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

const worker =
  new MemoryExtractionWorker({
    extractionModel,
    graphMemory,
    eventBus

  });

  worker.start();

const messages = [
  {
    role: "user",
    content:
      "I'm building an AI Agent SDK called SumanX using Node.js. I'm using Neo4j for graph memory."
  }
];

const result=eventBus.emit(
  "run.completed",
  {
    runId: "test-run-1",
    sessionId: "test-session-1",
    messages
  }
);

console.log(result)

await new Promise(
  resolve => setTimeout(resolve, 8000)
);

  



await graph.close();