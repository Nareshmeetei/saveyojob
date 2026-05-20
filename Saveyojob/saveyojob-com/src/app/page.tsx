import type { Metadata } from 'next';
import Header from '../components/layout/Header';
import HeroSection from '../components/hero/HeroSection';
import ToolsDirectory from '../components/tools/ToolsDirectory';

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
      </main>
    </>
  );
}
