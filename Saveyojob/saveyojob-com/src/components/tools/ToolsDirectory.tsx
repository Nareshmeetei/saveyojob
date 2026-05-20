'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FileCheck, Zap, FileText,
  Mail, AtSign, AlignLeft,
  MessageSquare, Mic, Send,
  TrendingUp, BarChart3, MailOpen,
  Layers, FileSearch, LogOut,
  Shield, Map,
  type LucideIcon,
} from 'lucide-react';

interface Tool {
  id:      string;
  name:    string;
  tagline: string;
  tag:     string;
  Icon:    LucideIcon;
  href:    string;
}

interface Category {
  id:    string;
  label: string;
  tools: Tool[];
}

const CATEGORIES: Category[] = [
  {
    id: 'resume',
    label: 'Resume',
    tools: [
      {
        id: 'ats-checker',
        name: 'ATS Resume Checker',
        tagline: 'Paste resume + job description → instant ATS compatibility score, missing keywords, and exact fixes',
        tag: 'Resume',

        Icon: FileCheck,
        href: '/tools/ats-checker',
      },
      {
        id: 'resume-bullets',
        name: 'Resume Bullet Rewriter',
        tagline: 'Paste weak bullets → quantified, impact-first rewrites using the XYZ formula',
        tag: 'Resume',

        Icon: Zap,
        href: '/tools/resume-bullets',
      },
      {
        id: 'resume-summary',
        name: 'Resume Summary Generator',
        tagline: 'Enter your job history + target role → a 3-sentence professional summary that opens doors',
        tag: 'Resume',
        Icon: FileText,
        href: '/tools/resume-summary',
      },
    ],
  },
  {
    id: 'writing',
    label: 'Cover Letter & LinkedIn',
    tools: [
      {
        id: 'cover-letter',
        name: 'Cover Letter Generator',
        tagline: 'Paste job description + 3 strengths → a specific, non-generic cover letter in 30 seconds',
        tag: 'Writing',

        Icon: Mail,
        href: '/tools/cover-letter',
      },
      {
        id: 'linkedin-headline',
        name: 'LinkedIn Headline Generator',
        tagline: 'Enter job title + skills → 5 keyword-rich headlines that get found by recruiters',
        tag: 'LinkedIn',

        Icon: AtSign,
        href: '/tools/linkedin-headline',
      },
      {
        id: 'linkedin-summary',
        name: 'LinkedIn Summary Generator',
        tagline: 'Answer 4 questions → a recruiter-optimized About section that shows up in search',
        tag: 'LinkedIn',
        Icon: AlignLeft,
        href: '/tools/linkedin-summary',
      },
    ],
  },
  {
    id: 'interview',
    label: 'Interview Prep',
    tools: [
      {
        id: 'interview-questions',
        name: 'Interview Questions Generator',
        tagline: 'Paste any job description → the 10 most likely questions this company will ask + answer frameworks',
        tag: 'Interview',

        Icon: MessageSquare,
        href: '/tools/interview-questions',
      },
      {
        id: 'tmay',
        name: '"Tell Me About Yourself" Builder',
        tagline: 'Answer 5 questions → a perfectly structured 60-second pitch for any role',
        tag: 'Interview',
        Icon: Mic,
        href: '/tools/tmay',
      },
      {
        id: 'thank-you-email',
        name: 'Thank You Email Generator',
        tagline: 'Enter what was discussed → personalized follow-up that references specific moments',
        tag: 'Interview',
        Icon: Send,
        href: '/tools/thank-you-email',
      },
    ],
  },
  {
    id: 'salary',
    label: 'Salary & Negotiation',
    tools: [
      {
        id: 'salary-negotiation',
        name: 'Salary Negotiation Script',
        tagline: 'Enter offer details → word-for-word scripts with 3 strategies: safe, assertive, aggressive',
        tag: 'Negotiation',

        Icon: TrendingUp,
        href: '/tools/salary-negotiation',
      },
      {
        id: 'salary-calculator',
        name: 'Salary Calculator by Role',
        tagline: 'Search job title + city → median salary by experience level + the AI skills premium',
        tag: 'Salary',
        Icon: BarChart3,
        href: '/tools/salary-calculator',
      },
      {
        id: 'raise-email',
        name: 'Raise Request Email Builder',
        tagline: 'Tell us your accomplishments → a manager-ready raise request email in 60 seconds',
        tag: 'Salary',
        Icon: MailOpen,
        href: '/tools/raise-email',
      },
    ],
  },
  {
    id: 'job-search',
    label: 'Job Search Management',
    tools: [
      {
        id: 'job-tracker',
        name: 'Job Application Tracker',
        tagline: 'Track every application, interview, and follow-up in one Kanban board — no account needed',
        tag: 'Job Search',

        Icon: Layers,
        href: '/tools/job-tracker',
      },
      {
        id: 'jd-decoder',
        name: 'Job Description Decoder',
        tagline: 'Paste any job posting → what they really want, red flags decoded, exact phrases to mirror',
        tag: 'Job Search',
        Icon: FileSearch,
        href: '/tools/jd-decoder',
      },
      {
        id: 'resignation-letter',
        name: 'Resignation Letter Generator',
        tagline: 'Enter your situation → a professional letter that exits gracefully and protects your references',
        tag: 'Job Search',
        Icon: LogOut,
        href: '/tools/resignation-letter',
      },
    ],
  },
  {
    id: 'ai-career',
    label: 'AI Career Tools',
    tools: [
      {
        id: 'ai-risk-scanner',
        name: 'AI Job Risk Scanner',
        tagline: 'Enter job title → task-by-task automation risk score, AI tools doing your work, salary projection',
        tag: 'AI Career',

        Icon: Shield,
        href: '/#hero',

      },
      {
        id: 'reskilling-roadmap',
        name: 'Reskilling Roadmap Generator',
        tagline: 'Job title + goal + time available → week-by-week reskilling plan with courses and salary targets',
        tag: 'AI Career',

        Icon: Map,
        href: '/roadmap',

      },
    ],
  },
];

