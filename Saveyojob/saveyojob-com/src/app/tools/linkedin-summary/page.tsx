import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Header from '../../../components/layout/Header';
import LinkedInSummaryClient from './LinkedInSummaryClient';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://saveyojob.com';

export const metadata: Metadata = {
  title: 'LinkedIn Summary Generator — Recruiter-Optimised About Section in Seconds',
  description:
    'Answer 4 questions about your role, skills, and goals to get a LinkedIn About section that hooks recruiters and shows up in search. Free, no sign-up required.',
  alternates: { canonical: `${siteUrl}/tools/linkedin-summary/` },
  openGraph: {
    title: 'LinkedIn Summary Generator',
    description: 'Answer 4 questions → a recruiter-optimised About section that shows up in search.',
    url: `${siteUrl}/tools/linkedin-summary/`,
    type: 'website',
  },
};

export default function LinkedInSummaryPage() {
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
            LinkedIn Summary Generator
          </h1>
          <p className="text-[16px] text-ink-2 leading-relaxed max-w-[560px]">
            Answer 4 questions about your role, skills, and goals — get an About section that opens with a hook, weaves in keywords recruiters search for, and ends with a clear call to action.
          </p>
        </div>

        <LinkedInSummaryClient />

        <div className="mt-20 pt-12 border-t border-line max-w-[740px]">
          <h2 className="text-[22px] sm:text-[26px] font-bold tracking-[-0.02em] text-ink mb-4">
            How to write a LinkedIn About section that gets you found by recruiters
          </h2>
          <div className="space-y-4 text-[15px] text-ink-2 leading-relaxed">
            <p>
              LinkedIn profiles with a completed About section receive 40% more inbound opportunities than those without one — yet the majority of profiles either leave it blank or fill it with a generic paragraph copied from their resume. The About section is your only chance on LinkedIn to speak directly to the reader in your own voice, explain what you actually do, and signal the kind of opportunity you are looking for. It is read by recruiters, hiring managers, potential partners, and clients — and it is indexed by LinkedIn&apos;s search algorithm, which means the words you choose directly affect how often you appear in search results.
            </p>
            <p>
              The single most important thing to know about the LinkedIn About section is that only the first 220–300 characters show before the &ldquo;see more&rdquo; fold. That opening sentence must hook the reader immediately — a strong professional identity statement, an interesting problem you solve, or a specific accomplishment that earns a click. The full summary should be 300–500 words: long enough to rank for multiple keywords and tell a coherent story, short enough that someone reading on mobile will actually finish it. Close with a clear call to action — your email, the phrase &ldquo;open to opportunities,&rdquo; or a direct invitation to connect.
            </p>
          </div>

          <h3 className="text-[17px] font-bold text-ink mt-10 mb-4">Tips for a stronger LinkedIn About section</h3>
          <ul className="space-y-2.5 text-[14px] text-ink-2">
            <li className="flex gap-2.5"><span className="text-fire font-bold shrink-0">—</span>Write in first person — &ldquo;I build&rdquo; not &ldquo;John builds.&rdquo; Third person sounds like a press release and creates distance between you and the recruiter reading it.</li>
            <li className="flex gap-2.5"><span className="text-fire font-bold shrink-0">—</span>Your first sentence is the most important — only the first 220–300 characters show before the &ldquo;see more&rdquo; fold on mobile. Make it specific, compelling, and immediately clear what you do and who you help.</li>
            <li className="flex gap-2.5"><span className="text-fire font-bold shrink-0">—</span>Include 3–5 keywords from the job descriptions you are targeting — LinkedIn&apos;s search algorithm indexes your About section, and using the right terms significantly increases how often you appear in recruiter searches.</li>
            <li className="flex gap-2.5"><span className="text-fire font-bold shrink-0">—</span>Name specific tools, platforms, and technologies by name — &ldquo;HubSpot, Salesforce, and Google Analytics&rdquo; is far more searchable and specific than &ldquo;CRM and analytics tools.&rdquo;</li>
            <li className="flex gap-2.5"><span className="text-fire font-bold shrink-0">—</span>Add one specific, quantified result in the first paragraph — a real number makes every claim that follows more credible. &ldquo;I&apos;ve helped companies reduce customer churn by an average of 18%&rdquo; lands very differently than &ldquo;I drive results.&rdquo;</li>
            <li className="flex gap-2.5"><span className="text-fire font-bold shrink-0">—</span>Break your summary into short paragraphs of 3–4 lines — a wall of text gets scrolled past on mobile. White space makes it readable and signals someone who knows how to communicate clearly.</li>
            <li className="flex gap-2.5"><span className="text-fire font-bold shrink-0">—</span>Include your email address directly in the About text — not just in the contact section, which many people never find. Make it as easy as possible for an interested recruiter to reach you without friction.</li>
            <li className="flex gap-2.5"><span className="text-fire font-bold shrink-0">—</span>Update your summary every time you change roles, complete a significant project, or shift your career direction — an outdated About section signals a profile that has not been actively maintained, which some recruiters interpret as disengagement.</li>
          </ul>

          <h3 className="text-[17px] font-bold text-ink mt-10 mb-6">Frequently asked questions</h3>
          <div className="space-y-6">
            <div>
              <p className="text-[14px] font-semibold text-ink mb-1.5">How long should a LinkedIn About section be?</p>
              <p className="text-[14px] text-ink-2 leading-relaxed">Aim for 300–500 words. This is long enough to weave in the keywords you want to rank for and tell a compelling professional story, but short enough that a mobile reader will finish it. LinkedIn allows up to 2,600 characters — using every character is not necessary or advisable.</p>
            </div>
            <div>
              <p className="text-[14px] font-semibold text-ink mb-1.5">Should I include keywords in my LinkedIn summary?</p>
              <p className="text-[14px] text-ink-2 leading-relaxed">Yes — LinkedIn&apos;s search algorithm indexes your About section and uses it to rank you in recruiter searches. Including the specific job titles, tools, and skill terms that appear in the roles you want makes you significantly more visible. Think of the About section as a second headline — it is both a human-readable story and a searchable keyword field.</p>
            </div>
            <div>
              <p className="text-[14px] font-semibold text-ink mb-1.5">Is it better to write a LinkedIn summary in first or third person?</p>
              <p className="text-[14px] text-ink-2 leading-relaxed">First person is almost always better. Third person (&ldquo;Sarah is a seasoned marketer...&rdquo;) sounds written by a publicist and creates distance between you and the reader. First person (&ldquo;I help brands grow by...&rdquo;) is direct, personal, and far more likely to get a response from a recruiter who reaches out based on your profile.</p>
            </div>
          </div>
        </div>

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: [
            { '@type': 'Question', name: 'How long should a LinkedIn About section be?', acceptedAnswer: { '@type': 'Answer', text: 'Aim for 300–500 words. Long enough to include relevant keywords and tell a professional story, short enough for a mobile reader to finish. LinkedIn allows 2,600 characters but using every one is not necessary.' } },
            { '@type': 'Question', name: 'Should I include keywords in my LinkedIn summary?', acceptedAnswer: { '@type': 'Answer', text: "Yes — LinkedIn's search algorithm indexes your About section. Including the job titles, tools, and skills from the roles you want makes you more visible in recruiter searches." } },
            { '@type': 'Question', name: 'Is it better to write a LinkedIn summary in first or third person?', acceptedAnswer: { '@type': 'Answer', text: 'First person is almost always better. Third person sounds written by a publicist and creates distance. First person is direct and more likely to earn a response from a recruiter.' } },
          ],
        }) }} />

      </main>
    </>
  );
}
