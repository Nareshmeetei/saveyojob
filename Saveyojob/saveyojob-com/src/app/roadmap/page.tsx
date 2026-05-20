import { Suspense } from 'react';
import RoadmapClient from './RoadmapClient';

export const metadata = {
  title: 'Your AI Career Roadmap — Saveyojob.com',
  description: 'Your personalized 6-month plan to stay employable as AI reshapes your industry.',
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
