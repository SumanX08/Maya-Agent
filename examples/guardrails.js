import "dotenv/config";

import {
  Agent,
  OpenAIProvider,
  Guardrail,
  EventBus,
  Tool
} from "../src/index.js";

import { z } from "zod";

const eventBus = new EventBus();

eventBus.on(
  "guardrail.triggered",
  event => {
    
  }
);

// ------------------------------------
// MODEL
// ------------------------------------

const provider =
  new OpenAIProvider({
    model: "gpt-4.1-mini"
  });

// ------------------------------------
// INPUT GUARDRAIL
// ------------------------------------

const noEmptyInput =
  new Guardrail({
    name: "no-empty-input",

    async validate({ input }) {
      if (!input?.trim()) {
        return {
          passed: false,
          message:
            "Input cannot be empty."
        };
      }

      return {
        passed: true
      };
    }
  });

  const deleteDataTool =
  new Tool({
    name: "deleteData",

    description:
      "Deletes data from the system.",

    schema: z.object({
      id: z.string()
    }),

    async execute({ id }) {
      

      return {
        success: true,
        deletedId: id
      };
    }
  });

// ------------------------------------
// OUTPUT GUARDRAIL
// ------------------------------------

const minimumOutputLength =
  new Guardrail({
    name: "minimum-output-length",

    async validate({ output }) {
      if (!output || output.length < 10) {
        return {
          passed: false,
          message:
            "Output is too short."
        };
      }

      return {
        passed: true
      };
    }
  });

  const blockDangerousTools =
  new Guardrail({
    name: "block-dangerous-tools",

    async validate({ tool }) {
      if (tool.name === "deleteData") {
        return {
          passed: false,

          message:
            "Dangerous tool execution requires approval."
        };
      }

      return {
        passed: true
      };
    }
  });

// ------------------------------------
// AGENT
// ------------------------------------

const agent =
  new Agent({
    name: "GuardrailAgent",

    instructions:
      "You are a helpful assistant. You can delete data when asked.",

    model: provider,

    tools: [
      deleteDataTool
    ],

    eventBus,

    guardrails: {
      input: [
        noEmptyInput
      ],

      tool: [
        blockDangerousTools
      ],

      output: [
        minimumOutputLength
      ]
    }
  });

// ------------------------------------
// TEST 1: VALID INPUT
// ------------------------------------


try {
  const result =
    await agent.run(
      "Explain what an AI agent is in simple words."
    );

  

} catch (error) {
  console.log(
    "\n❌ Error:"
  );

  console.dir(
    {
      name: error.name,
      message: error.message,
      stage: error.stage,
      guardrail: error.guardrail
    },
    { depth: null }
  );
}

// ------------------------------------
// TEST 2: EMPTY INPUT
// ------------------------------------



try {
  await agent.run("");

} catch (error) {
  console.log(
    "\n❌ Expected guardrail error:"
  );

  console.dir(
    {
      name: error.name,
      message: error.message,
      stage: error.stage,
      guardrail: error.guardrail
    },
    { depth: null }
  );

  

try {
  const result =
    await agent.run(
      "Delete the data with id 12345."
    );

  

} catch (error) {
  console.log(
    "\n❌ Expected tool guardrail error:"
  );

  console.dir(
    {
      name: error.name,
      message: error.message,
      stage: error.stage,
      guardrail: error.guardrail
    },
    { depth: null }
  );
}
}