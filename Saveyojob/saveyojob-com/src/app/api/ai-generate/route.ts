import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getGeminiClient, GEMINI_MODEL } from '@/lib/gemini';

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

const MessageSchema = z.object({
  role:    z.enum(['user', 'model']),
  content: z.string().min(1).max(20000),
});

const RequestSchema = z.object({
  messages: z.array(MessageSchema).min(1).max(10),
});

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  if (!checkRate(ip)) {
    return NextResponse.json(
      { error: "You've used up your 20 requests for this hour. Come back in a little while to generate more." },
      { status: 429 },
    );
  }

  let body: unknown;
  try { body = await req.json(); }
  catch { return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 }); }

  const parsed = RequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Something went wrong sending your request. Please try again.' },
      { status: 400 },
    );
  }

  const { messages } = parsed.data;

  try {
    const client = getGeminiClient();
    const model  = client.getGenerativeModel({ model: GEMINI_MODEL });

    const result = await model.generateContent({
      contents: messages.map(m => ({
        role:  m.role,
        parts: [{ text: m.content }],
      })),
    });

    const reply = result.response.text();
    return NextResponse.json({ reply: reply || 'Something went wrong — please try again.' });

  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error('[ai-generate]', msg);

    if (msg.includes('API key') || msg.includes('GEMINI_API_KEY')) {
      return NextResponse.json({ error: "The AI writer isn't available right now. Please try again later." }, { status: 503 });
    }
    if (msg.includes('quota') || msg.includes('rate')) {
      return NextResponse.json(
        { error: 'The AI writer is busy at the moment — please wait a few seconds and try again.' },
        { status: 503 },
      );
    }

    return NextResponse.json({ error: 'Something went wrong — please try again.' }, { status: 500 });
  }
}
