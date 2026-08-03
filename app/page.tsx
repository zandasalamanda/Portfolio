import Image from 'next/image';
import Link from 'next/link';
import ActivityGraph from '@/components/ActivityGraph';
import PhotoStrip from '@/components/PhotoStrip';
import SocialRow from '@/components/SocialRow';
import activity from '@/content/github-activity.json';
import { featuredCards } from '@/content/cards';
import { contact, experience, identity } from '@/content/site';
import { asset } from '@/lib/assets';

export default function Home() {
  const headshot = asset('headshot.jpg');
  const resume = asset('resume-web.pdf');
  const topRepos =
    (activity as { topRepos?: { name: string; commits: number }[] }).topRepos ?? [];

  return (
    <main id="main" className="flex-1">
      {/* ------------------------------------------------------------- hero */}
      <section className="corner-glow relative overflow-hidden pt-[128px] md:pt-[152px]">
        <div className="mx-auto w-full max-w-[1180px] px-6 md:px-10">
          <div className="max-w-[46rem]">
            {headshot.exists && headshot.width && headshot.height && (
              <Image
                src={headshot.url}
                alt=""
                width={headshot.width}
                height={headshot.height}
                sizes="64px"
                priority
                className="rise-1 mb-8 h-16 w-16 rounded-full border border-line object-cover"
              />
            )}

            <h1 className="rise-1 h-display text-[clamp(2.25rem,5.4vw,3.5rem)]">
              Software Developer, Freelancer, and Congressional App Challenge Winner.
            </h1>

            <div className="rise-2 mt-8 space-y-5 text-[1.0625rem] prose-soft">
              <p>
                Here&rsquo;s what I&rsquo;ve been up to lately. I&rsquo;m always
                building something — a new product, a client&rsquo;s site, or an AI
                system that has to hold up under real work.
              </p>
              <p>
                I&rsquo;m Zander. I&rsquo;ve shipped four products to real users, won
                the Congressional App Challenge across 4,600+ apps, and put AI into a
                company&rsquo;s daily operations at my internship. I build websites,
                full-stack apps, and AI features that work on the first try.
              </p>
              <p>
                If you need something built properly — or fixed properly — I&rsquo;d
                like to hear about it. I reply within a day.
              </p>
            </div>

            <SocialRow className="rise-3 mt-9" />

            <div className="rise-3 mt-9 flex flex-wrap gap-3">
              <Link href="/hire" className="btn-solid">
                Start a project
              </Link>
              <Link href="/projects" className="btn-ghost">
                See my work
              </Link>
            </div>
          </div>
        </div>

        <div className="rise-4 mt-16 md:mt-20">
          <PhotoStrip />
        </div>
      </section>

      {/* ------------------------------------------- work feed + sidebar */}
      <section className="mx-auto w-full max-w-[1180px] px-6 pt-24 md:px-10 md:pt-32">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_400px] lg:gap-16">
          {/* left: selected work, template's article-list rhythm */}
          <div>
            {featuredCards.map((c) => (
              <article key={c.id} className="border-l border-line pl-6 pb-14 last:pb-0">
                <p className="mono mb-3 text-fg-faint">{c.status}</p>
                <h2 className="h-display text-[1.375rem]">{c.name}</h2>
                <p className="mt-3 max-w-[52ch] prose-soft text-[0.9375rem]">{c.line}</p>
                <Link href="/projects" className="link-teal mt-4">
                  View project <span aria-hidden>›</span>
                </Link>
              </article>
            ))}
            <Link href="/projects" className="link-teal">
              All 14 projects <span aria-hidden>›</span>
            </Link>
          </div>

          {/* right: sidebar cards */}
          <aside className="space-y-6">
            <div className="card p-6">
              <div className="flex items-center gap-2.5">
                <svg viewBox="0 0 24 24" className="h-5 w-5 text-fg-soft" fill="currentColor">
                  <path d="M1.5 4.5h21v15h-21v-15Zm1.8 1.8v.6l8.7 5.44 8.7-5.44v-.6H3.3Zm17.4 3.06-7.7 4.82a1.5 1.5 0 0 1-1.6 0L3.7 9.36v8.34h16.6V9.36Z" />
                </svg>
                <h2 className="font-semibold">Work with me</h2>
              </div>
              <p className="mt-3 text-[0.9375rem] prose-soft">
                Websites, full-stack apps, and AI integration. Fixed scope, fixed
                price, quoted within 24 hours.
              </p>
              <a href={contact.mailto} className="btn-solid mt-5 w-full justify-center">
                Email me
              </a>
            </div>

            <div className="card p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <svg viewBox="0 0 24 24" className="h-5 w-5 text-fg-soft" fill="currentColor">
                    <path d="M9 3h6a2 2 0 0 1 2 2v1h4v13H3V6h4V5a2 2 0 0 1 2-2Zm0 3h6V5H9v1Z" />
                  </svg>
                  <h2 className="font-semibold">Work</h2>
                </div>
                <Link
                  href="/hire"
                  className="mono text-[0.6875rem] uppercase tracking-[0.14em] text-fg-soft underline underline-offset-4 hover:text-fg"
                >
                  Hire me
                </Link>
              </div>

              <ul className="mt-5 space-y-4">
                {experience.map((e) => (
                  <li key={e.org} className="flex items-start gap-3">
                    <span
                      aria-hidden
                      className="mono mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-line text-[0.625rem] text-fg-soft"
                    >
                      {e.org.slice(0, 2).toUpperCase()}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-[0.9375rem] font-semibold">{e.org}</p>
                      <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                        <p className="text-[0.8125rem] text-fg-soft">{e.role}</p>
                        <p className="mono text-[0.6875rem] text-fg-faint">{e.period}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              {resume.exists && (
                <a
                  href="/assets/resume-web.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="btn-ghost mt-6 w-full justify-center"
                >
                  Download Résumé <span aria-hidden>↓</span>
                </a>
              )}
            </div>

            <div className="card p-6">
              <div className="flex items-center gap-2.5">
                <svg viewBox="0 0 24 24" className="h-5 w-5 text-fg-soft" fill="currentColor">
                  <path d="M3 3h18v18H3V3Zm2 2v14h14V5H5Zm2 9h2v3H7v-3Zm4-5h2v8h-2V9Zm4-3h2v11h-2V6Z" />
                </svg>
                <h2 className="font-semibold">Still building</h2>
              </div>
              <div className="mt-4">
                <ActivityGraph compact />
              </div>
              <ul className="mt-5 space-y-2">
                {topRepos.slice(0, 3).map((r) => (
                  <li key={r.name} className="flex items-baseline justify-between gap-3">
                    <a
                      href={`https://github.com/${identity.githubHandle.split('/')[1]}/${r.name}`}
                      target="_blank"
                      rel="noreferrer"
                      className="mono text-[0.75rem] text-teal"
                    >
                      {r.name}
                    </a>
                    <span className="mono text-[0.6875rem] text-fg-faint">
                      {r.commits} commits
                    </span>
                  </li>
                ))}
              </ul>
              <Link href="/activity" className="link-teal mt-5 text-[0.875rem]">
                Full activity <span aria-hidden>›</span>
              </Link>
            </div>
          </aside>
        </div>
      </section>

      <div className="pb-28 md:pb-36" />
    </main>
  );
}
