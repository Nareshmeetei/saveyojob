import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Header from '../../../components/layout/Header';
import ATSCheckerClient from './ATSCheckerClient';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://saveyojob.com';

export const metadata: Metadata = {
  title: 'Free ATS Resume Checker — Instant Score, Missing Keywords & Fixes',
  description:
    'Paste your resume and job description to get an instant ATS compatibility score, see which keywords are missing, and get exact fixes to increase your chances of getting through.',
  alternates: { canonical: `${siteUrl}/tools/ats-checker/` },
  openGraph: {
    title: 'Free ATS Resume Checker',
    description: 'Instant ATS score, missing keywords, and exact fixes — no sign-up required.',
    url: `${siteUrl}/tools/ats-checker/`,
    type: 'website',
  },
};

export default function ATSCheckerPage() {
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
            ATS Resume Checker
          </h1>
          <p className="text-[16px] text-ink-2 leading-relaxed max-w-[560px]">
            Upload or paste your resume alongside a job description — get an instant ATS compatibility score, the exact keywords you are missing, and three copy-paste fixes to close the gap.
          </p>
        </div>

        <ATSCheckerClient />

        <div className="mt-20 pt-12 border-t border-line max-w-[740px]">
          <h2 className="text-[22px] sm:text-[26px] font-bold tracking-[-0.02em] text-ink mb-4">
            How to get your resume past ATS systems — and in front of a real person
          </h2>
          <div className="space-y-4 text-[15px] text-ink-2 leading-relaxed">
            <p>
              99.7% of recruiters at companies that use applicant tracking systems use filters to find qualified candidates — meaning if your resume does not contain the right keywords, it will not appear in their search results, regardless of your qualifications. Estimates suggest 70–75% of resumes submitted to large employers are rejected by ATS before a human ever reads them. This is not a reflection of your ability; it is a formatting and keyword matching problem with a straightforward fix.
            </p>
            <p>
              ATS systems scan for exact keyword matches from the job description, assess document structure, and rank candidates by relevance score. A resume with images, tables, multi-column layouts, or text in headers and footers often scores near zero even if the content is excellent — many ATS platforms simply cannot parse those elements. The highest-performing ATS-friendly resumes use standard section headings (Work Experience, Education, Skills), a single-column layout, and mirror the precise terminology used in the job description they are targeting.
            </p>
          </div>

          <h3 className="text-[17px] font-bold text-ink mt-10 mb-4">Tips for a more ATS-friendly resume</h3>
          <ul className="space-y-2.5 text-[14px] text-ink-2">
            <li className="flex gap-2.5"><span className="text-fire font-bold shrink-0">—</span>Use standard section headings exactly as ATS systems expect them: &ldquo;Work Experience,&rdquo; &ldquo;Education,&rdquo; &ldquo;Skills&rdquo; — not &ldquo;My Journey,&rdquo; &ldquo;Where I&apos;ve Been,&rdquo; or anything else creative.</li>
            <li className="flex gap-2.5"><span className="text-fire font-bold shrink-0">—</span>Mirror the exact phrasing from each job description — if the posting says &ldquo;project management&rdquo; and your resume says &ldquo;project oversight,&rdquo; many ATS systems will not count it as a match.</li>
            <li className="flex gap-2.5"><span className="text-fire font-bold shrink-0">—</span>Include the exact job title from the posting in your resume summary — it is the first field most ATS systems parse when creating a candidate record, and matching it increases your rank immediately.</li>
            <li className="flex gap-2.5"><span className="text-fire font-bold shrink-0">—</span>Spell out acronyms the first time they appear — write &ldquo;Search Engine Optimisation (SEO)&rdquo; rather than just &ldquo;SEO,&rdquo; since different ATS systems may be looking for either form.</li>
            <li className="flex gap-2.5"><span className="text-fire font-bold shrink-0">—</span>Never put key information in headers, footers, text boxes, or tables — most ATS platforms either skip these entirely or parse the text as garbled nonsense.</li>
            <li className="flex gap-2.5"><span className="text-fire font-bold shrink-0">—</span>Submit as .docx unless the posting specifically requests PDF — .docx parses more reliably across the major ATS platforms, especially compared to PDFs exported from Canva or InDesign.</li>
            <li className="flex gap-2.5"><span className="text-fire font-bold shrink-0">—</span>Name your file with your full name and the role — &ldquo;Sarah-Chen-Marketing-Manager.docx&rdquo; — not &ldquo;Resume-Final-v3.docx.&rdquo; Recruiters often download dozens of files; yours should be identifiable immediately.</li>
            <li className="flex gap-2.5"><span className="text-fire font-bold shrink-0">—</span>Use consistent date formats throughout — &ldquo;Jan 2022 – Mar 2024&rdquo; or &ldquo;01/2022 – 03/2024&rdquo; — never mix both in the same document. Inconsistent formatting can confuse ATS date-parsing.</li>
          </ul>

          <h3 className="text-[17px] font-bold text-ink mt-10 mb-6">Frequently asked questions</h3>
          <div className="space-y-6">
            <div>
              <p className="text-[14px] font-semibold text-ink mb-1.5">What percentage of resumes are rejected by ATS before human review?</p>
              <p className="text-[14px] text-ink-2 leading-relaxed">Estimates range from 70–75% for large employers using automated screening. For high-volume roles with 500 or more applications, the percentage is typically higher. The rejection is almost always due to keyword gaps or formatting issues, not lack of qualifications.</p>
            </div>
            <div>
              <p className="text-[14px] font-semibold text-ink mb-1.5">What makes a resume ATS-friendly?</p>
              <p className="text-[14px] text-ink-2 leading-relaxed">Simple single-column formatting with no tables, images, or text boxes; standard section headings; job titles that match the role you are applying for; and keywords mirrored directly from the job description. The simpler and cleaner the formatting, the better it parses.</p>
            </div>
            <div>
              <p className="text-[14px] font-semibold text-ink mb-1.5">Does keyword stuffing help your ATS score?</p>
              <p className="text-[14px] text-ink-2 leading-relaxed">No — and it actively hurts. Modern ATS platforms flag unnatural keyword density, and the recruiters who review shortlists immediately recognise stuffed resumes. The goal is to naturally use the same language the job description uses, not to repeat the same phrase ten times.</p>
            </div>
          </div>
        </div>

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: [
            { '@type': 'Question', name: 'What percentage of resumes are rejected by ATS before human review?', acceptedAnswer: { '@type': 'Answer', text: 'Estimates range from 70–75% for large employers. The rejection is almost always due to keyword gaps or formatting issues, not lack of qualifications.' } },
            { '@type': 'Question', name: 'What makes a resume ATS-friendly?', acceptedAnswer: { '@type': 'Answer', text: 'Simple single-column formatting with no tables, images, or text boxes; standard section headings; and keywords mirrored directly from the job description.' } },
            { '@type': 'Question', name: 'Does keyword stuffing help your ATS score?', acceptedAnswer: { '@type': 'Answer', text: 'No — modern ATS platforms flag unnatural keyword density, and recruiters who review shortlists immediately recognise stuffed resumes. Use the job description language naturally.' } },
          ],
        }) }} />

      </main>
    </>
  );
}
