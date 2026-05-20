'use client';
import { useState, useRef, useEffect } from 'react';
import type { OccupationEntry } from './GeneratorWizard';

interface StepJobTitleProps {
  value: string;
  onChange: (title: string, soc?: string, slug?: string) => void;
  onNext: () => void;
  occupations: OccupationEntry[];
}

export default function StepJobTitle({ value, onChange, onNext, occupations }: StepJobTitleProps) {
  const [query, setQuery]   = useState(value);
  const [open, setOpen]     = useState(false);
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const wrapRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const hits = query.length >= 2
    ? occupations
        .filter(o => o.title.toLowerCase().includes(query.toLowerCase()))
        .slice(0, 8)
    : [];

  function pick(o: OccupationEntry) {
    setQuery(o.title);
    onChange(o.title, o.soc, o.slug);
    setOpen(false);
  }

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && query.trim().length >= 2) {
      const exact = occupations.find(o => o.title.toLowerCase() === query.toLowerCase());
      if (exact) pick(exact);
      else { onChange(query.trim()); setOpen(false); }
      onNext();
    }
    if (e.key === 'Escape') setOpen(false);
  }

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const showSuggestions = open && hits.length > 0;

  return (
    <div className="animate-slide-in">
      <div className="mb-8">
        <h2 className="text-[28px] sm:text-[36px] font-bold text-ink leading-tight tracking-tight mb-2">
          What's your job title?
        </h2>
        <p className="text-[15px] text-ink-2">
          We'll analyze exactly which of your tasks are at risk
        </p>
      </div>

      <div ref={wrapRef} className="relative mb-6">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={e => { setQuery(e.target.value); onChange(e.target.value); setOpen(true); }}
          onFocus={() => { setFocused(true); if (hits.length) setOpen(true); }}
          onBlur={() => setFocused(false)}
          onKeyDown={handleKey}
          placeholder="e.g. Paralegal, Financial Analyst…"
          autoComplete="off"
          spellCheck={false}
          className="w-full bg-surface-2 border-[1.5px] border-line rounded-xl px-5 py-4 text-[17px] text-ink placeholder:text-ink-2 outline-none transition-all duration-150 focus:border-fire focus:bg-surface-3"
        />

        {showSuggestions && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-surface-2 border border-line-2 rounded-xl z-30 overflow-hidden max-h-[280px] overflow-y-auto">
            {hits.map((o, i) => {
              const idx = o.title.toLowerCase().indexOf(query.toLowerCase());
              return (
                <button
                  key={o.soc}
                  type="button"
                  onMouseDown={() => { pick(o); setTimeout(onNext, 120); }}
                  className={`w-full text-left px-5 py-3 flex items-center justify-between transition-colors hover:bg-surface-3 ${
                    i > 0 ? 'border-t border-line' : ''
                  }`}
                >
                  <span className="text-[14px] text-ink-2">
                    {o.title.slice(0, idx)}
                    <strong className="text-ink font-semibold">{o.title.slice(idx, idx + query.length)}</strong>
                    {o.title.slice(idx + query.length)}
                  </span>
                  <span className="text-[11px] text-ink-3 font-medium uppercase tracking-wide ml-4 shrink-0">
                    {o.category}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      <button
        onClick={() => { if (query.trim().length >= 2) { onChange(query.trim()); onNext(); } }}
        disabled={query.trim().length < 2}
        className="w-full py-4 px-6 bg-fire text-bg text-[16px] font-bold rounded-xl transition-all duration-150 hover:brightness-105 hover:-translate-y-[1px] disabled:opacity-30 disabled:cursor-not-allowed disabled:translate-y-0"
      >
        Continue →
      </button>
    </div>
  );
}
