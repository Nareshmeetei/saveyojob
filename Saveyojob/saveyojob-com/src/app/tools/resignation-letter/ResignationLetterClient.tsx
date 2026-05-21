'use client';
import { useState } from 'react';
import { Copy, Check, FileText, RotateCcw } from 'lucide-react';

const REASONS: { value: string; label: string }[] = [
  { value: 'new_opportunity', label: 'Accepting a new opportunity' },
  { value: 'career_change',   label: 'Changing career direction' },
  { value: 'relocation',      label: 'Relocating' },
  { value: 'personal',        label: 'Personal reasons' },
  { value: 'further_study',   label: 'Returning to education' },
  { value: 'unspecified',     label: 'Prefer not to specify' },
];

const REASON_PHRASES: Record<string, string> = {
  new_opportunity: 'I have accepted a new opportunity that will allow me to further develop my career.',
  career_change:   'I have decided to pursue a different career direction.',
  relocation:      'I will be relocating and am unable to continue in this role.',
  personal:        'I am leaving due to personal circumstances.',
  further_study:   'I have decided to return to full-time education.',
  unspecified:     'After careful consideration, I have decided that the time is right for me to move on.',
};

interface Fields {
  yourName: string;
  jobTitle: string;
  managerName: string;
  companyName: string;
  lastDay: string;
  reason: string;
  positiveNote: string;
}

const EMPTY: Fields = {
  yourName: '',
  jobTitle: '',
  managerName: '',
  companyName: '',
  lastDay: '',
  reason: 'new_opportunity',
  positiveNote: '',
};

function buildLetter(f: Fields): string {
  const date = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  const lastDayFormatted = f.lastDay
    ? new Date(f.lastDay + 'T00:00:00').toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    : '[Last Working Day]';
  const reasonPhrase = REASON_PHRASES[f.reason] ?? REASON_PHRASES['unspecified'];
  const positiveBlock = f.positiveNote.trim()
    ? `\n${f.positiveNote.trim()}\n`
    : `\nI am grateful for the opportunities I have had at ${f.companyName || '[Company Name]'} and for the support of my colleagues and management team.\n`;

  return `${date}

${f.managerName || '[Manager Name]'}
${f.companyName || '[Company Name]'}

Dear ${f.managerName || '[Manager Name]'},

I am writing to formally notify you of my resignation from my position as ${f.jobTitle || '[Job Title]'} at ${f.companyName || '[Company Name]'}, effective ${lastDayFormatted}.
${positiveBlock}
I will do everything I can to ensure a smooth transition, including completing outstanding work and helping to onboard my replacement if needed.

Thank you for the opportunity to be part of the team.

Sincerely,
${f.yourName || '[Your Name]'}`;
}

function isComplete(f: Fields): boolean {
  return !!(f.yourName && f.jobTitle && f.managerName && f.companyName && f.lastDay);
}

