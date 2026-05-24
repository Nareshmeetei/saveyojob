import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '../../components/layout/Header';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://saveyojob.com';

export const metadata: Metadata = {
  title: { absolute: 'About Saveyojob | AI Career Risk Analysis & Future-Proof Career Tools' },
  description:
    'Learn how Saveyojob analyzes AI automation risk using labor market data, job trends, and AI research to help professionals stay competitive and future-ready.',
  alternates: { canonical: `${siteUrl}/about/` },
  openGraph: {
    title: 'About Saveyojob | AI Career Risk Analysis & Future-Proof Career Tools',
    description:
      'Learn how Saveyojob analyzes AI automation risk using labor market data, job trends, and AI research to help professionals stay competitive and future-ready.',
    url: `${siteUrl}/about/`,
    type: 'website',
  },
};

const ABOUT_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  '@id': `${siteUrl}/about/`,
  url: `${siteUrl}/about/`,
  name: 'About Saveyojob.com',
  description:
    'Saveyojob.com is a free AI career risk tool that scores automation probability for 800+ occupations and generates personalized reskilling roadmaps based on Oxford University, BLS, and O*NET data.',
  mainEntity: {
    '@type': 'Organization',
    '@id': `${siteUrl}/#organization`,
    name: 'Saveyojob.com',
    url: siteUrl,
    foundingDate: '2024',
    description:
      'Free AI job risk assessment platform. Uses Oxford University automation research, BLS occupational employment data, and O*NET task databases to produce task-level AI displacement scores and personalized reskilling roadmaps.',
    knowsAbout: [
      'AI job displacement',
      'occupational automation risk',
      'career reskilling',
      'future of work',
      'machine learning automation',
    ],
  },
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ABOUT_SCHEMA) }}
      />
      <Header />
      <main className="max-w-[720px] mx-auto px-5 sm:px-8 py-16">

        <div className="mb-12">
          <h1 className="text-[36px] sm:text-[42px] font-bold tracking-[-0.03em] text-ink leading-tight mb-5">
            We help workers stay ahead of AI.
          </h1>
          <p className="text-[17px] text-ink-2 leading-relaxed">
            Saveyojob.com is a free AI career risk tool that tells you exactly which tasks in your job
            are being automated — and gives you a personalized, actionable reskilling roadmap.
          </p>
        </div>

        <div className="space-y-10 mb-16">
          <section>
            <h2 className="text-[20px] font-bold text-ink mb-3">The problem we&apos;re solving</h2>
            <p className="text-[15px] text-ink-2 leading-relaxed mb-3">
              52% of Americans are more concerned than excited about AI in the workplace (Pew Research, 2024).
              The World Economic Forum&apos;s Future of Jobs Report 2023 projects 83 million jobs will be
              displaced globally by 2027. Yet most people have no idea which parts of their specific job
              are at risk — let alone what to do about it.
            </p>
            <p className="text-[15px] text-ink-2 leading-relaxed">
              Every existing tool gives a generic risk score with no guidance. Nobody had built a
              task-level, personalized roadmap generator with integrated course recommendations.
              Until now.
            </p>
          </section>

          <section>
            <h2 className="text-[20px] font-bold text-ink mb-3">How it works</h2>
            <div className="space-y-4">
              {[
                {
                  n: '01',
                  title: 'Task-level analysis',
                  desc: 'We break down every task in your specific job and show you exactly which are being automated — and by which AI tools.',
                },
                {
                  n: '02',
                  title: 'Personalized roadmap',
                  desc: 'Based on your experience level and goals, we build a week-by-week learning roadmap matched to your schedule.',
                },
                {
                  n: '03',
                  title: 'Real course recommendations',
                  desc: 'Curated courses from Coursera, LinkedIn Learning, DeepLearning.AI, and more — each chosen for your specific situation.',
                },
              ].map(item => (
                <div key={item.n} className="flex gap-5 p-5 bg-surface border border-line rounded-xl">
                  <div className="text-[22px] font-extrabold text-fire leading-none shrink-0">{item.n}</div>
                  <div>
                    <div className="text-[15px] font-bold text-ink mb-1">{item.title}</div>
                    <p className="text-[13px] text-ink-2 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-[20px] font-bold text-ink mb-3">Data sources &amp; methodology</h2>
            <p className="text-[15px] text-ink-2 leading-relaxed mb-3">
              Automation probability scores are derived from Oxford University research — specifically
              Frey &amp; Osborne (2013), &quot;The Future of Employment: How Susceptible Are Jobs to
              Computerisation?&quot; — the most widely cited academic study on occupation-level AI displacement risk.
              Salary data and 10-year employment projections come from the U.S. Bureau of Labor Statistics (BLS).
              Task breakdowns and skill importance data are sourced from O*NET, the U.S. Department of Labor&apos;s
              occupational database. Methodology is cross-referenced with McKinsey Global Institute research on
              automation potential across work activities.
            </p>
            <p className="text-[15px] text-ink-2 leading-relaxed">
              Reskilling roadmaps are generated by Claude (Anthropic), using a specialized prompt informed
              by career transition research and tailored to your role, experience level, goals, and time availability.
            </p>
          </section>

          <section>
            <h2 className="text-[20px] font-bold text-ink mb-3">Business model</h2>
            <p className="text-[15px] text-ink-2 leading-relaxed">
              Saveyojob.com is free to use, always. We earn a commission when users enroll in
              recommended courses through our affiliate partnerships with Coursera, LinkedIn Learning,
              and other platforms. This never influences which courses we recommend — only the highest-rated,
              most relevant courses make the cut.
            </p>
          </section>
        </div>

        <div className="border-t border-line pt-10 text-center">
          <Link
            href="/"
            className="inline-block px-8 py-4 bg-fire text-bg font-bold text-[15px] rounded-xl hover:brightness-105 transition-all duration-150"
          >
            Check your AI risk score — free →
          </Link>
        </div>

      </main>
    </>
  );
}
