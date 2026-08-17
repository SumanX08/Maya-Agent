import { z } from "zod";

export class Tool {
  constructor({
    name,
    description,
    schema,
    execute
  }) {
    if (!name) {
      throw new Error("Tool name is required");
    }

    if (!description) {
      throw new Error(
        `Tool description is required for "${name}"`
      );
    }

    if (!schema) {
      throw new Error(
        `Tool schema is required for "${name}"`
      );
    }

    if (typeof execute !== "function") {
      throw new Error(
        `Tool execute function is required for "${name}"`
      );
    }

    this.name = name;
    this.description = description;
    this.schema = schema;
    this.execute = execute;
  }

  async run(input) {
    const result = this.schema.safeParse(input);

    if (!result.success) {
      throw new Error(
        `Invalid input for tool "${this.name}": ${result.error.message}`
      );
    }

    return await this.execute(result.data);
  }

  toModelDefinition() {
    return {
      type: "function",
      name: this.name,
      description: this.description,
      parameters: z.toJSONSchema(this.schema)
    };
  }
}