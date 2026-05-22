'use client';
import clsx from 'clsx';
import type { LucideIcon } from 'lucide-react';

interface SelectionCardProps {
  value: string;
  selected: boolean;
  onSelect: (value: string) => void;
  title: string;
  subtitle?: string;
  meta?: string;
  icon?: LucideIcon;
}

export default function SelectionCard({
  value, selected, onSelect, title, subtitle, meta, icon: Icon
}: SelectionCardProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(value)}
      className={clsx(
        'w-full text-left px-5 py-4 rounded-xl border-[1.5px] transition-all duration-150 relative',
        selected
          ? 'border-fire bg-fire/[0.06] shadow-low text-ink'
          : 'border-line bg-surface text-ink-2 hover:border-line-2 hover:bg-surface-2 hover:text-ink'
      )}
    >
      {selected && (
        <span className="absolute top-3 right-3 w-2 h-2 rounded-full bg-fire" />
      )}
      <div className="flex items-start gap-3">
        {Icon && (
          <Icon size={18} strokeWidth={1.5} className="mt-0.5 shrink-0 opacity-70" />
        )}
        <div className="min-w-0">
          <div className="text-[15px] font-semibold leading-snug">{title}</div>
          {subtitle && (
            <div className={clsx('text-[13px] mt-0.5', selected ? 'text-ink-2' : 'text-ink-3')}>
              {subtitle}
            </div>
          )}
          {meta && (
            <div className="text-[11px] font-medium uppercase tracking-[0.08em] text-ink-3 mt-1.5">
              {meta}
            </div>
          )}
        </div>
      </div>
    </button>
  );
}