export default function ResignationLetterClient() {
  const [fields, setFields] = useState<Fields>(EMPTY);
  const [copied, setCopied] = useState(false);

  const letter = buildLetter(fields);
  const ready = isComplete(fields);

  function set(key: keyof Fields, value: string) {
    setFields(prev => ({ ...prev, [key]: value }));
  }

  async function copy() {
    await navigator.clipboard.writeText(letter);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="grid lg:grid-cols-[1fr_1fr] gap-8 items-start">

      {/* Form */}
      <div className="space-y-5">
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Your full name" required>
            <input
              type="text"
              placeholder="Jane Smith"
              value={fields.yourName}
              onChange={e => set('yourName', e.target.value)}
            />
          </Field>
          <Field label="Your job title" required>
            <input
              type="text"
              placeholder="Marketing Manager"
              value={fields.jobTitle}
              onChange={e => set('jobTitle', e.target.value)}
            />
          </Field>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Manager's name" required>
            <input
              type="text"
              placeholder="John Doe"
              value={fields.managerName}
              onChange={e => set('managerName', e.target.value)}
            />
          </Field>
          <Field label="Company name" required>
            <input
              type="text"
              placeholder="Acme Corp"
              value={fields.companyName}
              onChange={e => set('companyName', e.target.value)}
            />
          </Field>
        </div>

        <Field label="Last working day" required>
          <input
            type="date"
            value={fields.lastDay}
            onChange={e => set('lastDay', e.target.value)}
          />
        </Field>

        <Field label="Reason for leaving">
          <select
            value={fields.reason}
            onChange={e => set('reason', e.target.value)}
          >
            {REASONS.map(r => (
              <option key={r.value} value={r.value}>{r.label}</option>
            ))}
          </select>
        </Field>

        <Field label="Optional: positive note about your time there">
          <textarea
            rows={3}
            placeholder="e.g. I've learned a great deal working alongside the team, and I'm proud of what we achieved together."
            value={fields.positiveNote}
            onChange={e => set('positiveNote', e.target.value)}
          />
        </Field>

        {!ready && (
          <p className="text-[12px] text-ink-3">Fill in the required fields to generate your letter.</p>
        )}
      </div>

      {/* Output */}
      <div className="lg:sticky lg:top-8">
        <div className={`bg-surface border border-line rounded-xl overflow-hidden transition-opacity duration-200 ${ready ? 'opacity-100' : 'opacity-40'}`}>
          <div className="flex items-center justify-between px-5 py-3 border-b border-line">
            <div className="flex items-center gap-2 text-[13px] font-semibold text-ink">
              <FileText size={14} strokeWidth={1.5} />
              Resignation Letter
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setFields(EMPTY)}
                className="flex items-center gap-1.5 text-[12px] text-ink-3 hover:text-ink transition-colors"
                title="Start over"
              >
                <RotateCcw size={12} strokeWidth={1.5} />
                Reset
              </button>
              <button
                onClick={copy}
                disabled={!ready}
                className="flex items-center gap-1.5 text-[12px] font-medium transition-colors disabled:opacity-30 disabled:cursor-not-allowed text-fire hover:brightness-110"
              >
                {copied ? <Check size={13} strokeWidth={1.5} /> : <Copy size={13} strokeWidth={1.5} />}
                {copied ? 'Copied!' : 'Copy letter'}
              </button>
            </div>
          </div>
          <pre className="px-5 py-5 text-[13px] leading-relaxed text-ink-2 whitespace-pre-wrap font-[inherit] overflow-auto max-h-[600px]">
            {letter}
          </pre>
        </div>

        <p className="text-[11px] text-ink-3 mt-3 leading-relaxed">
          Review before sending. You may want to personalise the tone to match your relationship with your manager.
        </p>
      </div>

    </div>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-[13px] font-medium text-ink mb-1.5">
        {label}
        {required && <span className="text-fire ml-0.5">*</span>}
      </label>
      <div className="[&_input]:w-full [&_select]:w-full [&_textarea]:w-full [&_input]:bg-surface [&_select]:bg-surface [&_textarea]:bg-surface [&_input]:border [&_select]:border [&_textarea]:border [&_input]:border-line [&_select]:border-line [&_textarea]:border-line [&_input]:rounded-lg [&_select]:rounded-lg [&_textarea]:rounded-lg [&_input]:px-3 [&_select]:px-3 [&_textarea]:px-3 [&_input]:py-2.5 [&_select]:py-2.5 [&_textarea]:py-2.5 [&_input]:text-[14px] [&_select]:text-[14px] [&_textarea]:text-[14px] [&_input]:text-ink [&_select]:text-ink [&_textarea]:text-ink [&_input]:outline-none [&_select]:outline-none [&_textarea]:outline-none [&_input]:focus:border-fire [&_select]:focus:border-fire [&_textarea]:focus:border-fire [&_textarea]:resize-none">
        {children}
      </div>
    </div>
  );
}
