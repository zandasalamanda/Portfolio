import Image from 'next/image';
import { aboutFacts, aboutParagraph } from '@/content/site';
import { asset } from '@/lib/assets';

/** §6.4 — a tight paragraph + a mono fact list. Headshot optional; B&W if present. */
export default function About() {
  const headshot = asset('headshot.jpg');

  return (
    <section id="about" aria-label="About" className="relative scroll-mt-14">
      <div className="mx-auto w-full max-w-[1200px] px-6 pb-20 md:px-10 md:pb-32">
        <div className="tz border-t border-[var(--zone-hairline)] pt-14 md:pt-20">
          <h2 className="eyebrow tz">About</h2>
          <div className="mt-8 grid gap-12 md:grid-cols-[7fr_5fr] md:gap-16">
            <div>
              <p className="max-w-[58ch] text-[clamp(1.125rem,1.05rem+0.45vw,1.3125rem)] leading-relaxed">
                {aboutParagraph}
              </p>
              {headshot.exists && headshot.width && headshot.height && (
                <figure className="evidence-lift mt-10 max-w-[320px] overflow-hidden rounded-[6px] bg-void">
                  <Image
                    src={headshot.url}
                    alt="Zander Leon"
                    width={headshot.width}
                    height={headshot.height}
                    sizes="320px"
                    className="block h-auto w-full grayscale"
                  />
                </figure>
              )}
            </div>
            <ul className="tz self-start border-t border-[var(--zone-hairline)]">
              {aboutFacts.map((fact) => (
                <li
                  key={fact}
                  className="mono tz border-b border-[var(--zone-hairline)] py-2.5 leading-relaxed text-[var(--zone-fg-soft)]"
                >
                  {fact}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
