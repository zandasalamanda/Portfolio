import Image from 'next/image';
import spectrum from '@/content/spectrum.json';
import { award, productById } from '@/content/site';
import { asset } from '@/lib/assets';
import { AwaitingLogo, Frame } from './Evidence';
import Reveal from './Reveal';
import { DecisionsAndStack, ReceiptsRow } from './CaseBlocks';
import VideoFacade from './VideoFacade';

const chronoiq = productById('chronoiq');

/** A screenshot dressed as a scheduled entry: mono label on a ruled top edge. */
function PlannerEntry({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="mono tz mb-2 flex items-center gap-2 text-[0.6875rem] uppercase tracking-[0.12em] text-[var(--zone-fg-soft)]">
        {label}
        <span aria-hidden className="tz h-px flex-1 bg-[var(--zone-hairline)]" />
      </p>
      {children}
    </div>
  );
}

export default function CaseChronoIQ() {
  const logo = asset('chronoiq/logo.png');
  const poster = asset('chronoiq/video-poster.jpg');
  const awardPhoto = asset('chronoiq/award-photo.jpg');
  const calendar = asset('chronoiq/shot-calendar.png');
  const mobile = asset('chronoiq/shot-mobile.png');

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
            build order — earliest first
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

        {/* Evidence field — the shots are laid out like blocks on a schedule:
            the dashboard runs the width of the day, the rest sit staggered
            beneath it, each with a spectrum edge like a booked calendar entry. */}
        <div className="mt-16">
          <Reveal className="md:mr-[calc(50%-50vw+24px)]">
            <PlannerEntry label="Dashboard — today's plan">
              <Frame
                rel="chronoiq/shot-dashboard.png"
                domain="chronoiq.dev"
                alt="ChronoIQ dashboard: today's plan with three scheduled study blocks on a timeline, a triage queue of assignments, and progress stats"
                sizes="(min-width: 768px) 88vw, 100vw"
                aspect="1728 / 1080"
                edge={spectrum.coral}
              />
            </PlannerEntry>
          </Reveal>

          <div className="mt-10 flex flex-col gap-10 md:mt-14 md:flex-row md:items-start md:gap-6">
            <Reveal className="md:w-[42%]">
              <PlannerEntry label="Focus mode — Study Coach">
                <Frame
                  rel="chronoiq/shot-focus.png"
                  domain="chronoiq.dev"
                  alt="ChronoIQ focus mode: a Pomodoro timer running on an essay assignment with the Study Coach panel open"
                  sizes="(min-width: 768px) 40vw, 100vw"
                  aspect="1728 / 1080"
                  edge={spectrum.pink}
                />
              </PlannerEntry>
            </Reveal>

            {calendar.exists && (
              <Reveal className="md:mt-12 md:w-[38%]">
                <PlannerEntry label="Calendar — real free time">
                  <Frame
                    rel="chronoiq/shot-calendar.png"
                    domain="chronoiq.dev"
                    alt="ChronoIQ calendar view: study blocks booked around existing commitments across the week"
                    sizes="(min-width: 768px) 36vw, 100vw"
                    aspect="1728 / 1080"
                    edge={spectrum.violet}
                  />
                </PlannerEntry>
              </Reveal>
            )}

            {mobile.exists && (
              <Reveal className="md:mt-24 md:w-[20%]">
                <PlannerEntry label="On a phone">
                  <Frame
                    rel="chronoiq/shot-mobile.png"
                    domain="chronoiq.dev"
                    alt="ChronoIQ on a phone: the day's study blocks in a single scrolling column"
                    sizes="(min-width: 768px) 18vw, 60vw"
                    aspect="390 / 844"
                  />
                </PlannerEntry>
              </Reveal>
            )}
          </div>
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

        <DecisionsAndStack note={chronoiq.decisionsNote} techLine={chronoiq.techLine} />

        <ReceiptsRow receipts={chronoiq.receipts} />
      </div>
    </section>
  );
}
