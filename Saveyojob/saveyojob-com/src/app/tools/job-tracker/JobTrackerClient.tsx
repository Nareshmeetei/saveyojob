'use client';
import { useState, useEffect, useRef } from 'react';
import { Plus, X, ChevronRight, ChevronLeft, ExternalLink, Trash2, Sparkles, Loader2 } from 'lucide-react';

type Status = 'wishlist' | 'applied' | 'interview' | 'offer' | 'rejected';

interface Application {
  id: string;
  company: string;
  role: string;
  url: string;
  notes: string;
  salary: string;
  dateAdded: string;
  status: Status;
}

const COLUMNS: {
  id: Status;
  label: string;
  color: string;
  dot: string;
  empty: string;
}[] = [
  { id: 'wishlist',  label: 'Wishlist',  color: 'text-ink-2', dot: 'bg-ink-3',  empty: 'Jobs you want to apply to' },
  { id: 'applied',   label: 'Applied',   color: 'text-fire',  dot: 'bg-fire',   empty: 'Applications submitted'    },
  { id: 'interview', label: 'Interview', color: 'text-warn',  dot: 'bg-warn',   empty: 'In the interview process'  },
  { id: 'offer',     label: 'Offer',     color: 'text-safe',  dot: 'bg-safe',   empty: 'Offers received'           },
  { id: 'rejected',  label: 'Rejected',  color: 'text-ink-3', dot: 'bg-ink-3',  empty: 'Closed or no response'     },
];

const STATUS_ORDER: Status[] = ['wishlist', 'applied', 'interview', 'offer', 'rejected'];
const LS_KEY = 'syjob_tracker_v1';

function load(): Application[] {
  if (typeof window === 'undefined') return [];
  try { return JSON.parse(localStorage.getItem(LS_KEY) ?? '[]'); }
  catch { return []; }
}

