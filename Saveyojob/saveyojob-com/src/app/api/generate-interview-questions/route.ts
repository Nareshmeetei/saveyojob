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
  jobDescription: z.string().min(50).max(6000),
  experienceLevel: z.enum(['entry', 'mid', 'senior', 'executive']),
  background: z.string().max(600).optional(),
});

export interface InterviewQuestion {
  question:  string;
  category:  string;
  why:       string;
  framework: string;
}

export interface InterviewQuestionsResult {
  questions: InterviewQuestion[];
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  if (!checkRate(ip)) {
    return NextResponse.json(
      { error: "You've generated 15 question sets this hour. Come back a little later to generate more." },
      { status: 429 },
    );
  }

  let body: unknown;
  try { body = await req.json(); }
  catch { return NextResponse.json({ error: 'Invalid request.' }, { status: 400 }); }

  const parsed = RequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Please paste a job description before generating.' },
      { status: 400 },
    );
  }

  const { jobDescription, experienceLevel, background } = parsed.data;

  const levelLabel: Record<string, string> = {
    entry:     'Entry-level (0–2 years)',
    mid:       'Mid-level (3–6 years)',
    senior:    'Senior (7–12 years)',
    executive: 'Executive / Leadership (12+ years)',
  };

  const backgroundLine = background?.trim()
    ? `\nCandidate background: ${background.trim()}`
    : '';

  const prompt = `You are an expert interview coach with deep knowledge of hiring across industries. Analyse this job description and generate the 10 most likely interview questions this company will ask a ${levelLabel[experienceLevel]} candidate.${backgroundLine}

JOB DESCRIPTION:
${jobDescription}

RULES:
1. Generate exactly 10 questions — no more, no less.
2. Cover a realistic mix of question types across the 10:
   - 3–4 Behavioral questions (past experience, STAR-method answers)
   - 2–3 Role-specific questions (directly tied to skills/tools named in the JD)
   - 1–2 Situational questions ("What would you do if…")
   - 1 Culture/values question (aligned to signals in the JD)
   - 1 Motivation/career question ("Why this role?", "Where do you see yourself?")
3. Every question must be specific to THIS job description — not generic filler questions.
4. For the "why" field: one short plain-English sentence explaining what the interviewer is actually trying to find out.
5. For the "framework" field: 2–3 sentences of concrete, actionable guidance. For behavioral questions, reference STAR (Situation, Task, Action, Result). For role-specific questions, name the specific skill or tool from the JD. Do NOT use filler phrases like "be honest" or "show enthusiasm".
6. Category must be one of: Behavioral, Role-specific, Situational, Culture, Motivation.

Return a JSON object with a "questions" array of exactly 10 objects. Each object must have:
- "question": the interview question string
- "category": one of the 5 category values above
- "why": what the interviewer is assessing (one sentence)
- "framework": concrete answer guidance (2–3 sentences)`;

  try {
    const client = getGeminiClient();
    const model  = client.getGenerativeModel({ model: GEMINI_MODEL });

    const result = await model.generateContent({
      contents:         [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: { responseMimeType: 'application/json' },
    });

    const text = result.response.text();
    const data = JSON.parse(text) as { questions: InterviewQuestion[] };

    if (!Array.isArray(data.questions) || data.questions.length === 0) {
      throw new Error('Unexpected AI response shape.');
    }

    return NextResponse.json({ questions: data.questions } satisfies InterviewQuestionsResult);

  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error('[generate-interview-questions]', msg);

    if (msg.includes('API key') || msg.includes('GEMINI_API_KEY')) {
      return NextResponse.json({ error: "The question generator isn't available right now. Please try again later." }, { status: 503 });
    }
    if (msg.includes('quota') || msg.includes('rate')) {
      return NextResponse.json({ error: 'The generator is busy right now — please wait a few seconds and try again.' }, { status: 503 });
    }

    return NextResponse.json({ error: "The questions didn't finish generating — please try again." }, { status: 500 });
  }
}
