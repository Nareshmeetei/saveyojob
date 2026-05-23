import type { Metadata } from 'next';
import Header from '../../../components/layout/Header';
import ATSCheckerClient from './ATSCheckerClient';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://saveyojob.com';

export const metadata: Metadata = {
  title: 'Free ATS Resume Checker — Instant Score, Missing Keywords & Fixes',
  description:
    'Paste your resume and job description to get an instant ATS compatibility score, see which keywords are missing, and get exact fixes to increase your chances of getting through.',
  alternates: { canonical: `${siteUrl}/tools/ats-checker/` },
  openGraph: {
    title: 'Free ATS Resume Checker',
    description: 'Instant ATS score, missing keywords, and exact fixes — no sign-up required.',
    url: `${siteUrl}/tools/ats-checker/`,
    type: 'website',
  },
};

export default function ATSCheckerPage() {
  return (
    <>
      <Header />
      <main className="max-w-[1100px] mx-auto px-5 sm:px-8 py-12 sm:py-16">

        <div className="mb-10">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-fire mb-3">Free Tool</p>
          <h1 className="text-[32px] sm:text-[40px] font-bold tracking-[-0.03em] text-ink leading-tight mb-3">
            ATS Resume Checker
          </h1>
          <p className="text-[16px] text-ink-2 leading-relaxed max-w-[560px]">
            Upload or paste your resume alongside a job description — get an instant ATS compatibility score, the exact keywords you are missing, and three copy-paste fixes to close the gap.
          </p>
        </div>

        <ATSCheckerClient />

      </main>
    </>
  );
}
