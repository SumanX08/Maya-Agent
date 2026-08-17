export class AgentRunner {
  constructor(agent) {
    this.agent = agent;
  }

  async run(input) {
    const {
      instructions,
      model,
      tools,
      maxSteps
    } = this.agent;

    const messages = [
      {
        role: "user",
        content: input
      }
    ];

    for (let step = 0; step < maxSteps; step++) {
      console.log(`\n[Agent] Step ${step + 1}`);

      const response = await model.generate({
        instructions,
        messages,
        tools: tools.map((tool) =>
          tool.toModelDefinition()
        )
      });

      const toolCalls = response.outputItems.filter(
        (item) => item.type === "function_call"
      );

      // No tool call means the model has produced
      // its final response.
      if (toolCalls.length === 0) {
        return response;
      }

      /*
       * IMPORTANT:
       *
       * Preserve the model's output items.
       * This includes the function_call item.
       *
       * The next request needs to know that
       * this tool call actually happened.
       */
      messages.push(...response.outputItems);

      for (const toolCall of toolCalls) {
        console.log(
          `[Agent] Calling tool: ${toolCall.name}`
        );

        const tool = tools.find(
          (tool) => tool.name === toolCall.name
        );

        if (!tool) {
          throw new Error(
            `Unknown tool requested: ${toolCall.name}`
          );
        }

        const args = JSON.parse(
          toolCall.arguments
        );

        const result = await tool.run(args);

        console.log(
          `[Agent] Tool result:`,
          result
        );

        messages.push({
          type: "function_call_output",
          call_id: toolCall.call_id,
          output: JSON.stringify(result)
        });
      }
    }

    throw new Error(
      `Agent exceeded maximum steps (${maxSteps})`
    );
  }
}