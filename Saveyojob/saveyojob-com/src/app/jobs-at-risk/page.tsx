import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '../../components/layout/Header';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://saveyojob.com';

export const metadata: Metadata = {
  title: 'Which Jobs Are Most at Risk from AI? Automation Scores for 800+ Occupations',
  description:
    'Browse AI automation risk scores for 800+ occupations. See median salary, employment count, 10-year job growth, and the task most exposed to AI — based on Oxford University research and BLS data.',
  alternates: { canonical: `${siteUrl}/jobs-at-risk/` },
  openGraph: {
    title: 'Which Jobs Are Most at Risk from AI? Automation Scores for 800+ Occupations',
    description:
      'Automation probability scores for 800+ jobs. Salary data, 10-year projections, and task-level AI exposure — based on Oxford University and BLS research.',
    url: `${siteUrl}/jobs-at-risk/`,
    type: 'website',
  },
};

async function getOccupations() {
  const { SEED_OCCUPATIONS } = await import('../../../data/seed-data');
  return SEED_OCCUPATIONS;
}

const RISK_STYLE: Record<string, { text: string; bg: string }> = {
  'Very High': { text: '#C45347', bg: 'rgba(196,83,71,0.09)' },
  'High':      { text: '#D4783C', bg: 'rgba(212,120,60,0.08)'  },
  'Moderate':  { text: '#CA8A04', bg: 'rgba(202,138,4,0.08)'  },
  'Low':       { text: '#097BA0', bg: 'rgba(9,123,160,0.08)'  },
};

