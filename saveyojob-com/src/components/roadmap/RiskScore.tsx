import RiskGauge from './RiskGauge';
import type { RoadmapData } from '../../../lib/types/roadmap';

interface RiskScoreProps {
  data: RoadmapData;
  jobTitle: string;
  experienceLevel: string;
}

const expLabel: Record<string, string> = {
  entry:       '0–2 years',
  mid:         '3–7 years',
  experienced: '8–15 years',
  senior:      '15+ years',
};

export default function RiskScore({ data, jobTitle, experienceLevel }: RiskScoreProps) {
  const { riskScore, riskSummary } = data;
  return (
    <div className="border border-wire rounded-2xl overflow-hidden">
      <div className="bg-ink-2 px-6 py-4 border-b border-wire">
        <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-acid mb-1">
          Saveyojob Report · {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </div>
        <div className="text-[17px] font-bold text-paper leading-snug">
          {jobTitle} · {expLabel[experienceLevel] ?? experienceLevel}
        </div>
      </div>

      <div className="p-6 flex flex-col sm:flex-row items-start gap-8">
        <div className="shrink-0">
          <RiskGauge score={riskScore} />
        </div>
        <div className="flex-1 min-w-0 pt-1">
          <p className="text-[15px] text-paper-2 leading-relaxed">{riskSummary}</p>
        </div>
      </div>
    </div>
  );
}
