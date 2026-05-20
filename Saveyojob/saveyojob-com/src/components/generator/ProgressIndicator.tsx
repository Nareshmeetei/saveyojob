import clsx from 'clsx';

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export default function ProgressIndicator({ currentStep, totalSteps }: ProgressIndicatorProps) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-3">
        Step {currentStep} of {totalSteps}
      </span>
      <div className="flex gap-1.5">
        {Array.from({ length: totalSteps }, (_, i) => (
          <div
            key={i}
            className={clsx(
              'h-1 rounded-full transition-all duration-300',
              i + 1 < currentStep  ? 'w-4 bg-fire' :
              i + 1 === currentStep ? 'w-6 bg-fire' :
                                      'w-4 bg-line-2'
            )}
          />
        ))}
      </div>
    </div>
  );
}
