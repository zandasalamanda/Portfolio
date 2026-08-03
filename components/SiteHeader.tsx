'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const NAV = [
  { label: 'Work', href: '/work' },
  { label: 'Hire', href: '/hire' },
  { label: 'Activity', href: '/activity' },
  { label: 'About', href: '/about' },
];

/** Floating pill nav — the studio's constant. */
export default function SiteHeader({
  avatar,
}: {
  avatar?: { url: string; width: number; height: number };
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-4 pt-4 md:pt-5">
      <a
        href="#main"
        className="mono pointer-events-auto sr-only focus:not-sr-only focus:absolute focus:left-6 focus:top-6 focus:z-50 focus:rounded-full focus:bg-surface focus:px-4 focus:py-2 focus:text-fg"
      >
        skip to content
      </a>

      <div className="mx-auto flex w-full max-w-[1200px] items-center justify-between gap-4">
        <Link
          href="/"
          aria-label="Zander Leon — home"
          className="pointer-events-auto flex items-center gap-2.5 rounded-full border border-line bg-surface/85 py-1.5 pl-1.5 pr-4 backdrop-blur-md"
        >
          {avatar ? (
            <Image
              src={avatar.url}
              alt=""
              width={avatar.width}
              height={avatar.height}
              sizes="32px"
              className="h-8 w-8 rounded-full object-cover grayscale"
            />
          ) : (
            <span className="mono flex h-8 w-8 items-center justify-center rounded-full border border-line text-[0.625rem]">
              ZL
            </span>
          )}
          <span className="font-display text-[0.9375rem] font-black tracking-[-0.01em]">
            Zander Leon
          </span>
        </Link>

        <nav
          aria-label="Site"
          className="pointer-events-auto hidden items-center gap-1 rounded-full border border-line bg-surface/85 px-1.5 py-1.5 backdrop-blur-md md:flex"
        >
          {NAV.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className={`mono rounded-full px-3.5 py-1.5 transition-colors duration-200 ${
                  active
                    ? 'bg-[rgba(250,250,248,0.1)] text-fg'
                    : 'text-fg-soft hover:text-fg'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="pointer-events-auto flex items-center gap-2">
          <Link href="/hire" className="cta hidden md:inline-block">
            Start a project
          </Link>
          <button
            type="button"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
            className="mono rounded-full border border-line bg-surface/85 px-4 py-2 backdrop-blur-md md:hidden"
          >
            {open ? 'close' : 'menu'}
          </button>
        </div>
      </div>

      <nav
        id="mobile-nav"
        aria-label="Site"
        className={`pointer-events-auto mx-auto mt-2 w-full max-w-[1200px] flex-col gap-1 rounded-2xl border border-line bg-surface/95 p-3 backdrop-blur-md md:hidden ${
          open ? 'flex' : 'hidden'
        }`}
      >
        {NAV.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setOpen(false)}
            className="display rounded-xl px-3 py-2 text-2xl text-fg"
          >
            {item.label}
          </Link>
        ))}
        <Link href="/hire" onClick={() => setOpen(false)} className="cta mt-2 text-center">
          Start a project
        </Link>
      </nav>
    </header>
  );
}
