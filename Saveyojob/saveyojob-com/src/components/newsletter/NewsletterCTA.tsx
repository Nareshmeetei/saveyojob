'use client';
import { useState } from 'react';
import { Mail } from 'lucide-react';

export default function NewsletterCTA() {
  const [email, setEmail]       = useState('');
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
  }

  return (
    <section className="py-16 px-5 sm:px-8 border-t border-line bg-surface-2">
      <div className="max-w-[560px] mx-auto text-center">

        <div className="inline-flex items-center justify-center w-11 h-11 rounded-[20px] bg-surface-3 mb-6">
          <Mail size={20} strokeWidth={2.5} className="text-fire" />
        </div>

        <h2 className="text-[24px] sm:text-[28px] font-bold tracking-[-0.03em] text-ink mb-3 leading-tight">
          Weekly AI Job Market Digest
        </h2>
        <p className="text-[15px] text-ink-2 leading-relaxed mb-8">
          Stay valuable. Stay employable. Stay ahead of AI.
        </p>

        {submitted ? (
          <div className="flex flex-col items-center gap-2">
            <div className="text-[15px] font-semibold text-fire">You're in.</div>
            <div className="text-[13px] text-ink-3">
              First digest lands in your inbox this week.
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2.5">
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Your work email"
              className="flex-1 px-[18px] py-[13px] text-[15px] bg-surface border border-line rounded-xl outline-none focus:border-fire focus:shadow-[0_0_0_3px_rgba(12,82,109,0.10)] text-ink placeholder:text-ink-3 transition-all duration-150"
            />
            <button
              type="submit"
              className="shrink-0 px-[22px] py-[10px] bg-fire text-bg font-semibold text-[13px] rounded-full tracking-[0.04em] hover:brightness-110 hover:-translate-y-px transition-all duration-150"
            >
              Get Free Weekly Updates
            </button>
          </form>
        )}

        <p className="text-[11px] text-ink-3 mt-5 tracking-wide">
          No spam. Unsubscribe anytime.
        </p>

      </div>
    </section>
  );
}
