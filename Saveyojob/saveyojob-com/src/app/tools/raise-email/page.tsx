import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Header from '../../../components/layout/Header';
import RaiseEmailClient from './RaiseEmailClient';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://saveyojob.com';

export const metadata: Metadata = {
  title: 'Free Raise Request Email Builder — Make Your Case in 60 Seconds',
  description:
    'Build a manager-ready salary raise request email. Enter your accomplishments and target salary, and get a professional email ready to send — no sign-up required.',
  alternates: { canonical: `${siteUrl}/tools/raise-email/` },
  openGraph: {
    title: 'Free Raise Request Email Builder',
    description: 'Enter your wins and target salary — get a professional raise request email in seconds.',
    url: `${siteUrl}/tools/raise-email/`,
    type: 'website',
  },
};

export default function RaiseEmailPage() {
  return (
    <>
      <Header />
      <main className="max-w-[1100px] mx-auto px-5 sm:px-8 py-12 sm:py-16">

        <div className="mb-10">
          <Link href="/#tools" className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-ink-3 hover:text-ink transition-colors mb-3">
            <ArrowLeft size={13} strokeWidth={2} />
            Go Back
          </Link>
          <h1 className="text-[32px] sm:text-[40px] font-bold tracking-[-0.03em] text-ink leading-tight mb-3">
            Raise Request Email Builder
          </h1>
          <p className="text-[16px] text-ink-2 leading-relaxed max-w-[560px]">
            List your accomplishments and target salary — get a professional, evidence-led email that makes a compelling case to your manager.
          </p>
        </div>

        <RaiseEmailClient />

        <div className="mt-20 pt-12 border-t border-line max-w-[740px]">
          <h2 className="text-[22px] sm:text-[26px] font-bold tracking-[-0.02em] text-ink mb-4">
            How to ask for a raise — and actually get one
          </h2>
          <div className="space-y-4 text-[15px] text-ink-2 leading-relaxed">
            <p>
              Research consistently shows that people who ask for raises get them more often than those who wait. Yet 45% of workers never negotiate their salary at their current job, leaving significant money on the table. Those who do ask receive an average increase of 18.8% — well above the standard 3% annual raise most employees are given automatically.
            </p>
            <p>
              The most effective salary increase request letters tie the ask directly to business outcomes: revenue generated, costs saved, projects delivered, or responsibilities added. Managers are not primarily motivated by tenure — they respond to demonstrated value. Market data strengthens your case, but it should support your evidence, not replace it. The best time to ask is after a clear win, during a performance review cycle, or when you have recently taken on new responsibilities.
            </p>
          </div>

          <h3 className="text-[17px] font-bold text-ink mt-10 mb-4">Tips for a stronger raise request</h3>
          <ul className="space-y-2.5 text-[14px] text-ink-2">
            <li className="flex gap-2.5"><span className="text-fire font-bold shrink-0">—</span>Start building your case 3–6 months before you ask — keep a running document of wins, metrics, and expanded responsibilities so the ask is backed by a full record, not a last-minute list.</li>
            <li className="flex gap-2.5"><span className="text-fire font-bold shrink-0">—</span>Lead with your accomplishments and their business impact, not your tenure — &ldquo;I have been here 3 years&rdquo; is not a reason to pay someone more. Specific outcomes are.</li>
            <li className="flex gap-2.5"><span className="text-fire font-bold shrink-0">—</span>Quantify your wins in dollar terms wherever possible — if you saved the company $40k or generated $200k in pipeline, say that number explicitly. It reframes the conversation from cost to return on investment.</li>
            <li className="flex gap-2.5"><span className="text-fire font-bold shrink-0">—</span>Name a specific target salary, not a range — ranges anchor to the lower end. State one number supported by your market research.</li>
            <li className="flex gap-2.5"><span className="text-fire font-bold shrink-0">—</span>Use the email to request a dedicated meeting — do not make the full ask in the email itself. A salary conversation deserves focused attention, not a reply between other tasks.</li>
            <li className="flex gap-2.5"><span className="text-fire font-bold shrink-0">—</span>Research your market rate across at least three sources (LinkedIn Salary, Glassdoor, Levels.fyi) before you write — data-backed asks are significantly harder to deflect than gut-feel requests.</li>
            <li className="flex gap-2.5"><span className="text-fire font-bold shrink-0">—</span>Time the conversation carefully — ask after a visible win, at or before your annual review cycle, or shortly after taking on new responsibilities. Avoid asking during company cost-cutting cycles or right after a difficult quarter.</li>
            <li className="flex gap-2.5"><span className="text-fire font-bold shrink-0">—</span>Prepare for &ldquo;no&rdquo; before you go in — ask what specific milestones would justify the increase, get the answer in writing, and set a follow-up date. A no with a clear path is far more valuable than a vague deferral.</li>
          </ul>

          <h3 className="text-[17px] font-bold text-ink mt-10 mb-6">Frequently asked questions</h3>
          <div className="space-y-6">
            <div>
              <p className="text-[14px] font-semibold text-ink mb-1.5">When is the best time to ask for a raise?</p>
              <p className="text-[14px] text-ink-2 leading-relaxed">The best times are after a visible win, before or during your annual review cycle, or when you have recently taken on significantly more responsibility. Avoid asking during company-wide cost-cutting or immediately after a difficult quarter.</p>
            </div>
            <div>
              <p className="text-[14px] font-semibold text-ink mb-1.5">What if my manager says no?</p>
              <p className="text-[14px] text-ink-2 leading-relaxed">Ask what it would take to get a yes — and get the answer in writing if possible. A no with a clear path forward is far better than a vague deferral. Set a specific follow-up date and hold them to it.</p>
            </div>
            <div>
              <p className="text-[14px] font-semibold text-ink mb-1.5">Should you mention a competing offer when asking for a raise?</p>
              <p className="text-[14px] text-ink-2 leading-relaxed">Only if you are genuinely willing to take it. Using a competing offer as leverage is effective but carries risk — if your employer cannot match it, you may be expected to leave. Never bluff with an offer you would not actually accept.</p>
            </div>
          </div>
        </div>

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: [
            { '@type': 'Question', name: 'When is the best time to ask for a raise?', acceptedAnswer: { '@type': 'Answer', text: 'The best times are after a visible win, before or during your annual review cycle, or when you have recently taken on significantly more responsibility.' } },
            { '@type': 'Question', name: 'What if my manager says no to a raise request?', acceptedAnswer: { '@type': 'Answer', text: 'Ask what it would take to get a yes and get the answer in writing if possible. Set a specific follow-up date and hold them to it.' } },
            { '@type': 'Question', name: 'Should you mention a competing offer when asking for a raise?', acceptedAnswer: { '@type': 'Answer', text: 'Only if you are genuinely willing to take it. Never bluff with an offer you would not actually accept.' } },
          ],
        }) }} />

      </main>
    </>
  );
}
