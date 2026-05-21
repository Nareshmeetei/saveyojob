import type { Metadata } from 'next';
import Header from '../../../components/layout/Header';
import JobTrackerClient from './JobTrackerClient';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://saveyojob.com';

export const metadata: Metadata = {
  title: 'Free Job Application Tracker — Kanban Board for Your Job Search',
  description:
    'Track every job application in one place — Wishlist, Applied, Interview, Offer, Rejected. Saved privately in your browser. No sign-up required.',
  alternates: { canonical: `${siteUrl}/tools/job-tracker/` },
  openGraph: {
    title: 'Free Job Application Tracker',
    description: 'Kanban board for your job search. Track every application from wishlist to offer — saved in your browser, no sign-up required.',
    url: `${siteUrl}/tools/job-tracker/`,
    type: 'website',
  },
};

export default function JobTrackerPage() {
  return (
    <>
      <Header />
      <main className="max-w-[1200px] mx-auto px-5 sm:px-8 py-12 sm:py-16">

        <div className="mb-10">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-fire mb-3">Free Tool</p>
          <h1 className="text-[32px] sm:text-[40px] font-bold tracking-[-0.03em] text-ink leading-tight mb-3">
            Job Application Tracker
          </h1>
          <p className="text-[16px] text-ink-2 leading-relaxed max-w-[560px]">
            Track every application from first glance to final offer. Saved privately in your browser — nothing uploaded, no account needed.
          </p>
        </div>

        <JobTrackerClient />

      </main>
    </>
  );
}
