import type { Metadata } from 'next';
import Header from '../../../components/layout/Header';
import InterviewQuestionsClient from './InterviewQuestionsClient';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://saveyojob.com';

export const metadata: Metadata = {
  title: 'Interview Questions Generator — 10 Likely Questions From Any Job Description',
  description:
    'Paste any job description to get the 10 most likely questions this company will ask, plus a concrete framework for answering each one. Free, no sign-up required.',
  alternates: { canonical: `${siteUrl}/tools/interview-questions/` },
  openGraph: {
    title: 'Interview Questions Generator',
    description: 'Paste any job description → the 10 most likely questions this company will ask + answer frameworks.',
    url: `${siteUrl}/tools/interview-questions/`,
    type: 'website',
  },
};

export default function InterviewQuestionsPage() {
  return (
    <>
      <Header />
      <main className="max-w-[1100px] mx-auto px-5 sm:px-8 py-12 sm:py-16">

        <div className="mb-10">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-fire mb-3">Free Tool</p>
          <h1 className="text-[32px] sm:text-[40px] font-bold tracking-[-0.03em] text-ink leading-tight mb-3">
            Interview Questions Generator
          </h1>
          <p className="text-[16px] text-ink-2 leading-relaxed max-w-[560px]">
            Paste any job description — get the 10 most likely questions this company will ask, broken down by type, with a concrete framework for answering each one.
          </p>
        </div>

        <InterviewQuestionsClient />

      </main>
    </>
  );
}
