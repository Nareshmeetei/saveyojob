'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function LogoLink({ height }: { height: number }) {
  const pathname = usePathname();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname === '/') {
      e.preventDefault();
      window.location.href = '/';
    }
  };

  return (
    <Link href="/" onClick={handleClick} className="select-none flex items-center shrink-0">
      <img
        src="/saveyojob_logo02.svg"
        alt="Saveyojob"
        style={{ height, width: 'auto' }}
      />
    </Link>
  );
}
