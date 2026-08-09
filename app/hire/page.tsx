import type { Metadata } from 'next';
import Link from 'next/link';
import { carePlan, services, stack, whyMe } from '@/content/services';
import ClientProof from '@/components/ClientProof';
import ContactForm from '@/components/ContactForm';
import Reveal from '@/components/Reveal';
import TechIcon from '@/components/TechIcon';
import { contact } from '@/content/site';

/* Three neighbours in one blue→violet family, in the page's own order.
   Intensity climbs with price, so the bigger commitment reads stronger
   without the hues ever drifting far enough apart to clash. */
const RAMP = [
  '#7886dd', // Website — $750, the calmest
  '#b38bf9', // App build — $3,000, the strongest
  '#9384f0', // AI integration — $1,500, between the two
];

export const metadata: Metadata = {
  title: 'Hire',
  description:
    'Web design, full-stack builds, and AI integration by Zander Leon — fixed scope, quoted in 24 hours, built by the person you talk to.',
};

function SectionHead({
  id,
  children,
  sub,
}: {
  id: string;
  children: React.ReactNode;
  sub?: string;
}) {
  return (
    <>
      <h2
        id={id}
        className="mono flex items-center gap-2 border-b border-line pb-3 uppercase tracking-[0.14em] text-fg-soft"
      >
        <span aria-hidden className="text-accent">
          ▸
        </span>
        {children}
      </h2>
      {sub && <p className="mt-3 max-w-[58ch] text-[0.9375rem] prose-soft">{sub}</p>}
    </>
  );
}

