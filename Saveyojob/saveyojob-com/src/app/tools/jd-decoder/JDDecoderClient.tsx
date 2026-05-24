'use client';
import { useState } from 'react';
import { Loader2, RotateCcw, FileSearch, ChevronRight, AlertTriangle, Eye, Hash, Copy, Check } from 'lucide-react';
import type { JDResult } from '@/app/api/decode-jd/route';

export default function JDDecoderClient() {
  const [jobDescription, setJobDescription] = useState('');
  const [loading,        setLoading]        = useState(false);
  const [error,          setError]          = useState<string | null>(null);
  const [result,         setResult]         = useState<JDResult | null>(null);
  const [copiedPhrase,   setCopiedPhrase]   = useState<string | null>(null);

  const ready = jobDescription.trim().length >= 50 && !loading;

  async function decode() {
    if (!ready) return;
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res  = await fetch('/api/decode-jd', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ jobDescription: jobDescription.trim() }),
      });
      const data = await res.json() as JDResult & { error?: string };
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

  async function copyPhrase(phrase: string) {
    await navigator.clipboard.writeText(phrase);
    setCopiedPhrase(phrase);
    setTimeout(() => setCopiedPhrase(null), 2000);
  }

  function reset() {
    setJobDescription('');
    setResult(null);
    setError(null);
    setCopiedPhrase(null);
  }

  return (
    <div className="grid lg:grid-cols-[420px_1fr] gap-8 items-start">

      {/* Left — input */}
      <div className="lg:sticky lg:top-8 space-y-4">
        <div>
          <label className="block text-[13px] font-medium text-ink mb-1.5">
            Job description <span className="text-fire">*</span>
          </label>
          <p className="text-[11px] text-ink-3 mb-2">
            Paste the full posting — the more detail, the better the decode.
          </p>
          <textarea
            rows={14}
            placeholder={"Paste the full job description here…\n\nThe tool will decode what the corporate language really means, flag anything worth watching, and pull out the exact phrases to mirror in your application."}
            value={jobDescription}
            onChange={e => { setJobDescription(e.target.value); setResult(null); setError(null); }}
            className="w-full bg-surface border border-line rounded-xl px-4 py-3 text-[13px] text-ink outline-none focus:border-fire resize-none leading-relaxed placeholder:text-ink-3"
          />
          {jobDescription.trim().length > 0 && jobDescription.trim().length < 50 && (
            <p className="text-[11px] text-accent mt-1.5">Paste more of the job description for a useful decode.</p>
          )}
          {jobDescription.trim().length >= 50 && (
            <p className="text-[11px] text-ink-3 mt-1.5">{jobDescription.trim().length} characters</p>
          )}
        </div>

        <button
          onClick={decode}
          disabled={!ready}
          className="w-full flex items-center justify-center gap-2 py-3 bg-fire text-bg text-[14px] font-bold rounded-xl hover:brightness-105 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {loading
            ? <><Loader2 size={16} strokeWidth={1.5} className="animate-spin" />Decoding…</>
            : <><FileSearch size={16} strokeWidth={1.5} />Decode This Job Posting<ChevronRight size={15} strokeWidth={2} /></>
          }
        </button>

        {error && <p className="text-[13px] text-accent">{error}</p>}
      </div>

      {/* Right — results */}
      <div className="space-y-4">
        {!result ? (
          <PlaceholderCard />
        ) : (
          <>
            <div className="flex items-center justify-between mb-1">
              <p className="text-[13px] font-semibold text-ink">Decoded</p>
              <button
                onClick={reset}
                className="flex items-center gap-1.5 text-[12px] text-ink-3 hover:text-ink transition-colors"
              >
                <RotateCcw size={12} strokeWidth={1.5} />
                Start over
              </button>
            </div>

            {/* What they actually want */}
            <div className="bg-surface border border-line rounded-xl overflow-hidden">
              <div className="flex items-center gap-2 px-5 py-3.5 border-b border-line">
                <Eye size={14} strokeWidth={1.5} className="text-fire shrink-0" />
                <p className="text-[13px] font-bold text-ink">What they actually want</p>
              </div>
              <div className="divide-y divide-line">
                {result.whatTheyWant.map((item, i) => (
                  <div key={i} className="px-5 py-4">
                    <p className="text-[12px] font-semibold text-fire mb-1 italic">&ldquo;{item.phrase}&rdquo;</p>
                    <p className="text-[13px] text-ink-2 leading-relaxed">{item.meaning}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Red flags */}
            {result.redFlags.length > 0 ? (
              <div className="bg-surface border border-line rounded-xl overflow-hidden">
                <div className="flex items-center gap-2 px-5 py-3.5 border-b border-line">
                  <AlertTriangle size={14} strokeWidth={1.5} className="text-accent shrink-0" />
                  <p className="text-[13px] font-bold text-ink">Red flags to watch</p>
                </div>
                <div className="divide-y divide-line">
                  {result.redFlags.map((flag, i) => (
                    <div key={i} className="px-5 py-4">
                      <p className="text-[12px] font-semibold text-accent mb-1 italic">&ldquo;{flag.phrase}&rdquo;</p>
                      <p className="text-[13px] text-ink-2 leading-relaxed">{flag.warning}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3 px-5 py-4 bg-safe/[0.07] border border-safe/20 rounded-xl">
                <AlertTriangle size={14} strokeWidth={1.5} className="text-safe shrink-0" />
                <p className="text-[13px] text-ink-2">No significant red flags in this posting.</p>
              </div>
            )}

            {/* Phrases to mirror */}
            <div className="bg-surface border border-line rounded-xl overflow-hidden">
              <div className="flex items-center gap-2 px-5 py-3.5 border-b border-line">
                <Hash size={14} strokeWidth={1.5} className="text-[#097BA0] shrink-0" />
                <p className="text-[13px] font-bold text-ink">Phrases to mirror in your application</p>
              </div>
              <div className="px-5 py-4">
                <p className="text-[11px] text-ink-3 mb-3">Use these exact words in your resume and cover letter — click to copy.</p>
                <div className="flex flex-wrap gap-2">
                  {result.phrasesToMirror.map(phrase => (
                    <button
                      key={phrase}
                      onClick={() => copyPhrase(phrase)}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-secondary/[0.12] border border-secondary/25 rounded-lg text-[12px] font-medium text-[#097BA0] hover:bg-secondary/[0.2] transition-colors"
                    >
                      {copiedPhrase === phrase
                        ? <><Check size={11} strokeWidth={1.5} />Copied</>
                        : <><Copy size={11} strokeWidth={1.5} />{phrase}</>
                      }
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <p className="text-[11px] text-ink-3 leading-relaxed">
              This is a starting point — use your own judgement before deciding to apply or withdraw.
            </p>
          </>
        )}
      </div>

    </div>
  );
}

function PlaceholderCard() {
  return (
    <div className="space-y-4">
      <p className="text-[13px] font-semibold text-ink">What you&apos;ll get</p>

      {/* Example decoded insight */}
      <div className="bg-surface border border-line rounded-xl overflow-hidden">
        <div className="flex items-center gap-2 px-5 py-3.5 border-b border-line">
          <Eye size={14} strokeWidth={1.5} className="text-fire shrink-0" />
          <p className="text-[13px] font-bold text-ink">What they actually want</p>
        </div>
        <div className="divide-y divide-line">
          <div className="px-5 py-4">
            <p className="text-[12px] font-semibold text-fire mb-1 italic">&ldquo;Drive cross-functional alignment&rdquo;</p>
            <p className="text-[13px] text-ink-2 leading-relaxed">You&apos;ll need to convince people who don&apos;t report to you — expect internal politics and stakeholder management to be a big part of the job.</p>
          </div>
          <div className="px-5 py-4 opacity-50">
            <p className="text-[12px] font-semibold text-fire mb-1 italic">&ldquo;Self-starter who thrives in ambiguity&rdquo;</p>
            <p className="text-[13px] text-ink-2 leading-relaxed">There&apos;s limited structure or guidance — you&apos;re expected to figure things out with minimal direction.</p>
          </div>
        </div>
      </div>

      {/* Example red flag */}
      <div className="bg-surface border border-line rounded-xl overflow-hidden">
        <div className="flex items-center gap-2 px-5 py-3.5 border-b border-line">
          <AlertTriangle size={14} strokeWidth={1.5} className="text-accent shrink-0" />
          <p className="text-[13px] font-bold text-ink">Red flags to watch</p>
        </div>
        <div className="px-5 py-4">
          <p className="text-[12px] font-semibold text-accent mb-1 italic">&ldquo;Fast-paced, high-growth environment&rdquo;</p>
          <p className="text-[13px] text-ink-2 leading-relaxed">Often signals high turnover, poor planning, or an expectation to always be available.</p>
        </div>
      </div>

      <p className="text-[12px] text-ink-3 leading-relaxed">
        Paste the job description on the left — you&apos;ll get a plain-English breakdown of what the role really involves, what to watch out for, and the exact phrases to use in your application.
      </p>
    </div>
  );
}
