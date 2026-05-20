import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const Schema = z.object({
  url:             z.string().url(),
  platform:        z.string(),
  courseName:      z.string().optional(),
  occupationSlug:  z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = Schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
    }
    // Log click for analytics (extend with a real DB write as needed)
    console.log('[affiliate-click]', {
      platform:       parsed.data.platform,
      courseName:     parsed.data.courseName,
      occupationSlug: parsed.data.occupationSlug,
      ts:             new Date().toISOString(),
    });
    return NextResponse.json({ url: parsed.data.url });
  } catch {
    return NextResponse.json({ error: 'Redirect failed.' }, { status: 500 });
  }
}

// GET — direct redirect for server-rendered affiliate links
export async function GET(req: NextRequest) {
  const url      = req.nextUrl.searchParams.get('url');
  const platform = req.nextUrl.searchParams.get('platform') ?? 'unknown';
  const course   = req.nextUrl.searchParams.get('course') ?? '';

  if (!url) return NextResponse.redirect(new URL('/', req.url));

  // Validate it's a known affiliate domain before redirecting
  const ALLOWED = ['coursera.org', 'linkedin.com', 'deeplearning.ai', 'edx.org', 'udemy.com'];
  try {
    const parsed = new URL(url);
    if (!ALLOWED.some(d => parsed.hostname.endsWith(d))) {
      return NextResponse.redirect(new URL('/', req.url));
    }
  } catch {
    return NextResponse.redirect(new URL('/', req.url));
  }

  console.log('[affiliate-redirect]', { platform, course, url, ts: new Date().toISOString() });
  return NextResponse.redirect(url);
}
