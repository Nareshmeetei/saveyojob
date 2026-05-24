import type { Metadata } from 'next';
import Header from '../../../components/layout/Header';
import CoverLetterClient from './CoverLetterClient';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://saveyojob.com';

export const metadata: Metadata = {
  title: 'Free Cover Letter Generator — Specific, Non-Generic Letters in 30 Seconds',
  description:
    'Paste a job description and your top 3 strengths to get a cover letter that references the role specifically — not a generic template. Free, no sign-up required.',
  alternates: { canonical: `${siteUrl}/tools/cover-letter/` },
  openGraph: {
    title: 'Free Cover Letter Generator',
    description: 'Paste job description + 3 strengths → a specific, non-generic cover letter in 30 seconds.',
    url: `${siteUrl}/tools/cover-letter/`,
    type: 'website',
  },
};

export default function CoverLetterPage() {
  return (
    <>
      <Header />
      <main className="max-w-[1100px] mx-auto px-5 sm:px-8 py-12 sm:py-16">

        <div className="mb-10">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-fire mb-3">Free Tool</p>
          <h1 className="text-[32px] sm:text-[40px] font-bold tracking-[-0.03em] text-ink leading-tight mb-3">
            Cover Letter Generator
          </h1>
          <p className="text-[16px] text-ink-2 leading-relaxed max-w-[560px]">
            Paste the job description and your top strengths — get a letter that opens with a hook, ties your experience to what the role actually needs, and lands in 200 words.
          </p>
        </div>

        <CoverLetterClient />

      </main>
    </>
  );
}
