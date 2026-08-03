import type { Metadata } from 'next';
import Image from 'next/image';
import ProjectCard from '@/components/ProjectCard';
import Reveal from '@/components/Reveal';
import VideoFacade from '@/components/VideoFacade';
import { projectCards } from '@/content/cards';
import { atlas, award, helios } from '@/content/site';
import { asset } from '@/lib/assets';

export const metadata: Metadata = {
  title: 'Work',
  description:
    'Everything Zander Leon has built — shipped products, AI systems, apps, and games, with live links and source.',
};

const GROUPS = [
  {
    key: 'flagship' as const,
    title: 'Flagship',
    note: 'the ones I would show first',
    cols: 'lg:grid-cols-3',
    size: 'lg' as const,
  },
  {
    key: 'product' as const,
    title: 'Products',
    note: 'shipped or in preview',
    cols: 'sm:grid-cols-2 lg:grid-cols-3',
    size: 'md' as const,
  },
  {
    key: 'lab' as const,
    title: 'Lab',
    note: 'tools and experiments',
    cols: 'sm:grid-cols-2 lg:grid-cols-3',
    size: 'sm' as const,
  },
  {
    key: 'game' as const,
    title: 'Games',
    note: 'original engines, original pixel art',
    cols: 'sm:grid-cols-2 lg:grid-cols-5',
    size: 'sm' as const,
  },
];

export default function WorkPage() {
  const poster = asset('chronoiq/video-poster.jpg');
  const heliosLogo = asset('helios/logo.png');
  const heliosPlot = asset('helios/velocity-plot.png');
  const atlasDark = asset('atlas/atlas-dark.png');

  return (
    <main id="main" className="flex-1 pt-[128px] md:pt-[168px]">
      <div className="mx-auto w-full max-w-[1200px] px-6 md:px-10">
        <p className="eyebrow">Work</p>
        <h1 className="display mt-4 max-w-[18ch] text-[clamp(2.25rem,5.4vw,4rem)]">
          Fourteen things I built, and what each one taught me.
        </h1>
        <p className="mt-6 max-w-[62ch] leading-relaxed text-fg-soft">
          Live products, an AI workspace running inside a real company, apps, tools,
          and the games I cut my teeth on. Everything here is mine — designed, built,
          and shipped, not forked.
        </p>
      </div>

      {GROUPS.map((g) => {
        const cards = projectCards.filter((c) => c.tier === g.key);
        if (cards.length === 0) return null;
        return (
          <section
            key={g.key}
            aria-labelledby={`g-${g.key}`}
            className="mx-auto w-full max-w-[1200px] px-6 pt-16 md:px-10 md:pt-24"
          >
            <div className="flex items-baseline justify-between border-b border-line pb-3">
              <h2 id={`g-${g.key}`} className="eyebrow">
                {g.title}
              </h2>
              <p className="mono text-[0.6875rem] text-fg-faint">{g.note}</p>
            </div>
            <div className={`mt-8 grid gap-6 ${g.cols}`}>
              {cards.map((c) => (
                <ProjectCard key={c.id} card={c} size={g.size} />
              ))}
            </div>
          </section>
        );
      })}

      {/* ------------------------------------------------- the award, in detail */}
      <section
        aria-labelledby="award-h"
        className="mx-auto w-full max-w-[1200px] px-6 pt-24 md:px-10 md:pt-32"
      >
        <h2 id="award-h" className="eyebrow border-b border-line pb-3">
          The award, in full
        </h2>
        <div className="mt-8 grid gap-10 md:grid-cols-2 md:gap-14">
          <div>
            <p className="eyebrow text-gold">Congressional App Challenge — NJ-07, 2025</p>
            <blockquote className="mt-5 border-l border-line-strong pl-5">
              <p className="max-w-[46ch] leading-relaxed">
                Selected for &ldquo;{award.citationSelectedFor},&rdquo; noting &ldquo;
                {award.citationNoting}.&rdquo;
              </p>
              <cite className="mono mt-4 block not-italic text-fg-soft">
                —{' '}
                <a
                  href={award.citationUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="link-x text-link"
                >
                  {award.citationAttribution} ↗
                </a>
              </cite>
            </blockquote>
            <p className="mono mt-7 text-fg-soft">{award.scaleLine}</p>
            <p className="mono mt-2 text-fg-soft">{award.capitolLine}</p>
          </div>
          <div>
            <VideoFacade
              videoId={award.videoId}
              poster={poster}
              title="ChronoIQ demo video"
            />
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------- Atlas Space */}
      <section
        aria-labelledby="atlas-h"
        className="mx-auto w-full max-w-[1200px] px-6 pt-24 md:px-10 md:pt-32"
      >
        <div className="flex items-baseline justify-between border-b border-line pb-3">
          <h2 id="atlas-h" className="eyebrow">
            AI in production — {atlas.name}
          </h2>
          <p className="mono text-[0.6875rem] text-fg-faint">{atlas.context}</p>
        </div>
        <div className="mt-8 grid gap-10 md:grid-cols-[5fr_7fr] md:gap-14">
          <div>
            <p className="leading-relaxed text-fg-soft">{atlas.line}</p>
            <p className="mono mt-6 text-[0.75rem] text-fg-faint">{atlas.note}</p>
            <ul className="mono mt-6 space-y-2 text-[0.8125rem] text-fg-soft">
              {[
                'Ask questions about a bill in plain English',
                'Audit charges and check rates against your records',
                'Reconcile lines, compare months, allocate chargebacks',
                'Fix and edit spreadsheets by describing the change',
              ].map((f) => (
                <li key={f} className="flex gap-2">
                  <span aria-hidden className="text-link">
                    ▸
                  </span>
                  {f}
                </li>
              ))}
            </ul>
          </div>
          {atlasDark.exists && atlasDark.width && atlasDark.height && (
            <Reveal>
              <figure className="overflow-hidden rounded-2xl border border-line bg-ground">
                <Image
                  src={atlasDark.url}
                  alt="Atlas Space in dark theme: an AI assistant panel beside tools for checking bills, auditing, reconciling lines, and fixing spreadsheets"
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

      {/* -------------------------------------------------------- Team Helios */}
      <section
        aria-labelledby="helios-h"
        className="mx-auto w-full max-w-[1200px] px-6 py-24 md:px-10 md:py-32"
      >
        <div className="flex items-baseline justify-between border-b border-line pb-3">
          <h2 id="helios-h" className="eyebrow">
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
                sizes="160px"
                className="h-auto w-[140px] md:w-[160px]"
              />
            )}
            <p className="mt-6 max-w-[44ch] leading-relaxed text-fg-soft">{helios.line}</p>
            <div className="mono mt-6 flex flex-wrap gap-x-6 gap-y-2">
              {helios.receipts.map((r) => (
                <a
                  key={r.url}
                  href={r.url}
                  target="_blank"
                  rel="noreferrer"
                  className="link-x text-[0.75rem] text-link"
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
              <figure className="overflow-hidden rounded-2xl border border-line bg-paper">
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
