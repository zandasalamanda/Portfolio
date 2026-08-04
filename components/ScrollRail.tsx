'use client';

import { useEffect, useState } from 'react';

/**
 * The progress rail beside the scroller: one tick per project, the active one
 * expanded and tinted with that project's accent. Click to jump.
 */
export default function ScrollRail({
  items,
}: {
  items: { id: string; name: string; accent: string }[];
}) {
  const [active, setActive] = useState(items[0]?.id ?? '');

  useEffect(() => {
    const sections = items
      .map((i) => document.getElementById(`panel-${i.id}`))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id.replace('panel-', ''));
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.25, 0.5, 1] },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [items]);

  return (
    <nav
      aria-label="Projects"
      className="pointer-events-none fixed right-5 top-1/2 z-30 hidden -translate-y-1/2 lg:block"
    >
      <ul className="flex flex-col items-end gap-3">
        {items.map((i) => {
          const on = i.id === active;
          return (
            <li key={i.id}>
              <a
                href={`#panel-${i.id}`}
                className="pointer-events-auto group flex items-center justify-end gap-2.5"
                aria-current={on ? 'true' : undefined}
              >
                <span
                  className={`mono whitespace-nowrap text-[0.625rem] transition-all duration-300 ${
                    on ? 'opacity-100' : 'opacity-0 group-hover:opacity-60'
                  }`}
                  style={{ color: on ? i.accent : '#a1a1aa' }}
                >
                  {i.name}
                </span>
                <span
                  className="block rounded-full transition-all duration-300"
                  style={{
                    width: on ? 22 : 6,
                    height: 6,
                    background: on ? i.accent : 'rgba(255,255,255,0.22)',
                  }}
                />
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
