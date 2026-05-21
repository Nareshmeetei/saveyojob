import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Header from '../../../components/layout/Header';
import Badge from '../../../components/ui/Badge';
import HeroRiskGame from '../../../components/hero/HeroRiskGame';

interface Props { params: Promise<{ slug: string }>; }

async function getOccupation(slug: string) {
  const { SEED_OCCUPATIONS } = await import('../../../../data/seed-data');
  return SEED_OCCUPATIONS.find(o => o.slug === slug) ?? null;
}

async function getAllOccupations() {
  const { SEED_OCCUPATIONS } = await import('../../../../data/seed-data');
  return SEED_OCCUPATIONS;
}

export async function generateStaticParams() {
  const { SEED_OCCUPATIONS } = await import('../../../../data/seed-data');
  return SEED_OCCUPATIONS.map(o => ({ slug: o.slug }));
}

export const revalidate = 86400;

// ── Job-category mapping for risk calculator ──────────────────────────────────

function titleToJobId(title: string): string {
  const t = title.toLowerCase();
  if (/account|financ|bookkeep|audit|tax|payroll|treasury|budget|controller|cfo/.test(t)) return 'finance';
  if (/software|developer|programmer|devops|sre|web dev/.test(t)) return 'tech';
  if (/engineer|architect/.test(t) && !/legal|compliance/.test(t)) return 'arch';
  if (/nurse|doctor|physician|medical|therapist|pharmacist|clinical|dentist|surgeon|radiolog|patholog/.test(t)) return 'health';
  if (/teacher|professor|instructor|tutor|educator|principal/.test(t)) return 'edu';
  if (/legal|lawyer|attorney|paralegal|compliance|contract/.test(t)) return 'legal';
  if (/\bhr\b|human resource|recruit|talent acquisition/.test(t)) return 'hr';
  if (/design|ux|ui\b|graphic|illustrat/.test(t)) return 'design';
  if (/marketing|seo|content|copywriter|writer|journalist|editor|social media/.test(t)) return 'writing';
  if (/sales|account executive|business development/.test(t)) return 'sales';
  if (/customer service|support|call center|help desk/.test(t)) return 'support';
  if (/data entry|clerk|admin|secretary|receptionist|office manager/.test(t)) return 'data';
  if (/supply chain|logistic|warehouse|driver|transport|shipping|delivery|courier/.test(t)) return 'transport';
  if (/real estate|agent|broker|property manager/.test(t)) return 'realestate';
  if (/research analyst|market research/.test(t)) return 'research';
  if (/operations|project manager|coordinator|planner/.test(t)) return 'ops';
  return 'other';
}

// ── AI tools per occupation ───────────────────────────────────────────────────

