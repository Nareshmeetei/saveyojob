'use client';
import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileUp } from 'lucide-react';

interface RiskResult {
  score: number;
  label: string;
  summary: string;
  topRisks: string[];
}

function scoreColor(s: number): string {
  if (s >= 70) return '#DC2626';
  if (s >= 40) return '#B45309';
  return '#0369A1';
}

function ScoreDisplay({ result }: { result: RiskResult }) {
  const [displayed, setDisplayed] = useState(0);
  const color = scoreColor(result.score);

  useState(() => {
    let frame: number;
    const start = performance.now();
    const dur = 1400;
    function tick(now: number) {
      const t = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplayed(Math.round(eased * result.score));
      if (t < 1) frame = requestAnimationFrame(tick);
    }
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  });

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
      className="bg-surface border border-line rounded-xl overflow-hidden"
    >
      {/* Header */}
      <div className="px-6 py-4 border-b border-line flex items-center justify-between bg-surface-2">
        <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-ink-3">
          Your AI Risk Score
        </span>
        <span
          className="text-[11px] font-bold uppercase tracking-[0.1em] px-3 py-1 rounded-full"
          style={{ color, background: color + '18' }}
        >
          {result.label}
        </span>
      </div>

      <div className="p-6">
        {/* Score number */}
        <div className="flex items-baseline gap-2 mb-3">
          <span
            className="text-[72px] font-extrabold leading-none tracking-[-0.04em] tabular-nums"
            style={{ color }}
          >
            {displayed}
          </span>
          <span className="text-[16px] text-ink-3 font-normal">/&nbsp;100</span>
        </div>

        {/* Score bar */}
        <div className="h-[4px] bg-line rounded-full overflow-hidden mb-5">
          <motion.div
            className="h-full rounded-full"
            style={{ background: color }}
            initial={{ width: 0 }}
            animate={{ width: `${result.score}%` }}
            transition={{ duration: 1.4, ease: [0.23, 1, 0.32, 1] }}
          />
        </div>

        <p className="text-[14px] text-ink-2 leading-relaxed mb-6">{result.summary}</p>

        {/* Top risks */}
        <div>
          <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-ink-3 mb-3">
            Tasks most at risk
          </div>
          <div className="space-y-2">
            {result.topRisks.map((risk, i) => (
              <div key={i} className="flex items-center gap-2.5 text-[13px] text-ink-2">
                <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: color }} />
                {risk}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 pt-5 border-t border-line">
          <a
            href="#courses"
            className="block w-full text-center font-bold text-[15px] bg-fire text-bg py-3.5 rounded-xl hover:brightness-105 transition-all duration-150"
          >
            See my reskilling courses →
          </a>
        </div>
      </div>
    </motion.div>
  );
}

function calcPlaceholderScore(fileName: string): RiskResult {
  const lower = fileName.toLowerCase();
  let score = 55;
  if (lower.includes('data') || lower.includes('entry'))           score = 88;
  else if (lower.includes('account') || lower.includes('book'))    score = 82;
  else if (lower.includes('market'))                               score = 72;
  else if (lower.includes('engineer') || lower.includes('dev'))   score = 28;
  else if (lower.includes('nurse') || lower.includes('therapist')) score = 22;

  const label   = score >= 70 ? 'High Risk' : score >= 40 ? 'Medium Risk' : 'Lower Risk';
  const summary = score >= 70
    ? 'Several core tasks in your role are being automated by current AI tools. Taking action now gives you a 2–3 year advantage before these shifts become unavoidable.'
    : score >= 40
    ? 'Your role has some exposure to automation, but your judgment and communication skills provide meaningful protection. Targeted upskilling sharpens your edge.'
    : 'Your role requires skills AI consistently struggles with — human judgment, physical presence, or complex relationship management. Stay current, but the urgency is lower.';

  const topRisks = score >= 70
    ? ['Data entry and document processing', 'Routine report generation', 'Scheduling and inbox management']
    : score >= 40
    ? ['Template-based writing tasks', 'Basic research and summarization', 'Standard client communication']
    : ['Administrative scheduling', 'Status report writing', 'Basic data lookup'];

  return { score, label, summary, topRisks };
}

