export class RelationshipBuilderWorker {
  constructor({
    relationshipModel,
    graphMemory,
    eventBus,
    confidenceThreshold = 0.75
  }) {
    if (!relationshipModel) {
      throw new Error(
        "Relationship builder model is required"
      );
    }

    if (!graphMemory) {
      throw new Error(
        "Graph memory is required"
      );
    }

    this.relationshipModel =
      relationshipModel;

    this.graphMemory =
      graphMemory;

    this.eventBus =
      eventBus;

    this.confidenceThreshold =
      confidenceThreshold;
  }

  start() {
    if (!this.eventBus) {
      throw new Error(
        "EventBus is required to start relationship worker"
      );
    }

    this.eventBus.on(
      "memory.extraction.completed",
      async event => {
        try {
          await this.process(event);
        } catch (error) {
          console.error(
            "Background relationship builder failed:",
            error
          );
        }
      }
    );
  }

  async process({
  runId,
  sessionId,
  entityIds = []

}) {
  const startedAt = Date.now();

  console.log(
    "\n🔗 Relationship builder started internally"
  );
   if (entityIds.length === 0) {
    console.log(
      "🔗 No affected entities. Skipping relationship builder."
    );

    return {
      runId,
      sessionId,
      relationshipsCreated: 0,
      relationshipsSkipped: 0,
      relationships: [],
      skipped: [],
      durationMs: 0
    };
  }

  this.eventBus?.emit(
    "relationship.building.started",
    {
      runId,
      sessionId
    }
  );

  const graphContexts = [];

for (const entityId of entityIds) {
  const context =
    await this.graphMemory.getNeighborhood({
      nodeId: entityId,
      depth: 1
    });

  graphContexts.push(...context);
}

const uniqueRelationships = new Map();

for (const relationship of graphContexts) {
  const key =
    `${relationship.from}:${relationship.relation}:${relationship.to}`;

  uniqueRelationships.set(
    key,
    relationship
  );
}

const graphContext =
  [...uniqueRelationships.values()];

  console.log(
    "\n🔗 Graph context:"
  );

  console.dir(graphContext, {
    depth: null
  });

  const candidates =
    await this.relationshipModel.analyze(
      graphContext
    );

  console.log(
    "\n🔗 Relationship candidates:"
  );

  console.dir(candidates, {
    depth: null
  });

  const created = [];
  const skipped = [];

  for (const candidate of candidates) {

    if (
      candidate.confidence <
      this.confidenceThreshold
    ) {
      skipped.push({
        ...candidate,
        reason:
          "Confidence below threshold"
      });

      continue;
    }

    const exists =
      await this.graphMemory.relationshipExists({
        from: candidate.from,
        relationship: candidate.relation,
        to: candidate.to
      });

    console.log(
      `Checking ${candidate.from} -[${candidate.relation}]-> ${candidate.to}: ${exists ? "EXISTS" : "NEW"}`
    );

    if (exists) {
      skipped.push({
        ...candidate,
        reason:
          "Relationship already exists"
      });

      continue;
    }

    await this.graphMemory.addRelationship({
      from: candidate.from,
      relationship: candidate.relation,
      to: candidate.to,
      properties: {
        confidence: candidate.confidence,
        reason: candidate.reason,
        source: "relationship-builder"
      }
    });

    created.push(candidate);
  }

  
  const result = {
    runId,
    sessionId,
    relationshipsCreated:
      created.length,
    relationshipsSkipped:
      skipped.length,
    relationships: created,
    skipped,
    durationMs:
      Date.now() - startedAt
  };

  this.eventBus?.emit(
    "relationship.building.completed",
    result
  );

  return result;
}
}