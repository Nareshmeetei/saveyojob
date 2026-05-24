import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getGeminiClient, GEMINI_MODEL } from '@/lib/gemini';

const rateMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT  = 15;
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
  jobDescription:  z.string().min(50).max(5000),
  strength1:       z.string().min(5).max(300),
  strength2:       z.string().max(300).optional(),
  strength3:       z.string().max(300).optional(),
  yourName:        z.string().min(2).max(100),
  companyName:     z.string().max(100).optional(),
  hiringManager:   z.string().max(100).optional(),
  tone:            z.enum(['professional', 'conversational', 'confident']),
});

export interface CoverLetterResult {
  letter: string;
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  if (!checkRate(ip)) {
    return NextResponse.json(
      { error: "You've generated 15 cover letters this hour. Come back a little later to generate more." },
      { status: 429 },
    );
  }

  let body: unknown;
  try { body = await req.json(); }
  catch { return NextResponse.json({ error: 'Invalid request.' }, { status: 400 }); }

  const parsed = RequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Please fill in the job description, at least one strength, and your name before generating.' },
      { status: 400 },
    );
  }

  const { jobDescription, strength1, strength2, strength3, yourName, companyName, hiringManager, tone } = parsed.data;

  const strengths = [strength1, strength2, strength3].filter(Boolean).join('\n- ');
  const salutation = hiringManager?.trim()
    ? `Dear ${hiringManager.trim()},`
    : 'Dear Hiring Manager,';
  const company = companyName?.trim() || 'the company';

  const toneGuide: Record<string, string> = {
    professional:    'Clear, respectful, and polished. Standard business tone. No slang.',
    conversational:  'Warm and direct. Slightly less formal — reads like a smart colleague wrote it, not a template.',
    confident:       'Bold and assertive. Lead with impact. No hedging language ("I hope", "I believe", "I think"). Own the room.',
  };

  const prompt = `You are an expert cover letter writer. Write a specific, non-generic cover letter for the job below.

APPLICANT:
Name: ${yourName}
Company they are applying to: ${company}

THEIR STRENGTHS FOR THIS ROLE:
- ${strengths}

JOB DESCRIPTION:
${jobDescription}

TONE: ${toneGuide[tone]}

RULES — follow every one:
1. Open with a hook that references something specific from the job description (a challenge the company faces, a goal they mentioned, or the exact role title). Never open with "I am writing to apply for…"
2. Body paragraph 1: Explain why this applicant is the right fit, using their strengths as evidence. Tie each strength directly to a requirement or goal from the job description.
3. Body paragraph 2: Show genuine interest in this company specifically — reference something from the job description that makes this role distinct. Be concrete; do not use generic phrases like "I am excited about this opportunity."
4. Closing: Clear, confident call to action. One sentence.
5. Total length: 200–280 words. No longer.
6. Use this salutation exactly: "${salutation}"
7. Sign off with: "Sincerely,\n${yourName}"
8. Do not use the words: passionate, dynamic, results-driven, motivated, hard-working, team player, synergy, leverage (as a verb), or utilize.
9. Return ONLY the cover letter text — no commentary before or after.`;

  try {
    const client = getGeminiClient();
    const model  = client.getGenerativeModel({ model: GEMINI_MODEL });

    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
    });

    const letter = result.response.text().trim();

    if (!letter || letter.length < 100) {
      throw new Error('Unexpected AI response.');
    }

    return NextResponse.json({ letter } satisfies CoverLetterResult);

  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error('[generate-cover-letter]', msg);

    if (msg.includes('API key') || msg.includes('GEMINI_API_KEY')) {
      return NextResponse.json({ error: "The cover letter generator isn't available right now. Please try again later." }, { status: 503 });
    }
    if (msg.includes('quota') || msg.includes('rate')) {
      return NextResponse.json({ error: 'The generator is busy right now — please wait a few seconds and try again.' }, { status: 503 });
    }

    return NextResponse.json({ error: "The letter didn't finish generating — please try again." }, { status: 500 });
  }
}
