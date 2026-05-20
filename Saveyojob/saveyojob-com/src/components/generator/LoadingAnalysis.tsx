'use client';
import { useEffect, useState } from 'react';

const STEPS = [
  'Checking automation probability',
  'Mapping your specific tasks',
  'Analyzing experience impact',
  'Calculating skill transfer value',
  'Building your learning roadmap',
  'Curating vetted courses',
];

interface LoadingAnalysisProps {
  jobTitle: string;
}

export default function LoadingAnalysis({ jobTitle }: LoadingAnalysisProps) {
  const [progress, setProgress] = useState<number[]>(Array(STEPS.length).fill(0));
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    let step = 0;
    const interval = setInterval(() => {
      if (step >= STEPS.length) { clearInterval(interval); return; }
      let pct = 0;
      const inner = setInterval(() => {
        pct += Math.random() * 18 + 8;
        if (pct >= 100) {
          pct = 100;
          clearInterval(inner);
          step++;
          setCurrent(step);
        }
        setProgress(prev => {
          const next = [...prev];
          next[step] = Math.min(pct, 100);
          return next;
        });
      }, 120);
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="py-10 px-6 flex flex-col items-center gap-8">
      <div>
        <div className="flex justify-center gap-2 mb-5">
          {[0, 1, 2].map(i => (
            <div
              key={i}
              className="w-2.5 h-2.5 rounded-full bg-fire"
              style={{ animation: `dot-pulse 1.4s ease-in-out ${i * 0.22}s infinite` }}
            />
          ))}
        </div>
        <div className="text-center">
          <div className="text-[20px] font-bold text-ink tracking-tight">
            Analyzing your career…
          </div>
          <div className="text-[14px] text-fire font-semibold mt-1">{jobTitle}</div>
        </div>
      </div>

      <div className="w-full max-w-sm border border-line rounded-xl overflow-hidden">
        {STEPS.map((step, i) => {
          const pct   = progress[i];
          const done  = pct >= 100;
          const active = i === current && pct < 100;

          return (
            <div
              key={step}
              className={`flex flex-col gap-1.5 px-5 py-3 border-b border-line last:border-b-0 transition-colors duration-300 ${
                done ? 'bg-surface-2' : active ? 'bg-surface-2' : 'bg-surface'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`text-[13px] transition-colors duration-300 ${
                  done ? 'text-fire font-medium' : active ? 'text-ink-2' : 'text-ink-3'
                }`}>
                  {step}
                </span>
                {done && (
                  <span className="text-fire text-[11px] font-bold">✓</span>
                )}
              </div>
              <div className="h-[2px] bg-line rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bg-fire transition-all duration-150 ease-out"
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
