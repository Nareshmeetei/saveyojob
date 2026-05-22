'use client';
import { useEffect, useState } from 'react';

interface RiskGaugeProps {
  score: number;
}

function riskBarColor(score: number): string {
  if (score > 70) return '#C45347';
  if (score > 50) return '#EA580C';
  if (score > 30) return '#D4783C';
  return '#0369A1';
}

function riskTextColor(score: number): string {
  if (score > 70) return '#C45347';
  if (score > 50) return '#EA580C';
  if (score > 30) return '#D4783C';
  return '#0369A1';
}

function riskBg(score: number): string {
  if (score > 70) return 'rgba(196,83,71,0.10)';
  if (score > 50) return 'rgba(234,88,12,0.10)';
  if (score > 30) return 'rgba(180,83,9,0.10)';
  return 'rgba(3,105,161,0.10)';
}

export default function RiskGauge({ score }: RiskGaugeProps) {
  const [displayed, setDisplayed] = useState(0);
  const barColor  = riskBarColor(score);
  const textColor = riskTextColor(score);
  const bg        = riskBg(score);

  useEffect(() => {
    const start = performance.now();
    const duration = 1400;

    function easeOut(t: number) {
      return 1 - Math.pow(1 - t, 3);
    }

    function tick(now: number) {
      const elapsed = Math.min(now - start, duration);
      const progress = easeOut(elapsed / duration);
      setDisplayed(Math.round(progress * score));
      if (elapsed < duration) requestAnimationFrame(tick);
    }

    const raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [score]);

  return (
    <div className="flex flex-col items-start gap-2">
      <div className="flex items-baseline gap-1.5">
        <span
          className="text-[72px] font-extrabold leading-none tracking-[-0.04em] tabular-nums"
          style={{ color: textColor }}
        >
          {displayed}
        </span>
        <span className="text-[14px] text-ink-3 font-normal leading-none mb-1">/ 100</span>
      </div>

      <div
        className="h-[4px] rounded-full overflow-hidden"
        style={{ width: 120, background: 'var(--color-line)' }}
      >
        <div
          className="h-full rounded-full transition-all duration-[1400ms] ease-out"
          style={{
            width: `${displayed}%`,
            background: barColor,
          }}
        />
      </div>

      <div
        className="px-3 py-1.5 rounded text-[11px] font-bold uppercase tracking-[0.1em]"
        style={{ color: textColor, background: bg }}
      >
        automation risk
      </div>
    </div>
  );
}
