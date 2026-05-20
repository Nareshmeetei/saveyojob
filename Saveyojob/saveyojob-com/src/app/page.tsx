import type { Metadata } from 'next';
import Header from '../components/layout/Header';
import HeroSection from '../components/hero/HeroSection';
import ToolsDirectory from '../components/tools/ToolsDirectory';
import NewsletterCTA from '../components/newsletter/NewsletterCTA';

export const metadata: Metadata = {
  title: 'Saveyojob.com — AI Career Risk Tool & Course Directory',
  description:
    'Find out if AI will replace your job. Upload your resume for a personal risk score, then get matched to the best AI reskilling courses. Free, no signup.',
  openGraph: {
    title: 'Is Your Job Safe From AI? Find Out in 60 Seconds.',
    description:
      'Upload your resume, get your personal AI risk score, and access a curated directory of reskilling courses. Free.',
  },
};

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <ToolsDirectory />
        <NewsletterCTA />
      </main>

      <footer className="border-t border-line bg-surface py-8 px-5 sm:px-8">
        <div className="max-w-[900px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-[12px] text-ink-3">
          <span className="flex items-center gap-2">
            <img src="/saveyojob_logo02.svg" alt="Saveyojob" style={{ height: 29, width: 'auto' }} />
            <span>· Free · No signup required</span>
          </span>
          <div className="flex items-center gap-5">
            <a href="/jobs" className="hover:text-ink transition-colors">Browse Jobs</a>
            <a href="/about" className="hover:text-ink transition-colors">About</a>
            <a href="/privacy" className="hover:text-ink transition-colors">Privacy</a>
            <span className="hidden sm:inline">Data from McKinsey, Oxford, BLS</span>
          </div>
        </div>
      </footer>
    </>
  );
}