function ToolCard({ tool }: { tool: Tool }) {
  const { Icon } = tool;

  return (
    <motion.a
      href={tool.href}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      className="flex flex-col gap-3 rounded-xl p-5 border border-line bg-surface hover:border-fire hover:bg-surface-2 transition-colors duration-150"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 bg-fire/[0.08]">
          <Icon size={17} strokeWidth={1.5} className="text-fire" />
        </div>
        <span className="text-[10px] font-semibold uppercase tracking-[0.1em] text-ink-3 px-2 py-0.5 rounded bg-surface-3">
          {tool.tag}
        </span>
      </div>

      <div>
        <div className="text-[15px] font-bold text-ink leading-snug mb-1.5">
          {tool.name}
        </div>
        <p className="text-[12px] text-ink-3 leading-relaxed">{tool.tagline}</p>
      </div>

      <div className="mt-auto pt-3 border-t border-line">
        <span className="text-[12px] font-bold text-fire">Use tool →</span>
      </div>
    </motion.a>
  );
}

function CategorySection({ category }: { category: Category }) {
  return (
    <div className="mb-14 last:mb-0">
      <div className="flex items-center gap-4 mb-6">
        <h2 className="text-[14px] font-bold tracking-[0.04em] uppercase text-ink-3 shrink-0">
          {category.label}
        </h2>
        <div className="flex-1 h-px bg-line" />
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {category.tools.map(tool => (
          <ToolCard key={tool.id} tool={tool} />
        ))}
      </div>
    </div>
  );
}

const CHIPS = [
  { id: 'all', label: 'All tools' },
  ...CATEGORIES.map(c => ({ id: c.id, label: c.label })),
];

export default function ToolsDirectory() {
  const [active, setActive] = useState('all');

  const visible = active === 'all'
    ? CATEGORIES
    : CATEGORIES.filter(c => c.id === active);

  return (
    <section id="tools" className="py-16 px-5 sm:px-8 border-t border-line">
      <div className="max-w-[1100px] mx-auto">

        <div className="mb-10">
          <h2 className="text-[26px] sm:text-[32px] font-bold tracking-[-0.03em] text-ink leading-tight">
            Other Tools
          </h2>
          <p className="text-[14px] text-ink-2 mt-2">
            Explore other smart tools, career guides, and AI learning resources designed to help you stay ahead of AI and Saveyojob.
          </p>
        </div>

        {/* Filter chips */}
        <div className="flex gap-2 overflow-x-auto pb-1 mb-10 scrollbar-none">
          {CHIPS.map(chip => {
            const isActive = chip.id === active;
            return (
              <button
                key={chip.id}
                onClick={() => setActive(chip.id)}
                className={[
                  'shrink-0 text-[13px] font-medium py-2 px-4 rounded-lg border transition-colors duration-150 whitespace-nowrap',
                  isActive
                    ? 'border-fire bg-fire/[0.06] text-ink font-semibold'
                    : 'border-line bg-surface-2 text-ink-2 hover:border-line-2 hover:text-ink',
                ].join(' ')}
              >
                {chip.label}
              </button>
            );
          })}
        </div>

        {visible.map(cat => (
          <CategorySection key={cat.id} category={cat} />
        ))}

      </div>
    </section>
  );
}
