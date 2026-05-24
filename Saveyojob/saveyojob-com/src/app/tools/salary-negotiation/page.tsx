import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Header from '../../../components/layout/Header';
import SalaryNegotiationClient from './SalaryNegotiationClient';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://saveyojob.com';

export const metadata: Metadata = {
  title: 'Free Salary Negotiation Script Generator — 3 Strategies, Word-for-Word',
  description:
    'Enter your offer details and get three word-for-word salary negotiation scripts — safe, assertive, and aggressive — ready to send in seconds. No sign-up required.',
  alternates: { canonical: `${siteUrl}/tools/salary-negotiation/` },
  openGraph: {
    title: 'Free Salary Negotiation Script Generator — 3 Strategies, Word-for-Word',
    description: 'Get three ready-to-send salary negotiation scripts for your job offer — safe, assertive, and aggressive. No sign-up required.',
    url: `${siteUrl}/tools/salary-negotiation/`,
    type: 'website',
  },
};

export default function SalaryNegotiationPage() {
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
            Salary Negotiation Script Generator
          </h1>
          <p className="text-[16px] text-ink-2 leading-relaxed max-w-[560px]">
            Enter your offer details and get three word-for-word scripts — safe, assertive, and aggressive — ready to send the moment you&apos;re ready to negotiate.
          </p>
        </div>

        <SalaryNegotiationClient />

        <div className="mt-20 pt-12 border-t border-line max-w-[740px]">
          <h2 className="text-[22px] sm:text-[26px] font-bold tracking-[-0.02em] text-ink mb-4">
            How to negotiate your salary after a job offer — without losing the offer
          </h2>
          <div className="space-y-4 text-[15px] text-ink-2 leading-relaxed">
            <p>
              78% of candidates who negotiate their salary receive a better offer than the one they were originally given. Yet 55% of job seekers accept the first number without pushing back. Those who do negotiate receive an average increase of 18.83% — a difference that compounds across an entire career. Salary negotiation is expected; hiring managers build room into initial offers precisely because they know candidates who know their worth will counter.
            </p>
            <p>
              The standard approach is straightforward: acknowledge the offer positively, state your counter with a specific number, justify it with market data and your value, and wait for their response. Name a specific figure — salary negotiation scripts that use a range get anchored to the lower end. Research your market rate on LinkedIn Salary, Glassdoor, and Levels.fyi before you begin. A counter supported by real data is almost impossible to dismiss.
            </p>
          </div>

          <h3 className="text-[17px] font-bold text-ink mt-10 mb-4">Tips for a stronger salary negotiation</h3>
          <ul className="space-y-2.5 text-[14px] text-ink-2">
            <li className="flex gap-2.5"><span className="text-fire font-bold shrink-0">—</span>Never give a number first when asked &ldquo;what are you looking for?&rdquo; before an offer is made — deflect with &ldquo;I&apos;m focused on fit right now; I&apos;m confident we can align on compensation once we get to that stage.&rdquo; Once you have an offer in hand, you negotiate from a position of strength.</li>
            <li className="flex gap-2.5"><span className="text-fire font-bold shrink-0">—</span>Always negotiate the base salary first — bonus percentages, equity vesting, and benefits are all calculated as a multiplier of base. A $5k higher base is worth far more over 4 years than a $5k signing bonus.</li>
            <li className="flex gap-2.5"><span className="text-fire font-bold shrink-0">—</span>Name a specific number, not a range — if you say &ldquo;between $90k and $100k&rdquo; the employer will hear &ldquo;$90k.&rdquo; Say the number you actually want.</li>
            <li className="flex gap-2.5"><span className="text-fire font-bold shrink-0">—</span>Anchor your counter with 3 data points from real market sources (LinkedIn Salary, Glassdoor, Levels.fyi) — citing evidence makes your position a business conversation rather than a personal ask, and it is significantly harder to dismiss.</li>
            <li className="flex gap-2.5"><span className="text-fire font-bold shrink-0">—</span>Get the final offer confirmed in writing (email is fine) before you resign from your current role — verbal offers are not binding, and misunderstandings about numbers are surprisingly common.</li>
            <li className="flex gap-2.5"><span className="text-fire font-bold shrink-0">—</span>If base is genuinely fixed, negotiate signing bonus, additional leave days, remote work frequency, or an earlier performance review date — there is almost always flexibility somewhere in the total package.</li>
            <li className="flex gap-2.5"><span className="text-fire font-bold shrink-0">—</span>Know your BATNA (best alternative) before you start — if you have another offer or are comfortable staying in your current role, say so professionally. It shifts the dynamic and is only truthful to use when it is real.</li>
            <li className="flex gap-2.5"><span className="text-fire font-bold shrink-0">—</span>Give them time to respond after your counter — silence is not rejection, it is internal approval processes. Filling the silence with concessions before they have even responded is the most common negotiation mistake.</li>
          </ul>

          <h3 className="text-[17px] font-bold text-ink mt-10 mb-6">Frequently asked questions</h3>
          <div className="space-y-6">
            <div>
              <p className="text-[14px] font-semibold text-ink mb-1.5">How much should you counter when negotiating a salary offer?</p>
              <p className="text-[14px] text-ink-2 leading-relaxed">Counter 10–20% above the offer if market data supports it. The specific number should come from your research — LinkedIn Salary, Glassdoor, and comparable job postings — not just from how much more you want. An evidence-based counter is significantly harder to refuse.</p>
            </div>
            <div>
              <p className="text-[14px] font-semibold text-ink mb-1.5">What if they say the offer is non-negotiable?</p>
              <p className="text-[14px] text-ink-2 leading-relaxed">&ldquo;Non-negotiable&rdquo; is often a first response, not a final one. Ask if there is flexibility in other components — signing bonus, remote work, additional leave, or an earlier performance review. There is almost always room somewhere in the total package.</p>
            </div>
            <div>
              <p className="text-[14px] font-semibold text-ink mb-1.5">Will negotiating salary cost you the job offer?</p>
              <p className="text-[14px] text-ink-2 leading-relaxed">Almost never — as long as your counter is reasonable and professionally worded. Employers expect negotiation. What can affect an offer is an unreasonable counter, an aggressive tone, or making multiple demands at once. A single, well-justified counter almost never puts an offer at risk.</p>
            </div>
          </div>
        </div>

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: [
            { '@type': 'Question', name: 'How much should you counter when negotiating a salary offer?', acceptedAnswer: { '@type': 'Answer', text: 'Counter 10–20% above the offer if market data supports it. Use LinkedIn Salary, Glassdoor, and comparable job postings to justify your number.' } },
            { '@type': 'Question', name: "What if the company says the salary offer is non-negotiable?", acceptedAnswer: { '@type': 'Answer', text: '"Non-negotiable" is often a first response, not a final one. Ask about signing bonus, remote work, additional leave, or an earlier performance review.' } },
            { '@type': 'Question', name: 'Will negotiating salary cost you the job offer?', acceptedAnswer: { '@type': 'Answer', text: 'Almost never — as long as your counter is reasonable and professionally worded. Employers expect negotiation. A single, well-justified counter almost never puts an offer at risk.' } },
          ],
        }) }} />

      </main>
    </>
  );
}
