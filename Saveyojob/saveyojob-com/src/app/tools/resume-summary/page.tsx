import type { Metadata } from 'next';
import Header from '../../../components/layout/Header';
import ResumeSummaryClient from './ResumeSummaryClient';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://saveyojob.com';

export const metadata: Metadata = {
  title: 'Resume Summary Generator — 3-Sentence Professional Summary in Seconds',
  description:
    'Enter your job history and target role to get a recruiter-ready 3-sentence professional summary. Free AI tool — no sign-up required.',
  alternates: { canonical: `${siteUrl}/tools/resume-summary/` },
  openGraph: {
    title: 'Resume Summary Generator',
    description: 'Enter your job history and target role → a 3-sentence professional summary that opens doors.',
    url: `${siteUrl}/tools/resume-summary/`,
    type: 'website',
  },
};

export default function ResumeSummaryPage() {
  return (
    <>
      <Header />
      <main className="max-w-[1100px] mx-auto px-5 sm:px-8 py-12 sm:py-16">

        <div className="mb-10">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-fire mb-3">Free Tool</p>
          <h1 className="text-[32px] sm:text-[40px] font-bold tracking-[-0.03em] text-ink leading-tight mb-3">
            Resume Summary Generator
          </h1>
          <p className="text-[16px] text-ink-2 leading-relaxed max-w-[560px]">
            Enter your job history and target role — get a 3-sentence professional summary that leads with your identity, highlights your strongest skills, and tells recruiters exactly what you're after.
          </p>
        </div>

        <ResumeSummaryClient />

      </main>
    </>
  );
}
