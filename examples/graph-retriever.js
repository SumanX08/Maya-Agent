import "dotenv/config";

import {
  GraphClient,
  GraphMemory,
  GraphRetriever
} from "../src/index.js";

const graph =
  new GraphClient();

const graphMemory =
  new GraphMemory(graph);

const retriever =
  new GraphRetriever({
    graphMemory
  });

try {
  const result =
    await retriever.retrieve({
      entityIds: ["sumanx"]
    });

  console.log(
    "\n🧠 Retrieved graph memory:"
  );

  console.dir(
    result,
    { depth: null }
  );

} finally {
  await graph.close();
}