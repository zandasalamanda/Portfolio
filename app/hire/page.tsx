import type { Metadata } from 'next';
import Link from 'next/link';
import { contact, services } from '@/content/services';

export const metadata: Metadata = {
  title: 'Hire',
  description:
    'Web design, full-stack builds, and AI integration by Zander Leon — fixed scope, quoted in 24 hours, built by the person you talk to.',
};

export default function HirePage() {
  return (
    <main id="main" className="flex-1 pt-[128px] md:pt-[168px]">
      <div className="mx-auto w-full max-w-[1200px] px-6 md:px-10">
        <p className="eyebrow">Hire</p>
        <h1 className="display mt-4 max-w-[17ch] text-[clamp(2.25rem,5.4vw,4rem)]">
          You talk to the person who builds it.
        </h1>
        <p className="mt-6 max-w-[62ch] leading-relaxed text-fg-soft">
          No account managers, no handoff, no agency markup. I scope the work, quote a
          fixed price within a day, and build it myself — the same way I built the
          products on this site.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href={contact.mailto} className="cta">
            Tell me what you need
          </a>
          <Link href="/work" className="cta-ghost">
            See proof first
          </Link>
        </div>
      </div>

      {/* ------------------------------------------------------------- offers */}
      <section
        aria-labelledby="offers-h"
        className="mx-auto w-full max-w-[1200px] px-6 pt-20 md:px-10 md:pt-28"
      >
        <div className="flex items-baseline justify-between border-b border-line pb-3">
          <h2 id="offers-h" className="eyebrow">
            What I take on
          </h2>
          <p className="mono text-[0.6875rem] text-fg-faint">fixed scope · fixed price</p>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {services.map((s) => (
            <article
              key={s.name}
              className="card-lift flex flex-col rounded-2xl border border-line bg-surface p-7 hover:border-line-strong"
            >
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="font-display text-xl font-black">{s.name}</h3>
                <span className="mono text-[0.6875rem] text-fg-faint">{s.timeline}</span>
              </div>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-fg-soft">{s.line}</p>

              <p className="eyebrow mt-6 text-[0.625rem]">Includes</p>
              <ul className="mono mt-3 space-y-2 text-[0.8125rem] text-fg-soft">
                {s.includes.map((i) => (
                  <li key={i} className="flex gap-2">
                    <span aria-hidden className="text-link">
                      ▸
                    </span>
                    {i}
                  </li>
                ))}
              </ul>

              <p className="mono mt-6 border-t border-line pt-4 text-[0.75rem] text-fg-soft">
                Best for: <span className="text-fg">{s.bestFor}</span>
              </p>
            </article>
          ))}
        </div>

        <p className="mono mt-6 text-[0.75rem] text-fg-faint">
          Every project is quoted as one fixed price before any work starts. No hourly
          surprises, no change-order games.
        </p>
      </section>

      {/* ------------------------------------------------------------ process */}
      <section
        aria-labelledby="process-h"
        className="mx-auto w-full max-w-[1200px] px-6 pt-24 md:px-10 md:pt-32"
      >
        <h2 id="process-h" className="eyebrow border-b border-line pb-3">
          How it goes
        </h2>
        <ol className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-4">
          {[
            {
              n: '01',
              t: 'You tell me the problem',
              d: 'An email is enough. What is broken, or what you want to exist.',
            },
            {
              n: '02',
              t: 'I scope and quote — 24 hours',
              d: 'Written scope, fixed price, a delivery date. If I am not the right fit, I say so.',
            },
            {
              n: '03',
              t: 'You see it as it is built',
              d: 'A live preview link from day one. You watch it come together instead of waiting.',
            },
            {
              n: '04',
              t: 'Launch, then support',
              d: 'I ship it, hand over everything, and stay reachable after — not gone the next day.',
            },
          ].map((p) => (
            <li key={p.n} className="bg-surface p-6">
              <span className="mono text-[0.6875rem] text-link">{p.n}</span>
              <h3 className="mt-3 font-display text-[1.0625rem] font-black leading-tight">
                {p.t}
              </h3>
              <p className="mt-2 text-[0.875rem] leading-relaxed text-fg-soft">{p.d}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* ---------------------------------------------------------- objections */}
      <section
        aria-labelledby="q-h"
        className="mx-auto w-full max-w-[1200px] px-6 pt-24 md:px-10 md:pt-32"
      >
        <h2 id="q-h" className="eyebrow border-b border-line pb-3">
          The honest answers
        </h2>
        <div className="mt-8 grid gap-8 md:grid-cols-2 md:gap-x-14">
          {[
            {
              q: 'You are 18. Why would I hire you?',
              a: 'Because you can check the work before you pay for it. Four products are live right now, one of them won a Congressional App Challenge across 4,600+ apps, and I have shipped AI into a company that uses it for real operations. Click anything on this site — it opens.',
            },
            {
              q: 'What if you disappear mid-project?',
              a: 'You get the repository and every credential from day one, and a live preview link from the first build. If I vanished tomorrow, another developer could pick it up cleanly — that is how I hand off, not a promise I am asking you to take on faith.',
            },
            {
              q: 'Do you actually do AI, or just call an API?',
              a: 'Both, correctly. I have built assistants that read real documents and spreadsheets and act on them, with deterministic fallbacks so the product still works when the model is unavailable. That fallback design is the part most people skip.',
            },
            {
              q: 'Can you work with what we already have?',
              a: 'Yes — including old systems. Part of my day job is fixing bugged legacy web code in classic ASP/VBScript. I am comfortable in codebases that are not new or pretty.',
            },
          ].map((f) => (
            <div key={f.q}>
              <h3 className="font-display text-[1.0625rem] font-black">{f.q}</h3>
              <p className="mt-3 leading-relaxed text-fg-soft">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------------------------------------------------------- CTA */}
      <section className="mx-auto w-full max-w-[1200px] px-6 py-24 md:px-10 md:py-32">
        <div className="rounded-3xl border border-line bg-surface p-8 md:p-14">
          <h2 className="display max-w-[18ch] text-[clamp(1.75rem,3.4vw,2.75rem)]">
            Send me the messy version.
          </h2>
          <p className="mt-5 max-w-[54ch] leading-relaxed text-fg-soft">
            You do not need a spec. Describe the problem in a paragraph and I will come
            back with scope, price, and a date — usually the same day, always within
            one.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={contact.mailto} className="cta">
              {contact.email}
            </a>
            <a
              href={contact.linkedin}
              target="_blank"
              rel="noreferrer"
              className="cta-ghost"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
