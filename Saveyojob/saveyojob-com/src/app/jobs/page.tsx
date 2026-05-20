import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '../../components/layout/Header';

export const metadata: Metadata = {
  title: 'AI Automation Risk by Occupation — Browse All Jobs',
  description:
    'Browse AI automation risk scores for 800+ occupations. See which tasks are being automated and get a free personalized reskilling roadmap.',
};

async function getOccupations() {
  const { SEED_OCCUPATIONS } = await import('../../../data/seed-data');
  return SEED_OCCUPATIONS;
}

const RISK_STYLE: Record<string, { text: string; bg: string }> = {
  'Very High': { text: '#DC2626', bg: 'rgba(220,38,38,0.09)' },
  'High':      { text: '#D97706', bg: 'rgba(217,119,6,0.08)'  },
  'Moderate':  { text: '#D97706', bg: 'rgba(217,119,6,0.08)'  },
  'Low':       { text: '#16A34A', bg: 'rgba(22,163,74,0.08)'  },
};

export default async function JobsPage() {
  const occupations = await getOccupations();

  return (
    <>
      <Header />
      <main className="max-w-[900px] mx-auto px-5 sm:px-8 py-12">
        <div className="mb-10">
          <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-fire block mb-3">
            Occupation Browser
          </span>
          <h1 className="text-[34px] sm:text-[40px] font-bold text-ink tracking-[-0.03em] leading-tight mb-3">
            AI Automation Risk by Job
          </h1>
          <p className="text-[16px] text-ink-2">
            {occupations.length} occupations analyzed. Click any role for a task-by-task breakdown and free personalized roadmap.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-12">
          {occupations.map((o: any) => {
            const rs = RISK_STYLE[o.risk_level ?? ''] ?? { text: '#6B7280', bg: 'rgba(107,114,128,0.08)' };
            const score = o.automation_probability ? Math.round(o.automation_probability * 100) : null;
            return (
              <Link
                key={o.slug}
                href={`/jobs/${o.slug}/`}
                className="flex items-center justify-between p-4 bg-surface border border-line rounded-xl hover:border-fire hover:bg-surface-2 transition-all duration-150 group"
              >
                <div className="min-w-0">
                  <div className="text-[14px] font-semibold text-ink group-hover:text-fire transition-colors truncate">
                    {o.title}
                  </div>
                  {o.median_annual_wage && (
                    <div className="text-[12px] text-ink-3 mt-0.5">
                      ${o.median_annual_wage.toLocaleString()} median salary
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-3 shrink-0 ml-4">
                  {score !== null && (
                    <span className="text-[22px] font-bold tabular-nums" style={{ color: rs.text }}>
                      {score}%
                    </span>
                  )}
                  {o.risk_level && (
                    <span
                      className="text-[10px] font-bold uppercase tracking-[0.08em] px-2 py-0.5 rounded-full"
                      style={{ color: rs.text, background: rs.bg }}
                    >
                      {o.risk_level}
                    </span>
                  )}
                </div>
              </Link>
            );
          })}
        </div>

        <div className="text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-4 bg-fire text-bg text-[15px] font-bold rounded-xl hover:brightness-105 transition-all"
          >
            Get your free personalized roadmap →
          </Link>
        </div>

        <div className="mt-16 pt-10 border-t border-line">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-ink-3 mb-6">
            Data sources &amp; methodology
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              {
                name: 'Oxford Martin School — Frey &amp; Osborne (2013)',
                detail: 'Automation probability scores are derived from the landmark study "The Future of Employment: How Susceptible Are Jobs to Computerisation?" — the most widely cited academic research on occupation-level automation risk.',
                href: 'https://www.oxfordmartin.ox.ac.uk/publications/the-future-of-employment/',
              },
              {
                name: 'U.S. Bureau of Labor Statistics (BLS)',
                detail: 'Median annual wages, employment counts, and 10-year job growth projections sourced from the BLS Occupational Employment and Wage Statistics (OEWS) program and Employment Projections.',
                href: 'https://www.bls.gov/oes/',
              },
              {
                name: 'O*NET — U.S. Dept. of Labor',
                detail: 'Task-level breakdowns and skill importance scores drawn from O*NET OnLine, the primary U.S. government database of occupational characteristics and worker requirements.',
                href: 'https://www.onetonline.org',
              },
              {
                name: 'McKinsey Global Institute',
                detail: 'Task automation methodology informed by MGI research on the automation potential of work activities across sectors, cross-referenced against current AI tool capabilities.',
                href: 'https://www.mckinsey.com/mgi',
              },
            ].map(s => (
              <div key={s.name} className="p-4 bg-surface border border-line rounded-xl">
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[13px] font-semibold text-ink hover:text-fire transition-colors leading-snug block mb-2"
                  dangerouslySetInnerHTML={{ __html: s.name }}
                />
                <p className="text-[12px] text-ink-3 leading-relaxed">{s.detail}</p>
              </div>
            ))}
          </div>
          <p className="text-[12px] text-ink-3 mt-5 leading-relaxed">
            Risk scores reflect the probability that the core tasks of an occupation can be automated using existing or near-term AI and robotics technology. They are not predictions of job loss — they indicate structural vulnerability. Individual outcomes depend on employer adoption rates, geography, and a worker&apos;s ability to adapt.
          </p>
        </div>
      </main>

    </>
  );
}
