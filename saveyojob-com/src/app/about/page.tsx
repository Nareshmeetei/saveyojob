import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '../../components/layout/Header';

export const metadata: Metadata = {
  title: 'About — SaveYoJob.com',
  description:
    'Why we built SaveYoJob.com — a free, no-signup tool that tells you exactly how at risk your job is and what to do about it.',
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
        <div className="mb-10">
          <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-acid mb-3">
            About
          </div>
          <h1 className="text-[36px] font-bold text-paper tracking-tight leading-tight">
            Why we built this
          </h1>
        </div>

        <div className="space-y-6 text-[15px] text-paper-2 leading-[1.75]">
          <p>
            The conversation about AI and jobs is full of either panic or dismissal. Neither is useful
            if you actually need to figure out what to do with your career.
          </p>
          <p>
            We built SaveYoJob.com to give people something actionable: a real assessment of how
            automation affects their specific role, and a concrete learning roadmap tailored to their
            situation — their schedule, their goals, their current skills.
          </p>
          <p>
            No signup. No email. No upsell. The tool is free because the problem is urgent and
            everyone deserves a fair shot at getting ahead of it.
          </p>

          <div className="border-t border-wire my-8" />

          <h2 className="text-[20px] font-bold text-paper">What the tool does</h2>
          <ul className="space-y-3 pl-0">
            {[
              'Scores your job\'s automation risk based on task-level analysis',
              'Shows exactly which of your tasks are safe vs. most exposed',
              'Estimates the salary impact over 5 years if you don\'t reskill',
              'Recommends specific skills and courses matched to your situation',
              'Gives you a week-by-week learning plan that fits your schedule',
              'Suggests alternative career paths if the risk is severe',
            ].map(item => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-[5px] shrink-0 w-[6px] h-[6px] rounded-full bg-acid" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="border-t border-wire my-8" />

          <p className="text-[14px] text-paper-3">
            Built with Next.js, TypeScript, and Tailwind CSS.
            Assessment powered by Claude (Anthropic).
          </p>
        </div>

        <div className="mt-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-4 bg-acid text-ink text-[15px] font-bold rounded-xl hover:brightness-105 transition-all"
          >
            Check your job's risk score →
          </Link>
        </div>
      </main>
    </>
  );
}
