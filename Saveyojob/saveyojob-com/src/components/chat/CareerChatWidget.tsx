'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  MessageCircle, X, Send, Loader2, ChevronDown, Briefcase, Wrench,
} from 'lucide-react';

// ── Markdown renderer ──────────────────────────────────────────

function parseInline(text: string) {
  const regex = /\*\*([^*]+)\*\*|\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g;
  const parts: React.ReactNode[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = regex.exec(text)) !== null) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    if (m[1] !== undefined) {
      parts.push(<strong key={m.index} className="font-semibold">{m[1]}</strong>);
    } else {
      parts.push(
        <a key={m.index} href={m[3]} target="_blank" rel="noopener noreferrer"
           className="text-fire underline underline-offset-2 hover:opacity-75 transition-opacity break-all">
          {m[2]}
        </a>
      );
    }
    last = regex.lastIndex;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}

function renderMarkdown(text: string) {
  const lines = text.split('\n');
  return (
    <div className="space-y-1">
      {lines.map((line, i) => {
        const t = line.trim();
        if (!t) return <div key={i} className="h-1" />;

        const bullet = t.match(/^[-•*]\s+(.*)/);
        if (bullet) return (
          <div key={i} className="flex gap-1.5 items-baseline">
            <span className="text-fire shrink-0">•</span>
            <span>{parseInline(bullet[1])}</span>
          </div>
        );

        const numbered = t.match(/^(\d+)\.\s+(.*)/);
        if (numbered) return (
          <div key={i} className="flex gap-1.5 items-baseline">
            <span className="text-fire font-semibold shrink-0">{numbered[1]}.</span>
            <span>{parseInline(numbered[2])}</span>
          </div>
        );

        return <div key={i}>{parseInline(t)}</div>;
      })}
    </div>
  );
}

interface Message {
  role:     'user' | 'model';
  content:  string;
  toolLabel?: string;
}

const WELCOME: Message = {
  role: 'model',
  content:
    'Hi, I am your career assistant. Ask me anything about your resume, interview prep, job applications, or career direction.',
};

const SUGGESTED = [
  'Review my resume',
  'Prep me for an interview',
  'Analyze this job description',
  'Write a cover letter',
  'What skills should I build?',
];

