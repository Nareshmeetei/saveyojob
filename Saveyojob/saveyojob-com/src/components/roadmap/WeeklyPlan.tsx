import type { WeeklyPlanItem } from '../../../lib/types/roadmap';

interface WeeklyPlanProps { plan: WeeklyPlanItem[]; }

export default function WeeklyPlan({ plan }: WeeklyPlanProps) {
  return (
    <div className="flex flex-col">
      {plan.map((item, i) => (
        <div key={i} className="flex gap-4 pb-6 last:pb-0">
          <div className="flex flex-col items-center w-7 shrink-0">
            <div className="w-7 h-7 rounded-full border-[1.5px] border-fire bg-fire/10 flex items-center justify-center text-[12px] font-bold text-fire shrink-0">
              {i + 1}
            </div>
            {i < plan.length - 1 && (
              <div className="w-[1px] flex-1 bg-line mt-1.5" />
            )}
          </div>
          <div className="flex-1 pt-0.5">
            <div className="text-[11px] font-semibold uppercase tracking-[0.1em] text-fire mb-0.5">
              {item.weeks}
            </div>
            <div className="text-[15px] font-semibold text-ink mb-1">{item.milestone}</div>
            <div className="text-[13px] text-ink-2 mb-1">{item.action}</div>
            <div className="text-[12px] text-ink-3">
              <span className="font-medium text-ink-2">Deliverable:</span> {item.deliverable}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
