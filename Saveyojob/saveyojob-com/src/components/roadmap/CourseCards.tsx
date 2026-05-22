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
          className="flex items-start gap-3 p-4 bg-surface-2 border border-line rounded-[20px] shadow-low hover:shadow-mid hover:border-fire transition-all duration-150"
        >
          <div className="w-9 h-9 rounded-xl bg-surface-3 border border-line flex items-center justify-center shrink-0 overflow-hidden mt-0.5">
            <img
              src={`https://www.google.com/s2/favicons?domain=${new URL(c.url).hostname}&sz=64`}
              alt={c.platform}
              width={24}
              height={24}
              className="object-contain"
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[13px] font-semibold text-ink mb-0.5 truncate">{c.name}</div>
            <div className="text-[11px] text-ink-3 mb-1.5">
              <span className="text-ink-2 font-medium">{c.platform}</span>
              {c.institution ? ` · ${c.institution}` : ''}
              {` · ${c.duration}`}
              {c.cost ? ` · ${c.cost}` : ''}
            </div>
            <div className="text-[12px] text-ink-2 leading-relaxed">{c.whyThisOne}</div>
          </div>
          <span className="text-[11px] font-bold text-fire shrink-0 pt-0.5">
            Enroll →
          </span>
        </a>
      ))}
    </div>
  );
}
