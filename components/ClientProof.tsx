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
        return (
          <Reveal key={job.id}>
            <article
              className="card flex h-full flex-col overflow-hidden"
              style={{ borderColor: `${job.accent}2e` }}
            >
              {hasImage && job.image && image && (
                <div className="relative aspect-[16/9] overflow-hidden border-b border-line bg-bg">
                  <Image
                    src={image.url}
                    alt={job.image.alt}
                    width={image.width ?? 1600}
                    height={image.height ?? 900}
                    sizes="(min-width: 768px) 46vw, 92vw"
                    className="h-full w-full object-cover object-top"
                  />
                  <span
                    aria-hidden
                    className="absolute inset-x-0 top-0 h-[2px]"
                    style={{ background: job.accent }}
                  />
                </div>
              )}

              <div className="flex flex-1 flex-col gap-3 p-5">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
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
