import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const Schema = z.object({
  email:          z.string().email(),
  source:         z.string().optional(),
  occupationSlug: z.string().optional(),
  shareId:        z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = Schema.safeParse(body);
    if (!parsed.success) return NextResponse.json({ error: 'Invalid email.' }, { status: 400 });
    const { email, source, occupationSlug } = parsed.data;

    if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
      const { createServiceClient } = await import('../../../../lib/supabase');
      const supabase = createServiceClient();
      await supabase.from('subscribers').upsert(
        { email, source: source ?? 'direct', occupation_slug: occupationSlug },
        { onConflict: 'email', ignoreDuplicates: true }
      );
    }

    if (process.env.RESEND_API_KEY) {
      const { Resend } = await import('resend');
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: 'Saveyojob.com <noreply@saveyojob.com>',
        to:   email,
        subject: 'Your Saveyojob.com roadmap is saved',
        text: `Your personalized AI career roadmap has been saved. Visit Saveyojob.com to generate your full analysis.`,
      });
    }

    return NextResponse.json({ success: true });
  } catch (e: any) {
    return NextResponse.json({ error: 'Subscribe failed.' }, { status: 500 });
  }
}
