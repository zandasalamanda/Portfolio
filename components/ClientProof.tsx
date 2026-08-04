import Image from 'next/image';
import { clientJobs } from '@/content/clients';
import { asset } from '@/lib/assets';
import Reveal from './Reveal';

/**
 * The answer to "has anyone actually paid you?" — commissioned work, each
 * entry stating plainly what it was, for whom, and where it stands. Entries
 * without a screenshot render as text; a client quote renders when one
 * exists, and nothing pretends to be one until then.
 */
export default function ClientProof() {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      {clientJobs.map((job) => {
        const image = job.image ? asset(job.image.rel) : null;
        const hasImage = Boolean(image?.exists && image.width && image.height && job.image);
        const cycle = (job.cycle ?? []).map((rel) => asset(rel)).filter((a) => a.exists);
        const frames = image ? [image, ...cycle] : [];
        const fadeClass = frames.length > 1 ? `fade-n${Math.min(frames.length, 4)}` : '';
        /* each fade-N keyframe set runs N×5s, so frames step in at 5s intervals */
  const per = 5;
        return (
          <Reveal key={job.id}>
            <article
              className="card flex h-full flex-col overflow-hidden"
              style={{ borderColor: `${job.accent}2e` }}
            >
              {hasImage && job.image && image && (
                <div
                  className={`relative aspect-[16/9] overflow-hidden border-b border-line bg-bg ${fadeClass}`}
                >
                  {frames.map((f, i) => (
                    <Image
                      key={f.rel}
                      src={f.url}
                      alt={i === 0 ? job.image!.alt : ''}
                      aria-hidden={i > 0 || undefined}
                      width={f.width ?? 1600}
                      height={f.height ?? 900}
                      sizes="(min-width: 768px) 46vw, 92vw"
                      loading={i === 0 ? undefined : 'lazy'}
                      className={`absolute inset-0 h-full w-full object-cover object-top ${
                        fadeClass ? 'fade-item' : ''
                      }`}
                      style={fadeClass ? { animationDelay: `${i * per}s` } : undefined}
                    />
                  ))}
                  <span
                    aria-hidden
                    className="absolute inset-x-0 top-0 h-[2px]"
                    style={{ background: job.accent }}
                  />
                </div>
              )}

              <div className="flex flex-1 flex-col gap-3 p-5">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  {(() => {
                    const logo = job.logo ? asset(job.logo) : null;
                    if (logo?.exists) {
                      return (
                        <span
                          className={`flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-lg ${
                            job.logoTile
                              ? 'bg-white p-1'
                              : 'border border-line bg-white/[0.04]'
                          }`}
                        >
                          <Image
                            src={logo.url}
                            alt={`${job.client} logo`}
                            width={logo.width ?? 32}
                            height={logo.height ?? 32}
                            sizes="32px"
                            className="h-full w-full object-contain"
                          />
                        </span>
                      );
                    }
                    return (
                      <span
                        aria-hidden
                        className="mono flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border text-[0.625rem]"
                        style={{ borderColor: `${job.accent}55`, color: job.accent }}
                      >
                        {job.mark ?? job.client.slice(0, 2).toUpperCase()}
                      </span>
                    );
                  })()}
                  <h3 className="h-ui text-[1rem]">{job.client}</h3>
                  <span className="mono text-[0.75rem] text-fg-soft">{job.kind}</span>
                  <span
                    className="mono ml-auto flex items-center gap-1.5 whitespace-nowrap text-[0.6875rem]"
                    style={{ color: job.accent }}
                  >
                    <span
                      aria-hidden
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ background: job.accent }}
                    />
                    {job.status}
                  </span>
                </div>

                <p className="text-[0.9375rem] prose-soft">{job.line}</p>

                {job.quote && (
                  <blockquote
                    className="border-l-2 pl-3 text-[0.9375rem] italic prose-soft"
                    style={{ borderColor: job.accent }}
                  >
                    “{job.quote.text}”
                    <cite className="mono mt-1 block not-italic text-[0.6875rem] text-fg-faint">
                      — {job.quote.by}
                    </cite>
                  </blockquote>
                )}

                <p className="mt-auto pt-2 text-[0.8125rem] text-fg-soft">{job.outcome}</p>

                {job.link && (
                  <a
                    href={job.link.url}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-ghost self-start !px-3 !py-1.5 !text-[0.75rem]"
                  >
                    {job.link.label} <span aria-hidden>↗</span>
                  </a>
                )}
              </div>
            </article>
          </Reveal>
        );
      })}
    </div>
  );
}
