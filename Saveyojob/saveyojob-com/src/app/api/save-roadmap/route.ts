import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const Schema = z.object({
  roadmapData:     z.record(z.string(), z.unknown()),
  jobTitle:        z.string(),
  experienceLevel: z.string(),
  goal:            z.string(),
  timeCommitment:  z.string(),
});

// In-memory store — resets on cold start. Fine for MVP; replace with KV for persistence.
const store = new Map<string, { data: Record<string, unknown>; createdAt: number }>();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = Schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: 'Something went wrong saving your roadmap. Please try again.' }, { status: 400 });
    }

    const { nanoid } = await import('nanoid');
    const shareId = nanoid(10);
    store.set(shareId, { data: parsed.data.roadmapData, createdAt: Date.now() });

    return NextResponse.json({ shareId });
  } catch {
    return NextResponse.json({ error: "We weren't able to save your roadmap — please try again." }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 400 });

  const entry = store.get(id);
  if (!entry) return NextResponse.json({ error: "We couldn't find that roadmap — the link may have expired." }, { status: 404 });

  return NextResponse.json({ roadmapData: entry.data });
}
