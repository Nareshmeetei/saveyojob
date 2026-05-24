import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Header from '../../../components/layout/Header';
import ThankYouEmailClient from './ThankYouEmailClient';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://saveyojob.com';

export const metadata: Metadata = {
  title: 'Free Thank You Email Generator — Post-Interview Follow-Up in Seconds',
  description:
    'Generate a personalised thank you email after your interview in seconds. Reference specific moments, choose your tone, and copy it ready to send — no sign-up required.',
  alternates: { canonical: `${siteUrl}/tools/thank-you-email/` },
  openGraph: {
    title: 'Free Thank You Email Generator — Post-Interview Follow-Up',
    description: 'Generate a personalised post-interview thank you email in seconds. No sign-up required.',
    url: `${siteUrl}/tools/thank-you-email/`,
    type: 'website',
  },
};

export default function ThankYouEmailPage() {
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
            Thank You Email Generator
          </h1>
          <p className="text-[16px] text-ink-2 leading-relaxed max-w-[560px]">
            Enter your interview details, reference specific moments from the conversation, and get a personalised follow-up email ready to copy and send.
          </p>
        </div>

        <ThankYouEmailClient />

        <div className="mt-20 pt-12 border-t border-line max-w-[740px]">
          <h2 className="text-[22px] sm:text-[26px] font-bold tracking-[-0.02em] text-ink mb-4">
            Why a post-interview thank you email still matters — and how to write one that works
          </h2>
          <div className="space-y-4 text-[15px] text-ink-2 leading-relaxed">
            <p>
              Only 57% of candidates send a thank you email after an interview, yet 22% of hiring managers say they are less likely to hire someone who does not send one. That gap is an easy competitive advantage. A well-written interview follow-up email gives you a second chance to reinforce your fit for the role, address anything that came up in the conversation, and signal genuine interest — all within a few sentences.
            </p>
            <p>
              The most effective post-interview emails reference something specific from the conversation: a challenge the team mentioned, a project they described, or a value the interviewer expressed. Generic follow-up emails ("Thank you for your time. I look forward to hearing from you.") are barely better than nothing. Send yours within 24 hours — most first-round hiring decisions happen within 48 to 72 hours of interviews, and your email arrives during that window.
            </p>
          </div>

          <h3 className="text-[17px] font-bold text-ink mt-10 mb-4">Tips for a stronger post-interview follow-up</h3>
          <ul className="space-y-2.5 text-[14px] text-ink-2">
            <li className="flex gap-2.5"><span className="text-fire font-bold shrink-0">—</span>Write your notes immediately after the interview, while the conversation is fresh — the specific details (a challenge the team mentioned, a project they described, a value the interviewer expressed) are what make a follow-up email stand out and forgettable within an hour.</li>
            <li className="flex gap-2.5"><span className="text-fire font-bold shrink-0">—</span>Reference at least one specific moment or topic from the interview — a generic &ldquo;thank you for your time&rdquo; is barely better than nothing. Something like &ldquo;your comment about scaling the support team resonated — here is how I approached a similar problem&rdquo; keeps the conversation going.</li>
            <li className="flex gap-2.5"><span className="text-fire font-bold shrink-0">—</span>Use the email to add something you did not get to say — if a relevant achievement or point of fit came to mind after the interview, include it here. It is a second chance to make your case, not just a formality.</li>
            <li className="flex gap-2.5"><span className="text-fire font-bold shrink-0">—</span>Confirm your interest in the role explicitly — do not make them guess. A clear &ldquo;I am genuinely excited about this opportunity&rdquo; in writing signals intent and is noted.</li>
            <li className="flex gap-2.5"><span className="text-fire font-bold shrink-0">—</span>Keep it under 150 words — this is a follow-up, not a second cover letter. Brevity here signals confidence and respect for the reader&apos;s time.</li>
            <li className="flex gap-2.5"><span className="text-fire font-bold shrink-0">—</span>If you interviewed with multiple people, send each a separate, personalised email referencing something specific they said — never a group message, and never an identical template to all of them.</li>
            <li className="flex gap-2.5"><span className="text-fire font-bold shrink-0">—</span>Proofread carefully before sending — a typo in a thank you email is disproportionately damaging because the email is short and every word is visible. Read it twice before you hit send.</li>
            <li className="flex gap-2.5"><span className="text-fire font-bold shrink-0">—</span>Send after every round, not just the first — each follow-up keeps your name front of mind during a process that can drag over weeks and involve multiple evaluators comparing notes.</li>
          </ul>

          <h3 className="text-[17px] font-bold text-ink mt-10 mb-6">Frequently asked questions</h3>
          <div className="space-y-6">
            <div>
              <p className="text-[14px] font-semibold text-ink mb-1.5">Should you send a thank you email after every round of interviews?</p>
              <p className="text-[14px] text-ink-2 leading-relaxed">Yes — after every round, not just the first. Each stage is an opportunity to keep your name front of mind and demonstrate consistent enthusiasm for the role. Tailor each one to the specific conversation.</p>
            </div>
            <div>
              <p className="text-[14px] font-semibold text-ink mb-1.5">Is it too late to send a thank you email the next day?</p>
              <p className="text-[14px] text-ink-2 leading-relaxed">Next day is fine. Within 24 hours is ideal. Avoid sending one several days later — at that point it looks reactive rather than genuine, and a hiring decision may already have been made.</p>
            </div>
            <div>
              <p className="text-[14px] font-semibold text-ink mb-1.5">What should you include in a thank you email after an interview?</p>
              <p className="text-[14px] text-ink-2 leading-relaxed">A brief thanks, one specific reference to something discussed in the interview, a restatement of your interest in the role, and a short closing. Three to four sentences is enough — you want to be remembered, not exhausting.</p>
            </div>
          </div>
        </div>

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: [
            { '@type': 'Question', name: 'Should you send a thank you email after every round of interviews?', acceptedAnswer: { '@type': 'Answer', text: 'Yes — after every round, not just the first. Each stage is an opportunity to keep your name front of mind. Tailor each one to the specific conversation.' } },
            { '@type': 'Question', name: 'Is it too late to send a thank you email the next day?', acceptedAnswer: { '@type': 'Answer', text: 'Next day is fine. Within 24 hours is ideal. Avoid sending one several days later — at that point it looks reactive rather than genuine.' } },
            { '@type': 'Question', name: 'What should you include in a thank you email after an interview?', acceptedAnswer: { '@type': 'Answer', text: 'A brief thanks, one specific reference to something discussed in the interview, a restatement of your interest in the role, and a short closing. Three to four sentences is enough.' } },
          ],
        }) }} />

      </main>
    </>
  );
}
