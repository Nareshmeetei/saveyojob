import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getGeminiClient, GEMINI_MODEL } from '@/lib/gemini';

const rateMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT  = 8;
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
  jobDescription: z.string().min(50).max(10000),
});

export interface DecodedInsight {
  phrase:  string;
  meaning: string;
}

export interface RedFlag {
  phrase:  string;
  warning: string;
}

export interface JDResult {
  whatTheyWant:    DecodedInsight[];
  redFlags:        RedFlag[];
  phrasesToMirror: string[];
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  if (!checkRate(ip)) {
    return NextResponse.json(
      { error: "You've decoded 8 job postings this hour. Come back in a little while to decode more." },
      { status: 429 },
    );
  }

  let body: unknown;
  try { body = await req.json(); }
  catch { return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 }); }

  const parsed = RequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Please paste a job description — it needs to be at least a few sentences long.' },
      { status: 400 },
    );
  }

  const { jobDescription } = parsed.data;

  const prompt = `You are a plain-talking career advisor who helps job seekers decode corporate job descriptions.

JOB DESCRIPTION:
${jobDescription}

Analyse this job posting and return a JSON object with exactly these fields:

- whatTheyWant: array of 4–6 objects, each decoding a specific phrase from the JD into what it actually means in practice. Each object has:
  - phrase: the exact corporate phrase from the JD (keep it short — 3–8 words)
  - meaning: a blunt, plain-English explanation of what they're really asking for (one sentence, no jargon, no emojis)

- redFlags: array of 2–4 objects identifying phrases that signal potential problems with the role or company. Each object has:
  - phrase: the exact phrase from the JD that raised a flag (3–8 words)
  - warning: a plain-English explanation of why this phrase is worth watching (one sentence, no emojis)
  If the JD genuinely has no red flags, return an empty array — do not invent them.

- phrasesToMirror: array of 8–12 strings — the exact keywords and phrases from the JD the candidate should use verbatim in their resume and cover letter. Short phrases only (2–5 words each). No emojis.

Be direct and honest. Not every phrase is a red flag — only flag what genuinely signals a problem. Focus on what will most help the candidate succeed in their application.`;

  try {
    const client = getGeminiClient();
    const model  = client.getGenerativeModel({ model: GEMINI_MODEL });

    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: { responseMimeType: 'application/json' },
    });

    const text = result.response.text();
    const data = JSON.parse(text) as JDResult;

    if (
      !Array.isArray(data.whatTheyWant)    ||
      !Array.isArray(data.redFlags)        ||
      !Array.isArray(data.phrasesToMirror)
    ) {
      throw new Error('Unexpected response shape from AI.');
    }

    return NextResponse.json(data);

  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error('[decode-jd]', msg);

    if (msg.includes('API key') || msg.includes('GEMINI_API_KEY')) {
      return NextResponse.json({ error: "The decoder isn't available right now. Please try again later." }, { status: 503 });
    }
    if (msg.includes('quota') || msg.includes('rate')) {
      return NextResponse.json(
        { error: 'The decoder is busy at the moment — please wait a few seconds and try again.' },
        { status: 503 },
      );
    }

    return NextResponse.json({ error: "The decode didn't finish — please try again." }, { status: 500 });
  }
}
