'use client';
import { useEffect, useState } from 'react';

interface RiskGaugeProps {
  score: number;
}

function riskBarColor(score: number): string {
  if (score > 70) return '#FF3333';
  if (score > 50) return '#FF7A28';
  if (score > 30) return '#FFB830';
  return '#BAFF29';
}

function riskTextColor(score: number): string {
  if (score > 70) return '#B52525';
  if (score > 50) return '#A04000';
  if (score > 30) return '#7A5C00';
  return '#1A6200';
}

function riskBg(score: number): string {
  if (score > 70) return 'rgba(255,51,51,0.08)';
  if (score > 50) return 'rgba(255,122,40,0.08)';
  if (score > 30) return 'rgba(255,184,48,0.08)';
  return 'rgba(186,255,41,0.08)';
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
        <span className="text-[14px] text-paper-3 font-normal leading-none mb-1">/ 100</span>
      </div>

      <div
        className="h-[4px] rounded-full overflow-hidden"
        style={{ width: 120, background: 'var(--color-wire)' }}
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
