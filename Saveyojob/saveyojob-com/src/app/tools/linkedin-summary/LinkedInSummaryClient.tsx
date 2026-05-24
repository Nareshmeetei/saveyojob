'use client';
import { useState } from 'react';
import { Loader2, RotateCcw, Sparkles, Copy, Check, ChevronRight, AlignLeft } from 'lucide-react';
import type { SummaryResult } from '@/app/api/generate-linkedin-summary/route';

type Tone = 'professional' | 'conversational' | 'storytelling';

const TONES: { value: Tone; label: string; description: string }[] = [
  { value: 'professional',   label: 'Professional',   description: 'Polished — works for most industries' },
  { value: 'conversational', label: 'Conversational', description: 'Warm and direct — great for startups' },
  { value: 'storytelling',   label: 'Storytelling',   description: 'Narrative-driven — stands out in a crowd' },
];

const CHAR_LIMIT = 2600;

export default function LinkedInSummaryClient() {
  const [currentRole,  setCurrentRole]  = useState('');
  const [skills,       setSkills]       = useState('');
  const [achievement,  setAchievement]  = useState('');
  const [goal,         setGoal]         = useState('');
  const [industry,     setIndustry]     = useState('');
  const [tone,         setTone]         = useState<Tone>('conversational');
  const [loading,      setLoading]      = useState(false);
  const [error,        setError]        = useState<string | null>(null);
  const [result,       setResult]       = useState<SummaryResult | null>(null);
  const [copied,       setCopied]       = useState(false);

  const ready =
    currentRole.trim().length >= 2 &&
    skills.trim().length      >= 5 &&
    goal.trim().length        >= 5 &&
    !loading;

  function clearResult() {
    setResult(null);
    setError(null);
    setCopied(false);
  }

  async function generate() {
    if (!ready) return;
    setLoading(true);
    clearResult();

    try {
      const res  = await fetch('/api/generate-linkedin-summary', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({
          currentRole:  currentRole.trim(),
          skills:       skills.trim(),
          achievement:  achievement.trim() || undefined,
          goal:         goal.trim(),
          industry:     industry.trim()    || undefined,
          tone,
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
    setSkills('');
    setAchievement('');
    setGoal('');
    setIndustry('');
    setTone('conversational');
    clearResult();
  }

  const charColor =
    !result         ? 'text-ink-3' :
    result.chars <= 1500 ? 'text-safe'  :
    result.chars <= 2000 ? 'text-warn'  :
    'text-accent';

  return (
    <div className="grid lg:grid-cols-[420px_1fr] gap-8 items-start">

      {/* Left — form */}
      <div className="lg:sticky lg:top-8 space-y-5">

        {/* Q1 */}
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-fire mb-1">Question 1</p>
          <label className="block text-[13px] font-medium text-ink mb-1.5">
            What is your current or most recent role? <span className="text-fire">*</span>
          </label>
          <input
            type="text"
            placeholder="e.g. Senior Product Manager, Data Scientist, Marketing Director"
            value={currentRole}
            onChange={e => { setCurrentRole(e.target.value); clearResult(); }}
            className="w-full bg-surface border border-line rounded-lg px-3 py-2.5 text-[14px] text-ink outline-none focus:border-fire placeholder:text-ink-3"
          />
        </div>

        {/* Q2 */}
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-fire mb-1">Question 2</p>
          <label className="block text-[13px] font-medium text-ink mb-1.5">
            What are you great at? <span className="text-fire">*</span>
          </label>
          <textarea
            rows={3}
            placeholder={"Your top 2–3 skills or areas of expertise\n\ne.g.\nProduct strategy, roadmap planning, stakeholder alignment\nSQL, Python, machine learning for business insights"}
            value={skills}
            onChange={e => { setSkills(e.target.value); clearResult(); }}
            className="w-full bg-surface border border-line rounded-xl px-4 py-3 text-[13px] text-ink outline-none focus:border-fire resize-none leading-relaxed placeholder:text-ink-3"
          />
          <p className="text-[11px] text-ink-3 mt-1">These get woven in as keywords recruiters search for.</p>
        </div>

        {/* Q3 */}
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-fire mb-1">Question 3</p>
          <label className="block text-[13px] font-medium text-ink mb-1.5">
            What is a career win you are proud of?{' '}
            <span className="text-ink-3 font-normal">(optional — but highly recommended)</span>
          </label>
          <textarea
            rows={2}
            placeholder="e.g. Led a product launch that grew monthly active users by 45% in one quarter"
            value={achievement}
            onChange={e => { setAchievement(e.target.value); clearResult(); }}
            className="w-full bg-surface border border-line rounded-xl px-4 py-3 text-[13px] text-ink outline-none focus:border-fire resize-none leading-relaxed placeholder:text-ink-3"
          />
        </div>

        {/* Q4 */}
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-fire mb-1">Question 4</p>
          <label className="block text-[13px] font-medium text-ink mb-1.5">
            What are you looking for next? <span className="text-fire">*</span>
          </label>
          <input
            type="text"
            placeholder="e.g. A senior IC or lead role at a growth-stage SaaS company"
            value={goal}
            onChange={e => { setGoal(e.target.value); clearResult(); }}
            className="w-full bg-surface border border-line rounded-lg px-3 py-2.5 text-[14px] text-ink outline-none focus:border-fire placeholder:text-ink-3"
          />
          <p className="text-[11px] text-ink-3 mt-1">Be specific — this shapes the closing paragraph and the CTA.</p>
        </div>

        {/* Industry (optional) */}
        <div>
          <label className="block text-[13px] font-medium text-ink mb-1.5">
            Industry <span className="text-ink-3 font-normal">(optional)</span>
          </label>
          <input
            type="text"
            placeholder="e.g. FinTech, Healthcare, E-commerce, Agency"
            value={industry}
            onChange={e => { setIndustry(e.target.value); clearResult(); }}
            className="w-full bg-surface border border-line rounded-lg px-3 py-2.5 text-[14px] text-ink outline-none focus:border-fire placeholder:text-ink-3"
          />
        </div>

        {/* Tone */}
        <div>
          <p className="text-[13px] font-semibold text-ink mb-2">Tone</p>
          <div className="grid grid-cols-3 gap-2">
            {TONES.map(t => (
              <button
                key={t.value}
                type="button"
                onClick={() => { setTone(t.value); clearResult(); }}
                className={[
                  'text-left p-3 rounded-xl border transition-colors duration-150',
                  tone === t.value
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
            ? <><Loader2 size={16} strokeWidth={1.5} className="animate-spin" />Writing your About section…</>
            : <><Sparkles size={16} strokeWidth={1.5} />Generate LinkedIn Summary<ChevronRight size={15} strokeWidth={2} /></>
          }
        </button>

        {error && <p className="text-[13px] text-accent">{error}</p>}
      </div>

      {/* Right — output */}
      <div className="lg:sticky lg:top-8 space-y-3">
        {!result ? (
          <PlaceholderCard />
        ) : (
          <>
            <div className="bg-surface border border-line rounded-xl overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-3 border-b border-line">
                <div className="flex items-center gap-2 text-[13px] font-semibold text-ink">
                  <AlignLeft size={14} strokeWidth={1.5} />
                  LinkedIn About Section
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-[11px] font-medium tabular-nums ${charColor}`}>
                    {result.chars} / {CHAR_LIMIT} chars
                  </span>
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
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                </div>
              </div>

              {/* Body */}
              <pre className="px-5 py-5 text-[13px] leading-relaxed text-ink-2 whitespace-pre-wrap font-[inherit] overflow-auto max-h-[560px]">
                {result.summary}
              </pre>
            </div>

            {/* Regenerate */}
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

            {/* Usage tip */}
            <div className="p-4 bg-surface border border-line rounded-xl space-y-1.5">
              <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-ink-3">How to add this to LinkedIn</p>
              <p className="text-[12px] text-ink-2 leading-relaxed">
                Go to your LinkedIn profile, click the pencil icon in your intro section, scroll to the About field, and paste your summary. The first 2–3 lines show before people click "see more" — make sure your hook lands.
              </p>
            </div>
          </>
        )}
      </div>

    </div>
  );
}

function PlaceholderCard() {
  const EXAMPLE = `Building products people actually use sounds obvious — until you've sat through enough planning sessions that end in features nobody asked for.

I'm a product manager with 7 years of experience in B2B SaaS, specialising in growth loops, onboarding flows, and the kind of data analysis that tells you what users do, not just what they say. Most recently, I led a pricing redesign that reduced churn by 22% and increased expansion revenue by $1.4M ARR.

I'm now looking for a VP of Product role at a growth-stage company — somewhere that values experimentation over process, and shipping over perfection.

If that sounds like your team, let's connect.`;

  return (
    <div className="bg-surface border border-line rounded-xl overflow-hidden">
      <div className="flex items-center gap-2 px-5 py-3 border-b border-line text-[13px] font-semibold text-ink">
        <AlignLeft size={14} strokeWidth={1.5} />
        Example About Section
      </div>
      <pre className="px-5 py-5 text-[13px] leading-relaxed text-ink-2 whitespace-pre-wrap font-[inherit] max-h-[420px] overflow-auto">
        {EXAMPLE}
      </pre>
      <div className="px-5 py-3.5 border-t border-line space-y-2">
        <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-ink-3">What makes this work</p>
        <ul className="space-y-1">
          {[
            'Opens with a hook — not a job title',
            'Skills appear as searchable keywords',
            'One specific achievement with real numbers',
            'Closes with what they want and a CTA',
          ].map(item => (
            <li key={item} className="text-[12px] text-ink-2 flex items-start gap-2">
              <span className="text-fire shrink-0">—</span>{item}
            </li>
          ))}
        </ul>
        <p className="text-[11px] text-ink-3 pt-1">Answer the 4 questions on the left to generate yours.</p>
      </div>
    </div>
  );
}
