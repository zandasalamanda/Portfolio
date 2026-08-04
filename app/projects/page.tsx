import type { Metadata } from 'next';
import Link from 'next/link';
import ProjectCard from '@/components/ProjectCard';
import Starfield from '@/components/Starfield';
import { projectCards } from '@/content/cards';
import { award, identity } from '@/content/site';

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Every project Zander Leon has built — shipped products, AI systems, apps, and tools, with live links and source.',
};

export default function ProjectsPage() {
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
          <h1 className="rise-1 h-display mx-auto mt-4 max-w-[17ch] text-[clamp(1.625rem,3.2vw,2.125rem)]">
            Things I&rsquo;ve made trying to make my mark
          </h1>
          <p className="rise-2 mx-auto mt-4 max-w-[56ch] text-[0.9375rem] prose-soft">
            Eight projects — live products, an AI workspace running inside a real
            company, and a NASA challenge entry built with my team. Designed,
            built, and shipped — not forked.
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
        className="mx-auto w-full max-w-[var(--shell)] px-6 md:px-8"
      >
        <h2 id="gallery-h" className="sr-only">
          All projects
        </h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {projectCards.map((c, i) => (
            <ProjectCard key={c.id} card={c} priority={i === 0} />
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------ the award */}
      <section
        aria-labelledby="award-h"
        className="mx-auto w-full max-w-[var(--shell)] px-6 py-20 md:px-8 md:py-28"
      >
        <h2
          id="award-h"
          className="mono flex items-center gap-2 border-b border-line pb-3 uppercase tracking-[0.14em] text-fg-soft"
        >
          <span aria-hidden className="text-accent">
            ★
          </span>
          The award, in full
        </h2>
        <div className="mt-7 grid gap-8 md:grid-cols-2 md:gap-12">
          <blockquote className="border-l border-line-strong pl-4">
            <p className="max-w-[46ch] text-[1rem] prose-soft">
              Selected for &ldquo;{award.citationSelectedFor},&rdquo; noting &ldquo;
              {award.citationNoting}.&rdquo;
            </p>
            <cite className="mono mt-3 block not-italic text-[0.75rem] text-fg-faint">
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
          <div>
            <p className="mono text-fg-soft">{award.scaleLine}</p>
            <p className="mono mt-2 text-fg-soft">{award.capitolLine}</p>
            <a
              href={award.citationUrl}
              target="_blank"
              rel="noreferrer"
              className="link-accent mt-5"
            >
              Read the coverage <span aria-hidden>›</span>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
