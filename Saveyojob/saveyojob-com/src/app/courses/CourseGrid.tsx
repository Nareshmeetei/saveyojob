'use client';
import { useState } from 'react';
import { Star, Clock } from 'lucide-react';

type FilterTag = 'All' | 'Beginner' | 'Prompt Engineering' | 'Career Changer' | 'Industry-Specific' | 'Advanced';

interface Course {
  id: string;
  title: string;
  provider: string;
  platform: string;
  domain: string;
  url: string;
  rating: number;
  reviewCount: string;
  duration: string;
  price: string;
  isFree: boolean;
  description: string;
  tags: FilterTag[];
  highlight?: string;
}

const COURSES: Course[] = [
  {
    id: 'ai-for-everyone',
    title: 'AI for Everyone',
    provider: 'Andrew Ng / DeepLearning.AI',
    platform: 'Coursera',
    domain: 'coursera.org',
    url: 'https://www.coursera.org/learn/ai-for-everyone',
    rating: 4.8,
    reviewCount: '290K+ reviews',
    duration: '~6 hours',
    price: 'Free to audit',
    isFree: true,
    description: 'The best first AI course for anyone. Andrew Ng explains what AI can and cannot do — in plain language, no coding required.',
    tags: ['Beginner'],
    highlight: 'Best Starting Point',
  },
  {
    id: 'generative-ai-for-everyone',
    title: 'Generative AI for Everyone',
    provider: 'Andrew Ng / DeepLearning.AI',
    platform: 'Coursera',
    domain: 'coursera.org',
    url: 'https://www.coursera.org/learn/generative-ai-for-everyone',
    rating: 4.8,
    reviewCount: '20K+ reviews',
    duration: '~5 hours',
    price: 'Free to audit',
    isFree: true,
    description: 'Covers ChatGPT, Claude, and image AI — what they are, how to use them at work, and where they fall short.',
    tags: ['Beginner'],
    highlight: 'Most Relevant Right Now',
  },
  {
    id: 'google-ai-essentials',
    title: 'Google AI Essentials',
    provider: 'Google',
    platform: 'Coursera',
    domain: 'coursera.org',
    url: 'https://www.coursera.org/learn/google-ai-essentials',
    rating: 4.8,
    reviewCount: '40K+ reviews',
    duration: '~10 hours',
    price: 'Free (Google Certificate)',
    isFree: true,
    description: 'Practical guide to using AI tools in your daily work — writing, analysis, problem-solving — with a free Google certificate at the end.',
    tags: ['Beginner', 'Career Changer'],
    highlight: 'Free Google Certificate',
  },
  {
    id: 'chatgpt-prompt-engineering',
    title: 'ChatGPT Prompt Engineering for Developers',
    provider: 'DeepLearning.AI + OpenAI',
    platform: 'DeepLearning.AI',
    domain: 'deeplearning.ai',
    url: 'https://www.deeplearning.ai/short-courses/chatgpt-prompt-engineering-for-developers/',
    rating: 4.9,
    reviewCount: '150K+ enrolled',
    duration: '~1.5 hours',
    price: 'Free',
    isFree: true,
    description: 'Learn to write prompts that get much better results from AI. Done in an afternoon — and immediately useful at any job.',
    tags: ['Prompt Engineering'],
    highlight: 'Done in an Afternoon',
  },
  {
    id: 'prompt-engineering-chatgpt',
    title: 'Prompt Engineering for ChatGPT',
    provider: 'Vanderbilt University',
    platform: 'Coursera',
    domain: 'coursera.org',
    url: 'https://www.coursera.org/learn/prompt-engineering',
    rating: 4.8,
    reviewCount: '10K+ reviews',
    duration: '~17 hours',
    price: 'Free to audit',
    isFree: true,
    description: 'A full course on getting the most out of ChatGPT and other AI tools — practical patterns you can apply to your specific job right away.',
    tags: ['Prompt Engineering'],
  },
  {
    id: 'google-prompting-essentials',
    title: 'Google Prompting Essentials',
    provider: 'Google',
    platform: 'Coursera',
    domain: 'coursera.org',
    url: 'https://www.coursera.org/learn/google-prompting-essentials',
    rating: 4.8,
    reviewCount: '15K+ reviews',
    duration: '~5 hours',
    price: 'Free (Google Certificate)',
    isFree: true,
    description: "Google's guide to writing effective AI prompts — designed for anyone who uses AI tools at work, not just developers.",
    tags: ['Prompt Engineering', 'Beginner'],
    highlight: 'Free Google Certificate',
  },
  {
    id: 'intro-generative-ai-google',
    title: 'Introduction to Generative AI',
    provider: 'Google Cloud',
    platform: 'Google Cloud Skills Boost',
    domain: 'cloudskillsboost.google',
    url: 'https://cloudskillsboost.google/course_templates/536',
    rating: 4.7,
    reviewCount: '300K+ enrolled',
    duration: '~45 minutes',
    price: 'Free',
    isFree: true,
    description: 'A quick, clear overview of generative AI from Google — what it is, how it works, and how it differs from older AI. Done in under an hour.',
    tags: ['Beginner'],
    highlight: 'Done in Under an Hour',
  },
  {
    id: 'elements-of-ai',
    title: 'Elements of AI',
    provider: 'University of Helsinki + Reaktor',
    platform: 'Elements of AI',
    domain: 'elementsofai.com',
    url: 'https://www.elementsofai.com/',
    rating: 4.8,
    reviewCount: '1M+ enrolled',
    duration: '~15 hours',
    price: 'Free',
    isFree: true,
    description: 'A free, beginner-friendly course from the University of Helsinki. Over 1 million people have taken it — no math, no coding, just clear explanations.',
    tags: ['Beginner'],
    highlight: '1 Million People Took This',
  },
  {
    id: 'career-essentials-gen-ai',
    title: 'Career Essentials in Generative AI',
    provider: 'Microsoft + LinkedIn',
    platform: 'LinkedIn Learning',
    domain: 'linkedin.com',
    url: 'https://www.linkedin.com/learning/paths/career-essentials-in-generative-ai-by-microsoft-and-linkedin',
    rating: 4.7,
    reviewCount: '200K+ enrolled',
    duration: '~4 hours',
    price: 'Free (LinkedIn Certificate)',
    isFree: true,
    description: "Microsoft and LinkedIn's free course on using generative AI at work. Comes with a shareable LinkedIn certificate — great for your profile.",
    tags: ['Beginner', 'Career Changer'],
    highlight: 'Free LinkedIn Certificate',
  },
  {
    id: 'generative-ai-llms',
    title: 'Generative AI with Large Language Models',
    provider: 'AWS + DeepLearning.AI',
    platform: 'Coursera',
    domain: 'coursera.org',
    url: 'https://www.coursera.org/learn/generative-ai-with-llms',
    rating: 4.8,
    reviewCount: '8K+ reviews',
    duration: '~16 hours',
    price: 'Free to audit',
    isFree: true,
    description: 'Understand how large language models like ChatGPT are actually built and deployed — essential knowledge for anyone who wants to work with AI professionally.',
    tags: ['Advanced', 'Career Changer'],
  },
  {
    id: 'machine-learning-specialization',
    title: 'Machine Learning Specialization',
    provider: 'Andrew Ng, Stanford / DeepLearning.AI',
    platform: 'Coursera',
    domain: 'coursera.org',
    url: 'https://www.coursera.org/specializations/machine-learning-introduction',
    rating: 4.9,
    reviewCount: '18K+ reviews',
    duration: '~2 months',
    price: 'Free to audit',
    isFree: true,
    description: 'The most trusted machine learning course in the world, taught by the person who built the AI programs at Google and Baidu.',
    tags: ['Advanced', 'Career Changer'],
    highlight: 'Industry Gold Standard',
  },
  {
    id: 'deep-learning-specialization',
    title: 'Deep Learning Specialization',
    provider: 'DeepLearning.AI',
    platform: 'Coursera',
    domain: 'coursera.org',
    url: 'https://www.coursera.org/specializations/deep-learning',
    rating: 4.9,
    reviewCount: '120K+ reviews',
    duration: '~3 months',
    price: 'Free to audit',
    isFree: true,
    description: '5-course series on neural networks — the technology behind modern AI like ChatGPT and image recognition. Best taken after the Machine Learning Specialization.',
    tags: ['Advanced'],
  },
  {
    id: 'ibm-applied-ai',
    title: 'IBM Applied AI Professional Certificate',
    provider: 'IBM',
    platform: 'Coursera',
    domain: 'coursera.org',
    url: 'https://www.coursera.org/professional-certificates/applied-artifical-intelligence-ibm-watson-ai',
    rating: 4.6,
    reviewCount: '40K+ reviews',
    duration: '~5 months',
    price: 'Free to audit',
    isFree: true,
    description: 'A job-ready AI certificate from IBM — covers AI tools, hands-on projects, and how to apply AI in real business situations. Strong credential for a career shift.',
    tags: ['Career Changer'],
    highlight: 'Best for Career Changers',
  },
  {
    id: 'ibm-ai-foundations',
    title: 'AI Foundations for Everyone Specialization',
    provider: 'IBM',
    platform: 'Coursera',
    domain: 'coursera.org',
    url: 'https://www.coursera.org/specializations/ai-foundations-for-everyone',
    rating: 4.7,
    reviewCount: '50K+ reviews',
    duration: '~3 months',
    price: 'Free to audit',
    isFree: true,
    description: "IBM's 3-course path covering AI basics, applied AI tools, and building AI apps — all without coding. A solid foundation for anyone making a career shift.",
    tags: ['Beginner', 'Career Changer'],
  },
  {
    id: 'tensorflow-developer',
    title: 'TensorFlow Developer Professional Certificate',
    provider: 'DeepLearning.AI',
    platform: 'Coursera',
    domain: 'coursera.org',
    url: 'https://www.coursera.org/professional-certificates/tensorflow-in-practice',
    rating: 4.7,
    reviewCount: '35K+ reviews',
    duration: '~5 months',
    price: 'Free to audit',
    isFree: true,
    description: "Hands-on AI development with TensorFlow — Google's main AI toolkit. Best for people already comfortable with Python who want to build AI systems.",
    tags: ['Advanced', 'Career Changer'],
  },
  {
    id: 'ai-healthcare',
    title: 'AI in Healthcare Specialization',
    provider: 'Stanford University',
    platform: 'Coursera',
    domain: 'coursera.org',
    url: 'https://www.coursera.org/specializations/ai-healthcare',
    rating: 4.7,
    reviewCount: '5K+ reviews',
    duration: '~4 months',
    price: 'Free to audit',
    isFree: true,
    description: 'Built for healthcare workers — covers how AI is changing diagnosis, treatment, and patient care. No coding required.',
    tags: ['Industry-Specific'],
    highlight: 'For Healthcare Workers',
  },
  {
    id: 'nlp-specialization',
    title: 'Natural Language Processing Specialization',
    provider: 'DeepLearning.AI',
    platform: 'Coursera',
    domain: 'coursera.org',
    url: 'https://www.coursera.org/specializations/natural-language-processing',
    rating: 4.8,
    reviewCount: '15K+ reviews',
    duration: '~4 months',
    price: 'Free to audit',
    isFree: true,
    description: 'Covers the AI that reads and writes human language — directly useful for writers, marketers, lawyers, HR professionals, and anyone whose job involves text.',
    tags: ['Industry-Specific', 'Advanced'],
    highlight: 'For Writers & Marketers',
  },
  {
    id: 'ai-product-management',
    title: 'AI Product Management Specialization',
    provider: 'Duke University',
    platform: 'Coursera',
    domain: 'coursera.org',
    url: 'https://www.coursera.org/specializations/ai-product-management-duke',
    rating: 4.7,
    reviewCount: '3K+ reviews',
    duration: '~4 months',
    price: 'Free to audit',
    isFree: true,
    description: 'For managers and team leads who need to run AI projects and talk to engineers. Teaches you how to make smart AI decisions — no coding needed.',
    tags: ['Industry-Specific', 'Career Changer'],
    highlight: 'For Managers & Team Leads',
  },
  {
    id: 'intro-to-ai-ibm',
    title: 'Introduction to Artificial Intelligence',
    provider: 'IBM',
    platform: 'Coursera',
    domain: 'coursera.org',
    url: 'https://www.coursera.org/learn/introduction-to-ai',
    rating: 4.7,
    reviewCount: '25K+ reviews',
    duration: '~9 hours',
    price: 'Free to audit',
    isFree: true,
    description: 'A solid, jargon-free introduction to AI concepts, tools, and career paths from IBM. Good first step before diving into more specialised courses.',
    tags: ['Beginner'],
  },
  {
    id: 'building-systems-chatgpt',
    title: 'Building Systems with the ChatGPT API',
    provider: 'DeepLearning.AI + OpenAI',
    platform: 'DeepLearning.AI',
    domain: 'deeplearning.ai',
    url: 'https://www.deeplearning.ai/short-courses/building-systems-with-chatgpt/',
    rating: 4.9,
    reviewCount: '80K+ enrolled',
    duration: '~2 hours',
    price: 'Free',
    isFree: true,
    description: 'Learn to automate multi-step tasks using ChatGPT — from checking emails to running workflows. Requires basic Python knowledge.',
    tags: ['Advanced'],
  },
];