function fmt(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

const STATUS_PROMPTS: Record<Status, (company: string, role: string) => string> = {
  wishlist:  (c, r) => `I'm considering applying to ${c} for a ${r || 'role'} and want to prepare well. Give me 3 specific things I should do before applying — research, tailoring my application, or anything else that would give me an edge. Be brief and practical.`,
  applied:   (c, r) => `I've just applied to ${c} for a ${r || 'role'}. Give me 3 concise tips for what to do now — follow-up timing, LinkedIn research, interview prep to start. No generic advice.`,
  interview: (c, r) => `I have an interview coming up at ${c} for a ${r || 'role'}. Give me 3 focused things to prepare — research, common questions, or anything specific to this stage. Be practical, not generic.`,
  offer:     (c, r) => `I have a job offer from ${c} for a ${r || 'role'}. Give me 3 things I should think through or negotiate before accepting. Keep it short and actionable.`,
  rejected:  (c, r) => `I was rejected from ${c} for a ${r || 'role'}. Give me 3 constructive next steps — whether to follow up, what to improve, or how to move on productively.`,
};

export default function JobTrackerClient() {
  const [apps, setApps] = useState<Application[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [addingIn, setAddingIn] = useState<Status | null>(null);
  const [addForm, setAddForm] = useState({ company: '', role: '' });
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [aiTips, setAiTips] = useState<Record<string, string>>({});
  const [aiLoading, setAiLoading] = useState<string | null>(null);
  const [aiError, setAiError] = useState<string | null>(null);
  const addInputRef = useRef<HTMLInputElement>(null);

  async function getCardTips(app: Application) {
    setAiLoading(app.id);
    setAiError(null);
    const prompt = STATUS_PROMPTS[app.status](app.company, app.role);
    try {
      const res = await fetch('/api/ai-generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [{ role: 'user', content: prompt }] }),
      });
      const data = await res.json() as { reply?: string; error?: string };
      if (!res.ok || data.error) {
        setAiError(data.error ?? 'Something went wrong — please try again.');
      } else {
        setAiTips(prev => ({ ...prev, [app.id]: data.reply ?? '' }));
      }
    } catch {
      setAiError('Your internet connection dropped — please check your connection and try again.');
    } finally {
      setAiLoading(null);
    }
  }

  useEffect(() => {
    setApps(load());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) localStorage.setItem(LS_KEY, JSON.stringify(apps));
  }, [apps, hydrated]);

  useEffect(() => {
    if (addingIn) setTimeout(() => addInputRef.current?.focus(), 0);
  }, [addingIn]);

  function addApp() {
    if (!addingIn || !addForm.company.trim()) return;
    const app: Application = {
      id: Math.random().toString(36).slice(2, 10),
      company: addForm.company.trim(),
      role: addForm.role.trim(),
      url: '', notes: '', salary: '',
      dateAdded: new Date().toISOString(),
      status: addingIn,
    };
    setApps(prev => [app, ...prev]);
    setAddForm({ company: '', role: '' });
    setAddingIn(null);
  }

  function move(id: string, dir: 1 | -1) {
    setApps(prev => prev.map(a => {
      if (a.id !== id) return a;
      const idx = STATUS_ORDER.indexOf(a.status);
      const next = STATUS_ORDER[idx + dir];
      return next ? { ...a, status: next } : a;
    }));
  }

  function del(id: string) {
    setApps(prev => prev.filter(a => a.id !== id));
    if (expandedId === id) setExpandedId(null);
  }

  function update(id: string, patch: Partial<Application>) {
    setApps(prev => prev.map(a => a.id === id ? { ...a, ...patch } : a));
  }

  const total = apps.length;
  const active = apps.filter(a => a.status !== 'rejected').length;
  const interviews = apps.filter(a => a.status === 'interview').length;
  const offers = apps.filter(a => a.status === 'offer').length;

  if (!hydrated) return null;

  return (
    <div className="space-y-6">

      {/* Stats strip */}
      {total > 0 && (
        <div className="flex flex-wrap gap-5 text-[13px]">
          <span className="text-ink-2"><span className="font-bold text-ink">{total}</span> total</span>
          <span className="text-ink-2"><span className="font-bold text-ink">{active}</span> active</span>
          {interviews > 0 && <span className="text-warn"><span className="font-bold">{interviews}</span> in interview</span>}
          {offers > 0 && <span className="text-safe"><span className="font-bold">{offers}</span> {offers === 1 ? 'offer' : 'offers'}</span>}
        </div>
      )}

      {/* Board */}
      <div className="overflow-x-auto pb-2 -mx-5 sm:-mx-8 px-5 sm:px-8">
        <div className="flex gap-3 min-w-[860px]">
          {COLUMNS.map(col => {
            const colApps = apps.filter(a => a.status === col.id);
            const idx = STATUS_ORDER.indexOf(col.id);
            const isAdding = addingIn === col.id;

            return (
              <div key={col.id} className="flex-1 min-w-0 flex flex-col">

                {/* Column header */}
                <div className="flex items-center justify-between mb-3 px-1">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full flex-shrink-0 ${col.dot}`} />
                    <span className={`text-[12px] font-bold uppercase tracking-[0.12em] ${col.color}`}>
                      {col.label}
                    </span>
                    {colApps.length > 0 && (
                      <span className="text-[11px] text-ink-3 font-medium">{colApps.length}</span>
                    )}
                  </div>
                  <button
                    onClick={() => { setAddingIn(col.id); setAddForm({ company: '', role: '' }); }}
                    className="w-5 h-5 flex items-center justify-center text-ink-3 hover:text-ink hover:bg-bg rounded transition-colors"
                    title={`Add to ${col.label}`}
                  >
                    <Plus size={13} strokeWidth={2} />
                  </button>
                </div>

                {/* Cards */}
                <div className="space-y-2 flex-1">

                  {/* Inline add form */}
                  {isAdding && (
                    <div className="bg-surface border border-fire/40 rounded-xl p-3 space-y-2">
                      <input
                        ref={addInputRef}
                        type="text"
                        placeholder="Company name"
                        value={addForm.company}
                        onChange={e => setAddForm(f => ({ ...f, company: e.target.value }))}
                        onKeyDown={e => { if (e.key === 'Enter') addApp(); if (e.key === 'Escape') setAddingIn(null); }}
                        className="w-full bg-bg border border-line rounded-lg px-2.5 py-1.5 text-[13px] text-ink outline-none focus:border-fire"
                      />
                      <input
                        type="text"
                        placeholder="Job title"
                        value={addForm.role}
                        onChange={e => setAddForm(f => ({ ...f, role: e.target.value }))}
                        onKeyDown={e => { if (e.key === 'Enter') addApp(); if (e.key === 'Escape') setAddingIn(null); }}
                        className="w-full bg-bg border border-line rounded-lg px-2.5 py-1.5 text-[13px] text-ink outline-none focus:border-fire"
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={addApp}
                          disabled={!addForm.company.trim()}
                          className="flex-1 py-1.5 bg-fire text-bg text-[12px] font-bold rounded-lg disabled:opacity-40 disabled:cursor-not-allowed hover:brightness-105 transition-all"
                        >
                          Add
                        </button>
                        <button
                          onClick={() => setAddingIn(null)}
                          className="px-3 py-1.5 text-[12px] text-ink-3 hover:text-ink border border-line rounded-lg transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Application cards */}
                  {colApps.map(app => {
                    const isExpanded = expandedId === app.id;
                    const canBack = idx > 0;
                    const canFwd  = idx < STATUS_ORDER.length - 1;

                    return (
                      <div
                        key={app.id}
                        className="bg-surface border border-line rounded-xl overflow-hidden"
                      >
                        {/* Card body — click to expand */}
                        <button
                          onClick={() => setExpandedId(isExpanded ? null : app.id)}
                          className="w-full text-left px-3 pt-3 pb-2"
                        >
                          <p className="text-[13px] font-bold text-ink leading-snug">{app.company}</p>
                          {app.role && (
                            <p className="text-[12px] text-ink-2 mt-0.5 leading-snug">{app.role}</p>
                          )}
                          <p className="text-[10px] text-ink-3 mt-1.5">{fmt(app.dateAdded)}</p>
                        </button>

                        {/* Expanded detail fields */}
                        {isExpanded && (
                          <div className="px-3 pb-3 space-y-2 border-t border-line pt-2.5 mt-0.5">
                            <div>
                              <p className="text-[10px] font-semibold text-ink-3 uppercase tracking-[0.1em] mb-1">Job URL</p>
                              <div className="flex items-center gap-1">
                                <input
                                  type="url"
                                  placeholder="https://..."
                                  value={app.url}
                                  onChange={e => update(app.id, { url: e.target.value })}
                                  className="flex-1 min-w-0 bg-bg border border-line rounded-lg px-2 py-1 text-[11px] text-ink outline-none focus:border-fire"
                                />
                                {app.url && (
                                  <a href={app.url} target="_blank" rel="noopener noreferrer"
                                    className="text-fire flex-shrink-0" onClick={e => e.stopPropagation()}>
                                    <ExternalLink size={12} strokeWidth={1.5} />
                                  </a>
                                )}
                              </div>
                            </div>
                            <div>
                              <p className="text-[10px] font-semibold text-ink-3 uppercase tracking-[0.1em] mb-1">Salary range</p>
                              <input
                                type="text"
                                placeholder="e.g. $80K–$100K"
                                value={app.salary}
                                onChange={e => update(app.id, { salary: e.target.value })}
                                className="w-full bg-bg border border-line rounded-lg px-2 py-1 text-[11px] text-ink outline-none focus:border-fire"
                              />
                            </div>
                            <div>
                              <p className="text-[10px] font-semibold text-ink-3 uppercase tracking-[0.1em] mb-1">Notes</p>
                              <textarea
                                rows={2}
                                placeholder="Recruiter name, next steps, impressions…"
                                value={app.notes}
                                onChange={e => update(app.id, { notes: e.target.value })}
                                className="w-full bg-bg border border-line rounded-lg px-2 py-1 text-[11px] text-ink outline-none focus:border-fire resize-none"
                              />
                            </div>

                            {/* AI tips */}
                            {aiTips[app.id] ? (
                              <div className="pt-1">
                                <div className="flex items-center justify-between mb-1.5">
                                  <p className="text-[10px] font-semibold text-fire uppercase tracking-[0.1em] flex items-center gap-1">
                                    <Sparkles size={10} strokeWidth={1.5} />
                                    AI tips
                                  </p>
                                  <button
                                    onClick={() => getCardTips(app)}
                                    disabled={aiLoading === app.id}
                                    className="text-[10px] text-ink-3 hover:text-ink transition-colors"
                                  >
                                    Refresh
                                  </button>
                                </div>
                                <p className="text-[11px] text-ink-2 leading-relaxed whitespace-pre-wrap">{aiTips[app.id]}</p>
                              </div>
                            ) : (
                              <button
                                onClick={() => getCardTips(app)}
                                disabled={aiLoading === app.id}
                                className="w-full flex items-center justify-center gap-1.5 py-1.5 text-[11px] font-semibold text-fire bg-fire/[0.07] border border-fire/20 rounded-lg hover:bg-fire/[0.12] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                              >
                                {aiLoading === app.id
                                  ? <><Loader2 size={11} strokeWidth={1.5} className="animate-spin" />Getting tips...</>
                                  : <><Sparkles size={11} strokeWidth={1.5} />Get AI tips for this stage</>
                                }
                              </button>
                            )}
                            {aiError && aiLoading === null && (
                              <p className="text-[10px] text-accent">{aiError}</p>
                            )}
                          </div>
                        )}

                        {/* Card actions */}
                        <div className="flex items-center gap-0.5 px-2 pb-2">
                          <button
                            onClick={() => move(app.id, -1)}
                            disabled={!canBack}
                            className="p-1 rounded text-ink-3 hover:text-ink hover:bg-bg transition-colors disabled:opacity-20 disabled:cursor-not-allowed"
                            title="Move back"
                          >
                            <ChevronLeft size={13} strokeWidth={2} />
                          </button>
                          <button
                            onClick={() => move(app.id, 1)}
                            disabled={!canFwd}
                            className="p-1 rounded text-ink-3 hover:text-ink hover:bg-bg transition-colors disabled:opacity-20 disabled:cursor-not-allowed"
                            title="Move forward"
                          >
                            <ChevronRight size={13} strokeWidth={2} />
                          </button>
                          <div className="flex-1" />
                          <button
                            onClick={() => del(app.id)}
                            className="p-1 rounded text-ink-3 hover:text-critical hover:bg-bg transition-colors"
                            title="Delete"
                          >
                            <Trash2 size={12} strokeWidth={1.5} />
                          </button>
                        </div>
                      </div>
                    );
                  })}

                  {/* Empty state */}
                  {colApps.length === 0 && !isAdding && (
                    <div className="border border-dashed border-line rounded-xl px-3 py-5 text-center">
                      <p className="text-[11px] text-ink-3 leading-relaxed">{col.empty}</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer tip */}
      <p className="text-[11px] text-ink-3">
        Your applications are saved in your browser — nothing leaves your device.
        {total > 0 && (
          <button
            onClick={() => { if (confirm('Clear all applications? This cannot be undone.')) { setApps([]); setExpandedId(null); } }}
            className="ml-3 underline underline-offset-2 hover:text-ink transition-colors"
          >
            Clear all
          </button>
        )}
      </p>

    </div>
  );
}
