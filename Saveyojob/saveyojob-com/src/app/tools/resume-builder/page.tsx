import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Header from '../../../components/layout/Header';
import ResumeBuilderClient from './ResumeBuilderClient';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://saveyojob.com';

export const metadata: Metadata = {
  title: 'Free Resume Builder — Build a Recruiter-Ready Resume in Minutes',
  description:
    'Build a professional resume with a live preview. Fill in your details, see the result instantly, then copy to Google Docs or download as PDF. No sign-up required.',
  alternates: { canonical: `${siteUrl}/tools/resume-builder/` },
  openGraph: {
    title: 'Free Resume Builder — Build a Recruiter-Ready Resume in Minutes',
    description: 'Live preview resume builder. Fill in contact, summary, experience, education, and skills — copy or export as PDF. No sign-up.',
    url: `${siteUrl}/tools/resume-builder/`,
    type: 'website',
  },
};

export default function ResumeBuilderPage() {
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
            Resume Builder
          </h1>
          <p className="text-[16px] text-ink-2 leading-relaxed max-w-[560px]">
            Fill in your details and watch your resume build in real time. Download as a Word doc or save as a PDF — no account needed.
          </p>
        </div>

        <ResumeBuilderClient />

        <div className="mt-20 pt-12 border-t border-line max-w-[740px]">
          <h2 className="text-[22px] sm:text-[26px] font-bold tracking-[-0.02em] text-ink mb-4">
            How to build a resume that clears ATS and gets callbacks
          </h2>
          <div className="space-y-4 text-[15px] text-ink-2 leading-relaxed">
            <p>
              The average recruiter spends 6–7 seconds on an initial resume scan. That is not enough time to read — it is enough time to notice whether the document is clean, whether the sections are where they expect them to be, and whether the candidate&apos;s recent job title matches what they are looking for. A resume that passes this scan is not necessarily a beautiful one; it is a well-structured one. Standard section order — Contact, Summary, Experience, Education, Skills — is not a creative constraint; it is the format recruiters process fastest because they have seen it ten thousand times.
            </p>
            <p>
              Format matters before content when it comes to ATS systems. A resume that uses tables, multi-column layouts, headers, footers, text boxes, or graphics will often parse as blank in applicant tracking systems — the software cannot read those elements, so your experience effectively disappears. The highest-performing resume format is a clean, single-column, plain-text-friendly document in .docx format. Content can be outstanding, but if the format is wrong, no human ever sees it. Get the structure right first; then optimise the language for the specific role.
            </p>
          </div>

          <h3 className="text-[17px] font-bold text-ink mt-10 mb-4">Tips for building a stronger resume</h3>
          <ul className="space-y-2.5 text-[14px] text-ink-2">
            <li className="flex gap-2.5"><span className="text-fire font-bold shrink-0">—</span>Use a single-column layout with no tables, text boxes, columns, or graphics — ATS systems either skip these elements entirely or parse them as garbled text, even when the content inside them is excellent.</li>
            <li className="flex gap-2.5"><span className="text-fire font-bold shrink-0">—</span>Keep your resume to one page if you have under 10 years of experience; two pages maximum for senior roles with genuinely relevant history to fill them. Cut older jobs and generic skills first, never recent achievements.</li>
            <li className="flex gap-2.5"><span className="text-fire font-bold shrink-0">—</span>Use a 10–11pt body font in a clean typeface (Calibri, Arial, or Georgia) — decorative or condensed fonts reduce readability and can cause parsing errors in some ATS platforms.</li>
            <li className="flex gap-2.5"><span className="text-fire font-bold shrink-0">—</span>Set margins to at least 0.75 inches on all sides — tighter margins make the document look desperate and harder to read when printed or viewed at scale.</li>
            <li className="flex gap-2.5"><span className="text-fire font-bold shrink-0">—</span>Tailor your resume for every role — at minimum, swap in the exact job title from the posting and adjust 2–3 key skills in your summary to match what the role emphasises. Untailored resumes are immediately obvious to experienced recruiters.</li>
            <li className="flex gap-2.5"><span className="text-fire font-bold shrink-0">—</span>Name your file properly — &ldquo;FirstName-LastName-RoleTitle.docx&rdquo; — not &ldquo;Resume-Final-v4.docx.&rdquo; Recruiters download dozens of files; yours needs to be identifiable immediately in a folder.</li>
            <li className="flex gap-2.5"><span className="text-fire font-bold shrink-0">—</span>Never include a photo, date of birth, marital status, or references — these introduce unconscious bias and take up space your achievements need. &ldquo;References available on request&rdquo; is also unnecessary; it is assumed.</li>
            <li className="flex gap-2.5"><span className="text-fire font-bold shrink-0">—</span>Ask someone else to proofread it — you stop seeing your own typos after the third read. One typo in a resume is not usually disqualifying; a pattern of them is. Have a second set of eyes check it before every application campaign.</li>
          </ul>

          <h3 className="text-[17px] font-bold text-ink mt-10 mb-6">Frequently asked questions</h3>
          <div className="space-y-6">
            <div>
              <p className="text-[14px] font-semibold text-ink mb-1.5">What format should my resume be in?</p>
              <p className="text-[14px] text-ink-2 leading-relaxed">Submit as .docx unless the posting specifically requests PDF. Most ATS systems parse .docx more reliably than PDF, especially if the PDF was exported from a design tool like Canva or InDesign. A clean, simple .docx with standard fonts will consistently outperform a visually designed PDF in terms of ATS compatibility.</p>
            </div>
            <div>
              <p className="text-[14px] font-semibold text-ink mb-1.5">How long should a resume be?</p>
              <p className="text-[14px] text-ink-2 leading-relaxed">One page for 0–10 years of experience. Two pages for senior professionals with 10+ years of directly relevant history. Three pages are very rarely justified — usually only for academic CVs or executive roles where a full publication or project record is expected. If you are cutting to fit one page, cut older jobs and generic skills first, not recent achievements and impact statements.</p>
            </div>
            <div>
              <p className="text-[14px] font-semibold text-ink mb-1.5">What sections should every resume include?</p>
              <p className="text-[14px] text-ink-2 leading-relaxed">Contact information, professional summary, work experience (most recent first), education, and a skills section. Optional but valuable: certifications, notable projects, or a publications section for research-adjacent roles. Never include a photo, personal pronouns, date of birth, or references — these can introduce bias and take up space your achievements need.</p>
            </div>
          </div>
        </div>

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: [
            { '@type': 'Question', name: 'What format should my resume be in?', acceptedAnswer: { '@type': 'Answer', text: 'Submit as .docx unless the posting requests PDF. Most ATS systems parse .docx more reliably, especially compared to PDFs exported from design tools. A clean simple .docx will consistently outperform a visually designed PDF in ATS compatibility.' } },
            { '@type': 'Question', name: 'How long should a resume be?', acceptedAnswer: { '@type': 'Answer', text: 'One page for 0–10 years of experience. Two pages for senior professionals with 10+ years of relevant history. Cut older jobs and generic skills first when reducing length, not recent achievements.' } },
            { '@type': 'Question', name: 'What sections should every resume include?', acceptedAnswer: { '@type': 'Answer', text: 'Contact information, professional summary, work experience (most recent first), education, and skills. Never include a photo, date of birth, or references — these introduce bias and waste valuable space.' } },
          ],
        }) }} />

      </main>
    </>
  );
}
