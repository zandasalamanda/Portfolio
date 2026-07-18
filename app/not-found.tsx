import Link from 'next/link';

/** Custom 404 (§6): same system, one mono line, link home. */
export default function NotFound() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center gap-4 bg-paper px-6">
      <h1 className="mono text-base font-normal text-ink-soft">
        404 — nothing at this path.
      </h1>
      <Link href="/" className="mono link-x text-accent">
        back to the work <span aria-hidden>→</span>
      </Link>
    </main>
  );
}
