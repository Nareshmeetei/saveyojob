import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getGeminiClient, GEMINI_MODEL } from '@/lib/gemini';

// ── Rate limiting ─────────────────────────────────────────────────────────────
const rateMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT  = 20;
const RATE_WINDOW = 60 * 60 * 1000;

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

// ── Input validation ──────────────────────────────────────────────────────────
const RequestSchema = z.object({
  bullets: z.array(z.string().min(5).max(500)).min(1).max(10),
  role:    z.string().max(100).optional(),
});

export interface BulletRewrite {
  original:  string;
  rewritten: string;
  tip:       string;
}

// ── POST /api/rewrite-bullets ─────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  if (!checkRate(ip)) {
    return NextResponse.json(
      { error: "You've run 20 rewrites this hour. Come back in a little while to run more." },
      { status: 429 },
    );
  }

  let body: unknown;
  try { body = await req.json(); }
  catch { return NextResponse.json({ error: 'Invalid request.' }, { status: 400 }); }

  const parsed = RequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Please add at least one bullet point to rewrite (5 characters minimum, 10 bullets maximum).' },
      { status: 400 },
    );
  }

  const { bullets, role } = parsed.data;

  const bulletList   = bullets.map((b, i) => `${i + 1}. ${b}`).join('\n');
  const roleContext  = role ? `Target role: ${role}\n\n` : '';

  const prompt = `You are an expert resume writer. Rewrite each bullet below using the XYZ formula: Accomplished [X] as measured by [Y], by doing [Z]. Start every rewrite with a strong past-tense action verb.

${roleContext}If the original bullet lacks numbers, add realistic placeholder metrics in square brackets (e.g. [X%], [$X], [X hours]) that the user can fill in with their real data.

BULLETS:
${bulletList}

Return a JSON array of exactly ${bullets.length} objects. Each object must have:
- "original": copy the original bullet text exactly
- "rewritten": the improved XYZ-formula bullet — one sentence, strong past-tense verb, specific impact
- "tip": one short plain-English sentence telling the user what real data to find to make this more specific (e.g. "Check your Q4 report for the exact revenue figure")`;

  try {
    const client = getGeminiClient();
    const model  = client.getGenerativeModel({ model: GEMINI_MODEL });

    const result = await model.generateContent({
      contents:         [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: { responseMimeType: 'application/json' },
    });

    const text = result.response.text();
    const data = JSON.parse(text) as BulletRewrite[];

    if (!Array.isArray(data) || data.length === 0) {
      throw new Error('Unexpected AI response shape.');
    }

    return NextResponse.json({ rewrites: data });

  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error('[rewrite-bullets]', msg);

    if (msg.includes('API key') || msg.includes('GEMINI_API_KEY')) {
      return NextResponse.json({ error: "The bullet rewriter isn't available right now. Please try again later." }, { status: 503 });
    }
    if (msg.includes('quota') || msg.includes('rate')) {
      return NextResponse.json({ error: 'The rewriter is busy right now — please wait a few seconds and try again.' }, { status: 503 });
    }

    return NextResponse.json({ error: "The rewrite didn't finish — please try again." }, { status: 500 });
  }
}
