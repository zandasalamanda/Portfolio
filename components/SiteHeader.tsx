'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const NAV = [
  { label: 'About', href: '/about' },
  { label: 'Hire', href: '/hire' },
  { label: 'Projects', href: '/projects' },
  { label: 'Process', href: '/process' },
];

export default function SiteHeader({
  avatar,
}: {
  avatar?: { url: string; width: number; height: number };
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const home = pathname === '/';

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-4 pt-4">
      <a
        href="#main"
        className="mono pointer-events-auto sr-only focus:not-sr-only focus:absolute focus:left-6 focus:top-6 focus:rounded-full focus:bg-surface focus:px-4 focus:py-2"
      >
        skip to content
      </a>

      <div className="mx-auto flex w-full max-w-[var(--shell)] items-center justify-between gap-4">
        {/* avatar sits left on inner pages, as in the template */}
        <div className="flex-1">
          {!home && avatar && (
            <Link
              href="/"
              aria-label="Home"
              className="pointer-events-auto block h-9 w-9 overflow-hidden rounded-full border border-line bg-surface"
            >
              <Image
                src={avatar.url}
                alt=""
                width={avatar.width}
                height={avatar.height}
                sizes="40px"
                className="h-full w-full object-cover grayscale"
              />
            </Link>
          )}
        </div>

        <nav
          aria-label="Site"
          className="pointer-events-auto hidden items-center gap-0.5 rounded-full border border-line bg-surface/80 px-1.5 py-1.5 backdrop-blur-md md:flex"
        >
          {NAV.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className={`rounded-full px-3 py-1.5 text-[0.75rem] font-medium transition-colors duration-200 ${
                  active ? 'text-accent' : 'text-fg-soft hover:text-fg'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex flex-1 justify-end">
          <button
            type="button"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
            className="mono pointer-events-auto rounded-full border border-line bg-surface/80 px-4 py-2 backdrop-blur-md md:hidden"
          >
            {open ? 'close' : 'menu'}
          </button>
        </div>
      </div>

      <nav
        id="mobile-nav"
        aria-label="Site"
        className={`pointer-events-auto mx-auto mt-2 w-full max-w-[var(--shell)] flex-col gap-1 rounded-2xl border border-line bg-surface/95 p-3 backdrop-blur-md md:hidden ${
          open ? 'flex' : 'hidden'
        }`}
      >
        {NAV.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setOpen(false)}
            className="h-display rounded-xl px-3 py-2 text-2xl"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
