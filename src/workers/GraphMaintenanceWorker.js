export class GraphMaintenanceWorker {
  constructor({
    graphMemory,
    eventBus,
    minimumConfidence = 0.35,
    confidenceDecay = 0.05
  }) {
    if (!graphMemory) {
      throw new Error(
        "Graph memory is required"
      );
    }

    this.graphMemory = graphMemory;
    this.eventBus = eventBus;

    this.minimumConfidence =
      minimumConfidence;

    this.confidenceDecay =
      confidenceDecay;
  }

  start() {
    if (!this.eventBus) {
      throw new Error(
        "EventBus is required to start graph maintenance worker"
      );
    }

    this.eventBus.on(
      "relationship.building.completed",
      async event => {
        try {
          await this.process(event);
        } catch (error) {
          console.error(
            "Background graph maintenance failed:",
            error
          );
        }
      }
    );
  }

  async process({
    runId,
    sessionId
  }) {
    const startedAt = Date.now();

    this.eventBus?.emit(
      "graph.maintenance.started",
      {
        runId,
        sessionId
      }
    );

    const relationships =
      await this.graphMemory
        .getRelationshipsForMaintenance({
          limit: 100
        });

    const updated = [];
    const removed = [];
    const skipped = [];

    for (const relationship of relationships) {

      // Explicitly extracted facts are protected.
      if (
        relationship.source ===
        "memory-extraction"
      ) {
        skipped.push({
          ...relationship,
          reason:
            "Explicit memory is protected"
        });

        continue;
      }

      // Relationships without confidence
      // are treated as stable unless they
      // were created by the relationship builder.
      if (
        relationship.source !==
        "relationship-builder"
      ) {
        skipped.push({
          ...relationship,
          reason:
            "Relationship is not maintenance eligible"
        });

        continue;
      }

      const currentConfidence =
        relationship.confidence ?? 1;

      const newConfidence = Math.max(
        0,Number(
    (
      currentConfidence -
      this.confidenceDecay
    ).toFixed(2)
  ),
        currentConfidence -
          this.confidenceDecay
      );

      if (
        newConfidence <
        this.minimumConfidence
      ) {
        await this.graphMemory
          .removeRelationship({
            from: relationship.from,
            relationship:
              relationship.relation,
            to: relationship.to
          });

        removed.push({
          ...relationship,
          oldConfidence:
            currentConfidence,
          newConfidence
        });

        continue;
      }

      await this.graphMemory
        .updateRelationshipConfidence({
          from: relationship.from,
          relationship:
            relationship.relation,
          to: relationship.to,
          confidence: newConfidence
        });

      updated.push({
        ...relationship,
        oldConfidence:
          currentConfidence,
        newConfidence
      });
    }

    const result = {
      runId,
      sessionId,

      relationshipsScanned:
        relationships.length,

      relationshipsUpdated:
        updated.length,

      relationshipsRemoved:
        removed.length,

      relationshipsSkipped:
        skipped.length,

      updated,
      removed,

      durationMs:
        Date.now() - startedAt
    };

    this.eventBus?.emit(
      "graph.maintenance.completed",
      result
    );

    return result;
  }
}