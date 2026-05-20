'use client';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';

// ── Roadmap data ──────────────────────────────────────────────────────────────

interface Phase {
  num: number;
  timeframe: string;
  title: string;
  goal: string;
  actions: string[];
}

const PHASES: Record<'high' | 'medium' | 'low', Phase[]> = {
  high: [
    {
      num: 1,
      timeframe: 'Weeks 1–4',
      title: 'Audit Your Exposure',
      goal: 'Understand exactly which tasks are at risk and what protects you today.',
      actions: [
        'List every recurring task and mark which follow a predictable, repeatable process',
        'Identify the 20% of your work that requires judgment, relationships, or physical presence',
        'Talk to your manager about how AI is changing the role\'s scope over the next 12 months',
        'Block 3–5 hours per week for learning — treat it as a mandatory work commitment',
      ],
    },
    {
      num: 2,
      timeframe: 'Months 2–3',
      title: 'Build AI Literacy',
      goal: 'Start using AI tools in your current role to become more productive and harder to replace.',
      actions: [
        'Complete the AI for Everyone course on Coursera (3 weeks, free to audit)',
        'Integrate one AI tool into your daily workflow — ChatGPT, Copilot, or a role-specific tool',
        'Document 3 measurable examples of AI making your work faster or better (managers notice this)',
        'Join a professional community where people share AI-in-your-role strategies',
      ],
    },
    {
      num: 3,
      timeframe: 'Months 4–6',
      title: 'Certify & Reposition',
      goal: 'Earn a credential that signals AI readiness and reposition your career narrative.',
      actions: [
        'Complete a role-relevant certificate — Google Data Analytics, IBM AI Foundations, or equivalent',
        'Update your resume and LinkedIn to lead with AI skills and measurable AI-enhanced results',
        'Apply for internal or external roles that need AI-augmented professionals in your field',
        'Build one portfolio project that shows AI + human judgment working together',
      ],
    },
  ],
  medium: [
    {
      num: 1,
      timeframe: 'Weeks 1–4',
      title: 'Find Your Edge',
      goal: "Identify which parts of your role AI can't replace and commit to deepening those.",
      actions: [
        'Map your recurring tasks: which are predictable, which require real judgment?',
        'Identify your 3 strongest uniquely-human contributions — relationships, creativity, complex decisions',
        'Test one AI tool in your workflow this week to understand what it can and can\'t do',
        'Set a clear skill target for the next 90 days',
      ],
    },
    {
      num: 2,
      timeframe: 'Months 2–3',
      title: 'Amplify Human + AI',
      goal: 'Add AI tools to your workflow while deepening skills AI cannot replicate.',
      actions: [
        'Complete a data or analytics course to strengthen evidence-based decision-making',
        'Learn to use AI as a first-draft tool — then apply your judgment to refine and own the output',
        'Take on one project that showcases strategic thinking or stakeholder management',
        'Stay current with AI adoption trends in your specific field through newsletters or communities',
      ],
    },
    {
      num: 3,
      timeframe: 'Months 4–6',
      title: 'Differentiate & Lead',
      goal: 'Position yourself as the person who brings AI + human excellence together.',
      actions: [
        'Earn a certification that signals both technical literacy and domain expertise',
        'Document your AI-enhanced wins and update your professional profiles',
        'Pursue a leadership or strategy project that reinforces your high-judgment value',
        'Mentor colleagues on AI tools — becoming the go-to AI resource in your team',
      ],
    },
  ],
  low: [
    {
      num: 1,
      timeframe: 'Weeks 1–4',
      title: 'Map the Landscape',
      goal: "Understand how AI is evolving in your field and identify your leverage points.",
      actions: [
        'Research how AI is being adopted in your industry and which adjacent roles it\'s displacing',
        'Identify 3 AI tools that could make you significantly more productive in your current role',
        'Assess where your skills give you a long-term advantage AI can\'t easily replicate',
        'Trial one AI tool seriously this month — go beyond the basics',
      ],
    },
    {
      num: 2,
      timeframe: 'Months 2–3',
      title: 'Adopt & Automate',
      goal: 'Integrate AI tools to do your best work faster and focus capacity on higher-value tasks.',
      actions: [
        'Integrate 2–3 AI tools into your workflow to automate the repetitive parts of your role',
        'Start a relevant technical course — Python, data analysis, or AI-in-your-field track',
        'Contribute to an AI-adjacent project or initiative in your organization',
        'Track time saved with AI and redirect it deliberately to high-judgment, high-impact work',
      ],
    },
    {
      num: 3,
      timeframe: 'Months 4–6',
      title: 'Lead With AI',
      goal: 'Position yourself as an AI-forward professional who can guide others.',
      actions: [
        'Complete a certification combining your domain expertise with AI skills',
        'Build a portfolio piece or case study showing AI-enhanced outcomes in your field',
        'Mentor colleagues on AI tools — becoming the known expert in your team',
        'Identify the career path where your unique combination of skills compounds most over time',
      ],
    },
  ],
};

