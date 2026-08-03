import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Underlined } from '@/components/Annotate';
import { DrawnMark } from '@/components/Marks';
import { aboutFacts, contact, experience, identity, timeline } from '@/content/site';
import { asset } from '@/lib/assets';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Zander Leon — student developer, Congressional App Challenge winner, and the person who builds every project on this site.',
};

const FOLLOW = [
  { label: 'Follow on GitHub', href: identity.github },
  { label: 'Follow on LinkedIn', href: contact.linkedin },
];

export default function AboutPage() {
  const headshot = asset('headshot.png');
  const resume = asset('resume-web.pdf');

  return (
    <main id="main" className="flex-1 pt-[104px] md:pt-[124px]">
      <div className="mx-auto w-full max-w-[1120px] px-6 md:px-8">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-16">
          <div className="max-w-[40rem]">
            <h1 className="rise-1 h-display text-[clamp(1.75rem,3.6vw,2.5rem)]">
              About me
            </h1>

            <div className="rise-2 mt-6 space-y-4 text-[0.9375rem] prose-soft">
              <p>
                Hey there <span className="wave">👋</span> I&rsquo;m Zander Leon — a
                developer who would rather <Underlined>build the thing</Underlined>{' '}
                than talk about building the thing.
              </p>
              <p>
                It started with a problem I actually had. Homework kept sliding to 11
                p.m., so I built ChronoIQ — an AI study scheduler that reads your
                calendar and books work into the free time you really have. It won the{' '}
                <Underlined>Congressional App Challenge</Underlined> for New
                Jersey&rsquo;s 7th district, selected from over 4,600 apps, and was
                displayed at the U.S. Capitol.
              </p>
              <p>
                Since then I&rsquo;ve shipped Solaspace, an AI goal-execution app;
                Bandr, a rule-engine app that helps teens find safe ways to earn;
                Everdeck, a business-opportunity deck in private preview; and Ya Sabo,
                a Spanish comprehension app for heritage speakers. Seven projects in total,
                all original work — zero forks.
              </p>
              <p>
                At my internship I do the unglamorous half too: rebuilding bugged
                legacy web systems in classic ASP/VBScript, and building Atlas Space —
                an AI workspace where telecom-expense work happens in plain English.
                That is the part I am proudest of, because it runs inside a real
                company where being wrong costs money.
              </p>
              <p>
                I studied at Morris County School of Technology (class of &rsquo;26) in
                the Academy for Computer &amp; Information Sciences. Away from the
                keyboard: varsity soccer, FIRST Robotics, and ecological fieldwork in
                the Peruvian Amazon.
              </p>
            </div>

            <ul className="rise-3 mt-8 flex flex-wrap gap-2">
              {aboutFacts.map((f) => (
                <li key={f} className="chip">
                  {f}
                </li>
              ))}
            </ul>
          </div>

          <aside className="lg:pt-2">
            {headshot.exists && headshot.width && headshot.height && (
              <div className="rise-1 relative">
                <div
                  aria-hidden
                  className="absolute inset-0 -z-10 rounded-2xl"
                  style={{
                    background:
                      'radial-gradient(circle at 50% 40%, rgba(179,166,255,0.16), transparent 70%)',
                  }}
                />
                <Image
                  src={headshot.url}
                  alt="Zander Leon"
                  width={headshot.width}
                  height={headshot.height}
                  sizes="(min-width: 1024px) 320px, 70vw"
                  priority
                  className="block h-auto w-full max-w-[280px] object-contain grayscale lg:max-w-none"
                />
              </div>
            )}

            <ul className="rise-2 mt-8 border-t border-line">
              {FOLLOW.map((f) => (
                <li key={f.href} className="border-b border-line">
                  <a
                    href={f.href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2.5 py-3 text-[0.875rem] font-semibold transition-colors duration-200 hover:text-accent"
                  >
                    <span aria-hidden className="text-accent">
                      ▸
                    </span>
                    {f.label}
                  </a>
                </li>
              ))}
              <li className="border-b border-line">
                <a
                  href={contact.mailto}
                  className="flex items-center gap-2.5 py-3 text-[0.875rem] font-semibold transition-colors duration-200 hover:text-accent"
                >
                  <span aria-hidden className="text-accent">
                    ▸
                  </span>
                  {contact.email}
                </a>
              </li>
              {resume.exists && (
                <li className="border-b border-line">
                  <a
                    href="/assets/resume-web.pdf"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2.5 py-3 text-[0.875rem] font-semibold transition-colors duration-200 hover:text-accent"
                  >
                    <span aria-hidden className="text-accent">
                      ▸
                    </span>
                    Download résumé
                  </a>
                </li>
              )}
            </ul>
          </aside>
        </div>

        {/* ------------------------------------------------------ record */}
        <section aria-labelledby="record-h" className="pt-20 md:pt-28">
          <div className="grid gap-12 md:grid-cols-2 md:gap-16">
            <div>
              <h2
                id="record-h"
                className="mono border-b border-line pb-3 uppercase tracking-[0.14em] text-fg-soft"
              >
                The record
              </h2>
              <ol className="mt-5">
                {timeline.map((t) => (
                  <li
                    key={t.stamp + t.text}
                    className="group flex items-baseline gap-4 border-b border-line py-3"
                  >
                    <span className="mono w-[70px] shrink-0 text-[0.625rem] text-accent">
                      {t.stamp}
                    </span>
                    <span className="text-[0.875rem] prose-soft transition-colors duration-200 group-hover:text-fg">
                      {t.text}
                    </span>
                  </li>
                ))}
              </ol>
            </div>

            <div>
              <h2 className="mono border-b border-line pb-3 uppercase tracking-[0.14em] text-fg-soft">
                Experience
              </h2>
              <ul className="mt-5 space-y-5">
                {experience.map((e) => {
                  const logo = e.logo ? asset(e.logo) : null;
                  return (
                    <li key={e.org} className="flex items-start gap-3">
                      {logo?.exists ? (
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-white p-1">
                          <Image
                            src={logo.url}
                            alt=""
                            width={36}
                            height={36}
                            className="h-full w-full object-contain"
                          />
                        </span>
                      ) : (
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-line">
                          <DrawnMark id="atlas" accent="#b3a6ff" className="h-4 w-4" />
                        </span>
                      )}
                      <div>
                        <div className="flex flex-wrap items-baseline gap-x-3">
                          <h3 className="text-[0.9375rem] font-semibold">{e.org}</h3>
                          <span className="mono text-[0.625rem] text-fg-faint">
                            {e.period}
                          </span>
                        </div>
                        <p className="mono mt-0.5 text-[0.6875rem] text-fg-soft">
                          {e.role}
                        </p>
                        <p className="mt-2 text-[0.875rem] prose-soft">{e.line}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </section>

        <section className="py-20 md:py-28">
          <div className="card p-7 md:p-10">
            <h2 className="h-display max-w-[20ch] text-[clamp(1.375rem,2.6vw,1.875rem)]">
              Want something built?
            </h2>
            <p className="mt-3.5 max-w-[52ch] text-[0.9375rem] prose-soft">
              I take on websites, apps, and AI work — scoped and quoted within a day.
            </p>
            <div className="mt-6 flex flex-wrap gap-2.5">
              <Link href="/hire" className="btn-solid">
                What I offer
              </Link>
              <a href={contact.mailto} className="btn-ghost">
                {contact.email}
              </a>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
