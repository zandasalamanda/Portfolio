import type { Receipt } from '@/content/site';

/**
 * Shared case-study furniture. The decisions note and the stack sit as a
 * paired spread rather than two half-empty rows.
 */
export function DecisionsAndStack({
  note,
  techLine,
}: {
  note: string;
  techLine: string;
}) {
  return (
    <div className="mt-16 grid gap-10 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] md:gap-16">
      <div>
        <h4 className="eyebrow tz">Decisions</h4>
        <p className="mt-4 max-w-[52ch] leading-relaxed">{note}</p>
      </div>
      <div>
        <h4 className="eyebrow tz">Stack</h4>
        <p className="mono tz mt-4 leading-relaxed text-[var(--zone-fg-soft)]">
          {techLine}
        </p>
      </div>
    </div>
  );
}

export function ReceiptsRow({ receipts }: { receipts: Receipt[] }) {
  return (
    <div className="tz mt-12 flex flex-wrap items-baseline gap-x-6 gap-y-2 border-t border-[var(--zone-hairline)] pt-5">
      <h4 className="eyebrow tz">Receipts</h4>
      {receipts.map((r) => (
        <a
          key={r.url}
          href={r.url}
          target="_blank"
          rel="noreferrer"
          className="mono link-x tz text-[var(--zone-link)]"
        >
          {r.label} <span aria-hidden>↗</span>
        </a>
      ))}
    </div>
  );
}
