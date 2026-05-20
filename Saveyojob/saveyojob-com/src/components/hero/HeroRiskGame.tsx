'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText, MessageSquare, PenLine, BookOpen, TrendingUp, Wrench,
  GraduationCap, Briefcase, Bot, Check, ChevronRight, RotateCcw,
  ChevronDown, FileUp, Scale, Users, Code2, Heart, Palette,
  BarChart2, Home, Truck, Building2,
  type LucideIcon,
} from 'lucide-react';

// ── Types ─────────────────────────────────────────────────────────────────────

type Phase = 'intro' | 'pick' | 'q1' | 'q2' | 'q3' | 'calc' | 'result' | 'resume_calc' | 'resume_result';
interface Job { id: string; label: string; risk: number; Icon: LucideIcon; color: string }
interface CourseRec { title: string; platform: string; rating: number; duration: string; tag?: string; url: string }

// ── Job categories ────────────────────────────────────────────────────────────

const JOBS: Job[] = [
  { id: 'data',    label: 'Data Entry & Admin',    risk: 94, Icon: FileText,      color: '#7B9FD4' },
  { id: 'support', label: 'Customer Service',       risk: 89, Icon: MessageSquare, color: '#5DADA8' },
  { id: 'writing', label: 'Writing & Content',      risk: 85, Icon: PenLine,       color: '#9B82CC' },
  { id: 'finance', label: 'Finance & Accounting',   risk: 83, Icon: BookOpen,      color: '#6AAE8A' },
  { id: 'sales',   label: 'Sales & Marketing',      risk: 76, Icon: TrendingUp,    color: '#C98B6A' },
  { id: 'ops',     label: 'Operations & Logistics', risk: 72, Icon: Wrench,        color: '#B47898' },
];

const OTHER_JOBS: Job[] = [
  { id: 'legal',     label: 'Legal & Paralegal',      risk: 71, Icon: Scale,     color: '#DC2626' },
  { id: 'hr',        label: 'HR & Recruiting',         risk: 68, Icon: Users,     color: '#B45309' },
  { id: 'design',    label: 'Graphic & UI Design',     risk: 65, Icon: Palette,   color: '#B45309' },
  { id: 'research',  label: 'Market Research',         risk: 72, Icon: BarChart2, color: '#DC2626' },
  { id: 'realestate',label: 'Real Estate',             risk: 58, Icon: Home,      color: '#B45309' },
  { id: 'transport', label: 'Transport & Logistics',   risk: 65, Icon: Truck,     color: '#B45309' },
  { id: 'tech',      label: 'Software Development',    risk: 35, Icon: Code2,     color: '#0369A1' },
  { id: 'health',    label: 'Healthcare & Medical',    risk: 28, Icon: Heart,     color: '#0369A1' },
  { id: 'edu',       label: 'Education & Teaching',    risk: 45, Icon: GraduationCap, color: '#B45309' },
  { id: 'arch',      label: 'Architecture & Eng.',     risk: 42, Icon: Building2, color: '#B45309' },
];

// ── Course recommendations ─────────────────────────────────────────────────────

