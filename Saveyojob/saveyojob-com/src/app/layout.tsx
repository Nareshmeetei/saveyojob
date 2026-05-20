import type { Metadata } from 'next';
import { Work_Sans } from 'next/font/google';
import Footer from '../components/layout/Footer';
import './globals.css';

const workSans = Work_Sans({
  variable: '--font-work-sans',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://saveyojob.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Saveyojob.com — AI Career Risk Tool & Course Directory',
    template: '%s | Saveyojob.com',
  },
  description:
    'Find out if AI will replace your job. Upload your resume for a personal risk score, then get matched to the best AI reskilling courses. Free, no signup.',
  keywords: [
    'AI course directory',
    'career risk tool',
    'AI job replacement',
    'reskilling courses',
    'future of work',
    'AI automation risk',
  ],
  openGraph: {
    type: 'website',
    siteName: 'Saveyojob.com',
    url: siteUrl,
    title: 'Is Your Job Safe From AI? Find Out in 60 Seconds.',
    description:
      'Upload your resume, get your personal AI risk score, and access a curated directory of reskilling courses. Free.',
    images: [{ url: `${siteUrl}/og-default.png`, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Is Your Job Safe From AI?',
    description: 'Free AI career risk assessment + personalized reskilling courses.',
  },
  robots: { index: true, follow: true },
  verification: {
    google: 'DOISWswQG9sCTPeak60oFGHnCm-eHqWYtvQiF1nrvKo',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
  return (
    <html lang="en" className={`${workSans.variable} h-full`}>
      <head>
        {plausibleDomain && (
          <script
            defer
            data-domain={plausibleDomain}
            src="https://plausible.io/js/script.js"
          />
        )}
      </head>
      <body className="min-h-full flex flex-col bg-bg text-ink antialiased">
        {children}
        <Footer />
      </body>
    </html>
  );
}
