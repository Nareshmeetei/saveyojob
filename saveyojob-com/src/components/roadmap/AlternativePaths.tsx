import Badge from '../ui/Badge';
import type { AlternativePath } from '../../../lib/types/roadmap';

interface AlternativePathsProps { paths: AlternativePath[]; }

export default function AlternativePaths({ paths }: AlternativePathsProps) {
  return (
    <div className="flex flex-col gap-4">
      {paths.map((p, i) => (
        <div key={i} className="bg-ink-2 border border-wire rounded-xl p-5">
          <div className="flex items-start justify-between gap-3 mb-2">
            <div className="text-[16px] font-bold text-paper">{p.title}</div>
            <Badge label={p.riskLevel + ' Risk'} risk={p.riskLevel} />
          </div>
          <p className="text-[13px] text-paper-2 leading-relaxed mb-3">{p.why}</p>
          <div className="flex flex-wrap gap-x-6 gap-y-1 text-[12px]">
            <span className="text-paper-3">
              Salary: <span className="text-paper font-semibold">{p.salaryRange}</span>
            </span>
            <span className="text-paper-3">
              Time to pivot: <span className="text-paper font-semibold">{p.timeToPivot}</span>
            </span>
            <span className="text-paper-3">
              Skills transfer: <span className="text-acid font-semibold">{p.knowledgeTransfer}</span>
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
