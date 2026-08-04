/**
 * The little drawings beside each process step — one hand-drawn vignette per
 * step, stroke only, in the accent colour. Every path carries pathLength={1}
 * and the `sk` class so the stylesheet can draw it on as the step scrolls in;
 * without scroll-driven animation support they are simply visible.
 */
const STROKE = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2.4,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  pathLength: 1,
  className: 'sk',
};

const ART: Record<string, React.ReactNode> = {
  /* 01 — a conversation: big bubble, reply bubble */
  talk: (
    <>
      <path {...STROKE} d="M14 22h64a8 8 0 0 1 8 8v30a8 8 0 0 1-8 8H40l-14 13v-13h-12a8 8 0 0 1-8-8V30a8 8 0 0 1 8-8Z" transform="translate(8 2)" />
      <path {...STROKE} className="sk sk-type" d="M28 40h44" transform="translate(8 2)" />
      <path {...STROKE} className="sk sk-type sk-type2" d="M28 52h30" transform="translate(8 2)" />
      <path {...STROKE} className="sk sk-pop" d="M78 84h22a6 6 0 0 0 6-6v-8a6 6 0 0 0-6-6H84a6 6 0 0 0-6 6v8l-6 10 6-4Z" transform="translate(2 6)" />
    </>
  ),
  /* 02 — the quote: a document with one price line and a signature */
  quote: (
    <>
      <path {...STROKE} d="M30 12h42l16 16v76H30V12Z" />
      <path {...STROKE} d="M72 12v16h16" />
      <path {...STROKE} d="M42 46h36" />
      <path {...STROKE} d="M42 58h36" />
      <path {...STROKE} d="M42 70h20" />
      <path {...STROKE} className="sk sk-sig" d="M42 88c4-6 8 4 12-2s8 2 14-2" />
    </>
  ),
  /* 03 — the live preview: a browser with a bar that is mid-fill */
  preview: (
    <>
      <path {...STROKE} d="M12 24h96v68H12V24Z" />
      <path {...STROKE} d="M12 38h96" />
      <path {...STROKE} d="M20 31h.5M28 31h.5M36 31h.5" strokeWidth={3.4} />
      <path {...STROKE} d="M24 56h48" strokeWidth={6} opacity={0.35} />
      <path {...STROKE} className="sk sk-bar" d="M24 56h30" strokeWidth={6} />
      <path {...STROKE} d="M24 74h36" />
      <path {...STROKE} className="sk sk-cursor" d="M88 66l14 14-8 1-3 8-3-23Z" transform="translate(-4 -4)" />
    </>
  ),
  /* 04 — the handover: a key over an open box */
  keys: (
    <>
      <path {...STROKE} d="M20 62h80v40H20V62Z" />
      <path {...STROKE} d="M20 62l10-14h60l10 14" />
      <path {...STROKE} d="M50 80h20" />
      <path {...STROKE} className="sk sk-key" d="M60 16a12 12 0 1 0 .01 0Z" transform="translate(-14 4)" />
      <path {...STROKE} className="sk sk-key" d="M54 38v18l6 6" transform="translate(-8 -6)" />
    </>
  ),
};

export default function ProcessArt({ id, className = '' }: { id: string; className?: string }) {
  return (
    <svg viewBox="0 0 120 120" aria-hidden className={`sketch ${className}`}>
      {ART[id] ?? ART.talk}
    </svg>
  );
}
