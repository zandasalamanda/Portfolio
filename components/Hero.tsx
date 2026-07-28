import Image from 'next/image';
import github from '@/content/github.json';
import verification from '@/content/verification.json';
import { positioning, proofLine } from '@/content/site';
import { asset } from '@/lib/assets';
import HeroField from './HeroField';

interface VerifyResult {
  url: string;
  host: string;
  status: number | null;
  ok: boolean | null;
}

function statusFor(host: string): string {
  const results = (verification as { results?: VerifyResult[] }).results ?? [];
  const hit = results.find((r) => r.host === host);
  return hit?.status != null ? String(hit.status) : '—';
}

/** Real product marks where an asset exists; a mono monogram chip otherwise. */
const MARKS: Record<string, { rel: string; rounded?: boolean } | { chip: string }> = {
  ChronoIQ: { rel: 'chronoiq/logo.png', rounded: true },
  Solaspace: { rel: 'solaspace/logo.svg' },
  Everdeck: { rel: 'everdeck/logo.svg' },
  Bandr: { chip: 'B' },
  'Ya Sabo': { chip: 'YS' },
};

function ProductMark({ name }: { name: string }) {
  const mark = MARKS[name];
  // Always occupy the 16px slot so rows stay aligned even without a mark.
  if (!mark) return <span aria-hidden className="h-4 w-4 shrink-0" />;
  if ('chip' in mark) {
    return (
      <span
        aria-hidden
        className="mono tz flex h-4 w-4 shrink-0 items-center justify-center border border-[var(--zone-hairline)] text-[0.5rem] leading-none text-[var(--zone-fg-soft)]"
      >
        {mark.chip}
      </span>
    );
  }
  const a = asset(mark.rel);
  if (!a.exists) return <span aria-hidden className="h-4 w-4 shrink-0" />;
  return (
    <Image
      src={a.url}
      alt=""
      width={16}
      height={16}
      unoptimized
      className={`h-4 w-4 shrink-0 object-contain ${mark.rounded ? 'rounded-[3px]' : ''}`}
    />
  );
}

export default function Hero() {
  const verifiedAt = (verification as { verifiedAt: string | null }).verifiedAt;
  const productRows = (
    github as {
      products: { name: string; status: string; date: string }[];
    }
  ).products;

  return (
    <section className="relative flex min-h-[100svh] flex-col">
      <HeroField />
      <div className="relative mx-auto flex w-full max-w-[1200px] flex-1 flex-col px-6 pt-[calc(52px+clamp(2.25rem,8svh,5.5rem))] md:px-10">
        <div className="hero-mask">
          <h1 className="display text-[clamp(3rem,9vw,7.5rem)] uppercase text-[var(--zone-fg)] tz">
            {`Zander Leon`}
          </h1>
        </div>

        <p className="hero-stage-2 mt-5 max-w-[38ch] text-[clamp(1.1875rem,1.05rem+0.8vw,1.5rem)] leading-snug md:mt-7">
          {positioning.line.replace(/\.$/, '')}.
          <sup className="ml-px text-[0.62em]">
            <a
              href="#build-receipts"
              aria-label="Footnote: link statuses verified at build"
              className="tz text-[var(--zone-link)]"
            >
              1
            </a>
          </sup>
        </p>

        {/* ≤400px: inline flow at a smaller size so the line wraps to two
            lines, never three (§6.1 compression rules). */}
        <ul className="hero-stage-3 mono mt-8 max-w-[52rem] leading-relaxed max-[400px]:block max-[400px]:text-[0.625rem] max-[400px]:tracking-normal max-[400px]:[text-wrap:balance] min-[401px]:flex min-[401px]:flex-wrap min-[401px]:items-baseline min-[401px]:gap-x-3 min-[401px]:gap-y-1.5">
          {proofLine.map((item, i) => {
            const external = item.href.startsWith('http');
            return (
              <li
                key={item.label}
                className="max-[400px]:inline min-[401px]:flex min-[401px]:items-baseline min-[401px]:gap-x-3"
              >
                {i > 0 && (
                  <span aria-hidden className="tz text-[var(--zone-fg-soft)]">
                    {'· '}
                  </span>
                )}
                <a
                  href={item.href}
                  {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
                  className="link-x tz text-[var(--zone-link)]"
                >
                  {item.label} <span aria-hidden>→</span>
                </a>
              </li>
            );
          })}
        </ul>

        <div className="hero-stage-4 mt-10 w-full max-w-[660px]">
          {productRows.map((p) => (
            <div
              key={p.name}
              className="tz flex items-center gap-2.5 border-t border-[var(--zone-hairline)] py-[0.5625rem] last:border-b min-[401px]:gap-3"
            >
              <ProductMark name={p.name} />
              <span className="mono tz text-[var(--zone-fg)]">{p.name}</span>
              <span aria-hidden className="mono tz text-[var(--zone-fg-soft)] max-[400px]:hidden">
                —
              </span>
              <span aria-hidden className="mono tz text-[var(--zone-fg-soft)] min-[401px]:hidden">
                ·
              </span>
              <span className="mono tz text-[var(--zone-fg-soft)]">{p.status}</span>
              <span className="mono tz ml-auto text-[var(--zone-mono)]">{p.date}</span>
            </div>
          ))}
        </div>

        <div
          id="build-receipts"
          className="tz mt-auto border-t border-[var(--zone-hairline)] pb-5 pt-4"
        >
          <p className="hero-stage-4 mono text-[0.6875rem] leading-relaxed text-[var(--zone-fg-soft)] tz">
            ¹ verified at build {verifiedAt ?? 'pending'} — chronoiq.dev{' '}
            {statusFor('chronoiq.dev')} · solaspace.app {statusFor('solaspace.app')} ·
            everdeck.app {statusFor('everdeck.app')} (private preview, as designed)
          </p>
        </div>
      </div>
    </section>
  );
}
