import type { Metadata } from 'next';
import Header from '../../../components/layout/Header';
import TMAYClient from './TMAYClient';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://saveyojob.com';

export const metadata: Metadata = {
  title: 'Free "Tell Me About Yourself" Builder — Perfect Your 60-Second Pitch',
  description:
    'Answer 7 quick questions and get a perfectly structured "Tell me about yourself" pitch for any job interview — no sign-up required.',
  alternates: { canonical: `${siteUrl}/tools/tmay/` },
  openGraph: {
    title: 'Free "Tell Me About Yourself" Builder',
    description: 'Answer 7 questions — get a structured, compelling 60-second interview pitch. No sign-up required.',
    url: `${siteUrl}/tools/tmay/`,
    type: 'website',
  },
};

export default function TMAYPage() {
  return (
    <>
      <Header />
      <main className="max-w-[1100px] mx-auto px-5 sm:px-8 py-12 sm:py-16">

        <div className="mb-10">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-fire mb-3">Free Tool</p>
          <h1 className="text-[32px] sm:text-[40px] font-bold tracking-[-0.03em] text-ink leading-tight mb-3">
            &ldquo;Tell Me About Yourself&rdquo; Builder
          </h1>
          <p className="text-[16px] text-ink-2 leading-relaxed max-w-[560px]">
            Answer 7 quick questions and get a structured 60-second pitch that opens interviews strong — personalised to your background and the role.
          </p>
        </div>

        <TMAYClient />

      </main>
    </>
  );
}
