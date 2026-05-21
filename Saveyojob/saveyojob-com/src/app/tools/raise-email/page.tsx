import type { Metadata } from 'next';
import Header from '../../../components/layout/Header';
import RaiseEmailClient from './RaiseEmailClient';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://saveyojob.com';

export const metadata: Metadata = {
  title: 'Free Raise Request Email Builder — Make Your Case in 60 Seconds',
  description:
    'Build a manager-ready salary raise request email. Enter your accomplishments and target salary, and get a professional email ready to send — no sign-up required.',
  alternates: { canonical: `${siteUrl}/tools/raise-email/` },
  openGraph: {
    title: 'Free Raise Request Email Builder',
    description: 'Enter your wins and target salary — get a professional raise request email in seconds.',
    url: `${siteUrl}/tools/raise-email/`,
    type: 'website',
  },
};

export default function RaiseEmailPage() {
  return (
    <>
      <Header />
      <main className="max-w-[1100px] mx-auto px-5 sm:px-8 py-12 sm:py-16">

        <div className="mb-10">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-fire mb-3">Free Tool</p>
          <h1 className="text-[32px] sm:text-[40px] font-bold tracking-[-0.03em] text-ink leading-tight mb-3">
            Raise Request Email Builder
          </h1>
          <p className="text-[16px] text-ink-2 leading-relaxed max-w-[560px]">
            List your accomplishments and target salary — get a professional, evidence-led email that makes a compelling case to your manager.
          </p>
        </div>

        <RaiseEmailClient />

      </main>
    </>
  );
}
