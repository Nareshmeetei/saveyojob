import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getGeminiClient, GEMINI_MODEL } from '@/lib/gemini';

// ── Rate limiting ─────────────────────────────────────────────────────────────
const rateMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT  = 10;
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
  resumeText:     z.string().min(50).max(15000),
  jobDescription: z.string().min(50).max(8000),
});

export interface ATSResult {
  score:   number;
  summary: string;
  matched: string[];
  missing: string[];
  fixes:   { issue: string; fix: string }[];
}

// ── POST /api/ats-check ───────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  if (!checkRate(ip)) {
    return NextResponse.json(
      { error: "You've run 10 checks this hour. Come back in a little while to run more." },
      { status: 429 },
    );
  }

  let body: unknown;
  try { body = await req.json(); }
  catch { return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 }); }

  const parsed = RequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Please add your resume and the job description — both need to be at least a few sentences long.' },
      { status: 400 },
    );
  }

  const { resumeText, jobDescription } = parsed.data;

  const prompt = `You are an ATS (Applicant Tracking System) expert. Analyze the resume against the job description.

RESUME:
${resumeText}

JOB DESCRIPTION:
${jobDescription}

Return a JSON object with exactly these fields:
- score: integer 0–100 (ATS match percentage — count exact and close keyword matches vs total required keywords)
- summary: string (one plain-language sentence explaining the score — no jargon)
- matched: array of strings (important keywords/skills from the JD that appear in the resume — up to 12 items, short phrases)
- missing: array of strings (important keywords/skills from the JD NOT in the resume — up to 12 items, short phrases)
- fixes: array of exactly 3 objects, each with:
  - issue: string (the specific gap — one short phrase, e.g. "No mention of Salesforce")
  - fix: string (a concrete, copy-paste-ready suggestion — e.g. a new bullet point or a specific phrase to add)`;

  try {
    const client = getGeminiClient();
    const model  = client.getGenerativeModel({ model: GEMINI_MODEL });

    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: { responseMimeType: 'application/json' },
    });

    const text = result.response.text();
    const data = JSON.parse(text) as ATSResult;

    if (
      typeof data.score   !== 'number'  ||
      typeof data.summary !== 'string'  ||
      !Array.isArray(data.matched)      ||
      !Array.isArray(data.missing)      ||
      !Array.isArray(data.fixes)
    ) {
      throw new Error('Unexpected response shape from AI.');
    }

    // Clamp score to valid range
    data.score = Math.max(0, Math.min(100, Math.round(data.score)));

    return NextResponse.json(data);

  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error('[ats-check]', msg);

    if (msg.includes('API key') || msg.includes('GEMINI_API_KEY')) {
      return NextResponse.json({ error: "The ATS checker isn't available right now. Please try again later." }, { status: 503 });
    }
    if (msg.includes('quota') || msg.includes('rate')) {
      return NextResponse.json(
        { error: 'The checker is busy at the moment — please wait a few seconds and try again.' },
        { status: 503 },
      );
    }

    return NextResponse.json({ error: "The check didn't finish — please try again." }, { status: 500 });
  }
}
