interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export default function ProgressIndicator({ currentStep, totalSteps }: ProgressIndicatorProps) {
  const pct = Math.round(((currentStep - 1) / (totalSteps - 1)) * 100);
  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 h-[10px] bg-line rounded-full overflow-hidden">
        <div
          className="h-full bg-fire rounded-full transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-3 shrink-0">
        {currentStep}/{totalSteps}
      </span>
    </div>
  );
}
