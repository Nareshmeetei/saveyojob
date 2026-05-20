import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '../../components/layout/Header';

export const metadata: Metadata = {
  title: 'Top AI Courses — Best Courses to Survive Automation',
  description:
    'Curated AI and reskilling courses to help you stay ahead of automation. Free and paid options, sorted by real-world usefulness.',
};

interface Course {
  title: string;
  provider: string;
  instructor?: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  price: 'Free' | 'Free to audit' | 'Paid';
  duration: string;
  description: string;
  url: string;
  featured?: boolean;
}

interface Category {
  id: string;
  label: string;
  tagline: string;
  courses: Course[];
}

const CATEGORIES: Category[] = [
  {
    id: 'start-here',
    label: 'Start Here',
    tagline: 'No coding, no math — just AI literacy every worker needs',
    courses: [
      {
        title: 'AI for Everyone',
        provider: 'Coursera / DeepLearning.AI',
        instructor: 'Andrew Ng',
        level: 'Beginner',
        price: 'Free to audit',
        duration: '6 hours',
        description:
          'The single best intro to AI for non-technical people. Covers what AI can and can\'t do, how to work alongside AI teams, and how to spot hype.',
        url: 'https://www.coursera.org',
        featured: true,
      },
      {
        title: 'Elements of AI',
        provider: 'University of Helsinki',
        level: 'Beginner',
        price: 'Free',
        duration: '10 hours',
        description:
          'University-designed AI literacy course. No programming required. Covers the concepts, capabilities, and societal impact of AI in plain language.',
        url: 'https://www.elementsofai.com',
      },
      {
        title: 'Google AI Essentials',
        provider: 'Google / Coursera',
        level: 'Beginner',
        price: 'Paid',
        duration: '10 hours',
        description:
          'Practical skills for using AI tools in everyday work — writing prompts, checking outputs, staying responsible. Certificate included.',
        url: 'https://grow.google/certificates',
      },
      {
        title: 'Microsoft AI Skills for Business Users',
        provider: 'Microsoft Learn',
        level: 'Beginner',
        price: 'Free',
        duration: 'Self-paced',
        description:
          'Short, focused modules on using Copilot, responsible AI, and AI concepts in a business setting. No account required.',
        url: 'https://learn.microsoft.com',
      },
    ],
  },
  {
    id: 'ai-tools',
    label: 'AI Tools for Your Job',
    tagline: 'Use AI to get faster, not replaced',
    courses: [
      {
        title: 'ChatGPT Prompt Engineering for Developers',
        provider: 'DeepLearning.AI / OpenAI',
        level: 'Beginner',
        price: 'Free',
        duration: '1.5 hours',
        description:
          'Learn how to write effective prompts that actually work — for summarizing, classifying, writing, and building on top of LLMs.',
        url: 'https://www.deeplearning.ai',
        featured: true,
      },
      {
        title: 'AI Python for Beginners',
        provider: 'DeepLearning.AI',
        instructor: 'Andrew Ng',
        level: 'Beginner',
        price: 'Free',
        duration: '4 hours',
        description:
          'Learn Python specifically in the context of AI — writing scripts to automate tasks, work with APIs, and build small AI-powered tools.',
        url: 'https://www.deeplearning.ai',
      },
      {
        title: 'AI for Marketing Professionals',
        provider: 'HubSpot Academy',
        level: 'Beginner',
        price: 'Free',
        duration: '3 hours',
        description:
          'Practical AI skills for marketers: AI-assisted content creation, campaign analysis, and using AI tools inside marketing workflows.',
        url: 'https://academy.hubspot.com',
      },
      {
        title: 'GitHub Copilot Fundamentals',
        provider: 'GitHub / Microsoft Learn',
        level: 'Beginner',
        price: 'Free',
        duration: '2 hours',
        description:
          'How to use GitHub Copilot for code completion, writing tests, and explaining unfamiliar code. Essential for any developer.',
        url: 'https://learn.microsoft.com',
      },
    ],
  },
  {
    id: 'prompt-engineering',
    label: 'Prompt Engineering',
    tagline: 'The skill that makes every other skill more powerful',
    courses: [
      {
        title: 'Building Systems with the ChatGPT API',
        provider: 'DeepLearning.AI / OpenAI',
        level: 'Intermediate',
        price: 'Free',
        duration: '2 hours',
        description:
          'Goes beyond prompts — teaches you to chain LLM calls, build pipelines, and create real AI-powered workflows.',
        url: 'https://www.deeplearning.ai',
        featured: true,
      },
      {
        title: 'LangChain for LLM Application Development',
        provider: 'DeepLearning.AI',
        level: 'Intermediate',
        price: 'Free',
        duration: '3 hours',
        description:
          'Build apps that combine LLMs with memory, retrieval, and agents. The most-used framework in production AI apps right now.',
        url: 'https://www.deeplearning.ai',
      },
    ],
  },
  {
    id: 'data-analytics',
    label: 'Data & Analytics',
    tagline: 'Data literacy is table stakes in an AI-augmented workplace',
    courses: [
      {
        title: 'Google Data Analytics Certificate',
        provider: 'Google / Coursera',
        level: 'Beginner',
        price: 'Paid',
        duration: '6 months (part-time)',
        description:
          'The most accessible path into data analytics. Covers SQL, spreadsheets, Tableau, and R. Consistently leads to job offers.',
        url: 'https://grow.google/certificates',
        featured: true,
      },
      {
        title: 'IBM Data Science Professional Certificate',
        provider: 'IBM / Coursera',
        level: 'Intermediate',
        price: 'Paid',
        duration: '4 months (part-time)',
        description:
          'Covers Python, machine learning, SQL, and visualization tools. Strong for people aiming at data science or analyst roles.',
        url: 'https://www.coursera.org',
      },
      {
        title: 'Data Analysis with Python',
        provider: 'freeCodeCamp',
        level: 'Intermediate',
        price: 'Free',
        duration: '20 hours',
        description:
          'Hands-on Python for data manipulation and visualization — pandas, numpy, matplotlib. Free certification included.',
        url: 'https://www.freecodecamp.org',
      },
    ],
  },
  {
    id: 'machine-learning',
    label: 'Machine Learning & Deep Learning',
    tagline: 'For those who want to build, not just use',
    courses: [
      {
        title: 'Machine Learning Specialization',
        provider: 'Coursera / DeepLearning.AI',
        instructor: 'Andrew Ng',
        level: 'Intermediate',
        price: 'Free to audit',
        duration: '3 months (part-time)',
        description:
          'The gold standard ML course. Covers supervised/unsupervised learning, neural nets, and best practices. Updated for modern tooling.',
        url: 'https://www.coursera.org',
        featured: true,
      },
      {
        title: 'Practical Deep Learning for Coders',
        provider: 'fast.ai',
        level: 'Intermediate',
        price: 'Free',
        duration: '20+ hours',
        description:
          'Learn deep learning by building real things first, then understanding the theory. Highly practical approach, completely free.',
        url: 'https://www.fast.ai',
      },
      {
        title: 'Hugging Face NLP Course',
        provider: 'Hugging Face',
        level: 'Intermediate',
        price: 'Free',
        duration: '15 hours',
        description:
          'How to use Transformer models for NLP tasks. Directly applicable to working with LLMs, embeddings, and modern AI stacks.',
        url: 'https://huggingface.co/learn',
      },
    ],
  },
];

