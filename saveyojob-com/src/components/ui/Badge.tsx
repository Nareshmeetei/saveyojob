import clsx from 'clsx';

type Variant = 'very-high' | 'high' | 'moderate' | 'low' | 'minimal' | 'acid';

const variants: Record<Variant, string> = {
  'very-high': 'bg-blood/10 text-blood',
  'high':      'bg-rust/10  text-rust',
  'moderate':  'bg-amber-400/10 text-amber-800',
  'low':       'bg-acid/10  text-acid',
  'minimal':   'bg-wire text-paper-2',
  'acid':      'bg-acid/10  text-acid',
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
