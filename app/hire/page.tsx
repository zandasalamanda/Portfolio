import type { Metadata } from 'next';
import Link from 'next/link';
import { services, stack, audiences, preferences, whyMe } from '@/content/services';
import { contact } from '@/content/site';

export const metadata: Metadata = {
  title: 'Hire',
  description:
    'Web design, full-stack builds, and AI integration by Zander Leon — fixed scope, quoted in 24 hours, built by the person you talk to.',
};

export default function HirePage() {
  return (
    <main id="main" className="flex-1 pt-[128px] md:pt-[152px]">
      <div className="mx-auto w-full max-w-[1180px] px-6 md:px-10">
        <h1 className="rise-1 h-display max-w-[16ch] text-[clamp(2.25rem,5.4vw,3.5rem)]">
          Let&rsquo;s work together
        </h1>
        <p className="rise-2 mt-6 max-w-[62ch] text-[1.0625rem] prose-soft">
          I take on websites, full-stack apps, and AI integration. You talk to the
          person who builds it — no account managers, no handoff, no agency markup. I
          scope the work, quote a fixed price within a day, and build it myself.
        </p>
        <div className="rise-3 mt-8 flex flex-wrap gap-3">
          <a href={contact.mailto} className="btn-solid">
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
        className="mx-auto w-full max-w-[1180px] px-6 pt-24 md:px-10 md:pt-32"
      >
        <h2 id="svc-h" className="h-display text-[1.75rem]">
          What I take on
        </h2>
        <p className="mt-3 prose-soft">Fixed scope, fixed price, quoted in 24 hours.</p>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {services.map((s) => (
            <article key={s.name} className="card flex flex-col p-7">
              <div className="flex items-baseline justify-between gap-3 border-b border-line pb-4">
                <h3 className="h-display text-[1.25rem]">{s.name}</h3>
                <span className="mono text-[0.6875rem] text-teal">{s.timeline}</span>
              </div>
              <p className="mt-4 text-[0.9375rem] prose-soft">{s.line}</p>
              <ul className="mt-6 space-y-2.5">
                {s.includes.map((i) => (
                  <li key={i} className="flex gap-2.5 text-[0.875rem] prose-soft">
                    <span aria-hidden className="mono text-fg-faint">
                      ⌐
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

      {/* ----------------------------------------------------------- stack */}
      <section
        aria-labelledby="stack-h"
        className="mx-auto w-full max-w-[1180px] px-6 pt-24 md:px-10 md:pt-32"
      >
        <h2 id="stack-h" className="h-display text-[1.75rem]">
          My tech stack
        </h2>
        <p className="mt-3 prose-soft">
          What I actually build with — every one of these is in a shipped project.
        </p>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stack.map((group) => (
            <article key={group.title} className="card relative overflow-hidden p-6">
              <h3 className="border-b border-line pb-3 font-semibold">{group.title}</h3>
              <ul className="relative z-10 mt-4 space-y-2.5">
                {group.items.map((i) => (
                  <li key={i} className="text-[0.9375rem] prose-soft">
                    {i}
                  </li>
                ))}
              </ul>
              <span
                aria-hidden
                className="h-display pointer-events-none absolute -bottom-6 -right-3 text-[5rem] leading-none text-white/[0.03]"
              >
                {group.mark}
              </span>
            </article>
          ))}
        </div>
      </section>

      {/* --------------------------------------------------------- why me */}
      <section
        aria-labelledby="why-h"
        className="mx-auto w-full max-w-[1180px] px-6 pt-24 md:px-10 md:pt-32"
      >
        <h2 id="why-h" className="h-display text-[1.75rem]">
          Why hire me?
        </h2>
        <ul className="mt-7 max-w-[70ch] space-y-5">
          {whyMe.map((w) => (
            <li key={w} className="flex gap-3 prose-soft">
              <span aria-hidden className="mono shrink-0 text-fg-faint">
                ⌐
              </span>
              <span>{w}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* ---------------------------------------------------- preferences */}
      <section
        aria-labelledby="pref-h"
        className="mx-auto w-full max-w-[1180px] px-6 pt-24 md:px-10 md:pt-32"
      >
        <h2 id="pref-h" className="h-display text-[1.75rem]">
          How I work
        </h2>
        <div className="mt-8 grid gap-x-14 gap-y-9 md:grid-cols-2">
          {preferences.map((p) => (
            <div key={p.t} className="flex gap-3">
              <span aria-hidden className="mono shrink-0 text-fg-faint">
                ⌐
              </span>
              <div>
                <h3 className="font-semibold">{p.t}</h3>
                <p className="mt-2 text-[0.9375rem] prose-soft">{p.d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------ audiences */}
      <section
        aria-labelledby="aud-h"
        className="mx-auto w-full max-w-[1180px] px-6 pt-24 md:px-10 md:pt-32"
      >
        <h2 id="aud-h" className="h-display text-[1.75rem]">
          Who I build for
        </h2>
        <p className="mt-3 prose-soft">The work I am best positioned to do well.</p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {audiences.map((a) => (
            <article key={a.t} className="card p-6">
              <h3 className="font-semibold">{a.t}</h3>
              <p className="mt-3 text-[0.9375rem] prose-soft">{a.d}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------------ CTA */}
      <section className="mx-auto w-full max-w-[1180px] px-6 py-24 md:px-10 md:py-32">
        <div className="card p-8 md:p-14">
          <h2 className="h-display max-w-[18ch] text-[clamp(1.75rem,3.4vw,2.5rem)]">
            Send me the messy version.
          </h2>
          <p className="mt-5 max-w-[54ch] prose-soft">
            You don&rsquo;t need a spec. Describe the problem in a paragraph and
            I&rsquo;ll come back with scope, price, and a date — usually the same day,
            always within one.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={contact.mailto} className="btn-solid">
              {contact.email}
            </a>
            <a
              href={contact.linkedin}
              target="_blank"
              rel="noreferrer"
              className="btn-ghost"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