const COURSES: Record<string, { title: string; platform: string; duration: string; rating: number; url: string }[]> = {
  data: [
    { title: 'Google Data Analytics Certificate',    platform: 'Coursera',        duration: '6 months', rating: 4.8, url: 'https://www.coursera.org/professional-certificates/google-data-analytics'            },
    { title: 'IBM Data Analyst Professional',         platform: 'Coursera',        duration: '5 months', rating: 4.6, url: 'https://www.coursera.org/professional-certificates/ibm-data-analyst'                 },
    { title: 'Microsoft Power BI Data Analyst',       platform: 'Coursera',        duration: '5 months', rating: 4.6, url: 'https://www.coursera.org/professional-certificates/microsoft-power-bi-data-analyst'   },
  ],
  support: [
    { title: 'AI for Everyone',                       platform: 'Coursera',        duration: '3 weeks',  rating: 4.8, url: 'https://www.coursera.org/learn/ai-for-everyone'                                      },
    { title: 'Salesforce Sales Development Rep',      platform: 'Coursera',        duration: '4 months', rating: 4.6, url: 'https://www.coursera.org/professional-certificates/sales-development-representative'   },
    { title: 'Google Digital Marketing & E-commerce', platform: 'Coursera',        duration: '6 months', rating: 4.8, url: 'https://www.coursera.org/professional-certificates/google-digital-marketing-ecommerce' },
  ],
  writing: [
    { title: 'ChatGPT Prompt Engineering',            platform: 'DeepLearning.AI', duration: '2 weeks',  rating: 4.9, url: 'https://www.deeplearning.ai/short-courses/chatgpt-prompt-engineering-for-developers/'  },
    { title: 'Google Digital Marketing & E-commerce', platform: 'Coursera',        duration: '6 months', rating: 4.8, url: 'https://www.coursera.org/professional-certificates/google-digital-marketing-ecommerce' },
    { title: 'Meta Social Media Marketing',           platform: 'Coursera',        duration: '7 months', rating: 4.8, url: 'https://www.coursera.org/professional-certificates/facebook-social-media-marketing'    },
  ],
  finance: [
    { title: 'Excel Skills for Business',             platform: 'Coursera',        duration: '6 months', rating: 4.9, url: 'https://www.coursera.org/specializations/excel'                                      },
    { title: 'Google Data Analytics Certificate',     platform: 'Coursera',        duration: '6 months', rating: 4.8, url: 'https://www.coursera.org/professional-certificates/google-data-analytics'            },
    { title: 'Microsoft Power BI Data Analyst',       platform: 'Coursera',        duration: '5 months', rating: 4.6, url: 'https://www.coursera.org/professional-certificates/microsoft-power-bi-data-analyst'   },
  ],
  sales: [
    { title: 'Google Digital Marketing & E-commerce', platform: 'Coursera',        duration: '6 months', rating: 4.8, url: 'https://www.coursera.org/professional-certificates/google-digital-marketing-ecommerce' },
    { title: 'Meta Social Media Marketing',           platform: 'Coursera',        duration: '7 months', rating: 4.8, url: 'https://www.coursera.org/professional-certificates/facebook-social-media-marketing'    },
    { title: 'AI for Everyone',                       platform: 'Coursera',        duration: '3 weeks',  rating: 4.8, url: 'https://www.coursera.org/learn/ai-for-everyone'                                      },
  ],
  ops: [
    { title: 'Google Project Management Certificate', platform: 'Coursera',        duration: '6 months', rating: 4.8, url: 'https://www.coursera.org/professional-certificates/google-project-management'        },
    { title: 'Supply Chain Management Spec.',         platform: 'Coursera',        duration: '4 months', rating: 4.7, url: 'https://www.coursera.org/specializations/supply-chain-management'                   },
    { title: 'AI for Everyone',                       platform: 'Coursera',        duration: '3 weeks',  rating: 4.8, url: 'https://www.coursera.org/learn/ai-for-everyone'                                      },
  ],
  legal: [
    { title: 'AI for Everyone',                       platform: 'Coursera',        duration: '3 weeks',  rating: 4.8, url: 'https://www.coursera.org/learn/ai-for-everyone'                                      },
    { title: 'Google Data Analytics Certificate',     platform: 'Coursera',        duration: '6 months', rating: 4.8, url: 'https://www.coursera.org/professional-certificates/google-data-analytics'            },
    { title: 'ChatGPT Prompt Engineering',            platform: 'DeepLearning.AI', duration: '2 weeks',  rating: 4.9, url: 'https://www.deeplearning.ai/short-courses/chatgpt-prompt-engineering-for-developers/'  },
  ],
  hr: [
    { title: 'People Analytics',                      platform: 'Coursera',        duration: '4 months', rating: 4.6, url: 'https://www.coursera.org/learn/wharton-people-analytics'                            },
    { title: 'AI for Everyone',                       platform: 'Coursera',        duration: '3 weeks',  rating: 4.8, url: 'https://www.coursera.org/learn/ai-for-everyone'                                      },
    { title: 'Google Project Management Certificate', platform: 'Coursera',        duration: '6 months', rating: 4.8, url: 'https://www.coursera.org/professional-certificates/google-project-management'        },
  ],
  design: [
    { title: 'Google UX Design Certificate',          platform: 'Coursera',        duration: '6 months', rating: 4.8, url: 'https://www.coursera.org/professional-certificates/google-ux-design'                },
    { title: 'ChatGPT Prompt Engineering',            platform: 'DeepLearning.AI', duration: '2 weeks',  rating: 4.9, url: 'https://www.deeplearning.ai/short-courses/chatgpt-prompt-engineering-for-developers/'  },
    { title: 'Meta Social Media Marketing',           platform: 'Coursera',        duration: '7 months', rating: 4.8, url: 'https://www.coursera.org/professional-certificates/facebook-social-media-marketing'    },
  ],
  research: [
    { title: 'Google Data Analytics Certificate',     platform: 'Coursera',        duration: '6 months', rating: 4.8, url: 'https://www.coursera.org/professional-certificates/google-data-analytics'            },
    { title: 'IBM Data Analyst Professional',         platform: 'Coursera',        duration: '5 months', rating: 4.6, url: 'https://www.coursera.org/professional-certificates/ibm-data-analyst'                 },
    { title: 'Microsoft Power BI Data Analyst',       platform: 'Coursera',        duration: '5 months', rating: 4.6, url: 'https://www.coursera.org/professional-certificates/microsoft-power-bi-data-analyst'   },
  ],
  realestate: [
    { title: 'Google Digital Marketing & E-commerce', platform: 'Coursera',        duration: '6 months', rating: 4.8, url: 'https://www.coursera.org/professional-certificates/google-digital-marketing-ecommerce' },
    { title: 'AI for Everyone',                       platform: 'Coursera',        duration: '3 weeks',  rating: 4.8, url: 'https://www.coursera.org/learn/ai-for-everyone'                                      },
    { title: 'Excel Skills for Business',             platform: 'Coursera',        duration: '6 months', rating: 4.9, url: 'https://www.coursera.org/specializations/excel'                                      },
  ],
  transport: [
    { title: 'Supply Chain Management Spec.',         platform: 'Coursera',        duration: '4 months', rating: 4.7, url: 'https://www.coursera.org/specializations/supply-chain-management'                   },
    { title: 'Google Project Management Certificate', platform: 'Coursera',        duration: '6 months', rating: 4.8, url: 'https://www.coursera.org/professional-certificates/google-project-management'        },
    { title: 'AI for Everyone',                       platform: 'Coursera',        duration: '3 weeks',  rating: 4.8, url: 'https://www.coursera.org/learn/ai-for-everyone'                                      },
  ],
  tech: [
    { title: 'Machine Learning Specialization',       platform: 'Coursera',        duration: '3 months', rating: 4.9, url: 'https://www.coursera.org/specializations/machine-learning-introduction'             },
    { title: 'Deep Learning Specialization',          platform: 'Coursera',        duration: '5 months', rating: 4.8, url: 'https://www.coursera.org/specializations/deep-learning'                            },
    { title: 'ChatGPT Prompt Engineering',            platform: 'DeepLearning.AI', duration: '2 weeks',  rating: 4.9, url: 'https://www.deeplearning.ai/short-courses/chatgpt-prompt-engineering-for-developers/'  },
  ],
  health: [
    { title: 'AI in Healthcare Specialization',       platform: 'Coursera',        duration: '4 months', rating: 4.7, url: 'https://www.coursera.org/specializations/ai-healthcare'                            },
    { title: 'Google Data Analytics Certificate',     platform: 'Coursera',        duration: '6 months', rating: 4.8, url: 'https://www.coursera.org/professional-certificates/google-data-analytics'            },
    { title: 'Python for Everybody Specialization',   platform: 'Coursera',        duration: '8 months', rating: 4.8, url: 'https://www.coursera.org/specializations/python'                                    },
  ],
  edu: [
    { title: 'AI for Everyone',                       platform: 'Coursera',        duration: '3 weeks',  rating: 4.8, url: 'https://www.coursera.org/learn/ai-for-everyone'                                      },
    { title: 'Google Project Management Certificate', platform: 'Coursera',        duration: '6 months', rating: 4.8, url: 'https://www.coursera.org/professional-certificates/google-project-management'        },
    { title: 'Google Digital Marketing & E-commerce', platform: 'Coursera',        duration: '6 months', rating: 4.8, url: 'https://www.coursera.org/professional-certificates/google-digital-marketing-ecommerce' },
  ],
  arch: [
    { title: 'Machine Learning Specialization',       platform: 'Coursera',        duration: '3 months', rating: 4.9, url: 'https://www.coursera.org/specializations/machine-learning-introduction'             },
    { title: 'Python for Everybody Specialization',   platform: 'Coursera',        duration: '8 months', rating: 4.8, url: 'https://www.coursera.org/specializations/python'                                    },
    { title: 'AI for Everyone',                       platform: 'Coursera',        duration: '3 weeks',  rating: 4.8, url: 'https://www.coursera.org/learn/ai-for-everyone'                                      },
  ],
  other: [
    { title: 'AI for Everyone',                       platform: 'Coursera',        duration: '3 weeks',  rating: 4.8, url: 'https://www.coursera.org/learn/ai-for-everyone'                                      },
    { title: 'Google Data Analytics Certificate',     platform: 'Coursera',        duration: '6 months', rating: 4.8, url: 'https://www.coursera.org/professional-certificates/google-data-analytics'            },
    { title: 'ChatGPT Prompt Engineering',            platform: 'DeepLearning.AI', duration: '2 weeks',  rating: 4.9, url: 'https://www.deeplearning.ai/short-courses/chatgpt-prompt-engineering-for-developers/'  },
  ],
};

