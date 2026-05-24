'use client';
import { useState } from 'react';
import { Loader2, RotateCcw, Sparkles, Copy, Check, ChevronRight, Info } from 'lucide-react';
import type { SummaryResult } from '@/app/api/generate-summary/route';

const YEARS_OPTIONS = [
  'Less than 1 year',
  '1–2 years',
  '3–5 years',
  '6–9 years',
  '10–14 years',
  '15–20 years',
  '20+ years',
];

export default function ResumeSummaryClient() {
  const [currentRole,     setCurrentRole]     = useState('');
  const [yearsExperience, setYearsExperience] = useState('');
  const [topSkills,       setTopSkills]       = useState('');
  const [targetRole,      setTargetRole]      = useState('');
  const [achievement,     setAchievement]     = useState('');
  const [loading,         setLoading]         = useState(false);
  const [error,           setError]           = useState<string | null>(null);
  const [result,          setResult]          = useState<SummaryResult | null>(null);
  const [copied,          setCopied]          = useState(false);

  const ready =
    currentRole.trim().length >= 2 &&
    yearsExperience.length > 0 &&
    topSkills.trim().length >= 5 &&
    targetRole.trim().length >= 2 &&
    !loading;

  async function generate() {
    if (!ready) return;
    setLoading(true);
    setError(null);
    setResult(null);
    setCopied(false);

    try {
      const res  = await fetch('/api/generate-summary', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({
          currentRole:     currentRole.trim(),
          yearsExperience,
          topSkills:       topSkills.trim(),
          targetRole:      targetRole.trim(),
          achievement:     achievement.trim() || undefined,
        }),
      });
      const data = await res.json() as SummaryResult & { error?: string };
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
    await navigator.clipboard.writeText(result.summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function reset() {
    setCurrentRole('');
    setYearsExperience('');
    setTopSkills('');
    setTargetRole('');
    setAchievement('');
    setError(null);
    setResult(null);
    setCopied(false);
  }

  return (
    <div className="grid lg:grid-cols-[1fr_1fr] gap-8 items-start">

      {/* Left — inputs */}
      <div className="lg:sticky lg:top-8 space-y-5">

        {/* Current role */}
        <div>
          <label className="block text-[13px] font-medium text-ink mb-1.5">
            Current or most recent job title <span className="text-fire">*</span>
          </label>
          <input
            type="text"
            placeholder="e.g. Marketing Manager, Software Engineer"
            value={currentRole}
            onChange={e => { setCurrentRole(e.target.value); setResult(null); }}
            className="w-full bg-surface border border-line rounded-lg px-3 py-2.5 text-[14px] text-ink outline-none focus:border-fire"
          />
        </div>

        {/* Years of experience */}
        <div>
          <label className="block text-[13px] font-medium text-ink mb-1.5">
            Years of experience <span className="text-fire">*</span>
          </label>
          <select
            value={yearsExperience}
            onChange={e => { setYearsExperience(e.target.value); setResult(null); }}
            className="w-full bg-surface border border-line rounded-lg px-3 py-2.5 text-[14px] text-ink outline-none focus:border-fire appearance-none"
          >
            <option value="" disabled>Select years of experience</option>
            {YEARS_OPTIONS.map(y => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>

        {/* Top skills */}
        <div>
          <label className="block text-[13px] font-medium text-ink mb-1.5">
            Your top 2–3 skills or areas of expertise <span className="text-fire">*</span>
          </label>
          <textarea
            rows={3}
            placeholder={"e.g.\nData analysis, SQL, Python\nProject management, stakeholder communication"}
            value={topSkills}
            onChange={e => { setTopSkills(e.target.value); setResult(null); }}
            className="w-full bg-surface border border-line rounded-xl px-4 py-3 text-[13px] text-ink outline-none focus:border-fire resize-none leading-relaxed placeholder:text-ink-3"
          />
          <p className="text-[11px] text-ink-3 mt-1">One per line or comma-separated. The more specific, the better.</p>
        </div>

        {/* Target role */}
        <div>
          <label className="block text-[13px] font-medium text-ink mb-1.5">
            Target role or job title <span className="text-fire">*</span>
          </label>
          <input
            type="text"
            placeholder="e.g. Senior Marketing Manager, Product Manager"
            value={targetRole}
            onChange={e => { setTargetRole(e.target.value); setResult(null); }}
            className="w-full bg-surface border border-line rounded-lg px-3 py-2.5 text-[14px] text-ink outline-none focus:border-fire"
          />
          <p className="text-[11px] text-ink-3 mt-1">The role you are applying for — this shapes the entire summary.</p>
        </div>

        {/* Achievement (optional) */}
        <div>
          <label className="block text-[13px] font-medium text-ink mb-1.5">
            Your most impressive achievement{' '}
            <span className="text-ink-3 font-normal">(optional — but highly recommended)</span>
          </label>
          <textarea
            rows={2}
            placeholder="e.g. Grew email revenue by 40% in 6 months by launching a segmented campaign strategy"
            value={achievement}
            onChange={e => { setAchievement(e.target.value); setResult(null); }}
            className="w-full bg-surface border border-line rounded-xl px-4 py-3 text-[13px] text-ink outline-none focus:border-fire resize-none leading-relaxed placeholder:text-ink-3"
          />
          <p className="text-[11px] text-ink-3 mt-1">A quantified win gets woven into the summary to make it stand out.</p>
        </div>

        {/* CTA */}
        <button
          onClick={generate}
          disabled={!ready}
          className="w-full flex items-center justify-center gap-2 py-3 bg-fire text-bg text-[14px] font-bold rounded-xl hover:brightness-105 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {loading
            ? <><Loader2 size={16} strokeWidth={1.5} className="animate-spin" />Generating…</>
            : <><Sparkles size={16} strokeWidth={1.5} />Generate Summary<ChevronRight size={15} strokeWidth={2} /></>
          }
        </button>

        {error && <p className="text-[13px] text-accent">{error}</p>}
      </div>

      {/* Right — result */}
      <div>
        {!result ? (
          <ExampleCard />
        ) : (
          <div className="space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between">
              <p className="text-[13px] font-semibold text-ink">Your professional summary</p>
              <button
                onClick={reset}
                className="flex items-center gap-1.5 text-[12px] text-ink-3 hover:text-ink transition-colors"
              >
                <RotateCcw size={12} strokeWidth={1.5} />
                Start over
              </button>
            </div>

            {/* Summary card */}
            <div className="bg-surface border border-line rounded-xl overflow-hidden">
              <div className="px-5 py-4 border-b border-line">
                <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-fire mb-2">Resume Summary</p>
                <p className="text-[15px] text-ink leading-relaxed font-medium">{result.summary}</p>
              </div>

              {result.why && (
                <div className="px-5 py-3.5 flex items-start gap-2">
                  <Info size={12} strokeWidth={1.5} className="text-ink-3 mt-0.5 shrink-0" />
                  <p className="text-[12px] text-ink-3 leading-relaxed">{result.why}</p>
                </div>
              )}
            </div>

            {/* Copy button */}
            <button
              onClick={copy}
              className="w-full flex items-center justify-center gap-2 py-2.5 border border-fire text-fire text-[13px] font-semibold rounded-xl hover:bg-fire/[0.05] transition-colors"
            >
              {copied
                ? <><Check size={14} strokeWidth={1.5} />Copied to clipboard!</>
                : <><Copy size={14} strokeWidth={1.5} />Copy summary</>
              }
            </button>

            {/* Usage tip */}
            <div className="p-4 bg-surface border border-line rounded-xl space-y-1.5">
              <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-ink-3">How to use this</p>
              <p className="text-[12px] text-ink-2 leading-relaxed">
                Paste this at the top of your resume, just below your name and contact details. Replace any placeholder metrics (shown in brackets) with your real numbers before applying.
              </p>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}

function ExampleCard() {
  return (
    <div className="space-y-3">
      <p className="text-[13px] font-semibold text-ink">What you'll get</p>
      <div className="bg-surface border border-line rounded-xl overflow-hidden">
        <div className="px-5 py-4 border-b border-line">
          <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-fire mb-2">Example Summary</p>
          <p className="text-[15px] text-ink leading-relaxed font-medium">
            Marketing manager with 7 years of experience driving revenue growth through data-led email and content strategy. Skilled in campaign automation, audience segmentation, and cross-functional collaboration with sales and product teams. Seeking a Senior Marketing Director role where I can scale demand-generation programs and expand into new markets.
          </p>
        </div>
        <div className="px-5 py-3.5 flex items-start gap-2">
          <Info size={12} strokeWidth={1.5} className="text-ink-3 mt-0.5 shrink-0" />
          <p className="text-[12px] text-ink-3 leading-relaxed">
            Leads with a specific identity, names concrete skills, and ends with a forward-looking goal — recruiter-ready in 3 sentences.
          </p>
        </div>
      </div>
      <p className="text-[12px] text-ink-3 leading-relaxed">
        Fill in your details on the left and click Generate Summary.
      </p>
    </div>
  );
}
