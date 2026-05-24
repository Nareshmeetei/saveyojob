import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Header from '../../../components/layout/Header';

interface Props { params: Promise<{ industry: string }>; }

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://saveyojob.com';

// ── Industry configuration ────────────────────────────────────────────────────

interface IndustryConfig {
  name: string;
  headline: string;
  intro: string;
  slugs: string[];
  safetyVerdict: string;
  faq: { q: string; a: string }[];
}

const INDUSTRIES: Record<string, IndustryConfig> = {
  finance: {
    name: 'Finance & Accounting',
    headline: 'AI Automation Risk for Finance & Accounting Jobs',
    intro:
      'Finance and accounting roles face significant AI pressure. Tools like Intuit Assist, Vic.ai, and Bloomberg AI are already automating invoice processing, transaction categorisation, and financial reporting. Oxford University research puts most routine finance roles at 85–99% automation risk. That said, senior finance professionals who combine domain expertise with AI fluency — directing models, auditing outputs, managing client relationships — remain in strong demand.',
    slugs: ['accountant', 'bookkeeper', 'financial-analyst', 'bank-teller', 'billing-and-posting-clerk', 'claims-adjuster'],
    safetyVerdict:
      'The safest finance careers are those requiring complex judgment: financial analysts who synthesise market signals, and senior accountants who navigate audit, compliance, and advisory work. Entry-level data processing roles — bookkeepers, billing clerks, bank tellers — face the highest replacement risk.',
    faq: [
      {
        q: 'Which finance jobs are safest from AI?',
        a: 'Financial analysts, senior accountants, and CFOs who focus on strategic advisory work are the most resilient. These roles require contextual judgment that current AI cannot reliably replicate. Roles that are almost entirely data entry and processing — bank tellers, billing clerks, bookkeepers — face the highest displacement risk within this decade.',
      },
      {
        q: 'Will AI replace accountants entirely?',
        a: 'Not entirely, but the role is transforming fast. Routine tasks — transaction entry, reconciliation, basic reporting — are already being automated by Intuit Assist, Vic.ai, and similar tools. The accountants who stay relevant will focus on advisory, audit oversight, and AI-augmented analysis. Entry-level accounting positions will shrink; senior, judgment-intensive roles will grow in relative value.',
      },
      {
        q: 'What AI skills should finance professionals build?',
        a: 'The highest-value skills for finance professionals are: (1) proficiency with AI-native tools like Microsoft Copilot for Finance and Tableau AI, (2) the ability to audit and verify AI-generated reports, (3) data literacy — understanding what the models are doing, not just accepting their outputs. Certifications in data analytics and AI for finance from platforms like Coursera and Google are increasingly expected by employers.',
      },
    ],
  },
  legal: {
    name: 'Legal',
    headline: 'AI Automation Risk for Legal Jobs',
    intro:
      'Legal roles are undergoing rapid transformation. Tools like Harvey AI, Casetext CoCounsel, and Kira Systems are automating contract review, legal research, and due diligence work that previously took trained paralegals and legal secretaries hours or days. Oxford University research puts paralegals at 94% automation risk. Administrative legal roles are even more exposed. Legal professionals who focus on courtroom advocacy, client strategy, and complex judgment retain the highest long-term value.',
    slugs: ['paralegal', 'legal-secretary'],
    safetyVerdict:
      'Among legal roles, those requiring direct client interaction, strategic counsel, and courtroom representation are the safest from AI. Document-heavy positions — paralegals and legal secretaries — face the highest near-term displacement as AI tools achieve human-level performance on structured legal tasks.',
    faq: [
      {
        q: 'Will AI replace paralegals?',
        a: 'AI is already replacing significant portions of paralegal work. Harvey AI, Casetext, and Relativity aiR handle document review, contract analysis, and legal research with near-human accuracy at a fraction of the cost. Oxford University research puts paralegals at 94% automation probability. Paralegals who transition toward client-facing coordination, courtroom support, and AI governance will remain employable; those who focus on document processing face the highest risk.',
      },
      {
        q: 'What legal jobs are safe from AI?',
        a: 'Roles requiring courtroom advocacy, complex negotiation, client trust, and novel legal reasoning remain resilient to automation. Trial lawyers, senior litigation partners, and in-house counsel dealing with high-stakes strategic decisions are least exposed. The pattern across the legal industry is consistent: the higher the judgment requirement and the lower the document-processing content, the safer the role.',
      },
    ],
  },
  admin: {
    name: 'Administrative & Office',
    headline: 'AI Automation Risk for Administrative Jobs',
    intro:
      'Administrative and office roles are among the most exposed jobs in any sector. Data entry clerks, general office clerks, and order clerks perform largely routine, rule-based tasks — exactly what AI and robotic process automation (RPA) platforms like UiPath and Microsoft Power Automate are designed to handle at scale. Oxford University research puts data entry clerks at 99% automation risk. Administrative assistants with broader responsibilities, especially those supporting executives, face a more mixed outlook.',
    slugs: ['administrative-assistant', 'general-office-clerk', 'data-entry-clerk', 'order-clerk'],
    safetyVerdict:
      'The safest administrative role is the executive or senior administrative assistant who handles complex scheduling, stakeholder coordination, and judgment-based prioritisation. Roles that are almost entirely form processing, data entry, or file management are among the highest-risk jobs in the entire economy.',
    faq: [
      {
        q: 'Which admin jobs are most at risk from AI?',
        a: 'Data entry clerks (99% risk), general office clerks, and order clerks are among the most exposed jobs in the economy. These roles involve high proportions of routine, structured tasks that RPA tools handle faster and more cheaply than humans. BLS projections show a −18% employment decline for data entry clerks over the next decade — a direct reflection of automation already underway.',
      },
      {
        q: 'How can administrative professionals future-proof their careers?',
        a: 'The clearest path is to move from task execution toward coordination and judgment. Administrative professionals who master AI tools — using Copilot, ChatGPT, and automation platforms to handle their own routine work — and then take on higher-complexity work (project coordination, stakeholder communication, operations oversight) consistently command higher salaries and face lower displacement risk. Treat AI as a tool that frees your time for harder problems.',
      },
      {
        q: 'Are administrative assistant jobs safe from AI?',
        a: 'Partially. Senior administrative assistants who handle complex scheduling, confidential communications, event management, and executive support face lower risk than entry-level office clerks. The distinction is whether the role requires judgment and adaptability, or primarily data processing. BLS projects a −7% decline for administrative assistants overall, but this masks wide variation: high-judgment roles are stable, process-heavy roles are not.',
      },
    ],
  },
  sales: {
    name: 'Sales & Customer Service',
    headline: 'AI Automation Risk for Sales & Customer Service Jobs',
    intro:
      'Sales and customer service roles face a split outlook. Telemarketing and scripted customer support — high-volume, low-complexity interactions — are being rapidly replaced by AI voice agents and chatbots. Consultative sales roles requiring trust, complex negotiation, and relationship management are more resilient. Tools like Intercom Fin, Zendesk AI, and Salesforce Einstein are already handling a large share of tier-1 support interactions without human involvement.',
    slugs: ['customer-service-representative', 'inside-sales-representative', 'telemarketer', 'cashier'],
    safetyVerdict:
      'Telemarketers and cashiers face near-total automation risk. Customer service representatives in scripted support roles face high risk. Inside sales professionals who handle complex deals, enterprise accounts, and solution selling are significantly more resilient — the human element in high-stakes commercial relationships remains difficult to automate.',
    faq: [
      {
        q: 'Will AI replace customer service jobs?',
        a: 'AI has already replaced a significant portion of tier-1 customer service work. Chatbots and AI voice agents (Intercom Fin, Google CCAI) handle a growing share of common queries without human intervention. The customer service roles that remain will be higher-complexity: escalation handling, emotionally sensitive situations, enterprise account management. BLS projects a −5% decline for customer service representatives — a conservative estimate given the pace of AI chatbot adoption.',
      },
      {
        q: 'Are sales jobs safe from AI?',
        a: 'High-value sales roles — enterprise account executives, solution engineers, business development managers who handle long sales cycles — are considerably safer than transactional sales. The human elements of building trust, reading a room, navigating complex stakeholder dynamics, and crafting bespoke proposals are genuinely hard for AI to replicate. Low-complexity transactional sales (telemarketers, inside reps handling scripted outreach) face high automation risk.',
      },
    ],
  },
  technology: {
    name: 'Technology & Software',
    headline: 'AI Automation Risk for Technology & Software Jobs',
    intro:
      'Software developers occupy a paradoxical position: they are simultaneously most exposed to AI augmentation and most in demand because of it. GitHub Copilot, Cursor, and autonomous agents like Devin are changing daily workflows dramatically. However, BLS projects strong employment growth for software developers — AI is creating more software demand than it is displacing developers. The key shift is productivity: senior engineers using AI tools are worth significantly more than entry-level engineers doing the same work without them.',
    slugs: ['software-developer'],
    safetyVerdict:
      'Software developers who embrace AI tools as a force multiplier — using Copilot, Claude, and Cursor to ship 3–5× faster — are in the strongest career position of any knowledge worker. Those who resist AI adoption face growing pressure as productivity expectations rise. The threat is not replacement but irrelevance for engineers who refuse to adapt.',
    faq: [
      {
        q: 'Will AI replace software developers?',
        a: 'AI will not replace skilled software developers in the near term, but it is reshaping what the role looks like. Tools like GitHub Copilot, Cursor, and autonomous agents like Devin handle boilerplate, testing, documentation, and increasingly, feature implementation. Senior engineers who direct AI output, architect systems, and maintain quality standards remain in high demand. Oxford research puts developers at moderate automation risk — lower than most knowledge worker roles — because the complexity and judgment required at the senior level remains genuinely hard to automate.',
      },
      {
        q: 'What programming skills are most AI-proof?',
        a: 'System architecture, security engineering, performance optimisation, and the ability to define clear requirements for AI-generated code are the highest-value, lowest-displacement skills. Prompt engineering for code generation is now a core competency. Developers who specialise in AI/ML infrastructure, LLM application development, and AI safety are seeing the strongest salary growth and job security.',
      },
    ],
  },
  'human-resources': {
    name: 'Human Resources',
    headline: 'AI Automation Risk for Human Resources Jobs',
    intro:
      'HR is undergoing significant transformation as AI handles screening, scheduling, onboarding, and compliance reporting. HireVue, Eightfold.ai, and Paradox (Olivia) are already performing work that traditionally required dedicated HR coordinators. However, the judgment-intensive parts of HR — talent development, culture, conflict resolution, strategic workforce planning — remain stubbornly human. HR professionals who master AI tools while building deeper people skills are in the strongest position.',
    slugs: ['hr-specialist'],
    safetyVerdict:
      'HR generalists and specialists who focus on people development, culture, and strategic workforce planning face moderate automation risk. HR coordinators whose work is primarily scheduling, form processing, and compliance administration face higher risk as these tasks are well within current AI capability.',
    faq: [
      {
        q: 'Will AI replace HR jobs?',
        a: 'AI is already replacing the administrative layer of HR work: resume screening, interview scheduling, benefits administration, and compliance reporting. The parts of HR that require genuine human judgment — developing talent, navigating difficult conversations, shaping company culture, and building trust with employees — are significantly harder to automate. HR professionals who position themselves as strategic partners rather than process administrators are the most resilient.',
      },
    ],
  },
  'design-creative': {
    name: 'Design & Creative',
    headline: 'AI Automation Risk for Design & Creative Jobs',
    intro:
      'Graphic designers face direct competition from AI image generation tools — Midjourney, Adobe Firefly, DALL-E 3, and Canva AI are now accessible to non-designers and can produce viable marketing materials, social graphics, and product imagery in seconds. Oxford research puts graphic designers at moderate automation risk. Creative directors, brand strategists, and designers who work on complex, concept-driven briefs are more resilient than those producing repetitive production work.',
    slugs: ['graphic-designer'],
    safetyVerdict:
      'Graphic designers who focus on brand strategy, creative direction, and complex multi-format campaigns face moderate risk. Designers whose work consists largely of resizing assets, producing social templates, and creating repetitive promotional material face high displacement risk from AI generation tools.',
    faq: [
      {
        q: 'Will AI replace graphic designers?',
        a: 'AI is already replacing a significant portion of production-level design work. Midjourney and Adobe Firefly allow marketing teams to generate social graphics and ad creative without a designer. However, brand identity work, UX design, motion design, and creative campaigns requiring a consistent strategic voice remain human-led. Designers who learn to use AI tools to dramatically accelerate production work — and then focus their time on higher-level creative direction — are commanding premium rates.',
      },
    ],
  },
  'marketing-research': {
    name: 'Marketing & Research',
    headline: 'AI Automation Risk for Marketing & Research Jobs',
    intro:
      'Market research analysts are seeing AI tools like Perplexity, Crayon, and Similarweb AI automate the data collection and initial analysis work that once took days. However, the interpretation, strategic recommendation, and client communication layer of market research remains human. AI makes strong research analysts dramatically more productive — but it raises the bar for entry-level roles that were primarily data gathering.',
    slugs: ['market-research-analyst'],
    safetyVerdict:
      'Market research analysts who focus on strategic insight, client relationships, and translating data into business decisions are in a moderate-risk position with strong upside if they adopt AI tools. Entry-level research roles focused on data collection and basic reporting face higher automation pressure.',
    faq: [
      {
        q: 'What marketing jobs are safe from AI?',
        a: 'Marketing roles requiring creative strategy, brand positioning, complex client relationships, and multi-channel campaign leadership are the most resilient. Content strategists, brand managers, and senior marketing directors who can think beyond execution face moderate risk. Roles focused on repetitive content production, basic social media scheduling, and data collection face high displacement risk. The common thread: judgment and creativity at scale are safer than execution at scale.',
      },
    ],
  },
};

