import type { RoadmapSkill } from '../../../lib/types/roadmap';

function demandColor(trend: string) {
  if (trend === 'Growing fast') return 'text-fire bg-fire/10';
  if (trend === 'Emerging')     return 'text-warn bg-warn/10';
  return 'text-ink-2 bg-line';
}

interface SkillCardsProps { skills: RoadmapSkill[]; }

export default function SkillCards({ skills }: SkillCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {skills.map((s, i) => (
        <div key={i} className="bg-surface-2 border border-line rounded-[20px] p-5 shadow-low transition-shadow hover:shadow-mid">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="text-[15px] font-bold text-ink leading-snug">{s.name}</div>
            <span className={`shrink-0 text-[11px] font-semibold uppercase tracking-[0.06em] px-[10px] py-[4px] rounded-full ${demandColor(s.demandTrend)}`}>
              {s.demandTrend}
            </span>
          </div>
          <p className="text-[12px] text-ink-2 leading-relaxed mb-3">{s.why}</p>
          <div className="flex flex-wrap gap-x-5 gap-y-1">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.06em] text-ink-3">Time</div>
              <div className="text-[12px] font-medium font-mono text-ink">{s.timeToProficiency}</div>
            </div>
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.06em] text-ink-3">Salary impact</div>
              <div className="text-[12px] font-medium font-mono text-fire">{s.salaryImpact}</div>
            </div>
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.06em] text-ink-3">AI-resistance</div>
              <div className="text-[12px] font-medium font-mono text-ink">{s.aiResistanceScore}/10</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
