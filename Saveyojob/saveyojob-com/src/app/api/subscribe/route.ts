import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const Schema = z.object({
  email: z.string().email(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = Schema.safeParse(body);
    if (!parsed.success) return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
    const { email } = parsed.data;

    if (process.env.RESEND_API_KEY) {
      const { Resend } = await import('resend');
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from:    'Saveyojob.com <noreply@saveyojob.com>',
        to:      email,
        subject: 'Your Saveyojob.com roadmap is saved',
        text:    'Your personalized AI career roadmap has been saved. Visit Saveyojob.com to generate your full analysis.',
      });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "We weren't able to sign you up — please try again." }, { status: 500 });
  }
}
