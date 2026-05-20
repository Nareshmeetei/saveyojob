import type { Metadata } from 'next';
import { Outfit } from 'next/font/google';
import './globals.css';

const outfit = Outfit({
  variable: '--font-outfit',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://saveyojob.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Saveyojob.com — Your AI survival guide for the future of work',
    template: '%s | Saveyojob.com',
  },
  description:
    'Find out exactly which tasks in your job are being automated. Get a free, personalized reskilling roadmap — built to your role, goal, and schedule. No signup needed.',
  openGraph: {
    type: 'website',
    siteName: 'Saveyojob.com',
    url: siteUrl,
    images: [{ url: `${siteUrl}/og-default.png`, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
  return (
    <html lang="en" className={`${outfit.variable} h-full`}>
      <head>
        {plausibleDomain && (
          <script
            defer
            data-domain={plausibleDomain}
            src="https://plausible.io/js/script.js"
          />
        )}
      </head>
      <body className="min-h-full flex flex-col bg-ink text-paper antialiased">
        {children}
      </body>
    </html>
  );
}
