import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Header from '../../../components/layout/Header';
import CoverLetterClient from './CoverLetterClient';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://saveyojob.com';

export const metadata: Metadata = {
  title: 'Free Cover Letter Generator — Specific, Non-Generic Letters in 30 Seconds',
  description:
    'Paste a job description and your top 3 strengths to get a cover letter that references the role specifically — not a generic template. Free, no sign-up required.',
  alternates: { canonical: `${siteUrl}/tools/cover-letter/` },
  openGraph: {
    title: 'Free Cover Letter Generator',
    description: 'Paste job description + 3 strengths → a specific, non-generic cover letter in 30 seconds.',
    url: `${siteUrl}/tools/cover-letter/`,
    type: 'website',
  },
};

export default function CoverLetterPage() {
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
            Cover Letter Generator
          </h1>
          <p className="text-[16px] text-ink-2 leading-relaxed max-w-[560px]">
            Paste the job description and your top strengths — get a letter that opens with a hook, ties your experience to what the role actually needs, and lands in 200 words.
          </p>
        </div>

        <CoverLetterClient />

        <div className="mt-20 pt-12 border-t border-line max-w-[740px]">
          <h2 className="text-[22px] sm:text-[26px] font-bold tracking-[-0.02em] text-ink mb-4">
            How to write a cover letter that actually gets read in 2024
          </h2>
          <div className="space-y-4 text-[15px] text-ink-2 leading-relaxed">
            <p>
              83% of recruiters say they are more likely to hire candidates who have tailored their application to the specific job — yet only 37% of job seekers actually customise their cover letters. A tailored cover letter increases interview callbacks by up to 53% compared to a generic one. The standard &ldquo;I am writing to apply for the position of...&rdquo; opening is the fastest way to ensure yours is skipped. Hiring managers have read thousands of these; what gets attention is specificity, brevity, and an immediate demonstration that you understand what the company needs.
            </p>
            <p>
              The most effective cover letter structure is three paragraphs. The first opens with a hook — something specific about why this company or this problem draws you in. The second connects your most relevant achievement directly to a requirement in the job description. The third closes confidently with a call to action. Keep it under 300 words; hiring managers rarely read more. Where the resume lists achievements, the cover letter explains motivation and fit — think of the resume as the evidence and the cover letter as the argument.
            </p>
          </div>

          <h3 className="text-[17px] font-bold text-ink mt-10 mb-4">Tips for a stronger cover letter</h3>
          <ul className="space-y-2.5 text-[14px] text-ink-2">
            <li className="flex gap-2.5"><span className="text-fire font-bold shrink-0">—</span>Never start with &ldquo;I am writing to apply&rdquo; — open with something specific about the company, a problem they face, or a result you have delivered in a similar context.</li>
            <li className="flex gap-2.5"><span className="text-fire font-bold shrink-0">—</span>Research the company&apos;s recent news (product launches, funding rounds, acquisitions) in the 30 days before you apply — a timely reference in your opening paragraph signals genuine interest, not a template.</li>
            <li className="flex gap-2.5"><span className="text-fire font-bold shrink-0">—</span>Address the letter to a named person, not &ldquo;Dear Hiring Manager&rdquo; — check LinkedIn for the recruiter or the hiring manager for the department before you write.</li>
            <li className="flex gap-2.5"><span className="text-fire font-bold shrink-0">—</span>Mirror 3–4 key phrases from the job description verbatim — this signals alignment to both the ATS and the human reader, and it shows you read the posting carefully.</li>
            <li className="flex gap-2.5"><span className="text-fire font-bold shrink-0">—</span>Include one specific, quantified achievement that maps directly to a core requirement in the job description — one real number is worth three paragraphs of claimed skills.</li>
            <li className="flex gap-2.5"><span className="text-fire font-bold shrink-0">—</span>Match the tone to the company culture — a startup cover letter can be direct and informal; a law firm expects formality. Research the tone from their website and job posting before writing.</li>
            <li className="flex gap-2.5"><span className="text-fire font-bold shrink-0">—</span>Do not repeat your resume — the cover letter should explain the motivation and fit behind your achievements, not summarise them. Interviewers have both documents in front of them simultaneously.</li>
            <li className="flex gap-2.5"><span className="text-fire font-bold shrink-0">—</span>End with a clear, confident call to action — &ldquo;I would welcome the chance to discuss how I can bring this to [Company].&rdquo; Never end with apologies or excessive thanks.</li>
          </ul>

          <h3 className="text-[17px] font-bold text-ink mt-10 mb-6">Frequently asked questions</h3>
          <div className="space-y-6">
            <div>
              <p className="text-[14px] font-semibold text-ink mb-1.5">Do employers actually read cover letters?</p>
              <p className="text-[14px] text-ink-2 leading-relaxed">Some do, some do not — it varies by company and role. For positions that require strong writing skills (marketing, communications, consulting) they are often read carefully. For most technical roles, less so. The safest approach: write a good, tailored one for every application, since you cannot know which pile you are in.</p>
            </div>
            <div>
              <p className="text-[14px] font-semibold text-ink mb-1.5">How long should a cover letter be?</p>
              <p className="text-[14px] text-ink-2 leading-relaxed">One page maximum, ideally 250 to 300 words. Three short paragraphs is the ideal structure. Longer cover letters are rarely read in full; shorter ones can feel insufficiently considered. The goal is to say exactly enough — not more, not less.</p>
            </div>
            <div>
              <p className="text-[14px] font-semibold text-ink mb-1.5">Should a cover letter repeat what is on the resume?</p>
              <p className="text-[14px] text-ink-2 leading-relaxed">No — it should complement it. Where the resume presents achievements as data points, the cover letter explains the motivation and fit behind them. Sending a cover letter that just summarises the resume is a missed opportunity to make an additional case for yourself.</p>
            </div>
          </div>
        </div>

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: [
            { '@type': 'Question', name: 'Do employers actually read cover letters?', acceptedAnswer: { '@type': 'Answer', text: 'Some do, some do not — it varies by role. For positions requiring strong writing skills they are often read carefully. Write a tailored one for every application since you cannot know which approach the hiring manager takes.' } },
            { '@type': 'Question', name: 'How long should a cover letter be?', acceptedAnswer: { '@type': 'Answer', text: 'One page maximum, ideally 250 to 300 words. Three short paragraphs is the ideal structure. Longer letters are rarely read in full.' } },
            { '@type': 'Question', name: 'Should a cover letter repeat what is on the resume?', acceptedAnswer: { '@type': 'Answer', text: 'No — the cover letter should explain the motivation and fit behind your achievements, not summarise the resume. Think of the resume as evidence and the cover letter as the argument.' } },
          ],
        }) }} />

      </main>
    </>
  );
}
