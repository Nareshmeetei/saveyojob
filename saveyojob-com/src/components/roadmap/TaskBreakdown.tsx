import type { RoadmapTask } from '../../../lib/types/roadmap';

function riskStyle(risk: string): { bar: string; text: string } {
  switch (risk) {
    case 'Very High': return { bar: 'var(--color-blood)',  text: 'var(--color-text-blood)' };
    case 'High':      return { bar: 'var(--color-rust)',   text: 'var(--color-text-rust)'  };
    case 'Moderate':  return { bar: 'var(--color-rust)',   text: 'var(--color-text-rust)'  };
    case 'Low':       return { bar: 'var(--color-acid)',   text: 'var(--color-text-acid)'  };
    default:          return { bar: 'var(--color-wire-2)', text: 'var(--color-paper-2)'    };
  }
}

interface TaskBreakdownProps { tasks: RoadmapTask[]; }

export default function TaskBreakdown({ tasks }: TaskBreakdownProps) {
  return (
    <div className="space-y-5">
      {tasks.map((t, i) => {
        const s = riskStyle(t.risk);
        return (
          <div key={i}>
            <div className="flex items-baseline justify-between mb-1.5 gap-3">
              <span className="text-[14px] font-medium text-paper">{t.name}</span>
              <div className="flex items-center gap-3 shrink-0">
                <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-paper-3">
                  {t.timeline}
                </span>
                <span className="text-[14px] font-bold tabular-nums" style={{ color: s.text }}>
                  {t.percentAutomatable}%
                </span>
              </div>
            </div>
            <div className="h-[3px] bg-wire rounded-full overflow-hidden mb-1.5">
              <div
                className="h-full rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${t.percentAutomatable}%`, background: s.bar }}
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[12px] text-paper-3">{t.aiToolsCausing}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