export default function CareerChatWidget() {
  const [open,     setOpen]     = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME]);
  const [input,    setInput]    = useState('');
  const [loading,  setLoading]  = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef  = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 150);
  }, [open]);

  const send = useCallback(async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    const userMsg: Message = { role: 'user', content: trimmed };
    const history = [...messages, userMsg];
    setMessages(history);
    setInput('');
    setLoading(true);

    // Reset textarea height
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
    }

    try {
      const res = await fetch('/api/career-chat', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: history.map(m => ({ role: m.role, content: m.content })),
        }),
      });

      const data = await res.json() as {
        reply?:     string;
        error?:     string;
        toolUsed?:  string;
        toolLabel?: string;
      };

      if (!res.ok || data.error) {
        setMessages(prev => [
          ...prev,
          { role: 'model', content: data.error ?? 'Something went wrong — please try again.' },
        ]);
        return;
      }

      setMessages(prev => [
        ...prev,
        { role: 'model', content: data.reply ?? '', toolLabel: data.toolLabel },
      ]);
    } catch {
      setMessages(prev => [
        ...prev,
        { role: 'model', content: 'Your internet connection dropped — please check your connection and try again.' },
      ]);
    } finally {
      setLoading(false);
    }
  }, [messages, loading]);

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send(input);
    }
  }

  function handleReset() {
    setMessages([WELCOME]);
    setInput('');
    setOpen(false);
  }

  const showSuggestions = messages.length === 1 && !loading;

  return (
    <>
      {/* ── Floating button ──────────────────────────────────────────────── */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-fire text-bg px-4 py-3 rounded-full shadow-[0_4px_20px_rgba(12,82,109,0.30)] hover:brightness-105 transition-all duration-150 font-semibold text-[13px]"
          aria-label="Open career assistant"
        >
          <MessageCircle size={15} strokeWidth={1.5} />
          Career Chat
        </button>
      )}

      {/* ── Chat panel ───────────────────────────────────────────────────── */}
      {open && (
        <div
          className="fixed bottom-6 right-6 z-50 flex flex-col bg-surface border border-line rounded-2xl shadow-[0_12px_48px_rgba(8,30,40,0.20)] overflow-hidden w-[360px] max-w-[calc(100vw-24px)]"
          style={{ height: 520, maxHeight: 'calc(100dvh - 48px)' }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-fire text-bg shrink-0">
            <div className="flex items-center gap-2">
              <Briefcase size={14} strokeWidth={1.5} />
              <span className="text-[13px] font-bold tracking-tight">Career Assistant</span>
            </div>
            <div className="flex items-center gap-0.5">
              <button
                onClick={() => setOpen(false)}
                title="Minimise"
                className="p-1.5 rounded-lg hover:bg-white/15 transition-colors"
              >
                <ChevronDown size={15} strokeWidth={1.5} />
              </button>
              <button
                onClick={handleReset}
                title="Close and clear"
                className="p-1.5 rounded-lg hover:bg-white/15 transition-colors"
              >
                <X size={15} strokeWidth={1.5} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-3 py-3 space-y-2.5">

            {showSuggestions && (
              <div className="flex flex-wrap gap-1.5 pb-1">
                {SUGGESTED.map(p => (
                  <button
                    key={p}
                    onClick={() => send(p)}
                    className="text-[11px] font-medium px-3 py-1.5 bg-bg border border-line rounded-full text-ink-2 hover:border-fire hover:text-fire transition-colors duration-100"
                  >
                    {p}
                  </button>
                ))}
              </div>
            )}

            {messages.map((m, i) => (
              <div key={i} className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}>
                <div
                  className={[
                    'max-w-[88%] px-3.5 py-2.5 rounded-2xl text-[13px] leading-relaxed break-words',
                    m.role === 'user'
                      ? 'bg-fire text-bg rounded-br-sm whitespace-pre-wrap'
                      : 'bg-bg border border-line text-ink rounded-bl-sm',
                  ].join(' ')}
                >
                  {m.role === 'user' ? m.content : renderMarkdown(m.content)}
                </div>
                {m.toolLabel && (
                  <div className="flex items-center gap-1 mt-1 px-1">
                    <Wrench size={10} strokeWidth={1.5} className="text-ink-3" />
                    <span className="text-[10px] text-ink-3">{m.toolLabel}</span>
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex items-start">
                <div className="bg-bg border border-line rounded-2xl rounded-bl-sm px-3.5 py-2.5 flex items-center gap-2">
                  <Loader2 size={12} strokeWidth={1.5} className="animate-spin text-fire shrink-0" />
                  <span className="text-[12px] text-ink-3">Thinking...</span>
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="px-3 pb-3 shrink-0 border-t border-line pt-2.5">
            <div className="flex items-end gap-2 bg-bg border border-line rounded-xl px-3 py-2 focus-within:border-fire focus-within:shadow-[0_0_0_3px_rgba(12,82,109,0.10)] transition-all duration-150">
              <textarea
                ref={inputRef}
                value={input}
                onChange={e => {
                  setInput(e.target.value);
                  e.currentTarget.style.height = 'auto';
                  e.currentTarget.style.height =
                    Math.min(e.currentTarget.scrollHeight, 80) + 'px';
                }}
                onKeyDown={handleKeyDown}
                placeholder="Ask anything about your career..."
                rows={1}
                disabled={loading}
                className="flex-1 bg-transparent text-[13px] text-ink placeholder:text-ink-3 resize-none outline-none leading-relaxed py-0.5 min-h-[20px] max-h-[80px] disabled:opacity-50"
              />
              <button
                onClick={() => send(input)}
                disabled={!input.trim() || loading}
                className="p-1.5 rounded-lg bg-fire text-bg disabled:opacity-30 disabled:cursor-not-allowed hover:brightness-105 transition-all shrink-0 mb-0.5"
                aria-label="Send"
              >
                <Send size={13} strokeWidth={1.5} />
              </button>
            </div>
            <p className="text-[10px] text-ink-3 mt-1.5 text-center">
              Gemini · Free · 20 messages/hour · No signup
            </p>
          </div>
        </div>
      )}
    </>
  );
}
