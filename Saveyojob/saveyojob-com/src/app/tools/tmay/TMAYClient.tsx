'use client';
import { useState } from 'react';
import { Copy, Check, Mic, RotateCcw, ChevronRight } from 'lucide-react';

interface Fields {
  currentRole: string;
  yearsExp: string;
  topSkill1: string;
  topSkill2: string;
  biggestWin: string;
  targetRole: string;
  whyThisRole: string;
}

const EMPTY: Fields = {
  currentRole: '',
  yearsExp: '',
  topSkill1: '',
  topSkill2: '',
  biggestWin: '',
  targetRole: '',
  whyThisRole: '',
};

const STEPS = [
  { key: 'currentRole',  label: 'What is your current or most recent job title?',        placeholder: 'e.g. Marketing Manager at TechCo',                              hint: '' },
  { key: 'yearsExp',     label: 'How many years of experience do you have in this field?', placeholder: 'e.g. 7 years',                                                 hint: '' },
  { key: 'topSkill1',    label: 'What is your strongest professional skill?',             placeholder: 'e.g. building and managing paid search campaigns',              hint: 'Be specific — not "communication" but what you actually do best' },
  { key: 'topSkill2',    label: 'What is your second strongest skill or area of expertise?', placeholder: 'e.g. analysing performance data to improve ROAS',           hint: '' },
  { key: 'biggestWin',   label: 'What is your biggest professional accomplishment?',      placeholder: 'e.g. grew organic traffic 3× in 12 months through a content redesign', hint: 'Numbers make this land — include them if you have them' },
  { key: 'targetRole',   label: 'What role are you interviewing for?',                    placeholder: 'e.g. Head of Growth at a Series B startup',                    hint: '' },
  { key: 'whyThisRole',  label: 'Why does this specific opportunity excite you?',         placeholder: 'e.g. I want to build a growth function from scratch and own the full funnel', hint: 'One honest sentence works best' },
] as const;

type StepKey = typeof STEPS[number]['key'];

function buildPitch(f: Fields): string {
  const role = f.currentRole || '[current role]';
  const years = f.yearsExp ? `${f.yearsExp} of experience` : 'several years of experience';
  const skill1 = f.topSkill1 || '[primary skill]';
  const skill2 = f.topSkill2 || '[second skill]';
  const win = f.biggestWin || '[biggest win]';
  const targetRole = f.targetRole || '[target role]';
  const why = f.whyThisRole || '[why this role]';

  return `I'm currently ${role}, with ${years} in this field.

I specialise in ${skill1}, and I've also built strong expertise in ${skill2}.

One of my proudest moments was when ${win}.

I'm now looking for my next challenge as ${targetRole} because ${why}.

When I came across this role, it immediately stood out — it's the kind of opportunity where I can bring everything I've built so far and take it to the next level.`;
}

function isComplete(f: Fields): boolean {
  return STEPS.every(s => f[s.key].trim() !== '');
}

