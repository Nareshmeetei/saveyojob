import type { RoadmapData } from '../../../lib/types/roadmap';

function fmt(n: number) {
  return '$' + n.toLocaleString('en-US');
}

interface SalaryImpactProps {
  data: Pick<RoadmapData, 'currentSalary' | 'projectedSalaryWithoutAction' | 'projectedSalaryWithPlan'>;
}

export default function SalaryImpact({ data }: SalaryImpactProps) {
  const { currentSalary, projectedSalaryWithoutAction, projectedSalaryWithPlan } = data;
  const delta = projectedSalaryWithPlan - projectedSalaryWithoutAction;
  const maxSal = Math.max(currentSalary, projectedSalaryWithoutAction, projectedSalaryWithPlan);
  const withoutPct = Math.round((projectedSalaryWithoutAction / maxSal) * 100);
  const withPct    = Math.round((projectedSalaryWithPlan    / maxSal) * 100);
  const currentPct = Math.round((currentSalary              / maxSal) * 100);

  return (
    <div>
      <div className="space-y-4">
        <Row
          label="Current median salary"
          value={fmt(currentSalary)}
          pct={currentPct}
          color="bg-wire-2"
          note="(BLS Data)"
        />
        <Row
          label="In 5 years — no action"
          value={fmt(projectedSalaryWithoutAction)}
          pct={withoutPct}
          color="bg-blood/60"
          note="(Oxford Research)"
        />
        <Row
          label="In 5 years — with this plan"
          value={fmt(projectedSalaryWithPlan)}
          pct={withPct}
          color="bg-acid"
          note="(McKinsey Data)"
        />
      </div>

      <div className="mt-5 px-4 py-3 bg-ink-2 border border-wire rounded-xl flex items-center justify-between">
        <span className="text-[13px] text-paper-2">Difference by acting now</span>
        <span className="text-[18px] font-bold text-acid tracking-tight">
          +{fmt(delta)} / yr
        </span>
      </div>
    </div>
  );
}

function Row({
  label, value, pct, color, note,
}: {
  label: string; value: string; pct: number; color: string; note: string;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-2">
          <span className="text-[13px] text-paper-2">{label}</span>
          <span className="text-[11px] text-paper-3">{note}</span>
        </div>
        <span className="text-[14px] font-bold text-paper">{value}</span>
      </div>
      <div className="h-2 bg-wire rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full ${color} transition-all duration-1000 ease-out`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
