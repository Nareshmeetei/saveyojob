import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { LinkIcon } from 'lucide-react';

interface Props { params: Promise<{ id: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  return {
    title: 'Shared AI Career Roadmap — Saveyojob.com',
    description: `View a personalized AI career risk roadmap. Generate your own free at Saveyojob.com.`,
    openGraph: {
      images: [`/api/og?shareId=${id}`],
    },
  };
}

async function getSharedRoadmap(id: string) {
  try {
    // Fetch from the save-roadmap in-memory store via API
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/save-roadmap?id=${id}`, { cache: 'no-store' });
    if (!res.ok) return null;
    const json = await res.json();
    return json.roadmapData ?? null;
  } catch {
    return null;
  }
}

export default async function SharedRoadmapPage({ params }: Props) {
  const { id } = await params;

  return (
    <Suspense fallback={
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <div className="text-[14px] text-ink-3">Loading roadmap…</div>
      </div>
    }>
      <SharedRoadmapContent id={id} />
    </Suspense>
  );
}

async function SharedRoadmapContent({ id }: { id: string }) {
  const data = await getSharedRoadmap(id);

  if (!data) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center px-5">
        <div className="text-center max-w-sm">
          <div className="w-14 h-14 rounded-2xl bg-surface border border-line flex items-center justify-center mb-4 mx-auto">
            <LinkIcon size={24} strokeWidth={1.5} className="text-ink-3" />
          </div>
          <h1 className="text-[22px] font-bold text-ink mb-3">Shared link expired</h1>
          <p className="text-[14px] text-ink-2 leading-relaxed mb-6">
            This roadmap link is no longer available. Generate your own free personalized roadmap in 60 seconds.
          </p>
          <Link
            href="/"
            className="inline-block px-6 py-3.5 bg-fire text-bg font-bold text-[14px] rounded-xl hover:brightness-105 transition-all duration-150"
          >
            Get my free roadmap →
          </Link>
        </div>
      </div>
    );
  }

  // If we have data, redirect to the main roadmap page isn't ideal for SEO,
  // so we render a minimal preview and CTA to generate their own
  return (
    <div className="min-h-screen bg-bg">
      <header className="sticky top-0 z-50 h-[52px] flex items-center justify-between px-5 sm:px-8 bg-surface/95 backdrop-blur-xl border-b border-line">
        <Link href="/">
          <img src="/saveyojob_logo02.svg" alt="Saveyojob" style={{ height: 32, width: 'auto' }} />
        </Link>
        <Link href="/" className="text-[13px] font-semibold text-fire hover:brightness-90 transition-colors">
          Get your own →
        </Link>
      </header>

      <main className="max-w-[600px] mx-auto px-5 sm:px-8 py-16 text-center">
        <div className="p-8 bg-surface border border-line rounded-xl mb-8">
          <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-ink-3 mb-4">
            Shared roadmap
          </div>
          <div
            className="text-[72px] font-extrabold tabular-nums leading-none mb-2"
            style={{ color: (data.riskScore ?? 0) >= 70 ? '#C45347' : (data.riskScore ?? 0) >= 40 ? '#D4783C' : '#097BA0' }}
          >
            {data.riskScore ?? '—'}
          </div>
          <div className="text-[14px] text-ink-3 mb-4">Automation risk score / 100</div>
          <p className="text-[14px] text-ink-2 leading-relaxed">{data.riskSummary}</p>
        </div>

        <h2 className="text-[22px] font-bold text-ink mb-3">Generate your own personalized roadmap</h2>
        <p className="text-[14px] text-ink-2 mb-6 leading-relaxed">
          Free, takes 60 seconds. Get a task-by-task breakdown, skills to build, a 12-week plan, and curated course recommendations.
        </p>
        <Link
          href="/"
          className="inline-block px-8 py-4 bg-fire text-bg font-bold text-[15px] rounded-xl hover:brightness-105 transition-all duration-150"
        >
          Check my AI risk score — free →
        </Link>
      </main>
    </div>
  );
}
