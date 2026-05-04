import type { Metadata } from 'next';
import Header from '../components/layout/Header';
import GeneratorWizard from '../components/generator/GeneratorWizard';

export const metadata: Metadata = {
  title: 'Saveyojob.com — Find out if AI will replace your job. Get skilled before it does.',
  description:
    'Find out which tasks in your job are being automated. Get a free, deeply personalized reskilling roadmap — built to your role, goal, and schedule. No signup. 60 seconds.',
  openGraph: {
    title: 'Saveyojob.com — Your AI survival guide for the future of work',
    description: 'Free AI career risk assessment + personalized reskilling roadmap. No signup needed.',
  },
};

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <GeneratorWizard />
      </main>
    </>
  );
}