export default function HirePage() {
  return (
    <main id="main" className="flex-1">
      {/* ------------------------------------------------------------ hero */}
      <section className="corner-glow relative overflow-hidden pt-[136px] md:pt-[168px]">
        <div className="relative mx-auto w-full max-w-[var(--shell)] px-6 md:px-8">
          <h1 className="rise-1 h-display max-w-[16ch] text-[clamp(1.5rem,2.9vw,2rem)]">
            Let&rsquo;s work together
          </h1>
          <p className="rise-2 mt-5 max-w-[58ch] text-[1rem] prose-soft">
            I take on websites, full-stack apps, and AI integration. You talk to the
            person who builds it — no account managers, no handoff, no agency markup. I
            scope the work, quote a fixed price within a day, and build it myself —
            and you pay when you approve it, not before.
          </p>

          <div className="rise-3 mt-7 flex flex-wrap gap-2.5">
            <a href="#contact" className="btn-solid">
              Tell me what you need
            </a>
            <Link href="/projects" className="btn-ghost">
              See proof first
            </Link>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------- services */}
      <section
        aria-labelledby="svc-h"
        className="mx-auto w-full max-w-[var(--shell)] scroll-mt-24 px-6 pt-16 md:px-8 md:pt-20"
        id="services"
      >
        <SectionHead id="svc-h" sub="Fixed scope, fixed price, quoted in 24 hours.">
          What I take on
        </SectionHead>

        <div className="mt-7 grid gap-5 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.name}>
              <article className="card group relative flex h-full flex-col overflow-hidden p-6">
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-[3px] rounded-t-[inherit]"
                  style={{ background: RAMP[i] }}
                />
                {/* the price is what a buyer scans for — it leads */}
                <p
                  className="mono text-[0.6875rem] uppercase tracking-[0.14em]"
                  style={{ color: RAMP[i] }}
                >
                  {s.name}
                </p>
                <p className="h-display mt-2 text-[1.625rem]">{s.from}</p>
                <p className="mono mt-1 text-[0.6875rem] text-fg-faint">
                  {s.timeline} · one written price
                </p>

                <p className="mt-4 border-t border-line pt-4 text-[0.9375rem] prose-soft">
                  {s.line}
                </p>
                <ul className="mt-4 space-y-2">
                  {s.includes.map((item) => (
                    <li key={item} className="flex gap-2.5 text-[0.875rem] prose-soft">
                      <span aria-hidden className="text-fg-faint">
                        ▸
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="mono mt-auto pt-6 text-[0.6875rem] text-fg-faint">
                  Best for: {s.bestFor}
                </p>
              </article>
            </Reveal>
          ))}
        </div>

        {/* the ongoing offer, kept deliberately slight — it is the footnote
            to the three builds above, not a fourth one competing with them */}
        <Reveal>
          <article className="card relative mt-5 overflow-hidden px-5 py-4">
            <span
              aria-hidden
              className="absolute inset-y-0 left-0 w-[3px] bg-accent"
            />
            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
              <p className="mono text-[0.6875rem] uppercase tracking-[0.14em] text-accent">
                After it launches
              </p>
              <p className="text-[0.9375rem] font-semibold">
                {carePlan.price}
                <span className="mono text-[0.6875rem] text-fg-soft">
                  {carePlan.cadence}
                </span>
                <span className="mono px-2 text-[0.6875rem] text-fg-faint">or</span>
                {carePlan.alt}
              </p>
              <p className="mono ml-auto text-[0.625rem] text-fg-faint">
                {carePlan.offer}
              </p>
            </div>

            <p className="mono mt-2.5 text-[0.6875rem] leading-relaxed text-fg-soft">
              {carePlan.includes.map((i) => i.t).join(' · ')} ·{' '}
              {carePlan.addOn.name.toLowerCase()} on request
            </p>
            <p className="mt-2 text-[0.875rem] prose-soft">{carePlan.reassurance}</p>
          </article>
        </Reveal>
      </section>

      {/* --------------------------------------------- client work — a band */}
      <section
        id="work"
        aria-labelledby="work-h"
        className="mt-16 scroll-mt-24 border-y border-line bg-white/[0.015] md:mt-20"
      >
        <div className="mx-auto w-full max-w-[var(--shell)] px-6 py-16 md:px-8 md:py-20">
          <SectionHead
            id="work-h"
            sub="Work my clients commissioned, paid for, and run on."
          >
            Client work
          </SectionHead>
          <div className="mt-7">
            <ClientProof />
          </div>
        </div>
      </section>

      {/* ------------------------------------------- contact — the close */}
      <section
        id="contact"
        aria-labelledby="contact-h"
        className="mt-16 scroll-mt-24 border-t border-line bg-white/[0.015] md:mt-20"
      >
        <div className="mx-auto w-full max-w-[var(--shell)] px-6 py-16 md:px-8 md:py-20">
          <h2
            id="contact-h"
            className="h-display max-w-[18ch] text-[clamp(1.1875rem,2.1vw,1.5rem)]"
          >
            Send me the messy version.
          </h2>
          <p className="mt-3.5 max-w-[52ch] text-[1rem] prose-soft">
            You don&rsquo;t need a spec. Describe the problem in a paragraph and
            I&rsquo;ll come back with scope, price, and a date — usually the same day,
            always within one.
          </p>

          <div className="mt-7 grid gap-10 lg:grid-cols-[minmax(0,1fr)_290px] lg:gap-12">
            <ContactForm />

            {/* the reasons to hit send, sitting beside the button that sends */}
            <aside>
              <h3 className="mono uppercase tracking-[0.14em] text-fg-soft">
                Why send it
              </h3>
              <ul className="mt-4 space-y-3.5">
                {whyMe.map((w) => (
                  <li key={w} className="flex gap-2.5 text-[0.875rem] prose-soft">
                    <span aria-hidden className="shrink-0 text-accent">
                      ▸
                    </span>
                    <span>{w}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 border-t border-line pt-5">
                <h3 className="mono uppercase tracking-[0.14em] text-fg-soft">
                  Or reach me directly
                </h3>
                <a
                  href={contact.tel}
                  className="mt-3 flex items-center gap-2.5 text-[0.9375rem] font-semibold transition-colors duration-200 hover:text-accent"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 text-accent">
                    <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.24 11.4 11.4 0 0 0 3.6.58 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.46.57 3.6a1 1 0 0 1-.25 1l-2.22 2.2Z" />
                  </svg>
                  {contact.phone}
                </a>
                <a
                  href={contact.mailto}
                  className="mt-2.5 flex items-center gap-2.5 text-[0.9375rem] font-semibold transition-colors duration-200 hover:text-accent"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 text-accent">
                    <path d="M1.5 4.5h21v15h-21v-15Zm1.8 1.8v.6l8.7 5.44 8.7-5.44v-.6H3.3Zm17.4 3.06-7.7 4.82a1.5 1.5 0 0 1-1.6 0L3.7 9.36v8.34h16.6V9.36Z" />
                  </svg>
                  {contact.email}
                </a>
                <div className="mt-5 flex flex-wrap items-center gap-4">
                  <a
                    href={contact.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-ghost"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
                      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.42v1.56h.05a3.75 3.75 0 0 1 3.37-1.85c3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.55V9h3.57v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0Z" />
                    </svg>
                    LinkedIn
                  </a>
                  <Link href="/process" className="link-accent">
                    The whole process <span aria-hidden>›</span>
                  </Link>
                </div>
              </div>
            </aside>
          </div>

          {/* the stack reads as capability, not a chapter: full width under
              the form, grouped so 32 tools scan instead of blur */}
          <div className="mt-14 border-t border-line pt-8">
            <h3 className="mono uppercase tracking-[0.14em] text-fg-soft">Built with</h3>
            <dl className="mt-5 grid gap-x-10 gap-y-5 md:grid-cols-2">
              {stack.map((group) => (
                <div key={group.title} className="min-w-0">
                  <dt className="mono flex items-center gap-2 text-[0.625rem] uppercase tracking-[0.14em] text-accent">
                    <span aria-hidden className="h-px w-4 bg-accent/50" />
                    {group.title}
                  </dt>
                  <dd className="mt-2.5">
                    <ul className="flex flex-wrap gap-1.5">
                      {group.items.map((i) => (
                        <li key={i}>
                          <span className="chip !py-1 !text-[0.6875rem]">
                            <TechIcon label={i} />
                            {i}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>
    </main>
  );
}
