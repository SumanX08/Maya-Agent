import { GoogleGenAI } from "@google/genai";
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

  async generate({
    instructions,
    messages = [],
    tools = []
  }) {
    const contents = messages
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

    const response =
      await this.client.models.generateContent({
        model: this.model,

        contents,

        config: {
          systemInstruction: instructions
        }
      });

    return {
      output: response.text,

      // Keep Maya-Agent's provider contract consistent.
      // Tool-call support can be added later.
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
}