const AI_TOOLS_BY_SLUG: Record<string, { name: string; what: string; url: string }[]> = {
  paralegal: [
    { name: 'Harvey AI',          what: 'Drafts legal documents, summarises contracts and performs case law research autonomously — work that previously took a paralegal hours now takes seconds',                         url: 'https://www.harvey.ai' },
    { name: 'Casetext CoCounsel', what: 'Automates legal research, deposition preparation, and due diligence review for law firms of all sizes',                                                                          url: 'https://casetext.com' },
    { name: 'Kira Systems',       what: 'Extracts and analyses key clauses from hundreds of contracts simultaneously, replacing manual contract review',                                                                  url: 'https://kirasystems.com' },
    { name: 'Relativity aiR',     what: 'AI-powered eDiscovery platform that reviews millions of documents in hours rather than the weeks a human team would need',                                                      url: 'https://www.relativity.com' },
    { name: 'LexisNexis AI',      what: 'Surfaces relevant case law, statutes and legal precedents through natural-language queries — eliminating manual database searches',                                              url: 'https://www.lexisnexis.com' },
  ],
  accountant: [
    { name: 'Intuit Assist',           what: 'Auto-categorises every transaction, flags anomalies and drafts financial summaries directly in QuickBooks without human input',                                           url: 'https://www.intuit.com/technology/intuit-assist/' },
    { name: 'Vic.ai',                  what: 'Processes accounts payable invoices end-to-end with 95%+ straight-through accuracy, removing the need for manual AP review',                                              url: 'https://www.vic.ai' },
    { name: 'Sage Intacct AI',         what: 'Generates financial reports, cash-flow forecasts and variance analysis automatically from live general-ledger data',                                                      url: 'https://www.sage.com/en-us/products/sage-intacct/' },
    { name: 'Bloomberg Professional',  what: 'Analyses financial statements and market data to surface insights at the speed of a team of analysts',                                                                    url: 'https://www.bloomberg.com/professional/' },
    { name: 'TurboTax AI',             what: 'Handles personal and small-business tax filing with increasing autonomy, reducing demand for entry-level tax preparation work',                                            url: 'https://turbotax.intuit.com' },
  ],
  'financial-analyst': [
    { name: 'Bloomberg Professional',         what: 'Performs earnings analysis, sector comparisons and executive-summary memos at a speed no human analyst can match',                          url: 'https://www.bloomberg.com/professional/' },
    { name: 'Kensho (S&P Global)',            what: 'Automatically generates investment research reports and statistical analyses from raw market datasets',                                      url: 'https://www.kensho.com' },
    { name: 'Microsoft Copilot for Finance',  what: 'Automates Excel model-building, account reconciliations and variance analysis directly within Microsoft 365',                               url: 'https://www.microsoft.com/en-us/microsoft-365/copilot/copilot-for-finance' },
    { name: 'Tableau AI',                     what: 'Auto-generates data visualisations, trend narratives and anomaly alerts from complex financial datasets',                                   url: 'https://www.tableau.com/products/tableau-ai' },
    { name: 'Claude',                         what: 'Writes investor memos, earnings summaries and industry overview reports from structured prompts in minutes',                                url: 'https://claude.ai' },
  ],
  'data-entry-clerk': [
    { name: 'UiPath',                  what: 'Robotic Process Automation that automates repetitive data-entry workflows, running continuously without fatigue',                                                   url: 'https://www.uipath.com' },
    { name: 'Automation Anywhere',     what: 'Automates entire end-to-end data processing workflows from document ingestion to system posting',                                                                         url: 'https://www.automationanywhere.com' },
    { name: 'Microsoft Power Automate',what: 'Extracts data from emails, PDFs and forms and routes it into downstream systems automatically',                                                                          url: 'https://powerautomate.microsoft.com' },
    { name: 'Google Document AI',      what: 'Reads, classifies and extracts structured information from scanned forms and invoices without human review',                                                              url: 'https://cloud.google.com/document-ai' },
    { name: 'ABBYY FlexiCapture',      what: 'Captures and validates data from unstructured documents at enterprise scale — the technology directly replacing manual data entry',                                       url: 'https://www.abbyy.com/flexicapture/' },
  ],
  'customer-service-representative': [
    { name: 'Intercom Fin',       what: 'Resolves a large share of customer support queries automatically, handling escalations only when a human is genuinely needed',                                            url: 'https://www.intercom.com/fin' },
    { name: 'Zendesk AI',         what: 'Automatically triages every inbound ticket, predicts customer intent and drafts agent replies — reducing handle time dramatically',                                            url: 'https://www.zendesk.com/service/ai/' },
    { name: 'Salesforce Einstein',what: 'Predicts customer needs, surfaces next-best actions and auto-generates personalised case resolutions at scale',                                                                url: 'https://www.salesforce.com/artificial-intelligence/' },
    { name: 'Google CCAI',        what: 'Powers voice and chat virtual agents that handle entire customer interactions end-to-end across phone, web and messaging',                                                     url: 'https://cloud.google.com/contact-center' },
    { name: 'ChatGPT',            what: 'Drives conversational AI agents deployed by thousands of companies to replace tier-1 support across every channel',                                                           url: 'https://chatgpt.com' },
  ],
  'hr-specialist': [
    { name: 'HireVue',                  what: 'Screens video interviews using AI assessment, replacing the first round of human review and shortlisting candidates automatically',                                      url: 'https://www.hirevue.com' },
    { name: 'Eightfold.ai',             what: 'Matches candidates to open roles, predicts employee attrition and automates workforce planning across large organisations',                                              url: 'https://eightfold.ai' },
    { name: 'Workday AI',               what: 'Automates onboarding workflows, benefits administration, compliance reporting and routine employee-relations tasks',                                                     url: 'https://www.workday.com/en-us/artificial-intelligence.html' },
    { name: 'Paradox (Olivia)',         what: 'Schedules interviews, answers candidate questions and sends offer letters entirely autonomously — a full recruiting coordinator in software',                             url: 'https://www.paradox.ai' },
    { name: 'LinkedIn Talent Insights', what: 'Generates real-time labour market intelligence and competitive compensation benchmarks, replacing manual research hours',                                                url: 'https://business.linkedin.com/talent-solutions/talent-insights' },
  ],
  'graphic-designer': [
    { name: 'Midjourney',          what: 'Generates commercially viable marketing imagery, concept art and brand visuals from text prompts in under a minute',                                                          url: 'https://www.midjourney.com' },
    { name: 'Adobe Firefly',       what: 'Integrates generative fill, text-to-image and vector generation directly into Photoshop and Illustrator, automating repetitive production work',                              url: 'https://www.adobe.com/products/firefly.html' },
    { name: 'DALL-E 3',            what: 'Produces social media graphics, ad creative and product illustrations on demand — work that previously filled junior designer schedules',                                     url: 'https://openai.com/dall-e-3' },
    { name: 'Canva AI',            what: 'Auto-generates brand-consistent social posts, presentations and ad templates from briefs, accessible to non-designers',                                                       url: 'https://www.canva.com/magic/' },
    { name: 'Runway ML',           what: 'Creates and edits video content and images for production at a fraction of the cost and time of traditional design workflows',                                                url: 'https://runwayml.com' },
  ],
  'software-developer': [
    { name: 'GitHub Copilot',        what: 'Writes and completes code in real time — used by millions of developers to accelerate output and reduce boilerplate',                               url: 'https://github.com/features/copilot' },
    { name: 'Cursor',                what: 'AI-native code editor that refactors entire codebases, writes documentation and generates complete features from natural-language prompts',                                  url: 'https://www.cursor.com' },
    { name: 'Claude',                what: 'Generates boilerplate, writes unit tests, explains legacy code and proposes architecture decisions across any language or stack',                                            url: 'https://claude.ai' },
    { name: 'Amazon CodeWhisperer',  what: 'Suggests context-aware code completions and proactively identifies security vulnerabilities within AWS and multi-cloud environments',                                       url: 'https://aws.amazon.com/q/developer/' },
    { name: 'Devin (Cognition AI)',  what: 'First autonomous AI software engineer capable of completing end-to-end engineering tasks — including writing, testing and deploying code',                                  url: 'https://www.cognition.ai' },
  ],
  'market-research-analyst': [
    { name: 'Perplexity AI',    what: 'Synthesises web-wide primary and secondary research into sourced, structured reports in minutes rather than days',                                                                url: 'https://www.perplexity.ai' },
    { name: 'Crayon',           what: 'Monitors competitor moves, pricing changes and product launches continuously and auto-generates competitive intelligence digests',                                                url: 'https://www.crayon.co' },
    { name: 'Claude',           what: 'Writes survey analysis, trend reports, executive summaries and strategic recommendations from raw data dumps',                                                                   url: 'https://claude.ai' },
    { name: 'Exploding Topics', what: 'Surfaces emerging market trends months before they reach mainstream awareness — work that previously required analyst hours of scanning',                                        url: 'https://explodingtopics.com' },
    { name: 'Similarweb AI',    what: 'Analyses web traffic, audience behaviour and share-of-voice data to produce market-sizing reports automatically',                                                                url: 'https://www.similarweb.com' },
  ],
  bookkeeper: [
    { name: 'QuickBooks AI',             what: 'Auto-categorises every transaction, reconciles accounts and flags discrepancies in real time — removing the core task of a bookkeeper',                                url: 'https://quickbooks.intuit.com' },
    { name: 'Xero AI',                   what: 'Matches bank transactions to invoices, chases late payments and generates month-end reports without human intervention',                                                url: 'https://www.xero.com' },
    { name: 'Vic.ai',                    what: 'Processes accounts payable with a 95%+ straight-through rate — invoices received, approved and posted with zero manual handling',                                       url: 'https://www.vic.ai' },
    { name: 'Dext',                      what: 'Extracts line-item data from receipts, invoices and bank statements instantly and posts them to the general ledger',                                                    url: 'https://dext.com' },
    { name: 'AutoEntry',                 what: 'Digitises paper documents and auto-posts them directly into accounting systems, eliminating manual data entry entirely',                                                url: 'https://www.autoentry.com' },
  ],
};

