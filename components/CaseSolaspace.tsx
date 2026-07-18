import Image from 'next/image';
import { products } from '@/content/site';
import { asset } from '@/lib/assets';
import { AwaitingLogo, Frame } from './Evidence';
import Reveal from './Reveal';

const solaspace = products[1];

/** Deterministic PRNG so the starfield is identical on every render. */
function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const rand = mulberry32(20251218);
const STARS = Array.from({ length: 130 }, () => ({
  x: Math.round(rand() * 14400) / 10,
  y: Math.round(rand() * 9000) / 10,
  r: Math.round((0.4 + rand() * 0.7) * 10) / 10,
  o: Math.round((0.1 + rand() * 0.3) * 100) / 100,
}));

export default function CaseSolaspace() {
  const logo = asset('solaspace/logo.svg');

  return (
    <section
      id="case-solaspace"
      aria-label="Case study 02: Solaspace"
      className="relative scroll-mt-14"
    >
      {/* Takeover device (§5): sparse, static, near-threshold starfield. */}
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
      >
        {STARS.map((s, i) => (
          <circle key={i} cx={s.x} cy={s.y} r={s.r} fill="#fafaf8" opacity={s.o} />
        ))}
      </svg>

      <div className="relative mx-auto w-full max-w-[1200px] px-6 py-20 md:px-10 md:py-36">
        {/* The section eyebrow rides a shallow orbit arc echoing the goal map (§5). */}
        <svg
          width="392"
          height="64"
          viewBox="0 0 392 64"
          role="img"
          aria-label={`${solaspace.number} · ${solaspace.date} · live`}
          className="max-w-full overflow-visible"
        >
          <path
            id="sola-orbit"
            d="M 10 52 Q 196 10 382 52"
            fill="none"
            stroke="var(--zone-hairline)"
            strokeWidth="1"
            className="tz"
          />
          <text
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '12px',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
            }}
            fill="var(--zone-mono)"
            className="tz"
          >
            <textPath href="#sola-orbit" startOffset="8">
              {solaspace.number} · {solaspace.date} · live
            </textPath>
          </text>
        </svg>

        <div className="mt-8 flex items-center gap-5">
          {logo.exists ? (
            <Image
              src={logo.url}
              alt="Solaspace mark: a gold orb on a faint orbit ring"
              width={72}
              height={72}
              unoptimized
              className="h-14 w-14 md:h-[72px] md:w-[72px]"
            />
          ) : (
            <AwaitingLogo rel="solaspace/logo.svg" />
          )}
          <h3 className="display text-[clamp(2.5rem,4.5vw,3.5rem)] text-[var(--zone-fg)] tz">
            Solaspace
          </h3>
        </div>

        <p className="tz mt-5 text-[1.0625rem] text-[var(--zone-fg-soft)]">
          &ldquo;{solaspace.tagline}&rdquo;
        </p>

        <p className="mt-5 max-w-[54ch] text-[clamp(1.125rem,1.05rem+0.45vw,1.3125rem)] leading-relaxed">
          {solaspace.description}
        </p>

        {/* Evidence field — goal map as a full-height right column; two smaller
            shots stacked left with unequal gaps (§6.2 composition 02). */}
        <div className="mt-16 grid gap-10 md:grid-cols-[5fr_7fr] md:gap-12">
          <div className="order-last md:order-none">
            <Reveal className="w-[86%]">
              <Frame
                rel="solaspace/shot-sola.png"
                domain="solaspace.app"
                alt="Ask Sola panel: a conversational assistant answering a planning question inside Solaspace"
                sizes="(min-width: 768px) 30vw, 86vw"
                aspect="804 / 1182"
              />
            </Reveal>
            <Reveal className="ml-auto mt-14 w-[74%] md:mt-24">
              <Frame
                rel="solaspace/shot-review.png"
                domain="solaspace.app"
                alt="Solaspace review screen titled 'Where you stand': on-pace status rows for each active goal with momentum stats"
                sizes="(min-width: 768px) 26vw, 74vw"
                aspect="942 / 1544"
              />
            </Reveal>
          </div>
          <div className="md:sticky md:top-24 md:self-start">
            <Reveal>
              <Frame
                rel="solaspace/shot-map.png"
                domain="solaspace.app"
                alt="Solaspace living goal map: a dark canvas of connected goal nodes radiating from a central objective"
                sizes="(min-width: 768px) 56vw, 100vw"
                aspect="2924 / 1992"
              />
            </Reveal>
          </div>
        </div>

        <div className="mt-16 max-w-[62ch]">
          <p className="eyebrow tz">Decisions</p>
          <p className="mt-4 leading-relaxed">{solaspace.decisionsNote}</p>
        </div>

        <p className="mono tz mt-10 max-w-[72ch] leading-relaxed text-[var(--zone-fg-soft)]">
          {solaspace.techLine}
        </p>

        <div className="tz mt-10 flex flex-wrap items-baseline gap-x-6 gap-y-2 border-t border-[var(--zone-hairline)] pt-5">
          <span className="eyebrow tz">Receipts</span>
          {solaspace.receipts.map((r) => (
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
      </div>
    </section>
  );
}
