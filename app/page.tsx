import Image from 'next/image';
import Link from 'next/link';
import ActivityGraph from '@/components/ActivityGraph';
import HeroField from '@/components/HeroField';
import Marquee from '@/components/Marquee';
import ProjectCard from '@/components/ProjectCard';
import { featuredCards, projectCards } from '@/content/cards';
import verification from '@/content/verification.json';
import { awardPageUrl, contact, experience, identity } from '@/content/site';
import { asset } from '@/lib/assets';

interface VerifyResult {
  host: string;
  status: number | null;
}

function statusFor(host: string): string {
  const results = (verification as { results?: VerifyResult[] }).results ?? [];
  const hit = results.find((r) => r.host === host);
  return hit?.status != null ? String(hit.status) : '—';
}

export default function Home() {
  const verifiedAt = (verification as { verifiedAt: string | null }).verifiedAt;
  const headshot = asset('headshot.jpg');
  const runnersUp = projectCards.filter(
    (c) => c.tier === 'product' || c.tier === 'lab',
  );

  return (
    <main id="main" className="flex-1">
      {/* ---------------------------------------------------------------- hero */}
      <section className="relative overflow-hidden pt-[128px] md:pt-[168px]">
        <HeroField />
        <div className="relative mx-auto w-full max-w-[1200px] px-6 md:px-10">
          {headshot.exists && headshot.width && headshot.height && (
            <Image
              src={headshot.url}
              alt=""
              width={headshot.width}
              height={headshot.height}
              sizes="64px"
              priority
              className="hero-stage-2 mb-7 h-16 w-16 rounded-full object-cover grayscale ring-1 ring-line-strong"
            />
          )}

          <div className="hero-mask">
            <h1 className="display max-w-[19ch] text-[clamp(2.5rem,6.2vw,4.75rem)]">
              I design and build software that ships — and AI that does real work.
            </h1>
          </div>

          <p className="hero-stage-2 mt-7 max-w-[62ch] text-[1.0625rem] leading-relaxed text-fg-soft md:text-[1.1875rem]">
            I&rsquo;m Zander — an 18-year-old developer who has put four products in
            front of real users, won the Congressional App Challenge, and shipped AI
            into a company&rsquo;s daily operations. I take on websites, full-stack
            apps, and AI features that have to work on the first try.
          </p>

          <div className="hero-stage-3 mt-8 flex flex-wrap items-center gap-3">
            <Link href="/hire" className="cta">
              Start a project
            </Link>
            <Link href="/work" className="cta-ghost">
              See the work
            </Link>
            <a href={contact.mailto} className="cta-ghost">
              Email me
            </a>
          </div>

          <ul className="hero-stage-4 mono mt-9 flex flex-wrap gap-x-6 gap-y-2 text-[0.8125rem] text-fg-soft">
            <li>
              <a
                href={awardPageUrl}
                target="_blank"
                rel="noreferrer"
                className="link-x text-link"
              >
                Congressional App Challenge winner &rsquo;25 ↗
              </a>
            </li>
            <li>4 products live or in preview</li>
            <li>
              <a
                href={identity.github}
                target="_blank"
                rel="noreferrer"
                className="link-x text-link"
              >
                github/zandasalamanda ↗
              </a>
            </li>
          </ul>
        </div>

        <div className="hero-stage-4 mt-14 md:mt-20">
          <Marquee />
        </div>

        <p className="mono mx-auto mt-4 w-full max-w-[1200px] px-6 text-[0.6875rem] text-fg-faint md:px-10">
          Every frame is a real screen from something I built. Links verified at build{' '}
          {verifiedAt ?? 'pending'} — chronoiq.dev {statusFor('chronoiq.dev')} ·
          solaspace.app {statusFor('solaspace.app')} · everdeck.app{' '}
          {statusFor('everdeck.app')}.
        </p>
      </section>

      {/* ------------------------------------------------------------ services */}
      <section aria-labelledby="services-h" className="mx-auto w-full max-w-[1200px] px-6 pt-24 md:px-10 md:pt-32">
        <div className="flex items-baseline justify-between border-b border-line pb-3">
          <h2 id="services-h" className="eyebrow">
            What I do
          </h2>
          <Link href="/hire" className="mono link-x text-[0.75rem] text-link">
            services + how I work ↗
          </Link>
        </div>
        <div className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-3">
          {[
            {
              t: 'Websites that sell',
              d: 'Fast, sharp, mobile-first sites for businesses that are losing work to a bad one. Design and build, launched and measured.',
            },
            {
              t: 'Full-stack apps',
              d: 'Accounts, payments, dashboards, real data. The same stack behind my own products — shipped, not prototyped.',
            },
            {
              t: 'AI that does the job',
              d: 'Assistants and automations wired into the tools you already use, with sane fallbacks so nothing breaks when the model is down.',
            },
          ].map((s) => (
            <div key={s.t} className="bg-surface p-7">
              <h3 className="font-display text-lg font-black">{s.t}</h3>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-fg-soft">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------------ featured */}
      <section aria-labelledby="featured-h" className="mx-auto w-full max-w-[1200px] px-6 pt-24 md:px-10 md:pt-32">
        <div className="flex items-baseline justify-between border-b border-line pb-3">
          <h2 id="featured-h" className="eyebrow">
            Selected work
          </h2>
          <Link href="/work" className="mono link-x text-[0.75rem] text-link">
            all {projectCards.length} projects ↗
          </Link>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {featuredCards.map((c) => (
            <ProjectCard key={c.id} card={c} size="lg" />
          ))}
        </div>

        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {runnersUp.slice(0, 3).map((c) => (
            <ProjectCard key={c.id} card={c} size="sm" />
          ))}
        </div>
      </section>

      {/* ---------------------------------------------------------- experience */}
      <section aria-labelledby="exp-h" className="mx-auto w-full max-w-[1200px] px-6 pt-24 md:px-10 md:pt-32">
        <div className="grid gap-12 md:grid-cols-[5fr_7fr] md:gap-16">
          <div>
            <h2 id="exp-h" className="eyebrow border-b border-line pb-3">
              Where I&rsquo;ve worked
            </h2>
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

          <div>
            <h2 className="eyebrow border-b border-line pb-3">Still building</h2>
            <div className="mt-6 rounded-2xl border border-line bg-surface p-6">
              <ActivityGraph compact />
              <Link href="/activity" className="mono link-x mt-5 inline-block text-[0.75rem] text-link">
                full activity ↗
              </Link>
            </div>
            <p className="mt-6 text-[0.9375rem] leading-relaxed text-fg-soft">
              Original work — zero forks. Everything on this site is something I
              designed, built, and shipped myself.
            </p>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- CTA */}
      <section className="mx-auto w-full max-w-[1200px] px-6 py-24 md:px-10 md:py-32">
        <div className="rounded-3xl border border-line bg-surface p-8 md:p-14">
          <h2 className="display max-w-[20ch] text-[clamp(1.75rem,3.4vw,2.75rem)]">
            Got something that needs to work properly?
          </h2>
          <p className="mt-5 max-w-[54ch] leading-relaxed text-fg-soft">
            Tell me what&rsquo;s broken or what you want built. I&rsquo;ll tell you
            straight whether I&rsquo;m the right person, what it takes, and what it
            costs — usually within a day.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={contact.mailto} className="cta">
              {contact.email}
            </a>
            <Link href="/hire" className="cta-ghost">
              What I offer
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
