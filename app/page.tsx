import Image from 'next/image';
import Link from 'next/link';
import ActivityGraph from '@/components/ActivityGraph';
import HeroField from '@/components/HeroField';
import { ProjectMark } from '@/components/Marks';
import PhotoStrip from '@/components/PhotoStrip';
import SocialRow from '@/components/SocialRow';
import activity from '@/content/github-activity.json';
import { featuredCards } from '@/content/cards';
import { contact, experience } from '@/content/site';
import { asset } from '@/lib/assets';

export default function Home() {
  const headshot = asset('avatar.png');
  const resume = asset('resume-web.pdf');
  const topRepos =
    (activity as { topRepos?: { name: string; commits: number }[] }).topRepos ?? [];

  return (
    <main id="main" className="flex-1">
      {/* --------------------------------------------------------- hero */}
      <section className="corner-glow relative overflow-hidden pt-[104px] md:pt-[124px]">
        <HeroField />
        <div className="relative mx-auto w-full max-w-[1120px] px-6 md:px-8">
          <div className="max-w-[40rem]">
            {headshot.exists && headshot.width && headshot.height && (
              <Image
                src={headshot.url}
                alt=""
                width={headshot.width}
                height={headshot.height}
                sizes="52px"
                priority
                className="rise-1 mb-6 h-14 w-14 rounded-full border border-line bg-white/[0.04] object-cover grayscale"
              />
            )}

            <h1 className="rise-1 h-display text-[clamp(1.75rem,3.6vw,2.5rem)]">
              Web designer, software developer, and freelancer.
            </h1>

            <div className="rise-2 mt-6 space-y-3.5 text-[0.9375rem] prose-soft">
              <p>
                Here&rsquo;s what I&rsquo;ve been up to lately. I&rsquo;m always
                building something — a new product, a client&rsquo;s site, or an AI
                system that has to hold up under real work.
              </p>
              <p>
                I&rsquo;m Zander. I&rsquo;ve shipped four products to real users, won
                the Congressional App Challenge across 4,600+ apps, and put AI into a
                company&rsquo;s daily operations at my internship.
              </p>
              <p>
                If you need something built properly — or fixed properly — I&rsquo;d
                like to hear about it. I reply within a day.
              </p>
            </div>

            <SocialRow className="rise-3 mt-7" />

            <div className="rise-3 mt-7 flex flex-wrap gap-2.5">
              <Link href="/hire" className="btn-solid">
                Start a project
              </Link>
              <Link href="/projects" className="btn-ghost">
                See my work
              </Link>
            </div>
          </div>
        </div>

        <div className="rise-4 mt-12 md:mt-16">
          <PhotoStrip />
        </div>
      </section>

      {/* ------------------------------------------- feed + sidebar */}
      <section className="mx-auto w-full max-w-[1120px] px-6 pt-20 md:px-8 md:pt-24">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-14">
          <div>
            {featuredCards.map((c) => (
              <article key={c.id} className="border-l border-line pb-10 pl-5 last:pb-0">
                <div className="flex items-center gap-2.5">
                  <ProjectMark
                    logo={c.logo}
                    drawn={c.drawn}
                    accent={c.accent}
                    name={c.name}
                    tile={c.logoTile}
                  />
                  <h2 className="h-display text-[1.125rem]">{c.name}</h2>
                  <span className="mono ml-auto text-[0.625rem] text-fg-faint">
                    {c.status}
                  </span>
                </div>
                <p className="mt-3 max-w-[52ch] text-[0.875rem] prose-soft">{c.line}</p>
                <Link href="/projects" className="link-accent mt-3">
                  View project <span aria-hidden>›</span>
                </Link>
              </article>
            ))}
            <Link href="/projects" className="link-accent">
              All 8 projects <span aria-hidden>›</span>
            </Link>
          </div>

          <aside className="space-y-5">
            <div className="card p-5">
              <div className="flex items-center gap-2">
                <svg viewBox="0 0 24 24" className="h-4 w-4 text-accent" fill="currentColor">
                  <path d="M1.5 4.5h21v15h-21v-15Zm1.8 1.8v.6l8.7 5.44 8.7-5.44v-.6H3.3Zm17.4 3.06-7.7 4.82a1.5 1.5 0 0 1-1.6 0L3.7 9.36v8.34h16.6V9.36Z" />
                </svg>
                <h2 className="text-[0.9375rem] font-semibold">Work with me</h2>
              </div>
              <p className="mt-2.5 text-[0.875rem] prose-soft">
                Websites, full-stack apps, and AI integration. Fixed scope, fixed
                price, quoted within 24 hours.
              </p>
              <a href={contact.mailto} className="btn-solid mt-4 w-full justify-center">
                Email me
              </a>
            </div>

            <div className="card p-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <svg viewBox="0 0 24 24" className="h-4 w-4 text-accent" fill="currentColor">
                    <path d="M9 3h6a2 2 0 0 1 2 2v1h4v13H3V6h4V5a2 2 0 0 1 2-2Zm0 3h6V5H9v1Z" />
                  </svg>
                  <h2 className="text-[0.9375rem] font-semibold">Work</h2>
                </div>
                <Link
                  href="/hire"
                  className="mono text-[0.625rem] uppercase tracking-[0.14em] text-fg-soft underline underline-offset-4 hover:text-accent"
                >
                  Hire me
                </Link>
              </div>

              <ul className="mt-4 space-y-3.5">
                {experience.map((e) => {
                  const logo = e.logo ? asset(e.logo) : null;
                  return (
                    <li key={e.org} className="flex items-start gap-2.5">
                      {logo?.exists ? (
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-white p-1">
                          <Image
                            src={logo.url}
                            alt=""
                            width={32}
                            height={32}
                            className="h-full w-full object-contain"
                          />
                        </span>
                      ) : (
                        <span className="mono flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-line text-[0.5625rem] text-fg-soft">
                          {e.org.slice(0, 2).toUpperCase()}
                        </span>
                      )}
                      <div className="min-w-0 flex-1">
                        <p className="text-[0.875rem] font-semibold leading-snug">
                          {e.org}
                        </p>
                        <div className="flex flex-wrap items-baseline justify-between gap-x-2">
                          <p className="text-[0.75rem] text-fg-soft">{e.role}</p>
                          <p className="mono text-[0.625rem] text-fg-faint">{e.period}</p>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>

              {resume.exists && (
                <a
                  href="/assets/resume-web.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="btn-ghost mt-5 w-full justify-center"
                >
                  Download résumé <span aria-hidden>↓</span>
                </a>
              )}
            </div>

            <div className="card p-5">
              <div className="flex items-center gap-2">
                <svg viewBox="0 0 24 24" className="h-4 w-4 text-accent" fill="currentColor">
                  <path d="M3 3h18v18H3V3Zm2 2v14h14V5H5Zm2 9h2v3H7v-3Zm4-5h2v8h-2V9Zm4-3h2v11h-2V6Z" />
                </svg>
                <h2 className="text-[0.9375rem] font-semibold">Still building</h2>
              </div>
              <div className="mt-3.5">
                <ActivityGraph compact />
              </div>
              <ul className="mt-4 space-y-1.5">
                {topRepos.slice(0, 3).map((r) => (
                  <li key={r.name} className="flex items-baseline justify-between gap-3">
                    <a
                      href={`https://github.com/zandasalamanda/${r.name}`}
                      target="_blank"
                      rel="noreferrer"
                      className="mono text-[0.6875rem] text-accent"
                    >
                      {r.name}
                    </a>
                    <span className="mono text-[0.625rem] text-fg-faint">
                      {r.commits} commits
                    </span>
                  </li>
                ))}
              </ul>
              <Link href="/activity" className="link-accent mt-4">
                Full activity <span aria-hidden>›</span>
              </Link>
            </div>
          </aside>
        </div>
      </section>

      <div className="pb-24 md:pb-28" />
    </main>
  );
}
