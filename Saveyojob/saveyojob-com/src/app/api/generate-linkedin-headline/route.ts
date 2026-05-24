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
  jobTitle:    z.string().min(2).max(100),
  skills:      z.string().min(3).max(300),
  industry:    z.string().max(100).optional(),
  goal:        z.string().max(200).optional(),
  experience:  z.string().max(50).optional(),
});

export interface Headline {
  text:  string;
  style: string;
  note:  string;
  chars: number;
}

export interface HeadlineResult {
  headlines: Headline[];
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  if (!checkRate(ip)) {
    return NextResponse.json(
      { error: "You've generated 20 sets of headlines this hour. Come back a little later to generate more." },
      { status: 429 },
    );
  }

  let body: unknown;
  try { body = await req.json(); }
  catch { return NextResponse.json({ error: 'Invalid request.' }, { status: 400 }); }

  const parsed = RequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Please enter your job title and at least one skill before generating.' },
      { status: 400 },
    );
  }

  const { jobTitle, skills, industry, goal, experience } = parsed.data;

  const context = [
    `Job title: ${jobTitle}`,
    `Skills / keywords: ${skills}`,
    industry   ? `Industry: ${industry}`           : null,
    experience ? `Years of experience: ${experience}` : null,
    goal       ? `Career goal: ${goal}`            : null,
  ].filter(Boolean).join('\n');

  const prompt = `You are a LinkedIn profile expert. Generate exactly 5 LinkedIn headline variations for this person.

PERSON DETAILS:
${context}

HEADLINE RULES:
- Maximum 150 characters each (LinkedIn shows ~120 chars in search — staying under 150 avoids truncation)
- Use the pipe character | to separate sections (standard LinkedIn formatting)
- Include keywords recruiters actually search for — not just soft skills
- No emojis. No hashtags. No exclamation marks.
- Do not start any headline with "I am" or "A dedicated"
- Every headline must be distinctly different in structure and angle

Generate one headline for each of these 5 styles:
1. Identity + Skills — "[Title] | [Skill] | [Skill]" — clear, searchable, ATS-friendly
2. Value-led — What outcome or value you deliver, not just your title
3. Achievement — Leads with a specific result or accomplishment (use a number if it fits naturally)
4. Aspirational — Where you're heading; good for career changers or people open to new roles
5. Keyword-rich — Packs in the most relevant search terms recruiters use for this role

Return a JSON object with a "headlines" array of exactly 5 objects. Each object must have:
- "text": the headline string (under 150 chars)
- "style": the style name (e.g. "Identity + Skills")
- "note": one short plain-English sentence on when to use this headline or what makes it effective`;

  try {
    const client = getGeminiClient();
    const model  = client.getGenerativeModel({ model: GEMINI_MODEL });

    const result = await model.generateContent({
      contents:         [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: { responseMimeType: 'application/json' },
    });

    const text = result.response.text();
    const data = JSON.parse(text) as { headlines: Omit<Headline, 'chars'>[] };

    if (!Array.isArray(data.headlines) || data.headlines.length === 0) {
      throw new Error('Unexpected AI response shape.');
    }

    const headlines: Headline[] = data.headlines.map(h => ({
      ...h,
      chars: h.text.length,
    }));

    return NextResponse.json({ headlines } satisfies HeadlineResult);

  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error('[generate-linkedin-headline]', msg);

    if (msg.includes('API key') || msg.includes('GEMINI_API_KEY')) {
      return NextResponse.json({ error: "The headline generator isn't available right now. Please try again later." }, { status: 503 });
    }
    if (msg.includes('quota') || msg.includes('rate')) {
      return NextResponse.json({ error: 'The generator is busy right now — please wait a few seconds and try again.' }, { status: 503 });
    }

    return NextResponse.json({ error: "The headlines didn't finish generating — please try again." }, { status: 500 });
  }
}
