import type { Metadata } from 'next';
import Header from '../../../components/layout/Header';
import ResumeBulletRewriterClient from './ResumeBulletRewriterClient';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://saveyojob.com';

export const metadata: Metadata = {
  title: 'Resume Bullet Rewriter — Turn Weak Bullets Into Impact Statements',
  description:
    'Paste weak resume bullets and get quantified, impact-first rewrites using the XYZ formula. Free AI tool — no sign-up required.',
  alternates: { canonical: `${siteUrl}/tools/resume-bullet-rewriter/` },
  openGraph: {
    title: 'Resume Bullet Rewriter',
    description: 'Turn weak resume bullets into impact-first, quantified statements using the XYZ formula.',
    url: `${siteUrl}/tools/resume-bullet-rewriter/`,
    type: 'website',
  },
};

export default function ResumeBulletRewriterPage() {
  return (
    <>
      <Header />
      <main className="max-w-[1100px] mx-auto px-5 sm:px-8 py-12 sm:py-16">

        <div className="mb-10">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-fire mb-3">Free Tool</p>
          <h1 className="text-[32px] sm:text-[40px] font-bold tracking-[-0.03em] text-ink leading-tight mb-3">
            Resume Bullet Rewriter
          </h1>
          <p className="text-[16px] text-ink-2 leading-relaxed max-w-[560px]">
            Paste weak bullets and get impact-first rewrites using the XYZ formula — every rewrite leads with a strong verb and a quantified result.
          </p>
        </div>

        <ResumeBulletRewriterClient />

      </main>
    </>
  );
}
