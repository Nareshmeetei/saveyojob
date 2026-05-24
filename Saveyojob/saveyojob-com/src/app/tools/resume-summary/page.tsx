import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Header from '../../../components/layout/Header';
import ResumeSummaryClient from './ResumeSummaryClient';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://saveyojob.com';

export const metadata: Metadata = {
  title: 'Resume Summary Generator — 3-Sentence Professional Summary in Seconds',
  description:
    'Enter your job history and target role to get a recruiter-ready 3-sentence professional summary. Free AI tool — no sign-up required.',
  alternates: { canonical: `${siteUrl}/tools/resume-summary/` },
  openGraph: {
    title: 'Resume Summary Generator',
    description: 'Enter your job history and target role → a 3-sentence professional summary that opens doors.',
    url: `${siteUrl}/tools/resume-summary/`,
    type: 'website',
  },
};

export default function ResumeSummaryPage() {
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
            Resume Summary Generator
          </h1>
          <p className="text-[16px] text-ink-2 leading-relaxed max-w-[560px]">
            Enter your job history and target role — get a 3-sentence professional summary that leads with your identity, highlights your strongest skills, and tells recruiters exactly what you're after.
          </p>
        </div>

        <ResumeSummaryClient />

        <div className="mt-20 pt-12 border-t border-line max-w-[740px]">
          <h2 className="text-[22px] sm:text-[26px] font-bold tracking-[-0.02em] text-ink mb-4">
            How to write a professional resume summary that gets interviews
          </h2>
          <div className="space-y-4 text-[15px] text-ink-2 leading-relaxed">
            <p>
              Recruiters spend an average of 6–7 seconds scanning a resume before deciding whether to read further. The professional summary at the top is the first and most-read section — it is the headline of your application. Yet most summaries are written as dense, jargon-filled paragraphs full of vague phrases like &ldquo;results-driven professional with a passion for excellence.&rdquo; These do not say anything specific, and they do not prompt a recruiter to keep reading. The best summaries are 2–3 sentences that immediately name your role, anchor your experience with a number, and signal exactly what kind of position you are targeting.
            </p>
            <p>
              The resume summary is also one of the most ATS-critical sections of the document. Because it appears at the top, applicant tracking systems parse it first when building a candidate profile. Including the job title you are targeting (mirrored from the job posting) plus 2–3 of the role&apos;s key required skills in your summary significantly increases your ATS match score compared to omitting them. Think of the summary as a 3-sentence pitch that speaks simultaneously to the algorithm and the human who picks up your resume after it clears the filter.
            </p>
          </div>

          <h3 className="text-[17px] font-bold text-ink mt-10 mb-4">Tips for a stronger resume summary</h3>
          <ul className="space-y-2.5 text-[14px] text-ink-2">
            <li className="flex gap-2.5"><span className="text-fire font-bold shrink-0">—</span>Open with your professional identity: job title + years of relevant experience + one defining specialisation — all in sentence one. This establishes immediately what you are and what you are best at.</li>
            <li className="flex gap-2.5"><span className="text-fire font-bold shrink-0">—</span>Include at least one quantified result in the second sentence — it proves the claim you made in sentence one and gives a recruiter something specific to mention when forwarding your resume to the hiring manager.</li>
            <li className="flex gap-2.5"><span className="text-fire font-bold shrink-0">—</span>Mirror the exact job title from the posting you are targeting — ATS systems match your summary against the role title during parsing, and an exact match increases your ranking in candidate results.</li>
            <li className="flex gap-2.5"><span className="text-fire font-bold shrink-0">—</span>Write without first-person pronouns — &ldquo;Experienced product manager with 8 years...&rdquo; not &ldquo;I am an experienced product manager&rdquo; — the convention on resumes is implied third person, and &ldquo;I&rdquo; looks informal.</li>
            <li className="flex gap-2.5"><span className="text-fire font-bold shrink-0">—</span>Cut every cliché — &ldquo;results-driven,&rdquo; &ldquo;team player,&rdquo; &ldquo;passionate,&rdquo; &ldquo;self-starter&rdquo; add no information. Replace every one with a specific skill, tool, or quantified outcome.</li>
            <li className="flex gap-2.5"><span className="text-fire font-bold shrink-0">—</span>Rewrite your summary for each major job family you are targeting — a summary written for a &ldquo;Marketing Manager&rdquo; role and one written for a &ldquo;Head of Growth&rdquo; role should emphasise different strengths, even if your experience is identical.</li>
            <li className="flex gap-2.5"><span className="text-fire font-bold shrink-0">—</span>Keep it to 2–3 sentences maximum — a summary longer than 5 lines rarely gets read in full during a 6-second resume scan. If you find yourself going longer, the extra content almost certainly belongs in your work experience section instead.</li>
          </ul>

          <h3 className="text-[17px] font-bold text-ink mt-10 mb-6">Frequently asked questions</h3>
          <div className="space-y-6">
            <div>
              <p className="text-[14px] font-semibold text-ink mb-1.5">What should a professional resume summary include?</p>
              <p className="text-[14px] text-ink-2 leading-relaxed">Your job title, years of relevant experience, your strongest specialisation or skill, one quantified achievement, and the type of role you are targeting. Every element should be specific — nothing generic. The summary should read like a 3-sentence argument for why you are the right candidate for this particular role.</p>
            </div>
            <div>
              <p className="text-[14px] font-semibold text-ink mb-1.5">Should a resume have a summary or an objective?</p>
              <p className="text-[14px] text-ink-2 leading-relaxed">A summary for almost every case. A resume objective (&ldquo;Seeking a challenging role where I can grow...&rdquo;) focuses on what you want, not what you offer — hiring managers are not interested in your goals; they want to know what problem you solve for them. A summary leads with your value and is far more effective, especially for candidates with any prior experience at all.</p>
            </div>
            <div>
              <p className="text-[14px] font-semibold text-ink mb-1.5">How long should a resume summary be?</p>
              <p className="text-[14px] text-ink-2 leading-relaxed">Two to three sentences — no more than five lines when formatted on a page. A summary is a hook, not a biography. If you find yourself writing more than three sentences, you are likely including information that belongs in your work experience bullets instead. Brevity signals confidence; length signals uncertainty about what to lead with.</p>
            </div>
          </div>
        </div>

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: [
            { '@type': 'Question', name: 'What should a professional resume summary include?', acceptedAnswer: { '@type': 'Answer', text: 'Your job title, years of experience, strongest specialisation, one quantified achievement, and the type of role you are targeting. Every element should be specific — nothing generic.' } },
            { '@type': 'Question', name: 'Should a resume have a summary or an objective?', acceptedAnswer: { '@type': 'Answer', text: 'A summary in almost every case. A resume objective focuses on what you want; a summary leads with what you offer. Hiring managers want to know what problem you solve for them, not your personal goals.' } },
            { '@type': 'Question', name: 'How long should a resume summary be?', acceptedAnswer: { '@type': 'Answer', text: 'Two to three sentences — no more than five lines when formatted. A summary is a hook, not a biography. Information beyond three sentences usually belongs in your work experience bullets instead.' } },
          ],
        }) }} />

      </main>
    </>
  );
}
