  import { GuardrailError } from "../errors/GuardrailError.js";
  import { OutputValidationError } from "../errors/OutputValidationError.js";
  import { RetryPolicy } from "../reliability/RetryPolicy.js";
  import { withTimeout } from "../reliability/withTimeout.js";

  export class AgentRunner {
    constructor(agent) {
      this.agent = agent;
    }

    async stream(
    input,
    runId,
    session
  ) {
    const {
      instructions,
      model,
      tools,
      eventBus,
      outputSchema
    } = this.agent;

    session.addMessage({
      role: "user",
      content: input
    });

    const messages =
      session.getMessages();

    const stream =
      await model.stream({
        instructions,
        messages,

        tools: tools.map(tool =>
          tool.toModelDefinition()
        ),

        outputSchema
      });

    let fullOutput = "";

    for await (
      const event of stream
    ) {

      // ------------------------------
      // TEXT DELTA
      // ------------------------------

      if (
        event.type ===
        "response.output_text.delta"
      ) {

        const delta =
          event.delta || "";

        fullOutput += delta;

        eventBus.emit(
          "run.stream",
          {
            runId,
            agent:
              this.agent.name,
            type:
              "text.delta",
            delta
          }
        );
      }

      // ------------------------------
      // COMPLETED
      // ------------------------------

      if (
        event.type ===
        "response.completed"
      ) {

        eventBus.emit(
          "run.stream",
          {
            runId,
            agent:
              this.agent.name,
            type:
              "completed"
          }
        );
      }
    }

    session.addMessage({
      role: "assistant",
      content: fullOutput
    });

    await this.agent.sessionStore.save(
      session
    );

    return {
      runId,
      agent:
        this.agent.name,
      sessionId:
        session.id,
      output:
        fullOutput
    };
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

      // --------------------------------
      // HANDOFF TOOLS
      // --------------------------------

      const handoffTools =
        (this.agent.handoffs || []).map(
          agent => ({
            type: "function",

            name:
              `handoff_to_${agent.name
                .replace(/\s+/g, "_")
                .toLowerCase()}`,

            description:
              `Transfer the conversation to ${agent.name}. ${agent.instructions}`,

            parameters: {
              type: "object",

              properties: {
                reason: {
                  type: "string",
                  description:
                    "Why this task should be transferred."
                }
              },

              required: [
                "reason"
              ],

              additionalProperties: false
            }
          })
        );

      const retry =
        new RetryPolicy(retryPolicy);

      // --------------------------------
      // INPUT GUARDRAILS
      // --------------------------------

      for (
        const guardrail
        of guardrails.input
      ) {
        const result =
          await guardrail.run({
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
              guardrail:
                guardrail.name,
              message:
                result.message
            }
          );

          throw new GuardrailError({
            guardrail:
              guardrail.name,

            stage: "input",

            message:
              result.message ||
              `Input guardrail "${guardrail.name}" failed`
          });
        }
      }

      // --------------------------------
      // SESSION
      // --------------------------------

      session.addMessage({
        role: "user",
        content: input
      });

      const messages =
        session.getMessages();

      // --------------------------------
      // GRAPH MEMORY
      // --------------------------------

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

      // --------------------------------
      // STRUCTURED OUTPUT INSTRUCTIONS
      // --------------------------------

      let effectiveInstructions =
        instructions;

      if (outputSchema) {
        effectiveInstructions += `

  You must return your final answer as valid JSON.
  Do not wrap the JSON in markdown code fences.
  Do not include any text outside the JSON.
  `;
      }

      // --------------------------------
      // AGENT LOOP
      // --------------------------------

      for (
        let step = 0;
        step < maxSteps;
        step++
      ) {
        console.log(
          `\n[Agent] Step ${step + 1}`
        );

        // --------------------------------
        // MODEL CALL WITH RETRIES + TIMEOUT
        // --------------------------------

        const modelStart = Date.now();

eventBus.emit("trace", {
  runId,
  agent: this.agent.name,
  type: "model.started",
  step,
  timestamp: new Date().toISOString()
});

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

                  tools: [
                    ...tools.map(tool =>
                      tool.toModelDefinition()
                    ),

                    ...handoffTools
                  ],

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

          eventBus.emit("trace", {
  runId,
  agent: this.agent.name,
  type: "model.completed",
  step,
  durationMs: Date.now() - modelStart,
  usage: response.usage,
  timestamp: new Date().toISOString()
});

        // --------------------------------
        // DETECT TOOL / HANDOFF CALLS
        // --------------------------------

        const toolCalls =
          response.outputItems.filter(
            item =>
              item.type ===
              "function_call"
          );

        // --------------------------------
        // FINAL OUTPUT
        // --------------------------------

        if (toolCalls.length === 0) {

          // ------------------------------
          // OUTPUT GUARDRAILS
          // ------------------------------

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

          // ------------------------------
          // STRUCTURED OUTPUT
          // ------------------------------

          let finalOutput =
            response.output;

          if (outputSchema) {
            let parsedOutput;

            try {
              parsedOutput =
                JSON.parse(
                  response.output
                );
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

          // ------------------------------
          // SAVE ASSISTANT MESSAGE
          // ------------------------------

          session.addMessage({
            role: "assistant",

            content:
              typeof finalOutput ===
              "string"
                ? finalOutput
                : JSON.stringify(
                    finalOutput
                  )
          });

          return {
            ...response,
            output:
              finalOutput
          };
        }

        // --------------------------------
        // PRESERVE MODEL OUTPUT ITEMS
        // --------------------------------

        messages.push(
          ...response.outputItems
        );

        // --------------------------------
        // EXECUTE TOOL / HANDOFF CALLS
        // --------------------------------

        for (
          const toolCall
          of toolCalls
        ) {

          console.log(
            `[Agent] Calling tool: ${toolCall.name}`
          );

          // ==================================
          // HANDOFF
          // ==================================

          if (
            toolCall.name.startsWith(
              "handoff_to_"
            )
          ) {

            const targetName =
              toolCall.name
                .slice(
                  "handoff_to_".length
                );

            const targetAgent =
              (
                this.agent.handoffs ||
                []
              ).find(
                agent =>
                  agent.name
                    .replace(/\s+/g, "_")
                    .toLowerCase() ===
                  targetName
              );

            if (!targetAgent) {
              throw new Error(
                `Unknown handoff target: ${targetName}`
              );
            }

            const args =
              JSON.parse(
                toolCall.arguments
              );

            // --------------------------------
            // HANDOFF COUNT
            // --------------------------------

            if (!session.metadata) {
              session.metadata = {};
            }

            const handoffCount =
              session.metadata
                .handoffCount || 0;

            if (
              handoffCount >=
              this.agent.maxHandoffs
            ) {
              throw new Error(
                `Maximum handoff limit (${this.agent.maxHandoffs}) exceeded`
              );
            }

            session.metadata.handoffCount =
              handoffCount + 1;

            // --------------------------------
            // HANDOFF STARTED
            // --------------------------------

            eventBus.emit(
              "handoff.started",
              {
                runId,

                from:
                  this.agent.name,

                to:
                  targetAgent.name,

                handoffCount:
                  session.metadata
                    .handoffCount,

                reason:
                  args.reason
              }
            );

            try {

              // ------------------------------
              // RUN TARGET AGENT
              // ------------------------------

              const handoffResult =
                await targetAgent.run(
                  input,
                  {
                    session
                  }
                );

              // ------------------------------
              // HANDOFF COMPLETED
              // ------------------------------

              eventBus.emit(
                "handoff.completed",
                {
                  runId,

                  from:
                    this.agent.name,

                  to:
                    targetAgent.name,

                  handoffCount:
                    session.metadata
                      .handoffCount
                }
              );

              return handoffResult;

            } catch (error) {

              // ------------------------------
              // HANDOFF FAILED
              // ------------------------------

              eventBus.emit(
                "handoff.failed",
                {
                  runId,

                  from:
                    this.agent.name,

                  to:
                    targetAgent.name,

                  handoffCount:
                    session.metadata
                      .handoffCount,

                  error
                }
              );

              throw error;
            }
          }

          // ==================================
          // NORMAL TOOL
          // ==================================

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

          // --------------------------------
          // TOOL GUARDRAILS
          // --------------------------------

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
                  tool:
                    tool.name,
                  message:
                    result.message
                }
              );

              const toolStart = Date.now();

eventBus.emit("trace", {
  runId,
  agent: this.agent.name,
  type: "tool.started",
  tool: tool.name,
  timestamp: new Date().toISOString()
});

const result =
  await tool.run(args);

eventBus.emit("trace", {
  runId,
  agent: this.agent.name,
  type: "tool.completed",
  tool: tool.name,
  durationMs: Date.now() - toolStart,
  timestamp: new Date().toISOString()
});

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

          // --------------------------------
          // EXECUTE TOOL
          // --------------------------------

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

      // --------------------------------
      // MAX STEPS
      // --------------------------------

      throw new Error(
        `Agent exceeded maximum steps (${maxSteps})`
      );
    }
  }