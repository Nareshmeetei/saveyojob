import type { Metadata } from 'next';
import Header from '../../../components/layout/Header';
import LinkedInSummaryClient from './LinkedInSummaryClient';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://saveyojob.com';

export const metadata: Metadata = {
  title: 'LinkedIn Summary Generator — Recruiter-Optimised About Section in Seconds',
  description:
    'Answer 4 questions about your role, skills, and goals to get a LinkedIn About section that hooks recruiters and shows up in search. Free, no sign-up required.',
  alternates: { canonical: `${siteUrl}/tools/linkedin-summary/` },
  openGraph: {
    title: 'LinkedIn Summary Generator',
    description: 'Answer 4 questions → a recruiter-optimised About section that shows up in search.',
    url: `${siteUrl}/tools/linkedin-summary/`,
    type: 'website',
  },
};

export default function LinkedInSummaryPage() {
  return (
    <>
      <Header />
      <main className="max-w-[1100px] mx-auto px-5 sm:px-8 py-12 sm:py-16">

        <div className="mb-10">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-fire mb-3">Free Tool</p>
          <h1 className="text-[32px] sm:text-[40px] font-bold tracking-[-0.03em] text-ink leading-tight mb-3">
            LinkedIn Summary Generator
          </h1>
          <p className="text-[16px] text-ink-2 leading-relaxed max-w-[560px]">
            Answer 4 questions about your role, skills, and goals — get an About section that opens with a hook, weaves in keywords recruiters search for, and ends with a clear call to action.
          </p>
        </div>

        <LinkedInSummaryClient />

      </main>
    </>
  );
}
