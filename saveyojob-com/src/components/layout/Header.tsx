'use client';
import Link from 'next/link';
import { useState } from 'react';

const NAV_LINKS = [
  { label: 'Jobs at Risk', href: '/jobs' },
  { label: 'AI Courses', href: '/courses' },
  { label: 'Blog', href: '/blog' },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-ink/95 backdrop-blur-xl border-b border-wire">
      <div className="h-[52px] flex items-center justify-between px-6">
        <Link href="/" className="flex items-baseline gap-0 leading-none shrink-0">
          <span className="text-[17px] font-bold tracking-tight text-acid">Save</span>
          <span className="text-[17px] font-bold tracking-tight text-paper">yojob</span>
          <span className="text-[12px] font-normal text-paper-3 ml-[1px]">.com</span>
        </Link>

        <nav className="hidden sm:flex items-center gap-6">
          {NAV_LINKS.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="text-[13px] font-medium text-paper-2 hover:text-paper transition-colors"
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <span className="hidden sm:inline text-[11px] font-semibold uppercase tracking-[0.09em] text-paper-3 border border-wire px-3 py-1 rounded">
            Free · No signup
          </span>
          <button
            className="sm:hidden p-1 text-paper-2 hover:text-paper transition-colors"
            onClick={() => setOpen(o => !o)}
            aria-label="Toggle menu"
          >
            {open ? (
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M3 3L15 15M15 3L3 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M3 5H15M3 9H15M3 13H15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
            )}
          </button>
        </div>
      </div>

      {open && (
        <nav className="sm:hidden border-t border-wire bg-ink px-6 py-4 flex flex-col gap-1">
          {NAV_LINKS.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="text-[15px] font-medium text-paper-2 hover:text-paper py-2 transition-colors"
              onClick={() => setOpen(false)}
            >
              {label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