const COURSES: Record<string, CourseRec[]> = {
  data: [
    { title: 'Google Data Analytics Certificate',    platform: 'Coursera',        rating: 4.8, duration: '6 months', tag: 'Most Popular', url: 'https://www.coursera.org/professional-certificates/google-data-analytics'           },
    { title: 'IBM Data Analyst Professional',         platform: 'Coursera',        rating: 4.6, duration: '5 months', tag: 'High Impact',  url: 'https://www.coursera.org/professional-certificates/ibm-data-analyst'                },
    { title: 'Microsoft Power BI Data Analyst',       platform: 'Coursera',        rating: 4.6, duration: '5 months',                      url: 'https://www.coursera.org/professional-certificates/microsoft-power-bi-data-analyst'  },
  ],
  support: [
    { title: 'AI for Everyone',                       platform: 'Coursera',        rating: 4.8, duration: '3 weeks',  tag: 'Best Start',   url: 'https://www.coursera.org/learn/ai-for-everyone'                                     },
    { title: 'Salesforce Sales Development Rep',      platform: 'Coursera',        rating: 4.6, duration: '4 months', tag: 'High Demand',  url: 'https://www.coursera.org/professional-certificates/sales-development-representative'  },
    { title: 'Google Digital Marketing & E-commerce', platform: 'Coursera',        rating: 4.8, duration: '6 months',                      url: 'https://www.coursera.org/professional-certificates/google-digital-marketing-ecommerce'},
  ],
  writing: [
    { title: 'ChatGPT Prompt Engineering',            platform: 'DeepLearning.AI', rating: 4.9, duration: '2 weeks',  tag: 'Fastest Win',  url: 'https://www.deeplearning.ai/short-courses/chatgpt-prompt-engineering-for-developers/' },
    { title: 'Google Digital Marketing & E-commerce', platform: 'Coursera',        rating: 4.8, duration: '6 months', tag: 'Most Popular', url: 'https://www.coursera.org/professional-certificates/google-digital-marketing-ecommerce' },
    { title: 'Meta Social Media Marketing',           platform: 'Coursera',        rating: 4.8, duration: '7 months',                      url: 'https://www.coursera.org/professional-certificates/facebook-social-media-marketing'   },
  ],
  finance: [
    { title: 'Excel Skills for Business',             platform: 'Coursera',        rating: 4.9, duration: '6 months', tag: 'Essential',    url: 'https://www.coursera.org/specializations/excel'                                     },
    { title: 'Google Data Analytics Certificate',     platform: 'Coursera',        rating: 4.8, duration: '6 months', tag: 'High Impact',  url: 'https://www.coursera.org/professional-certificates/google-data-analytics'           },
    { title: 'Microsoft Power BI Data Analyst',       platform: 'Coursera',        rating: 4.6, duration: '5 months',                      url: 'https://www.coursera.org/professional-certificates/microsoft-power-bi-data-analyst'  },
  ],
  sales: [
    { title: 'Google Digital Marketing & E-commerce', platform: 'Coursera',        rating: 4.8, duration: '6 months', tag: 'Most Popular', url: 'https://www.coursera.org/professional-certificates/google-digital-marketing-ecommerce' },
    { title: 'Meta Social Media Marketing',           platform: 'Coursera',        rating: 4.8, duration: '7 months',                      url: 'https://www.coursera.org/professional-certificates/facebook-social-media-marketing'   },
    { title: 'AI for Everyone',                       platform: 'Coursera',        rating: 4.8, duration: '3 weeks',  tag: 'Best Start',   url: 'https://www.coursera.org/learn/ai-for-everyone'                                     },
  ],
  ops: [
    { title: 'Google Project Management Certificate', platform: 'Coursera',        rating: 4.8, duration: '6 months', tag: 'High Demand',  url: 'https://www.coursera.org/professional-certificates/google-project-management'       },
    { title: 'Supply Chain Management Spec.',         platform: 'Coursera',        rating: 4.7, duration: '4 months',                      url: 'https://www.coursera.org/specializations/supply-chain-management'                  },
    { title: 'AI for Everyone',                       platform: 'Coursera',        rating: 4.8, duration: '3 weeks',  tag: 'Best Start',   url: 'https://www.coursera.org/learn/ai-for-everyone'                                     },
  ],
  legal: [
    { title: 'AI for Everyone',                       platform: 'Coursera',        rating: 4.8, duration: '3 weeks',  tag: 'Best Start',   url: 'https://www.coursera.org/learn/ai-for-everyone'                                     },
    { title: 'Google Data Analytics Certificate',     platform: 'Coursera',        rating: 4.8, duration: '6 months', tag: 'High Impact',  url: 'https://www.coursera.org/professional-certificates/google-data-analytics'           },
    { title: 'ChatGPT Prompt Engineering',            platform: 'DeepLearning.AI', rating: 4.9, duration: '2 weeks',  tag: 'Fastest Win',  url: 'https://www.deeplearning.ai/short-courses/chatgpt-prompt-engineering-for-developers/' },
  ],
  hr: [
    { title: 'People Analytics',                      platform: 'Coursera',        rating: 4.6, duration: '4 months', tag: 'High Impact',  url: 'https://www.coursera.org/learn/wharton-people-analytics'                           },
    { title: 'AI for Everyone',                       platform: 'Coursera',        rating: 4.8, duration: '3 weeks',  tag: 'Best Start',   url: 'https://www.coursera.org/learn/ai-for-everyone'                                     },
    { title: 'Google Project Management Certificate', platform: 'Coursera',        rating: 4.8, duration: '6 months',                      url: 'https://www.coursera.org/professional-certificates/google-project-management'       },
  ],
  design: [
    { title: 'Google UX Design Certificate',          platform: 'Coursera',        rating: 4.8, duration: '6 months', tag: 'Most Popular', url: 'https://www.coursera.org/professional-certificates/google-ux-design'               },
    { title: 'ChatGPT Prompt Engineering',            platform: 'DeepLearning.AI', rating: 4.9, duration: '2 weeks',  tag: 'Fastest Win',  url: 'https://www.deeplearning.ai/short-courses/chatgpt-prompt-engineering-for-developers/' },
    { title: 'Meta Social Media Marketing',           platform: 'Coursera',        rating: 4.8, duration: '7 months',                      url: 'https://www.coursera.org/professional-certificates/facebook-social-media-marketing'   },
  ],
  research: [
    { title: 'Google Data Analytics Certificate',     platform: 'Coursera',        rating: 4.8, duration: '6 months', tag: 'Most Popular', url: 'https://www.coursera.org/professional-certificates/google-data-analytics'           },
    { title: 'IBM Data Analyst Professional',         platform: 'Coursera',        rating: 4.6, duration: '5 months', tag: 'High Impact',  url: 'https://www.coursera.org/professional-certificates/ibm-data-analyst'                },
    { title: 'Microsoft Power BI Data Analyst',       platform: 'Coursera',        rating: 4.6, duration: '5 months',                      url: 'https://www.coursera.org/professional-certificates/microsoft-power-bi-data-analyst'  },
  ],
  realestate: [
    { title: 'Google Digital Marketing & E-commerce', platform: 'Coursera',        rating: 4.8, duration: '6 months', tag: 'High Impact',  url: 'https://www.coursera.org/professional-certificates/google-digital-marketing-ecommerce' },
    { title: 'AI for Everyone',                       platform: 'Coursera',        rating: 4.8, duration: '3 weeks',  tag: 'Best Start',   url: 'https://www.coursera.org/learn/ai-for-everyone'                                     },
    { title: 'Excel Skills for Business',             platform: 'Coursera',        rating: 4.9, duration: '6 months', tag: 'Essential',    url: 'https://www.coursera.org/specializations/excel'                                     },
  ],
  transport: [
    { title: 'Supply Chain Management Spec.',         platform: 'Coursera',        rating: 4.7, duration: '4 months', tag: 'Essential',    url: 'https://www.coursera.org/specializations/supply-chain-management'                  },
    { title: 'Google Project Management Certificate', platform: 'Coursera',        rating: 4.8, duration: '6 months', tag: 'High Demand',  url: 'https://www.coursera.org/professional-certificates/google-project-management'       },
    { title: 'AI for Everyone',                       platform: 'Coursera',        rating: 4.8, duration: '3 weeks',  tag: 'Best Start',   url: 'https://www.coursera.org/learn/ai-for-everyone'                                     },
  ],
  tech: [
    { title: 'Machine Learning Specialization',       platform: 'Coursera',        rating: 4.9, duration: '3 months', tag: 'Top Rated',    url: 'https://www.coursera.org/specializations/machine-learning-introduction'            },
    { title: 'Deep Learning Specialization',          platform: 'Coursera',        rating: 4.8, duration: '5 months', tag: 'High Impact',  url: 'https://www.coursera.org/specializations/deep-learning'                           },
    { title: 'ChatGPT Prompt Engineering',            platform: 'DeepLearning.AI', rating: 4.9, duration: '2 weeks',  tag: 'Fastest Win',  url: 'https://www.deeplearning.ai/short-courses/chatgpt-prompt-engineering-for-developers/' },
  ],
  health: [
    { title: 'AI in Healthcare Specialization',       platform: 'Coursera',        rating: 4.7, duration: '4 months', tag: 'Growing Field',url: 'https://www.coursera.org/specializations/ai-healthcare'                           },
    { title: 'Google Data Analytics Certificate',     platform: 'Coursera',        rating: 4.8, duration: '6 months', tag: 'High Impact',  url: 'https://www.coursera.org/professional-certificates/google-data-analytics'           },
    { title: 'Python for Everybody Specialization',   platform: 'Coursera',        rating: 4.8, duration: '8 months',                      url: 'https://www.coursera.org/specializations/python'                                   },
  ],
  edu: [
    { title: 'AI for Everyone',                       platform: 'Coursera',        rating: 4.8, duration: '3 weeks',  tag: 'Best Start',   url: 'https://www.coursera.org/learn/ai-for-everyone'                                     },
    { title: 'Google Project Management Certificate', platform: 'Coursera',        rating: 4.8, duration: '6 months', tag: 'High Impact',  url: 'https://www.coursera.org/professional-certificates/google-project-management'       },
    { title: 'Google Digital Marketing & E-commerce', platform: 'Coursera',        rating: 4.8, duration: '6 months',                      url: 'https://www.coursera.org/professional-certificates/google-digital-marketing-ecommerce'},
  ],
  arch: [
    { title: 'Machine Learning Specialization',       platform: 'Coursera',        rating: 4.9, duration: '3 months', tag: 'Essential',    url: 'https://www.coursera.org/specializations/machine-learning-introduction'            },
    { title: 'Python for Everybody Specialization',   platform: 'Coursera',        rating: 4.8, duration: '8 months', tag: 'High Impact',  url: 'https://www.coursera.org/specializations/python'                                   },
    { title: 'AI for Everyone',                       platform: 'Coursera',        rating: 4.8, duration: '3 weeks',  tag: 'Best Start',   url: 'https://www.coursera.org/learn/ai-for-everyone'                                     },
  ],
  other: [
    { title: 'AI for Everyone',                       platform: 'Coursera',        rating: 4.8, duration: '3 weeks',  tag: 'Best Start',   url: 'https://www.coursera.org/learn/ai-for-everyone'                                     },
    { title: 'Google Data Analytics Certificate',     platform: 'Coursera',        rating: 4.8, duration: '6 months', tag: 'High Impact',  url: 'https://www.coursera.org/professional-certificates/google-data-analytics'           },
    { title: 'ChatGPT Prompt Engineering',            platform: 'DeepLearning.AI', rating: 4.9, duration: '2 weeks',  tag: 'Fastest Win',  url: 'https://www.deeplearning.ai/short-courses/chatgpt-prompt-engineering-for-developers/' },
  ],
};

