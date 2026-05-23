'use client';
import { useState, useRef } from 'react';
import { Upload, X, Loader2, RotateCcw, FileCheck, ChevronRight } from 'lucide-react';
import type { ATSResult } from '@/app/api/ats-check/route';

function scoreLabel(score: number): { label: string; color: string; bg: string; bar: string } {
  if (score >= 75) return { label: 'Strong Match',  color: 'text-safe',   bg: 'bg-safe/10',   bar: 'bg-safe'   };
  if (score >= 50) return { label: 'Fair Match',    color: 'text-warn',   bg: 'bg-warn/10',   bar: 'bg-warn'   };
  return              { label: 'Weak Match',    color: 'text-accent', bg: 'bg-accent/10', bar: 'bg-accent' };
}

export default function ATSCheckerClient() {
  const [resumeText,     setResumeText]     = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [fileName,       setFileName]       = useState<string | null>(null);
  const [fileLoading,    setFileLoading]    = useState(false);
  const [fileError,      setFileError]      = useState<string | null>(null);
  const [checking,       setChecking]       = useState(false);
  const [result,         setResult]         = useState<ATSResult | null>(null);
  const [error,          setError]          = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const ready = resumeText.trim().length >= 50 && jobDescription.trim().length >= 50;

  async function handleFile(file: File) {
    setFileLoading(true);
    setFileError(null);
    setFileName(file.name);
    setResult(null);

    const ext = file.name.split('.').pop()?.toLowerCase();

    try {
      if (ext === 'pdf') {
        // Extract PDF text in the browser — avoids serverless canvas/worker issues
        const pdfjsLib = await import('pdfjs-dist');
        // Load worker from jsDelivr CDN matching the installed version
        pdfjsLib.GlobalWorkerOptions.workerSrc =
          `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: new Uint8Array(arrayBuffer) }).promise;

        const pages: string[] = [];
        for (let i = 1; i <= pdf.numPages; i++) {
          const page    = await pdf.getPage(i);
          const content = await page.getTextContent();
          const text    = content.items
            .map(item => ('str' in item ? (item as { str: string }).str : ''))
            .join(' ');
          pages.push(text);
        }

        const extracted = pages.join('\n\n').trim();
        if (!extracted) {
          setFileError('This PDF has no selectable text (it may be scanned). Try pasting your resume text instead.');
          setFileName(null);
        } else {
          setResumeText(extracted);
        }
      } else {
        // DOCX / TXT — handled server-side
        const form = new FormData();
        form.append('file', file);
        const res  = await fetch('/api/extract-resume', { method: 'POST', body: form });
        const data = await res.json() as { text?: string; error?: string };
        if (!res.ok || data.error) {
          setFileError(data.error ?? 'Could not read this file. Try pasting your resume text.');
          setFileName(null);
        } else {
          setResumeText(data.text ?? '');
        }
      }
    } catch (err) {
      console.error('[handleFile]', err);
      setFileError('Could not read this file. Try pasting your resume text instead.');
      setFileName(null);
    } finally {
      setFileLoading(false);
    }
  }

  async function check() {
    if (!ready) return;
    setChecking(true);
    setError(null);
    setResult(null);

    try {
      const res  = await fetch('/api/ats-check', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ resumeText, jobDescription }),
      });
      const data = await res.json() as ATSResult & { error?: string };
      if (!res.ok || data.error) {
        setError(data.error ?? 'Analysis failed. Please try again.');
      } else {
        setResult(data);
      }
    } catch {
      setError('Connection error. Please try again.');
    } finally {
      setChecking(false);
    }
  }

  function reset() {
    setResumeText('');
    setJobDescription('');
    setFileName(null);
    setResult(null);
    setError(null);
    setFileError(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  }

  return (
    <div className="grid lg:grid-cols-[1fr_1fr] gap-8 items-start">

      {/* Left — Resume input */}
      <div className="space-y-4">
        <div>
          <label className="block text-[13px] font-medium text-ink mb-2">
            Your resume <span className="text-fire">*</span>
          </label>

          {/* File upload area */}
          <div
            onClick={() => !fileLoading && fileInputRef.current?.click()}
            onDragOver={e => e.preventDefault()}
            onDrop={e => {
              e.preventDefault();
              const file = e.dataTransfer.files[0];
              if (file) handleFile(file);
            }}
            className="flex items-center justify-between gap-3 px-4 py-3 bg-surface border border-dashed border-line rounded-xl cursor-pointer hover:border-fire hover:bg-fire/[0.03] transition-colors mb-3"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              {fileLoading
                ? <Loader2 size={15} strokeWidth={1.5} className="text-fire shrink-0 animate-spin" />
                : <Upload size={15} strokeWidth={1.5} className="text-ink-3 shrink-0" />
              }
              <span className="text-[13px] text-ink-2 truncate">
                {fileLoading
                  ? 'Extracting text…'
                  : fileName
                    ? fileName
                    : 'Upload PDF, DOCX, or TXT — or paste below'
                }
              </span>
            </div>
            {fileName && !fileLoading && (
              <button
                onClick={e => { e.stopPropagation(); setFileName(null); setResumeText(''); }}
                className="shrink-0 text-ink-3 hover:text-ink transition-colors"
              >
                <X size={13} strokeWidth={1.5} />
              </button>
            )}
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.docx,.doc,.txt"
            className="hidden"
            onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f); }}
          />

          {fileError && <p className="text-[12px] text-accent mb-2">{fileError}</p>}

          <textarea
            rows={14}
            placeholder="Or paste your resume text here…"
            value={resumeText}
            onChange={e => { setResumeText(e.target.value); setResult(null); }}
            className="w-full bg-surface border border-line rounded-xl px-4 py-3 text-[13px] text-ink outline-none focus:border-fire resize-none leading-relaxed placeholder:text-ink-3"
          />
          <p className="text-[11px] text-ink-3 mt-1.5">{resumeText.length} characters</p>
        </div>
      </div>

      {/* Right — Job description + results */}
      <div className="lg:sticky lg:top-8 space-y-4">
        <div>
          <label className="block text-[13px] font-medium text-ink mb-2">
            Job description <span className="text-fire">*</span>
          </label>
          <textarea
            rows={8}
            placeholder="Paste the full job description here…"
            value={jobDescription}
            onChange={e => { setJobDescription(e.target.value); setResult(null); }}
            className="w-full bg-surface border border-line rounded-xl px-4 py-3 text-[13px] text-ink outline-none focus:border-fire resize-none leading-relaxed placeholder:text-ink-3"
          />
          <p className="text-[11px] text-ink-3 mt-1.5">{jobDescription.length} characters</p>
        </div>

        {/* Check button */}
        {!result && (
          <button
            onClick={check}
            disabled={!ready || checking}
            className="w-full flex items-center justify-center gap-2 py-3 bg-fire text-bg text-[14px] font-bold rounded-xl hover:brightness-105 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {checking
              ? <><Loader2 size={16} strokeWidth={1.5} className="animate-spin" />Analysing…</>
              : <><FileCheck size={16} strokeWidth={1.5} />Check ATS Score<ChevronRight size={15} strokeWidth={2} /></>
            }
          </button>
        )}

        {!ready && !result && (
          <p className="text-[12px] text-ink-3">Add your resume and job description to run the check.</p>
        )}

        {error && <p className="text-[13px] text-accent">{error}</p>}

        {/* Results */}
        {result && <ATSResults result={result} onReset={reset} onRecheck={check} rechecking={checking} />}
      </div>

    </div>
  );
}

function ATSResults({
  result,
  onReset,
  onRecheck,
  rechecking,
}: {
  result: ATSResult;
  onReset: () => void;
  onRecheck: () => void;
  rechecking: boolean;
}) {
  const { label, color, bg, bar } = scoreLabel(result.score);

  return (
    <div className="space-y-4">

      {/* Score card */}
      <div className={`rounded-xl border border-line p-5 ${bg}`}>
        <div className="flex items-end gap-3 mb-3">
          <span className={`text-[52px] font-bold leading-none tracking-[-0.03em] ${color}`}>
            {result.score}
          </span>
          <div className="pb-1.5">
            <span className="text-[15px] text-ink-3 font-medium">/100</span>
            <p className={`text-[13px] font-bold mt-0.5 ${color}`}>{label}</p>
          </div>
        </div>

        {/* Score bar */}
        <div className="h-2 rounded-full bg-line overflow-hidden mb-3">
          <div
            className={`h-full rounded-full transition-all duration-700 ${bar}`}
            style={{ width: `${result.score}%` }}
          />
        </div>

        <p className="text-[13px] text-ink-2 leading-relaxed">{result.summary}</p>
      </div>

      {/* Matched keywords */}
      {result.matched.length > 0 && (
        <div className="bg-surface border border-line rounded-xl p-4">
          <p className="text-[12px] font-bold uppercase tracking-[0.1em] text-safe mb-3">
            Matched keywords ({result.matched.length})
          </p>
          <div className="flex flex-wrap gap-2">
            {result.matched.map(kw => (
              <span
                key={kw}
                className="px-2.5 py-1 rounded-lg text-[12px] font-medium bg-safe/10 text-safe border border-safe/20"
              >
                {kw}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Missing keywords */}
      {result.missing.length > 0 && (
        <div className="bg-surface border border-line rounded-xl p-4">
          <p className="text-[12px] font-bold uppercase tracking-[0.1em] text-accent mb-3">
            Missing keywords ({result.missing.length})
          </p>
          <div className="flex flex-wrap gap-2">
            {result.missing.map(kw => (
              <span
                key={kw}
                className="px-2.5 py-1 rounded-lg text-[12px] font-medium bg-accent/10 text-accent border border-accent/20"
              >
                {kw}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Fixes */}
      {result.fixes.length > 0 && (
        <div className="bg-surface border border-line rounded-xl p-4 space-y-4">
          <p className="text-[12px] font-bold uppercase tracking-[0.1em] text-ink-2">
            Top fixes
          </p>
          {result.fixes.map((fix, i) => (
            <div key={i} className="flex gap-3">
              <span className="w-5 h-5 rounded-full bg-fire/10 text-fire text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                {i + 1}
              </span>
              <div>
                <p className="text-[13px] font-semibold text-ink mb-1">{fix.issue}</p>
                <p className="text-[12px] text-ink-2 leading-relaxed">{fix.fix}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-3">
        <button
          onClick={onRecheck}
          disabled={rechecking}
          className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-fire/[0.07] border border-fire/30 text-fire text-[13px] font-semibold rounded-xl hover:bg-fire/[0.12] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {rechecking
            ? <><Loader2 size={13} strokeWidth={1.5} className="animate-spin" />Rechecking…</>
            : 'Run check again'
          }
        </button>
        <button
          onClick={onReset}
          className="flex items-center gap-1.5 px-4 py-2.5 text-[13px] text-ink-3 hover:text-ink border border-line rounded-xl transition-colors"
        >
          <RotateCcw size={13} strokeWidth={1.5} />
          Start over
        </button>
      </div>

    </div>
  );
}
