import test from "node:test";
import assert from "node:assert/strict";

import { Agent } from "../src/agent/Agent.js";
import { ModelProvider } from "../src/models/ModelProvider.js";

class FakeModel extends ModelProvider {
  async generate() {
    return {
      output: "Hello from the fake model!",
      outputItems: [
        {
          type: "message",
          role: "assistant",
          content: "Hello from the fake model!"
        }
      ],
      usage: {
        input_tokens: 0,
        output_tokens: 0,
        total_tokens: 0
      }
    };
  }
}

test("Agent runs successfully", async () => {
  const agent = new Agent({
    name: "TestAgent",

    instructions: "You are a helpful assistant.",

    model: new FakeModel()
  });

  const result = await agent.run(
    "Hello!"
  );

  assert.equal(
    result.output,
    "Hello from the fake model!"
  );
});