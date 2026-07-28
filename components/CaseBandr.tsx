import Image from 'next/image';
import { productById } from '@/content/site';
import { asset } from '@/lib/assets';
import { DecisionsAndStack, ReceiptsRow } from './CaseBlocks';
import { AwaitingAsset } from './Evidence';
import Reveal from './Reveal';

const bandr = productById('bandr');

/** The product flow, told left to right in its own real accent colors. */
const steps = [
  {
    rel: 'bandr/shot-quiz.png',
    label: 'step 01 — profile',
    tint: '#9c41bf',
    alt: 'Bandr onboarding quiz: picking skills from an emoji chip grid with a progress bar',
  },
  {
    rel: 'bandr/shot-home.png',
    label: 'step 02 — matches',
    tint: '#28e07a',
    alt: 'Bandr home: ranked money moves, each with a move score ring, earnings range, and a plain-language reason it fits',
  },
  {
    rel: 'bandr/shot-detail.png',
    label: 'step 03 — why it fits',
    tint: '#9c41bf',
    alt: 'Bandr move detail: the transparent score breakdown — time, startup cost, difficulty, awkwardness, and checked reasons it fits',
  },
  {
    rel: 'bandr/shot-kit.png',
    label: 'step 04 — launch kit',
    tint: '#28e07a',
    alt: 'Bandr launch kit: a generated service name, pitch, and exact text to send, each with a copy button',
  },
];

export default function CaseBandr() {
  return (
    <section
      id="case-bandr"
      aria-label="Case study 02: Bandr"
      className="relative scroll-mt-14"
    >
      <div className="relative mx-auto w-full max-w-[1200px] px-6 py-20 md:px-10 md:py-36">
        <div className="tz flex items-baseline justify-between gap-4 border-b border-[var(--zone-hairline)] pb-3">
          <p className="eyebrow tz">
            {bandr.number} · {bandr.date} · open source
          </p>
          <p className="mono tz hidden text-[0.6875rem] text-[var(--zone-fg-soft)] sm:block">
            mobile-first · built for ages 12–18
          </p>
        </div>

        <div className="mt-10 flex items-center gap-5">
          <span
            aria-hidden
            className="font-display flex h-14 w-14 items-center justify-center rounded-[6px] text-2xl font-black text-[#0b6b3e] ring-1 ring-[var(--zone-hairline)] md:h-[72px] md:w-[72px] md:text-3xl"
          >
            B
          </span>
          <h3 className="display text-[clamp(2.5rem,4.5vw,3.5rem)] text-[var(--zone-fg)] tz">
            Bandr
          </h3>
        </div>

        <p className="mt-6 max-w-[54ch] text-[clamp(1.125rem,1.05rem+0.45vw,1.3125rem)] leading-relaxed">
          {bandr.description}
        </p>
        <p className="mono tz mt-3 text-[var(--zone-fg-soft)]">
          31 money-moves · scored 0–100 by a rule engine you can read
        </p>

        {/* Evidence field — the flow as four phones, dealt left to right
            (§6.2: no two case studies share a composition). */}
        <div className="mt-14 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4 md:gap-5">
          {steps.map((s, i) => {
            const a = asset(s.rel);
            return (
              <Reveal key={s.rel} className={i % 2 === 1 ? 'md:mt-10' : ''}>
                <p className="mono tz mb-2 flex items-center gap-2 text-[0.6875rem] uppercase tracking-[0.12em] text-[var(--zone-fg-soft)]">
                  {s.label}
                  <span aria-hidden className="tz h-px flex-1 bg-[var(--zone-hairline)]" />
                </p>
                {a.exists && a.width && a.height ? (
                  <figure
                    className="evidence-lift tz overflow-hidden rounded-[6px] bg-[var(--frame-bg)]"
                    style={{ boxShadow: `0 0 0 1px ${s.tint}55, 0 10px 28px rgba(20,30,24,0.12)` }}
                  >
                    <Image
                      src={a.url}
                      alt={s.alt}
                      width={a.width}
                      height={a.height}
                      sizes="(min-width: 768px) 22vw, 44vw"
                      className="block h-auto w-full"
                    />
                  </figure>
                ) : (
                  <AwaitingAsset rel={s.rel} aspect="390 / 844" />
                )}
              </Reveal>
            );
          })}
        </div>

        <DecisionsAndStack note={bandr.decisionsNote} techLine={bandr.techLine} />

        <ReceiptsRow receipts={bandr.receipts} />
      </div>
    </section>
  );
}
