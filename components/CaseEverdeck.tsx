import Image from 'next/image';
import { everdeckPreview, productById } from '@/content/site';
import { asset } from '@/lib/assets';
import { AwaitingAsset, AwaitingLogo, Frame } from './Evidence';
import Reveal from './Reveal';
import { DecisionsAndStack, ReceiptsRow } from './CaseBlocks';

const everdeck = productById('everdeck');

/** The hand, dealt in the order the product works: hunt a niche → read the deck. */
const allCards = [
  {
    rel: 'everdeck/shot-hunts.png',
    tab: 'niche hunt',
    tint: '#9cd6ff',
    alt: 'Everdeck hunts: pick a business niche and market to scan — popular niche chips, a location field, and recent completed hunts',
    pos: 'md:left-0 md:top-0 md:w-[54%] md:-rotate-[4.5deg]',
  },
  {
    rel: 'everdeck/shot-deck.png',
    tab: 'the deck',
    tint: '#ffc2d4',
    alt: 'Everdeck prospect deck: a grid of scored cards, each with an opportunity score, a tier badge, and the findings behind the score',
    pos: 'md:right-0 md:top-[110px] md:w-[56%] md:rotate-[3deg]',
  },
];

/** The relative paths of every dealable Everdeck screenshot (source of truth
 *  for both the fan below and the promotion gate in app/page.tsx). */
export const everdeckShots = allCards.map((c) => c.rel);

/** Only deal the cards whose screenshots actually exist. */
const cards = allCards.filter((c) => asset(c.rel).exists);

function FanCard({
  card,
  index,
  className,
  style,
}: {
  card: (typeof allCards)[number];
  index: number;
  className: string;
  style?: React.CSSProperties;
}) {
  const a = asset(card.rel);
  return (
    <Reveal className={className} style={style}>
      <div className="relative">
        <span
          className="mono absolute -top-[26px] left-4 rounded-t-[4px] border border-b-0 px-2.5 py-1 text-[0.625rem] uppercase tracking-[0.14em] text-[var(--zone-mono)] tz"
          style={{ borderColor: `${card.tint}59` }}
        >
          {String(index + 1).padStart(2, '0')} — {card.tab}
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
      aria-label="Case study 04: Everdeck"
      className="relative scroll-mt-14"
    >
      <div className="relative mx-auto w-full max-w-[1200px] px-6 py-20 md:px-10 md:py-36">
        {/* The section header is itself an index tab on the top edge of the deck. */}
        <div className="flex items-end">
          <p
            className="eyebrow tz border-x border-t px-3.5 py-2"
            style={{ borderColor: 'var(--zone-hairline)' }}
          >
            {everdeck.number} · {everdeck.date} · private preview
          </p>
          <span aria-hidden className="tz h-px flex-1 bg-[var(--zone-hairline)]" />
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
        <div
          className={`relative mt-20 md:mt-24 ${cards.length > 2 ? 'md:h-[700px] lg:h-[760px]' : 'md:h-[560px] lg:h-[620px]'}`}
        >
          {cards.map((card, i) => (
            <FanCard
              key={card.rel}
              card={card}
              index={i}
              className={`relative w-[92%] md:absolute md:mt-0 ${card.pos} ${
                i % 2 === 0 ? 'rotate-[-2.5deg]' : 'ml-auto rotate-[2deg]'
              } ${i > 0 ? '-mt-4' : ''}`}
              style={{ zIndex: 10 + i }}
            />
          ))}
        </div>

        <DecisionsAndStack note={everdeck.decisionsNote} techLine={everdeck.techLine} />

        <ReceiptsRow receipts={everdeck.receipts} />
      </div>
    </section>
  );
}
