import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Header from '../../../components/layout/Header';
import TMAYClient from './TMAYClient';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://saveyojob.com';

export const metadata: Metadata = {
  title: 'Free "Tell Me About Yourself" Builder — Perfect Your 60-Second Pitch',
  description:
    'Answer 7 quick questions and get a perfectly structured "Tell me about yourself" pitch for any job interview — no sign-up required.',
  alternates: { canonical: `${siteUrl}/tools/tmay/` },
  openGraph: {
    title: 'Free "Tell Me About Yourself" Builder',
    description: 'Answer 7 questions — get a structured, compelling 60-second interview pitch. No sign-up required.',
    url: `${siteUrl}/tools/tmay/`,
    type: 'website',
  },
};

export default function TMAYPage() {
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
            &ldquo;Tell Me About Yourself&rdquo; Builder
          </h1>
          <p className="text-[16px] text-ink-2 leading-relaxed max-w-[560px]">
            Answer 7 quick questions and get a structured 60-second pitch that opens interviews strong — personalised to your background and the role.
          </p>
        </div>

        <TMAYClient />

        <div className="mt-20 pt-12 border-t border-line max-w-[740px]">
          <h2 className="text-[22px] sm:text-[26px] font-bold tracking-[-0.02em] text-ink mb-4">
            How to answer &ldquo;Tell me about yourself&rdquo; in any interview
          </h2>
          <div className="space-y-4 text-[15px] text-ink-2 leading-relaxed">
            <p>
              &ldquo;Tell me about yourself&rdquo; is asked in 93% of interviews — it is the most predictable question in any interview, and the one most candidates answer poorly. It typically comes first, sets the tone for everything that follows, and research shows that 49% of employers know within the first five minutes whether a candidate is a good fit. Your opening answer is the most important 90 seconds of the entire interview.
            </p>
            <p>
              The most common mistake is treating it as a biography — reciting education history, every job you have held, and what you studied. Interviewers do not want a CV recitation. They want to quickly understand why you are the right person for this specific role. The strongest answers follow a present-past-future structure: what you do now and what you are good at, what relevant experience brought you here, and why you are genuinely interested in this particular opportunity. The whole thing should take 60 to 90 seconds to say aloud.
            </p>
          </div>

          <h3 className="text-[17px] font-bold text-ink mt-10 mb-4">Tips for a stronger &ldquo;tell me about yourself&rdquo; answer</h3>
          <ul className="space-y-2.5 text-[14px] text-ink-2">
            <li className="flex gap-2.5"><span className="text-fire font-bold shrink-0">—</span>Start with what you do now and what you are best at — not where you were born, where you went to school, or how long you have been in the industry.</li>
            <li className="flex gap-2.5"><span className="text-fire font-bold shrink-0">—</span>Include one specific, quantified achievement early — a real number in the first 20 seconds makes the rest of your answer far more credible and memorable.</li>
            <li className="flex gap-2.5"><span className="text-fire font-bold shrink-0">—</span>Tailor the final third of your answer for each company — the &ldquo;why I want this specific role&rdquo; section must reference something real about this company, not a generic line about growth or challenge.</li>
            <li className="flex gap-2.5"><span className="text-fire font-bold shrink-0">—</span>Time yourself out loud — 60 to 90 seconds is the target. Most people go well over 2 minutes when they first practice. Set a timer and cut until you hit it.</li>
            <li className="flex gap-2.5"><span className="text-fire font-bold shrink-0">—</span>Record yourself once on video and watch it back — you will notice filler words, pacing issues, and whether you sound confident or recited. Most people are surprised by how different they sound versus how they imagined.</li>
            <li className="flex gap-2.5"><span className="text-fire font-bold shrink-0">—</span>Rehearse out loud, not in your head — thinking an answer and saying it fluently are completely different skills, and the only way to build the second is to practice speaking.</li>
            <li className="flex gap-2.5"><span className="text-fire font-bold shrink-0">—</span>Do not mention salary expectations, why you left your last job, or anything negative about a previous employer — this is an opening pitch, not an exit interview.</li>
          </ul>

          <h3 className="text-[17px] font-bold text-ink mt-10 mb-6">Frequently asked questions</h3>
          <div className="space-y-6">
            <div>
              <p className="text-[14px] font-semibold text-ink mb-1.5">How long should a &ldquo;tell me about yourself&rdquo; answer be?</p>
              <p className="text-[14px] text-ink-2 leading-relaxed">60 to 90 seconds when spoken — roughly 150 to 200 words. Any shorter feels underprepared; much longer and you will lose the interviewer&apos;s attention before the real questions begin. Time yourself during practice.</p>
            </div>
            <div>
              <p className="text-[14px] font-semibold text-ink mb-1.5">Should your answer change for every job you interview for?</p>
              <p className="text-[14px] text-ink-2 leading-relaxed">Yes — especially the final third. The &ldquo;why I am excited about this role&rdquo; part should be tailored to each company and position. The first two-thirds (what you do and your relevant background) can stay consistent and be refined over time.</p>
            </div>
            <div>
              <p className="text-[14px] font-semibold text-ink mb-1.5">What is the best structure for a &ldquo;tell me about yourself&rdquo; answer?</p>
              <p className="text-[14px] text-ink-2 leading-relaxed">Present-past-future: start with what you do now and your key strength, briefly mention the experience that led you here, then connect it to why you are excited about this specific role. This structure is clear, purposeful, and easy for the interviewer to follow.</p>
            </div>
          </div>
        </div>

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: [
            { '@type': 'Question', name: 'How long should a "tell me about yourself" answer be?', acceptedAnswer: { '@type': 'Answer', text: '60 to 90 seconds when spoken — roughly 150 to 200 words. Any shorter feels underprepared; much longer and you will lose the interviewer\'s attention.' } },
            { '@type': 'Question', name: 'Should your tell me about yourself answer change for every job?', acceptedAnswer: { '@type': 'Answer', text: 'Yes — especially the final third. The "why I am excited about this role" part should be tailored to each company. The first two-thirds can stay consistent.' } },
            { '@type': 'Question', name: 'What is the best structure for a "tell me about yourself" answer?', acceptedAnswer: { '@type': 'Answer', text: 'Present-past-future: what you do now and your key strength, the experience that led you here, then why you are excited about this specific role.' } },
          ],
        }) }} />

      </main>
    </>
  );
}
