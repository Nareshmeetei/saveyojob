import type { Metadata } from 'next';
import Header from '../../../components/layout/Header';
import ResumeBuilderClient from './ResumeBuilderClient';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://saveyojob.com';

export const metadata: Metadata = {
  title: 'Free Resume Builder — Build a Recruiter-Ready Resume in Minutes',
  description:
    'Build a professional resume with a live preview. Fill in your details, see the result instantly, then copy to Google Docs or download as PDF. No sign-up required.',
  alternates: { canonical: `${siteUrl}/tools/resume-builder/` },
  openGraph: {
    title: 'Free Resume Builder — Build a Recruiter-Ready Resume in Minutes',
    description: 'Live preview resume builder. Fill in contact, summary, experience, education, and skills — copy or export as PDF. No sign-up.',
    url: `${siteUrl}/tools/resume-builder/`,
    type: 'website',
  },
};

export default function ResumeBuilderPage() {
  return (
    <>
      <Header />
      <main className="max-w-[1100px] mx-auto px-5 sm:px-8 py-12 sm:py-16">

        <div className="mb-10">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-fire mb-3">Free Tool</p>
          <h1 className="text-[32px] sm:text-[40px] font-bold tracking-[-0.03em] text-ink leading-tight mb-3">
            Resume Builder
          </h1>
          <p className="text-[16px] text-ink-2 leading-relaxed max-w-[560px]">
            Fill in your details and watch your resume build in real time. Copy to Google Docs or Word, or save as a PDF — no account needed.
          </p>
        </div>

        <ResumeBuilderClient />

      </main>
    </>
  );
}
