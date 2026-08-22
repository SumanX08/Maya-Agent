import "dotenv/config";

import {
  OpenAIProvider,
  RelationshipBuilderModel,
  GraphClient,
  GraphMemory
} from "../src/index.js";

const graph =
  new GraphClient();

const graphMemory =
  new GraphMemory(graph);

const provider =
  new OpenAIProvider({
    model: "gpt-4.1-mini"
  });

const relationshipModel =
  new RelationshipBuilderModel({
    model: provider
  });

try {

  const graphContext =
    await graphMemory.getNeighborhood({
      nodeId: "sumanx",
      depth: 1
    });

  console.log(
    "\nExisting relationships:"
  );

  console.dir(
    graphContext,
    { depth: null }
  );

  const result =
    await relationshipModel.analyze(
      graphContext
    );

  console.log(
    "\nCandidate relationships:"
  );

  console.dir(
    result,
    { depth: null }
  );

} finally {
  await graph.close();
}