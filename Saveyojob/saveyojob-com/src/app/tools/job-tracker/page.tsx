import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
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
          <Link href="/#tools" className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-ink-3 hover:text-ink transition-colors mb-3">
            <ArrowLeft size={13} strokeWidth={2} />
            Go Back
          </Link>
          <h1 className="text-[32px] sm:text-[40px] font-bold tracking-[-0.03em] text-ink leading-tight mb-3">
            Job Application Tracker
          </h1>
          <p className="text-[16px] text-ink-2 leading-relaxed max-w-[560px]">
            Track every application from first glance to final offer. Saved privately in your browser — nothing uploaded, no account needed.
          </p>
        </div>

        <JobTrackerClient />

        <div className="mt-20 pt-12 border-t border-line max-w-[740px]">
          <h2 className="text-[22px] sm:text-[26px] font-bold tracking-[-0.02em] text-ink mb-4">
            How to organise your job search — and actually land the role
          </h2>
          <div className="space-y-4 text-[15px] text-ink-2 leading-relaxed">
            <p>
              The average job search takes 3 to 6 months and involves applying to 20–50 companies. Without a system, it quickly becomes a mess of browser tabs, forgotten follow-ups, and lost contacts. Research shows that job seekers who track their applications methodically — noting where they applied, when, who they spoke to, and what stage each is at — are significantly more likely to follow up at the right time and maintain the organised, persistent approach that eventually converts into offers. The ones who do not track anything tend to ghost companies accidentally, miss callbacks, and lose momentum after the first wave of rejections.
            </p>
            <p>
              A structured job search also reveals data that unfocused searching hides. When you can see at a glance that 25 applications produced zero interviews, it tells you something specific needs to change — the resume, the target roles, or the channels you are using. When 5 applications from one job board consistently reach interview stage while 20 from another produce nothing, you know where to focus. Tracking is not busywork; it is the feedback loop that turns job hunting from guesswork into a system you can optimise.
            </p>
          </div>

          <h3 className="text-[17px] font-bold text-ink mt-10 mb-4">Tips for a more organised and effective job search</h3>
          <ul className="space-y-2.5 text-[14px] text-ink-2">
            <li className="flex gap-2.5"><span className="text-fire font-bold shrink-0">—</span>Log every application the same day you submit it — after three weeks of active searching, you will not remember which version of your resume you sent, who the recruiter was, or whether you followed up.</li>
            <li className="flex gap-2.5"><span className="text-fire font-bold shrink-0">—</span>Save a copy of every job posting you apply to locally — postings are taken down once a decision is made, often weeks before you hear back, and you will need the original text when preparing for interviews.</li>
            <li className="flex gap-2.5"><span className="text-fire font-bold shrink-0">—</span>Follow up after 5–7 business days of silence — a short, professional email (&ldquo;I wanted to confirm my application came through and reiterate my interest&rdquo;) meaningfully increases callback rates and signals the persistence employers actually want to see.</li>
            <li className="flex gap-2.5"><span className="text-fire font-bold shrink-0">—</span>Track the source channel for every application — after 3–4 weeks you will have real data on which job boards, LinkedIn searches, referrals, or company sites are producing interviews, and which are producing nothing.</li>
            <li className="flex gap-2.5"><span className="text-fire font-bold shrink-0">—</span>Set a weekly review time — 30 minutes every Sunday or Monday to update stages, send follow-ups, and plan the week&apos;s applications. A job search without a weekly cadence stalls quickly after the first burst of enthusiasm.</li>
            <li className="flex gap-2.5"><span className="text-fire font-bold shrink-0">—</span>Record the salary range for every role when it is listed in the posting — companies are required to list it in a growing number of jurisdictions. You will need this number for the negotiation conversation weeks later, and it is easy to forget or misremember.</li>
            <li className="flex gap-2.5"><span className="text-fire font-bold shrink-0">—</span>Keep notes on every rejection, even brief ones — patterns across 10+ rejections (consistently no callbacks on a specific role level, specific location, or specific type of company) reveal what to adjust in your approach far faster than instinct alone.</li>
            <li className="flex gap-2.5"><span className="text-fire font-bold shrink-0">—</span>Quality beats volume beyond a point — 7–10 tailored applications per week consistently outperforms 30+ generic ones. Once you are sending more than 15 applications a week, it becomes difficult to tailor any of them meaningfully, and untailored applications rarely clear the first filter.</li>
          </ul>

          <h3 className="text-[17px] font-bold text-ink mt-10 mb-6">Frequently asked questions</h3>
          <div className="space-y-6">
            <div>
              <p className="text-[14px] font-semibold text-ink mb-1.5">How should I track my job applications?</p>
              <p className="text-[14px] text-ink-2 leading-relaxed">Track at minimum: the company, role, date applied, where you applied (source), and the current stage. As applications progress, add: the recruiter or hiring manager name, interview dates, and follow-up notes. A Kanban board view — Wishlist / Applied / Interview / Offer / Rejected — is the most intuitive format because it mirrors the actual pipeline stages and makes it easy to see where things are stuck.</p>
            </div>
            <div>
              <p className="text-[14px] font-semibold text-ink mb-1.5">How many jobs should I apply to per week?</p>
              <p className="text-[14px] text-ink-2 leading-relaxed">Quality beats volume beyond a certain point. Applying to 5–10 well-researched, tailored applications per week consistently outperforms spray-and-pray approaches sending 50+ generic applications. Once you go above 10–15 applications per week, it becomes very difficult to tailor each one meaningfully — and untailored applications rarely reach the interview stage. Aim for 7–10 targeted applications per week as a sustainable pace.</p>
            </div>
            <div>
              <p className="text-[14px] font-semibold text-ink mb-1.5">What information should I keep for each job application?</p>
              <p className="text-[14px] text-ink-2 leading-relaxed">Company name, exact job title, application date, job posting URL (it may be taken down later), contact name if you have one, the version of your resume you sent, the current stage, and any follow-up dates. After interviews, add the names and titles of everyone you spoke with — you will need these for thank-you emails and for referencing shared context in future conversations.</p>
            </div>
          </div>
        </div>

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: [
            { '@type': 'Question', name: 'How should I track my job applications?', acceptedAnswer: { '@type': 'Answer', text: 'Track: company, role, date applied, source, and current stage. Add recruiter name, interview dates, and follow-up notes as applications progress. A Kanban board (Wishlist / Applied / Interview / Offer / Rejected) mirrors the actual pipeline and makes it easy to see where things are stuck.' } },
            { '@type': 'Question', name: 'How many jobs should I apply to per week?', acceptedAnswer: { '@type': 'Answer', text: '5–10 well-researched, tailored applications per week consistently outperforms high-volume spray-and-pray. Above 10–15 applications it becomes hard to tailor each one, and untailored applications rarely reach interview stage.' } },
            { '@type': 'Question', name: 'What information should I keep for each job application?', acceptedAnswer: { '@type': 'Answer', text: 'Company name, exact job title, application date, job posting URL, contact name if known, which resume version you sent, current stage, and follow-up dates. After interviews, add names and titles of everyone you spoke with.' } },
          ],
        }) }} />

      </main>
    </>
  );
}
