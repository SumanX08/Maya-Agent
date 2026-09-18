import { GoogleGenAI } from "@google/genai";
import { z } from "zod";
import { ModelProvider } from "./ModelProvider.js";

export class GeminiProvider extends ModelProvider {
  constructor({
    model = "gemini-3.6-flash",
    apiKey = process.env.GEMINI_API_KEY
  } = {}) {
    super();

    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not configured");
    }

    this.model = model;

    this.client = new GoogleGenAI({
      apiKey
    });
  }

  buildContents(messages = []) {
    return messages
      .filter(
        message =>
          message.role === "user" ||
          message.role === "assistant"
      )
      .map(message => ({
        role:
          message.role === "assistant"
            ? "model"
            : "user",

        parts: [
          {
            text:
              typeof message.content === "string"
                ? message.content
                : JSON.stringify(message.content)
          }
        ]
      }));
  }

  buildConfig(instructions, outputSchema = null) {
    const config = {
      systemInstruction: instructions
    };

    if (outputSchema) {
      const jsonSchema = z.toJSONSchema(outputSchema, {
        target: "draft-07"
      });

      delete jsonSchema.$schema;

      config.responseMimeType = "application/json";
      config.responseSchema = jsonSchema;
    }

    return config;
  }

  async generate({
    instructions,
    messages = [],
    tools = [],
    outputSchema = null
  }) {
    const response =
      await this.client.models.generateContent({
        model: this.model,
        contents: this.buildContents(messages),
        config: this.buildConfig(
          instructions,
          outputSchema
        )
      });

    return {
      output: response.text,

      outputItems: [
        {
          type: "message",
          role: "assistant",
          content: response.text
        }
      ],

      usage: response.usageMetadata
        ? {
            input_tokens:
              response.usageMetadata.promptTokenCount || 0,

            output_tokens:
              response.usageMetadata.candidatesTokenCount || 0,

            total_tokens:
              response.usageMetadata.totalTokenCount || 0
          }
        : undefined
    };
  }

  async stream({
    instructions,
    messages = [],
    tools = [],
    outputSchema = null
  }) {
    return this.client.models.generateContentStream({
      model: this.model,
      contents: this.buildContents(messages),
      config: this.buildConfig(
        instructions,
        outputSchema
      )
    });
  }
}