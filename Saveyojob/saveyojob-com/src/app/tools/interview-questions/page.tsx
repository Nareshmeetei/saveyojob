import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Header from '../../../components/layout/Header';
import InterviewQuestionsClient from './InterviewQuestionsClient';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://saveyojob.com';

export const metadata: Metadata = {
  title: 'Interview Questions Generator — 10 Likely Questions From Any Job Description',
  description:
    'Paste any job description to get the 10 most likely questions this company will ask, plus a concrete framework for answering each one. Free, no sign-up required.',
  alternates: { canonical: `${siteUrl}/tools/interview-questions/` },
  openGraph: {
    title: 'Interview Questions Generator',
    description: 'Paste any job description → the 10 most likely questions this company will ask + answer frameworks.',
    url: `${siteUrl}/tools/interview-questions/`,
    type: 'website',
  },
};

export default function InterviewQuestionsPage() {
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
            Interview Questions Generator
          </h1>
          <p className="text-[16px] text-ink-2 leading-relaxed max-w-[560px]">
            Paste any job description — get the 10 most likely questions this company will ask, broken down by type, with a concrete framework for answering each one.
          </p>
        </div>

        <InterviewQuestionsClient />

        <div className="mt-20 pt-12 border-t border-line max-w-[740px]">
          <h2 className="text-[22px] sm:text-[26px] font-bold tracking-[-0.02em] text-ink mb-4">
            How to prepare for a job interview — and predict what you will be asked
          </h2>
          <div className="space-y-4 text-[15px] text-ink-2 leading-relaxed">
            <p>
              74% of job seekers prepare for interviews by practising common questions — and candidates who practise tend to perform 45% better on the day. The challenge is that generic lists of &ldquo;common interview questions&rdquo; rarely match what actually gets asked in a specific role. The most useful preparation is job description analysis: take the key skills and responsibilities from the posting and prepare a specific story for each one. The job description predicts around 80% of what you will be asked.
            </p>
            <p>
              The most reliable framework for structuring answers is STAR: Situation, Task, Action, Result. Prepare five to six detailed STAR stories that can be adapted to multiple questions. A story about leading a team through a difficult project can answer questions about leadership, pressure, conflict resolution, and communication — four different questions, one well-prepared story. Saying answers aloud during preparation is essential; thinking them and saying them are very different skills.
            </p>
          </div>

          <h3 className="text-[17px] font-bold text-ink mt-10 mb-4">Tips for stronger interview preparation</h3>
          <ul className="space-y-2.5 text-[14px] text-ink-2">
            <li className="flex gap-2.5"><span className="text-fire font-bold shrink-0">—</span>Build a library of 5–6 flexible STAR stories. Each story should be adaptable to at least 3 different question types — one strong story about leading through difficulty covers leadership, pressure, conflict, and communication questions simultaneously.</li>
            <li className="flex gap-2.5"><span className="text-fire font-bold shrink-0">—</span>Research each interviewer on LinkedIn before the call — knowing their background, how long they have been at the company, and what they focus on helps you tailor answers and ask sharper questions.</li>
            <li className="flex gap-2.5"><span className="text-fire font-bold shrink-0">—</span>Research the company&apos;s recent news (past 60 days), their main product or revenue driver, and one challenge the industry is facing — weaving this naturally into your answers signals serious preparation.</li>
            <li className="flex gap-2.5"><span className="text-fire font-bold shrink-0">—</span>Prepare your &ldquo;greatest weakness&rdquo; answer in advance — it is asked in nearly every interview and still catches people off guard. Pick a real weakness that is not core to the role and explain what you are actively doing about it.</li>
            <li className="flex gap-2.5"><span className="text-fire font-bold shrink-0">—</span>Prepare 3 smart questions that demonstrate you have thought about the role — ask about the biggest challenge the team is facing, what success looks like in the first 90 days, or what separates people who thrive here from those who do not.</li>
            <li className="flex gap-2.5"><span className="text-fire font-bold shrink-0">—</span>Spend most of your STAR answer on the Action and Result — interviewers already know the situation exists. The Situation and Task setup should take no more than 20% of your answer time.</li>
            <li className="flex gap-2.5"><span className="text-fire font-bold shrink-0">—</span>Practise out loud and record yourself once — most people are better than they think but use more filler words than they realise. One playback session is worth an hour of silent rehearsal.</li>
            <li className="flex gap-2.5"><span className="text-fire font-bold shrink-0">—</span>Send a thank you email within 24 hours after every round — 22% of hiring managers say they are less likely to hire someone who does not send one, and it gives you a second shot at leaving an impression.</li>
          </ul>

          <h3 className="text-[17px] font-bold text-ink mt-10 mb-6">Frequently asked questions</h3>
          <div className="space-y-6">
            <div>
              <p className="text-[14px] font-semibold text-ink mb-1.5">What are the most common job interview questions?</p>
              <p className="text-[14px] text-ink-2 leading-relaxed">&ldquo;Tell me about yourself&rdquo; (asked in 93% of interviews), &ldquo;Why do you want this role?&rdquo;, &ldquo;Describe a time you handled a difficult situation&rdquo;, and role-specific competency questions drawn from the job description. The posting predicts the majority of what you will be asked.</p>
            </div>
            <div>
              <p className="text-[14px] font-semibold text-ink mb-1.5">How long should interview answers be?</p>
              <p className="text-[14px] text-ink-2 leading-relaxed">90 seconds to 2 minutes for behavioural questions. Short answers signal shallow thinking; long answers lose the interviewer. The STAR framework helps you stay structured and on time — spend most of your time on the Action and Result, not the setup.</p>
            </div>
            <div>
              <p className="text-[14px] font-semibold text-ink mb-1.5">How do you prepare for behavioural interview questions?</p>
              <p className="text-[14px] text-ink-2 leading-relaxed">Build a library of specific STAR stories from your work history. For each story, identify all the different question types it can answer — leadership, pressure, collaboration, problem-solving. Five to six strong stories can cover the entire interview. Practise saying each one out loud until it sounds natural, not rehearsed.</p>
            </div>
          </div>
        </div>

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: [
            { '@type': 'Question', name: 'What are the most common job interview questions?', acceptedAnswer: { '@type': 'Answer', text: '"Tell me about yourself" (asked in 93% of interviews), "Why do you want this role?", "Describe a time you handled a difficult situation", and role-specific questions drawn from the job description.' } },
            { '@type': 'Question', name: 'How long should interview answers be?', acceptedAnswer: { '@type': 'Answer', text: '90 seconds to 2 minutes for behavioural questions. Use the STAR framework to stay structured. Spend most of your time on the Action and Result, not the setup.' } },
            { '@type': 'Question', name: 'How do you prepare for behavioural interview questions?', acceptedAnswer: { '@type': 'Answer', text: 'Build 5–6 specific STAR stories from your work history. Each story can answer multiple question types. Practise saying them aloud until they sound natural, not rehearsed.' } },
          ],
        }) }} />

      </main>
    </>
  );
}
