import Image from 'next/image';
import { helios } from '@/content/site';
import { asset } from '@/lib/assets';
import { AwaitingAsset } from './Evidence';
import Reveal from './Reveal';

/**
 * Team Helios — NASA App Development Challenge. Real artifacts: the team's
 * rocket mark, the mission velocity plot, and (soon) the team photo.
 */
export default function TeamHelios() {
  const logo = asset('helios/logo.png');
  const plot = asset('helios/velocity-plot.png');
  const photo = asset('helios/team-photo.jpg');

  return (
    <section aria-label="Team Helios — NASA App Development Challenge" className="relative">
      <div className="mx-auto w-full max-w-[1200px] px-6 pb-20 md:px-10 md:pb-28">
        <div className="tz flex items-baseline justify-between border-t border-[var(--zone-hairline)] pt-14 md:pt-20">
          <h2 className="eyebrow tz">Team Helios — NASA App Development Challenge</h2>
          <p className="mono tz hidden text-[0.6875rem] text-[var(--zone-fg-soft)] sm:block">
            mission log
          </p>
        </div>

        <div className="mt-10 grid gap-10 md:grid-cols-[5fr_7fr] md:gap-14">
          <div>
            {logo.exists && logo.width && logo.height && (
              <Image
                src={logo.url}
                alt="Team Helios logo: a dark red rocket with the team name lettered inside its body, flame trailing behind"
                width={logo.width}
                height={logo.height}
                sizes="180px"
                className="h-auto w-[150px] md:w-[180px]"
              />
            )}
            <p className="mt-6 max-w-[44ch] leading-relaxed">{helios.line}</p>
            <div className="tz mt-8 flex flex-wrap items-baseline gap-x-6 gap-y-2 border-t border-[var(--zone-hairline)] pt-4">
              <span className="eyebrow tz">Receipts</span>
              {helios.receipts.map((r) => (
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

          <div className="flex flex-col gap-8 sm:flex-row sm:items-start">
            <Reveal className="sm:w-[62%]">
              <p className="mono tz mb-2 flex items-center gap-2 text-[0.6875rem] uppercase tracking-[0.12em] text-[var(--zone-fg-soft)]">
                {helios.plotCaption}
                <span aria-hidden className="tz h-px flex-1 bg-[var(--zone-hairline)]" />
              </p>
              {plot.exists && plot.width && plot.height ? (
                <figure className="evidence-lift tz overflow-hidden rounded-[6px] bg-[var(--frame-bg)] shadow-[0_0_0_1px_var(--frame-ring)]">
                  <Image
                    src={plot.url}
                    alt="Velocity-over-time plot from the team's mission data: X, Y, and Z velocity components in kilometers per second across the mission timeline"
                    width={plot.width}
                    height={plot.height}
                    sizes="(min-width: 768px) 36vw, 100vw"
                    className="block h-auto w-full"
                  />
                </figure>
              ) : (
                <AwaitingAsset rel="helios/velocity-plot.png" aspect="4 / 3" />
              )}
            </Reveal>
            <Reveal className="sm:mt-10 sm:w-[38%]">
              <p className="mono tz mb-2 flex items-center gap-2 text-[0.6875rem] uppercase tracking-[0.12em] text-[var(--zone-fg-soft)]">
                The team
                <span aria-hidden className="tz h-px flex-1 bg-[var(--zone-hairline)]" />
              </p>
              {photo.exists && photo.width && photo.height ? (
                <figure className="evidence-lift tz overflow-hidden rounded-[6px] bg-[var(--frame-bg)] shadow-[0_0_0_1px_var(--frame-ring)]">
                  <Image
                    src={photo.url}
                    alt="Team Helios"
                    width={photo.width}
                    height={photo.height}
                    sizes="(min-width: 768px) 22vw, 100vw"
                    className="block h-auto w-full"
                  />
                </figure>
              ) : (
                <AwaitingAsset rel="helios/team-photo.jpg" aspect="4 / 3" />
              )}
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
