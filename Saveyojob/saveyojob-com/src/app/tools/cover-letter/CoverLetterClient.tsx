'use client';
import { useState } from 'react';
import { Copy, Check, Mail, RotateCcw, Sparkles, Loader2, ChevronRight } from 'lucide-react';
import type { CoverLetterResult } from '@/app/api/generate-cover-letter/route';

type Tone = 'professional' | 'conversational' | 'confident';

interface Fields {
  yourName:      string;
  companyName:   string;
  hiringManager: string;
  jobDescription: string;
  strength1:     string;
  strength2:     string;
  strength3:     string;
  tone:          Tone;
}

const EMPTY: Fields = {
  yourName:       '',
  companyName:    '',
  hiringManager:  '',
  jobDescription: '',
  strength1:      '',
  strength2:      '',
  strength3:      '',
  tone:           'professional',
};

const TONES: { value: Tone; label: string; description: string }[] = [
  { value: 'professional',   label: 'Professional',   description: 'Clear and polished — works for most roles' },
  { value: 'conversational', label: 'Conversational', description: 'Warm and direct — great for startups and creative fields' },
  { value: 'confident',      label: 'Confident',      description: 'Bold and assertive — good for senior roles' },
];

export default function CoverLetterClient() {
  const [fields,  setFields]  = useState<Fields>(EMPTY);
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState<string | null>(null);
  const [result,  setResult]  = useState<CoverLetterResult | null>(null);
  const [copied,  setCopied]  = useState(false);

  const ready =
    fields.yourName.trim().length >= 2 &&
    fields.jobDescription.trim().length >= 50 &&
    fields.strength1.trim().length >= 5 &&
    !loading;

  function set(key: keyof Fields, value: string) {
    setFields(prev => ({ ...prev, [key]: value }));
    setResult(null);
  }

  async function generate() {
    if (!ready) return;
    setLoading(true);
    setError(null);
    setResult(null);
    setCopied(false);

    try {
      const res  = await fetch('/api/generate-cover-letter', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({
          jobDescription:  fields.jobDescription.trim(),
          strength1:       fields.strength1.trim(),
          strength2:       fields.strength2.trim() || undefined,
          strength3:       fields.strength3.trim() || undefined,
          yourName:        fields.yourName.trim(),
          companyName:     fields.companyName.trim() || undefined,
          hiringManager:   fields.hiringManager.trim() || undefined,
          tone:            fields.tone,
        }),
      });
      const data = await res.json() as CoverLetterResult & { error?: string };
      if (!res.ok || data.error) {
        setError(data.error ?? 'Something went wrong — please try again.');
      } else {
        setResult(data);
      }
    } catch {
      setError('Your internet connection dropped — please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  }

  async function copy() {
    if (!result) return;
    await navigator.clipboard.writeText(result.letter);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function reset() {
    setFields(EMPTY);
    setResult(null);
    setError(null);
    setCopied(false);
  }

  return (
    <div className="grid lg:grid-cols-[1fr_1fr] gap-8 items-start">

      {/* Left — form */}
      <div className="space-y-5">

        {/* Name + company row */}
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Your full name" required>
            <input type="text" placeholder="Jane Smith"
              value={fields.yourName}
              onChange={e => set('yourName', e.target.value)} />
          </Field>
          <Field label="Company name" hint="If known — helps the letter feel specific">
            <input type="text" placeholder="e.g. Acme Corp"
              value={fields.companyName}
              onChange={e => set('companyName', e.target.value)} />
          </Field>
        </div>

        {/* Hiring manager */}
        <Field label="Hiring manager's name" hint="Leave blank to use 'Hiring Manager'">
          <input type="text" placeholder="e.g. Sarah Johnson"
            value={fields.hiringManager}
            onChange={e => set('hiringManager', e.target.value)} />
        </Field>

        {/* Job description */}
        <Field label="Job description" required hint="Paste the full job posting — the more detail, the more specific the letter">
          <textarea
            rows={10}
            placeholder={"Paste the full job description here…\n\nThe AI uses it to write a letter that references specific requirements, goals, and language from the posting — not a generic template."}
            value={fields.jobDescription}
            onChange={e => set('jobDescription', e.target.value)}
          />
        </Field>

        {/* Strengths */}
        <div className="p-4 bg-surface border border-line rounded-xl space-y-4">
          <div>
            <p className="text-[13px] font-semibold text-ink">Your strengths for this role</p>
            <p className="text-[11px] text-ink-3 mt-0.5">Specific skills or wins the letter should highlight. Match them to what the job asks for.</p>
          </div>
          <Field label="Strength 1" required hint="e.g. 5 years leading cross-functional product launches, including [Product] which grew revenue by 30%">
            <input type="text"
              placeholder="e.g. Led 12 product launches across 3 markets, growing revenue by 30% year over year"
              value={fields.strength1}
              onChange={e => set('strength1', e.target.value)} />
          </Field>
          <Field label="Strength 2">
            <input type="text"
              placeholder="e.g. Expert in SQL and Python for data analysis — built dashboards used by C-suite"
              value={fields.strength2}
              onChange={e => set('strength2', e.target.value)} />
          </Field>
          <Field label="Strength 3">
            <input type="text"
              placeholder="e.g. Managed a team of 8 engineers and consistently shipped on time"
              value={fields.strength3}
              onChange={e => set('strength3', e.target.value)} />
          </Field>
        </div>

        {/* Tone */}
        <div>
          <p className="text-[13px] font-semibold text-ink mb-2">Tone</p>
          <div className="grid sm:grid-cols-3 gap-2">
            {TONES.map(t => (
              <button
                key={t.value}
                type="button"
                onClick={() => set('tone', t.value)}
                className={[
                  'text-left p-3 rounded-xl border transition-colors duration-150',
                  fields.tone === t.value
                    ? 'border-fire bg-fire/[0.05] text-ink'
                    : 'border-line bg-surface text-ink-2 hover:border-line-2 hover:text-ink',
                ].join(' ')}
              >
                <p className="text-[13px] font-semibold leading-snug">{t.label}</p>
                <p className="text-[11px] text-ink-3 mt-0.5 leading-snug">{t.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={generate}
          disabled={!ready}
          className="w-full flex items-center justify-center gap-2 py-3 bg-fire text-bg text-[14px] font-bold rounded-xl hover:brightness-105 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {loading
            ? <><Loader2 size={16} strokeWidth={1.5} className="animate-spin" />Writing your letter…</>
            : <><Sparkles size={16} strokeWidth={1.5} />Generate Cover Letter<ChevronRight size={15} strokeWidth={2} /></>
          }
        </button>

        {error && <p className="text-[13px] text-accent">{error}</p>}

        {!ready && !loading && (
          <p className="text-[12px] text-ink-3">
            Fill in your name, the job description, and at least one strength to generate.
          </p>
        )}
      </div>

      {/* Right — output */}
      <div className="lg:sticky lg:top-8 space-y-3">
        {!result ? (
          <PlaceholderCard />
        ) : (
          <>
            <div className="bg-surface border border-line rounded-xl overflow-hidden">
              <div className="flex items-center justify-between px-5 py-3 border-b border-line">
                <div className="flex items-center gap-2 text-[13px] font-semibold text-ink">
                  <Mail size={14} strokeWidth={1.5} />
                  Cover Letter
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={reset}
                    className="flex items-center gap-1.5 text-[12px] text-ink-3 hover:text-ink transition-colors"
                  >
                    <RotateCcw size={12} strokeWidth={1.5} />
                    Start over
                  </button>
                  <button
                    onClick={copy}
                    className="flex items-center gap-1.5 text-[12px] font-medium text-fire hover:brightness-110 transition-colors"
                  >
                    {copied ? <Check size={13} strokeWidth={1.5} /> : <Copy size={13} strokeWidth={1.5} />}
                    {copied ? 'Copied!' : 'Copy letter'}
                  </button>
                </div>
              </div>
              <pre className="px-5 py-5 text-[13px] leading-relaxed text-ink-2 whitespace-pre-wrap font-[inherit] overflow-auto max-h-[640px]">
                {result.letter}
              </pre>
            </div>

            <button
              onClick={generate}
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-2.5 bg-fire/[0.07] border border-fire/30 text-fire text-[13px] font-semibold rounded-xl hover:bg-fire/[0.12] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {loading
                ? <><Loader2 size={14} strokeWidth={1.5} className="animate-spin" />Rewriting…</>
                : <><Sparkles size={14} strokeWidth={1.5} />Regenerate</>
              }
            </button>

            <p className="text-[11px] text-ink-3 leading-relaxed">
              Review and personalise before sending — the more specific your strengths, the less editing you will need.
            </p>
          </>
        )}
      </div>

    </div>
  );
}

function PlaceholderCard() {
  return (
    <div className="bg-surface border border-line rounded-xl overflow-hidden">
      <div className="flex items-center gap-2 px-5 py-3 border-b border-line text-[13px] font-semibold text-ink">
        <Mail size={14} strokeWidth={1.5} />
        Cover Letter
      </div>
      <div className="px-5 py-8 space-y-3 text-center">
        <div className="w-10 h-10 rounded-xl bg-fire/[0.08] flex items-center justify-center mx-auto">
          <Sparkles size={18} strokeWidth={1.5} className="text-fire" />
        </div>
        <p className="text-[14px] font-semibold text-ink">Your letter will appear here</p>
        <p className="text-[12px] text-ink-3 leading-relaxed max-w-[280px] mx-auto">
          Fill in the job description and your strengths on the left, then click Generate Cover Letter.
        </p>
        <div className="pt-4 border-t border-line text-left space-y-2">
          <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-ink-3">What makes this letter different</p>
          <ul className="space-y-1.5">
            {[
              'Opens with a hook — never "I am writing to apply"',
              'References specific requirements from the job posting',
              'Ties your strengths directly to what the role needs',
              '200–280 words — not a wall of text',
            ].map(item => (
              <li key={item} className="text-[12px] text-ink-2 leading-relaxed flex items-start gap-2">
                <span className="text-fire mt-0.5 shrink-0">—</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function Field({ label, required, hint, children }: {
  label: string; required?: boolean; hint?: string; children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-[13px] font-medium text-ink mb-1">
        {label}{required && <span className="text-fire ml-0.5">*</span>}
      </label>
      {hint && <p className="text-[11px] text-ink-3 mb-1.5">{hint}</p>}
      <div className="[&_input]:w-full [&_textarea]:w-full [&_input]:bg-surface [&_textarea]:bg-surface [&_input]:border [&_textarea]:border [&_input]:border-line [&_textarea]:border-line [&_input]:rounded-lg [&_textarea]:rounded-xl [&_input]:px-3 [&_textarea]:px-4 [&_input]:py-2.5 [&_textarea]:py-3 [&_input]:text-[14px] [&_textarea]:text-[13px] [&_input]:text-ink [&_textarea]:text-ink [&_input]:outline-none [&_textarea]:outline-none [&_input]:focus:border-fire [&_textarea]:focus:border-fire [&_textarea]:resize-none [&_textarea]:leading-relaxed [&_input]:placeholder:text-ink-3 [&_textarea]:placeholder:text-ink-3">
        {children}
      </div>
    </div>
  );
}
