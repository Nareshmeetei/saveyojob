import type { Metadata } from 'next';
import Header from '../components/layout/Header';
import HeroSection from '../components/hero/HeroSection';
import ToolsDirectory from '../components/tools/ToolsDirectory';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://saveyojob.com';

export const metadata: Metadata = {
  title: { absolute: 'Will AI Replace Your Job? | AI Risk Score & Career Tools – Saveyojob' },
  description:
    'Check how exposed your job is to AI in 60 seconds. Get a personalized AI Risk Score, future-proof career roadmap, and the best AI courses for your industry.',
  alternates: { canonical: `${siteUrl}/` },
  openGraph: {
    title: 'Will AI Replace Your Job? | AI Risk Score & Career Tools – Saveyojob',
    description:
      'Check how exposed your job is to AI in 60 seconds. Get a personalized AI Risk Score, future-proof career roadmap, and the best AI courses for your industry.',
    url: `${siteUrl}/`,
    type: 'website',
  },
};

const FAQ_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Will AI replace my job?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Whether AI will replace your job depends on which tasks make up your role. Jobs with high proportions of routine, predictable, or data-processing tasks — such as data entry clerks (99% risk) or bookkeepers (98% risk) — face the greatest displacement. Jobs requiring physical dexterity, complex judgment, or interpersonal care — such as nurses or social workers — face lower risk. Enter your job title at Saveyojob.com for a free task-level risk score based on Oxford University research.',
      },
    },
    {
      '@type': 'Question',
      name: 'Which jobs are most at risk from AI?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The jobs most at risk from AI automation include data entry clerks (99%), telemarketers (99%), bookkeepers (98%), loan officers (98%), tax preparers (99%), and paralegals (94%). These roles have high proportions of tasks that follow predictable rules and can be automated by machine learning systems. Browse automation scores for 800+ occupations at saveyojob.com/jobs.',
      },
    },
    {
      '@type': 'Question',
      name: 'How is the AI automation risk score calculated?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Automation risk scores are derived from the Oxford Martin School study by Frey & Osborne (2013), "The Future of Employment: How Susceptible Are Jobs to Computerisation?" — the most cited academic research on occupation-level AI risk. Scores are cross-referenced with Bureau of Labor Statistics (BLS) occupational data and O*NET task databases. A score of 99% means 99% of the tasks in that role can be automated using existing or near-term AI technology.',
      },
    },
    {
      '@type': 'Question',
      name: 'What should I do if my job has high AI automation risk?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'If your job has high AI automation risk, the best approach is to: (1) identify which specific tasks are most exposed, (2) build skills in AI-adjacent areas that complement automation rather than compete with it, (3) develop the judgment, relationship, and domain-expertise skills that AI cannot replicate, and (4) follow a structured reskilling plan. Saveyojob.com generates a free, personalized week-by-week roadmap matched to your schedule, current role, and career goal.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is Saveyojob.com really free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Saveyojob.com is completely free — no account, no credit card, no signup required. You enter your job title, answer 3 questions about your experience and goals, and receive a full AI risk score, task breakdown, salary impact projection, and personalized reskilling roadmap in about 60 seconds.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long does it take to get my AI job risk assessment?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The assessment takes approximately 60 seconds. You enter your job title, select your experience level, choose your career goal, and indicate your available weekly learning time. The AI then generates a full report including automation risk score, task-by-task breakdown, 5-year salary projection, skills to build, curated courses, and a week-by-week learning plan.',
      },
    },
  ],
};

const HOWTO_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Get Your AI Job Risk Assessment and Reskilling Roadmap',
  description: 'A free, 60-second process to find out how at risk your job is from AI and get a personalized reskilling plan.',
  totalTime: 'PT1M',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Enter your job title',
      text: 'Type your job title into the search field. The tool supports 800+ occupations including roles in finance, healthcare, legal, technology, and administration.',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Select your experience level',
      text: 'Choose your years of experience: entry level (0–2 years), mid-level (3–7 years), experienced (8–15 years), or senior (15+ years). Experience affects risk because senior professionals typically handle higher-complexity work that is harder to automate.',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Set your career goal',
      text: 'Choose what you want to do: stay in your current role and upskill, transition to a new career, move into AI, or simply understand your risk. This determines the direction of your roadmap.',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Specify your available time',
      text: 'Select how many hours per week you can dedicate to learning: 2–4 hours (minimal), 5–10 hours (moderate), or full-time. This shapes the pace and intensity of your reskilling roadmap.',
    },
    {
      '@type': 'HowToStep',
      position: 5,
      name: 'Review your personalized report',
      text: 'Your report includes: automation risk score (0–100%), task-by-task risk breakdown, 5-year salary impact projection, skills to build, curated AI-focused courses, alternative career paths, and a week-by-week reskilling plan. Free, no signup required.',
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(HOWTO_SCHEMA) }}
      />
      <Header />
      <main>
        <HeroSection />
        <ToolsDirectory />
      </main>
    </>
  );
}
