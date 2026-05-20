import Link from 'next/link';
import NewsletterCTA from '../newsletter/NewsletterCTA';
import LogoLink from '../ui/LogoLink';

const LINKS = [
  { label: 'Jobs at Risk', href: '/jobs' },
  { label: 'AI Courses',   href: '/courses' },
  { label: 'About',        href: '/about' },
  { label: 'Privacy',      href: '/privacy' },
];

export default function Footer() {
  return (
    <footer>
      <NewsletterCTA />
      <div className="border-t border-line bg-surface px-5 sm:px-8 py-6">
        <div className="max-w-[900px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <LogoLink height={26} />
          <nav className="flex flex-wrap justify-center gap-x-5 gap-y-1">
            {LINKS.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className="text-[12px] text-ink-3 hover:text-ink transition-colors"
              >
                {label}
              </Link>
            ))}
          </nav>
          <span className="text-[12px] text-ink-3 shrink-0">
            © {new Date().getFullYear()} Saveyojob.com
          </span>
        </div>
      </div>
    </footer>
  );
}