const PLATFORM_ICON: Record<string, LucideIcon> = {
  'Coursera':          GraduationCap,
  'DeepLearning.AI':   Bot,
  'LinkedIn Learning': Briefcase,
};

const CALC_STEPS = [
  'Scanning automation exposure data…',
  'Analysing your task profile…',
  'Matching top-rated courses…',
];

const RESUME_CALC_STEPS = [
  'Identifying your job title and tasks…',
  'Scanning automation risk data…',
  'Calculating your personalized score…',
];

// ── Diagnostic questions ──────────────────────────────────────────────────────
// These directly measure what drives automation risk: work type + repetition.

const Q1_OPTS = [
  { value: 'data',    label: 'Data, analysis & reporting',          sub: 'Spreadsheets, documents, reconciliation', adj: +5 },
  { value: 'client',  label: 'Client relationships & communication', sub: 'Sales, account management, advising',     adj: -3 },
  { value: 'creative',label: 'Creative — writing, design, strategy', sub: 'Content creation, brand, ideation',       adj: -2 },
  { value: 'process', label: 'Processes, admin & coordination',      sub: 'Following procedures, scheduling, routing', adj: +6 },
];

const Q2_OPTS = [
  { value: 'high',   label: 'Most of it — I follow set processes',    sub: 'My tasks are predictable day-to-day',          adj: +8 },
  { value: 'medium', label: 'About half — routine mixed with judgment', sub: 'Some repetition, some novel situations',       adj: +2 },
  { value: 'low',    label: 'Rarely — every situation is different',   sub: 'My work requires continuous problem-solving',  adj: -5 },
];

