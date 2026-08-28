import "dotenv/config";

import {
  GraphClient,
  GraphMemory
} from "../src/index.js";

const graph = new GraphClient();

const graphMemory =
  new GraphMemory(graph);

try {
  const context =
    await graphMemory.getNeighborhood({
      nodeId: "sumanx",
      depth: 1
    });

  console.dir(context, {
    depth: null
  });

} finally {
  await graph.close();
}