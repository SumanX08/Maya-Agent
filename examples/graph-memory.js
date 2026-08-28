import "dotenv/config";

import {
  GraphClient,
  GraphMemory
} from "../src/index.js";

const graph = new GraphClient();

const memory = new GraphMemory(graph);

await memory.rememberFact({
  subject: {
    id: "suman",
    type: "person",
    properties: {
      name: "Suman"
    }
  },

  relation: "WORKS_ON",

  object: {
    id: "sumanx",
    type: "project",
    properties: {
      name: "SumanX Agent SDK"
    }
  }
});

await memory.rememberFact({
  subject: {
    id: "sumanx",
    type: "project",
    properties: {
      name: "SumanX Agent SDK"
    }
  },

  relation: "USES",

  object: {
    id: "nodejs",
    type: "technology",
    properties: {
      name: "Node.js"
    }
  }
});

await memory.rememberFact({
  subject: {
    id: "sumanx",
    type: "project",
    properties: {
      name: "SumanX Agent SDK"
    }
  },

  relation: "USES",

  object: {
    id: "neo4j",
    type: "technology",
    properties: {
      name: "Neo4j"
    }
  }
});

console.log("Graph memory created.");

const context =
  await memory.getContext("sumanx");

console.log("\nContext:");
console.dir(context, {
  depth: null
});

await graph.close();