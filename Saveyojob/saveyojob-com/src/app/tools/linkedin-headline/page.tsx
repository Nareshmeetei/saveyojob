import type { Metadata } from 'next';
import Header from '../../../components/layout/Header';
import LinkedInHeadlineClient from './LinkedInHeadlineClient';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://saveyojob.com';

export const metadata: Metadata = {
  title: 'LinkedIn Headline Generator — 5 Keyword-Rich Headlines That Get Found',
  description:
    'Enter your job title and top skills to get 5 LinkedIn headline variations optimised for recruiter search. Free, no sign-up required.',
  alternates: { canonical: `${siteUrl}/tools/linkedin-headline/` },
  openGraph: {
    title: 'LinkedIn Headline Generator',
    description: 'Enter job title + skills → 5 keyword-rich LinkedIn headlines that get found by recruiters.',
    url: `${siteUrl}/tools/linkedin-headline/`,
    type: 'website',
  },
};

export default function LinkedInHeadlinePage() {
  return (
    <>
      <Header />
      <main className="max-w-[1100px] mx-auto px-5 sm:px-8 py-12 sm:py-16">

        <div className="mb-10">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-fire mb-3">Free Tool</p>
          <h1 className="text-[32px] sm:text-[40px] font-bold tracking-[-0.03em] text-ink leading-tight mb-3">
            LinkedIn Headline Generator
          </h1>
          <p className="text-[16px] text-ink-2 leading-relaxed max-w-[560px]">
            Enter your job title and the skills recruiters search for — get 5 headline variations across different styles so you can pick the one that fits you best.
          </p>
        </div>

        <LinkedInHeadlineClient />

      </main>
    </>
  );
}
