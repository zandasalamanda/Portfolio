import type { Metadata } from 'next';
import Image from 'next/image';
import { aboutFacts, contact, identity, timeline } from '@/content/site';
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
  const headshot = asset('headshot.jpg');
  const resume = asset('resume-web.pdf');

  return (
    <main id="main" className="flex-1 pt-[128px] md:pt-[152px]">
      <div className="mx-auto w-full max-w-[1180px] px-6 md:px-10">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_400px] lg:gap-20">
          {/* --------------------------------------------------------- copy */}
          <div className="max-w-[46rem]">
            <h1 className="rise-1 h-display text-[clamp(2.25rem,5vw,3.25rem)]">
              About me
            </h1>

            <div className="rise-2 mt-8 space-y-5 text-[1.0625rem] prose-soft">
              <p>
                Hey — I&rsquo;m Zander Leon, a developer who would rather build the
                thing than talk about building the thing.
              </p>
              <p>
                It started with a problem I actually had. Homework kept sliding to 11
                p.m., so I built ChronoIQ — an AI study scheduler that reads your
                calendar and books work into the free time you really have. It won the
                Congressional App Challenge for New Jersey&rsquo;s 7th district,
                selected from over 4,600 apps, and was displayed at the U.S. Capitol.
              </p>
              <p>
                Since then I&rsquo;ve shipped Solaspace, an AI goal-execution app;
                Bandr, a rule-engine app that helps teens find safe ways to earn;
                Everdeck, a business-opportunity deck in private preview; and Ya Sabo,
                a Spanish comprehension app for heritage speakers. Fourteen projects
                in total, all original work — zero forks.
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
              <p>
                If you need a site, an app, or AI that actually does the work — I take
                on projects, and I reply within a day.
              </p>
            </div>

            <ul className="rise-3 mt-10 flex flex-wrap gap-2">
              {aboutFacts.map((f) => (
                <li
                  key={f}
                  className="mono rounded-full border border-line px-3 py-1 text-[0.6875rem] text-fg-soft"
                >
                  {f}
                </li>
              ))}
            </ul>
          </div>

          {/* ------------------------------------------------------ sidebar */}
          <aside className="lg:pt-4">
            {headshot.exists && headshot.width && headshot.height && (
              <figure className="rise-1 overflow-hidden rounded-2xl border border-line bg-surface [transform:rotate(2.5deg)]">
                <Image
                  src={headshot.url}
                  alt="Zander Leon"
                  width={headshot.width}
                  height={headshot.height}
                  sizes="(min-width: 1024px) 380px, 100vw"
                  priority
                  className="block h-auto w-full"
                />
              </figure>
            )}

            <ul className="rise-2 mt-12 border-t border-line">
              {FOLLOW.map((f) => (
                <li key={f.href} className="border-b border-line">
                  <a
                    href={f.href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 py-4 text-[0.9375rem] font-semibold transition-colors duration-200 hover:text-teal"
                  >
                    {f.label}
                  </a>
                </li>
              ))}
              <li className="border-b border-line">
                <a
                  href={contact.mailto}
                  className="flex items-center gap-3 py-4 text-[0.9375rem] font-semibold transition-colors duration-200 hover:text-teal"
                >
                  {contact.email}
                </a>
              </li>
              {resume.exists && (
                <li className="border-b border-line">
                  <a
                    href="/assets/resume-web.pdf"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 py-4 text-[0.9375rem] font-semibold transition-colors duration-200 hover:text-teal"
                  >
                    Download résumé ↓
                  </a>
                </li>
              )}
            </ul>
          </aside>
        </div>

        {/* --------------------------------------------------------- record */}
        <section aria-labelledby="record-h" className="pt-24 md:pt-32">
          <h2
            id="record-h"
            className="mono border-b border-line pb-3 uppercase tracking-[0.16em] text-fg-soft"
          >
            The record
          </h2>
          <ol className="mt-6 max-w-[52rem]">
            {timeline.map((t) => (
              <li
                key={t.stamp + t.text}
                className="flex items-baseline gap-5 border-b border-line py-4"
              >
                <span className="mono w-[76px] shrink-0 text-[0.6875rem] text-violet">
                  {t.stamp}
                </span>
                <span className="text-[0.9375rem] prose-soft">{t.text}</span>
              </li>
            ))}
          </ol>
        </section>
      </div>

      <div className="pb-28 md:pb-36" />
    </main>
  );
}
