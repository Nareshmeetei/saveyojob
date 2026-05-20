'use client';
import { useState } from 'react';
import CopyButton from '../ui/CopyButton';

interface RoadmapActionsProps {
  shareId: string | null;
  jobTitle: string;
  riskScore: number;
  onReset: () => void;
  onEmailCapture?: (email: string) => void;
}

export default function RoadmapActions({
  shareId, jobTitle, riskScore, onReset, onEmailCapture
}: RoadmapActionsProps) {
  const [emailOpen, setEmailOpen] = useState(false);
  const [email, setEmail]         = useState('');
  const [sent, setSent]           = useState(false);
  const [sending, setSending]     = useState(false);

  const shareUrl = shareId
    ? `${typeof window !== 'undefined' ? window.location.origin : ''}/roadmap/${shareId}`
    : null;

  const linkedInText = encodeURIComponent(
    `I just got my AI career risk assessment.\n\nAs a ${jobTitle}, I have a ${riskScore}% automation risk.\n\nHere's what I learned and my personalized plan 👇\n\n${shareUrl ?? ''}\n\nGenerated free at Saveyojob.com`
  );

  async function handleEmail(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setSending(true);
    try {
      await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'roadmap-actions', shareId }),
      });
      setSent(true);
      onEmailCapture?.(email);
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="border-t border-wire pt-6 space-y-4">
      <div className="flex flex-wrap gap-3">
        {/* Share */}
        {shareUrl && (
          <CopyButton
            text={shareUrl}
            label="Copy share link"
            className="px-4 py-2.5 border border-wire rounded-xl bg-ink-2 hover:bg-ink-3 text-[13px]"
          />
        )}

        {/* LinkedIn */}
        {shareUrl && (
          <a
            href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(`My AI Risk Assessment`)}&summary=${linkedInText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2.5 border border-wire rounded-xl bg-ink-2 hover:bg-ink-3 text-[13px] font-medium text-paper-2 hover:text-paper transition-colors"
          >
            Share on LinkedIn
          </a>
        )}

        {/* Email */}
        <button
          onClick={() => setEmailOpen(v => !v)}
          className="flex items-center gap-2 px-4 py-2.5 border border-wire rounded-xl bg-ink-2 hover:bg-ink-3 text-[13px] font-medium text-paper-2 hover:text-paper transition-colors"
        >
          Email me this
        </button>

        {/* Generate another */}
        <button
          onClick={onReset}
          className="flex items-center gap-2 px-4 py-2.5 border border-acid/30 rounded-xl bg-acid/[0.06] text-[13px] font-semibold text-acid hover:bg-acid/10 transition-colors"
        >
          Generate another →
        </button>
      </div>

      {emailOpen && !sent && (
        <form onSubmit={handleEmail} className="flex gap-2">
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            className="flex-1 bg-ink-2 border border-wire rounded-xl px-4 py-2.5 text-[14px] text-paper placeholder:text-paper-2 outline-none focus:border-acid"
          />
          <button
            type="submit"
            disabled={sending}
            className="px-5 py-2.5 bg-acid text-ink text-[13px] font-bold rounded-xl hover:brightness-105 disabled:opacity-50"
          >
            {sending ? 'Sending…' : 'Send'}
          </button>
        </form>
      )}
      {sent && (
        <p className="text-[13px] text-acid font-medium">
          ✓ Roadmap sent to {email}
        </p>
      )}
    </div>
  );
}
