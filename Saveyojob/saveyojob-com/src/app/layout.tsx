import type { Metadata } from 'next';
import { Work_Sans, JetBrains_Mono } from 'next/font/google';
import Footer from '../components/layout/Footer';
import './globals.css';

const workSans = Work_Sans({
  variable: '--font-work-sans',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains-mono',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://saveyojob.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Saveyojob.com — Free AI Job Risk Assessment & Reskilling Roadmap',
    template: '%s | Saveyojob.com',
  },
  description:
    'Find out if AI will replace your job. Get a free, task-level automation risk score and a personalized reskilling roadmap — built to your role, timeline, and goals. No signup.',
  keywords: [
    'will AI replace my job',
    'AI job automation risk',
    'AI career risk assessment',
    'reskilling roadmap',
    'job automation probability',
    'future of work AI',
    'AI job displacement',
  ],
  openGraph: {
    type: 'website',
    siteName: 'Saveyojob.com',
    url: siteUrl,
    title: "The Job Market Is Changing Fast. Don't Get Left Behind.",
    description:
      'See how AI could impact your role and learn the skills professionals are using to stay employable and grow faster.',
    images: [{ url: `${siteUrl}/og-image.png`, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "The Job Market Is Changing Fast. Don't Get Left Behind.",
    description: 'See how AI could impact your role and learn the skills professionals are using to stay employable and grow faster.',
  },
  robots: { index: true, follow: true },
  alternates: { canonical: siteUrl },
  verification: {
    google: 'DOISWswQG9sCTPeak60oFGHnCm-eHqWYtvQiF1nrvKo',
  },
};

const ORGANIZATION_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${siteUrl}/#organization`,
  name: 'Saveyojob.com',
  url: siteUrl,
  logo: {
    '@type': 'ImageObject',
    url: `${siteUrl}/saveyojob_logo02.svg`,
  },
  description:
    'Free AI career risk tool that scores any job\'s automation probability, breaks down task-level AI exposure, and generates a personalized reskilling roadmap — no signup required.',
  knowsAbout: [
    'AI job automation',
    'career reskilling',
    'future of work',
    'machine learning job displacement',
    'occupational automation risk',
  ],
  sameAs: [
    'https://twitter.com/saveyojob',
  ],
};

const WEBSITE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${siteUrl}/#website`,
  url: siteUrl,
  name: 'Saveyojob.com',
  description: 'Free AI job risk assessment and personalized reskilling roadmap generator.',
  publisher: { '@id': `${siteUrl}/#organization` },
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${siteUrl}/jobs-at-risk/?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
  return (
    <html lang="en" className={`${workSans.variable} ${jetbrainsMono.variable} h-full`}>
      <head>
        {plausibleDomain && (
          <script
            defer
            data-domain={plausibleDomain}
            src="https://plausible.io/js/script.js"
          />
        )}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION_SCHEMA) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(WEBSITE_SCHEMA) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-bg text-ink antialiased">
        {children}
        <Footer />
      </body>
    </html>
  );
}
