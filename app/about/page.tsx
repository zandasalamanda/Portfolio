import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { aboutFacts, aboutParagraph, contact, experience, identity, timeline } from '@/content/site';
import { asset } from '@/lib/assets';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Zander Leon — student developer, Congressional App Challenge winner, and the person who builds every project on this site.',
};

export default function AboutPage() {
  const headshot = asset('headshot.jpg');
  const knight = asset('artifacts/king-knight.png');
  const resume = asset('resume-web.pdf');

  return (
    <main id="main" className="flex-1 pt-[128px] md:pt-[168px]">
      <div className="mx-auto w-full max-w-[1200px] px-6 md:px-10">
        <p className="eyebrow">About</p>
        <div className="mt-4 grid gap-12 md:grid-cols-[7fr_5fr] md:gap-16">
          <div>
            <h1 className="display max-w-[16ch] text-[clamp(2.25rem,5.4vw,4rem)]">
              I build the thing instead of complaining about it.
            </h1>
            <p className="mt-7 max-w-[56ch] text-[1.0625rem] leading-relaxed text-fg-soft">
              {aboutParagraph}
            </p>
            <ul className="mt-8 flex flex-wrap gap-2">
              {aboutFacts.map((f) => (
                <li
                  key={f}
                  className="mono rounded-full border border-line px-3 py-1 text-[0.6875rem] text-fg-soft"
                >
                  {f}
                </li>
              ))}
            </ul>
            <div className="mono mt-8 flex flex-wrap gap-x-6 gap-y-2">
              <a href={contact.mailto} className="link-x text-link">
                {contact.email}
              </a>
              <a
                href={identity.github}
                target="_blank"
                rel="noreferrer"
                className="link-x text-link"
              >
                github ↗
              </a>
              <a
                href={contact.linkedin}
                target="_blank"
                rel="noreferrer"
                className="link-x text-link"
              >
                linkedin ↗
              </a>
              {resume.exists && (
                <a
                  href="/assets/resume-web.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="link-x text-link"
                >
                  résumé (pdf) ↗
                </a>
              )}
            </div>
          </div>

          {headshot.exists && headshot.width && headshot.height && (
            <figure className="overflow-hidden rounded-2xl border border-line bg-surface md:mt-2">
              <Image
                src={headshot.url}
                alt="Zander Leon"
                width={headshot.width}
                height={headshot.height}
                sizes="(min-width: 768px) 34vw, 100vw"
                priority
                className="block h-auto w-full grayscale"
              />
            </figure>
          )}
        </div>
      </div>

      {/* ------------------------------------------------------------- record */}
      <section
        aria-labelledby="record-h"
        className="mx-auto w-full max-w-[1200px] px-6 pt-24 md:px-10 md:pt-32"
      >
        <div className="grid gap-12 md:grid-cols-[6fr_6fr] md:gap-16">
          <div>
            <h2 id="record-h" className="eyebrow border-b border-line pb-3">
              The record
            </h2>
            <ol className="mt-6">
              {timeline.map((t) => (
                <li
                  key={t.stamp + t.text}
                  className="flex items-baseline gap-4 border-b border-line py-3"
                >
                  <span className="mono w-[74px] shrink-0 text-[0.6875rem] text-link">
                    {t.stamp}
                  </span>
                  <span className="text-[0.9375rem] leading-relaxed text-fg-soft">
                    {t.text}
                  </span>
                </li>
              ))}
            </ol>
            {knight.exists && (
              <div aria-hidden className="flex justify-end pt-4">
                <Image
                  src={knight.url}
                  alt=""
                  width={150}
                  height={150}
                  unoptimized
                  className="pixel h-10 w-10"
                />
              </div>
            )}
          </div>

          <div>
            <h2 className="eyebrow border-b border-line pb-3">Experience</h2>
            <ul className="mt-6">
              {experience.map((e) => (
                <li key={e.org} className="border-b border-line py-5 last:border-b-0">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="font-display text-lg font-black">{e.org}</h3>
                    <span className="mono text-[0.6875rem] text-fg-faint">{e.period}</span>
                  </div>
                  <p className="mono mt-1 text-[0.75rem] text-fg-soft">{e.role}</p>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-fg-soft">
                    {e.line}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1200px] px-6 py-24 md:px-10 md:py-32">
        <div className="rounded-3xl border border-line bg-surface p-8 md:p-14">
          <h2 className="display max-w-[20ch] text-[clamp(1.75rem,3.4vw,2.75rem)]">
            Want something built?
          </h2>
          <p className="mt-5 max-w-[52ch] leading-relaxed text-fg-soft">
            I take on websites, apps, and AI work — scoped and quoted within a day.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/hire" className="cta">
              What I offer
            </Link>
            <a href={contact.mailto} className="cta-ghost">
              {contact.email}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
