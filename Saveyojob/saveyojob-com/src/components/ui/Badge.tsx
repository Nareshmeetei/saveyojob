import clsx from 'clsx';

type Variant = 'very-high' | 'high' | 'moderate' | 'low' | 'minimal' | 'acid';

const variants: Record<Variant, string> = {
  'very-high': 'bg-critical/10 text-critical',
  'high':      'bg-warn/10  text-warn',
  'moderate':  'bg-amber-400/10 text-amber-400',
  'low':       'bg-fire/10  text-fire',
  'minimal':   'bg-line text-ink-2',
  'acid':      'bg-fire/10  text-fire',
};

function riskToVariant(risk: string): Variant {
  switch (risk) {
    case 'Very High': return 'very-high';
    case 'High':      return 'high';
    case 'Moderate':  return 'moderate';
    case 'Low':       return 'low';
    case 'Minimal':   return 'minimal';
    default:          return 'minimal';
  }
}

interface BadgeProps {
  label: string;
  risk?: string;
  variant?: Variant;
  className?: string;
}

export default function Badge({ label, risk, variant, className }: BadgeProps) {
  const v = variant ?? (risk ? riskToVariant(risk) : 'minimal');
  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.1em] px-2.5 py-1 rounded',
        variants[v],
        className
      )}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-80" />
      {label}
    </span>
  );
}