function formatEmployment(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M workers`;
  if (n >= 1_000)     return `${Math.round(n / 1_000)}K workers`;
  return `${n} workers`;
}

function topRiskyTask(tasks: { name: string; automation_risk: string }[]): string | null {
  if (!tasks?.length) return null;
  const order = ['Very High', 'High', 'Moderate', 'Low', 'Minimal'];
  return [...tasks].sort((a, b) => order.indexOf(a.automation_risk) - order.indexOf(b.automation_risk))[0]?.name ?? null;
}

export default async function JobsPage() {
  const occupations = await getOccupations();

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Jobs by AI Automation Risk',
    description: 'Automation probability scores for occupations, based on Oxford University research and BLS data.',
    numberOfItems: occupations.length,
    itemListElement: occupations.slice(0, 50).map((o: any, i: number) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `https://saveyojob.com/jobs-at-risk/${o.slug}/`,
      name: o.title,
    })),
  };

  return (
    <>
      <Header />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <main className="max-w-[900px] mx-auto px-5 sm:px-8 py-12">

        <div className="mb-10">
          <h1 className="text-[34px] sm:text-[42px] font-bold text-ink tracking-[-0.03em] leading-tight mb-4">
            Which Jobs Are Most at Risk from AI?
          </h1>
          <p className="text-[16px] text-ink-2 leading-relaxed max-w-[640px]">
            Automation probability scores for {occupations.length} occupations, based on Oxford University
            research and Bureau of Labor Statistics data. Each card shows salary, employment outlook,
            10-year job growth, and the task most exposed to AI — so you can see the real picture, fast.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-12">
          {occupations.map((o: any) => {
            const rs    = RISK_STYLE[o.risk_level ?? ''] ?? { text: '#7AAAB8', bg: 'rgba(122,170,184,0.10)' };
            const score = o.automation_probability ? Math.round(o.automation_probability * 100) : null;
            const task  = topRiskyTask(o.tasks ?? []);
            const growthPct: number | null = o.ten_year_growth_pct ?? null;
            const growthColor = growthPct == null ? '' : growthPct >= 0 ? '#097BA0' : '#C45347';
            const growthLabel = growthPct != null
              ? `${growthPct > 0 ? '+' : ''}${growthPct}% by 2034`
              : null;

            return (
              <Link
                key={o.slug}
                href={`/jobs-at-risk/${o.slug}/`}
                className="flex flex-col gap-3 p-4 bg-surface border border-line rounded-xl hover:border-fire hover:bg-surface-2 transition-all duration-150 group"
              >
                {/* Row 1 — title + score */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-1.5 min-w-0">
                    <span className="text-[15px] font-semibold text-ink group-hover:text-fire transition-colors leading-snug">
                      {o.title}
                    </span>
                    {o.risk_level === 'Very High' && (
                      <span className="relative inline-flex items-center justify-center w-2 h-2 mt-1 shrink-0">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-35" style={{ backgroundColor: '#C45347', animationDuration: '2.4s' }} />
                        <span className="relative inline-flex w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#C45347' }} />
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col items-end shrink-0">
                    {score !== null && (
                      <span className="text-[22px] font-bold tabular-nums leading-none" style={{ color: rs.text }}>
                        {score}%
                      </span>
                    )}
                    {o.risk_level && (
                      <span
                        className="text-[9px] font-bold uppercase tracking-[0.08em] px-1.5 py-0.5 rounded mt-0.5"
                        style={{ color: rs.text, background: rs.bg }}
                      >
                        {o.risk_level}
                      </span>
                    )}
                  </div>
                </div>

                {/* Row 2 — salary · workers · growth */}
                <div className="flex flex-wrap gap-x-3 gap-y-1 text-[12px] text-ink-3">
                  {o.median_annual_wage && (
                    <span>${o.median_annual_wage.toLocaleString()}/yr</span>
                  )}
                  {o.employment_count && (
                    <span>{formatEmployment(o.employment_count)}</span>
                  )}
                  {growthLabel && (
                    <span style={{ color: growthColor }}>{growthLabel}</span>
                  )}
                </div>

                {/* Row 3 — most at-risk task */}
                {task && (
                  <div className="text-[11px] text-ink-3 pt-2 border-t border-line leading-snug">
                    <span className="font-medium text-ink-2">AI will replace this first:</span> {task}
                  </div>
                )}
              </Link>
            );
          })}
        </div>

        <div className="text-center mb-16">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-4 bg-fire text-bg text-[15px] font-bold rounded-xl hover:brightness-105 transition-all"
          >
            Get your free personalized roadmap →
          </Link>
        </div>

        <div className="pt-10 border-t border-line">
          <p className="text-[13px] font-semibold text-ink mb-1">Data sources &amp; methodology</p>
          <p className="text-[12px] text-ink-3 mb-6 leading-relaxed">
            Risk scores reflect the probability that an occupation's core tasks can be automated using
            existing or near-term AI — not a guarantee of job loss. Individual outcomes depend on
            employer adoption, geography, and a worker's ability to adapt.
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {([
              {
                name: 'Oxford Martin School — Frey & Osborne (2013)',
                detail: 'Automation probability scores are derived from "The Future of Employment: How Susceptible Are Jobs to Computerisation?" — the most widely cited academic study on occupation-level AI displacement risk.',
                href: 'https://www.oxfordmartin.ox.ac.uk/publications/the-future-of-employment/',
              },
              {
                name: 'U.S. Bureau of Labor Statistics (BLS)',
                detail: 'Median wages, employment counts, and 10-year job growth projections from the BLS Occupational Employment and Wage Statistics program and Employment Projections.',
                href: 'https://www.bls.gov/oes/',
              },
              {
                name: 'O*NET — U.S. Dept. of Labor',
                detail: 'Task breakdowns and skill importance ratings drawn from O*NET OnLine, the primary U.S. government database of occupational characteristics and worker requirements.',
                href: 'https://www.onetonline.org',
              },
              {
                name: 'McKinsey Global Institute',
                detail: 'Task automation methodology cross-referenced against MGI research on the automation potential of work activities, updated for current generative AI capabilities.',
                href: 'https://www.mckinsey.com/mgi',
              },
            ] as const).map(s => (
              <div key={s.name} className="p-4 bg-surface border border-line rounded-xl">
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[13px] font-semibold text-ink hover:text-fire transition-colors leading-snug block mb-1.5"
                >
                  {s.name}
                </a>
                <p className="text-[12px] text-ink-3 leading-relaxed">{s.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
