export class GraphRetriever {
  constructor({
    graphMemory,
    maxResults = 20
  }) {
    if (!graphMemory) {
      throw new Error(
        "Graph memory is required"
      );
    }

    this.graphMemory = graphMemory;
    this.maxResults = maxResults;
  }

  async retrieve({
    entityIds = []
  }) {
    if (entityIds.length === 0) {
      return [];
    }

    const results = [];

    for (const entityId of entityIds) {
      const context =
        await this.graphMemory.getNeighborhood({
          nodeId: entityId,
          depth: 1
        });

      results.push(...context);
    }

    // Remove duplicate relationships
    const unique = new Map();

    for (const relationship of results) {
      const key =
        `${relationship.from}:${relationship.relation}:${relationship.to}`;

      unique.set(
        key,
        relationship
      );
    }

    return [
      ...unique.values()
    ].slice(
      0,
      this.maxResults
    );
  }
}