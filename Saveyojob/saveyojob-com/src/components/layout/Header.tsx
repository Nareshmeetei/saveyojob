import Link from 'next/link';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 h-[52px] flex items-center justify-between px-5 sm:px-8 bg-surface/95 backdrop-blur-xl border-b border-line">
      <Link href="/" className="select-none flex items-center">
        <img
          src="/saveyojob_logo02.svg"
          alt="Saveyojob"
          width={98}
          height={28}
          style={{ height: 36, width: 'auto' }}
        />
      </Link>

      <nav className="flex items-center gap-5">
        <Link href="/jobs" className="hidden sm:block text-[13px] font-medium text-ink-2 hover:text-ink transition-colors">
          Browse Jobs
        </Link>
        <Link href="/about" className="hidden sm:block text-[13px] font-medium text-ink-2 hover:text-ink transition-colors">
          About
        </Link>
        <Link
          href="/#hero"
          className="text-[13px] font-semibold bg-fire text-bg px-4 py-1.5 rounded-full hover:brightness-105 transition-all duration-150"
        >
          Check my risk →
        </Link>
      </nav>
    </header>
  );
}
