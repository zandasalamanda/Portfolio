import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { DrawnMark } from '@/components/Marks';
import ProjectCard from '@/components/ProjectCard';
import Reveal from '@/components/Reveal';
import Starfield from '@/components/Starfield';
import VideoFacade from '@/components/VideoFacade';
import { projectCards } from '@/content/cards';
import { atlas, award, helios, identity } from '@/content/site';
import { asset } from '@/lib/assets';

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Every project Zander Leon has built — shipped products, AI systems, apps, and tools, with live links and source.',
};

export default function ProjectsPage() {
  const poster = asset('chronoiq/video-poster.jpg');
  const heliosLogo = asset('helios/logo.png');
  const heliosPlot = asset('helios/velocity-plot.png');
  const nasa = asset('logos/nasa.png');
  const atlasDark = asset('atlas/atlas-dark.png');

  return (
    <main id="main" className="flex-1">
      {/* ------------------------------------------------- starfield hero */}
      <section className="relative overflow-hidden pb-14 pt-[118px] md:pb-20 md:pt-[150px]">
        <Starfield />
        <div className="relative mx-auto w-full max-w-[760px] px-6 text-center">
          <p className="rise-1 mono text-fg-faint">
            My projects portfolio{' '}
            <a
              href={identity.github}
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-fg hover:text-accent"
            >
              View on GitHub <span aria-hidden>→</span>
            </a>
          </p>
          <h1 className="rise-1 h-display mx-auto mt-4 max-w-[17ch] text-[clamp(1.875rem,4vw,2.75rem)]">
            Things I&rsquo;ve made trying to put my mark
          </h1>
          <p className="rise-2 mx-auto mt-4 max-w-[56ch] text-[0.9375rem] prose-soft">
            Seven projects — live products, an AI workspace running inside a real
            company, and the tools I build to scratch my own itches. All of it
            mine: designed, built, and shipped, not forked.
          </p>
          <div className="rise-3 mt-7 flex flex-wrap justify-center gap-2.5">
            <Link href="/hire" className="btn-solid">
              Start a project
            </Link>
            <a href={identity.github} target="_blank" rel="noreferrer" className="btn-ghost">
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
                <path d="M12 .5a12 12 0 0 0-3.79 23.4c.6.1.82-.26.82-.58v-2.2c-3.34.72-4.04-1.6-4.04-1.6-.55-1.4-1.34-1.77-1.34-1.77-1.1-.75.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.84 2.81 1.31 3.5 1 .1-.78.42-1.31.76-1.61-2.67-.3-5.47-1.34-5.47-5.96 0-1.32.47-2.4 1.24-3.24-.12-.3-.54-1.52.12-3.18 0 0 1-.32 3.3 1.24a11.4 11.4 0 0 1 6 0c2.3-1.56 3.3-1.24 3.3-1.24.66 1.66.24 2.88.12 3.18.77.84 1.24 1.92 1.24 3.24 0 4.63-2.8 5.65-5.48 5.95.43.37.81 1.1.81 2.22v3.29c0 .32.22.69.83.57A12 12 0 0 0 12 .5Z" />
              </svg>
              GitHub
            </a>
          </div>
        </div>
      </section>

      {/* ------------------------------------------ one continuous gallery */}
      <section
        aria-labelledby="gallery-h"
        className="mx-auto w-full max-w-[1120px] px-6 md:px-8"
      >
        <h2 id="gallery-h" className="sr-only">
          All projects
        </h2>
        <div className="grid items-start gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {projectCards.map((c, i) => (
            <ProjectCard key={c.id} card={c} priority={i === 0} />
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------ the award */}
      <section className="mx-auto w-full max-w-[1120px] px-6 pt-20 md:px-8 md:pt-28">
        <h2 className="mono flex items-center gap-2 border-b border-line pb-3 uppercase tracking-[0.14em] text-fg-soft">
          <span aria-hidden className="text-accent">
            ★
          </span>
          The award, in full
        </h2>
        <div className="mt-7 grid gap-8 md:grid-cols-2 md:gap-12">
          <div>
            <p className="mono text-accent">Congressional App Challenge — NJ-07, 2025</p>
            <blockquote className="mt-4 border-l border-line-strong pl-4">
              <p className="max-w-[46ch] text-[0.9375rem] prose-soft">
                Selected for &ldquo;{award.citationSelectedFor},&rdquo; noting &ldquo;
                {award.citationNoting}.&rdquo;
              </p>
              <cite className="mono mt-3 block not-italic text-fg-faint">
                —{' '}
                <a
                  href={award.citationUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-accent"
                >
                  {award.citationAttribution} ↗
                </a>
              </cite>
            </blockquote>
            <p className="mono mt-6 text-fg-soft">{award.scaleLine}</p>
            <p className="mono mt-1.5 text-fg-soft">{award.capitolLine}</p>
          </div>
          <VideoFacade videoId={award.videoId} poster={poster} title="ChronoIQ demo video" />
        </div>
      </section>

      {/* ----------------------------------------------------- Atlas Space */}
      <section className="mx-auto w-full max-w-[1120px] px-6 pt-20 md:px-8 md:pt-28">
        <div className="flex items-baseline justify-between border-b border-line pb-3">
          <h2 className="mono flex items-center gap-2 uppercase tracking-[0.14em] text-fg-soft">
            <DrawnMark id="atlas" accent="#8fa6e8" className="h-4 w-4" />
            AI in production — {atlas.name}
          </h2>
          <p className="mono text-[0.625rem] text-fg-faint">{atlas.context}</p>
        </div>
        <div className="mt-7 grid gap-8 md:grid-cols-[5fr_7fr] md:gap-12">
          <div>
            <p className="text-[0.9375rem] prose-soft">{atlas.line}</p>
            <p className="mono mt-5 text-[0.6875rem] text-fg-faint">{atlas.note}</p>
            <ul className="mt-5 space-y-1.5">
              {[
                'Ask about a bill in plain English',
                'Audit charges and check rates',
                'Reconcile lines, compare months, allocate chargebacks',
                'Fix spreadsheets by describing the change',
              ].map((f) => (
                <li key={f} className="flex gap-2 text-[0.875rem] prose-soft">
                  <span aria-hidden className="text-accent">
                    ▸
                  </span>
                  {f}
                </li>
              ))}
            </ul>
          </div>
          {atlasDark.exists && atlasDark.width && atlasDark.height && (
            <Reveal>
              <figure className="overflow-hidden rounded-xl border border-line bg-bg">
                <Image
                  src={atlasDark.url}
                  alt="Atlas Space in dark theme: an AI assistant beside tools for checking bills, auditing, and fixing spreadsheets"
                  width={atlasDark.width}
                  height={atlasDark.height}
                  sizes="(min-width: 768px) 54vw, 100vw"
                  className="block h-auto w-full"
                />
              </figure>
            </Reveal>
          )}
        </div>
      </section>

      {/* -------------------------------------------------------- Helios */}
      <section className="mx-auto w-full max-w-[1120px] px-6 py-20 md:px-8 md:py-28">
        <div className="flex items-baseline justify-between border-b border-line pb-3">
          <h2 className="mono flex items-center gap-2 uppercase tracking-[0.14em] text-fg-soft">
            {nasa.exists && (
              <Image
                src={nasa.url}
                alt=""
                width={16}
                height={16}
                className="h-4 w-4 object-contain"
              />
            )}
            {helios.name} — {helios.context}
          </h2>
          <p className="mono text-[0.625rem] text-fg-faint">mission log</p>
        </div>
        <div className="mt-7 grid gap-8 md:grid-cols-[5fr_7fr] md:gap-12">
          <div>
            {heliosLogo.exists && heliosLogo.width && heliosLogo.height && (
              <Image
                src={heliosLogo.url}
                alt="Team Helios logo: a dark red rocket with the team name lettered inside its body"
                width={heliosLogo.width}
                height={heliosLogo.height}
                sizes="120px"
                className="h-auto w-[110px] md:w-[120px]"
              />
            )}
            <p className="mt-5 max-w-[44ch] text-[0.9375rem] prose-soft">{helios.line}</p>
            <div className="mono mt-5 flex flex-wrap gap-x-5 gap-y-2">
              {helios.receipts.map((r) => (
                <a
                  key={r.url}
                  href={r.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[0.6875rem] text-accent"
                >
                  {r.label} ↗
                </a>
              ))}
            </div>
          </div>
          {heliosPlot.exists && heliosPlot.width && heliosPlot.height && (
            <Reveal>
              <p className="mono mb-2 text-[0.625rem] uppercase tracking-[0.12em] text-fg-faint">
                {helios.plotCaption}
              </p>
              <figure className="overflow-hidden rounded-xl border border-line bg-white">
                <Image
                  src={heliosPlot.url}
                  alt="Velocity-over-time plot from the team's mission data: X, Y, and Z components across the mission timeline"
                  width={heliosPlot.width}
                  height={heliosPlot.height}
                  sizes="(min-width: 768px) 54vw, 100vw"
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