export default function TMAYClient() {
  const [fields, setFields] = useState<Fields>(EMPTY);
  const [step, setStep] = useState(0);
  const [copied, setCopied] = useState(false);
  const [showFull, setShowFull] = useState(false);

  const pitch = buildPitch(fields);
  const ready = isComplete(fields);
  const currentStep = STEPS[step];

  function set(key: StepKey, value: string) {
    setFields(prev => ({ ...prev, [key]: value }));
  }

  function next() {
    if (step < STEPS.length - 1) setStep(s => s + 1);
    else setShowFull(true);
  }

  function reset() {
    setFields(EMPTY);
    setStep(0);
    setShowFull(false);
  }

  async function copy() {
    await navigator.clipboard.writeText(pitch);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const currentValue = fields[currentStep.key];

  if (showFull || ready) {
    return (
      <div className="grid lg:grid-cols-[1fr_1fr] gap-8 items-start">
        {/* All answers */}
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-[15px] font-bold text-ink">Your answers</h2>
            <button onClick={reset}
              className="flex items-center gap-1.5 text-[12px] text-ink-3 hover:text-ink transition-colors">
              <RotateCcw size={12} strokeWidth={1.5} /> Start over
            </button>
          </div>
          {STEPS.map((s, i) => (
            <div key={s.key} className="bg-surface border border-line rounded-xl px-4 py-3">
              <p className="text-[11px] text-ink-3 mb-1">Q{i + 1}</p>
              <p className="text-[13px] text-ink-2 mb-1.5 leading-snug">{s.label}</p>
              <input
                type="text"
                className="w-full bg-bg border border-line rounded-lg px-3 py-2 text-[13px] text-ink outline-none focus:border-fire"
                value={fields[s.key]}
                onChange={e => set(s.key, e.target.value)}
              />
            </div>
          ))}
        </div>

        {/* Pitch output */}
        <div className="lg:sticky lg:top-8">
          <div className="bg-surface border border-line rounded-xl overflow-hidden">
            <div className="flex items-center justify-between px-5 py-3 border-b border-line">
              <div className="flex items-center gap-2 text-[13px] font-semibold text-ink">
                <Mic size={14} strokeWidth={1.5} />
                Your 60-second pitch
              </div>
              <button onClick={copy}
                className="flex items-center gap-1.5 text-[12px] font-medium text-fire hover:brightness-110 transition-colors">
                {copied ? <Check size={13} strokeWidth={1.5} /> : <Copy size={13} strokeWidth={1.5} />}
                {copied ? 'Copied!' : 'Copy pitch'}
              </button>
            </div>
            <pre className="px-5 py-5 text-[14px] leading-relaxed text-ink whitespace-pre-wrap font-[inherit]">
              {pitch}
            </pre>
          </div>
          <div className="mt-4 p-4 bg-surface border border-line rounded-xl">
            <p className="text-[13px] font-semibold text-ink mb-2">Tips for delivery</p>
            <ul className="space-y-1.5 text-[12px] text-ink-2 leading-relaxed">
              <li>Keep it to 60–90 seconds when spoken aloud</li>
              <li>Pause after your biggest win — let it land</li>
              <li>End with energy on "why this role" — that's what they remember</li>
              <li>Practise out loud at least 3 times before the interview</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  // Step-by-step wizard
  return (
    <div className="max-w-[640px]">
      {/* Progress */}
      <div className="flex items-center gap-1.5 mb-8">
        {STEPS.map((_, i) => (
          <div
            key={i}
            className={`h-1 rounded-full flex-1 transition-colors duration-300 ${
              i < step ? 'bg-fire' : i === step ? 'bg-fire opacity-50' : 'bg-line'
            }`}
          />
        ))}
      </div>

      <div className="mb-2">
        <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-fire">
          Question {step + 1} of {STEPS.length}
        </span>
      </div>
      <h2 className="text-[22px] sm:text-[26px] font-bold text-ink leading-snug tracking-[-0.02em] mb-2">
        {currentStep.label}
      </h2>
      {currentStep.hint && (
        <p className="text-[13px] text-ink-3 mb-5">{currentStep.hint}</p>
      )}

      <input
        type="text"
        autoFocus
        placeholder={currentStep.placeholder}
        value={currentValue}
        onChange={e => set(currentStep.key, e.target.value)}
        onKeyDown={e => { if (e.key === 'Enter' && currentValue.trim()) next(); }}
        className="w-full bg-surface border border-line rounded-xl px-4 py-3.5 text-[15px] text-ink outline-none focus:border-fire mb-5"
      />

      <div className="flex items-center gap-4">
        <button
          onClick={next}
          disabled={!currentValue.trim()}
          className="flex items-center gap-2 px-6 py-3 bg-fire text-bg font-bold text-[14px] rounded-xl hover:brightness-105 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {step < STEPS.length - 1 ? 'Next' : 'Build my pitch'}
          <ChevronRight size={16} strokeWidth={2} />
        </button>
        {step > 0 && (
          <button onClick={() => setStep(s => s - 1)}
            className="text-[13px] text-ink-3 hover:text-ink transition-colors">
            Back
          </button>
        )}
      </div>

      <p className="text-[11px] text-ink-3 mt-4">Press Enter to continue</p>
    </div>
  );
}
