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
  currentRole:  z.string().min(2).max(100),
  skills:       z.string().min(5).max(400),
  achievement:  z.string().max(400).optional(),
  goal:         z.string().min(5).max(300),
  industry:     z.string().max(100).optional(),
  tone:         z.enum(['professional', 'conversational', 'storytelling']),
});

export interface SummaryResult {
  summary: string;
  chars:   number;
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  if (!checkRate(ip)) {
    return NextResponse.json(
      { error: "You've generated 20 summaries this hour. Come back a little later to generate more." },
      { status: 429 },
    );
  }

  let body: unknown;
  try { body = await req.json(); }
  catch { return NextResponse.json({ error: 'Invalid request.' }, { status: 400 }); }

  const parsed = RequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Please fill in your role, skills, and what you\'re looking for before generating.' },
      { status: 400 },
    );
  }

  const { currentRole, skills, achievement, goal, industry, tone } = parsed.data;

  const toneGuide: Record<string, string> = {
    professional:    'Clear and authoritative. Polished business language. No slang or overly casual phrasing.',
    conversational:  'Warm and direct — like a smart colleague talking about their work. Slightly informal. Approachable.',
    storytelling:    'Narrative-driven. Opens with a moment, insight, or belief that defines their career direction. More personal.',
  };

  const achievementLine = achievement?.trim()
    ? `Key achievement: ${achievement.trim()}`
    : null;

  const industryLine = industry?.trim()
    ? `Industry: ${industry.trim()}`
    : null;

  const context = [
    `Current role: ${currentRole}`,
    `Top skills / expertise: ${skills}`,
    achievementLine,
    `What they're looking for: ${goal}`,
    industryLine,
  ].filter(Boolean).join('\n');

  const prompt = `You are a LinkedIn profile expert. Write a LinkedIn About section (summary) for this person.

PERSON DETAILS:
${context}

TONE: ${toneGuide[tone]}

RULES — follow every one:
1. Write in first person ("I", not "they" or the person's name).
2. Open with a hook in the first 2 lines — something that grabs attention before the "see more" cut-off. Never open with "I am a [job title]" or "I am passionate about".
3. Structure: 3 short paragraphs.
   - Paragraph 1 (2–3 sentences): Who you are and what drives your work — the hook.
   - Paragraph 2 (3–4 sentences): What you're great at — weave in 2–3 of their top skills with specific language that recruiters search for. If an achievement was provided, include it here with specific language.
   - Paragraph 3 (2–3 sentences): What you're looking for — clear, direct, and specific to their goal.
4. End with a single line CTA: invite people to connect or reach out. One sentence only.
5. Total length: 150–250 words. Under 1,500 characters. LinkedIn shows the first ~300 characters before "see more".
6. Naturally include keywords from their skills list — these help with LinkedIn search ranking.
7. No buzzwords: passionate, motivated, dynamic, results-driven, hard-working, synergy, leverage (as verb), utilize, or game-changer.
8. No hashtags. No emojis.
9. Return ONLY the About section text — no commentary, no labels, no "Here is your summary:".`;

  try {
    const client = getGeminiClient();
    const model  = client.getGenerativeModel({ model: GEMINI_MODEL });

    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
    });

    const summary = result.response.text().trim();

    if (!summary || summary.length < 100) {
      throw new Error('Unexpected AI response.');
    }

    return NextResponse.json({ summary, chars: summary.length } satisfies SummaryResult);

  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error('[generate-linkedin-summary]', msg);

    if (msg.includes('API key') || msg.includes('GEMINI_API_KEY')) {
      return NextResponse.json({ error: "The summary generator isn't available right now. Please try again later." }, { status: 503 });
    }
    if (msg.includes('quota') || msg.includes('rate')) {
      return NextResponse.json({ error: 'The generator is busy right now — please wait a few seconds and try again.' }, { status: 503 });
    }

    return NextResponse.json({ error: "The summary didn't finish generating — please try again." }, { status: 500 });
  }
}
