import type { Metadata } from 'next';
import Link from 'next/link';
import ProcessArt from '@/components/ProcessArt';
import { faqs, fromYou, steps } from '@/content/process';

export const metadata: Metadata = {
  title: 'How it works',
  description:
    'How a project with Zander Leon runs: you describe the problem, you get a fixed quote within 24 hours, you watch it get built on a live link, and you own everything at the end.',
};

export default function ProcessPage() {
  return (
    <main id="main" className="flex-1 pt-[104px] md:pt-[124px]">
      <div className="mx-auto w-full max-w-[var(--shell)] px-6 md:px-8">
        <p className="rise-1 mono uppercase tracking-[0.16em] text-fg-faint">How it works</p>
        <h1 className="rise-1 h-display mt-4 max-w-[26ch] text-balance text-[clamp(1.5rem,2.9vw,2rem)]">
          Four steps, and you know the price before the second one
        </h1>
        <p className="rise-2 mt-5 max-w-[56ch] text-[1rem] prose-soft">
          Hiring someone to build software is uncomfortable when you cannot tell what
          you are buying. So here is the whole thing, start to finish, with the
          commitments written down.
        </p>
        <nav aria-label="The four steps" className="rise-3 mt-7 flex flex-wrap gap-2">
          {steps.map((s) => (
            <a key={s.n} href={`#step-${s.n}`} className="chip !gap-2">
              <span className="mono text-[0.625rem] text-accent">{s.n}</span>
              {s.title}
            </a>
          ))}
        </nav>
      </div>

      {/* ------------------------------------------------------- the steps */}
      <section
        aria-labelledby="steps-h"
        className="mx-auto w-full max-w-[var(--shell)] px-6 pt-16 md:px-8 md:pt-20"
      >
        <h2 id="steps-h" className="sr-only">
          The four steps
        </h2>

        <ol className="relative">
          {/* the spine the steps hang from, and the fill that chases you down it */}
          <span
            aria-hidden
            className="absolute bottom-6 left-[15px] top-4 w-px bg-line md:left-[19px]"
          />
          <span
            aria-hidden
            className="step-spine absolute bottom-6 left-[15px] top-4 w-px md:left-[19px]"
            style={{
              background: 'linear-gradient(to bottom, #b3a6ff, rgba(179,166,255,0.25))',
              boxShadow: '0 0 12px rgba(179,166,255,0.35)',
            }}
          />
          {steps.map((s) => (
            <li key={s.n} id={`step-${s.n}`} className="relative scroll-mt-28 pb-12 last:pb-0">
              <div className="flex gap-5 md:gap-7">
                <span
                  aria-hidden
                  className="step-node mono relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border bg-bg text-[0.625rem] md:h-10 md:w-10 md:text-[0.6875rem]"
                >
                  {s.n}
                </span>
                <div className="step-copy grid min-w-0 flex-1 gap-6 pt-1 md:grid-cols-[minmax(0,1fr)_130px] md:gap-10">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <h3 className="h-ui text-[1.0625rem]">{s.title}</h3>
                      <span className="mono text-[0.75rem] text-accent">{s.when}</span>
                    </div>
                    <p className="mt-2.5 max-w-[56ch] text-[1rem] prose-soft">{s.line}</p>
                    <ul className="mt-4 space-y-1.5">
                      {s.detail.map((d) => (
                        <li key={d} className="flex gap-2.5 text-[0.9375rem] prose-soft">
                          <span aria-hidden className="text-accent">
                            ▸
                          </span>
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <ProcessArt
                    id={s.art}
                    className="hidden h-[120px] w-[120px] self-center text-accent md:block"
                  />
                </div>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* --------------------------------------------------- what you send */}
      <section
        aria-labelledby="you-h"
        className="mx-auto w-full max-w-[var(--shell)] px-6 pt-16 md:px-8 md:pt-20"
      >
        <div className="card p-6 md:p-7">
          <h2
            id="you-h"
            className="mono flex items-center gap-2 uppercase tracking-[0.14em] text-fg-soft"
          >
            <span aria-hidden className="text-accent">▸</span>
            What I need from you
          </h2>
          <p className="mt-2.5 text-[0.9375rem] prose-soft">
            Three things. That is the whole list.
          </p>
          <ul className="mt-5 grid gap-4 md:grid-cols-3">
            {fromYou.map((f, i) => (
              <li key={f} className="border-t border-line pt-3.5">
                <span aria-hidden className="mono text-[0.625rem] text-accent">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="mt-1.5 text-[0.875rem] prose-soft">{f}</p>
              </li>
            ))}
          </ul>
          <p className="mono mt-6 border-t border-line pt-4 text-[0.6875rem] text-fg-soft">
            No retainers · no account managers · no lock-in
          </p>
        </div>
      </section>

      {/* ---------------------------------------------------------- the faq */}
      <section
        aria-labelledby="faq-h"
        className="mx-auto w-full max-w-[var(--shell)] px-6 pt-16 md:px-8 md:pt-20"
      >
        <h2
          id="faq-h"
          className="mono flex items-center gap-2 border-b border-line pb-3 uppercase tracking-[0.14em] text-fg-soft"
        >
          <span aria-hidden className="text-accent">▸</span>
          The questions people actually ask
        </h2>
        <dl className="mt-2 grid md:grid-cols-2 md:gap-x-12">
          {faqs.map((f) => (
            <div key={f.q} className="border-b border-line py-5">
              <dt className="h-ui text-[1rem]">{f.q}</dt>
              <dd className="mt-2 max-w-[64ch] text-[0.9375rem] prose-soft">{f.a}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* ------------------------------------------------------------- cta */}
      <section className="mx-auto w-full max-w-[var(--shell)] px-6 py-20 md:px-8 md:py-28">
        <div className="card p-7 text-center md:p-9">
          <h2 className="h-display text-[clamp(1.1875rem,2.1vw,1.5rem)]">
            Tell me what is going wrong
          </h2>
          <p className="mx-auto mt-3 max-w-[46ch] text-[0.9375rem] prose-soft">
            Describe it in your own words. I reply within a day, and if I am not the
            right person for it I will say so.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-2.5">
            <Link href="/hire#contact" className="btn-solid">
              Tell me what you need
            </Link>
            <Link href="/projects" className="btn-ghost">
              See what I have built
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
