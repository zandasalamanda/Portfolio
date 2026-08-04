import type { Metadata } from 'next';
import Link from 'next/link';
import { services, stack, whyMe } from '@/content/services';
import ClientProof from '@/components/ClientProof';
import Reveal from '@/components/Reveal';
import ContactForm from '@/components/ContactForm';
import TechIcon from '@/components/TechIcon';
import { contact } from '@/content/site';

export const metadata: Metadata = {
  title: 'Hire',
  description:
    'Web design, full-stack builds, and AI integration by Zander Leon — fixed scope, quoted in 24 hours, built by the person you talk to.',
};

export default function HirePage() {
  return (
    <main id="main" className="flex-1 pt-[104px] md:pt-[124px]">
      <div className="mx-auto w-full max-w-[var(--shell)] px-6 md:px-8">
        <h1 className="rise-1 h-display max-w-[16ch] text-[clamp(1.5rem,2.9vw,2rem)]">
          Let&rsquo;s work together
        </h1>
        <p className="rise-2 mt-5 max-w-[58ch] text-[1rem] prose-soft">
          I take on websites, full-stack apps, and AI integration. You talk to the
          person who builds it — no account managers, no handoff, no agency markup. I
          scope the work, quote a fixed price within a day, and build it myself.
        </p>
        <div className="rise-3 mt-6 flex flex-wrap gap-2.5">
          <a href="#contact" className="btn-solid">
            Tell me what you need
          </a>
          <Link href="/projects" className="btn-ghost">
            See proof first
          </Link>
        </div>
      </div>

      {/* -------------------------------------------------------- services */}
      <section
        aria-labelledby="svc-h"
        className="mx-auto w-full max-w-[var(--shell)] px-6 pt-20 md:px-8 md:pt-24"
      >
        <h2 id="svc-h" className="h-display text-[1.1875rem]">
          What I take on
        </h2>
        <p className="mt-2.5 text-[0.875rem] prose-soft">Fixed scope, fixed price, quoted in 24 hours.</p>

        <div className="mt-6 grid gap-5 lg:grid-cols-3">
          {services.map((s, i) => (
            <article key={s.name} className="card group flex flex-col p-5">
              {/* number and timeline share the top line so the name always gets
                  the full width — at three columns it had been colliding */}
              <div className="border-b border-line pb-3.5">
                <div className="flex items-center justify-between gap-3">
                  <span
                    aria-hidden
                    className="mono flex h-6 w-6 items-center justify-center rounded-md border border-line text-[0.5625rem] text-accent transition-colors duration-300 group-hover:border-accent/50"
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="mono whitespace-nowrap text-[0.75rem] text-accent">
                    {s.from} · {s.timeline}
                  </span>
                </div>
                <h3 className="h-ui mt-2.5 text-[0.9375rem]">{s.name}</h3>
              </div>
              <p className="mt-4 text-[0.9375rem] prose-soft">{s.line}</p>
              <ul className="mt-5 space-y-2">
                {s.includes.map((i) => (
                  <li key={i} className="flex gap-2.5 text-[0.875rem] prose-soft">
                    <span aria-hidden className="text-accent">
                      ▸
                    </span>
                    {i}
                  </li>
                ))}
              </ul>
              <p className="mono mt-auto pt-6 text-[0.6875rem] text-fg-faint">
                Best for: {s.bestFor}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* ----------------------------------------------------- client work */}
      <section
        id="work"
        aria-labelledby="work-h"
        className="mx-auto w-full max-w-[var(--shell)] scroll-mt-24 px-6 pt-20 md:px-8 md:pt-24"
      >
        <h2 id="work-h" className="h-display text-[1.1875rem]">
          Client work
        </h2>
        <p className="mt-2.5 max-w-[58ch] text-[0.9375rem] prose-soft">
          Not just my own products — work other people commissioned, paid for, and
          run on.
        </p>
        <div className="mt-6">
          <ClientProof />
        </div>
      </section>

      {/* ----------------------------------------------------------- stack */}
      <section
        aria-labelledby="stack-h"
        className="mx-auto w-full max-w-[var(--shell)] px-6 pt-20 md:px-8 md:pt-24"
      >
        <h2 id="stack-h" className="h-display text-[1.1875rem]">
          My tech stack
        </h2>
        <p className="mt-2.5 text-[0.875rem] prose-soft">
          Everything here is in shipped work — and picking up a stack that isn&rsquo;t
          is part of the job.
        </p>

        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stack.map((group) => (
            <Reveal key={group.title}>
              <article className="card relative h-full overflow-hidden p-6">
                <h3 className="border-b border-line pb-2.5 text-[0.9375rem] font-semibold">
                  {group.title}
                </h3>
                <ul className="relative z-10 mt-4 flex flex-wrap gap-1.5">
                  {group.items.map((i) => (
                    <li key={i}>
                      <span className="chip">
                        <TechIcon label={i} />
                        {i}
                      </span>
                    </li>
                  ))}
                </ul>
                <span
                  aria-hidden
                  className="h-display pointer-events-none absolute -bottom-6 -right-3 text-[4rem] leading-none text-white/[0.03]"
                >
                  {group.mark}
                </span>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* --------------------------------------------------------- why me */}
      <section
        aria-labelledby="why-h"
        className="mx-auto w-full max-w-[var(--shell)] px-6 pt-20 md:px-8 md:pt-24"
      >
        <h2 id="why-h" className="h-display text-[1.1875rem]">
          Why me, and how I work
        </h2>
        <ul className="mt-6 grid gap-x-12 gap-y-3.5 md:grid-cols-2">
          {whyMe.map((w) => (
            <li key={w} className="flex gap-2.5 text-[0.9375rem] prose-soft">
              <span aria-hidden className="shrink-0 text-accent">
                ▸
              </span>
              <span>{w}</span>
            </li>
          ))}
        </ul>
        <Link href="/process" className="link-accent mt-6">
          The whole process, written down <span aria-hidden>›</span>
        </Link>
      </section>

      {/* ------------------------------------------------------------ CTA */}
      <section
        id="contact"
        aria-labelledby="contact-h"
        className="mx-auto w-full max-w-[var(--shell)] scroll-mt-24 px-6 py-20 md:px-8 md:py-24"
      >
        <h2 id="contact-h" className="h-display max-w-[18ch] text-[clamp(1.1875rem,2.1vw,1.5rem)]">
          Send me the messy version.
        </h2>
        <p className="mt-3.5 max-w-[52ch] text-[1rem] prose-soft">
          You don&rsquo;t need a spec. Describe the problem in a paragraph and
          I&rsquo;ll come back with scope, price, and a date — usually the same day,
          always within one.
        </p>
        <div className="mt-6">
          <ContactForm />
        </div>
        <div className="mt-5 flex flex-wrap gap-2.5">
          <a
            href={contact.linkedin}
            target="_blank"
            rel="noreferrer"
            className="btn-ghost"
          >
            LinkedIn
          </a>
        </div>
      </section>
    </main>
  );
}
