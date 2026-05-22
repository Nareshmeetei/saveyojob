'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';

const INDUSTRIES = [
  { label: 'Finance',        risk: 'high' },
  { label: 'Legal',          risk: 'high' },
  { label: 'Healthcare',     risk: 'medium' },
  { label: 'Marketing',      risk: 'high' },
  { label: 'Technology',     risk: 'low' },
  { label: 'Education',      risk: 'medium' },
  { label: 'Manufacturing',  risk: 'high' },
  { label: 'Retail',         risk: 'high' },
  { label: 'Administration', risk: 'high' },
  { label: 'Design',         risk: 'medium' },
  { label: 'Journalism',     risk: 'high' },
  { label: 'Logistics',      risk: 'medium' },
];

const riskLabel: Record<string, { text: string; color: string }> = {
  high:   { text: 'High risk industry',   color: '#C45347' },
  medium: { text: 'Medium risk industry', color: '#D4783C' },
  low:    { text: 'Lower risk industry',  color: '#0369A1' },
};

interface IndustrySelectorProps {
  onSelect?: (industry: string, risk: string) => void;
}

export default function IndustrySelector({ onSelect }: IndustrySelectorProps) {
  const [selected, setSelected] = useState<string | null>(null);

  function handleSelect(label: string, risk: string) {
    setSelected(label);
    onSelect?.(label, risk);
  }

  const selectedIndustry = INDUSTRIES.find(i => i.label === selected);

  return (
    <section id="industry-selector" className="py-14 px-5 sm:px-8 border-t border-line">
      <div className="max-w-[760px] mx-auto">

        <div className="mb-6">
          <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-ink-3 block mb-2">
            Or explore by industry
          </span>
          <h2 className="text-[22px] sm:text-[26px] font-bold tracking-[-0.02em] text-ink">
            Not on the list? Pick your industry.
          </h2>
        </div>

        {/* Pill chips */}
        <div className="flex flex-wrap gap-2 mb-6">
          {INDUSTRIES.map(({ label, risk }) => {
            const isSelected = selected === label;
            return (
              <button
                key={label}
                onClick={() => handleSelect(label, risk)}
                className="text-[13px] font-semibold px-4 py-2 rounded-full border transition-all duration-150"
                style={isSelected ? {
                  background:  '#0C526D',
                  borderColor: '#0C526D',
                  color:       '#F2F2F2',
                } : {
                  background:  '#EEF5F7',
                  borderColor: '#C5DDE4',
                  color:       '#081E28',
                }}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* Risk callout */}
        {selectedIndustry && (
          <motion.div
            key={selected}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="flex items-center gap-3 px-5 py-4 rounded-xl border bg-surface"
            style={{
              borderColor: riskLabel[selectedIndustry.risk].color + '44',
              borderLeftColor: riskLabel[selectedIndustry.risk].color,
              borderLeftWidth: 3,
            }}
          >
            <div>
              <span className="text-[14px] font-bold text-ink">{selected}</span>
              <span className="text-[13px] text-ink-2"> · {riskLabel[selectedIndustry.risk].text}</span>
            </div>
            <a
              href="#risk-engine"
              className="ml-auto text-[12px] font-bold text-fire hover:underline shrink-0"
            >
              See courses →
            </a>
          </motion.div>
        )}

      </div>
    </section>
  );
}
