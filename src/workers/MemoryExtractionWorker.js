export class MemoryExtractionWorker {
  constructor({
    extractionModel,
    graphMemory,
    eventBus
  }) {
    if (!extractionModel) {
      throw new Error(
        "Memory extraction model is required"
      );
    }

    if (!graphMemory) {
      throw new Error(
        "Graph memory is required"
      );
    }

    this.extractionModel = extractionModel;
    this.graphMemory = graphMemory;
    this.eventBus = eventBus;
    this.started = false;
  }

  start() {
    if (!this.eventBus) {
      throw new Error(
        "EventBus is required to start the memory worker"
      );
    }

    if (this.started) {
      return;
    }

    this.started = true;

    this.eventBus.on(
      "run.completed",
      async event => {
        try {
          await this.process({
            runId: event.runId,
            sessionId: event.sessionId,
            messages: event.messages
          });
        } catch (error) {
          console.error(
            "Background memory extraction failed:",
            error
          );
        }
      }
    );
  }

  async process({
    runId,
    sessionId,
    messages
  }) {
    const startedAt = Date.now();

    try {
      this.eventBus?.emit(
        "memory.extraction.started",
        {
          runId,
          sessionId
        }
      );

      const memory =
        await this.extractionModel.extract(
          messages
        );

      for (const entity of memory.entities) {
        await this.graphMemory.addNode({
          id: entity.id,
          type: entity.type,
          properties: {
            name: entity.name
          }
        });
      }

      for (
        const relationship
        of memory.relationships
      ) {
        await this.graphMemory.addRelationship({
          from: relationship.from,
          relationship: relationship.relation,
          to: relationship.to
        });
      }

      const result = {
  runId,
  sessionId,

  entityIds: memory.entities.map(
    entity => entity.id
  ),

  entitiesCreated:
    memory.entities.length,

  relationshipsCreated:
    memory.relationships.length,

  durationMs:
    Date.now() - startedAt
};

      this.eventBus?.emit(
        "memory.extraction.completed",
        result
      );

      return result;

    } catch (error) {
      this.eventBus?.emit(
        "memory.extraction.failed",
        {
          runId,
          sessionId,
          error
        }
      );

      throw error;
    }
  }
}