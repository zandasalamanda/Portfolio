'use client';

import { useState } from 'react';
import { identity } from '@/content/site';

const anchors = [
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export default function Header({ resumeExists }: { resumeExists: boolean }) {
  const [open, setOpen] = useState(false);

  const resumeLink = resumeExists ? (
    <a
      href="/assets/resume-web.pdf"
      target="_blank"
      rel="noreferrer"
      className="mono link-x text-ink"
    >
      resume
    </a>
  ) : (
    <span className="mono cursor-default text-ink-soft/70" title="Resume PDF pending">
      resume — awaiting file
    </span>
  );

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-hairline bg-paper">
      <a
        href="#work"
        className="mono sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-50 focus:bg-paper focus:px-3 focus:py-2 focus:text-ink"
      >
        skip to work
      </a>
      <div className="mx-auto flex h-[52px] w-full max-w-[1200px] items-center justify-between px-6 md:px-10">
        <a
          href="#top"
          className="font-display text-[0.9375rem] font-black tracking-[-0.01em] text-ink"
          onClick={() => setOpen(false)}
        >
          Zander Leon
        </a>

        {/* Desktop */}
        <nav aria-label="Site" className="hidden items-center gap-7 md:flex">
          {anchors.map((a) => (
            <a key={a.href} href={a.href} className="link-x text-[0.9375rem] text-ink">
              {a.label}
            </a>
          ))}
          <span aria-hidden className="h-4 w-px bg-hairline" />
          <a
            href={identity.github}
            target="_blank"
            rel="noreferrer"
            className="mono link-x text-ink"
          >
            github
          </a>
          {resumeLink}
        </nav>

        {/* Mobile */}
        <button
          type="button"
          className="mono -m-2 p-2 text-ink md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? 'close' : 'menu'}
        </button>
      </div>

      <nav
        id="mobile-menu"
        aria-label="Site"
        className={`fixed inset-x-0 bottom-0 top-[52px] z-40 flex-col gap-7 border-t border-hairline bg-paper px-6 pt-14 md:hidden ${open ? 'flex' : 'hidden'}`}
      >
          {resumeExists ? (
            <a
              href="/assets/resume-web.pdf"
              target="_blank"
              rel="noreferrer"
              className="display text-4xl text-ink"
              onClick={() => setOpen(false)}
            >
              Resume
            </a>
          ) : (
            <span className="display text-4xl text-ink-soft/60">
              Resume
              <span className="mono ml-3 align-middle text-[0.75rem] normal-case tracking-normal">
                awaiting file
              </span>
            </span>
          )}
          {anchors.map((a) => (
            <a
              key={a.href}
              href={a.href}
              className="display text-4xl text-ink"
              onClick={() => setOpen(false)}
            >
              {a.label}
            </a>
          ))}
          <a
            href={identity.github}
            target="_blank"
            rel="noreferrer"
            className="display text-4xl text-ink"
            onClick={() => setOpen(false)}
          >
            GitHub
          </a>
      </nav>
    </header>
  );
}
