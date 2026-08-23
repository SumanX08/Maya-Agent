import OpenAI from "openai";
import { z } from "zod";
import { ModelProvider } from "./ModelProvider.js";

export class OpenAIProvider extends ModelProvider {
  constructor({
    model = "gpt-4.1-mini",
    apiKey = process.env.OPENAI_API_KEY
  } = {}) {
    super();

    if (!apiKey) {
      throw new Error(
        "OPENAI_API_KEY is not configured"
      );
    }

    this.model = model;

    this.client = new OpenAI({
      apiKey
    });
  }

  async generate({
  instructions,
  messages = [],
  tools = [],
  outputSchema = null
}) {
  const request = {
    model: this.model,
    instructions,
    input: messages,
    tools
  };

  if (outputSchema) {
    request.text = {
      format: {
        type: "json_schema",
        name: "agent_output",
        strict: true,
        schema: z.toJSONSchema(outputSchema)
      }
    };
  }

  const response =
    await this.client.responses.create(
      request
    );

  return {
    output: response.output_text,
    outputItems: response.output,
    usage: response.usage
  };
}
}