const Q3_OPTS = [
  { value: 'stay',       label: 'AI-proof my current role',         sub: 'Stay in your field, future-proofed'       },
  { value: 'transition', label: "Find a career AI won't replace",   sub: 'Shift to a more resilient path'            },
  { value: 'ai',         label: 'Move into AI / tech',              sub: 'Build the future of work'                  },
  { value: 'understand', label: 'Just understand my risk',          sub: 'Information only, no commitment'           },
];

// ── Helpers ───────────────────────────────────────────────────────────────────

function riskMeta(score: number) {
  if (score >= 70) return {
    level:   'high' as const,
    text:    'High Risk',
    color:   '#DC2626',
    bg:      'rgba(220,38,38,0.09)',
    alarm:   true,
    why:     'The core tasks in your role are already being automated at scale. AI tools can perform them faster, cheaper, and without fatigue — and companies are actively deploying them now, not in five years.',
    actions: [
      'Identify the 20% of your work that requires real judgment or relationships — that\'s your protection',
      'Start using AI tools in your workflow this week to demonstrate AI literacy to your employer',
      'Begin an AI or data certificate within 30 days before headcount decisions accelerate',
    ],
    urgency: 'Companies in your sector are already cutting headcount in this role type. The window to act is 6–12 months.',
  };
  if (score >= 40) return {
    level:   'medium' as const,
    text:    'Medium Risk',
    color:   '#D97706',
    bg:      'rgba(217,119,6,0.08)',
    alarm:   false,
    why:     'Parts of your role are routine enough for AI to handle. The repetitive, process-heavy tasks are already being offloaded — but your judgment and client relationships offer real protection for now.',
    actions: [
      'Double down on the human skills AI can\'t replicate — strategic judgment, relationships, creativity',
      'Integrate AI tools into your daily workflow to become 2× more productive',
      'Use the next 12–18 months to earn a certification that signals AI-readiness to employers',
    ],
    urgency: 'You have 12–18 months to reposition before automation pressure accelerates. Use it proactively.',
  };
  return {
    level:   'low' as const,
    text:    'Lower Risk',
    color:   '#16A34A',
    bg:      'rgba(22,163,74,0.08)',
    alarm:   false,
    why:     "Your role relies on skills AI consistently struggles with — complex physical tasks, deep emotional intelligence, or multi-variable real-world judgment. You're in a strong position relative to automation risk.",
    actions: [
      'Use AI as a force multiplier — automate the routine parts and focus on high-judgment work',
      'Stay current with AI tools in your field to ensure you\'re ahead of peers, not behind',
      'Build AI skills now to command the premium salary that AI-augmented professionals earn',
    ],
    urgency: "You're well positioned. Stay ahead by adopting AI tools before they become table stakes in your field.",
  };
}

const phaseVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit:    { opacity: 0, y: -8 },
};
const phaseTrans = { duration: 0.22, ease: [0.23, 1, 0.32, 1] as const };

// ── Root component ────────────────────────────────────────────────────────────

