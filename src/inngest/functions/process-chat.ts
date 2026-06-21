import { inngest } from "../client";

export const processChat = inngest.createFunction(
  { id: "process-chat-background", event: "chat/message.sent" },
  async ({ event, step }) => {
    // 1. Log the chat to the console/analytics
    await step.run("log-chat-event", async () => {
      console.log(`[Background Job] Chat initiated with model: ${event.data.model}`);
      console.log(`[Background Job] Message content: ${event.data.messages[event.data.messages.length - 1].content}`);
      return { success: true };
    });

    // 2. Placeholder for saving to database
    // await step.run("save-to-db", async () => {
    //   await prisma.chat.create({ ... })
    // });

    // 3. Placeholder for background RAG / embeddings
    // await step.run("generate-embeddings", async () => { ... });

    return { status: "processed", model: event.data.model };
  }
);
