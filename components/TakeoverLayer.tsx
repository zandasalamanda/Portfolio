'use client';

import { useEffect } from 'react';

export type ZoneId = 'chronoiq' | 'bandr' | 'solaspace' | 'everdeck';

/**
 * The signature device (§5): a single fixed background layer behind all
 * content. A zone activates when its section's top edge crosses 66% of the
 * viewport height, and reverses identically on the way back up. No
 * IntersectionObserver ratios — sections are taller than the viewport.
 * Between two adjacent takeovers the previous zone holds through the gap so
 * paper never flashes; after the last zone (and before the first) it returns
 * to paper.
 */
export default function TakeoverLayer({ zones }: { zones: ZoneId[] }) {
  useEffect(() => {
    const sections = zones
      .map((zone) => ({ zone, el: document.getElementById(`case-${zone}`) }))
      .filter((s): s is { zone: ZoneId; el: HTMLElement } => s.el !== null);
    if (sections.length === 0) return;

    let raf = 0;

    const apply = () => {
      raf = 0;
      const line = window.innerHeight * 0.66;

      let candidate: { zone: ZoneId; bottom: number; index: number } | null = null;
      sections.forEach((s, index) => {
        const rect = s.el.getBoundingClientRect();
        if (rect.top <= line) candidate = { zone: s.zone, bottom: rect.bottom, index };
      });

      let active: ZoneId | null = null;
      if (candidate !== null) {
        const c = candidate as { zone: ZoneId; bottom: number; index: number };
        if (c.bottom > line) {
          active = c.zone;
        } else if (c.index < sections.length - 1) {
          // In the gap between two adjacent takeovers: most-recently-triggered
          // wins, so the previous ground holds until the next section fires.
          active = c.zone;
        }
      }

      const html = document.documentElement;
      if (active) html.setAttribute('data-zone', active);
      else html.removeAttribute('data-zone');
    };

    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(apply);
    };

    apply();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      if (raf) cancelAnimationFrame(raf);
      document.documentElement.removeAttribute('data-zone');
    };
  }, [zones]);

  return <div aria-hidden className="takeover-layer" />;
}
