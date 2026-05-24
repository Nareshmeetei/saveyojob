import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Header from '../../../components/layout/Header';
import LinkedInHeadlineClient from './LinkedInHeadlineClient';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://saveyojob.com';

export const metadata: Metadata = {
  title: 'LinkedIn Headline Generator — 5 Keyword-Rich Headlines That Get Found',
  description:
    'Enter your job title and top skills to get 5 LinkedIn headline variations optimised for recruiter search. Free, no sign-up required.',
  alternates: { canonical: `${siteUrl}/tools/linkedin-headline/` },
  openGraph: {
    title: 'LinkedIn Headline Generator',
    description: 'Enter job title + skills → 5 keyword-rich LinkedIn headlines that get found by recruiters.',
    url: `${siteUrl}/tools/linkedin-headline/`,
    type: 'website',
  },
};

export default function LinkedInHeadlinePage() {
  return (
    <>
      <Header />
      <main className="max-w-[1100px] mx-auto px-5 sm:px-8 py-12 sm:py-16">

        <div className="mb-10">
          <Link href="/#tools" className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-ink-3 hover:text-ink transition-colors mb-3">
            <ArrowLeft size={13} strokeWidth={2} />
            Go Back
          </Link>
          <h1 className="text-[32px] sm:text-[40px] font-bold tracking-[-0.03em] text-ink leading-tight mb-3">
            LinkedIn Headline Generator
          </h1>
          <p className="text-[16px] text-ink-2 leading-relaxed max-w-[560px]">
            Enter your job title and the skills recruiters search for — get 5 headline variations across different styles so you can pick the one that fits you best.
          </p>
        </div>

        <LinkedInHeadlineClient />

        <div className="mt-20 pt-12 border-t border-line max-w-[740px]">
          <h2 className="text-[22px] sm:text-[26px] font-bold tracking-[-0.02em] text-ink mb-4">
            How to write a LinkedIn headline that gets found by recruiters
          </h2>
          <div className="space-y-4 text-[15px] text-ink-2 leading-relaxed">
            <p>
              Your LinkedIn headline is the single most visible piece of text on your profile — it appears next to your name in search results, connection requests, and comment sections. With 67% of recruiters now sourcing candidates directly through LinkedIn, optimised profiles with strong headlines appear up to 27 times more often in recruiter searches than those left on default. The default is your current job title, which most people never change — that is a significant missed opportunity.
            </p>
            <p>
              LinkedIn&apos;s search algorithm gives significant weight to the headline when ranking profiles. A headline that only says &ldquo;Marketing Manager at Acme Corp&rdquo; is searchable only by people who already know your company. A headline like &ldquo;Marketing Manager | Brand Strategy | Growth Marketing | B2B SaaS&rdquo; is searchable by any recruiter looking for those skills. The 220-character limit means every word needs to earn its place — include your role, two to three key specialisations, and the terms that appear most in job descriptions for the roles you want.
            </p>
          </div>

          <h3 className="text-[17px] font-bold text-ink mt-10 mb-4">Tips for a stronger LinkedIn headline</h3>
          <ul className="space-y-2.5 text-[14px] text-ink-2">
            <li className="flex gap-2.5"><span className="text-fire font-bold shrink-0">—</span>Include your current role plus 2–3 key skills or specialisations that appear most in job descriptions for roles you want.</li>
            <li className="flex gap-2.5"><span className="text-fire font-bold shrink-0">—</span>Use the exact terms recruiters search for — not internal company jargon, invented titles like &ldquo;Growth Ninja,&rdquo; or abbreviations that are not universally understood.</li>
            <li className="flex gap-2.5"><span className="text-fire font-bold shrink-0">—</span>Use pipe characters ( | ) to separate your role from your skills — they create visual breathing room and make the headline scannable at a glance.</li>
            <li className="flex gap-2.5"><span className="text-fire font-bold shrink-0">—</span>If you are career changing, use your target job title in your headline rather than your current one — LinkedIn ranks you for what your headline says, not your job history.</li>
            <li className="flex gap-2.5"><span className="text-fire font-bold shrink-0">—</span>Name specific tools or platforms by name — &ldquo;Salesforce&rdquo; outperforms &ldquo;CRM&rdquo; because recruiters filter by tool name, not category.</li>
            <li className="flex gap-2.5"><span className="text-fire font-bold shrink-0">—</span>Update your headline before you start applying — recruiters check it before opening your resume, and a stale headline signals you are not actively maintaining your profile.</li>
            <li className="flex gap-2.5"><span className="text-fire font-bold shrink-0">—</span>Track your profile views weekly after changing your headline — this is the fastest feedback loop for whether a new version is performing better.</li>
            <li className="flex gap-2.5"><span className="text-fire font-bold shrink-0">—</span>If you are actively job hunting, add &ldquo;Open to [Role] Opportunities&rdquo; at the end — combined with LinkedIn&apos;s &ldquo;Open to Work&rdquo; setting, it doubles your recruiter signal.</li>
          </ul>

          <h3 className="text-[17px] font-bold text-ink mt-10 mb-6">Frequently asked questions</h3>
          <div className="space-y-6">
            <div>
              <p className="text-[14px] font-semibold text-ink mb-1.5">Does your LinkedIn headline affect recruiter searches?</p>
              <p className="text-[14px] text-ink-2 leading-relaxed">Yes — LinkedIn&apos;s search algorithm weights your headline heavily. Including the relevant keywords for your target role in your headline directly increases how often you appear in recruiter searches. It is the highest-impact single change you can make to your profile.</p>
            </div>
            <div>
              <p className="text-[14px] font-semibold text-ink mb-1.5">How many keywords should be in a LinkedIn headline?</p>
              <p className="text-[14px] text-ink-2 leading-relaxed">Aim for 3–5 keyword or skill terms woven into a readable headline. A pure list of skills separated by pipes looks unprofessional and is less effective in practice than a natural, scannable phrase that still contains the right terms.</p>
            </div>
            <div>
              <p className="text-[14px] font-semibold text-ink mb-1.5">Should your LinkedIn headline match your job title exactly?</p>
              <p className="text-[14px] text-ink-2 leading-relaxed">It should start with your role, but it should not stop there. Your job title alone is the least searchable version of your headline. Adding the specific skills, tools, or specialisations you want to be found for significantly expands your search visibility without any loss of clarity.</p>
            </div>
          </div>
        </div>

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: [
            { '@type': 'Question', name: 'Does your LinkedIn headline affect recruiter searches?', acceptedAnswer: { '@type': 'Answer', text: "Yes — LinkedIn's search algorithm weights the headline heavily. Including keywords for your target role directly increases how often you appear in recruiter searches." } },
            { '@type': 'Question', name: 'How many keywords should be in a LinkedIn headline?', acceptedAnswer: { '@type': 'Answer', text: 'Aim for 3–5 keyword terms woven into a readable headline. A pure list separated by pipes looks unprofessional and is less effective than a natural phrase containing the right terms.' } },
            { '@type': 'Question', name: 'Should your LinkedIn headline match your job title exactly?', acceptedAnswer: { '@type': 'Answer', text: 'It should start with your role, but not stop there. Adding specific skills and specialisations significantly expands your search visibility.' } },
          ],
        }) }} />

      </main>
    </>
  );
}