const JOB_LABELS: Record<string, string> = {
  data: 'Data Entry & Admin', support: 'Customer Service', writing: 'Writing & Content',
  finance: 'Finance & Accounting', sales: 'Sales & Marketing', ops: 'Operations & Logistics',
  legal: 'Legal & Paralegal', hr: 'HR & Recruiting', design: 'Graphic & UI Design',
  tech: 'Software Development', health: 'Healthcare & Medical', edu: 'Education & Teaching',
  arch: 'Architecture & Engineering', research: 'Market Research',
};

function ScoreRing({ score, color }: { score: number; color: string }) {
  const SIZE   = 96;
  const SW     = 6;
  const R      = (SIZE - SW) / 2;
  const C      = 2 * Math.PI * R;
  const offset = C * (1 - score / 100);

  return (
    <div className="relative shrink-0" style={{ width: SIZE, height: SIZE }}>
      <svg width={SIZE} height={SIZE} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={SIZE / 2} cy={SIZE / 2} r={R}
          fill="none" stroke="#D1D5DB" strokeWidth={SW} />
        <motion.circle cx={SIZE / 2} cy={SIZE / 2} r={R}
          fill="none" stroke={color} strokeWidth={SW}
          strokeLinecap="round"
          strokeDasharray={C}
          initial={{ strokeDashoffset: C }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center leading-none">
        <span className="text-[34px] font-extrabold tracking-[-0.03em] tabular-nums"
          style={{ color }}>{score}</span>
        <span className="text-[10px] text-ink-3 mt-0.5">/ 100</span>
      </div>
    </div>
  );
}

function riskLevel(score: number): 'high' | 'medium' | 'low' {
  if (score >= 70) return 'high';
  if (score >= 40) return 'medium';
  return 'low';
}

function riskDisplay(score: number) {
  if (score >= 70) return { text: 'High Risk',    color: '#DC2626', bg: 'rgba(220,38,38,0.09)'   };
  if (score >= 40) return { text: 'Medium Risk',  color: '#D97706', bg: 'rgba(217,119,6,0.08)'   };
  return                   { text: 'Lower Risk',  color: '#16A34A', bg: 'rgba(22,163,74,0.08)'   };
}

const PHASE_COLORS = ['#0C526D', '#D97706', '#16A34A'];

// ── Component ─────────────────────────────────────────────────────────────────

export default function RoadmapClient() {
  const params = useSearchParams();
  const jobId  = params.get('job')   ?? 'other';
  const score  = Number(params.get('score') ?? 65);

  const level    = riskLevel(score);
  const risk     = riskDisplay(score);
  const phases   = PHASES[level];
  const courses  = COURSES[jobId] ?? COURSES.other;
  const jobLabel = JOB_LABELS[jobId] ?? 'Your Role';

  return (
    <div className="min-h-screen bg-bg">
      {/* Minimal header */}
      <header className="sticky top-0 z-50 h-[52px] flex items-center justify-between px-5 sm:px-8 bg-surface/95 backdrop-blur-xl border-b border-line">
        <Link href="/" className="flex items-center">
          <img src="/saveyojob_logo02.svg" alt="Saveyojob" style={{ height: 32, width: 'auto' }} />
        </Link>
        <Link href="/#hero"
          className="flex items-center gap-1.5 text-[13px] font-medium text-ink-2 hover:text-ink transition-colors">
          <ArrowLeft size={14} strokeWidth={2} />
          Back to risk check
        </Link>
      </header>

      <main className="max-w-[720px] mx-auto px-5 sm:px-8 py-12">

        {/* Risk summary card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
          className="bg-surface border border-line rounded-xl overflow-hidden mb-10"
        >
          {score >= 70 && (
            <div className="px-6 py-3 flex items-center gap-2"
              style={{ background: 'rgba(220,38,38,0.07)', borderBottom: '1px solid rgba(220,38,38,0.15)' }}>
              <div className="relative w-3 h-3 flex items-center justify-center shrink-0">
                <motion.div className="absolute w-3 h-3 rounded-full"
                  style={{ background: '#DC2626' }}
                  animate={{ scale: [0.4, 1, 2.2], opacity: [0, 0.55, 0] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut', times: [0, 0.25, 1] }}
                />
                <motion.div className="absolute w-3 h-3 rounded-full"
                  style={{ background: '#DC2626' }}
                  animate={{ scale: [0.4, 1, 2.2], opacity: [0, 0.55, 0] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut', times: [0, 0.25, 1], delay: 1.1 }}
                />
                <motion.div className="w-2 h-2 rounded-full"
                  style={{ background: '#DC2626' }}
                  animate={{ opacity: [1, 0.65, 1] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-[0.12em]" style={{ color: '#DC2626' }}>
                High Risk — Immediate Action Required
              </span>
            </div>
          )}
          <div className="px-6 py-5 flex items-center gap-5">
            <ScoreRing score={score} color={risk.color} />
            <div>
              <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-ink-3 mb-2">{jobLabel}</div>
              <span className="inline-block text-[12px] font-bold uppercase tracking-[0.09em] px-3 py-1.5 rounded-full"
                style={{ color: risk.color, background: risk.bg }}>
                {risk.text}
              </span>
            </div>
            <div className="ml-auto text-right hidden sm:block">
              <div className="text-[12px] text-ink-3 leading-snug">Your 6-month<br />action plan below</div>
            </div>
          </div>
        </motion.div>

        {/* Section heading */}
        <div className="mb-8">
          <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-fire block mb-2">Your personalized roadmap</span>
          <h1 className="text-[26px] sm:text-[30px] font-bold tracking-[-0.03em] text-ink leading-tight">
            Your 6-Month Plan to Stay Employable
          </h1>
        </div>

        {/* Phases */}
        <div className="space-y-4 mb-12">
          {phases.map((phase, i) => (
            <motion.div
              key={phase.num}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 + i * 0.1, ease: [0.23, 1, 0.32, 1] }}
              className="bg-surface border border-line rounded-xl overflow-hidden"
            >
              {/* Phase header */}
              <div className="px-5 py-4 border-b border-line"
                style={{ borderLeftColor: PHASE_COLORS[i], borderLeftWidth: 3 }}>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-ink-3">
                      Phase {phase.num} · {phase.timeframe}
                    </span>
                    <h2 className="text-[16px] font-bold text-ink mt-0.5">{phase.title}</h2>
                  </div>
                  <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-[13px] font-bold"
                    style={{ background: PHASE_COLORS[i] + '14', color: PHASE_COLORS[i] }}>
                    {phase.num}
                  </div>
                </div>
                <p className="text-[12px] text-ink-3 mt-1.5 leading-relaxed">{phase.goal}</p>
              </div>

              {/* Actions */}
              <div className="px-5 py-4 space-y-3">
                {phase.actions.map((action, j) => (
                  <div key={j} className="flex gap-3 text-[13px] text-ink-2 leading-relaxed">
                    <CheckCircle2 size={15} strokeWidth={2} className="shrink-0 mt-0.5"
                      style={{ color: PHASE_COLORS[i] }} />
                    {action}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Course recommendations */}
        <div className="mb-10">
          <div className="flex items-center gap-4 mb-5">
            <span className="text-[15px] font-bold text-ink shrink-0">Recommended Courses</span>
            <div className="flex-1 h-px bg-line" />
          </div>
          <div className="space-y-2.5">
            {courses.map((c, i) => (
              <motion.a key={c.title}
                href={c.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.08 }}
                className="flex items-center gap-4 px-5 py-4 bg-surface border border-line rounded-xl hover:border-fire transition-colors duration-150"
              >
                <div className="flex-1 min-w-0">
                  <div className="text-[14px] font-semibold text-ink">{c.title}</div>
                  <div className="text-[12px] text-ink-3 mt-0.5">
                    {c.platform} · {c.duration} · ★ {c.rating}
                  </div>
                </div>
                <span className="text-[12px] font-bold text-fire shrink-0">Enroll →</span>
              </motion.a>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center py-8 border-t border-line">
          <p className="text-[13px] text-ink-3 mb-4">Ready to start? Phase 1 takes less than 30 minutes to plan.</p>
          <Link href="/"
            className="inline-block px-8 py-3.5 bg-fire text-bg font-bold text-[14px] rounded-xl hover:brightness-105 transition-all duration-150">
            Check another job category →
          </Link>
        </div>

      </main>
    </div>
  );
}
