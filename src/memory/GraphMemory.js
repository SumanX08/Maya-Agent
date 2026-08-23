import neo4j from "neo4j-driver";

const ALLOWED_RELATIONSHIPS = new Set([
  "WORKS_ON",
  "USES",
  "PREFERS",
  "KNOWS",
  "INTERESTED_IN",
  "MENTIONS",
  "RELATED_TO"
]);

export class GraphMemory {
  constructor(graphClient) {
    this.graph = graphClient;
  }

  async addNode({
    id,
    type,
    properties = {}
  }) {
    const query = `
      MERGE (n:Entity {id: $id})
      SET n.type = $type,
          n += $properties
      RETURN n
    `;

    const result = await this.graph.run(
      query,
      {
        id,
        type,
        properties
      }
    );

    return result.records[0]?.get("n");
  }

  async addRelationship({
    from,
    relationship,
    to,
    properties = {}
  }) {
    if (!ALLOWED_RELATIONSHIPS.has(relationship)) {
      throw new Error(
        `Unsupported relationship type: ${relationship}`
      );
    }

    const query = `
      MATCH (a:Entity {id: $from})
      MATCH (b:Entity {id: $to})
      MERGE (a)-[r:${relationship}]->(b)
      SET r += $properties
      RETURN r
    `;

    const result = await this.graph.run(
      query,
      {
        from,
        to,
        properties
      }
    );

    return result.records[0]?.get("r");
  }

  async getNode(id) {
    const query = `
      MATCH (n:Entity {id: $id})
      RETURN n
    `;

    const result = await this.graph.run(
      query,
      { id }
    );

    return result.records[0]?.get("n") || null;
  }

  async getContext(id) {
    const query = `
      MATCH (start:Entity {id: $id})
      OPTIONAL MATCH (start)-[r]-(related:Entity)
      RETURN start, r, related
    `;

    const result = await this.graph.run(
      query,
      { id }
    );

    return result.records.map(record => ({
      start: record.get("start")?.properties,
      relationship: record.get("r")?.type || null,
      related: record.get("related")?.properties
    }));
  }

  async rememberFact({
    subject,
    relation,
    object,
    properties = {}
  }) {
    await this.addNode({
      id: subject.id,
      type: subject.type,
      properties: subject.properties
    });

    await this.addNode({
      id: object.id,
      type: object.type,
      properties: object.properties
    });

    await this.addRelationship({
      from: subject.id,
      relationship: relation,
      to: object.id,
      properties
    });
  }

  async getNeighborhood({
  nodeId,
  depth = 1
}) {
  if (
    !Number.isInteger(depth) ||
    depth < 1 ||
    depth > 3
  ) {
    throw new Error(
      "Neighborhood depth must be an integer between 1 and 3"
    );
  }

  const query = `
    MATCH path =
      (start:Entity {id: $nodeId})
      -[*1..${depth}]-
      (related:Entity)

    UNWIND relationships(path) AS rel

    WITH
      startNode(rel).id AS from,
      type(rel) AS relation,
      endNode(rel).id AS to

    RETURN DISTINCT
      from,
      relation,
      to

    LIMIT 100
  `;

  const result =
    await this.graph.run(
      query,
      { nodeId }
    );

  return result.records.map(record => ({
    from: record.get("from"),
    relation: record.get("relation"),
    to: record.get("to")
  }));
  }

  async relationshipExists({
  from,
  relationship,
  to
}) {
  const query = `
    MATCH (a:Entity {id: $from})
    MATCH (b:Entity {id: $to})
    MATCH (a)-[r:${relationship}]->(b)
    RETURN count(r) > 0 AS exists
  `;

  const result = await this.graph.run(
    query,
    {
      from,
      to
    }
  );

  return result.records[0]?.get("exists") || false;
  }

  async getRelationshipsForMaintenance({
  limit = 100
} = {}) {
  const query = `
    MATCH (a:Entity)-[r]->(b:Entity)
    RETURN
      a.id AS from,
      a.type AS fromType,
      a.name AS fromName,
      type(r) AS relation,
      r.confidence AS confidence,
      r.source AS source,
      r.reason AS reason,
      r.lastMaintainedAt AS lastMaintainedAt,
      b.id AS to,
      b.type AS toType,
      b.name AS toName
    ORDER BY
      coalesce(r.confidence, 1.0) ASC
    LIMIT $limit
  `;

  const result = await this.graph.run(
    query,
    { 
      limit:neo4j.int(limit)

     }
  );

  return result.records.map(record => ({
    from: record.get("from"),
    fromType: record.get("fromType"),
    fromName: record.get("fromName"),

    relation: record.get("relation"),

    confidence:
      record.get("confidence"),

    source:
      record.get("source"),

    reason:
      record.get("reason"),

    lastMaintainedAt:
      record.get("lastMaintainedAt"),

    to: record.get("to"),
    toType: record.get("toType"),
    toName: record.get("toName")
  }));
  
  }

  async updateRelationshipConfidence({
  from,
  relationship,
  to,
  confidence
}) {
  const query = `
    MATCH (a:Entity {id: $from})
    MATCH (b:Entity {id: $to})
    MATCH (a)-[r:${relationship}]->(b)

    SET r.confidence = $confidence,
        r.lastMaintainedAt = datetime()

    RETURN r
  `;

  const result = await this.graph.run(
    query,
    {
      from,
      to,
      confidence
    }
  );

  return result.records[0]?.get("r") || null;
 }

 async removeRelationship({
  from,
  relationship,
  to
}) {
  const query = `
    MATCH (a:Entity {id: $from})
    MATCH (b:Entity {id: $to})
    MATCH (a)-[r:${relationship}]->(b)

    DELETE r

    RETURN count(r) AS deleted
  `;

  const result = await this.graph.run(
    query,
    {
      from,
      to
    }
  );

  return result.records[0]?.get("deleted") || 0;
 }

}