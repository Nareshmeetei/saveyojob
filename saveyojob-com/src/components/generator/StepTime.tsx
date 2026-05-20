'use client';
import SelectionCard from '../ui/SelectionCard';

const OPTIONS = [
  {
    value: 'minimal',
    title: '2–4 hrs / week',
    subtitle: 'Steady & gradual',
    meta: '6–9 month timeline',
    icon: '⏱️',
  },
  {
    value: 'moderate',
    title: '5–10 hrs / week',
    subtitle: 'Focused effort',
    meta: '3–5 month timeline',
    icon: '⚡',
  },
  {
    value: 'intensive',
    title: 'Full-time',
    subtitle: 'Bootcamp intensity',
    meta: '2–3 month timeline',
    icon: '🔥',
  },
];

interface StepTimeProps {
  value: string | null;
  onSelect: (v: string) => void;
  onBack: () => void;
  onGenerate: () => void;
  loading: boolean;
}

export default function StepTime({ value, onSelect, onBack, onGenerate, loading }: StepTimeProps) {
  return (
    <div className="animate-slide-in">
      <div className="mb-8">
        <h2 className="text-[28px] sm:text-[36px] font-bold text-paper leading-tight tracking-tight mb-2">
          How much time can you dedicate to learning?
        </h2>
        <p className="text-[15px] text-paper-2">
          This determines whether your roadmap spans weeks or months
        </p>
      </div>

      <div className="flex flex-col gap-3 mb-8">
        {OPTIONS.map(o => (
          <SelectionCard
            key={o.value}
            value={o.value}
            selected={value === o.value}
            onSelect={onSelect}
            title={o.title}
            subtitle={o.subtitle}
            meta={o.meta}
            icon={o.icon}
          />
        ))}
      </div>

      <button
        onClick={onGenerate}
        disabled={!value || loading}
        className="w-full py-4 px-6 bg-acid text-ink text-[16px] font-bold rounded-xl transition-all duration-150 hover:brightness-105 hover:-translate-y-[1px] disabled:opacity-30 disabled:cursor-not-allowed disabled:translate-y-0 flex items-center justify-center gap-3"
        style={{ boxShadow: value ? '0 10px 32px rgba(186,255,41,0.14)' : undefined }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M13 2L3 14h9l-1 8 10-12h-9z"/>
        </svg>
        Generate My Free Roadmap
      </button>
      <p className="text-center text-[12px] text-paper-3 mt-3">
        Powered by Claude AI · Results tailored to your exact role &amp; situation
      </p>

      <div className="mt-4 text-center">
        <button
          onClick={onBack}
          className="text-[13px] text-paper-3 hover:text-paper-2 transition-colors"
        >
          ← Back
        </button>
      </div>
    </div>
  );
}
