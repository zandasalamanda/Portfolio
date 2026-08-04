import Image from 'next/image';
import Link from 'next/link';
import HeroField from '@/components/HeroField';
import { ProjectMark } from '@/components/Marks';
import PhotoStrip from '@/components/PhotoStrip';
import SocialRow from '@/components/SocialRow';
import { featuredCards } from '@/content/cards';
import { clientJobs } from '@/content/clients';
import { steps } from '@/content/process';
import { contact } from '@/content/site';
import { asset } from '@/lib/assets';

export default function Home() {
  const headshot = asset('avatar.png');

  return (
    <main id="main" className="flex-1">
      {/* --------------------------------------------------------- hero */}
      <section className="corner-glow relative overflow-hidden pt-[136px] md:pt-[168px]">
        <HeroField />
        <div className="relative mx-auto w-full max-w-[var(--shell)] px-6 md:px-8">
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

            <h1 className="rise-1 h-display text-[clamp(1.5rem,2.9vw,2rem)]">
              I build websites, apps, and AI that ship.
            </h1>

            <div className="rise-2 mt-6 space-y-3.5 text-[1rem] prose-soft">
              <p>
                I&rsquo;m Zander. Landing pages, full products, and AI tools for small
                businesses, nonprofits, and founders — built by one person, start to
                finish. Companies already run my work: an AI workspace at UTR Global,
                a market terminal for a financial group, a nonprofit&rsquo;s site. My
                own ChronoIQ won the Congressional App Challenge across 4,600+ apps.
              </p>
              <p>
                If you need something built properly — or fixed properly — tell me
                what is going wrong. I reply within a day.
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
      <section className="mx-auto w-full max-w-[var(--shell)] px-6 pt-20 md:px-8 md:pt-24">
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
                <Link href={`/projects#${c.id}`} className="link-accent mt-3">
                  View project <span aria-hidden>›</span>
                </Link>
              </article>
            ))}
            <Link href="/projects" className="link-accent">
              All 8 projects <span aria-hidden>›</span>
            </Link>

            <div className="mt-14 border-t border-line pt-8">
              <h2 className="mono uppercase tracking-[0.16em] text-fg-soft">
                Built for clients
              </h2>
              <ul className="mt-4">
                {clientJobs.map((j) => (
                  <li key={j.id}>
                    <Link
                      href="/hire#work"
                      className="-mx-2 flex flex-wrap items-baseline gap-x-3 gap-y-0.5 rounded-lg px-2 py-2.5 transition-colors duration-200 hover:bg-white/[0.04]"
                    >
                      <span className="text-[0.9375rem] font-semibold">{j.client}</span>
                      <span className="text-[0.8125rem] text-fg-soft">{j.kind}</span>
                      <span
                        className="mono ml-auto flex items-center gap-1.5 whitespace-nowrap text-[0.6875rem]"
                        style={{ color: j.accent }}
                      >
                        <span
                          aria-hidden
                          className="h-1.5 w-1.5 rounded-full"
                          style={{ background: j.accent }}
                        />
                        {j.status}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
              <Link href="/hire#work" className="link-accent mt-3">
                The client work <span aria-hidden>›</span>
              </Link>
            </div>
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
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
              <ol className="mt-4 space-y-3 border-t border-line pt-4">
                {steps.map((s) => (
                  <li key={s.n} className="flex gap-3">
                    <span aria-hidden className="mono text-[0.625rem] text-accent">
                      {s.n}
                    </span>
                    <div className="min-w-0">
                      <p className="text-[0.8125rem] font-semibold leading-snug">{s.title}</p>
                      <p className="mono text-[0.625rem] text-fg-faint">{s.when}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <Link href="/hire#contact" className="btn-solid mt-5 w-full justify-center">
                Tell me what you need
              </Link>
              <a
                href={contact.mailto}
                className="mt-3 block text-center text-[0.8125rem] text-fg-soft underline underline-offset-4 hover:text-fg"
              >
                or email {contact.email}
              </a>
            </div>
          </aside>
        </div>
      </section>

      <div className="pb-24 md:pb-28" />
    </main>
  );
}
