import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Header from '../../../components/layout/Header';
import Badge from '../../../components/ui/Badge';
import GeneratorWizard from '../../../components/generator/GeneratorWizard';

interface Props { params: Promise<{ slug: string }>; }

async function getOccupation(slug: string) {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    const { SEED_OCCUPATIONS } = await import('../../../../data/seed-data');
    return SEED_OCCUPATIONS.find(o => o.slug === slug) ?? null;
  }
  const { getOccupation } = await import('../../../../lib/occupations');
  return getOccupation(slug);
}

export async function generateStaticParams() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    const { SEED_OCCUPATIONS } = await import('../../../../data/seed-data');
    return SEED_OCCUPATIONS.map(o => ({ slug: o.slug }));
  }
  const { getAllOccupationSlugs } = await import('../../../../lib/occupations');
  const slugs = await getAllOccupationSlugs();
  return slugs.map(slug => ({ slug }));
}

export const revalidate = 86400;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const occ = await getOccupation(slug);
  if (!occ) return {};
  const score = occ.automation_probability
    ? Math.round(occ.automation_probability * 100)
    : null;
  return {
    title: `Will AI Replace ${occ.title}s? ${new Date().getFullYear()} Risk Score + Free Plan`,
    description: `${occ.title}s face ${score ?? '?'}% automation risk. See task-by-task breakdown and get a free personalized reskilling roadmap in 60 seconds.`,
    openGraph: {
      images: [`/api/og?job=${encodeURIComponent(occ.title)}&score=${score}&level=${occ.risk_level}`],
    },
  };
}

function riskColor(level: string | null) {
  switch (level) {
    case 'Very High': return 'text-blood';
    case 'High':      return 'text-rust';
    case 'Moderate':  return 'text-amber-400';
    case 'Low':       return 'text-acid';
    default:          return 'text-paper-2';
  }
}

export default async function OccupationPage({ params }: Props) {
  const { slug } = await params;
  const occ = await getOccupation(slug);
  if (!occ) notFound();

  const score = occ.automation_probability
    ? Math.round(occ.automation_probability * 100)
    : null;

  const faqs = [
    {
      q: `Will AI replace ${occ.title}s?`,
      a: `${occ.title}s face ${occ.risk_level ?? 'significant'} automation risk${score ? ` (${score}% probability)` : ''} based on Oxford University research. The role will transform significantly, but ${occ.title}s who adapt will remain valuable.`,
    },
    {
      q: `What AI tools are automating ${occ.title} tasks?`,
      a: `AI tools are increasingly automating routine ${occ.title} tasks including document processing, data analysis, and reporting. Tools like ChatGPT, specialized AI platforms, and automation software are driving this change.`,
    },
    {
      q: `How can ${occ.title}s protect their career from AI?`,
      a: `The key is to build skills that AI can't replicate: strategic thinking, complex judgment, client relationships, and the ability to manage and interpret AI tools. Our free roadmap generator creates a personalized plan.`,
    },
  ];

  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
          <div className="mb-2">
            <Link href="/jobs/" className="text-[12px] text-paper-3 hover:text-paper-2 transition-colors">
              ← All occupations
            </Link>
          </div>
          <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-acid mb-3">
            AI Risk Assessment
          </div>
          <h1 className="text-[40px] sm:text-[52px] font-bold text-paper tracking-tight leading-tight mb-4">
            Will AI Replace<br />{occ.title}s?
          </h1>

          {/* Stats bar */}
          <div className="grid grid-cols-3 border border-wire rounded-xl overflow-hidden mb-8">
            {[
              {
                label: 'Automation Risk',
                value: score ? `${score}%` : '—',
                color: score ? riskColor(occ.risk_level) : 'text-paper',
              },
              {
                label: 'Median Salary',
                value: occ.median_annual_wage
                  ? `$${Math.round(occ.median_annual_wage / 1000)}K`
                  : '—',
                color: 'text-paper',
              },
              {
                label: '10-Year Growth',
                value: occ.ten_year_growth_pct != null
                  ? `${occ.ten_year_growth_pct > 0 ? '+' : ''}${occ.ten_year_growth_pct}%`
                  : '—',
                color: (occ.ten_year_growth_pct ?? 0) >= 0 ? 'text-acid' : 'text-blood',
              },
            ].map((s, i) => (
              <div key={s.label} className={`bg-ink-1 py-5 px-4 text-center ${i > 0 ? 'border-l border-wire' : ''}`}>
                <div className={`text-[28px] font-bold tabular-nums ${s.color}`}>{s.value}</div>
                <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-paper-3 mt-1">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Risk badge */}
          {occ.risk_level && (
            <Badge label={`${occ.risk_level} Automation Risk`} risk={occ.risk_level} className="mb-4" />
          )}

          {/* Task breakdown */}
          {occ.tasks?.length > 0 && (
            <div className="mt-10">
              <div className="flex items-center gap-3 mb-5">
                <span className="text-[11px] font-bold uppercase tracking-[0.13em] text-paper-3">Task breakdown</span>
                <div className="flex-1 h-[1px] bg-wire" />
              </div>
              <div className="space-y-4">
                {occ.tasks.map((t: any, i: number) => {
                  const riskMap: Record<string, number> = {
                    'Very High': 90, 'High': 70, 'Moderate': 45, 'Low': 20, 'Minimal': 5,
                  };
                  const pct = riskMap[t.automation_risk] ?? 50;
                  const barColor = pct > 70 ? 'bg-blood' : pct > 40 ? 'bg-rust' : 'bg-acid';
                  const textCol  = pct > 70 ? 'text-blood' : pct > 40 ? 'text-rust' : 'text-acid';
                  return (
                    <div key={i}>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[14px] font-medium text-paper">{t.name}</span>
                        <span className={`text-[12px] font-bold uppercase tracking-[0.08em] ${textCol}`}>
                          {t.automation_risk}
                        </span>
                      </div>
                      <div className="h-[3px] bg-wire rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${barColor}`} style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </section>

        {/* Embedded generator */}
        <section className="border-t border-wire bg-ink-1">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
            <div className="text-center mb-8">
              <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-acid mb-2">
                Free assessment
              </div>
              <h2 className="text-[28px] font-bold text-paper tracking-tight mb-2">
                Get your personalized roadmap
              </h2>
              <p className="text-[15px] text-paper-2">
                Pre-filled for {occ.title}. Answer 3 more questions.
              </p>
            </div>
            <GeneratorWizard prefilledJob={occ.title} />
          </div>
        </section>

        {/* FAQ */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-[11px] font-bold uppercase tracking-[0.13em] text-paper-3">FAQ</span>
            <div className="flex-1 h-[1px] bg-wire" />
          </div>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'FAQPage',
                mainEntity: faqs.map(f => ({
                  '@type': 'Question',
                  name: f.q,
                  acceptedAnswer: { '@type': 'Answer', text: f.a },
                })),
              }),
            }}
          />
          <div className="space-y-6">
            {faqs.map((f, i) => (
              <div key={i}>
                <h3 className="text-[16px] font-semibold text-paper mb-2">{f.q}</h3>
                <p className="text-[14px] text-paper-2 leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
