import {
  MemoryExtractionSchema
} from "./MemorySchema.js";

const EXTRACTION_PROMPT = `
You are a memory extraction system for an AI Agent SDK.

Your job is to analyze the conversation and extract
useful LONG-TERM knowledge that should be stored
in a graph database.

You MUST return exactly this JSON structure:

{
  "entities": [
    {
      "id": "unique-stable-id",
      "type": "person | project | technology | topic | preference | fact",
      "name": "Entity name"
    }
  ],
  "relationships": [
    {
      "from": "entity-id",
      "relation": "WORKS_ON | USES | PREFERS | KNOWS | INTERESTED_IN | MENTIONS | RELATED_TO",
      "to": "entity-id"
    }
  ]
}

Rules:

1. Every entity mentioned in a relationship MUST exist
   in the entities array.

2. Use stable, lowercase IDs based on the entity name.
   Examples:
   "SumanX" → "sumanx"
   "Node.js" → "nodejs"
   "Neo4j" → "neo4j"

3. Extract only information explicitly supported by
   the conversation.

4. Do not invent facts or relationships.

5. Extract people, projects, technologies, topics,
   preferences, and useful facts when they are
   meaningful for long-term memory.

6. Only create relationships when the conversation
   explicitly supports them.

7. Do not include greetings or temporary conversational
   information.

8. If there is nothing useful to remember, return:

{
  "entities": [],
  "relationships": []
}

Return ONLY valid JSON.
Do not use markdown.
Do not wrap the JSON in a code block.
`;

export class MemoryExtractionModel {
  constructor({
    model,
    maxRetries = 2
  }) {
    if (!model) {
      throw new Error(
        "Memory extraction model is required"
      );
    }

    this.model = model;
    this.maxRetries = maxRetries;
  }

  async extract(messages) {
    let lastError;

    for (
      let attempt = 0;
      attempt <= this.maxRetries;
      attempt++
    ) {
      try {
        const response =
          await this.model.generate({
            instructions: EXTRACTION_PROMPT,
            messages
          });

        const parsed =
          JSON.parse(response.output);

          

        const validation =
          MemoryExtractionSchema.safeParse(
            parsed
          );

        if (!validation.success) {
          throw new Error(
            `Invalid memory structure: ${
              validation.error.message
            }`
          );
        }

        return validation.data;

      } catch (error) {
        lastError = error;

        console.log(
          `Memory extraction attempt ${
            attempt + 1
          } failed`
        );
      }
    }

    throw new Error(
      `Memory extraction failed after ${
        this.maxRetries + 1
      } attempts: ${lastError.message}`
    );
  }
}