const FILTERS: FilterTag[] = ['All', 'Beginner', 'Prompt Engineering', 'Career Changer', 'Industry-Specific', 'Advanced'];

export default function CourseGrid() {
  const [active, setActive] = useState<FilterTag>('All');

  const filtered = active === 'All'
    ? COURSES
    : COURSES.filter(c => c.tags.includes(active));

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-8">
        {FILTERS.map(tag => (
          <button
            key={tag}
            onClick={() => setActive(tag)}
            className={`px-4 py-1.5 text-[13px] font-medium rounded-full border transition-all duration-150 ${
              active === tag
                ? 'bg-fire text-bg border-fire'
                : 'bg-surface border-line text-ink-2 hover:border-fire hover:text-ink'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      <p className="text-[13px] text-ink-3 mb-6">
        {filtered.length} course{filtered.length !== 1 ? 's' : ''}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {filtered.map(course => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
}

function CourseCard({ course }: { course: Course }) {
  return (
    <div className="flex flex-col p-5 bg-surface border border-line rounded-xl hover:border-fire transition-all duration-150">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <img
            src={`https://www.google.com/s2/favicons?domain=${course.domain}&sz=32`}
            alt={course.platform}
            width={18}
            height={18}
            className="rounded-sm shrink-0"
          />
          <span className="text-[11px] text-ink-3 font-medium">{course.platform}</span>
        </div>
        {course.highlight && (
          <span
            className="text-[10px] font-bold uppercase tracking-[0.07em] px-2 py-0.5 rounded shrink-0"
            style={{ background: 'rgba(12,82,109,0.09)', color: 'var(--color-fire)' }}
          >
            {course.highlight}
          </span>
        )}
      </div>

      <h3 className="text-[15px] font-bold text-ink leading-snug mb-1">{course.title}</h3>
      <p className="text-[12px] text-ink-3 mb-3">{course.provider}</p>

      <p className="text-[13px] text-ink-2 leading-relaxed flex-1 mb-4">{course.description}</p>

      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] text-ink-3 mb-4">
        <span className="flex items-center gap-1">
          <Star size={11} className="shrink-0" style={{ fill: '#F59E0B', color: '#F59E0B' }} />
          <span className="text-ink font-semibold">{course.rating}</span>
          <span>({course.reviewCount})</span>
        </span>
        <span className="flex items-center gap-1">
          <Clock size={11} className="shrink-0" />
          {course.duration}
        </span>
        <span
          className="font-semibold"
          style={{ color: course.isFree ? '#16A34A' : 'var(--color-ink-2)' }}
        >
          {course.price}
        </span>
      </div>

      <div className="flex flex-wrap gap-1.5 mb-4">
        {course.tags.map(tag => (
          <span
            key={tag}
            className="text-[10px] px-2 py-0.5 border border-line rounded-full text-ink-3"
          >
            {tag}
          </span>
        ))}
      </div>

      <a
        href={course.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[13px] font-semibold transition-colors"
        style={{ color: 'var(--color-fire)' }}
      >
        Enroll →
      </a>
    </div>
  );
}
