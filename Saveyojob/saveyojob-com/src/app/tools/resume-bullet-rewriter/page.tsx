import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Header from '../../../components/layout/Header';
import ResumeBulletRewriterClient from './ResumeBulletRewriterClient';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://saveyojob.com';

export const metadata: Metadata = {
  title: 'Resume Bullet Rewriter — Turn Weak Bullets Into Impact Statements',
  description:
    'Paste weak resume bullets and get quantified, impact-first rewrites using the XYZ formula. Free AI tool — no sign-up required.',
  alternates: { canonical: `${siteUrl}/tools/resume-bullet-rewriter/` },
  openGraph: {
    title: 'Resume Bullet Rewriter',
    description: 'Turn weak resume bullets into impact-first, quantified statements using the XYZ formula.',
    url: `${siteUrl}/tools/resume-bullet-rewriter/`,
    type: 'website',
  },
};

export default function ResumeBulletRewriterPage() {
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
            Resume Bullet Rewriter
          </h1>
          <p className="text-[16px] text-ink-2 leading-relaxed max-w-[560px]">
            Paste weak bullets and get impact-first rewrites using the XYZ formula — every rewrite leads with a strong verb and a quantified result.
          </p>
        </div>

        <ResumeBulletRewriterClient />

        <div className="mt-20 pt-12 border-t border-line max-w-[740px]">
          <h2 className="text-[22px] sm:text-[26px] font-bold tracking-[-0.02em] text-ink mb-4">
            How to write resume bullet points that prove your value
          </h2>
          <div className="space-y-4 text-[15px] text-ink-2 leading-relaxed">
            <p>
              Resume bullets are the core of your application — they are where recruiters look for evidence that you can do the job. Yet most bullets are written as job descriptions rather than achievement statements: &ldquo;Responsible for managing social media accounts&rdquo; tells a recruiter nothing they couldn&apos;t find on the job posting itself. The highest-performing resume bullets follow the XYZ formula: &ldquo;Accomplished X, as measured by Y, by doing Z.&rdquo; This structure forces you to name the outcome, quantify it, and explain how you achieved it — the exact information a hiring manager needs to decide whether you can produce the same results for them.
            </p>
            <p>
              Quantified resume bullets consistently outperform descriptive ones in recruiter evaluations. A LinkedIn study found that profiles and applications using specific numbers were rated significantly more credible and hirable than those with identical skills but no metrics. You do not need dramatic numbers to make an impact — a 12% improvement in customer satisfaction, a team of 3 people, or a project completed 2 weeks early are all meaningful data points that the vast majority of candidates omit entirely. If you genuinely cannot quantify a result, the next best approach is to name the scope: how large was the team, what was the budget, how many customers were affected.
            </p>
          </div>

          <h3 className="text-[17px] font-bold text-ink mt-10 mb-4">Tips for stronger resume bullet points</h3>
          <ul className="space-y-2.5 text-[14px] text-ink-2">
            <li className="flex gap-2.5"><span className="text-fire font-bold shrink-0">—</span>Start every bullet with a strong action verb — &ldquo;Led,&rdquo; &ldquo;Built,&rdquo; &ldquo;Reduced,&rdquo; &ldquo;Generated,&rdquo; &ldquo;Negotiated&rdquo; — never &ldquo;Responsible for,&rdquo; &ldquo;Helped with,&rdquo; or &ldquo;Worked on.&rdquo; Those imply peripheral involvement.</li>
            <li className="flex gap-2.5"><span className="text-fire font-bold shrink-0">—</span>Lead with the outcome, not the activity — what changed because of your work, not just what you did. &ldquo;Reduced customer onboarding time by 40%&rdquo; is a result. &ldquo;Managed the customer onboarding process&rdquo; is a job description.</li>
            <li className="flex gap-2.5"><span className="text-fire font-bold shrink-0">—</span>Include at least one number in every bullet where possible — percentage change, dollar value, team size, volume handled, time saved. Numbers make claims verifiable and stand out during a 6-second scan.</li>
            <li className="flex gap-2.5"><span className="text-fire font-bold shrink-0">—</span>When you cannot quantify the result, quantify the scope instead — how large was the team, what was the budget, how many customers were affected, what was the scale of the system you managed.</li>
            <li className="flex gap-2.5"><span className="text-fire font-bold shrink-0">—</span>Vary your opening verbs across bullets — if you open five consecutive bullets with &ldquo;Managed,&rdquo; the reader stops processing each one. Use a different verb for each bullet to signal range and keep attention.</li>
            <li className="flex gap-2.5"><span className="text-fire font-bold shrink-0">—</span>Use past tense for every previous role, present tense for your current one — mixing tenses within a job entry looks unpolished and is one of the most common resume errors.</li>
            <li className="flex gap-2.5"><span className="text-fire font-bold shrink-0">—</span>Cut adverbs ruthlessly — &ldquo;successfully,&rdquo; &ldquo;proactively,&rdquo; &ldquo;effectively&rdquo; add length without adding information. If the result is in the bullet, the adverb is redundant.</li>
            <li className="flex gap-2.5"><span className="text-fire font-bold shrink-0">—</span>Keep each bullet to one or two lines — a bullet that wraps onto three lines needs to be split into two separate achievements or trimmed to its essential information.</li>
          </ul>

          <h3 className="text-[17px] font-bold text-ink mt-10 mb-6">Frequently asked questions</h3>
          <div className="space-y-6">
            <div>
              <p className="text-[14px] font-semibold text-ink mb-1.5">Should resume bullets always have numbers?</p>
              <p className="text-[14px] text-ink-2 leading-relaxed">Aim for at least 50–60% of your bullets to include a quantified result. Not every responsibility produces a measurable outcome, but more do than most people realise. Revenue generated, cost reduced, time saved, team size managed, projects delivered, customers served — any of these makes a bullet meaningfully stronger. When a number is genuinely impossible, use scope descriptors instead (global, enterprise-level, cross-functional).</p>
            </div>
            <div>
              <p className="text-[14px] font-semibold text-ink mb-1.5">How do I quantify my achievements on a resume?</p>
              <p className="text-[14px] text-ink-2 leading-relaxed">Start by asking: how much, how many, how often, how fast, or compared to what? Pull exact numbers from reports, performance reviews, or project outcomes. If you do not have exact figures, use reasonable estimates based on your knowledge — stating &ldquo;approximately 40% faster&rdquo; is better than omitting the data entirely, as long as you could defend it in an interview.</p>
            </div>
            <div>
              <p className="text-[14px] font-semibold text-ink mb-1.5">What are the best action verbs for resume bullet points?</p>
              <p className="text-[14px] text-ink-2 leading-relaxed">The strongest verbs are specific and outcome-oriented: Led, Built, Reduced, Increased, Launched, Negotiated, Delivered, Streamlined, Generated, Managed. Avoid weak openers like &ldquo;Helped,&rdquo; &ldquo;Assisted,&rdquo; or &ldquo;Worked on&rdquo; — they imply peripheral involvement. Match your verb to the scope: &ldquo;Led&rdquo; for team leadership, &ldquo;Built&rdquo; for creating from scratch, &ldquo;Reduced&rdquo; for cost or time savings.</p>
            </div>
          </div>
        </div>

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: [
            { '@type': 'Question', name: 'Should resume bullets always have numbers?', acceptedAnswer: { '@type': 'Answer', text: 'Aim for 50–60% of bullets to include a quantified result. Revenue, cost reduction, time saved, team size, customers served — any number makes a bullet stronger. When a number is impossible, use scope descriptors instead.' } },
            { '@type': 'Question', name: 'How do I quantify my achievements on a resume?', acceptedAnswer: { '@type': 'Answer', text: 'Ask: how much, how many, how often, how fast, or compared to what? Pull from reports or performance reviews. Reasonable estimates ("approximately 40% faster") are better than omitting data, as long as you could defend them in an interview.' } },
            { '@type': 'Question', name: 'What are the best action verbs for resume bullet points?', acceptedAnswer: { '@type': 'Answer', text: 'Led, Built, Reduced, Increased, Launched, Negotiated, Delivered, Streamlined, Generated, Managed. Avoid weak openers like "Helped," "Assisted," or "Worked on" — they imply peripheral involvement.' } },
          ],
        }) }} />

      </main>
    </>
  );
}
