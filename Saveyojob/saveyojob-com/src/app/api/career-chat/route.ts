import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getGeminiClient, GEMINI_MODEL, CAREER_SYSTEM_PROMPT } from '@/lib/gemini';
import type { Content, Part } from '@google/generative-ai';

const rateMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT  = 20;
const RATE_WINDOW = 60 * 60 * 1000;

function checkRate(ip: string): boolean {
  const now   = Date.now();
  const entry = rateMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW });
    return true;
  }
  if (entry.count >= RATE_LIMIT) return false;
  entry.count++;
  return true;
}

setInterval(() => {
  const now = Date.now();
  for (const [ip, entry] of rateMap) {
    if (now > entry.resetAt) rateMap.delete(ip);
  }
}, 30 * 60 * 1000);

const MessageSchema = z.object({
  role:    z.enum(['user', 'model']),
  content: z.string().min(1).max(20000),
});

const RequestSchema = z.object({
  messages: z.array(MessageSchema).min(1).max(50),
  context: z
    .object({
      resumeText:     z.string().max(10000).optional(),
      jobDescription: z.string().max(5000).optional(),
    })
    .optional(),
});

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';

  if (!checkRate(ip)) {
    return NextResponse.json(
      { error: "You've used up your 20 messages for this hour. Come back in a little while and you'll be able to chat again." },
      { status: 429 },
    );
  }

  let body: unknown;
  try { body = await req.json(); }
  catch { return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 }); }

  const parsed = RequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Something went wrong sending your message. Please refresh the page and try again.' },
      { status: 400 },
    );
  }

  const { messages, context } = parsed.data;

  const lastMessage = messages[messages.length - 1];
  if (!lastMessage?.content?.trim()) {
    return NextResponse.json({ error: 'Please type a message before sending.' }, { status: 400 });
  }

  let systemPrompt = CAREER_SYSTEM_PROMPT;
  if (context?.resumeText)     systemPrompt += `\n\n[USER RESUME]\n${context.resumeText}`;
  if (context?.jobDescription) systemPrompt += `\n\n[JOB DESCRIPTION]\n${context.jobDescription}`;

  try {
    const client = getGeminiClient();
    const model  = client.getGenerativeModel({
      model:             GEMINI_MODEL,
      systemInstruction: systemPrompt,
    });

    const contents: Content[] = messages.map(m => ({
      role:  m.role,
      parts: [{ text: m.content }] as Part[],
    }));

    const result = await model.generateContent({ contents });
    const reply  = result.response.text();

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

    return NextResponse.json(
      { error: 'Something went wrong — please try again.' },
      { status: 500 },
    );
  }
}
