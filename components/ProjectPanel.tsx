import Image from 'next/image';
import { DrawnMark, ProjectMark } from '@/components/Marks';
import TechIcon from '@/components/TechIcon';
import type { ProjectCard as Card } from '@/content/cards';
import { asset } from '@/lib/assets';

/**
 * One project, one panel. The screenshot pins while the copy scrolls past it,
 * and the panel takes the product's own accent — so scrolling the page feels
 * like walking a gallery where the lighting changes for each work.
 * Odd panels put the visual on the right, even on the left.
 */
export default function ProjectPanel({
  card,
  index,
  priority = false,
}: {
  card: Card;
  index: number;
  priority?: boolean;
}) {
  const image = card.image ? asset(card.image.rel) : null;
  const hasImage = Boolean(image?.exists && image.width && image.height && card.image);
  const flip = index % 2 === 1;
  const n = String(index + 1).padStart(2, '0');

  return (
    <section
      id={`panel-${card.id}`}
      aria-labelledby={`h-${card.id}`}
      className="panel relative scroll-mt-24 border-t border-line py-20 md:py-28"
      style={{ ['--accent' as string]: card.accent }}
    >
      {/* the panel's own light */}
      <div
        aria-hidden
        className="panel-glow pointer-events-none absolute inset-x-0 top-0 h-[420px]"
        style={{
          background: `radial-gradient(60% 100% at ${flip ? '78%' : '22%'} 0%, ${card.accent}1c, transparent 72%)`,
        }}
      />

      <div className="relative mx-auto w-full max-w-[1120px] px-6 md:px-8">
        <div
          className={`grid items-start gap-10 lg:grid-cols-2 lg:gap-16 ${
            flip ? 'lg:[&>*:first-child]:order-2' : ''
          }`}
        >
          {/* visual — pinned while the copy moves */}
          <div className="lg:sticky lg:top-[18vh]">
            <div className="panel-visual">
              {hasImage && card.image && image ? (
                <figure
                  className="overflow-hidden rounded-xl border border-line bg-bg"
                  style={{ boxShadow: `0 24px 70px -30px ${card.accent}66` }}
                >
                  <div className="flex items-center gap-1.5 border-b border-line px-3 py-2">
                    <span className="h-2 w-2 rounded-full bg-white/15" />
                    <span className="h-2 w-2 rounded-full bg-white/15" />
                    <span className="h-2 w-2 rounded-full bg-white/15" />
                    {card.links[0] && (
                      <span className="mono ml-2 truncate text-[0.625rem] text-fg-faint">
                        {card.links[0].label}
                      </span>
                    )}
                  </div>
                  <Image
                    src={image.url}
                    alt={card.image.alt}
                    width={image.width ?? 1600}
                    height={image.height ?? 1000}
                    sizes="(min-width: 1024px) 48vw, 92vw"
                    priority={priority}
                    className="block h-auto w-full"
                  />
                </figure>
              ) : (
                <div
                  className="flex aspect-[16/10] items-center justify-center rounded-xl border border-line"
                  style={{
                    background: `radial-gradient(circle at 50% 45%, ${card.accent}1f, transparent 70%)`,
                  }}
                >
                  <DrawnMark
                    id={card.drawn ?? 'code'}
                    accent={card.accent}
                    className="h-14 w-14"
                  />
                </div>
              )}
            </div>
          </div>

          {/* copy */}
          <div className="panel-copy lg:py-6">
            <div className="flex items-center gap-3">
              <span
                className="mono text-[0.6875rem] tabular-nums"
                style={{ color: card.accent }}
              >
                {n}
              </span>
              <span aria-hidden className="h-px w-8" style={{ background: card.accent }} />
              {card.status && (
                <span className="mono text-[0.625rem] uppercase tracking-[0.14em] text-fg-faint">
                  {card.status}
                </span>
              )}
            </div>

            <div className="mt-5 flex items-center gap-3">
              <ProjectMark
                logo={card.logo}
                drawn={card.drawn}
                accent={card.accent}
                name={card.name}
                tile={card.logoTile}
              />
              <h2 id={`h-${card.id}`} className="h-display text-[clamp(1.5rem,3vw,2.125rem)]">
                {card.name}
              </h2>
            </div>

            {card.hook && (
              <p
                className="mt-5 border-l-2 pl-4 text-[1rem] font-medium leading-snug"
                style={{ borderColor: card.accent, color: card.accent }}
              >
                {card.hook}
              </p>
            )}

            <p className="mt-5 max-w-[52ch] text-[0.9375rem] prose-soft">{card.line}</p>

            {card.award && (
              <p
                className="mono mt-4 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[0.6875rem]"
                style={{ borderColor: `${card.accent}55`, color: card.accent }}
              >
                ★ {card.award}
              </p>
            )}

            <div className="mt-7">
              <p className="mono text-[0.625rem] uppercase tracking-[0.14em] text-fg-faint">
                Built with
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {card.tags.map((t) => (
                  <span key={t} className="chip">
                    <TechIcon label={t} />
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {card.links.length > 0 && (
              <div className="mt-7 flex flex-wrap gap-2.5">
                {card.links.map((l, i) => (
                  <a
                    key={l.url}
                    href={l.url}
                    target="_blank"
                    rel="noreferrer"
                    className={i === 0 ? 'btn-solid' : 'btn-ghost'}
                  >
                    {l.label} <span aria-hidden>↗</span>
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
