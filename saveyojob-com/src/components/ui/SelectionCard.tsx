'use client';
import clsx from 'clsx';

interface SelectionCardProps {
  value: string;
  selected: boolean;
  onSelect: (value: string) => void;
  title: string;
  subtitle?: string;
  meta?: string;
  icon?: string;
}

export default function SelectionCard({
  value, selected, onSelect, title, subtitle, meta, icon
}: SelectionCardProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(value)}
      className={clsx(
        'w-full text-left px-5 py-4 rounded-xl border-[1.5px] transition-all duration-150 relative',
        selected
          ? 'border-acid bg-acid/[0.06] text-paper'
          : 'border-wire bg-ink-2 text-paper-2 hover:border-wire-2 hover:bg-ink-3 hover:text-paper'
      )}
    >
      {selected && (
        <span className="absolute top-3 right-3 w-2 h-2 rounded-full bg-acid" />
      )}
      <div className="flex items-start gap-3">
        {icon && <span className="text-xl mt-0.5 shrink-0">{icon}</span>}
        <div className="min-w-0">
          <div className="text-[15px] font-semibold leading-snug">{title}</div>
          {subtitle && (
            <div className={clsx('text-[13px] mt-0.5', selected ? 'text-paper-2' : 'text-paper-3')}>
              {subtitle}
            </div>
          )}
          {meta && (
            <div className="text-[11px] font-medium uppercase tracking-[0.08em] text-paper-3 mt-1.5">
              {meta}
            </div>
          )}
        </div>
      </div>
    </button>
  );
}
