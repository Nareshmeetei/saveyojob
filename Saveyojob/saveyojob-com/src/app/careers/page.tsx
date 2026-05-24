import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '../../components/layout/Header';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://saveyojob.com';

export const metadata: Metadata = {
  title: { absolute: 'Careers Least Likely to Be Replaced by AI | Browse by Industry – Saveyojob' },
  description:
    'Find AI-proof jobs by industry. See which careers have the lowest AI automation risk, how safe each role is, and what skills protect your income in the age of AI.',
  alternates: { canonical: `${siteUrl}/careers/` },
  openGraph: {
    title: 'Careers Least Likely to Be Replaced by AI | Browse by Industry',
    description:
      'Find AI-proof jobs by industry. See which careers have the lowest AI automation risk, how safe each role is, and what skills protect your income in the age of AI.',
    url: `${siteUrl}/careers/`,
    type: 'website',
  },
};

const INDUSTRIES = [
  {
    slug: 'finance',
    name: 'Finance & Accounting',
    description: 'Accountants, financial analysts, bookkeepers, bank tellers, and related roles. High automation risk overall — but senior judgment roles remain resilient.',
    avgRisk: 'High',
    jobCount: 6,
  },
  {
    slug: 'legal',
    name: 'Legal',
    description: 'Paralegals and legal secretaries face significant AI exposure as tools like Harvey AI automate document review and legal research.',
    avgRisk: 'Very High',
    jobCount: 2,
  },
  {
    slug: 'admin',
    name: 'Administrative & Office',
    description: 'Administrative assistants, office clerks, and data entry roles. Among the most exposed careers to AI automation due to the high proportion of repetitive tasks.',
    avgRisk: 'Very High',
    jobCount: 4,
  },
  {
    slug: 'sales',
    name: 'Sales & Customer Service',
    description: 'Sales reps, customer service agents, cashiers, and telemarketers. Routine interaction roles face high risk; complex consultative selling is more resilient.',
    avgRisk: 'High',
    jobCount: 4,
  },
  {
    slug: 'technology',
    name: 'Technology & Software',
    description: 'Software developers face growing AI assistance (GitHub Copilot, Cursor) but remain in high demand as AI amplifies — not replaces — skilled engineers.',
    avgRisk: 'Moderate',
    jobCount: 1,
  },
  {
    slug: 'human-resources',
    name: 'Human Resources',
    description: 'HR specialists are seeing AI automate screening, scheduling, and compliance tasks, but relationship-intensive work in talent development stays human.',
    avgRisk: 'High',
    jobCount: 1,
  },
  {
    slug: 'design-creative',
    name: 'Design & Creative',
    description: 'Graphic designers face competition from AI image tools like Midjourney and Adobe Firefly — but creative direction and brand strategy remain human strengths.',
    avgRisk: 'Moderate',
    jobCount: 1,
  },
  {
    slug: 'marketing-research',
    name: 'Marketing & Research',
    description: 'Market research analysts can amplify their output with AI tools, but the roles requiring strategic interpretation and client communication are holding their value.',
    avgRisk: 'Moderate',
    jobCount: 1,
  },
];

const RISK_STYLE: Record<string, { text: string; bg: string }> = {
  'Very High': { text: '#C45347', bg: 'rgba(196,83,71,0.09)' },
  'High':      { text: '#D4783C', bg: 'rgba(212,120,60,0.08)' },
  'Moderate':  { text: '#CA8A04', bg: 'rgba(202,138,4,0.08)' },
  'Low':       { text: '#097BA0', bg: 'rgba(9,123,160,0.08)' },
};

export default function CareersPage() {
  return (
    <>
      <Header />
      <main className="max-w-[900px] mx-auto px-5 sm:px-8 py-12">

        <div className="mb-10">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-fire mb-3">Browse by Industry</p>
          <h1 className="text-[34px] sm:text-[42px] font-bold text-ink tracking-[-0.03em] leading-tight mb-4">
            Which Careers Are Safe From AI?
          </h1>
          <p className="text-[16px] text-ink-2 leading-relaxed max-w-[640px]">
            Not all jobs face the same AI threat. Browse by industry to see which careers have the lowest
            automation risk, which roles AI is already replacing, and what skills keep you ahead. Every
            industry page shows real automation scores backed by Oxford University and BLS research.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          {INDUSTRIES.map(ind => {
            const rs = RISK_STYLE[ind.avgRisk] ?? { text: '#7AAAB8', bg: 'rgba(122,170,184,0.10)' };
            return (
              <Link
                key={ind.slug}
                href={`/careers/${ind.slug}/`}
                className="flex flex-col gap-3 p-5 bg-surface border border-line rounded-xl hover:border-fire hover:bg-surface-2 transition-all duration-150 group"
              >
                <div className="flex items-start justify-between gap-3">
                  <h2 className="text-[16px] font-semibold text-ink group-hover:text-fire transition-colors leading-snug">
                    {ind.name}
                  </h2>
                  <span
                    className="text-[9px] font-bold uppercase tracking-[0.08em] px-2 py-0.5 rounded shrink-0 mt-0.5"
                    style={{ color: rs.text, background: rs.bg }}
                  >
                    {ind.avgRisk} risk
                  </span>
                </div>
                <p className="text-[13px] text-ink-2 leading-relaxed">{ind.description}</p>
                <div className="flex items-center justify-between mt-auto pt-2.5 border-t border-line">
                  <span className="text-[12px] text-ink-3">{ind.jobCount} job{ind.jobCount !== 1 ? 's' : ''} tracked</span>
                  <span className="text-[12px] font-semibold text-fire">View scores →</span>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="p-5 bg-surface border border-line rounded-xl mb-12">
          <p className="text-[13px] font-semibold text-ink mb-2">How we score AI automation risk</p>
          <p className="text-[13px] text-ink-2 leading-relaxed">
            Every score is derived from Oxford University&rsquo;s landmark automation research (Frey &amp; Osborne, 2013),
            cross-referenced with U.S. Bureau of Labor Statistics employment data. Scores reflect the probability
            that a job&rsquo;s core tasks can be automated — not a guarantee of job loss. Individual outcomes
            depend on employer adoption speed, region, and how quickly workers build AI skills.
          </p>
        </div>

        <div className="text-center">
          <p className="text-[14px] text-ink-2 mb-4">Want a personalised AI risk score for your specific role?</p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-4 bg-fire text-bg text-[15px] font-bold rounded-xl hover:brightness-105 transition-all"
          >
            Get your free AI risk score →
          </Link>
        </div>

      </main>
    </>
  );
}
