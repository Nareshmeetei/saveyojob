'use client';
import { useState } from 'react';
import { Loader2, RotateCcw, Sparkles, Copy, Check, Info, ChevronRight } from 'lucide-react';
import type { BulletRewrite } from '@/app/api/rewrite-bullets/route';

const MAX_BULLETS = 10;
const MIN_LEN     = 5;

export default function ResumeBulletRewriterClient() {
  const [rawBullets, setRawBullets] = useState('');
  const [role,       setRole]       = useState('');
  const [loading,    setLoading]    = useState(false);
  const [error,      setError]      = useState<string | null>(null);
  const [rewrites,   setRewrites]   = useState<BulletRewrite[] | null>(null);
  const [copiedIdx,  setCopiedIdx]  = useState<number | null>(null);
  const [allCopied,  setAllCopied]  = useState(false);

  const bullets = rawBullets
    .split('\n')
    .map(b => b.replace(/^[-•·]\s*/, '').trim())
    .filter(b => b.length >= MIN_LEN);

  const tooMany = bullets.length > MAX_BULLETS;
  const ready   = bullets.length >= 1 && !tooMany && !loading;

  async function rewrite() {
    if (!ready) return;
    setLoading(true);
    setError(null);
    setRewrites(null);
    setCopiedIdx(null);
    setAllCopied(false);

    try {
      const res = await fetch('/api/rewrite-bullets', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ bullets: bullets.slice(0, MAX_BULLETS), role: role.trim() || undefined }),
      });
      const data = await res.json() as { rewrites?: BulletRewrite[]; error?: string };
      if (!res.ok || data.error) {
        setError(data.error ?? 'Something went wrong — please try again.');
      } else {
        setRewrites(data.rewrites ?? []);
      }
    } catch {
      setError('Your internet connection dropped — please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  }

  async function copyBullet(i: number, text: string) {
    await navigator.clipboard.writeText(text);
    setCopiedIdx(i);
    setTimeout(() => setCopiedIdx(null), 2000);
  }

  async function copyAll() {
    if (!rewrites) return;
    await navigator.clipboard.writeText(rewrites.map(r => r.rewritten).join('\n'));
    setAllCopied(true);
    setTimeout(() => setAllCopied(false), 2000);
  }

  function reset() {
    setRawBullets('');
    setRole('');
    setError(null);
    setRewrites(null);
    setCopiedIdx(null);
    setAllCopied(false);
  }

  return (
    <div className="grid lg:grid-cols-[1fr_1fr] gap-8 items-start">

      {/* Left — Input (sticky so form stays visible while scrolling results) */}
      <div className="lg:sticky lg:top-8 space-y-5">

        {/* Bullets textarea */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-[13px] font-medium text-ink">
              Your resume bullets <span className="text-fire">*</span>
            </label>
            <span className={`text-[11px] font-medium ${tooMany ? 'text-accent' : 'text-ink-3'}`}>
              {bullets.length} / {MAX_BULLETS}
            </span>
          </div>
          <textarea
            rows={12}
            placeholder={"One bullet per line, e.g.\n\nManaged social media accounts\nHelped improve sales numbers\nTrained new employees\nWorked on customer service"}
            value={rawBullets}
            onChange={e => { setRawBullets(e.target.value); setRewrites(null); }}
            className="w-full bg-surface border border-line rounded-xl px-4 py-3 text-[13px] text-ink outline-none focus:border-fire resize-none leading-relaxed placeholder:text-ink-3"
          />
          {tooMany && (
            <p className="text-[12px] text-accent mt-1.5">
              You have {bullets.length} bullets — remove {bullets.length - MAX_BULLETS} to continue (max {MAX_BULLETS}).
            </p>
          )}
        </div>

        {/* Role field */}
        <div>
          <label className="block text-[13px] font-medium text-ink mb-1.5">
            Your role or target job <span className="text-ink-3 font-normal">(optional)</span>
          </label>
          <input
            type="text"
            placeholder="e.g. Senior Marketing Manager, Software Engineer"
            value={role}
            onChange={e => setRole(e.target.value)}
            className="w-full bg-surface border border-line rounded-lg px-3 py-2.5 text-[14px] text-ink outline-none focus:border-fire"
          />
          <p className="text-[11px] text-ink-3 mt-1.5">Helps the AI use the right language and industry context.</p>
        </div>

        {/* XYZ formula explainer */}
        <div className="p-4 bg-surface border border-line rounded-xl space-y-2">
          <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-ink-3">XYZ Formula</p>
          <p className="text-[13px] text-ink-2 leading-relaxed">
            Accomplished{' '}
            <span className="font-semibold text-fire">[X]</span>
            {' '}as measured by{' '}
            <span className="font-semibold text-fire">[Y]</span>
            {' '}by doing{' '}
            <span className="font-semibold text-fire">[Z]</span>
          </p>
          <p className="text-[11px] text-ink-3 leading-relaxed">
            Developed by Google recruiters. Bullets with numbers are 40% more likely to get interviews.
          </p>
        </div>

        {/* CTA */}
        <button
          onClick={rewrite}
          disabled={!ready}
          className="w-full flex items-center justify-center gap-2 py-3 bg-fire text-bg text-[14px] font-bold rounded-xl hover:brightness-105 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {loading
            ? <><Loader2 size={16} strokeWidth={1.5} className="animate-spin" />Rewriting…</>
            : <><Sparkles size={16} strokeWidth={1.5} />Rewrite {bullets.length > 0 ? `${Math.min(bullets.length, MAX_BULLETS)} bullet${bullets.length !== 1 ? 's' : ''}` : 'bullets'}<ChevronRight size={15} strokeWidth={2} /></>
          }
        </button>

        {error && <p className="text-[13px] text-accent">{error}</p>}
      </div>

      {/* Right — Results */}
      <div className="space-y-4">
        {!rewrites ? (
          <ExampleCard />
        ) : (
          <>
            {/* Results header */}
            <div className="flex items-center justify-between">
              <p className="text-[13px] font-semibold text-ink">
                {rewrites.length} bullet{rewrites.length !== 1 ? 's' : ''} rewritten
              </p>
              <div className="flex items-center gap-4">
                <button
                  onClick={reset}
                  className="flex items-center gap-1.5 text-[12px] text-ink-3 hover:text-ink transition-colors"
                >
                  <RotateCcw size={12} strokeWidth={1.5} />
                  Start over
                </button>
                <button
                  onClick={copyAll}
                  className="flex items-center gap-1.5 text-[12px] font-medium text-fire hover:brightness-110 transition-colors"
                >
                  {allCopied ? <Check size={12} strokeWidth={1.5} /> : <Copy size={12} strokeWidth={1.5} />}
                  {allCopied ? 'All copied!' : 'Copy all'}
                </button>
              </div>
            </div>

            {/* Bullet cards */}
            {rewrites.map((rw, i) => (
              <div key={i} className="bg-surface border border-line rounded-xl overflow-hidden">
                {/* Original */}
                <div className="px-4 pt-3.5 pb-3 border-b border-line">
                  <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-ink-3 mb-1.5">Original</p>
                  <p className="text-[13px] text-ink-2 leading-relaxed">{rw.original}</p>
                </div>

                {/* Rewritten */}
                <div className="px-4 pt-3 pb-3.5">
                  <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-fire mb-1.5">Rewritten</p>
                  <p className="text-[13px] font-semibold text-ink leading-relaxed">{rw.rewritten}</p>

                  {rw.tip && (
                    <div className="mt-3 pt-2.5 border-t border-line flex items-start gap-2">
                      <Info size={11} strokeWidth={1.5} className="text-ink-3 mt-0.5 shrink-0" />
                      <p className="text-[11px] text-ink-3 leading-relaxed">{rw.tip}</p>
                    </div>
                  )}

                  <div className="mt-3 flex justify-end">
                    <button
                      onClick={() => copyBullet(i, rw.rewritten)}
                      className="flex items-center gap-1.5 text-[12px] font-medium text-fire hover:brightness-110 transition-colors"
                    >
                      {copiedIdx === i
                        ? <><Check size={12} strokeWidth={1.5} />Copied!</>
                        : <><Copy size={12} strokeWidth={1.5} />Copy</>
                      }
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </>
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
        <div className="px-4 pt-3.5 pb-3 border-b border-line">
          <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-ink-3 mb-1.5">Original</p>
          <p className="text-[13px] text-ink-2 leading-relaxed">Helped improve social media presence</p>
        </div>
        <div className="px-4 pt-3 pb-3.5">
          <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-fire mb-1.5">Rewritten</p>
          <p className="text-[13px] font-semibold text-ink leading-relaxed">
            Grew LinkedIn following by [X%] in 6 months by launching a weekly thought-leadership content series, increasing qualified inbound leads by [Y].
          </p>
          <div className="mt-3 pt-2.5 border-t border-line flex items-start gap-2">
            <Info size={11} strokeWidth={1.5} className="text-ink-3 mt-0.5 shrink-0" />
            <p className="text-[11px] text-ink-3 leading-relaxed">
              Check LinkedIn Analytics for your follower growth % and ask your manager how many leads came from organic social.
            </p>
          </div>
        </div>
      </div>
      <p className="text-[12px] text-ink-3 leading-relaxed">
        Paste your bullets on the left and click Rewrite to see your versions.
      </p>
    </div>
  );
}
