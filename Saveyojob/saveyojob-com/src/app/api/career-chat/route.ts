import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getGeminiClient, GEMINI_MODEL, CAREER_SYSTEM_PROMPT } from '@/lib/gemini';
import { TOOL_DECLARATIONS } from '@/lib/tool-definitions';
import { dispatchTool, toolLabel } from '@/lib/career-tools';
import type { Content, Part } from '@google/generative-ai';

// ── Rate limiting (in-memory, resets on cold start) ───────────────────────────
const rateMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT   = 20;          // messages per IP per window
const RATE_WINDOW  = 60 * 60 * 1000; // 1 hour

function checkRate(ip: string): boolean {
  const now = Date.now();
  const entry = rateMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW });
    return true;
  }
  if (entry.count >= RATE_LIMIT) return false;
  entry.count++;
  return true;
}

// Clean up expired entries occasionally
setInterval(() => {
  const now = Date.now();
  for (const [ip, entry] of rateMap) {
    if (now > entry.resetAt) rateMap.delete(ip);
  }
}, 30 * 60 * 1000);

// ── Input validation ──────────────────────────────────────────────────────────
const MessageSchema = z.object({
  role: z.enum(['user', 'model']),
  content: z.string().min(1).max(20000),
});

const RequestSchema = z.object({
  messages: z.array(MessageSchema).min(1).max(50),
  context: z
    .object({
      resumeText:      z.string().max(10000).optional(),
      jobDescription:  z.string().max(5000).optional(),
    })
    .optional(),
});

// ── POST /api/career-chat ─────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';

  if (!checkRate(ip)) {
    return NextResponse.json(
      { error: "You've used up your 20 messages for this hour. Come back in a little while and you'll be able to chat again." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const parsed = RequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Something went wrong sending your message. Please refresh the page and try again.' }, { status: 400 });
  }

  const { messages, context } = parsed.data;

  // Block empty or whitespace-only last messages
  const lastMessage = messages[messages.length - 1];
  if (!lastMessage?.content?.trim()) {
    return NextResponse.json({ error: 'Please type a message before sending.' }, { status: 400 });
  }

  // Inject any context the tool pages pass in (resume text, job description)
  let systemPrompt = CAREER_SYSTEM_PROMPT;
  if (context?.resumeText)     systemPrompt += `\n\n[USER RESUME]\n${context.resumeText}`;
  if (context?.jobDescription) systemPrompt += `\n\n[JOB DESCRIPTION]\n${context.jobDescription}`;

  try {
    const client = getGeminiClient();
    const model  = client.getGenerativeModel({
      model: GEMINI_MODEL,
      systemInstruction: systemPrompt,
    });

    // Convert to Gemini content format
    const contents: Content[] = messages.map(m => ({
      role: m.role,
      parts: [{ text: m.content }] as Part[],
    }));

    // ── First call: may return a function call ───────────────────────────────
    const firstResult = await model.generateContent({
      contents,
      tools: [{ functionDeclarations: TOOL_DECLARATIONS }],
    });

    const candidate = firstResult.response.candidates?.[0];
    if (!candidate?.content) {
      return NextResponse.json({
        reply: 'I had trouble generating a response. Please try again.',
      });
    }

    // Check for function call in the response parts
    const functionCalls = firstResult.response.functionCalls();

    if (functionCalls && functionCalls.length > 0) {
      const { name, args } = functionCalls[0];

      // Dispatch tool — packages data + instructions for the follow-up call
      let toolResult: ReturnType<typeof dispatchTool>;
      try {
        toolResult = dispatchTool(name, (args ?? {}) as Record<string, unknown>);
      } catch {
        return NextResponse.json({
          reply: 'I had trouble with that one — try asking in a different way or with a bit more detail.',
        });
      }

      // ── Second call: generate final response using tool result ─────────────
      const followUpContents: Content[] = [
        ...contents,
        candidate.content, // model turn containing the function call
        {
          role: 'user',
          parts: [
            {
              functionResponse: {
                name,
                response: {
                  task:         toolResult.task,
                  data:         toolResult.data,
                  instructions: toolResult.instructions,
                },
              },
            },
          ] as Part[],
        },
      ];

      const followUpResult = await model.generateContent({
        contents: followUpContents,
        tools: [{ functionDeclarations: TOOL_DECLARATIONS }],
      });

      const reply = followUpResult.response.text();
      return NextResponse.json({
        reply:    reply || 'Here is the analysis based on your information.',
        toolUsed: name,
        toolLabel: toolLabel(name),
      });
    }

    // No function call — direct answer
    const reply = firstResult.response.text();
    return NextResponse.json({
      reply: reply || "I wasn't able to come up with an answer — try asking in a different way.",
    });

  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error('[career-chat]', msg);

    if (msg.includes('API key') || msg.includes('GEMINI_API_KEY')) {
      return NextResponse.json(
        { error: "The AI assistant isn't available right now. Please try again later." },
        { status: 503 },
      );
    }

    if (msg.includes('quota') || msg.includes('rate')) {
      return NextResponse.json(
        { error: 'The AI assistant is busy at the moment — please wait a few seconds and try again.' },
        { status: 503 },
      );
    }

    return NextResponse.json({
      reply: 'Something went wrong — please try again.',
    });
  }
}
