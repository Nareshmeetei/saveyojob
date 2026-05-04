import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '../../components/layout/Header';

export const metadata: Metadata = {
  title: 'AI Automation Risk by Occupation — Browse All Jobs',
  description:
    'Browse AI automation risk scores for 800+ occupations. See which tasks are being automated and get a free personalized reskilling roadmap.',
};

async function getOccupations() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    const { SEED_OCCUPATIONS } = await import('../../../data/seed-data');
    return SEED_OCCUPATIONS;
  }
  try {
    const { createServerClient } = await import('../../../lib/supabase');
    const supabase = await createServerClient();
    const { data } = await supabase
      .from('occupations')
      .select('slug,title,automation_probability,risk_level,median_annual_wage')
      .order('automation_probability', { ascending: false });
    return data ?? [];
  } catch { return []; }
}

function riskStyle(level: string | null) {
  switch (level) {
    case 'Very High': return 'text-blood bg-blood/10';
    case 'High':      return 'text-rust bg-rust/10';
    case 'Moderate':  return 'text-amber-400 bg-amber-400/10';
    case 'Low':       return 'text-acid bg-acid/10';
    default:          return 'text-paper-2 bg-wire';
  }
}

export default async function JobsPage() {
  const occupations = await getOccupations();

  return (
    <>
      <Header />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <div className="mb-10">
          <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-acid mb-3">
            Occupation Browser
          </div>
          <h1 className="text-[36px] font-bold text-paper tracking-tight leading-tight mb-3">
            AI Automation Risk by Job
          </h1>
          <p className="text-[16px] text-paper-2">
            {occupations.length} occupations analyzed. Click any role for a full breakdown — or start your free personalized assessment.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {occupations.map((o: any) => (
            <Link
              key={o.slug}
              href={`/jobs/${o.slug}/`}
              className="flex items-center justify-between p-4 bg-ink-1 border border-wire rounded-xl hover:border-wire-2 hover:bg-ink-2 transition-all duration-150 group"
            >
              <div>
                <div className="text-[14px] font-semibold text-paper group-hover:text-paper transition-colors">
                  {o.title}
                </div>
                {o.median_annual_wage && (
                  <div className="text-[12px] text-paper-3 mt-0.5">
                    ${o.median_annual_wage.toLocaleString()} median
                  </div>
                )}
              </div>
              <div className="flex items-center gap-3">
                {o.automation_probability && (
                  <span className="text-[20px] font-bold tabular-nums text-paper">
                    {Math.round(o.automation_probability * 100)}%
                  </span>
                )}
                {o.risk_level && (
                  <span className={`text-[10px] font-bold uppercase tracking-[0.08em] px-2 py-0.5 rounded ${riskStyle(o.risk_level)}`}>
                    {o.risk_level}
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-4 bg-acid text-ink text-[15px] font-bold rounded-xl hover:brightness-105 transition-all"
          >
            Get your free personalized roadmap →
          </Link>
        </div>
      </main>
    </>
  );
}
