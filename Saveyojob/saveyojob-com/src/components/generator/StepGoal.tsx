'use client';
import { Shield, TrendingUp, Bot, Search } from 'lucide-react';
import SelectionCard from '../ui/SelectionCard';

const OPTIONS = [
  {
    value: 'stay_upskill',
    title: 'Stay in my field',
    subtitle: 'AI-proof my current skills',
    icon: Shield,
  },
  {
    value: 'transition_new',
    title: 'Transition to a new career',
    subtitle: 'Find an AI-resistant role',
    icon: TrendingUp,
  },
  {
    value: 'move_into_ai',
    title: 'Move into AI',
    subtitle: 'Build the future of work',
    icon: Bot,
  },
  {
    value: 'understand_risk',
    title: 'Just understand my risk',
    subtitle: 'Know where I stand',
    icon: Search,
  },
];

interface StepGoalProps {
  value: string | null;
  onSelect: (v: string) => void;
  onBack: () => void;
}

export default function StepGoal({ value, onSelect, onBack }: StepGoalProps) {
  return (
    <div className="animate-slide-in">
      <div className="mb-8">
        <h2 className="text-[28px] sm:text-[36px] font-bold text-ink leading-tight tracking-tight mb-2">
          What do you want to do about it?
        </h2>
        <p className="text-[15px] text-ink-2">
          Your goal shapes every recommendation in your roadmap
        </p>
      </div>

      <div className="flex flex-col gap-3 mb-6">
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
