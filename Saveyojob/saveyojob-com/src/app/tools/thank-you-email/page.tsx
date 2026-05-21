import type { Metadata } from 'next';
import Header from '../../../components/layout/Header';
import ThankYouEmailClient from './ThankYouEmailClient';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://saveyojob.com';

export const metadata: Metadata = {
  title: 'Free Thank You Email Generator — Post-Interview Follow-Up in Seconds',
  description:
    'Generate a personalised thank you email after your interview in seconds. Reference specific moments, choose your tone, and copy it ready to send — no sign-up required.',
  alternates: { canonical: `${siteUrl}/tools/thank-you-email/` },
  openGraph: {
    title: 'Free Thank You Email Generator — Post-Interview Follow-Up',
    description: 'Generate a personalised post-interview thank you email in seconds. No sign-up required.',
    url: `${siteUrl}/tools/thank-you-email/`,
    type: 'website',
  },
};

export default function ThankYouEmailPage() {
  return (
    <>
      <Header />
      <main className="max-w-[1100px] mx-auto px-5 sm:px-8 py-12 sm:py-16">

        <div className="mb-10">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-fire mb-3">Free Tool</p>
          <h1 className="text-[32px] sm:text-[40px] font-bold tracking-[-0.03em] text-ink leading-tight mb-3">
            Thank You Email Generator
          </h1>
          <p className="text-[16px] text-ink-2 leading-relaxed max-w-[560px]">
            Enter your interview details, reference specific moments from the conversation, and get a personalised follow-up email ready to copy and send.
          </p>
        </div>

        <ThankYouEmailClient />

      </main>
    </>
  );
}