export default function HeroRiskGame({ prefilledJobId }: { prefilledJobId?: string } = {}) {
  const allJobs = [...JOBS, ...OTHER_JOBS];
  const prefilledJob = prefilledJobId ? (allJobs.find(j => j.id === prefilledJobId) ?? null) : null;

  const fileRef = useRef<HTMLInputElement>(null);
  const [phase, setPhase]               = useState<Phase>(prefilledJob ? 'intro' : 'pick');
  const [job, setJob]                   = useState<Job | null>(null);
  const [workAdj, setWorkAdj]           = useState(0);
  const [repAdj, setRepAdj]             = useState(0);
  const [calcStep, setCalcStep]         = useState(0);
  const [score, setScore]               = useState(0);
  const [displayScore, setDisplayScore] = useState(0);
  const [goal, setGoal]                 = useState('understand');
  const [resumeJob, setResumeJob]       = useState<Job | null>(null);
  const [resumeFileName, setResumeFileName] = useState('');

  useEffect(() => {
    if (phase !== 'calc' && phase !== 'resume_calc') { setCalcStep(0); return; }
    const t1 = setTimeout(() => setCalcStep(1), 500);
    const t2 = setTimeout(() => setCalcStep(2), 1050);
    const t3 = setTimeout(() => setCalcStep(3), 1600);
    const t4 = setTimeout(() => setPhase(phase === 'calc' ? 'result' : 'resume_result'), 2250);
    return () => [t1, t2, t3, t4].forEach(clearTimeout);
  }, [phase]);

  useEffect(() => {
    if ((phase !== 'result' && phase !== 'resume_result') || score === 0) return;
    let frame: number;
    const start = performance.now();
    const dur = 1200;
    function tick(now: number) {
      const t = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplayScore(Math.round(eased * score));
      if (t < 1) frame = requestAnimationFrame(tick);
    }
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [phase, score]);

  function pickJob(j: Job) { setJob(j); setPhase('q1'); }

  function startPrefilled() {
    if (prefilledJob) { setJob(prefilledJob); setPhase('q1'); }
  }

  function answerQ1(adj: number) { setWorkAdj(adj); setPhase('q2'); }
  function answerQ2(adj: number) { setRepAdj(adj);  setPhase('q3'); }
  function answerQ3(goalValue: string) {
    setGoal(goalValue);
    setScore(Math.min(99, Math.max(15, job!.risk + workAdj + repAdj)));
    setPhase('calc');
  }

  function analyzeResume(fileName: string): Job {
    const lower = fileName.toLowerCase();
    if (lower.includes('data') || lower.includes('entry') || lower.includes('admin'))
      return { id: 'data',    label: 'Data Entry & Admin',    risk: 94, Icon: FileText,      color: '#1D4ED8' };
    if (lower.includes('account') || lower.includes('financ') || lower.includes('book'))
      return { id: 'finance', label: 'Finance & Accounting',  risk: 83, Icon: BookOpen,      color: '#065F46' };
    if (lower.includes('content') || lower.includes('writ') || lower.includes('copy') || lower.includes('editor'))
      return { id: 'writing', label: 'Writing & Content',     risk: 85, Icon: PenLine,       color: '#7C3AED' };
    if (lower.includes('support') || lower.includes('customer') || lower.includes('service'))
      return { id: 'support', label: 'Customer Service',      risk: 89, Icon: MessageSquare, color: '#0D9488' };
    if (lower.includes('market') || lower.includes('sales'))
      return { id: 'sales',   label: 'Sales & Marketing',     risk: 76, Icon: TrendingUp,    color: '#C2410C' };
    if (lower.includes('engineer') || lower.includes('dev') || lower.includes('software') || lower.includes('tech'))
      return { id: 'tech',    label: 'Software Development',  risk: 35, Icon: Code2,         color: '#0369A1' };
    if (lower.includes('nurse') || lower.includes('health') || lower.includes('medical'))
      return { id: 'health',  label: 'Healthcare & Medical',  risk: 28, Icon: Heart,         color: '#0369A1' };
    if (lower.includes('design') || lower.includes('ux') || lower.includes('graphic'))
      return { id: 'design',  label: 'Graphic & UI Design',   risk: 65, Icon: Palette,       color: '#B45309' };
    if (lower.includes('legal') || lower.includes('law') || lower.includes('paralegal'))
      return { id: 'legal',   label: 'Legal & Paralegal',     risk: 71, Icon: Scale,         color: '#DC2626' };
    if (lower.includes('hr') || lower.includes('human') || lower.includes('recruit'))
      return { id: 'hr',      label: 'HR & Recruiting',       risk: 68, Icon: Users,         color: '#B45309' };
    return   { id: 'other',   label: 'Professional Role',     risk: 62, Icon: FileText,      color: '#B45309' };
  }

  function processResume(file: File) {
    const detected = analyzeResume(file.name);
    setResumeJob(detected);
    setResumeFileName(file.name);
    setScore(detected.risk);
    setCalcStep(0);
    setPhase('resume_calc');
  }

  function goBack() {
    if      (phase === 'q1') { if (prefilledJob) { setPhase('intro'); } else { setJob(null); setPhase('pick'); } }
    else if (phase === 'q2') setPhase('q1');
    else if (phase === 'q3') setPhase('q2');
  }

  function reset() {
    setPhase(prefilledJob ? 'intro' : 'pick');
    setJob(null); setWorkAdj(0); setRepAdj(0);
    setScore(0); setDisplayScore(0); setCalcStep(0);
    setResumeJob(null); setResumeFileName('');
  }

  const stepNum = phase === 'q1' ? 1 : phase === 'q2' ? 2 : phase === 'q3' ? 3 : 0;

  return (
    <div className="w-full text-left">
      <input
        ref={fileRef}
        type="file"
        accept=".pdf,.doc,.docx,.txt"
        className="hidden"
        onChange={e => { const f = e.target.files?.[0]; if (f) processResume(f); e.target.value = ''; }}
      />
      <AnimatePresence mode="wait">
        <motion.div
          key={phase}
          variants={phaseVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={phaseTrans}
        >
          {/* Intro phase — compact single-button entry for job pages */}
          {phase === 'intro' && prefilledJob && (
            <IntroPhase job={prefilledJob} onStart={startPrefilled} onUploadClick={() => fileRef.current?.click()} />
          )}

          {/* Pick phase — no container, tiles float directly on page */}
          {phase === 'pick' && (
            <PickPhase onPick={pickJob} onUploadClick={() => fileRef.current?.click()} />
          )}

          {/* Question phases — light card */}
          {(phase === 'q1' || phase === 'q2' || phase === 'q3') && (
            <div className="bg-surface border border-line rounded-xl overflow-hidden">
              <QuestionPhase
                phase={phase} step={stepNum} job={job!}
                onQ1={answerQ1} onQ2={answerQ2} onQ3={answerQ3}
                onBack={goBack}
              />
            </div>
          )}

          {/* Calculating */}
          {phase === 'calc' && (
            <div className="bg-surface border border-line rounded-xl overflow-hidden">
              <CalcPhase job={job!} calcStep={calcStep} />
            </div>
          )}

          {/* Result */}
          {phase === 'result' && (
            <div className="bg-surface border border-line rounded-xl overflow-hidden">
              <ResultPhase job={job!} displayScore={displayScore} finalScore={score} goal={goal} onReset={reset} />
            </div>
          )}

          {/* Resume — calculating */}
          {phase === 'resume_calc' && resumeJob && (
            <div className="bg-surface border border-line rounded-xl overflow-hidden">
              <CalcPhase job={resumeJob} calcStep={calcStep} steps={RESUME_CALC_STEPS} subtitle={resumeFileName} />
            </div>
          )}

          {/* Resume — result */}
          {phase === 'resume_result' && resumeJob && (
            <div className="bg-surface border border-line rounded-xl overflow-hidden">
              <ResultPhase job={resumeJob} displayScore={displayScore} finalScore={score} goal={goal} onReset={reset} />
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// ── IntroPhase ────────────────────────────────────────────────────────────────

function IntroPhase({ job, onStart, onUploadClick }: { job: Job; onStart: () => void; onUploadClick: () => void }) {
  return (
    <div>
      <motion.button
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.97 }}
        onClick={onStart}
        className="w-full p-4 rounded-xl flex items-center justify-center cursor-pointer bg-fire hover:brightness-105 transition-all duration-150"
      >
        <span className="text-[14px] font-bold text-bg">Check my risk score</span>
      </motion.button>

      <div className="flex items-center gap-3 my-3">
        <div className="flex-1 h-px bg-line" />
        <span className="text-[12px] font-medium text-ink-3">Or</span>
        <div className="flex-1 h-px bg-line" />
      </div>

      <button
        onClick={onUploadClick}
        className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-line bg-surface text-[13px] font-semibold text-ink-2 hover:border-line-2 hover:text-ink transition-colors duration-150"
      >
        <FileUp size={15} strokeWidth={1.5} className="text-ink-3" />
        Upload your resume to calculate your score
      </button>
    </div>
  );
}

// ── PickPhase ─────────────────────────────────────────────────────────────────

function PickPhase({ onPick, onUploadClick }: { onPick: (j: Job) => void; onUploadClick: () => void }) {
  const [dropOpen, setDropOpen]           = useState(false);
  const [showOtherInput, setShowOtherInput] = useState(false);
  const [otherInput, setOtherInput]       = useState('');

  function handleOtherSubmit() {
    if (!otherInput.trim()) return;
    const customJob: Job = {
      id:    'other',
      label: otherInput.trim(),
      risk:  62,
      Icon:  FileText,
      color: '#B45309',
    };
    onPick(customJob);
    setDropOpen(false);
  }

  return (
    <div>
      {/* 6 main job tiles */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
        {JOBS.map((job, i) => (
          <JobTile key={job.id} job={job} index={i} onPick={onPick} />
        ))}
      </div>

      {/* Other categories dropdown */}
      <div className="relative mb-3">
        <button
          onClick={() => setDropOpen(v => !v)}
          className="w-full flex items-center justify-between px-4 py-3 rounded-xl border border-line bg-surface text-[13px] font-medium text-ink-2 hover:border-line-2 hover:text-ink transition-colors duration-150"
        >
          <span>Other job categories</span>
          <ChevronDown
            size={15} strokeWidth={2}
            className={`text-ink-3 transition-transform duration-200 ${dropOpen ? 'rotate-180' : ''}`}
          />
        </button>

        <AnimatePresence>
          {dropOpen && (
            <>
              {/* Backdrop */}
              <div className="fixed inset-0 z-10" onClick={() => setDropOpen(false)} />
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.15 }}
                className="absolute top-full left-0 right-0 mt-1.5 bg-surface border border-line rounded-xl shadow-lg z-20 overflow-hidden max-h-[300px] overflow-y-auto"
              >
                {OTHER_JOBS.map(j => {
                  const { Icon } = j;
                  return (
                    <button
                      key={j.id}
                      onClick={() => { onPick(j); setDropOpen(false); }}
                      className="w-full text-left px-4 py-3 hover:bg-surface-2 transition-colors flex items-center gap-2.5 border-b border-line group"
                    >
                      <Icon size={14} strokeWidth={1.5} style={{ color: j.color }} className="shrink-0" />
                      <span className="text-[13px] font-medium text-ink group-hover:text-fire transition-colors">{j.label}</span>
                    </button>
                  );
                })}

                {/* Other — manual job title input */}
                {!showOtherInput ? (
                  <button
                    onClick={() => setShowOtherInput(true)}
                    className="w-full text-left px-4 py-3 hover:bg-surface-2 transition-colors flex items-center gap-2.5"
                  >
                    <span className="text-[13px] font-medium text-ink-3 hover:text-fire">Other — type your job title</span>
                  </button>
                ) : (
                  <div className="p-3 space-y-2">
                    <input
                      type="text"
                      value={otherInput}
                      onChange={e => setOtherInput(e.target.value)}
                      onKeyDown={e => { if (e.key === 'Enter') handleOtherSubmit(); }}
                      placeholder="e.g. Financial Analyst, Nurse, Teacher…"
                      autoFocus
                      className="w-full px-3 py-2 text-[13px] border border-line rounded-lg bg-surface outline-none focus:border-fire placeholder:text-ink-3 text-ink"
                    />
                    <button
                      onClick={handleOtherSubmit}
                      disabled={!otherInput.trim()}
                      className="w-full py-2 bg-fire text-bg text-[13px] font-bold rounded-lg hover:brightness-105 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                    >
                      Check my risk →
                    </button>
                  </div>
                )}
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>

      {/* Or separator */}
      <div className="flex items-center gap-3 my-3">
        <div className="flex-1 h-px bg-line" />
        <span className="text-[12px] font-medium text-ink-3">Or</span>
        <div className="flex-1 h-px bg-line" />
      </div>

      {/* Resume upload */}
      <button
        onClick={onUploadClick}
        className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-line bg-surface text-[13px] font-semibold text-ink-2 hover:border-line-2 hover:text-ink transition-colors duration-150"
      >
        <FileUp size={15} strokeWidth={1.5} className="text-ink-3" />
        Upload your resume to calculate your score
      </button>
    </div>
  );
}

function JobTile({ job, index, onPick }: { job: Job; index: number; onPick: (j: Job) => void }) {
  const [hov, setHov] = useState(false);
  const { Icon } = job;

  return (
    <motion.button
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.06, ease: [0.23, 1, 0.32, 1] }}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97 }}
      onClick={() => onPick(job)}
      onHoverStart={() => setHov(true)}
      onHoverEnd={() => setHov(false)}
      className="text-left p-4 rounded-xl border flex flex-col gap-2.5 w-full cursor-pointer transition-colors duration-150"
      style={{
        borderColor: hov ? job.color + '55' : '#D1D5DB',
        background:  hov ? job.color + '06' : '#F2F2F2',
        boxShadow:   hov ? `0 4px 16px ${job.color}18` : 'none',
      }}
    >
      <Icon size={28} strokeWidth={3} style={{ color: job.color }} />
      <div className="text-[13px] font-bold text-ink leading-snug">{job.label}</div>
    </motion.button>
  );
}

// ── QuestionPhase ─────────────────────────────────────────────────────────────

interface QuestionPhaseProps {
  phase: 'q1' | 'q2' | 'q3';
  step: number;
  job: Job;
  onQ1: (adj: number) => void;
  onQ2: (adj: number) => void;
  onQ3: (goal: string) => void;
  onBack: () => void;
}

function QuestionPhase({ phase, step, job, onQ1, onQ2, onQ3, onBack }: QuestionPhaseProps) {
  const title =
    phase === 'q1' ? 'What does your day-to-day work involve most?' :
    phase === 'q2' ? 'How much of your work is routine or repeatable?' :
                    "What's your main goal right now?";

  const opts = phase === 'q1' ? Q1_OPTS : phase === 'q2' ? Q2_OPTS : Q3_OPTS;

  function handleSelect(i: number) {
    if (phase === 'q1') onQ1((Q1_OPTS[i] as typeof Q1_OPTS[number]).adj);
    else if (phase === 'q2') onQ2((Q2_OPTS[i] as typeof Q2_OPTS[number]).adj);
    else onQ3((Q3_OPTS[i] as typeof Q3_OPTS[number]).value);
  }

  return (
    <div className="p-5 sm:p-6">
      {/* Progress */}
      <div className="flex items-center gap-3 mb-6">
        <button onClick={onBack} className="text-[12px] text-ink-3 hover:text-ink-2 transition-colors shrink-0">
          ← Back
        </button>
        <div className="flex-1 flex gap-1.5">
          {[1, 2, 3].map(n => (
            <div key={n} className="flex-1 h-1 rounded-full transition-all duration-300"
              style={{ background: n <= step ? job.color : '#D1D5DB' }} />
          ))}
        </div>
        <span className="text-[11px] text-ink-3 shrink-0 tabular-nums">{step} / 3</span>
      </div>

      <h3 className="text-[18px] sm:text-[20px] font-bold text-ink mb-5 leading-snug">
        {title}
      </h3>

      <div className="flex flex-col gap-2">
        {opts.map((opt, i) => (
          <motion.button
            key={opt.value}
            whileHover={{ x: 3 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => handleSelect(i)}
            onMouseEnter={e => (e.currentTarget.style.borderColor = job.color + '55')}
            onMouseLeave={e => (e.currentTarget.style.borderColor = '#D1D5DB')}
            className="text-left p-4 rounded-xl border border-line bg-surface hover:bg-[rgba(12,82,109,0.03)] transition-all duration-150 group w-full"
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[14px] font-semibold text-ink">{opt.label}</div>
                {'sub' in opt && opt.sub && (
                  <div className="text-[12px] text-ink-3 mt-0.5">{opt.sub}</div>
                )}
              </div>
              <ChevronRight
                size={15} strokeWidth={2}
                className="text-ink-3 group-hover:text-fire transition-colors shrink-0 opacity-0 group-hover:opacity-100"
              />
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}

// ── CalcPhase ─────────────────────────────────────────────────────────────────

function CalcPhase({ job, calcStep, steps = CALC_STEPS, subtitle }: { job: Job; calcStep: number; steps?: string[]; subtitle?: string }) {
  return (
    <div className="p-6 sm:p-8 flex flex-col items-center justify-center text-center" style={{ minHeight: 260 }}>
      <div className="flex justify-center gap-1.5 mb-5">
        {[0, 1, 2].map(i => (
          <motion.div key={i} className="w-2 h-2 rounded-full" style={{ background: job.color }}
            animate={{ scale: [0.7, 1.25, 0.7], opacity: [0.35, 1, 0.35] }}
            transition={{ duration: 1.2, delay: i * 0.2, repeat: Infinity }}
          />
        ))}
      </div>
      <div className="text-[15px] font-bold text-ink mb-1">Calculating your risk score</div>
      <div className="text-[13px] text-ink-3 mb-7">{subtitle ?? job.label}</div>

      <div className="space-y-3 w-full max-w-[290px] text-left">
        {steps.map((s, i) => (
          <motion.div key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={calcStep > i ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
            transition={{ duration: 0.28 }}
            className="flex items-center gap-2.5 text-[13px] text-ink-2"
          >
            <span className="w-4 h-4 rounded-full flex items-center justify-center shrink-0"
              style={{ background: job.color + '18' }}>
              <Check size={9} strokeWidth={3} style={{ color: job.color }} />
            </span>
            {s}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ── ScoreRing ─────────────────────────────────────────────────────────────────

function ScoreRing({ score, color }: { score: number; color: string }) {
  const SIZE   = 96;
  const SW     = 6;
  const R      = (SIZE - SW) / 2;       // 45
  const C      = 2 * Math.PI * R;       // ~282.7
  const offset = C * (1 - score / 100);

  return (
    <div className="relative shrink-0" style={{ width: SIZE, height: SIZE }}>
      <svg width={SIZE} height={SIZE} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={SIZE / 2} cy={SIZE / 2} r={R}
          fill="none" stroke="#D1D5DB" strokeWidth={SW} />
        <circle cx={SIZE / 2} cy={SIZE / 2} r={R}
          fill="none" stroke={color} strokeWidth={SW}
          strokeLinecap="round"
          strokeDasharray={C}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 0.05s linear' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center leading-none">
        <span className="text-[34px] font-extrabold tracking-[-0.03em] tabular-nums"
          style={{ color }}>
          {score}
        </span>
        <span className="text-[10px] text-ink-3 mt-0.5">/ 100</span>
      </div>
    </div>
  );
}

// ── AlarmDot ──────────────────────────────────────────────────────────────────

function AlarmDot() {
  return (
    <div className="relative w-3.5 h-3.5 flex items-center justify-center shrink-0">
      <motion.div className="absolute rounded-full"
        style={{ width: 14, height: 14, background: '#DC2626' }}
        animate={{ scale: [0.4, 1, 2.2], opacity: [0, 0.55, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, times: [0, 0.25, 1], ease: 'easeOut' }}
      />
      <motion.div className="absolute rounded-full"
        style={{ width: 14, height: 14, background: '#DC2626' }}
        animate={{ scale: [0.4, 1, 2.2], opacity: [0, 0.55, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, times: [0, 0.25, 1], ease: 'easeOut', delay: 1.1 }}
      />
      <motion.div className="w-2.5 h-2.5 rounded-full shrink-0"
        style={{ background: '#DC2626' }}
        animate={{ opacity: [1, 0.6, 1] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}

// ── ResultPhase ───────────────────────────────────────────────────────────────

function ResultPhase({ job, displayScore, finalScore, goal, onReset }: {
  job: Job; displayScore: number; finalScore: number; goal: string; onReset: () => void;
}) {
  const meta = riskMeta(finalScore);
  const courses = COURSES[job.id] ?? [];
  const roadmapHref = `/roadmap?job=${job.id}&score=${finalScore}&goal=${goal}`;

  return (
    <div>
      {/* Alarm banner — high risk only */}
      {meta.alarm && (
        <div className="flex items-center gap-2.5 px-5 py-3"
          style={{ background: 'rgba(220,38,38,0.07)', borderBottom: '1px solid rgba(220,38,38,0.18)' }}>
          <AlarmDot />
          <span className="text-[11px] font-bold uppercase tracking-[0.12em]" style={{ color: '#DC2626' }}>
            Immediate Action Required
          </span>
        </div>
      )}

      <div className="p-5 sm:p-6">
        {/* Score row */}
        <div className="flex items-center gap-5 pb-5 mb-5 border-b border-line">
          <ScoreRing score={displayScore} color={meta.color} />
          <span className="ml-auto text-[11px] font-bold uppercase tracking-[0.09em] px-3 py-1.5 rounded-full shrink-0"
            style={{ color: meta.color, background: meta.bg }}>
            {meta.text}
          </span>
        </div>

        {/* Why */}
        <div className="mb-4 px-4 py-3.5 rounded-xl border"
          style={{ borderColor: meta.color + '30', borderLeftColor: meta.color, borderLeftWidth: 3, background: meta.bg }}>
          <div className="text-[10px] font-bold uppercase tracking-[0.14em] mb-1.5" style={{ color: meta.color }}>
            Why your role scores this
          </div>
          <p className="text-[12px] text-ink-2 leading-relaxed">{meta.why}</p>
        </div>

        {/* What to do */}
        <div className="mb-5">
          <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-ink-3 mb-2.5">
            What to do next
          </div>
          <div className="space-y-2">
            {meta.actions.map((action, i) => (
              <div key={i} className="flex gap-2.5 text-[12px] text-ink-2 leading-relaxed">
                <span className="shrink-0 w-4 h-4 rounded-full flex items-center justify-center mt-0.5 text-[9px] font-bold"
                  style={{ background: meta.color + '18', color: meta.color }}>
                  {i + 1}
                </span>
                {action}
              </div>
            ))}
          </div>
        </div>

        {/* Urgency */}
        <p className="text-[11px] font-semibold mb-5 leading-relaxed" style={{ color: meta.color }}>
          {meta.urgency}
        </p>

        {/* Courses */}
        <div className="mb-5 pt-4 border-t border-line">
          <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-ink-3 mb-2.5">
            Top courses for your situation
          </div>
          <div className="space-y-2">
            {courses.map((c, i) => {
              const PIcon = PLATFORM_ICON[c.platform] ?? BookOpen;
              return (
                <motion.a key={c.title}
                  href={c.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.09 }}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl border border-line bg-surface-2 hover:border-fire transition-colors duration-150"
                >
                  <PIcon size={15} strokeWidth={1.5} className="text-ink-3 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="text-[13px] font-semibold text-ink truncate">{c.title}</div>
                    <div className="text-[11px] text-ink-3 mt-0.5">
                      {c.platform} · {c.duration} · {c.rating}
                    </div>
                  </div>
                  <span className="text-[11px] font-bold text-fire shrink-0">Enroll →</span>
                </motion.a>
              );
            })}
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-2.5 mb-3">
          <a href={roadmapHref}
            className="flex-1 text-center py-3.5 rounded-xl bg-fire text-bg font-bold text-[14px] hover:brightness-105 transition-all duration-150">
            Get my full roadmap →
          </a>
          <a href="#tools"
            className="flex-1 text-center py-3.5 rounded-xl border border-line bg-surface text-ink font-semibold text-[14px] hover:border-line-2 hover:bg-surface-2 transition-all duration-150">
            Browse all tools
          </a>
        </div>

        <button onClick={onReset}
          className="w-full flex items-center justify-center gap-1.5 text-[12px] text-ink-3 hover:text-ink transition-colors py-1">
          <RotateCcw size={11} strokeWidth={2} />
          Try a different job category
        </button>
      </div>
    </div>
  );
}