const RISK_STYLE: Record<string, { text: string; bg: string }> = {
  'Very High': { text: '#C45347', bg: 'rgba(196,83,71,0.09)' },
  'High':      { text: '#D4783C', bg: 'rgba(212,120,60,0.08)' },
  'Moderate':  { text: '#CA8A04', bg: 'rgba(202,138,4,0.08)' },
  'Low':       { text: '#097BA0', bg: 'rgba(9,123,160,0.08)' },
};

export function generateStaticParams() {
  return Object.keys(INDUSTRIES).map(industry => ({ industry }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { industry } = await params;
  const config = INDUSTRIES[industry];
  if (!config) return {};
  const url = `${siteUrl}/careers/${industry}/`;
  return {
    title: { absolute: `${config.headline} – Saveyojob` },
    description: `${config.intro.slice(0, 155).trimEnd()}…`,
    alternates: { canonical: url },
    openGraph: {
      title: config.headline,
      description: `${config.intro.slice(0, 155).trimEnd()}…`,
      url,
      type: 'website',
    },
    keywords: [
      `ai automation risk ${config.name.toLowerCase()}`,
      `ai proof jobs in ${config.name.toLowerCase()}`,
      `will ai replace ${config.name.toLowerCase()} jobs`,
      `careers safe from ai ${config.name.toLowerCase()}`,
      `future proof career ${config.name.toLowerCase()}`,
    ],
  };
}

export default async function IndustryPage({ params }: Props) {
  const { industry } = await params;
  const config = INDUSTRIES[industry];
  if (!config) notFound();

  const { SEED_OCCUPATIONS } = await import('../../../../data/seed-data');
  const occs = config.slugs
    .map(slug => SEED_OCCUPATIONS.find((o: any) => o.slug === slug))
    .filter(Boolean) as any[];

  const sortedOccs = [...occs].sort(
    (a, b) => (a.automation_probability ?? 0) - (b.automation_probability ?? 0),
  );

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: config.faq.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <>
      <Header />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <main className="max-w-[860px] mx-auto px-5 sm:px-8 py-12">

        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-[12px] text-ink-3 mb-6">
          <Link href="/" className="hover:text-ink-2 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/careers/" className="hover:text-ink-2 transition-colors">Careers by Industry</Link>
          <span>/</span>
          <span className="text-ink-2">{config.name}</span>
        </nav>

        {/* Hero */}
        <div className="mb-10">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-fire mb-3">AI Automation Risk</p>
          <h1 className="text-[32px] sm:text-[40px] font-bold text-ink tracking-[-0.03em] leading-tight mb-4">
            {config.headline}
          </h1>
          <p className="text-[15px] text-ink-2 leading-relaxed max-w-[660px]">
            {config.intro}
          </p>
        </div>

        {/* Occupation cards — safest first */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-[11px] font-bold uppercase tracking-[0.13em] text-ink-3 whitespace-nowrap">
              Safest first
            </span>
            <div className="flex-1 h-[1px] bg-line" />
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {sortedOccs.map((o: any) => {
              const score = o.automation_probability ? Math.round(o.automation_probability * 100) : null;
              const rs = RISK_STYLE[o.risk_level ?? ''] ?? { text: '#7AAAB8', bg: 'rgba(122,170,184,0.10)' };
              return (
                <Link
                  key={o.slug}
                  href={`/jobs-at-risk/${o.slug}/`}
                  className="flex items-start justify-between gap-3 p-4 bg-surface border border-line rounded-xl hover:border-fire hover:bg-surface-2 transition-all duration-150 group"
                >
                  <div className="min-w-0">
                    <div className="text-[14px] font-semibold text-ink group-hover:text-fire transition-colors mb-1.5">
                      {o.title}
                    </div>
                    <div className="flex flex-wrap gap-x-2.5 gap-y-1 text-[12px] text-ink-3">
                      {o.median_annual_wage && <span>${o.median_annual_wage.toLocaleString()}/yr</span>}
                      {o.ten_year_growth_pct != null && (
                        <span style={{ color: (o.ten_year_growth_pct as number) >= 0 ? '#097BA0' : '#C45347' }}>
                          {(o.ten_year_growth_pct as number) > 0 ? '+' : ''}{o.ten_year_growth_pct}% outlook
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col items-end shrink-0">
                    {score !== null && (
                      <span className="text-[20px] font-bold tabular-nums leading-none" style={{ color: rs.text }}>
                        {score}%
                      </span>
                    )}
                    {o.risk_level && (
                      <span
                        className="text-[9px] font-bold uppercase tracking-[0.07em] px-1.5 py-0.5 rounded mt-0.5"
                        style={{ color: rs.text, background: rs.bg }}
                      >
                        {o.risk_level}
                      </span>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Safety verdict */}
        <div className="p-5 bg-surface border border-line rounded-xl mb-10">
          <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-fire mb-2">Bottom line</p>
          <p className="text-[14px] text-ink-2 leading-relaxed">{config.safetyVerdict}</p>
        </div>

        {/* FAQ */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-5">
            <span className="text-[11px] font-bold uppercase tracking-[0.13em] text-ink-3 whitespace-nowrap">
              Common questions
            </span>
            <div className="flex-1 h-[1px] bg-line" />
          </div>
          <div className="space-y-5">
            {config.faq.map((f, i) => (
              <div key={i} className="pb-5 border-b border-line last:border-b-0 last:pb-0">
                <h2 className="text-[15px] font-semibold text-ink mb-2">{f.q}</h2>
                <p className="text-[14px] text-ink-2 leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center p-8 bg-surface border border-line rounded-xl">
          <p className="text-[15px] font-semibold text-ink mb-2">How exposed is your specific role?</p>
          <p className="text-[13px] text-ink-2 mb-5">
            Get a personalised AI risk score and a free future-proof career roadmap in 60 seconds.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-fire text-bg text-[14px] font-bold rounded-xl hover:brightness-105 transition-all"
          >
            Get my free AI risk score →
          </Link>
        </div>

      </main>
    </>
  );
}
