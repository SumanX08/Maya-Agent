import { GuardrailError } from "../errors/GuardrailError.js";
import { OutputValidationError } from "../errors/OutputValidationError.js";
import { RetryPolicy } from "../reliability/RetryPolicy.js";
import { withTimeout } from "../reliability/withTimeout.js";

export class AgentRunner {
  constructor(agent) {
    this.agent = agent;
  }

  async run(input, runId, session) {
    const {
      instructions,
      model,
      tools,
      maxSteps,
      eventBus,
      guardrails,
      outputSchema,
      retryPolicy,
      timeoutMs

    } = this.agent;


    const retry =  new RetryPolicy(retryPolicy);

    // -------------------------
    // INPUT GUARDRAILS
    // -------------------------

    for (const guardrail of guardrails.input) {
      const result = await guardrail.run({
        input,
        runId,
        session
      });

      if (!result.passed) {
        eventBus.emit(
          "guardrail.triggered",
          {
            runId,
            stage: "input",
            guardrail: guardrail.name,
            message: result.message
          }
        );

        throw new GuardrailError({
          guardrail: guardrail.name,
          stage: "input",
          message:
            result.message ||
            `Input guardrail "${guardrail.name}" failed`
        });
      }
    }

    // -------------------------
    // SESSION
    // -------------------------

    session.addMessage({
      role: "user",
      content: input
    });

    const messages =
      session.getMessages();

    // -------------------------
    // GRAPH MEMORY
    // -------------------------

    let graphMemory = [];

    if (this.agent.memory) {
      graphMemory =
        await this.agent.memory.retrieve({
          entityIds: ["sumanx"]
        });
    }

    let graphContext = "";

    if (graphMemory.length > 0) {
      graphContext = `
Relevant knowledge from long-term graph memory:

${graphMemory
  .map(
    item =>
      `- ${item.from} ${item.relation} ${item.to}`
  )
  .join("\n")}
`;
    }

    let effectiveInstructions =
  instructions;

if (outputSchema) {
  effectiveInstructions += `

You must return your final answer as valid JSON.
Do not wrap the JSON in markdown code fences.
Do not include any text outside the JSON.
`;
}

    // -------------------------
    // AGENT LOOP
    // -------------------------

    for (
      let step = 0;
      step < maxSteps;
      step++
    ) {
      console.log(
        `\n[Agent] Step ${step + 1}`
      );

     const response =
  await retry.execute(
    async attempt => {

      return await withTimeout(
        model.generate({
          instructions:
            effectiveInstructions,

          messages: [
            ...messages,

            ...(graphContext
              ? [
                  {
                    role: "system",
                    content:
                      graphContext
                  }
                ]
              : [])
          ],

          tools: tools.map(tool =>
            tool.toModelDefinition()
          ),

          outputSchema
        }),

        timeoutMs,

        `Model call timed out after ${timeoutMs}ms`
      );
    },

    {
      onRetry: async ({
        attempt,
        nextAttempt,
        delay,
        error
      }) => {

        console.log(
          `[Agent] Model attempt ${attempt} failed. ` +
          `Retrying in ${delay}ms...`
        );

        eventBus.emit(
          "run.retry",
          {
            runId,
            step,
            attempt,
            nextAttempt,
            delay,
            error
          }
        );
      }
    }
  );

       

      const toolCalls =
        response.outputItems.filter(
          item =>
            item.type ===
            "function_call"
        );

      // -------------------------
      // FINAL OUTPUT
      // -------------------------

      if (toolCalls.length === 0) {

        for (
          const guardrail
          of guardrails.output
        ) {

          const result =
            await guardrail.run({
              output:
                response.output,
              runId,
              session
            });

          if (!result.passed) {

            eventBus.emit(
              "guardrail.triggered",
              {
                runId,
                stage: "output",
                guardrail:
                  guardrail.name,
                message:
                  result.message
              }
            );

            throw new GuardrailError({
              guardrail:
                guardrail.name,
              stage: "output",
              message:
                result.message ||
                `Output guardrail "${guardrail.name}" failed`
            });
          }
        }

        let finalOutput =
  response.output;

if (outputSchema) {
  let parsedOutput;

  try {
    parsedOutput =
      JSON.parse(response.output);
  } catch (error) {
    throw new OutputValidationError({
      message:
        "Model returned invalid JSON",
      issues: [
        {
          message:
            error.message
        }
      ],
      rawOutput:
        response.output
    });
  }

  const validation =
    outputSchema.safeParse(
      parsedOutput
    );

  if (!validation.success) {
    throw new OutputValidationError({
      message:
        "Model output failed schema validation",
      issues:
        validation.error.issues,
      rawOutput:
        response.output
    });
  }

  finalOutput =
    validation.data;
}

        session.addMessage({
          role: "assistant",
content:
  typeof finalOutput === "string"
    ? finalOutput
    : JSON.stringify(finalOutput)        });

return {
  ...response,
  output: finalOutput
};      }

      // -------------------------
      // PRESERVE TOOL CALLS
      // -------------------------

      messages.push(
        ...response.outputItems
      );

      // -------------------------
      // EXECUTE TOOLS
      // -------------------------

      for (const toolCall of toolCalls) {

        console.log(
          `[Agent] Calling tool: ${toolCall.name}`
        );

        const tool =
          tools.find(
            tool =>
              tool.name ===
              toolCall.name
          );

        if (!tool) {
          throw new Error(
            `Unknown tool requested: ${toolCall.name}`
          );
        }

        const args =
          JSON.parse(
            toolCall.arguments
          );

        // -------------------------
        // TOOL GUARDRAILS
        // -------------------------

        for (
          const guardrail
          of guardrails.tool
        ) {

          const result =
            await guardrail.run({
              tool,
              args,
              runId,
              session
            });

          if (!result.passed) {

            eventBus.emit(
              "guardrail.triggered",
              {
                runId,
                stage: "tool",
                guardrail:
                  guardrail.name,
                tool: tool.name,
                message:
                  result.message
              }
            );

            throw new GuardrailError({
              guardrail:
                guardrail.name,
              stage: "tool",
              message:
                result.message ||
                `Tool guardrail "${guardrail.name}" failed`
            });
          }
        }

        const result =
          await tool.run(args);

        console.log(
          `[Agent] Tool result:`,
          result
        );

        messages.push({
          type:
            "function_call_output",

          call_id:
            toolCall.call_id,

          output:
            JSON.stringify(result)
        });
      }
    }

    throw new Error(
      `Agent exceeded maximum steps (${maxSteps})`
    );
  }
}