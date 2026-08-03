import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Reveal from '@/components/Reveal';
import Starfield from '@/components/Starfield';
import VideoFacade from '@/components/VideoFacade';
import { projectCards, type ProjectCard } from '@/content/cards';
import { atlas, award, helios, identity } from '@/content/site';
import { asset } from '@/lib/assets';

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Every project Zander Leon has built — shipped products, AI systems, apps, tools, and games, with live links and source.',
};

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-line bg-white/[0.03] px-3 py-1 text-[0.75rem] text-fg-soft">
      {children}
    </span>
  );
}

function Card({ card }: { card: ProjectCard }) {
  const image = card.image ? asset(card.image.rel) : null;
  const sprite = card.sprite ? asset(card.sprite.rel) : null;
  const tags = card.tags.split(' · ');

  return (
    <Reveal>
      <article className="card group flex h-full flex-col overflow-hidden">
        <div className="relative aspect-[16/10] overflow-hidden border-b border-line bg-bg">
          {image?.exists && image.width && image.height && card.image ? (
            <Image
              src={image.url}
              alt={card.image.alt}
              width={image.width}
              height={image.height}
              sizes="(min-width: 1024px) 32vw, (min-width: 640px) 46vw, 92vw"
              className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
            />
          ) : sprite?.exists && card.sprite ? (
            <div className="flex h-full w-full items-center justify-center">
              <Image
                src={sprite.url}
                alt={card.sprite.alt}
                width={sprite.width ?? 64}
                height={sprite.height ?? 64}
                unoptimized
                className="pixel h-20 w-20 object-contain"
              />
            </div>
          ) : (
            <div
              className="flex h-full w-full items-center justify-center"
              style={{
                background: `radial-gradient(circle at 50% 40%, ${card.accent}22, transparent 70%)`,
              }}
            >
              <span
                className="h-display text-3xl"
                style={{ color: card.accent }}
                aria-hidden
              >
                {card.name.slice(0, 2)}
              </span>
            </div>
          )}
          <span
            aria-hidden
            className="absolute inset-x-0 top-0 h-[2px]"
            style={{
              background: card.accent2
                ? `linear-gradient(90deg, ${card.accent}, ${card.accent2})`
                : card.accent,
            }}
          />
        </div>

        <div className="flex flex-1 flex-col p-6">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
            <h3 className="h-display text-[1.25rem]">{card.name}</h3>
            {card.status && (
              <span className="mono ml-auto flex shrink-0 items-center gap-1.5 whitespace-nowrap text-[0.6875rem] text-fg-soft">
                <span
                  aria-hidden
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ background: card.accent }}
                />
                {card.status}
              </span>
            )}
          </div>

          {card.award && (
            <p className="mono mt-2 text-[0.6875rem] text-violet">★ {card.award}</p>
          )}

          <p className="mt-3 text-[0.9375rem] prose-soft">{card.line}</p>

          <div className="mt-5 flex flex-wrap gap-2">
            {tags.map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </div>

          {card.links.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-3 pt-1">
              {card.links.map((l, i) => (
                <a
                  key={l.url}
                  href={l.url}
                  target="_blank"
                  rel="noreferrer"
                  className={i === 0 ? 'btn-ghost !py-2 !text-[0.8125rem]' : 'btn-ghost !py-2 !text-[0.8125rem]'}
                >
                  {l.label} <span aria-hidden>↗</span>
                </a>
              ))}
            </div>
          )}
        </div>
      </article>
    </Reveal>
  );
}

const GROUPS = [
  { key: 'flagship' as const, title: 'Flagship', note: 'the ones I show first' },
  { key: 'product' as const, title: 'Products', note: 'shipped or in preview' },
  { key: 'lab' as const, title: 'Lab', note: 'tools and experiments' },
  { key: 'game' as const, title: 'Games', note: 'original engines, original pixel art' },
];

