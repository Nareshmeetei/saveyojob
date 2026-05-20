import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '../../components/layout/Header';

export const metadata: Metadata = {
  title: 'Privacy Policy — Saveyojob.com',
  description: 'How Saveyojob.com handles your data. Short version: we collect very little and never sell it.',
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-8">
      <h2 className="text-[18px] font-bold text-ink mb-3">{title}</h2>
      <div className="text-[15px] text-ink-2 leading-relaxed space-y-3">{children}</div>
    </section>
  );
}

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="max-w-[680px] mx-auto px-5 sm:px-8 py-16">

        <div className="mb-12">
          <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-fire block mb-3">
            Privacy Policy
          </span>
          <h1 className="text-[32px] sm:text-[38px] font-bold tracking-[-0.03em] text-ink leading-tight mb-3">
            We keep it simple.
          </h1>
          <p className="text-[15px] text-ink-3">Last updated: May 2026</p>
        </div>

        <div className="p-5 bg-surface border border-line rounded-xl mb-10">
          <p className="text-[14px] text-ink-2 leading-relaxed">
            <strong className="text-ink">Short version:</strong> We collect minimal data, never sell it,
            and you can request deletion anytime. The tool works without an account. If you share your
            email for the newsletter, that&apos;s all we store.
          </p>
        </div>

        <Section title="What we collect">
          <p>
            <strong className="text-ink">Without signing up:</strong> Nothing identifiable. We use Plausible Analytics
            for privacy-first analytics (no cookies, no tracking across sites). We collect only aggregated,
            anonymous usage data like page views and country.
          </p>
          <p>
            <strong className="text-ink">If you subscribe to the newsletter:</strong> Your email address only.
            We store it to send the weekly AI Job Market Digest. No name, no phone, no profile.
          </p>
          <p>
            <strong className="text-ink">Resume uploads:</strong> If you upload a resume, it is processed
            in memory only to estimate your risk score. It is never stored, indexed, or used to train models.
          </p>
        </Section>

        <Section title="What we never do">
          <ul className="list-disc pl-5 space-y-1.5">
            <li>Sell or rent your data to third parties</li>
            <li>Use your data for advertising targeting</li>
            <li>Store resume content or personally identifiable information without consent</li>
            <li>Share email addresses with affiliates or course platforms</li>
          </ul>
        </Section>

        <Section title="Cookies">
          <p>
            We don&apos;t use cookies for tracking. Plausible Analytics is cookieless. If you
            subscribe to the newsletter, a session preference may be stored in localStorage to avoid
            showing the signup prompt again.
          </p>
        </Section>

        <Section title="Course affiliate links">
          <p>
            When you click a course link, you&apos;re taken to Coursera, LinkedIn Learning, or another
            platform through an affiliate link. We may earn a commission if you enroll. Those platforms
            have their own privacy policies. We do not receive any personal information about you from
            them beyond aggregate click data.
          </p>
        </Section>

        <Section title="Data retention">
          <p>
            Email addresses are retained until you unsubscribe. Every email includes a one-click
            unsubscribe link. To request deletion, email{' '}
            <a href="mailto:privacy@saveyojob.com" className="text-fire hover:underline">
              privacy@saveyojob.com
            </a>.
          </p>
        </Section>

        <Section title="Contact">
          <p>
            Questions about privacy? Email{' '}
            <a href="mailto:privacy@saveyojob.com" className="text-fire hover:underline">
              privacy@saveyojob.com
            </a>. We&apos;ll respond within 48 hours.
          </p>
        </Section>

        <div className="border-t border-line pt-8 mt-4">
          <Link href="/" className="text-[13px] text-ink-3 hover:text-ink transition-colors">
            ← Back to Saveyojob.com
          </Link>
        </div>
      </main>

    </>
  );
}
