import { Suspense } from 'react';
import RoadmapClient from './RoadmapClient';

export const metadata = {
  title: { absolute: 'Weekly AI Job Market Digest | AI Career Trends & Future-Proof Skills' },
  description: 'Get weekly insights on AI job trends, high-income skills, career changes, and practical AI tools to stay employable and competitive.',
};

export default function RoadmapPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <div className="text-[14px] text-ink-3">Building your roadmap…</div>
      </div>
    }>
      <RoadmapClient />
    </Suspense>
  );
}
