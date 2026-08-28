import "dotenv/config";

import { GraphClient } from "../src/index.js";

const graph = new GraphClient();

const connected =
  await graph.verifyConnection();

console.log(
  connected
    ? "Neo4j connected successfully"
    : "Neo4j connection failed"
);

await graph.close();