import Link from 'next/link';
import { Star, Clock } from 'lucide-react';
import type { AiCourse } from '../../data/ai-courses';

export const LEVEL_STYLE: Record<string, React.CSSProperties> = {
  Beginner:     { color: '#16A34A', background: 'rgba(22,163,74,0.10)'   },
  Intermediate: { color: '#A37F0A', background: 'rgba(163,127,10,0.10)'  },
  Advanced:     { color: '#C45347', background: 'rgba(196,83,71,0.10)'   },
};

export default function CourseCard({ course }: { course: AiCourse }) {
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
          style={{ color: course.isFree ? '#097BA0' : 'var(--color-ink-2)' }}
        >
          {course.price}
        </span>
      </div>

      <div className="flex flex-wrap gap-1.5">
        <span
          className="inline-flex items-center text-[11px] font-semibold uppercase tracking-[0.06em] px-[10px] py-[4px] rounded-full"
          style={LEVEL_STYLE[course.educationalLevel] ?? { color: '#7AAAB8', background: 'rgba(122,170,184,0.10)' }}
        >
          {course.educationalLevel}
        </span>
        {course.jobCategories.map(cat => (
          <span
            key={cat}
            className="inline-flex items-center text-[10px] px-2 py-0.5 rounded-full"
            style={{ background: 'rgba(12,82,109,0.07)', color: 'var(--color-fire)' }}
          >
            {cat}
          </span>
        ))}
      </div>
    </Link>
  );
}
