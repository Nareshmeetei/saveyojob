import type { RoadmapCourse } from '../../../lib/types/roadmap';

interface CourseCardsProps { courses: RoadmapCourse[]; occupationSlug?: string; }

export default function CourseCards({ courses }: CourseCardsProps) {
  return (
    <div className="flex flex-col gap-3">
      {courses.map((c, i) => (
        <a
          key={i}
          href={c.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-start gap-4 p-4 bg-surface-2 border border-line rounded-xl hover:border-fire hover:bg-surface-3 transition-all duration-150 group"
        >
          <div className="w-11 h-11 rounded-xl bg-surface-3 border border-line-2 flex items-center justify-center text-xl shrink-0">
            {c.icon}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[14px] font-semibold text-ink mb-0.5 truncate">{c.name}</div>
            <div className="text-[12px] text-ink-3 mb-1.5">
              <span className="text-ink-2 font-medium">{c.platform}</span>
              {c.institution ? ` · ${c.institution}` : ''}
              {` · ${c.duration}`}
              {c.cost ? ` · ${c.cost}` : ''}
            </div>
            <div className="text-[12px] text-ink-2 leading-relaxed">{c.whyThisOne}</div>
          </div>
          <span className="text-[11px] font-bold uppercase tracking-[0.06em] text-ink-3 group-hover:text-fire transition-colors shrink-0 pt-0.5">
            View →
          </span>
        </a>
      ))}
    </div>
  );
}
