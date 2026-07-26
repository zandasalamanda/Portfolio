'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * First-view reveal for evidence imagery only (§3: text is simply present;
 * only evidence imagery may reveal). Reduced motion falls back to
 * opacity-only via CSS.
 */
export default function Reveal({
  children,
  className = '',
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={`reveal ${seen ? 'is-in' : ''} ${className}`} style={style}>
      {children}
    </div>
  );
}
