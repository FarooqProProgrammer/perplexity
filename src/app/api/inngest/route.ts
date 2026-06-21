import { serve } from "inngest/next";
import { inngest } from "@/inngest/client";
import { processChat } from "@/inngest/functions/process-chat";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    processChat,
  ],
});
