'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Star, Clock } from 'lucide-react';
import { AI_COURSES, type AiCourse, type CourseTag } from '../../data/ai-courses';

type FilterTag = 'All' | CourseTag;

const FILTERS: FilterTag[] = ['All', 'Beginner', 'Prompt Engineering', 'Career Changer', 'Industry-Specific', 'Advanced'];

export default function CourseGrid() {
  const [active, setActive] = useState<FilterTag>('All');

  const filtered = active === 'All'
    ? AI_COURSES
    : AI_COURSES.filter(c => c.tags.includes(active as CourseTag));

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

function CourseCard({ course }: { course: AiCourse }) {
  return (
    <Link
      href={`/courses/${course.id}/`}
      className="flex flex-col p-5 bg-surface border border-line rounded-xl hover:border-fire transition-all duration-150 group"
    >
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

      <h3 className="text-[15px] font-bold text-ink group-hover:text-fire transition-colors leading-snug mb-1">
        {course.title}
      </h3>
      <p className="text-[12px] text-ink-3 mb-3">{course.provider}</p>

      <p className="text-[13px] text-ink-2 leading-relaxed flex-1 mb-4">{course.description}</p>

      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] text-ink-3 mb-4">
        <span className="flex items-center gap-1">
          <Star size={11} className="shrink-0" style={{ fill: '#F59E0B', color: '#F59E0B' }} />
          <span className="text-ink font-semibold">{course.rating}</span>
          <span>({course.reviewCount} reviews)</span>
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

      <span className="text-[13px] font-semibold transition-colors" style={{ color: 'var(--color-fire)' }}>
        Learn more →
      </span>
    </Link>
  );
}
