import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '../../components/layout/Header';

export const metadata: Metadata = {
  title: 'Blog — AI, Jobs & the Future of Work',
  description:
    'Insights on AI automation, career risk, and how to reskill before it\'s too late.',
};

const COMING_SOON_POSTS = [
  {
    tag: 'Automation Risk',
    title: 'The 12 Job Categories Most Likely to Be Automated by 2028',
    summary:
      'An analysis of BLS occupation data crossed with AI capability benchmarks. The results are more nuanced — and more urgent — than the headlines suggest.',
  },
  {
    tag: 'Reskilling',
    title: 'Why Most "Learn AI" Advice Is Wrong for Your Situation',
    summary:
      'Generic course lists don\'t account for your current skills, your industry, or how much time you realistically have. Here\'s a better framework.',
  },
  {
    tag: 'Data',
    title: 'What 10,000 Roadmap Assessments Tell Us About Job Risk',
    summary:
      'Patterns from anonymized SaveYoJob assessments — which roles are more at-risk than people expect, and which are safer than the panic suggests.',
  },
  {
    tag: 'Skills',
    title: 'Prompt Engineering Is a Skill Floor, Not a Destination',
    summary:
      'Everyone can write prompts. The people who thrive are those who layer domain expertise on top of AI fluency — here\'s how to think about that.',
  },
];

export default function BlogPage() {
  return (
    <>
      <Header />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <div className="mb-12">
          <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-acid mb-3">
            Blog
          </div>
          <h1 className="text-[36px] font-bold text-paper tracking-tight leading-tight mb-4">
            AI, Jobs & the Future of Work
          </h1>
          <p className="text-[16px] text-paper-2 leading-relaxed">
            Analysis and practical advice on navigating automation — no hype, no panic.
          </p>
        </div>

        <div className="mb-8 p-5 bg-acid/[0.06] border border-acid/20 border-l-[3px] border-l-acid rounded-xl">
          <p className="text-[14px] text-paper-2 leading-relaxed">
            <strong className="text-paper">First articles publishing soon.</strong>{' '}
            We\'re writing pieces that are actually grounded in data — not recycled takes.
            Drop your email on the home page to get notified.
          </p>
        </div>

        <div className="space-y-4">
          {COMING_SOON_POSTS.map(post => (
            <div
              key={post.title}
              className="p-5 bg-ink-1 border border-wire rounded-xl opacity-60"
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-paper-3 bg-wire px-2 py-0.5 rounded">
                  {post.tag}
                </span>
                <span className="text-[10px] font-medium text-paper-4 uppercase tracking-[0.08em]">
                  Coming soon
                </span>
              </div>
              <h2 className="text-[15px] font-semibold text-paper mb-2">{post.title}</h2>
              <p className="text-[13px] text-paper-3 leading-relaxed">{post.summary}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-4 bg-acid text-ink text-[15px] font-bold rounded-xl hover:brightness-105 transition-all"
          >
            Check your job's risk score →
          </Link>
        </div>
      </main>
    </>
  );
}