function getAiTools(slug: string) {
  return AI_TOOLS_BY_SLUG[slug] ?? [
    { name: 'Large Language Models (GPT-4o, Claude 3.5)', what: 'Automate written communication, analysis, report generation and research tasks across industries',          url: 'https://claude.ai' },
    { name: 'UiPath (Robotic Process Automation)',        what: 'Handle repetitive data processing, form filling and workflow steps without human input',                     url: 'https://www.uipath.com' },
    { name: 'Tableau AI',                                 what: 'Generate insights, forecasts and visualisations from data that previously required hours of manual work',    url: 'https://www.tableau.com/products/tableau-ai' },
  ];
}

// ── Related occupations ───────────────────────────────────────────────────────

const RELATED_SLUGS: Record<string, string[]> = {
  paralegal:                         ['accountant', 'financial-analyst', 'market-research-analyst'],
  accountant:                        ['bookkeeper', 'financial-analyst', 'paralegal'],
  'financial-analyst':               ['accountant', 'market-research-analyst', 'bookkeeper'],
  'data-entry-clerk':                ['bookkeeper', 'customer-service-representative', 'hr-specialist'],
  'customer-service-representative': ['hr-specialist', 'data-entry-clerk', 'market-research-analyst'],
  'hr-specialist':                   ['customer-service-representative', 'market-research-analyst', 'accountant'],
  'graphic-designer':                ['software-developer', 'market-research-analyst', 'customer-service-representative'],
  'software-developer':              ['graphic-designer', 'market-research-analyst', 'financial-analyst'],
  'market-research-analyst':         ['financial-analyst', 'hr-specialist', 'software-developer'],
  bookkeeper:                        ['accountant', 'data-entry-clerk', 'financial-analyst'],
};

// ── Content generators ────────────────────────────────────────────────────────

function verdictText(occ: any, score: number | null): string {
  const tools  = getAiTools(occ.slug);
  const t1     = tools[0]?.name ?? 'AI automation platforms';
  const t2     = tools[1]?.name ?? 'large language models';
  const growth = occ.ten_year_growth_pct as number;
  const emp    = occ.employment_count ? `${((occ.employment_count as number) / 1000).toFixed(0)}K` : '';

  if (occ.risk_level === 'Very High') {
    return `Oxford University's landmark automation research identifies ${occ.title}s among the most AI-exposed professional roles, with a ${score}% probability that core functions will be substantially automated within this decade. Tools like ${t1} and ${t2} are already performing tasks that once required trained expertise. BLS data shows${emp ? ` ${emp} Americans work as ${occ.title}s —` : ''} a workforce facing ${growth < 0 ? `a projected ${Math.abs(growth)}% employment decline` : `${growth}% growth`} as automation absorbs routine work. This is urgent — but ${occ.title}s who build AI-adjacent skills now will find their judgment more valuable, not less.`;
  }
  if (occ.risk_level === 'High') {
    return `Oxford University research places ${occ.title}s at ${score}% automation risk — significant portions of the role's routine tasks are already being absorbed by AI faster than most workers realise. BLS projects employment will ${growth < 0 ? `contract ${Math.abs(growth)}%` : `grow ${growth}%`} over the next decade. The highest-value ${occ.title} work — strategic judgment, client relationships, and complex problem-solving — remains difficult for AI to replicate and continues to command a meaningful salary premium over peers who only perform routine tasks.`;
  }
  if (occ.risk_level === 'Moderate') {
    return `${occ.title}s sit at a genuine inflection point. Oxford research puts automation risk at ${score}% — roughly half of current tasks could be handled by AI within this decade. Tools like ${t1} are already absorbing the most predictable, process-heavy parts of the job. BLS projects ${growth >= 0 ? `+${growth}%` : `${growth}%`} employment change — demand for skilled ${occ.title}s persists, but only for those who evolve. The professionals commanding the highest salaries will be the ones who master AI workflows, not compete with them.`;
  }
  return `Among knowledge workers, ${occ.title}s are relatively well-positioned against AI displacement. Oxford research puts automation risk at ${score}% — significantly below the average for white-collar roles. The complex judgment, creative depth, or interpersonal skills central to this work remain genuinely difficult for current AI to replicate. BLS projects ${growth >= 0 ? `+${growth}%` : `${growth}%`} employment growth. That said, tools like ${t1} are already changing daily workflows — early adopters will capture most of the upside.`;
}

function careerSteps(occ: any): { step: string; detail: string }[] {
  const safeTasks: string[] = (occ.tasks ?? [])
    .filter((t: any) => t.automation_risk === 'Low' || t.automation_risk === 'Minimal')
    .map((t: any) => t.name as string);
  const topSkills: string[] = (occ.core_skills ?? [])
    .sort((a: any, b: any) => (b.importance as number) - (a.importance as number))
    .slice(0, 2)
    .map((s: any) => s.name as string);
  const tools = getAiTools(occ.slug);

  return [
    {
      step: 'Own the AI-resistant parts of your role',
      detail: `Concentrate your energy on ${safeTasks.length > 0 ? safeTasks.slice(0, 2).join(' and ') : 'strategic judgment and relationship management'} — these demand human understanding that AI consistently struggles with, and they form the defensible core of your long-term value to any employer.`,
    },
    {
      step: 'Use the tools that are disrupting your field',
      detail: `${tools[0]?.name} and ${tools[1]?.name} are redefining what ${occ.title}s are paid for. Becoming the professional who directs and quality-checks AI output — rather than the one replaced by it — is the fastest path to irreplaceability. Start with 30 minutes daily on one platform.`,
    },
    {
      step: 'Invest in your highest-leverage skills',
      detail: `${topSkills.length > 0 ? `Your top skills — ${topSkills.join(' and ')} — become more` : 'Deep domain expertise becomes more'} valuable as AI absorbs the routine layer of your role. Certifications and demonstrable depth in these areas command salary premiums in a post-automation job market.`,
    },
    {
      step: 'Signal AI fluency to the job market',
      detail: `Update your LinkedIn profile and CV to show how you use AI tools to deliver better outcomes. Professionals who can articulate AI-enhanced productivity are commanding 10–25% salary premiums over peers with identical traditional credentials — the market is already rewarding this.`,
    },
    {
      step: 'Build a structured 90-day reskilling plan',
      detail: `Don't wait for your employer to act. Choose one certification that directly addresses the automation risk in your role and commit to completing it within 90 days. Use the free risk calculator on this page to generate a personalised week-by-week roadmap.`,
    },
  ];
}

