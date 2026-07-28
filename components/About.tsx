import Image from 'next/image';
import { aboutFacts, aboutParagraph, timeline } from '@/content/site';
import { asset } from '@/lib/assets';

/**
 * About — the human (§6.4, expanded per the client): approved paragraph +
 * portrait, a dated timeline of verifiable events, and undated fact chips.
 * The pixel knight at the timeline's end is from his own SkillsUSA game.
 */
export default function About() {
  const headshot = asset('headshot.jpg');
  const knight = asset('artifacts/king-knight.png');

  return (
    <section id="about" aria-label="About" className="relative scroll-mt-14">
      <div className="mx-auto w-full max-w-[1200px] px-6 pb-20 pt-16 md:px-10 md:pb-28 md:pt-24">
        <div className="tz flex items-baseline justify-between border-b border-[var(--zone-hairline)] pb-3">
          <h2 className="eyebrow tz">About</h2>
          <p className="mono tz text-[0.6875rem] text-[var(--zone-fg-soft)]">
            the human behind the receipts
          </p>
        </div>

        <div className="mt-10 grid gap-12 md:grid-cols-[6fr_6fr] md:gap-16">
          {/* Left: portrait + paragraph + chips */}
          <div>
            <div className="flex flex-col gap-8 sm:flex-row sm:items-start">
              {headshot.exists && headshot.width && headshot.height && (
                <figure className="evidence-lift w-[180px] shrink-0 overflow-hidden rounded-[6px] ring-1 ring-[var(--zone-hairline)] md:w-[210px]">
                  <Image
                    src={headshot.url}
                    alt="Zander Leon"
                    width={headshot.width}
                    height={headshot.height}
                    sizes="210px"
                    className="block h-auto w-full grayscale"
                  />
                </figure>
              )}
              <p className="max-w-[46ch] text-[clamp(1.0625rem,1rem+0.4vw,1.25rem)] leading-relaxed">
                {aboutParagraph}
              </p>
            </div>

            <ul className="mt-10 flex flex-wrap gap-x-2.5 gap-y-2.5">
              {aboutFacts.map((fact) => (
                <li
                  key={fact}
                  className="mono tz border border-[var(--zone-hairline)] px-2.5 py-1 text-[0.6875rem] text-[var(--zone-fg-soft)]"
                >
                  {fact}
                </li>
              ))}
            </ul>
          </div>

          {/* Right: the dated record */}
          <div>
            <h3 className="eyebrow tz">The record</h3>
            <ol className="mt-5">
              {timeline.map((t) => (
                <li
                  key={t.stamp + t.text}
                  className="tz flex items-baseline gap-4 border-b border-[var(--zone-hairline)] py-3 first:border-t"
                >
                  <span className="mono tz w-[74px] shrink-0 text-[0.6875rem] text-[var(--zone-mono)]">
                    {t.stamp}
                  </span>
                  <span className="text-[0.9375rem] leading-relaxed">{t.text}</span>
                </li>
              ))}
              {knight.exists && (
                <li aria-hidden className="flex justify-end pt-3">
                  {/* A knight from his own SkillsUSA RPG stands guard at the
                      end of the record. */}
                  <Image
                    src={knight.url}
                    alt=""
                    width={150}
                    height={150}
                    unoptimized
                    className="pixel h-10 w-10"
                  />
                </li>
              )}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
