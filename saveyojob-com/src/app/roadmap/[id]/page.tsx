import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Header from '../../../components/layout/Header';
import RoadmapReport from '../../../components/roadmap/RoadmapReport';

interface Props { params: Promise<{ id: string }>; }

async function getRoadmap(shareId: string) {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return null;
  try {
    const { createServerClient } = await import('../../../../lib/supabase');
    const supabase = await createServerClient();
    const { data } = await supabase
      .from('roadmaps')
      .select('*')
      .eq('share_id', shareId)
      .single();

    if (data) {
      await supabase
        .from('roadmaps')
        .update({ view_count: (data.view_count ?? 0) + 1 })
        .eq('share_id', shareId);
    }
    return data;
  } catch { return null; }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const roadmap = await getRoadmap(id);
  if (!roadmap) return {};
  const score = roadmap.roadmap_data?.riskScore ?? '?';
  return {
    title: `${roadmap.job_title ?? 'Career'} AI Risk Roadmap — Saveyojob.com`,
    description: `${roadmap.job_title} — ${score}% automation risk. See the full personalized reskilling roadmap.`,
    openGraph: {
      images: [`/api/og?job=${encodeURIComponent(roadmap.job_title ?? '')}&score=${score}`],
    },
  };
}

export default async function SharedRoadmapPage({ params }: Props) {
  const { id } = await params;
  const roadmap = await getRoadmap(id);
  if (!roadmap) notFound();

  return (
    <>
      <Header />
      <main>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-6 pb-2">
          <div className="flex items-center justify-between">
            <span className="text-[12px] text-paper-3">Shared roadmap — read-only</span>
            <Link
              href="/"
              className="text-[13px] font-semibold text-acid hover:brightness-110 transition-all"
            >
              Generate yours free →
            </Link>
          </div>
        </div>

        <RoadmapReport
          data={roadmap.roadmap_data}
          jobTitle={roadmap.job_title ?? 'Unknown'}
          goal={roadmap.goal ?? ''}
          timeCommitment={roadmap.time_commitment ?? ''}
          experienceLevel={''}
          shareId={roadmap.share_id}
          onReset={() => {}}
        />

        {/* Bottom CTA */}
        <div className="border-t border-wire bg-ink-1">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 text-center">
            <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-acid mb-3">
              Free forever
            </div>
            <h2 className="text-[28px] font-bold text-paper tracking-tight mb-3">
              Get your own personalized roadmap
            </h2>
            <p className="text-[15px] text-paper-2 mb-6">
              Takes 60 seconds. No signup. Built specifically for your role and goals.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-8 py-4 bg-acid text-ink text-[16px] font-bold rounded-xl hover:brightness-105 transition-all"
            >
              Start my free assessment →
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
