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

const RequestSchema = z.object({
  currentRole:     z.string().min(2).max(100),
  yearsExperience: z.string().min(1).max(30),
  topSkills:       z.string().min(5).max(500),
  targetRole:      z.string().min(2).max(100),
  achievement:     z.string().max(500).optional(),
});

export interface SummaryResult {
  summary: string;
  why:     string;
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  if (!checkRate(ip)) {
    return NextResponse.json(
      { error: "You've run 20 summaries this hour. Come back in a little while to generate more." },
      { status: 429 },
    );
  }

  let body: unknown;
  try { body = await req.json(); }
  catch { return NextResponse.json({ error: 'Invalid request.' }, { status: 400 }); }

  const parsed = RequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Please fill in all required fields before generating.' },
      { status: 400 },
    );
  }

  const { currentRole, yearsExperience, topSkills, targetRole, achievement } = parsed.data;

  const achievementLine = achievement?.trim()
    ? `\nKey achievement: ${achievement.trim()}`
    : '';

  const prompt = `You are an expert resume writer. Write a compelling 3-sentence professional summary for a resume.

Details:
- Current/most recent role: ${currentRole}
- Years of experience: ${yearsExperience}
- Top skills: ${topSkills}
- Target role: ${targetRole}${achievementLine}

Rules:
- Exactly 3 sentences. No more, no less.
- Sentence 1: Who they are — role identity, years of experience, and primary area of expertise.
- Sentence 2: What they bring — 2–3 specific skills or strengths that match the target role.
- Sentence 3: What they're seeking — a forward-looking statement that names the target role and the value they will deliver.
- Start with a strong noun phrase, not "I" or "A seasoned…"
- Use concrete, specific language — avoid vague words like "motivated", "passionate", "dynamic", "results-driven"
- Write in third person (no "I") — this is for a resume header
- If an achievement is provided, weave it naturally into one of the sentences

Return a JSON object with exactly two fields:
- "summary": the 3-sentence professional summary
- "why": one plain-English sentence explaining what makes this summary effective (not generic — reference something specific from the summary)`;

  try {
    const client = getGeminiClient();
    const model  = client.getGenerativeModel({ model: GEMINI_MODEL });

    const result = await model.generateContent({
      contents:         [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: { responseMimeType: 'application/json' },
    });

    const text = result.response.text();
    const data = JSON.parse(text) as SummaryResult;

    if (!data.summary || typeof data.summary !== 'string') {
      throw new Error('Unexpected AI response shape.');
    }

    return NextResponse.json(data);

  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error('[generate-summary]', msg);

    if (msg.includes('API key') || msg.includes('GEMINI_API_KEY')) {
      return NextResponse.json({ error: "The summary generator isn't available right now. Please try again later." }, { status: 503 });
    }
    if (msg.includes('quota') || msg.includes('rate')) {
      return NextResponse.json({ error: 'The generator is busy right now — please wait a few seconds and try again.' }, { status: 503 });
    }

    return NextResponse.json({ error: "The summary didn't finish — please try again." }, { status: 500 });
  }
}
