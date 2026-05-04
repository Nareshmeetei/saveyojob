import type { RoadmapSkill } from '../../../lib/types/roadmap';

function demandColor(trend: string) {
  if (trend === 'Growing fast') return 'text-acid bg-acid/10';
  if (trend === 'Emerging')     return 'text-rust bg-rust/10';
  return 'text-paper-2 bg-wire';
}

interface SkillCardsProps { skills: RoadmapSkill[]; }

export default function SkillCards({ skills }: SkillCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {skills.map((s, i) => (
        <div key={i} className="bg-ink-2 border border-wire rounded-xl p-5">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="text-[15px] font-bold text-paper leading-snug">{s.name}</div>
            <span className={`shrink-0 text-[10px] font-bold uppercase tracking-[0.08em] px-2 py-0.5 rounded ${demandColor(s.demandTrend)}`}>
              {s.demandTrend}
            </span>
          </div>
          <p className="text-[12px] text-paper-2 leading-relaxed mb-3">{s.why}</p>
          <div className="flex flex-wrap gap-x-5 gap-y-1">
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.09em] text-paper-3">Time</div>
              <div className="text-[12px] font-medium text-paper">{s.timeToProficiency}</div>
            </div>
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.09em] text-paper-3">Salary impact</div>
              <div className="text-[12px] font-medium text-acid">{s.salaryImpact}</div>
            </div>
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.09em] text-paper-3">AI-resistance</div>
              <div className="text-[12px] font-medium text-paper">{s.aiResistanceScore}/10</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
