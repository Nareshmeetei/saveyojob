import Link from 'next/link';

const LINKS = [
  { label: 'Jobs at Risk', href: '/jobs' },
  { label: 'AI Courses', href: '/courses' },
  { label: 'Blog', href: '/blog' },
  { label: 'About', href: '/about' },
];

export default function Footer() {
  return (
    <footer className="border-t border-wire mt-16">
      <div className="max-w-4xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <Link href="/" className="flex items-baseline gap-0 leading-none">
          <span className="text-[15px] font-bold tracking-tight text-acid">Save</span>
          <span className="text-[15px] font-bold tracking-tight text-paper">yojob</span>
          <span className="text-[11px] font-normal text-paper-3 ml-[1px]">.com</span>
        </Link>

        <nav className="flex flex-wrap gap-x-6 gap-y-2">
          {LINKS.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="text-[13px] text-paper-3 hover:text-paper-2 transition-colors"
            >
              {label}
            </Link>
          ))}
        </nav>

        <p className="text-[12px] text-paper-3 sm:text-right">
          Free · No signup ever
        </p>
      </div>
    </footer>
  );
}
