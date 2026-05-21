import type { Metadata } from 'next';
import Header from '../../../components/layout/Header';
import ResignationLetterClient from './ResignationLetterClient';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://saveyojob.com';

export const metadata: Metadata = {
  title: 'Free Resignation Letter Generator — Professional & Polished in 60 Seconds',
  description:
    'Generate a professional resignation letter in seconds. Enter your details and get a clean, respectful letter ready to send — no sign-up required.',
  alternates: { canonical: `${siteUrl}/tools/resignation-letter/` },
  openGraph: {
    title: 'Free Resignation Letter Generator',
    description: 'Generate a professional resignation letter in seconds. No sign-up required.',
    url: `${siteUrl}/tools/resignation-letter/`,
    type: 'website',
  },
};

export default function ResignationLetterPage() {
  return (
    <>
      <Header />
      <main className="max-w-[1100px] mx-auto px-5 sm:px-8 py-12 sm:py-16">

        {/* Page header */}
        <div className="mb-10">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-fire mb-3">Free Tool</p>
          <h1 className="text-[32px] sm:text-[40px] font-bold tracking-[-0.03em] text-ink leading-tight mb-3">
            Resignation Letter Generator
          </h1>
          <p className="text-[16px] text-ink-2 leading-relaxed max-w-[560px]">
            Fill in your details and get a professional, respectful resignation letter ready to copy and send — no account needed.
          </p>
        </div>

        <ResignationLetterClient />

      </main>
    </>
  );
}
