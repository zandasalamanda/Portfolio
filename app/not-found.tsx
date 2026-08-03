import Link from 'next/link';

export default function NotFound() {
  return (
    <main
      id="main"
      className="flex flex-1 flex-col items-center justify-center gap-4 px-6 py-40"
    >
      <h1 className="mono text-base font-normal text-fg-soft">
        404 — nothing at this path.
      </h1>
      <Link href="/" className="cta">
        back to the work
      </Link>
    </main>
  );
}
