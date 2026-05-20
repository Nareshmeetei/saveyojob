'use client';
import { Leaf, TrendingUp, Compass, Award } from 'lucide-react';
import SelectionCard from '../ui/SelectionCard';

const OPTIONS = [
  { value: 'entry',       title: '0–2 years',   subtitle: 'Just starting out',       icon: Leaf      },
  { value: 'mid',         title: '3–7 years',   subtitle: 'Established specialist',  icon: TrendingUp },
  { value: 'experienced', title: '8–15 years',  subtitle: 'Experienced professional', icon: Compass   },
  { value: 'senior',      title: '15+ years',   subtitle: 'Senior / Expert',          icon: Award     },
];

interface StepExperienceProps {
  value: string | null;
  onSelect: (v: string) => void;
  onBack: () => void;
}

export default function StepExperience({ value, onSelect, onBack }: StepExperienceProps) {
  return (
    <div className="animate-slide-in">
      <div className="mb-8">
        <h2 className="text-[28px] sm:text-[36px] font-bold text-ink leading-tight tracking-tight mb-2">
          How long have you been in this role?
        </h2>
        <p className="text-[15px] text-ink-2">
          Experience level changes your risk profile and reskilling leverage significantly
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-6">
        {OPTIONS.map(o => (
          <SelectionCard
            key={o.value}
            value={o.value}
            selected={value === o.value}
            onSelect={onSelect}
            title={o.title}
            subtitle={o.subtitle}
            icon={o.icon}
          />
        ))}
      </div>

      <button
        onClick={onBack}
        className="text-[13px] text-ink-3 hover:text-ink-2 transition-colors"
      >
        ← Back
      </button>
    </div>
  );
}
