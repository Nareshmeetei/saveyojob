import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Header from '../../../components/layout/Header';
import JDDecoderClient from './JDDecoderClient';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://saveyojob.com';

export const metadata: Metadata = {
  title: 'Free Job Description Decoder — What They Really Want + Red Flags',
  description:
    'Paste any job posting and get a plain-English breakdown: what the corporate language really means, red flags to watch out for, and the exact phrases to mirror in your resume. No sign-up required.',
  alternates: { canonical: `${siteUrl}/tools/jd-decoder/` },
  openGraph: {
    title: 'Free Job Description Decoder — What They Really Want + Red Flags',
    description: 'Decode any job posting — plain-English breakdown, red flags identified, exact phrases to mirror in your application.',
    url: `${siteUrl}/tools/jd-decoder/`,
    type: 'website',
  },
};

export default function JDDecoderPage() {
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
            Job Description Decoder
          </h1>
          <p className="text-[16px] text-ink-2 leading-relaxed max-w-[560px]">
            Paste any job posting and get a plain-English breakdown of what they actually want, red flags worth knowing about, and the exact phrases to mirror in your resume and cover letter.
          </p>
        </div>

        <JDDecoderClient />

        <div className="mt-20 pt-12 border-t border-line max-w-[740px]">
          <h2 className="text-[22px] sm:text-[26px] font-bold tracking-[-0.02em] text-ink mb-4">
            How to read a job description — what the corporate language actually means
          </h2>
          <div className="space-y-4 text-[15px] text-ink-2 leading-relaxed">
            <p>
              Job postings are written by committee — legal reviews, HR templates, and manager wish lists all collide into a single document. The result is often a wall of corporate language that obscures what the role actually involves and what the company genuinely needs. Research from LinkedIn found that women apply to jobs when they meet 100% of the requirements, while men apply when they meet around 60%. The practical reality: most &ldquo;required&rdquo; qualifications are aspirational — companies rarely find candidates who check every box.
            </p>
            <p>
              Phrases like &ldquo;fast-paced environment&rdquo; often signal poor planning or understaffing. &ldquo;Wear many hats&rdquo; typically means you will be doing jobs that should be split across two or three people. &ldquo;Competitive salary&rdquo; without a number is worth probing early. Understanding how to decode these signals helps you decide where to invest your time — and what questions to ask when you get to interview. Phrases that appear multiple times in a posting are almost always the ones to mirror verbatim in your resume and cover letter.
            </p>
          </div>

          <h3 className="text-[17px] font-bold text-ink mt-10 mb-4">Tips for analysing any job posting</h3>
          <ul className="space-y-2.5 text-[14px] text-ink-2">
            <li className="flex gap-2.5"><span className="text-fire font-bold shrink-0">—</span>Apply if you meet 70% or more of the required skills — job descriptions are wish lists assembled by committee. Employers routinely hire candidates who do not tick every box if their overall fit is strong.</li>
            <li className="flex gap-2.5"><span className="text-fire font-bold shrink-0">—</span>Read &ldquo;required&rdquo; and &ldquo;preferred&rdquo; sections very differently — required skills are genuine blockers, preferred skills are bonuses. Missing a preferred skill matters far less than missing a required one.</li>
            <li className="flex gap-2.5"><span className="text-fire font-bold shrink-0">—</span>Look for repeated phrases throughout the posting — any skill or term that appears more than once is a signal of what the hiring manager actually wrote versus what HR templated in. Mirror those exact phrases in your resume and cover letter.</li>
            <li className="flex gap-2.5"><span className="text-fire font-bold shrink-0">—</span>Check Glassdoor reviews for the company alongside the job posting — reviews often decode the language. &ldquo;Fast-paced environment&rdquo; confirmed by 15 reviews mentioning overwork is a different signal than one mentioned nowhere in reviews.</li>
            <li className="flex gap-2.5"><span className="text-fire font-bold shrink-0">—</span>Search LinkedIn for people who previously held this exact role at the company — see how long they stayed, what they moved on to, and whether they were promoted internally. This is often more revealing than the job description itself.</li>
            <li className="flex gap-2.5"><span className="text-fire font-bold shrink-0">—</span>Note how long the role has been posted — a position open for 60+ days with no changes suggests either very high bar, internal conflict about what they want, or difficulty retaining the role. All worth probing at interview.</li>
            <li className="flex gap-2.5"><span className="text-fire font-bold shrink-0">—</span>Very long lists of responsibilities (12+ bullet points across multiple distinct areas) often indicate a role that replaced 2–3 people, or one with high turnover. Worth asking &ldquo;what does a typical week look like?&rdquo; in the interview to test the reality.</li>
            <li className="flex gap-2.5"><span className="text-fire font-bold shrink-0">—</span>Save a copy of the job posting locally before you apply — postings are routinely taken down once a hiring decision is made, and you will need the original text when preparing for interviews weeks later.</li>
          </ul>

          <h3 className="text-[17px] font-bold text-ink mt-10 mb-6">Frequently asked questions</h3>
          <div className="space-y-6">
            <div>
              <p className="text-[14px] font-semibold text-ink mb-1.5">Should I apply if I don&apos;t meet all the job requirements?</p>
              <p className="text-[14px] text-ink-2 leading-relaxed">Yes — if you meet 70% or more of the required skills. Job descriptions are wish lists. Employers routinely hire candidates who do not tick every box if their overall profile is strong and they show genuine enthusiasm for the role.</p>
            </div>
            <div>
              <p className="text-[14px] font-semibold text-ink mb-1.5">What are the biggest red flags in a job description?</p>
              <p className="text-[14px] text-ink-2 leading-relaxed">&ldquo;Unlimited growth potential&rdquo; (no defined career path), &ldquo;self-starter who thrives in ambiguity&rdquo; (poor management or structure), salary listed as &ldquo;competitive&rdquo; without a number, and very long lists of responsibilities that span multiple roles. Research shows vague language like these correlates with 40% higher turnover rates.</p>
            </div>
            <div>
              <p className="text-[14px] font-semibold text-ink mb-1.5">How do you identify the most important keywords in a job posting?</p>
              <p className="text-[14px] text-ink-2 leading-relaxed">Look for repeated phrases, words that appear in the first paragraph, and any skills listed under &ldquo;requirements&rdquo; rather than &ldquo;nice to have.&rdquo; These are the exact terms to use verbatim in your resume, cover letter, and LinkedIn profile.</p>
            </div>
          </div>
        </div>

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: [
            { '@type': 'Question', name: "Should I apply if I don't meet all the job requirements?", acceptedAnswer: { '@type': 'Answer', text: 'Yes — if you meet 70% or more of the required skills. Job descriptions are wish lists. Employers routinely hire candidates who do not tick every box if their overall profile is strong.' } },
            { '@type': 'Question', name: 'What are the biggest red flags in a job description?', acceptedAnswer: { '@type': 'Answer', text: '"Unlimited growth potential" (no defined career path), "self-starter who thrives in ambiguity" (poor management), salary listed as "competitive" without a number, and very long responsibility lists.' } },
            { '@type': 'Question', name: 'How do you identify the most important keywords in a job posting?', acceptedAnswer: { '@type': 'Answer', text: 'Look for repeated phrases, words in the first paragraph, and skills listed under "requirements" rather than "nice to have." Use these verbatim in your resume and cover letter.' } },
          ],
        }) }} />

      </main>
    </>
  );
}