function buildFaqs(occ: any, score: number | null) {
  const year = new Date().getFullYear();
  const tools = getAiTools(occ.slug);
  const highRiskTasks: string[] = (occ.tasks ?? [])
    .filter((t: any) => t.automation_risk === 'Very High' || t.automation_risk === 'High')
    .map((t: any) => t.name as string);
  const safeTasks: string[] = (occ.tasks ?? [])
    .filter((t: any) => t.automation_risk === 'Low' || t.automation_risk === 'Minimal')
    .map((t: any) => t.name as string);
  const topSkills: string[] = (occ.core_skills ?? [])
    .sort((a: any, b: any) => (b.importance as number) - (a.importance as number))
    .map((s: any) => s.name as string);
  const natMedian = 59228;
  const wageVsMedian = occ.median_annual_wage
    ? occ.median_annual_wage > natMedian
      ? `${Math.round(((occ.median_annual_wage - natMedian) / natMedian) * 100)}% above the US national median wage`
      : `${Math.round(((natMedian - occ.median_annual_wage) / natMedian) * 100)}% below the US national median wage`
    : null;
  const growth = occ.ten_year_growth_pct as number;

  return [
    {
      q: `Will AI replace ${occ.title}s?`,
      a: `Not entirely, but the role is transforming fast. Oxford University research gives ${occ.title}s a ${score ?? '?'}% automation probability — meaning that proportion of core job functions could be handled by AI without a trained ${occ.title}. The tasks most vulnerable include ${highRiskTasks.slice(0, 3).join(', ')}. Tasks requiring ${safeTasks.length > 0 ? safeTasks.slice(0, 2).join(' and ') : 'complex judgment and human relationships'} remain difficult for AI to replicate. The most likely outcome over the next decade is not full elimination but significant role transformation: fewer entry-level positions, higher productivity expectations, and a growing premium on AI-capable ${occ.title}s.`,
    },
    {
      q: `Which ${occ.title} tasks will AI automate first?`,
      a: `AI targets tasks that are rule-based, document-heavy and predictable: ${highRiskTasks.join('; ')}. Tools like ${tools[0]?.name} and ${tools[1]?.name} are already actively deployed by employers to handle these. Conversely, tasks requiring novel judgment, stakeholder communication, and adaptive problem-solving are expected to remain human-led for the foreseeable future. The practical impact: expect routine ${occ.title} work to shrink while complex, high-judgment tasks grow in relative importance.`,
    },
    {
      q: `What skills do ${occ.title}s need in ${year} and beyond?`,
      a: `The ${occ.title}s commanding the highest salaries combine strong domain expertise with genuine AI fluency. Core skills to prioritise include: ${topSkills.join(', ')}. Equally critical is the ability to direct, verify and improve AI outputs — a skill no tool can replicate. Professionals who can use ${tools[0]?.name} to deliver three to five times the output of a traditional ${occ.title} will command significantly higher compensation. Soft skills — strategic analysis, client trust, cross-functional leadership — also rise in value as AI handles the mechanical layer.`,
    },
    {
      q: `How much do ${occ.title}s earn and is the salary outlook positive?`,
      a: `According to the U.S. Bureau of Labor Statistics, the median annual wage for ${occ.title}s is $${occ.median_annual_wage?.toLocaleString() ?? 'N/A'}${wageVsMedian ? ` (${wageVsMedian} of $${natMedian.toLocaleString()})` : ''}. Employment is projected to ${growth > 0 ? `grow ${growth}%` : `decline ${Math.abs(growth)}%`} over the next ten years${growth < -5 ? ', driven in significant part by automation absorbing routine tasks' : growth > 10 ? ', reflecting strong underlying demand' : ''}. Salaries for ${occ.title}s who focus on complex, AI-resistant work and demonstrate AI tool proficiency are growing faster than the median, as firms concentrate human roles at the higher end of the value chain.`,
    },
    {
      q: `Is a ${occ.title} career still worth pursuing in ${year}?`,
      a: `${occ.risk_level === 'Very High' || occ.risk_level === 'High'
        ? `Entry-level ${occ.title} roles face genuine headwinds as AI absorbs routine tasks. If you're entering the field, focus from day one on the high-judgment, relationship-intensive aspects of the role — and differentiate with AI capabilities from the start. Senior ${occ.title}s with strong domain expertise and demonstrated AI fluency remain in demand. The profession is not disappearing, but it is becoming more selective about the skills it rewards.`
        : `${occ.title}s are in a relatively resilient position, with BLS projecting ${growth >= 0 ? `+${growth}%` : `${growth}%`} employment growth over the next decade. The role demands skills — ${safeTasks.length > 0 ? safeTasks.slice(0, 2).join(' and ') : 'complex judgment and creativity'} — that current AI cannot reliably replicate. Entering the field in ${year} is a reasonable choice, particularly if you develop AI fluency alongside strong domain fundamentals. The professionals who thrive long-term will use AI as a force multiplier, not resist it.`
      }`,
    },
    {
      q: `What should a ${occ.title} do in the next 6 months to stay ahead?`,
      a: `Six concrete actions with the highest return: (1) Audit which of your daily tasks are routine versus judgment-intensive — the former are at risk, the latter are your moat. (2) Spend two to three hours learning ${tools[0]?.name} — the tool most directly impacting your role — until it makes you measurably faster. (3) Strengthen your top skill (${topSkills[0] ?? 'core domain expertise'}) with a targeted certification. (4) Update your professional profile to show AI-enhanced productivity, not just traditional experience. (5) Build a structured 12-week reskilling roadmap using the free tool above. (6) If you manage a team, position yourself as the person who governs AI output — that role is growing in value at every company.`,
    },
  ];
}

// ── Risk colour helpers ───────────────────────────────────────────────────────

function riskColor(level: string | null) {
  switch (level) {
    case 'Very High': return 'text-critical';
    case 'High':      return 'text-warn';
    case 'Moderate':  return 'text-amber-400';
    case 'Low':       return 'text-fire';
    default:          return 'text-ink-2';
  }
}

function riskBorderColor(level: string | null): string {
  switch (level) {
    case 'Very High': return '#DC2626';
    case 'High':      return '#B45309';
    case 'Moderate':  return '#D97706';
    case 'Low':       return '#0C526D';
    default:          return '#6B7280';
  }
}

// ── Metadata ──────────────────────────────────────────────────────────────────

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://saveyojob.com';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const occ = await getOccupation(slug);
  if (!occ) return {};
  const score = occ.automation_probability ? Math.round(occ.automation_probability * 100) : null;
  const year  = new Date().getFullYear();
  const url   = `${siteUrl}/jobs/${slug}/`;
  return {
    title: `Will AI Replace ${occ.title}s? ${score}% Risk Score + Career Roadmap (${year})`,
    description: `${occ.title}s face a ${score}% AI automation risk (Oxford University research). See which tasks AI automates first, the tools driving it, skills to build, ${year} salary data ($${occ.median_annual_wage?.toLocaleString()}), and a free personalised reskilling plan.`,
    alternates: { canonical: url },
    openGraph: {
      title: `Will AI Replace ${occ.title}s? ${score}% Automation Risk`,
      description: `${occ.title}s face a ${score}% AI automation risk based on Oxford University research. Task-by-task breakdown, AI tools driving automation, and a free reskilling roadmap.`,
      url,
      type: 'article',
      images: [`/api/og?job=${encodeURIComponent(occ.title)}&score=${score}&level=${occ.risk_level}`],
    },
    keywords: [
      `will AI replace ${occ.title}s`,
      `${occ.title} AI automation risk`,
      `${occ.title} job future`,
      `AI impact on ${occ.title} jobs`,
      `${occ.title} career outlook ${year}`,
      `how to future-proof ${occ.title} career`,
      `${occ.title} salary ${year}`,
      `AI tools replacing ${occ.title}s`,
    ],
  };
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default async function OccupationPage({ params }: Props) {
  const { slug } = await params;
  const [occ, allOccs] = await Promise.all([getOccupation(slug), getAllOccupations()]);
  if (!occ) notFound();

  const score        = occ.automation_probability ? Math.round(occ.automation_probability * 100) : null;
  const tools        = getAiTools(occ.slug);
  const steps        = careerSteps(occ);
  const faqs         = buildFaqs(occ, score);
  const verdict      = verdictText(occ, score);
  const year         = new Date().getFullYear();
  const natMedian    = 59228;
  const relatedOccs  = (RELATED_SLUGS[occ.slug] ?? [])
    .map(s => allOccs.find(o => o.slug === s))
    .filter(Boolean)
    .slice(0, 3);

  const highRiskTasks = (occ.tasks ?? []).filter((t: any) => t.automation_risk === 'Very High' || t.automation_risk === 'High');
  const safeTaskList  = (occ.tasks ?? []).filter((t: any) => t.automation_risk === 'Low' || t.automation_risk === 'Minimal');

  const riskBorder = riskBorderColor(occ.risk_level);

  // Schema markup
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://saveyojob.com';
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home',        item: `${siteUrl}/` },
          { '@type': 'ListItem', position: 2, name: 'Browse Jobs', item: `${siteUrl}/jobs/` },
          { '@type': 'ListItem', position: 3, name: `${occ.title} AI Risk`, item: `${siteUrl}/jobs/${occ.slug}/` },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: faqs.map(f => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
      {
        '@type': 'WebPage',
        name: `Will AI Replace ${occ.title}s? ${score}% Automation Risk Score`,
        description: `Task-by-task automation risk analysis for ${occ.title}s, including AI tools in use, skills to build, salary data and a free personalised reskilling roadmap.`,
        about: {
          '@type': 'Occupation',
          name: occ.title,
          occupationalCategory: occ.soc_code,
          ...(occ.median_annual_wage ? {
            estimatedSalary: {
              '@type': 'MonetaryAmountDistribution',
              name: 'median annual wage',
              currency: 'USD',
              duration: 'P1Y',
              median: occ.median_annual_wage,
            },
          } : {}),
        },
      },
    ],
  };

  return (
    <>
      <Header />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <main>

        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 pt-10 pb-12">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-[12px] text-ink-3 mb-4">
            <Link href="/" className="hover:text-ink-2 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/jobs/" className="hover:text-ink-2 transition-colors">Browse Jobs</Link>
            <span>/</span>
            <span className="text-ink-2">{occ.title}</span>
          </nav>

          <h1 className="text-[40px] sm:text-[52px] font-bold text-ink tracking-tight leading-tight mb-5">
            Will AI Replace<br />{occ.title}s?
          </h1>

          {/* Verdict — GEO-optimised direct answer */}
          <p className="text-[16px] text-ink-2 leading-relaxed mb-8 max-w-2xl">
            {verdict}
          </p>

          {/* Stats bar */}
          <div className="grid grid-cols-3 border border-line rounded-xl overflow-hidden mb-6">
            {[
              {
                label: 'Automation Risk',
                value: score ? `${score}%` : '—',
                sub:   score ? occ.risk_level : null,
                color: score ? riskColor(occ.risk_level) : 'text-ink',
              },
              {
                label: 'Median Salary',
                value: occ.median_annual_wage ? `$${Math.round((occ.median_annual_wage as number) / 1000)}K` : '—',
                sub:   occ.median_annual_wage
                  ? occ.median_annual_wage > natMedian ? 'Above US median' : 'Below US median'
                  : null,
                color: 'text-ink',
              },
              {
                label: '10-Year Outlook',
                value: occ.ten_year_growth_pct != null
                  ? `${(occ.ten_year_growth_pct as number) > 0 ? '+' : ''}${occ.ten_year_growth_pct}%`
                  : '—',
                sub:   occ.ten_year_growth_pct != null
                  ? (occ.ten_year_growth_pct as number) > 5 ? 'Growing demand' : (occ.ten_year_growth_pct as number) < 0 ? 'Shrinking field' : 'Stable demand'
                  : null,
                color: ((occ.ten_year_growth_pct as number) ?? 0) >= 0 ? 'text-fire' : 'text-critical',
              },
            ].map((s, i) => (
              <div key={s.label} className={`bg-surface py-3 sm:py-5 px-2 sm:px-4 text-center ${i > 0 ? 'border-l border-line' : ''}`}>
                <div className={`text-[20px] sm:text-[28px] font-bold tabular-nums leading-none ${s.color}`}>{s.value}</div>
                {s.sub && <div className="text-[9px] sm:text-[10px] text-ink-3 mt-1 font-medium leading-tight">{s.sub}</div>}
                <div className="text-[8px] sm:text-[11px] font-semibold uppercase tracking-[0.06em] sm:tracking-[0.08em] text-ink-3 mt-1 leading-tight">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Risk badge */}
          {occ.risk_level && (
            <Badge label={`${occ.risk_level} Automation Risk`} risk={occ.risk_level} className="mb-8" />
          )}

          {/* Task breakdown */}
          {(occ.tasks?.length ?? 0) > 0 && (
            <div>
              <div className="flex items-center gap-3 mb-3">
                <h2 className="text-[11px] font-bold uppercase tracking-[0.13em] text-ink-3 whitespace-nowrap">
                  Task-by-task breakdown
                </h2>
                <div className="flex-1 h-[1px] bg-line" />
              </div>
              <p className="text-[13px] text-ink-3 mb-5">
                Each task in the {occ.title} role rated by its likelihood of AI automation. Tasks rated Very High or High are already being handled by AI tools at forward-thinking employers.
              </p>
              <div className="space-y-4">
                {(occ.tasks ?? []).map((t: any, i: number) => {
                  const riskMap: Record<string, number> = {
                    'Very High': 90, 'High': 70, 'Moderate': 45, 'Low': 20, 'Minimal': 5,
                  };
                  const pct      = riskMap[t.automation_risk] ?? 50;
                  const barColor = pct > 70 ? 'bg-critical' : pct > 40 ? 'bg-warn' : 'bg-fire';
                  const textCol  = pct > 70 ? 'text-critical' : pct > 40 ? 'text-warn' : 'text-fire';
                  return (
                    <div key={i}>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[14px] font-medium text-ink">{t.name}</span>
                        <span className={`text-[11px] font-bold uppercase tracking-[0.08em] shrink-0 ml-3 ${textCol}`}>
                          {t.automation_risk}
                        </span>
                      </div>
                      <div className="h-[3px] bg-line rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${barColor}`} style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Quick summary callout */}
              {highRiskTasks.length > 0 && safeTaskList.length > 0 && (
                <div className="mt-6 grid sm:grid-cols-2 gap-3">
                  <div className="p-4 rounded-xl border border-line bg-surface-2">
                    <div className="text-[10px] font-bold uppercase tracking-[0.12em] text-critical mb-2">At risk now</div>
                    <ul className="space-y-1">
                      {highRiskTasks.slice(0, 3).map((t: any, i: number) => (
                        <li key={i} className="text-[13px] text-ink-2 flex items-start gap-2">
                          <span className="text-critical mt-0.5 shrink-0">×</span>{t.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-4 rounded-xl border border-line bg-surface-2">
                    <div className="text-[10px] font-bold uppercase tracking-[0.12em] text-fire mb-2">Your protection</div>
                    <ul className="space-y-1">
                      {safeTaskList.slice(0, 3).map((t: any, i: number) => (
                        <li key={i} className="text-[13px] text-ink-2 flex items-start gap-2">
                          <span className="text-fire mt-0.5 shrink-0">✓</span>{t.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          )}
        </section>

        {/* ── AI Tools ─────────────────────────────────────────────────────── */}
        <section className="border-t border-line bg-surface" aria-labelledby="ai-tools-heading">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[11px] font-bold uppercase tracking-[0.13em] text-ink-3 whitespace-nowrap">What's changing</span>
              <div className="flex-1 h-[1px] bg-line" />
            </div>
            <h2 id="ai-tools-heading" className="text-[24px] font-bold text-ink tracking-tight mb-2">
              AI Tools Already Automating {occ.title} Work
            </h2>
            <p className="text-[14px] text-ink-2 mb-6 leading-relaxed">
              These platforms are actively deployed by employers to handle tasks that previously required a trained {occ.title}. Understanding each one helps you decide where to adapt — and which tools to learn first.
            </p>
            <div className="space-y-2">
              {tools.map((tool, i) => (
                <a
                  key={i}
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 p-4 bg-surface-2 border border-line rounded-xl hover:border-fire transition-colors duration-150"
                >
                  <div className="w-9 h-9 rounded-lg bg-surface-3 border border-line flex items-center justify-center shrink-0 overflow-hidden mt-0.5">
                    <img
                      src={`https://www.google.com/s2/favicons?domain=${new URL(tool.url).hostname}&sz=64`}
                      alt={tool.name}
                      width={24}
                      height={24}
                      className="object-contain"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[13px] font-semibold text-ink mb-1">{tool.name}</div>
                    <p className="text-[12px] text-ink-2 leading-relaxed">{tool.what}</p>
                  </div>
                  <span className="text-[11px] font-bold text-fire shrink-0 pt-0.5">Visit →</span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ── Risk calculator ───────────────────────────────────────────────── */}
        <section className="border-t border-line" aria-labelledby="risk-calc-heading">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
            <div className="text-center mb-8">
              <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-fire mb-2">
                Free assessment
              </div>
              <h2 id="risk-calc-heading" className="text-[26px] font-bold text-ink tracking-tight mb-2">
                Check your personal AI risk score
              </h2>
              <p className="text-[14px] text-ink-2">
                Answer 3 questions about your specific work and get a personalised risk score — not just the role average.
              </p>
            </div>
            <HeroRiskGame prefilledJobId={titleToJobId(occ.title)} />
          </div>
        </section>

        {/* ── Skills that protect you ───────────────────────────────────────── */}
        <section className="border-t border-line bg-surface" aria-labelledby="skills-heading">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[11px] font-bold uppercase tracking-[0.13em] text-ink-3 whitespace-nowrap">What to build</span>
              <div className="flex-1 h-[1px] bg-line" />
            </div>
            <h2 id="skills-heading" className="text-[24px] font-bold text-ink tracking-tight mb-2">
              Skills That Protect {occ.title}s From Automation
            </h2>
            <p className="text-[14px] text-ink-2 mb-6 leading-relaxed">
              AI consistently underperforms humans in tasks requiring contextual judgment, trust-based relationships, and novel problem-solving. These are the areas worth investing in.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              {/* Core domain skills */}
              <div className="p-5 bg-surface-2 border border-line rounded-xl">
                <div className="text-[10px] font-bold uppercase tracking-[0.12em] text-fire mb-3">
                  High-value {occ.title} skills
                </div>
                <div className="space-y-3">
                  {(occ.core_skills ?? []).map((skill: any, i: number) => (
                    <div key={i}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[13px] font-medium text-ink">{skill.name}</span>
                        <span className="text-[11px] font-bold tabular-nums text-ink-3">{skill.importance}%</span>
                      </div>
                      <div className="h-1.5 bg-line rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full bg-fire"
                          style={{ width: `${skill.importance}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Human skills AI can't replicate */}
              <div className="p-5 bg-surface-2 border border-line rounded-xl">
                <div className="text-[10px] font-bold uppercase tracking-[0.12em] text-fire mb-3">
                  Human skills AI can't replicate
                </div>
                <ul className="space-y-2.5">
                  {[
                    { skill: 'Strategic judgment under ambiguity', why: 'AI optimises for known patterns; novel situations require human reasoning' },
                    { skill: 'Stakeholder trust and persuasion', why: 'Relationships built on accountability and empathy remain human territory' },
                    { skill: 'Cross-domain synthesis', why: 'Connecting insights across unrelated domains is where human creativity compounds' },
                    { skill: 'Ethical and contextual decision-making', why: 'High-stakes calls with moral weight require human accountability' },
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="text-fire mt-0.5 shrink-0 text-[13px]">✓</span>
                      <div>
                        <div className="text-[13px] font-semibold text-ink">{item.skill}</div>
                        <div className="text-[11px] text-ink-3 mt-0.5">{item.why}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Affiliate courses if available */}
            {(occ.affiliate_courses?.length ?? 0) > 0 && (
              <div>
                <div className="text-[11px] font-bold uppercase tracking-[0.12em] text-ink-3 mb-3">
                  Recommended courses
                </div>
                <div className="space-y-2">
                  {(occ.affiliate_courses ?? []).map((course: any, i: number) => (
                    <a
                      key={i}
                      href={course.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-4 bg-surface-2 border border-line rounded-xl hover:border-fire transition-colors duration-150"
                    >
                      <div className="w-9 h-9 rounded-lg bg-surface-3 border border-line flex items-center justify-center shrink-0 overflow-hidden">
                        <img
                          src={`https://www.google.com/s2/favicons?domain=${new URL(course.url).hostname}&sz=64`}
                          alt={course.platform}
                          width={24}
                          height={24}
                          className="object-contain"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[13px] font-semibold text-ink truncate">{course.name}</div>
                        <div className="text-[11px] text-ink-3 mt-0.5">{course.platform} · {course.skill}</div>
                      </div>
                      <span className="text-[11px] font-bold text-fire shrink-0">Enroll →</span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ── Career protection steps ───────────────────────────────────────── */}
        <section className="border-t border-line" aria-labelledby="steps-heading">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[11px] font-bold uppercase tracking-[0.13em] text-ink-3 whitespace-nowrap">Action plan</span>
              <div className="flex-1 h-[1px] bg-line" />
            </div>
            <h2 id="steps-heading" className="text-[24px] font-bold text-ink tracking-tight mb-2">
              5 Steps to Future-Proof Your {occ.title} Career
            </h2>
            <p className="text-[14px] text-ink-2 mb-6 leading-relaxed">
              These steps are ordered by impact — the first two deliver the fastest results regardless of how much time you have.
            </p>
            <div className="space-y-4">
              {steps.map((s, i) => (
                <div key={i} className="flex gap-4 p-5 bg-surface border border-line rounded-xl">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-[13px] font-extrabold text-bg mt-0.5"
                    style={{ background: riskBorder }}
                  >
                    {i + 1}
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-[15px] font-bold text-ink mb-1">{s.step}</h3>
                    <p className="text-[13px] text-ink-2 leading-relaxed">{s.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Job outlook ───────────────────────────────────────────────────── */}
        <section className="border-t border-line bg-surface" aria-labelledby="outlook-heading">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[11px] font-bold uppercase tracking-[0.13em] text-ink-3 whitespace-nowrap">Labour market</span>
              <div className="flex-1 h-[1px] bg-line" />
            </div>
            <h2 id="outlook-heading" className="text-[24px] font-bold text-ink tracking-tight mb-6">
              {occ.title} Salary and Job Outlook ({year})
            </h2>

            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              {/* Salary card */}
              {occ.median_annual_wage && (
                <div className="p-5 bg-surface-2 border border-line rounded-xl">
                  <div className="text-[10px] font-bold uppercase tracking-[0.12em] text-ink-3 mb-3">Compensation</div>
                  <div className="text-[32px] font-extrabold text-ink tracking-tight leading-none mb-1">
                    ${Math.round((occ.median_annual_wage as number) / 1000)}K
                  </div>
                  <div className="text-[13px] text-ink-2 mb-3">median annual salary</div>
                  <div className="h-px bg-line mb-3" />
                  <div className="space-y-1.5 text-[12px] text-ink-3">
                    <div className="flex justify-between">
                      <span>US national median</span>
                      <span className="font-semibold text-ink-2">${(natMedian / 1000).toFixed(0)}K</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Difference</span>
                      <span className={`font-semibold ${occ.median_annual_wage > natMedian ? 'text-fire' : 'text-critical'}`}>
                        {occ.median_annual_wage > natMedian ? '+' : ''}
                        ${Math.round(((occ.median_annual_wage as number) - natMedian) / 1000)}K
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Employment card */}
              <div className="p-5 bg-surface-2 border border-line rounded-xl">
                <div className="text-[10px] font-bold uppercase tracking-[0.12em] text-ink-3 mb-3">Employment</div>
                {occ.employment_count && (
                  <>
                    <div className="text-[32px] font-extrabold text-ink tracking-tight leading-none mb-1">
                      {((occ.employment_count as number) / 1000).toFixed(0)}K
                    </div>
                    <div className="text-[13px] text-ink-2 mb-3">workers in the US</div>
                  </>
                )}
                <div className="h-px bg-line mb-3" />
                <div className="space-y-1.5 text-[12px] text-ink-3">
                  <div className="flex justify-between">
                    <span>BLS 10-year projection</span>
                    <span className={`font-semibold ${(occ.ten_year_growth_pct as number) >= 0 ? 'text-fire' : 'text-critical'}`}>
                      {(occ.ten_year_growth_pct as number) > 0 ? '+' : ''}{occ.ten_year_growth_pct}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>SOC code</span>
                    <span className="font-semibold text-ink-2">{occ.soc_code}</span>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-[13px] text-ink-2 leading-relaxed p-4 bg-surface-2 border border-line rounded-xl">
              <strong className="text-ink">What these numbers mean for you:</strong>{' '}
              {(occ.ten_year_growth_pct as number) < -5
                ? `The ${Math.abs(occ.ten_year_growth_pct as number)}% projected employment decline is a direct signal from the BLS that automation is already reducing demand for ${occ.title}s. This makes reskilling and repositioning within the field — not just continuing in the same track — the highest-value career move.`
                : (occ.ten_year_growth_pct as number) > 10
                ? `Strong projected growth of +${occ.ten_year_growth_pct}% means demand for ${occ.title}s remains robust — but the nature of the work is shifting. Firms will hire fewer people to do more with AI-augmented workflows. Differentiation will come from expertise and AI fluency, not headcount.`
                : `Stable employment projections mean ${occ.title} roles aren't disappearing — but the tasks within them are changing rapidly. The professionals who adapt to AI-assisted workflows will concentrate earnings at the top of the range, while those who don't face growing pressure on compensation and job security.`
              }
            </p>
          </div>
        </section>

        {/* ── Related occupations ───────────────────────────────────────────── */}
        {relatedOccs.length > 0 && (
          <section className="border-t border-line" aria-labelledby="related-heading">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
              <div className="flex items-center gap-3 mb-6">
                <h2 id="related-heading" className="text-[11px] font-bold uppercase tracking-[0.13em] text-ink-3 whitespace-nowrap">
                  Related occupations
                </h2>
                <div className="flex-1 h-[1px] bg-line" />
              </div>
              <div className="grid sm:grid-cols-3 gap-3">
                {relatedOccs.map((r: any) => {
                  const rScore = r.automation_probability ? Math.round(r.automation_probability * 100) : null;
                  const rColor = riskBorderColor(r.risk_level);
                  return (
                    <Link
                      key={r.slug}
                      href={`/jobs/${r.slug}/`}
                      className="flex flex-col p-4 bg-surface border border-line rounded-xl hover:border-fire hover:bg-surface-2 transition-all duration-150 group"
                    >
                      <div className="text-[14px] font-semibold text-ink group-hover:text-fire transition-colors mb-2">
                        {r.title}
                      </div>
                      <div className="flex items-center justify-between mt-auto pt-2 border-t border-line">
                        {rScore !== null && (
                          <span className="text-[20px] font-bold tabular-nums" style={{ color: rColor }}>
                            {rScore}%
                          </span>
                        )}
                        {r.risk_level && (
                          <span
                            className="text-[10px] font-bold uppercase tracking-[0.08em] px-2 py-0.5 rounded-full"
                            style={{ color: rColor, background: rColor + '14' }}
                          >
                            {r.risk_level}
                          </span>
                        )}
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* ── FAQ ──────────────────────────────────────────────────────────── */}
        <section className="border-t border-line bg-surface" aria-labelledby="faq-heading">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
            <div className="flex items-center gap-3 mb-6">
              <h2 id="faq-heading" className="text-[11px] font-bold uppercase tracking-[0.13em] text-ink-3 whitespace-nowrap">
                Frequently asked questions
              </h2>
              <div className="flex-1 h-[1px] bg-line" />
            </div>
            <div className="space-y-6">
              {faqs.map((f, i) => (
                <div key={i} className="pb-6 border-b border-line last:border-b-0 last:pb-0">
                  <h3 className="text-[16px] font-semibold text-ink mb-2">{f.q}</h3>
                  <p className="text-[14px] text-ink-2 leading-relaxed">{f.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Data sources ─────────────────────────────────────────────────── */}
        <section className="border-t border-line">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6">
            <div className="text-[12px] text-ink-3 leading-relaxed">
              <strong className="text-ink-2">Data sources & methodology:</strong>{' '}
              Automation probability scores are derived from Frey & Osborne (2013),{' '}
              <em>The Future of Employment: How Susceptible Are Jobs to Computerisation?</em>,
              University of Oxford. Employment counts, median wages and 10-year projections are from the{' '}
              U.S. Bureau of Labor Statistics (BLS) Occupational Outlook Handbook, 2023–24 edition.
              Broader automation impact figures draw on McKinsey Global Institute,{' '}
              <em>Jobs Lost, Jobs Gained: Workforce Transitions in a Time of Automation</em> (2017).
              Risk assessments reflect probabilities of task-level automation, not whole-job elimination.
            </div>
          </div>
        </section>

      </main>

    </>
  );
}