export default function RiskEngine() {
  const fileRef = useRef<HTMLInputElement>(null);
  const [state, setState]     = useState<'idle' | 'analyzing' | 'done'>('idle');
  const [result, setResult]   = useState<RiskResult | null>(null);
  const [fileName, setFileName] = useState('');
  const [dragOver, setDragOver] = useState(false);

  function processFile(file: File) {
    setFileName(file.name);
    setState('analyzing');
    setTimeout(() => {
      setResult(calcPlaceholderScore(file.name));
      setState('done');
    }, 2200);
  }

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) processFile(file);
  }

  return (
    <section id="risk-engine" className="py-16 px-5 sm:px-8 border-t border-line bg-surface-2">
      <div className="max-w-[680px] mx-auto">

        <div className="mb-8">
          <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-fire block mb-2">
            Your risk assessment
          </span>
          <h2 className="text-[26px] sm:text-[30px] font-bold tracking-[-0.02em] text-ink">
            Get your personal AI risk score
          </h2>
          <p className="text-[14px] text-ink-2 mt-2">
            Upload your resume — we analyze job title, tasks, and industry to calculate your score.
          </p>
        </div>

        <AnimatePresence mode="wait">
          {state === 'idle' && (
            <motion.div
              key="upload"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <input
                ref={fileRef}
                type="file"
                accept=".pdf,.doc,.docx,.txt"
                className="hidden"
                onChange={handleFile}
              />
              <div
                onClick={() => fileRef.current?.click()}
                onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
                className="border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all duration-150"
                style={{
                  borderColor: dragOver ? '#0C526D' : '#D1D5DB',
                  background:  dragOver ? 'rgba(12,82,109,0.06)' : '#F4F6F8',
                }}
              >
                <FileUp size={36} strokeWidth={1.5} className="mx-auto mb-4 text-ink-3" />
                <div className="text-[15px] font-bold text-ink mb-1">
                  Drop your resume here
                </div>
                <div className="text-[13px] text-ink-3 mb-5">
                  PDF, Word, or plain text — 60 second analysis
                </div>
                <button className="inline-flex items-center gap-2 bg-fire text-bg font-bold text-[14px] px-6 py-3 rounded-full hover:brightness-105 transition-all">
                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                    <path d="M7.5 1v9M4 4l3.5-3L11 4M2 11h11v3H2z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Browse files
                </button>
              </div>
            </motion.div>
          )}

          {state === 'analyzing' && (
            <motion.div
              key="analyzing"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="bg-surface border border-line rounded-xl p-8 text-center"
            >
              <div className="flex justify-center mb-5">
                {[0, 1, 2].map(i => (
                  <motion.span
                    key={i}
                    className="w-2.5 h-2.5 rounded-full bg-fire mx-1"
                    animate={{ scale: [0.7, 1.15, 0.7], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.2, delay: i * 0.2, repeat: Infinity }}
                  />
                ))}
              </div>
              <div className="text-[16px] font-bold text-ink mb-1">Analyzing your resume…</div>
              <div className="text-[13px] text-ink-3">{fileName}</div>
              <div className="mt-5 space-y-2.5 text-left max-w-[300px] mx-auto">
                {['Identifying job tasks…', 'Scanning automation data…', 'Calculating risk score…'].map((step, i) => (
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + i * 0.6 }}
                    className="flex items-center gap-2.5 text-[13px] text-ink-2"
                  >
                    <motion.span
                      className="w-4 h-4 rounded-full border border-line-2 flex items-center justify-center text-[10px] text-ink-3"
                      animate={{
                        borderColor: ['#D1D5DB', '#0C526D'],
                        color: ['#9CA3AF', '#0C526D'],
                      }}
                      transition={{ delay: 0.8 + i * 0.6, duration: 0.3 }}
                    >
                      ✓
                    </motion.span>
                    {step}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {state === 'done' && result && (
            <motion.div key="result">
              <ScoreDisplay result={result} />
              <button
                onClick={() => { setState('idle'); setResult(null); setFileName(''); }}
                className="mt-4 text-[12px] text-ink-3 hover:text-ink transition-colors w-full text-center"
              >
                ← Analyze a different resume
              </button>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
