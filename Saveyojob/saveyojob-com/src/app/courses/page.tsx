import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '../../components/layout/Header';
import CourseGrid from './CourseGrid';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://saveyojob.com';

export const metadata: Metadata = {
  title: '20 Best AI Courses to Future-Proof Your Career',
  description:
    'Handpicked AI courses rated 4.6 stars or higher — from Google, Stanford, IBM, DeepLearning.AI, and Microsoft. All free or free to audit. Filter by skill level or career goal.',
  alternates: { canonical: `${siteUrl}/courses/` },
  openGraph: {
    title: '20 Best AI Courses to Future-Proof Your Career | Saveyojob.com',
    description:
      'The highest-rated AI courses from Google, Stanford, IBM, and DeepLearning.AI — handpicked for workers at risk of automation. All free or free to audit.',
    url: `${siteUrl}/courses/`,
    type: 'website',
  },
};

const SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: '20 Best AI Courses to Future-Proof Your Career',
  description:
    'Handpicked AI courses rated 4.6 stars or higher from Google, Stanford, IBM, DeepLearning.AI, and Microsoft — for workers who want to stay ahead of AI automation.',
  numberOfItems: 20,
  itemListElement: [
    { '@type': 'ListItem', position: 1,  name: 'AI for Everyone',                               url: 'https://www.coursera.org/learn/ai-for-everyone' },
    { '@type': 'ListItem', position: 2,  name: 'Generative AI for Everyone',                    url: 'https://www.coursera.org/learn/generative-ai-for-everyone' },
    { '@type': 'ListItem', position: 3,  name: 'Google AI Essentials',                          url: 'https://www.coursera.org/learn/google-ai-essentials' },
    { '@type': 'ListItem', position: 4,  name: 'ChatGPT Prompt Engineering for Developers',     url: 'https://www.deeplearning.ai/short-courses/chatgpt-prompt-engineering-for-developers/' },
    { '@type': 'ListItem', position: 5,  name: 'Prompt Engineering for ChatGPT',                url: 'https://www.coursera.org/learn/prompt-engineering' },
    { '@type': 'ListItem', position: 6,  name: 'Google Prompting Essentials',                   url: 'https://www.coursera.org/learn/google-prompting-essentials' },
    { '@type': 'ListItem', position: 7,  name: 'Introduction to Generative AI',                 url: 'https://cloudskillsboost.google/course_templates/536' },
    { '@type': 'ListItem', position: 8,  name: 'Elements of AI',                                url: 'https://www.elementsofai.com/' },
    { '@type': 'ListItem', position: 9,  name: 'Career Essentials in Generative AI',            url: 'https://www.linkedin.com/learning/paths/career-essentials-in-generative-ai-by-microsoft-and-linkedin' },
    { '@type': 'ListItem', position: 10, name: 'Generative AI with Large Language Models',      url: 'https://www.coursera.org/learn/generative-ai-with-llms' },
    { '@type': 'ListItem', position: 11, name: 'Machine Learning Specialization',               url: 'https://www.coursera.org/specializations/machine-learning-introduction' },
    { '@type': 'ListItem', position: 12, name: 'Deep Learning Specialization',                  url: 'https://www.coursera.org/specializations/deep-learning' },
    { '@type': 'ListItem', position: 13, name: 'IBM Applied AI Professional Certificate',       url: 'https://www.coursera.org/professional-certificates/applied-artifical-intelligence-ibm-watson-ai' },
    { '@type': 'ListItem', position: 14, name: 'AI Foundations for Everyone Specialization',    url: 'https://www.coursera.org/specializations/ai-foundations-for-everyone' },
    { '@type': 'ListItem', position: 15, name: 'TensorFlow Developer Professional Certificate', url: 'https://www.coursera.org/professional-certificates/tensorflow-in-practice' },
    { '@type': 'ListItem', position: 16, name: 'AI in Healthcare Specialization',               url: 'https://www.coursera.org/specializations/ai-healthcare' },
    { '@type': 'ListItem', position: 17, name: 'Natural Language Processing Specialization',    url: 'https://www.coursera.org/specializations/natural-language-processing' },
    { '@type': 'ListItem', position: 18, name: 'AI Product Management Specialization',          url: 'https://www.coursera.org/specializations/ai-product-management-duke' },
    { '@type': 'ListItem', position: 19, name: 'Introduction to Artificial Intelligence',       url: 'https://www.coursera.org/learn/introduction-to-ai' },
    { '@type': 'ListItem', position: 20, name: 'Building Systems with the ChatGPT API',         url: 'https://www.deeplearning.ai/short-courses/building-systems-with-chatgpt/' },
  ],
};

export default function CoursesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }}
      />
      <Header />
      <main className="max-w-[960px] mx-auto px-5 sm:px-8 py-12">

        <div className="mb-10">
          <h1 className="text-[34px] sm:text[42px] font-bold text-ink tracking-[-0.03em] leading-tight mb-4">
            20 AI Courses to Future-Proof Your Career
          </h1>
          <p className="text-[16px] text-ink-2 leading-relaxed max-w-[640px] mb-5">
            Every course here is rated 4.6 stars or higher, taught by Google, Stanford, IBM, Microsoft, or
            DeepLearning.AI, and chosen for workers who want to stay ahead of AI — not just learn about it.
          </p>
          <div className="flex flex-wrap gap-x-5 gap-y-2 text-[13px] text-ink-3">
            <span>4.6★ minimum rating</span>
            <span>·</span>
            <span>Google · Stanford · IBM · Microsoft · DeepLearning.AI</span>
            <span>·</span>
            <span>All free or free to audit</span>
          </div>
        </div>

        <CourseGrid />

        <div className="mt-16 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-4 bg-fire text-bg text-[15px] font-bold rounded-xl hover:brightness-105 transition-all"
          >
            See how at risk your job is →
          </Link>
        </div>

      </main>
    </>
  );
}