export default function ProjectsPage() {
  const poster = asset('chronoiq/video-poster.jpg');
  const heliosLogo = asset('helios/logo.png');
  const heliosPlot = asset('helios/velocity-plot.png');
  const atlasDark = asset('atlas/atlas-dark.png');

  return (
    <main id="main" className="flex-1">
      {/* --------------------------------------------------- starfield hero */}
      <section className="relative overflow-hidden pb-20 pt-[150px] md:pb-28 md:pt-[190px]">
        <Starfield />
        <div className="relative mx-auto w-full max-w-[900px] px-6 text-center">
          <p className="rise-1 mono text-fg-soft">
            My Projects Portfolio{' '}
            <a
              href={identity.github}
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-fg hover:text-teal"
            >
              View on GitHub <span aria-hidden>→</span>
            </a>
          </p>
          <h1 className="rise-1 h-display mx-auto mt-6 max-w-[16ch] text-[clamp(2.5rem,6vw,4.25rem)]">
            Things I&rsquo;ve made trying to put my mark
          </h1>
          <p className="rise-2 mx-auto mt-6 max-w-[62ch] prose-soft">
            Fourteen projects — live products, an AI workspace running inside a real
            company, apps, tools, and the games I cut my teeth on. Everything here is
            mine: designed, built, and shipped, not forked.
          </p>
          <div className="rise-3 mt-9 flex flex-wrap justify-center gap-3">
            <Link href="/hire" className="btn-solid">
              Start a project
            </Link>
            <a
              href={identity.github}
              target="_blank"
              rel="noreferrer"
              className="btn-ghost"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                <path d="M12 .5a12 12 0 0 0-3.79 23.4c.6.1.82-.26.82-.58v-2.2c-3.34.72-4.04-1.6-4.04-1.6-.55-1.4-1.34-1.77-1.34-1.77-1.1-.75.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.84 2.81 1.31 3.5 1 .1-.78.42-1.31.76-1.61-2.67-.3-5.47-1.34-5.47-5.96 0-1.32.47-2.4 1.24-3.24-.12-.3-.54-1.52.12-3.18 0 0 1-.32 3.3 1.24a11.4 11.4 0 0 1 6 0c2.3-1.56 3.3-1.24 3.3-1.24.66 1.66.24 2.88.12 3.18.77.84 1.24 1.92 1.24 3.24 0 4.63-2.8 5.65-5.48 5.95.43.37.81 1.1.81 2.22v3.29c0 .32.22.69.83.57A12 12 0 0 0 12 .5Z" />
              </svg>
              GitHub
            </a>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------- the cards */}
      {GROUPS.map((g) => {
        const cards = projectCards.filter((c) => c.tier === g.key);
        if (cards.length === 0) return null;
        return (
          <section
            key={g.key}
            aria-labelledby={`g-${g.key}`}
            className="mx-auto w-full max-w-[1180px] px-6 pb-4 pt-12 md:px-10 md:pt-16"
          >
            <div className="flex items-baseline justify-between border-b border-line pb-3">
              <h2 id={`g-${g.key}`} className="mono uppercase tracking-[0.16em] text-fg-soft">
                {g.title}
              </h2>
              <p className="mono text-[0.6875rem] text-fg-faint">{g.note}</p>
            </div>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {cards.map((c) => (
                <Card key={c.id} card={c} />
              ))}
            </div>
          </section>
        );
      })}

      {/* ------------------------------------------------------- the award */}
      <section className="mx-auto w-full max-w-[1180px] px-6 pt-24 md:px-10 md:pt-32">
        <h2 className="mono border-b border-line pb-3 uppercase tracking-[0.16em] text-fg-soft">
          The award, in full
        </h2>
        <div className="mt-8 grid gap-10 md:grid-cols-2 md:gap-14">
          <div>
            <p className="mono text-violet">Congressional App Challenge — NJ-07, 2025</p>
            <blockquote className="mt-5 border-l border-line-strong pl-5">
              <p className="max-w-[46ch] prose-soft">
                Selected for &ldquo;{award.citationSelectedFor},&rdquo; noting &ldquo;
                {award.citationNoting}.&rdquo;
              </p>
              <cite className="mono mt-4 block not-italic text-fg-faint">
                —{' '}
                <a
                  href={award.citationUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-teal"
                >
                  {award.citationAttribution} ↗
                </a>
              </cite>
            </blockquote>
            <p className="mono mt-7 text-fg-soft">{award.scaleLine}</p>
            <p className="mono mt-2 text-fg-soft">{award.capitolLine}</p>
          </div>
          <VideoFacade videoId={award.videoId} poster={poster} title="ChronoIQ demo video" />
        </div>
      </section>

      {/* -------------------------------------------------------- Atlas */}
      <section className="mx-auto w-full max-w-[1180px] px-6 pt-24 md:px-10 md:pt-32">
        <div className="flex items-baseline justify-between border-b border-line pb-3">
          <h2 className="mono uppercase tracking-[0.16em] text-fg-soft">
            AI in production — {atlas.name}
          </h2>
          <p className="mono text-[0.6875rem] text-fg-faint">{atlas.context}</p>
        </div>
        <div className="mt-8 grid gap-10 md:grid-cols-[5fr_7fr] md:gap-14">
          <div>
            <p className="prose-soft">{atlas.line}</p>
            <p className="mono mt-6 text-[0.75rem] text-fg-faint">{atlas.note}</p>
            <ul className="mt-6 space-y-2">
              {[
                'Ask questions about a bill in plain English',
                'Audit charges and check rates against your records',
                'Reconcile lines, compare months, allocate chargebacks',
                'Fix and edit spreadsheets by describing the change',
              ].map((f) => (
                <li key={f} className="flex gap-2 text-[0.9375rem] prose-soft">
                  <span aria-hidden className="text-teal">
                    ▸
                  </span>
                  {f}
                </li>
              ))}
            </ul>
          </div>
          {atlasDark.exists && atlasDark.width && atlasDark.height && (
            <Reveal>
              <figure className="overflow-hidden rounded-2xl border border-line bg-bg">
                <Image
                  src={atlasDark.url}
                  alt="Atlas Space in dark theme: an AI assistant beside tools for checking bills, auditing, reconciling lines, and fixing spreadsheets"
                  width={atlasDark.width}
                  height={atlasDark.height}
                  sizes="(min-width: 768px) 56vw, 100vw"
                  className="block h-auto w-full"
                />
              </figure>
            </Reveal>
          )}
        </div>
      </section>

      {/* ------------------------------------------------------- Helios */}
      <section className="mx-auto w-full max-w-[1180px] px-6 py-24 md:px-10 md:py-32">
        <div className="flex items-baseline justify-between border-b border-line pb-3">
          <h2 className="mono uppercase tracking-[0.16em] text-fg-soft">
            {helios.name} — {helios.context}
          </h2>
          <p className="mono text-[0.6875rem] text-fg-faint">mission log</p>
        </div>
        <div className="mt-8 grid gap-10 md:grid-cols-[5fr_7fr] md:gap-14">
          <div>
            {heliosLogo.exists && heliosLogo.width && heliosLogo.height && (
              <Image
                src={heliosLogo.url}
                alt="Team Helios logo: a dark red rocket with the team name lettered inside its body"
                width={heliosLogo.width}
                height={heliosLogo.height}
                sizes="150px"
                className="h-auto w-[130px] md:w-[150px]"
              />
            )}
            <p className="mt-6 max-w-[44ch] prose-soft">{helios.line}</p>
            <div className="mono mt-6 flex flex-wrap gap-x-6 gap-y-2">
              {helios.receipts.map((r) => (
                <a
                  key={r.url}
                  href={r.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[0.75rem] text-teal"
                >
                  {r.label} ↗
                </a>
              ))}
            </div>
          </div>
          {heliosPlot.exists && heliosPlot.width && heliosPlot.height && (
            <Reveal>
              <p className="mono mb-2 text-[0.6875rem] uppercase tracking-[0.12em] text-fg-faint">
                {helios.plotCaption}
              </p>
              <figure className="overflow-hidden rounded-2xl border border-line bg-white">
                <Image
                  src={heliosPlot.url}
                  alt="Velocity-over-time plot from the team's mission data: X, Y, and Z velocity components across the mission timeline"
                  width={heliosPlot.width}
                  height={heliosPlot.height}
                  sizes="(min-width: 768px) 56vw, 100vw"
                  className="block h-auto w-full"
                />
              </figure>
            </Reveal>
          )}
        </div>
      </section>
    </main>
  );
}
