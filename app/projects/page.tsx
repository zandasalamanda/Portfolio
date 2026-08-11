import type { Metadata } from 'next';
import Link from 'next/link';
import ProjectCard from '@/components/ProjectCard';
import Starfield from '@/components/Starfield';
import { projectCards } from '@/content/cards';
import { award, identity } from '@/content/site';

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Every project Zander Leon has built — live products, AI systems, apps, and tools, with working links and source code.',
};

export default function ProjectsPage() {
  return (
    <main id="main" className="flex-1">
      {/* ------------------------------------------------- starfield hero */}
      <section className="relative overflow-hidden pb-16 pt-[150px] md:pb-24 md:pt-[190px]">
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
          <h1 className="rise-1 h-display mx-auto mt-4 max-w-[17ch] text-[clamp(1.75rem,3.4vw,2.375rem)]">
            Things I&rsquo;ve built trying to make my mark
          </h1>
          <p className="rise-2 mx-auto mt-4 max-w-[56ch] text-[0.9375rem] prose-soft">
            Nine projects — live products, an AI workspace running inside a real
            company, and two built with a team: a NASA challenge entry and a
            brain-computer interface with my school&rsquo;s biotech academy.
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
        className="mx-auto w-full max-w-[1200px] px-6 md:px-8"
      >
        <h2 id="gallery-h" className="sr-only">
          All projects
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 md:gap-7">
          {projectCards.map((c, i) => (
            <ProjectCard key={c.id} card={c} priority={i < 2} />
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
        <div className="mt-8 grid items-start gap-10 md:grid-cols-[130px_minmax(0,1fr)] md:gap-12">
          {/* the medal — drawn like the rest of the site's marks */}
          <svg
            aria-hidden
            viewBox="0 0 120 150"
            className="mx-auto h-[130px] w-[112px] text-accent md:mx-0"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path className="sk" pathLength={1} d="M60 10a38 38 0 1 1-.01 0Z" />
            <path
              className="sk"
              pathLength={1}
              d="M60 27l7.6 15.4 17 2.5-12.3 12 2.9 16.9L60 65.8l-15.2 8 2.9-16.9-12.3-12 17-2.5L60 27Z"
            />
            <path className="sk" pathLength={1} d="M42 82L30 140l16-9 8 12 8-26" />
            <path className="sk" pathLength={1} d="M78 82l12 58-16-9-8 12" />
          </svg>

          <div className="min-w-0">
            {/* the scale of it, in numbers */}
            <dl className="grid grid-cols-3 gap-4 border-b border-line pb-6">
              {award.scaleLine
                .replace(/^selected from\s*/i, '')
                .split('·')
                .map((seg) => {
                  const m = seg.trim().match(/([\d,]+\+?)\s*(.*)/);
                  return (
                    <div key={seg}>
                      <dd className="h-display text-[clamp(1.375rem,2.6vw,1.875rem)] text-fg">
                        {m ? m[1] : seg.trim()}
                      </dd>
                      <dt className="mono mt-1 text-[0.6875rem] uppercase tracking-[0.12em] text-fg-soft">
                        {m ? m[2] : ''}
                      </dt>
                    </div>
                  );
                })}
            </dl>

            <blockquote className="mt-6 border-l-2 border-accent pl-4">
              <p className="max-w-[52ch] text-[1rem] prose-soft">
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

            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2">
              <p className="mono text-fg-soft">{award.capitolLine}</p>
              <Link href="/projects#chronoiq" className="link-accent">
                The app that won it <span aria-hidden>›</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
