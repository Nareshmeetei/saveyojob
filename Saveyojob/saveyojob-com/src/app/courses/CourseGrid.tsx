'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Star, Clock, Search, X } from 'lucide-react';
import { AI_COURSES, type AiCourse, type CourseTag, type JobCategory } from '../../data/ai-courses';

type LevelFilter = 'All' | CourseTag;
type JobFilter = 'All Jobs' | JobCategory;

const LEVEL_FILTERS: LevelFilter[] = ['All', 'Beginner', 'Prompt Engineering', 'Career Changer', 'Industry-Specific', 'Advanced'];

const JOB_FILTERS: { label: string; value: JobFilter }[] = [
  { label: 'All Jobs',          value: 'All Jobs'           },
  { label: 'Healthcare',        value: 'Healthcare'         },
  { label: 'Finance & Banking', value: 'Finance & Banking'  },
  { label: 'Marketing & Sales', value: 'Marketing & Sales'  },
  { label: 'Management',        value: 'Management'         },
  { label: 'Tech & Engineering',value: 'Tech & Engineering' },
  { label: 'Writing & Legal',   value: 'Writing & Legal'    },
  { label: 'HR & Admin',        value: 'HR & Admin'         },
];

export default function CourseGrid() {
  const [level, setLevel]   = useState<LevelFilter>('All');
  const [job, setJob]       = useState<JobFilter>('All Jobs');
  const [search, setSearch] = useState('');

  const q = search.trim().toLowerCase();

  const filtered = AI_COURSES.filter(course => {
    const levelOk = level === 'All' || course.tags.includes(level as CourseTag);
    const jobOk   = job === 'All Jobs'
      || course.jobCategories.length === 0
      || course.jobCategories.includes(job as JobCategory);
    const searchOk = !q
      || course.title.toLowerCase().includes(q)
      || course.provider.toLowerCase().includes(q)
      || course.description.toLowerCase().includes(q);
    return levelOk && jobOk && searchOk;
  });

  const isFiltered = level !== 'All' || job !== 'All Jobs' || q;

  function clearAll() {
    setLevel('All');
    setJob('All Jobs');
    setSearch('');
  }

  return (
    <div>

      {/* Search */}
      <div className="relative mb-5">
        <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-3 pointer-events-none" />
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search by title, provider, or topic…"
          className="w-full pl-9 pr-9 py-2.5 text-[13px] bg-surface border border-line rounded-xl text-ink placeholder:text-ink-3 focus:outline-none focus:border-fire transition-colors"
        />
        {search && (
          <button
            onClick={() => setSearch('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-3 hover:text-ink transition-colors"
          >
            <X size={14} />
          </button>
        )}
      </div>

      {/* Level filter */}
      <div className="mb-4">
        <p className="text-[11px] font-semibold text-ink-3 uppercase tracking-[0.08em] mb-2">Skill level</p>
        <div className="flex flex-wrap gap-2">
          {LEVEL_FILTERS.map(tag => (
            <button
              key={tag}
              onClick={() => setLevel(tag)}
              className={`px-3.5 py-1.5 text-[12px] font-medium rounded-full border transition-all duration-150 ${
                level === tag
                  ? 'bg-fire text-bg border-fire'
                  : 'bg-surface border-line text-ink-2 hover:border-fire hover:text-ink'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Job filter */}
      <div className="mb-7">
        <p className="text-[11px] font-semibold text-ink-3 uppercase tracking-[0.08em] mb-2">Your job type</p>
        <div className="flex flex-wrap gap-2">
          {JOB_FILTERS.map(({ label, value }) => (
            <button
              key={value}
              onClick={() => setJob(value)}
              className={`px-3.5 py-1.5 text-[12px] font-medium rounded-full border transition-all duration-150 ${
                job === value
                  ? 'bg-fire text-bg border-fire'
                  : 'bg-surface border-line text-ink-2 hover:border-fire hover:text-ink'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Count + clear */}
      <div className="flex items-center justify-between mb-5">
        <p className="text-[13px] text-ink-3">
          {filtered.length} of {AI_COURSES.length} courses
        </p>
        {isFiltered && (
          <button
            onClick={clearAll}
            className="text-[12px] text-ink-3 hover:text-fire transition-colors flex items-center gap-1"
          >
            <X size={11} />
            Clear filters
          </button>
        )}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-ink-3">
          <p className="text-[15px] mb-2">No courses match these filters.</p>
          <button onClick={clearAll} className="text-[13px] text-fire hover:underline">
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filtered.map(course => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      )}
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
          <span key={tag} className="text-[10px] px-2 py-0.5 border border-line rounded-full text-ink-3">
            {tag}
          </span>
        ))}
        {course.jobCategories.map(cat => (
          <span
            key={cat}
            className="text-[10px] px-2 py-0.5 rounded-full text-ink-3"
            style={{ background: 'rgba(12,82,109,0.07)', color: 'var(--color-fire)' }}
          >
            {cat}
          </span>
        ))}
      </div>

      <span className="text-[13px] font-semibold transition-colors" style={{ color: 'var(--color-fire)' }}>
        Learn more →
      </span>
    </Link>
  );
}
