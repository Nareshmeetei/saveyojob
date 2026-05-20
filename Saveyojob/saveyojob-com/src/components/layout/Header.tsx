'use client';
import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Jobs at Risk', href: '/jobs' },
  { label: 'All Courses',  href: '/courses' },
  { label: 'Blog',         href: '/blog' },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-surface/95 backdrop-blur-xl border-b border-line">
      <div className="h-[52px] flex items-center justify-between px-5 sm:px-8">
        <Link href="/" className="select-none flex items-center">
          <img
            src="/saveyojob_logo02.svg"
            alt="Saveyojob"
            width={98}
            height={28}
            style={{ height: 36, width: 'auto' }}
          />
        </Link>

        <nav className="hidden sm:flex items-center gap-5">
          {NAV_LINKS.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="text-[13px] font-medium text-ink-2 hover:text-ink transition-colors"
            >
              {label}
            </Link>
          ))}
          <Link
            href="/#hero"
            className="text-[13px] font-semibold bg-fire text-bg px-4 py-1.5 rounded-full hover:brightness-105 transition-all duration-150"
          >
            Check my risk →
          </Link>
        </nav>

        <div className="flex sm:hidden items-center gap-3">
          <Link
            href="/#hero"
            className="text-[12px] font-semibold bg-fire text-bg px-3 py-1.5 rounded-full hover:brightness-105 transition-all duration-150"
          >
            Check my risk →
          </Link>
          <button
            onClick={() => setOpen(o => !o)}
            className="p-1 text-ink-2 hover:text-ink transition-colors"
            aria-label="Toggle menu"
          >
            {open ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="sm:hidden border-t border-line bg-surface px-5 py-3 flex flex-col gap-1">
          {NAV_LINKS.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="text-[15px] font-medium text-ink-2 hover:text-ink py-2.5 transition-colors"
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
