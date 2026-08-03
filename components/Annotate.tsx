/**
 * A hand-drawn annotation that draws itself as it scrolls into view —
 * an ellipse around a phrase, or an underline beneath it.
 */
export function Circled({ children }: { children: React.ReactNode }) {
  return (
    <span className="relative inline-block whitespace-nowrap">
      {children}
      <svg
        aria-hidden
        viewBox="0 0 220 46"
        preserveAspectRatio="none"
        className="annotate pointer-events-none absolute -inset-x-3 -inset-y-1.5 h-[calc(100%+12px)] w-[calc(100%+24px)]"
      >
        <path
          d="M32 8C14 12 4 22 8 31c5 10 34 12 78 12s96-4 106-14c8-8-6-17-30-20C136 6 96 4 68 6"
          fill="none"
          stroke="#b3a6ff"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.85"
        />
      </svg>
    </span>
  );
}

export function Underlined({ children }: { children: React.ReactNode }) {
  return (
    <span className="relative inline-block whitespace-nowrap">
      {children}
      <svg
        aria-hidden
        viewBox="0 0 200 12"
        preserveAspectRatio="none"
        className="annotate pointer-events-none absolute -bottom-1.5 left-0 h-2.5 w-full"
      >
        <path
          d="M3 8c40-5 84-6 124-4 26 1 48 3 70 4"
          fill="none"
          stroke="#b3a6ff"
          strokeWidth="2.5"
          strokeLinecap="round"
          opacity="0.9"
        />
      </svg>
    </span>
  );
}