function levelColor(level: string) {
  if (level === 'Beginner') return 'text-acid bg-acid/10';
  if (level === 'Intermediate') return 'text-amber-400 bg-amber-400/10';
  return 'text-rust bg-rust/10';
}

function priceColor(price: string) {
  if (price === 'Free') return 'text-acid bg-acid/10';
  if (price === 'Free to audit') return 'text-paper-2 bg-wire';
  return 'text-paper-3 bg-wire';
}

function CourseCard({ course }: { course: Course }) {
  return (
    <div className={`relative p-5 rounded-xl border transition-all duration-150 hover:border-wire-2 group ${
      course.featured ? 'border-wire-2 bg-ink-2' : 'border-wire bg-ink-1'
    }`}>
      {course.featured && (
        <div className="absolute top-3 right-3 text-[9px] font-bold uppercase tracking-[0.12em] text-acid bg-acid/10 px-2 py-0.5 rounded">
          Top Pick
        </div>
      )}
      <div className="flex flex-wrap gap-2 mb-3">
        <span className={`text-[10px] font-bold uppercase tracking-[0.08em] px-2 py-0.5 rounded ${levelColor(course.level)}`}>
          {course.level}
        </span>
        <span className={`text-[10px] font-bold uppercase tracking-[0.08em] px-2 py-0.5 rounded ${priceColor(course.price)}`}>
          {course.price}
        </span>
        <span className="text-[10px] text-paper-3 px-2 py-0.5 rounded bg-wire">
          {course.duration}
        </span>
      </div>
      <h3 className="text-[15px] font-semibold text-paper mb-1 pr-16">
        {course.title}
      </h3>
      <p className="text-[12px] text-paper-3 mb-3">
        {course.provider}{course.instructor ? ` — ${course.instructor}` : ''}
      </p>
      <p className="text-[13px] text-paper-2 leading-relaxed mb-4">
        {course.description}
      </p>
      <a
        href={course.url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-acid hover:brightness-110 transition-all"
      >
        View course
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </a>
    </div>
  );
}

export default function CoursesPage() {
  return (
    <>
      <Header />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <div className="mb-12">
          <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-acid mb-3">
            Course Directory
          </div>
          <h1 className="text-[36px] font-bold text-paper tracking-tight leading-tight mb-4">
            Top AI Courses for the Future of Work
          </h1>
          <p className="text-[16px] text-paper-2 max-w-2xl leading-relaxed">
            Curated picks to help you stay ahead of automation — sorted by real-world usefulness,
            not prestige. Updated regularly.
          </p>
        </div>

        <div className="space-y-14">
          {CATEGORIES.map(cat => (
            <section key={cat.id} id={cat.id}>
              <div className="flex items-center gap-3 mb-1">
                <h2 className="text-[18px] font-bold text-paper">{cat.label}</h2>
              </div>
              <p className="text-[13px] text-paper-3 mb-5">{cat.tagline}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {cat.courses.map(course => (
                  <CourseCard key={course.title} course={course} />
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-14 p-6 bg-ink-1 border border-wire rounded-xl text-center">
          <p className="text-[14px] text-paper-2 mb-4">
            Not sure which courses matter for your specific job?
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-4 bg-acid text-ink text-[15px] font-bold rounded-xl hover:brightness-105 transition-all"
          >
            Get your personalized learning roadmap →
          </Link>
        </div>
      </main>
    </>
  );
}
