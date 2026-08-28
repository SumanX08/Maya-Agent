import {
  RelationshipBuilderSchema
} from "./RelationshipSchema.js";

const RELATIONSHIP_PROMPT = `
You are a graph relationship analysis system.

Your job is to identify NEW meaningful relationships
that should exist between entities in a knowledge graph.

You will receive a list of existing relationships.

Each relationship has this structure:

{
  "from": "entity-id",
  "relation": "RELATIONSHIP_TYPE",
  "to": "entity-id"
}

Return ONLY this JSON:

{
  "relationships": [
    {
      "from": "entity-id",
      "relation": "WORKS_ON | USES | PREFERS | KNOWS | INTERESTED_IN | MENTIONS | RELATED_TO",
      "to": "entity-id",
      "confidence": 0.0,
      "reason": "why this new relationship is supported"
    }
  ]
}

Rules:

1. Only use entity IDs that appear in the provided graph.

2. Do NOT return relationships that already exist.

3. Do NOT reverse an existing relationship unless
   there is explicit evidence that the reverse relationship
   is meaningful.

4. Do not invent facts.

5. Do not rely solely on general world knowledge.

6. Only suggest relationships that are strongly supported
   by the provided graph context.

7. Confidence must be between 0 and 1.

8. If there are no meaningful new relationships,
   return:

{
  "relationships": []
}

Return ONLY valid JSON.
Do not use markdown.
`;

export class RelationshipBuilderModel {
  constructor({
    model,
    maxRetries = 2,
    confidenceThreshold = 0.75
  }) {
    if (!model) {
      throw new Error(
        "Relationship builder model is required"
      );
    }

    this.model = model;
    this.maxRetries = maxRetries;
    this.confidenceThreshold =
      confidenceThreshold;
  }

  async analyze(graphContext) {
    let lastError;

    for (
      let attempt = 0;
      attempt <= this.maxRetries;
      attempt++
    ) {
      try {
        const response =
          await this.model.generate({
            instructions: RELATIONSHIP_PROMPT,
            messages: [
              {
                role: "user",
                content: JSON.stringify(
                  graphContext
                )
              }
            ]
          });

        const parsed =
          JSON.parse(response.output);

        const validation =
          RelationshipBuilderSchema.safeParse(
            parsed
          );

        if (!validation.success) {
          throw new Error(
            `Invalid relationship structure: ${
              validation.error.message
            }`
          );
        }

        return validation.data.relationships
          .filter(
            relationship =>
              relationship.confidence >=
              this.confidenceThreshold
          );

      } catch (error) {
        lastError = error;

        
      }
    }

    throw new Error(
      `Relationship builder failed after ${
        this.maxRetries + 1
      } attempts: ${lastError.message}`
    );
  }
}