import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Star, Clock, CheckCircle, Users, ExternalLink, ChevronRight } from 'lucide-react';
import Header from '../../../components/layout/Header';
import { AI_COURSES } from '../../../data/ai-courses';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://saveyojob.com';

export function generateStaticParams() {
  return AI_COURSES.map(c => ({ slug: c.id }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const course = AI_COURSES.find(c => c.id === slug);
  if (!course) return {};

  const title = `${course.title} Review — Is It Worth It? | Saveyojob.com`;
  const description = `${course.description} Rated ${course.rating}/5 by ${course.reviewCount} learners. ${course.price}.`;

  return {
    title,
    description,
    alternates: { canonical: `${siteUrl}/courses/${course.id}/` },
    openGraph: {
      title,
      description,
      url: `${siteUrl}/courses/${course.id}/`,
      type: 'website',
    },
  };
}

const LEVEL_STYLE: Record<string, { text: string; bg: string }> = {
  'Beginner':     { text: '#16A34A', bg: 'rgba(22,163,74,0.08)' },
  'Intermediate': { text: '#D97706', bg: 'rgba(217,119,6,0.08)' },
  'Advanced':     { text: '#7C3AED', bg: 'rgba(124,58,237,0.08)' },
};

export default async function CoursePage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const course = AI_COURSES.find(c => c.id === slug);
  if (!course) notFound();

  const related = AI_COURSES.filter(c => course.relatedIds.includes(c.id));
  const ls = LEVEL_STYLE[course.educationalLevel] ?? { text: '#6B7280', bg: 'rgba(107,114,128,0.08)' };

  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: course.title,
    description: course.longDescription,
    url: course.url,
    provider: {
      '@type': 'Organization',
      name: course.provider,
    },
    educationalLevel: course.educationalLevel,
    teaches: course.whatYouLearn,
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'online',
      duration: course.durationISO,
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
        description: course.price,
      },
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: course.rating,
      reviewCount: course.reviewCountRaw,
      bestRating: 5,
      worstRating: 1,
    },
    instructor: {
      '@type': 'Person',
      name: course.instructor,
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
      { '@type': 'ListItem', position: 2, name: 'AI Courses', item: `${siteUrl}/courses/` },
      { '@type': 'ListItem', position: 3, name: course.title, item: `${siteUrl}/courses/${course.id}/` },
    ],
  };

  return (
    <>
      <Header />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <main className="max-w-[860px] mx-auto px-5 sm:px-8 py-10">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-[12px] text-ink-3 mb-8">
          <Link href="/" className="hover:text-fire transition-colors">Home</Link>
          <ChevronRight size={12} />
          <Link href="/courses/" className="hover:text-fire transition-colors">AI Courses</Link>
          <ChevronRight size={12} />
          <span className="text-ink-2 truncate max-w-[200px] sm:max-w-none">{course.title}</span>
        </nav>

        {/* Course header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <img
              src={`https://www.google.com/s2/favicons?domain=${course.domain}&sz=32`}
              alt={course.platform}
              width={20}
              height={20}
              className="rounded-sm shrink-0"
            />
            <span className="text-[13px] text-ink-3 font-medium">{course.platform}</span>
            {course.highlight && (
              <span
                className="text-[10px] font-bold uppercase tracking-[0.07em] px-2 py-0.5 rounded"
                style={{ background: 'rgba(12,82,109,0.09)', color: 'var(--color-fire)' }}
              >
                {course.highlight}
              </span>
            )}
          </div>

          <h1 className="text-[30px] sm:text-[38px] font-bold text-ink tracking-[-0.03em] leading-tight mb-3">
            {course.title}
          </h1>
          <p className="text-[15px] text-ink-2 mb-6">by {course.provider}</p>

          <p className="text-[16px] text-ink-2 leading-relaxed max-w-[680px] mb-7">
            {course.longDescription}
          </p>

          {/* Stats row */}
          <div className="flex flex-wrap gap-4 mb-7">
            <div className="flex items-center gap-1.5">
              <Star size={15} style={{ fill: '#F59E0B', color: '#F59E0B' }} />
              <span className="text-[15px] font-bold text-ink">{course.rating}</span>
              <span className="text-[13px] text-ink-3">({course.reviewCount} reviews)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock size={14} className="text-ink-3" />
              <span className="text-[13px] text-ink-2">{course.duration}</span>
            </div>
            <span
              className="text-[11px] font-bold uppercase tracking-[0.07em] px-2.5 py-1 rounded"
              style={{ color: ls.text, background: ls.bg }}
            >
              {course.educationalLevel}
            </span>
            <span className="text-[13px] font-semibold" style={{ color: '#16A34A' }}>
              {course.price}
            </span>
          </div>

          {/* Enroll CTA */}
          <a
            href={course.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-fire text-bg text-[15px] font-bold rounded-xl hover:brightness-105 transition-all"
          >
            Enroll for free
            <ExternalLink size={14} />
          </a>
        </div>

        <div className="grid sm:grid-cols-[1fr_280px] gap-8 mb-12">

          {/* Left column */}
          <div className="space-y-8">

            {/* What you'll learn */}
            <div className="p-6 bg-surface border border-line rounded-xl">
              <h2 className="text-[18px] font-bold text-ink mb-4">What you will learn</h2>
              <ul className="space-y-3">
                {course.whatYouLearn.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle size={16} className="shrink-0 mt-0.5" style={{ color: '#16A34A' }} />
                    <span className="text-[14px] text-ink-2 leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Who is it for */}
            <div className="p-6 bg-surface border border-line rounded-xl">
              <h2 className="text-[18px] font-bold text-ink mb-4">Who is this for</h2>
              <ul className="space-y-3">
                {course.whoIsItFor.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Users size={16} className="shrink-0 mt-0.5 text-ink-3" />
                    <span className="text-[14px] text-ink-2 leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Right column — Why we recommend it */}
          <div>
            <div className="p-5 bg-surface border border-line rounded-xl sticky top-6">
              <h2 className="text-[15px] font-bold text-ink mb-4">Why we recommend it</h2>
              <ul className="space-y-3 mb-6">
                {course.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span
                      className="text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center shrink-0 mt-0.5"
                      style={{ background: 'rgba(12,82,109,0.09)', color: 'var(--color-fire)' }}
                    >
                      {i + 1}
                    </span>
                    <span className="text-[13px] text-ink-2 leading-snug">{h}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-1.5 mb-5">
                {course.tags.map(tag => (
                  <span key={tag} className="text-[10px] px-2 py-0.5 border border-line rounded-full text-ink-3">
                    {tag}
                  </span>
                ))}
              </div>
              <a
                href={course.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full px-5 py-3 bg-fire text-bg text-[13px] font-bold rounded-xl hover:brightness-105 transition-all"
              >
                Start for free →
              </a>
            </div>
          </div>

        </div>

        {/* Related courses */}
        {related.length > 0 && (
          <div className="pt-8 border-t border-line">
            <h2 className="text-[20px] font-bold text-ink mb-5">Related courses</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {related.map(r => (
                <Link
                  key={r.id}
                  href={`/courses/${r.id}/`}
                  className="flex flex-col p-4 bg-surface border border-line rounded-xl hover:border-fire transition-all duration-150 group"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <img
                      src={`https://www.google.com/s2/favicons?domain=${r.domain}&sz=32`}
                      alt={r.platform}
                      width={16}
                      height={16}
                      className="rounded-sm shrink-0"
                    />
                    <span className="text-[11px] text-ink-3">{r.platform}</span>
                  </div>
                  <h3 className="text-[13px] font-semibold text-ink group-hover:text-fire transition-colors leading-snug mb-2 flex-1">
                    {r.title}
                  </h3>
                  <div className="flex items-center gap-1">
                    <Star size={10} style={{ fill: '#F59E0B', color: '#F59E0B' }} />
                    <span className="text-[11px] font-semibold text-ink">{r.rating}</span>
                    <span className="text-[11px] text-ink-3">· {r.duration}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="mt-12 text-center">
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
