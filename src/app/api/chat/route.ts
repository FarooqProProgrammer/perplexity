import { streamText } from 'ai';
import { createOpenRouter } from '@openrouter/ai-sdk-provider';
import { inngest } from '@/inngest/client';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

const openrouter = createOpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const modelStr = 'google/gemini-2.5-flash:free';

    // Dispatch background event to Inngest
    // We don't await this so it doesn't block TTFB (Time To First Byte) of the stream
    inngest.send({
      name: "chat/message.sent",
      data: {
        messages,
        model: modelStr,
      },
    }).catch(err => console.error("Inngest Event Dispatch Error:", err));

    const result = streamText({
      model: openrouter(modelStr),
      system: 'You are a helpful, concise AI assistant.',
      messages,
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error('Chat API Error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to process chat request' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
