import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Header from '../../../components/layout/Header';
import SalaryCalculatorClient from './SalaryCalculatorClient';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://saveyojob.com';

export const metadata: Metadata = {
  title: 'Salary Calculator by Role — See the AI Skills Premium for Your Job',
  description:
    'Find out what your role pays at entry, mid, senior, and lead level — then see how much more you could earn with AI skills. Data from BLS. No sign-up required.',
  alternates: { canonical: `${siteUrl}/tools/salary-calculator/` },
  openGraph: {
    title: 'Salary Calculator by Role — See the AI Skills Premium',
    description: 'Role-specific salary estimates with experience level, location, and AI skills premium. Powered by BLS data.',
    url: `${siteUrl}/tools/salary-calculator/`,
    type: 'website',
  },
};

export default function SalaryCalculatorPage() {
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
            Salary Calculator by Role
          </h1>
          <p className="text-[16px] text-ink-2 leading-relaxed max-w-[580px]">
            See what your job pays at every experience level and location — then find out how much more you could earn by adding AI skills.
          </p>
        </div>

        <SalaryCalculatorClient />

        <div className="mt-20 pt-12 border-t border-line max-w-[740px]">
          <h2 className="text-[22px] sm:text-[26px] font-bold tracking-[-0.02em] text-ink mb-4">
            How to know your market value — and negotiate a salary you deserve
          </h2>
          <div className="space-y-4 text-[15px] text-ink-2 leading-relaxed">
            <p>
              Studies consistently show that 73% of workers never negotiate their salary — they accept the first offer because they do not know what the market actually pays for their role. This is expensive: candidates who negotiate their starting salary earn $5,000 to $10,000 more per year on average, a gap that compounds over an entire career. The single most effective way to negotiate is to walk into the conversation knowing the market range for your exact role, your experience level, and your location — so when a number is offered, you can respond with data, not feelings.
            </p>
            <p>
              The AI skills premium is one of the fastest-emerging salary differentials in the labour market. Workers who can demonstrate proficiency in AI tools — prompt engineering, AI-assisted analysis, AI workflow automation — are consistently earning 10–25% more than peers in the same role without those skills. This is not a distant trend; employers are already paying the premium today, and the gap between AI-skilled and non-AI-skilled workers is widening every quarter. Understanding where your current salary sits relative to market — and what closing that gap looks like — is the starting point for any meaningful salary conversation.
            </p>
          </div>

          <h3 className="text-[17px] font-bold text-ink mt-10 mb-4">Tips for researching and negotiating your salary</h3>
          <ul className="space-y-2.5 text-[14px] text-ink-2">
            <li className="flex gap-2.5"><span className="text-fire font-bold shrink-0">—</span>Always negotiate — the worst outcome is &ldquo;no,&rdquo; which leaves you exactly where you started. Most employers expect candidates to counter, and many build room into initial offers specifically because of this.</li>
            <li className="flex gap-2.5"><span className="text-fire font-bold shrink-0">—</span>Research your role across at least 3 sources (BLS, Glassdoor, LinkedIn Salary, Levels.fyi for tech) — triangulating across multiple sources gives you a defensible range rather than a single number that could be skewed by outliers.</li>
            <li className="flex gap-2.5"><span className="text-fire font-bold shrink-0">—</span>Filter salary data by location — the same role in San Francisco can pay 50–80% more than in a mid-size city. If you are remote, understand whether the company uses geographic compensation bands before negotiating.</li>
            <li className="flex gap-2.5"><span className="text-fire font-bold shrink-0">—</span>Understand total compensation, not just base — a $95k base with a 15% bonus, full health coverage, and 4 weeks leave is worth considerably more than a $105k base with no bonus and basic benefits. Compare packages on an equivalent basis.</li>
            <li className="flex gap-2.5"><span className="text-fire font-bold shrink-0">—</span>Your previous salary does not dictate your next one — it is becoming illegal in many jurisdictions to ask for salary history, and even where it is legal you are not obligated to answer. Your market value is set by what the role pays today, not what you accepted years ago.</li>
            <li className="flex gap-2.5"><span className="text-fire font-bold shrink-0">—</span>Anchor high — if you give a range, make your actual target the bottom number, not the middle. Negotiators consistently anchor to the lower end of any stated range.</li>
            <li className="flex gap-2.5"><span className="text-fire font-bold shrink-0">—</span>Add verifiable AI skills to your resume and LinkedIn — workers who can demonstrate AI tool proficiency are earning 10–25% more than peers in the same role without those skills, and the gap is widening quarter by quarter.</li>
            <li className="flex gap-2.5"><span className="text-fire font-bold shrink-0">—</span>Document your current compensation package in writing now — exact base, bonus structure, equity, and benefits — so you have a precise baseline for future negotiations and can compare offers accurately rather than relying on memory.</li>
          </ul>

          <h3 className="text-[17px] font-bold text-ink mt-10 mb-6">Frequently asked questions</h3>
          <div className="space-y-6">
            <div>
              <p className="text-[14px] font-semibold text-ink mb-1.5">How do I find out the market salary for my role?</p>
              <p className="text-[14px] text-ink-2 leading-relaxed">Use at least three sources to triangulate: the Bureau of Labor Statistics (BLS) for government-backed median data, Glassdoor and LinkedIn Salary for self-reported figures, and Levels.fyi for tech roles. Cross-referencing all three gives you a reliable range rather than a single number that could be skewed. Filter by location — salaries in San Francisco are often 50–80% higher than in mid-size cities for identical roles.</p>
            </div>
            <div>
              <p className="text-[14px] font-semibold text-ink mb-1.5">What is the AI skills salary premium?</p>
              <p className="text-[14px] text-ink-2 leading-relaxed">Workers who demonstrate proficiency with AI tools — generative AI, prompt engineering, AI-assisted workflows — are earning 10–25% more than peers in the same role without those skills, according to recent labour market research. The premium is highest in knowledge-worker roles (marketing, finance, HR, project management) and in industries with high AI adoption rates. Adding verifiable AI skills to your profile is currently one of the highest-ROI career moves available.</p>
            </div>
            <div>
              <p className="text-[14px] font-semibold text-ink mb-1.5">When is the best time to negotiate salary?</p>
              <p className="text-[14px] text-ink-2 leading-relaxed">At two moments: after you receive a job offer (before you accept), and at your annual review. The offer stage is where you have the most leverage — the employer has decided they want you and has not yet set the final number. At the review stage, the strongest approach is to come with documented achievements and comparable market data, not just a request for more money. Both conversations require preparation; neither should be improvised.</p>
            </div>
          </div>
        </div>

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: [
            { '@type': 'Question', name: 'How do I find out the market salary for my role?', acceptedAnswer: { '@type': 'Answer', text: 'Use at least three sources: BLS for government-backed median data, Glassdoor and LinkedIn Salary for self-reported figures, and Levels.fyi for tech roles. Filter by location — salaries can vary 50–80% for identical roles across cities.' } },
            { '@type': 'Question', name: 'What is the AI skills salary premium?', acceptedAnswer: { '@type': 'Answer', text: 'Workers with AI tool proficiency are earning 10–25% more than peers in the same role without those skills. The premium is highest in knowledge-worker roles and industries with high AI adoption. Adding verifiable AI skills is one of the highest-ROI career moves available today.' } },
            { '@type': 'Question', name: 'When is the best time to negotiate salary?', acceptedAnswer: { '@type': 'Answer', text: 'After receiving a job offer (before accepting) and at your annual review. The offer stage gives you the most leverage. At the review stage, come with documented achievements and market data — not just a request for more money.' } },
          ],
        }) }} />

      </main>
    </>
  );
}
