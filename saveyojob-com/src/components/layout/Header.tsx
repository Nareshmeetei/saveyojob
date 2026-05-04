'use client';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 h-[52px] flex items-center justify-between px-6 bg-ink/95 backdrop-blur-xl border-b border-wire">
      <Link href="/" className="flex items-baseline gap-0 leading-none">
        <span className="text-[17px] font-bold tracking-tight text-acid">Save</span>
        <span className="text-[17px] font-bold tracking-tight text-paper">yojob</span>
        <span className="text-[12px] font-normal text-paper-3 ml-[1px]">.com</span>
      </Link>
      <span className="text-[11px] font-semibold uppercase tracking-[0.09em] text-paper-3 border border-wire px-3 py-1 rounded">
        Free · No signup
      </span>
    </header>
  );
}
