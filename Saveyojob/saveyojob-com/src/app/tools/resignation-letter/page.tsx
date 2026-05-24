import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Header from '../../../components/layout/Header';
import ResignationLetterClient from './ResignationLetterClient';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://saveyojob.com';

export const metadata: Metadata = {
  title: 'Free Resignation Letter Generator — Professional & Polished in 60 Seconds',
  description:
    'Generate a professional resignation letter in seconds. Enter your details and get a clean, respectful letter ready to send — no sign-up required.',
  alternates: { canonical: `${siteUrl}/tools/resignation-letter/` },
  openGraph: {
    title: 'Free Resignation Letter Generator',
    description: 'Generate a professional resignation letter in seconds. No sign-up required.',
    url: `${siteUrl}/tools/resignation-letter/`,
    type: 'website',
  },
};

export default function ResignationLetterPage() {
  return (
    <>
      <Header />
      <main className="max-w-[1100px] mx-auto px-5 sm:px-8 py-12 sm:py-16">

        {/* Page header */}
        <div className="mb-10">
          <Link href="/#tools" className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-ink-3 hover:text-ink transition-colors mb-3">
            <ArrowLeft size={13} strokeWidth={2} />
            Go Back
          </Link>
          <h1 className="text-[32px] sm:text-[40px] font-bold tracking-[-0.03em] text-ink leading-tight mb-3">
            Resignation Letter Generator
          </h1>
          <p className="text-[16px] text-ink-2 leading-relaxed max-w-[560px]">
            Fill in your details and get a professional, respectful resignation letter ready to copy and send — no account needed.
          </p>
        </div>

        <ResignationLetterClient />

        <div className="mt-20 pt-12 border-t border-line max-w-[740px]">
          <h2 className="text-[22px] sm:text-[26px] font-bold tracking-[-0.02em] text-ink mb-4">
            How to write a resignation letter that protects your professional reputation
          </h2>
          <div className="space-y-4 text-[15px] text-ink-2 leading-relaxed">
            <p>
              A professional resignation letter does three things: confirms your last working day in writing, maintains a positive relationship with your employer, and creates a clean paper trail. Most managers have read hundreds of these — the ones that hold up are brief, clear, and free of complaints. There is no need to explain your reasoning in detail or apologise excessively. Research shows that 78% of employers check references before making a hiring decision, making a graceful exit essential to your long-term career.
            </p>
            <p>
              The standard notice period is two weeks, though your employment contract may require more. Check before you write. Send it via email to your direct manager first — they should hear it from you before HR or anyone else in the organisation does. A formal workplace may also call for a printed copy. Keep the letter under 150 words; brevity signals confidence and professionalism, not indifference.
            </p>
          </div>

          <h3 className="text-[17px] font-bold text-ink mt-10 mb-4">Tips for a professional resignation</h3>
          <ul className="space-y-2.5 text-[14px] text-ink-2">
            <li className="flex gap-2.5"><span className="text-fire font-bold shrink-0">—</span>Have your new offer signed and a start date confirmed before you resign — never resign on the assumption an offer is coming.</li>
            <li className="flex gap-2.5"><span className="text-fire font-bold shrink-0">—</span>Tell your manager in person (or by video call) before you send the letter — hearing it from you directly, not through HR, is a professional courtesy that is almost always remembered.</li>
            <li className="flex gap-2.5"><span className="text-fire font-bold shrink-0">—</span>State your last working day explicitly in the letter — an open-ended resignation (no date given) creates ambiguity and can become contentious.</li>
            <li className="flex gap-2.5"><span className="text-fire font-bold shrink-0">—</span>Review your employment contract for notice period, non-compete clauses, and IP assignment terms before you resign — knowing these protects you from unintentional breach.</li>
            <li className="flex gap-2.5"><span className="text-fire font-bold shrink-0">—</span>Back up personal files, contacts, and work samples you are legally entitled to keep before your resignation is submitted — access is often revoked within hours of the letter landing.</li>
            <li className="flex gap-2.5"><span className="text-fire font-bold shrink-0">—</span>Offer to help with handover and write it into the letter — it signals professionalism and gives your manager something concrete to work with, which reduces resentment significantly.</li>
            <li className="flex gap-2.5"><span className="text-fire font-bold shrink-0">—</span>Avoid venting, criticism, or listing grievances — the letter creates a permanent record and you may need this manager as a reference for the next decade. Save honest feedback for an exit interview if one is offered.</li>
            <li className="flex gap-2.5"><span className="text-fire font-bold shrink-0">—</span>Send during business hours — a resignation email at 11 pm or on a Friday afternoon reads as avoidant, and it prevents your manager from responding appropriately until the next working day.</li>
          </ul>

          <h3 className="text-[17px] font-bold text-ink mt-10 mb-6">Frequently asked questions</h3>
          <div className="space-y-6">
            <div>
              <p className="text-[14px] font-semibold text-ink mb-1.5">How much notice should I give when resigning?</p>
              <p className="text-[14px] text-ink-2 leading-relaxed">Two weeks is the standard for most roles. Your employment contract is the definitive source — some senior or specialist positions require 30, 60, or even 90 days. When in doubt, give more notice than required; it signals professionalism and protects the relationship.</p>
            </div>
            <div>
              <p className="text-[14px] font-semibold text-ink mb-1.5">Should I explain why I&apos;m resigning in the letter?</p>
              <p className="text-[14px] text-ink-2 leading-relaxed">No. Your resignation letter only needs to confirm that you are resigning and when your last day is. Reasons can be shared verbally or in an exit interview if you choose — but written explanations in the letter carry risk and add nothing of value.</p>
            </div>
            <div>
              <p className="text-[14px] font-semibold text-ink mb-1.5">Is it okay to write a resignation letter by email?</p>
              <p className="text-[14px] text-ink-2 leading-relaxed">Yes — email is widely accepted and creates a written record. If your workplace is formal or your contract requires written notice, follow up with a printed letter. Always send the email to your direct manager first, before HR or anyone else in the company.</p>
            </div>
          </div>
        </div>

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: [
            { '@type': 'Question', name: 'How much notice should I give when resigning?', acceptedAnswer: { '@type': 'Answer', text: 'Two weeks is the standard for most roles. Your employment contract is the definitive source — some senior positions require 30, 60, or 90 days. When in doubt, give more notice than required.' } },
            { '@type': 'Question', name: "Should I explain why I'm resigning in the letter?", acceptedAnswer: { '@type': 'Answer', text: 'No. Your resignation letter only needs to confirm that you are resigning and when your last day is. Reasons can be shared verbally or in an exit interview if you choose.' } },
            { '@type': 'Question', name: 'Is it okay to write a resignation letter by email?', acceptedAnswer: { '@type': 'Answer', text: 'Yes — email is widely accepted and creates a written record. Always send it to your direct manager first, before HR or anyone else in the company.' } },
          ],
        }) }} />

      </main>
    </>
  );
}
