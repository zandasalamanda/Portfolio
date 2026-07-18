import Image from 'next/image';
import { everdeckPreview, products } from '@/content/site';
import { asset } from '@/lib/assets';
import { AwaitingAsset, AwaitingLogo, Frame } from './Evidence';
import Reveal from './Reveal';

const everdeck = products[2];

const cards = [
  {
    rel: 'everdeck/shot-deck.png',
    tab: 'shot 01 — deck',
    tint: '#ffc2d4',
    alt: 'Everdeck prospect deck: a grid of scored cards, each showing a local business, its current website screenshot, an opportunity score, and audit reasons',
  },
  {
    rel: 'everdeck/shot-prospect.png',
    tab: 'shot 02 — prospect',
    tint: '#c9bbff',
    alt: "Everdeck prospect detail: a before/after comparison of a business's current site beside the automatically designed concept, with an opportunity score ring and outreach pipeline",
  },
];

function FanCard({
  card,
  className,
}: {
  card: (typeof cards)[number];
  className: string;
}) {
  const a = asset(card.rel);
  return (
    <Reveal className={className}>
      <div className="relative">
        <span
          className="mono absolute -top-6 left-4 rounded-t-[4px] border border-b-0 px-2.5 py-1 text-[0.625rem] uppercase tracking-[0.14em] text-[var(--zone-mono)] tz"
          style={{ borderColor: `${card.tint}59` }}
        >
          {card.tab}
        </span>
        <div
          className="overflow-hidden rounded-[6px]"
          style={{
            boxShadow: `0 0 0 1px ${card.tint}66, 0 28px 56px rgba(0, 0, 0, 0.5)`,
          }}
        >
          {a.exists && a.width && a.height ? (
            <Frame
              rel={card.rel}
              domain="everdeck.app"
              alt={card.alt}
              sizes="(min-width: 768px) 58vw, 92vw"
            />
          ) : (
            <AwaitingAsset rel={card.rel} aspect="1728 / 1080" />
          )}
        </div>
      </div>
    </Reveal>
  );
}

export default function CaseEverdeck() {
  const logo = asset('everdeck/logo.svg');

  return (
    <section
      id="case-everdeck"
      aria-label="Case study 03: Everdeck"
      className="relative scroll-mt-14"
    >
      <div className="relative mx-auto w-full max-w-[1200px] px-6 py-20 md:px-10 md:py-36">
        <div className="tz border-b border-[var(--zone-hairline)] pb-3">
          <p className="eyebrow tz">
            {everdeck.number} · {everdeck.date} · private preview
          </p>
        </div>

        <div className="mt-10 flex items-center gap-5">
          {logo.exists ? (
            <Image
              src={logo.url}
              alt="Everdeck mark: a fanned deck of cards in a pastel gradient"
              width={72}
              height={72}
              unoptimized
              className="h-14 w-14 md:h-[72px] md:w-[72px]"
            />
          ) : (
            <AwaitingLogo rel="everdeck/logo.svg" />
          )}
          <h3 className="display text-[clamp(2.5rem,4.5vw,3.5rem)] text-[var(--zone-fg)] tz">
            Everdeck
          </h3>
        </div>

        <p className="mt-6 max-w-[54ch] text-[clamp(1.125rem,1.05rem+0.45vw,1.3125rem)] leading-relaxed">
          {everdeck.description}
        </p>

        <p className="tz mt-3 text-[var(--zone-fg-soft)]">
          {everdeckPreview.copy}
          <a href={everdeckPreview.mailto} className="link-u tz text-[var(--zone-link)]">
            {everdeckPreview.linkText}
          </a>
        </p>

        {/* Evidence field — screenshots dealt as a fanned card stack with mono
            index tabs; the pastel spectrum appears only as per-card edge tints
            (§5 device, §6.2 composition 03). */}
        <div className="relative mt-24 md:mt-28 md:h-[560px] lg:h-[620px]">
          <FanCard
            card={cards[0]}
            className="relative w-[92%] rotate-[-2.5deg] md:absolute md:left-0 md:top-0 md:w-[58%] md:rotate-[-4.5deg]"
          />
          <FanCard
            card={cards[1]}
            className="relative z-10 -mt-6 ml-auto w-[92%] rotate-[2deg] md:absolute md:right-0 md:top-28 md:mt-0 md:w-[58%] md:rotate-[3deg]"
          />
        </div>

        <div className="mt-16 max-w-[62ch]">
          <p className="eyebrow tz">Decisions</p>
          <p className="mt-4 leading-relaxed">{everdeck.decisionsNote}</p>
        </div>

        <p className="mono tz mt-10 max-w-[72ch] leading-relaxed text-[var(--zone-fg-soft)]">
          {everdeck.techLine}
        </p>

        <div className="tz mt-10 flex flex-wrap items-baseline gap-x-6 gap-y-2 border-t border-[var(--zone-hairline)] pt-5">
          <span className="eyebrow tz">Receipts</span>
          {everdeck.receipts.map((r) => (
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
