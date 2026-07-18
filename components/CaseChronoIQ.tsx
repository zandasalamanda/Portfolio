import Image from 'next/image';
import spectrum from '@/content/spectrum.json';
import { award, products } from '@/content/site';
import { asset } from '@/lib/assets';
import { AwaitingLogo, Frame } from './Evidence';
import Reveal from './Reveal';
import VideoFacade from './VideoFacade';

const chronoiq = products[0];

export default function CaseChronoIQ() {
  const logo = asset('chronoiq/logo.png');
  const poster = asset('chronoiq/video-poster.jpg');
  const awardPhoto = asset('chronoiq/award-photo.jpg');

  return (
    <section
      id="case-chronoiq"
      aria-label="Case study 01: ChronoIQ"
      className="relative scroll-mt-14"
    >
      {/* The sampled coral→violet spectrum appears here and in the logo — nowhere else (§3). */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-[2px]"
        style={{
          background: `linear-gradient(90deg, ${spectrum.coral}, ${spectrum.pink}, ${spectrum.violet})`,
        }}
      />
      {/* Takeover device: faint time-grid hairlines ruling the zone like a planner (§5). */}
      <div aria-hidden className="time-grid pointer-events-none absolute inset-0" />

      <div className="relative mx-auto w-full max-w-[1200px] px-6 py-20 md:px-10 md:py-36">
        <div className="tz flex items-baseline justify-between gap-4 border-b border-[var(--zone-hairline)] pb-3">
          <p className="eyebrow tz">
            {chronoiq.number} · {chronoiq.date} · live
          </p>
          <p className="mono tz hidden text-[0.6875rem] text-[var(--zone-fg-soft)] sm:block">
            shipping order — earliest first
          </p>
        </div>

        <div className="mt-10 flex items-center gap-5">
          {logo.exists && logo.width && logo.height ? (
            <Image
              src={logo.url}
              alt="ChronoIQ logo: a neon brain outline with clock hands"
              width={logo.width}
              height={logo.height}
              sizes="72px"
              className="h-14 w-14 rounded-[6px] md:h-[72px] md:w-[72px]"
            />
          ) : (
            <AwaitingLogo rel="chronoiq/logo.png" />
          )}
          <h3 className="display text-[clamp(2.5rem,4.5vw,3.5rem)] text-[var(--zone-fg)] tz">
            ChronoIQ
          </h3>
        </div>

        <p className="mt-6 max-w-[54ch] text-[clamp(1.125rem,1.05rem+0.45vw,1.3125rem)] leading-relaxed">
          {chronoiq.description}
        </p>
        <p className="mono tz mt-3 text-[var(--zone-fg-soft)]">{chronoiq.credit}</p>

        {/* Evidence field — dashboard breaks the grid right; focus mode sits low-left,
            overlapping its bottom edge (§6.2 composition 01). */}
        <div className="relative mt-16 pb-16 md:pb-24">
          <Reveal className="md:ml-[16%] md:mr-[calc(50%-50vw+24px)]">
            <Frame
              rel="chronoiq/shot-dashboard.png"
              domain="chronoiq.dev"
              alt="ChronoIQ dashboard: today's plan with three scheduled study blocks on a timeline, a triage queue of assignments, and progress stats"
              sizes="(min-width: 768px) 78vw, 100vw"
              aspect="1728 / 1080"
            />
          </Reveal>
          <Reveal className="relative z-10 -mt-10 w-[72%] max-w-[400px] md:absolute md:bottom-0 md:left-0 md:mt-0 md:w-[38%]">
            <Frame
              rel="chronoiq/shot-focus.png"
              domain="chronoiq.dev"
              alt="ChronoIQ focus mode: a Pomodoro timer running on an essay assignment with the Study Coach panel open"
              sizes="(min-width: 768px) 34vw, 72vw"
              aspect="1728 / 1080"
            />
          </Reveal>
        </div>

        {/* The award case: citation set like a legal citation, not a testimonial (§6.2). */}
        <div className="mt-14 grid gap-12 md:grid-cols-2 md:gap-16">
          <div>
            <p className="eyebrow tz">Congressional App Challenge — NJ-07, 2025</p>
            <blockquote className="tz mt-5 border-l border-[var(--zone-fg)] pl-5">
              <p className="max-w-[46ch] leading-relaxed">
                Selected for &ldquo;{award.citationSelectedFor},&rdquo; noting &ldquo;
                {award.citationNoting}.&rdquo;
              </p>
              <cite className="mono tz mt-4 block not-italic text-[var(--zone-fg-soft)]">
                —{' '}
                <a
                  href={award.citationUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="link-x tz text-[var(--zone-link)]"
                >
                  {award.citationAttribution}
                </a>
              </cite>
            </blockquote>
            <p className="mono tz mt-8 text-[var(--zone-fg-soft)]">{award.scaleLine}</p>
            <p className="mono tz mt-2 text-[var(--zone-fg-soft)]">{award.capitolLine}</p>
            {awardPhoto.exists && awardPhoto.width && awardPhoto.height && (
              <Reveal className="mt-8 max-w-[420px]">
                <figure className="evidence-lift overflow-hidden rounded-[6px] bg-void">
                  <Image
                    src={awardPhoto.url}
                    alt="Zander Leon at the Congressional App Challenge recognition event"
                    width={awardPhoto.width}
                    height={awardPhoto.height}
                    sizes="420px"
                    className="block h-auto w-full"
                  />
                </figure>
              </Reveal>
            )}
          </div>
          <div className="md:pt-9">
            <VideoFacade
              videoId={award.videoId}
              poster={poster}
              title="ChronoIQ demo video"
            />
          </div>
        </div>

        <div className="mt-16 max-w-[62ch]">
          <p className="eyebrow tz">Decisions</p>
          <p className="mt-4 leading-relaxed">{chronoiq.decisionsNote}</p>
        </div>

        <p className="mono tz mt-10 max-w-[72ch] leading-relaxed text-[var(--zone-fg-soft)]">
          {chronoiq.techLine}
        </p>

        <div className="tz mt-10 flex flex-wrap items-baseline gap-x-6 gap-y-2 border-t border-[var(--zone-hairline)] pt-5">
          <span className="eyebrow tz">Receipts</span>
          {chronoiq.receipts.map((r) => (
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
