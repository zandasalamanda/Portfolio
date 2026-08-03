import Image from 'next/image';
import { DrawnMark, ProjectMark } from '@/components/Marks';
import TechIcon from '@/components/TechIcon';
import type { ProjectCard as Card } from '@/content/cards';
import { asset } from '@/lib/assets';
import Reveal from './Reveal';

/**
 * A project card. Wide cards put the screenshot beside the copy; the rest
 * stack it above — so the gallery reads as a composed wall rather than a
 * uniform grid, while every card stays the same species.
 */
export default function ProjectCard({
  card,
  priority = false,
}: {
  card: Card;
  priority?: boolean;
}) {
  const image = card.image ? asset(card.image.rel) : null;
  const hasImage = Boolean(image?.exists && image.width && image.height && card.image);
  const wide = card.size === 'wide';

  return (
    <Reveal className={wide ? 'sm:col-span-2' : ''}>
      <article
        className={`card group flex h-full overflow-hidden ${
          wide ? 'flex-col md:grid md:grid-cols-2' : 'flex-col'
        }`}
      >
        <div
          className={`relative overflow-hidden bg-bg ${
            wide
              ? 'aspect-[16/10] border-b border-line md:aspect-auto md:h-full md:border-b-0 md:border-r'
              : 'aspect-[16/10] border-b border-line'
          }`}
        >
          {hasImage && card.image && image ? (
            <Image
              src={image.url}
              alt={card.image.alt}
              width={image.width ?? 1600}
              height={image.height ?? 1000}
              sizes={
                wide ? '(min-width: 768px) 46vw, 92vw' : '(min-width: 1024px) 30vw, 92vw'
              }
              priority={priority}
              className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
            />
          ) : (
            <div
              className="flex h-full w-full items-center justify-center"
              style={{
                background: `radial-gradient(circle at 50% 45%, ${card.accent}1f, transparent 68%)`,
              }}
            >
              <DrawnMark
                id={card.drawn ?? 'code'}
                accent={card.accent}
                className="h-12 w-12 transition-transform duration-500 group-hover:scale-110"
              />
            </div>
          )}
          <span
            aria-hidden
            className="absolute inset-x-0 top-0 h-[2px]"
            style={{
              background: card.accent2
                ? `linear-gradient(90deg, ${card.accent}, ${card.accent2})`
                : card.accent,
            }}
          />
        </div>

        <div className={`flex flex-1 flex-col gap-3 p-5 ${wide ? "md:justify-center" : ""}`}>
          <div className="flex items-center gap-2.5">
            <ProjectMark
              logo={card.logo}
              drawn={card.drawn}
              accent={card.accent}
              name={card.name}
              tile={card.logoTile}
            />
            <h3
              className={`h-display leading-tight ${wide ? 'text-[1.25rem]' : 'text-[1.0625rem]'}`}
            >
              {card.name}
            </h3>
            {card.status && (
              <span className="mono ml-auto flex shrink-0 items-center gap-1.5 whitespace-nowrap text-[0.625rem] text-fg-faint">
                <span
                  aria-hidden
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ background: card.accent }}
                />
                {card.status}
              </span>
            )}
          </div>

          {card.hook && (
            <p
              className="border-l-2 pl-3 text-[0.8125rem] font-medium"
              style={{ borderColor: card.accent, color: card.accent }}
            >
              {card.hook}
            </p>
          )}

          {card.award && <p className="mono text-[0.625rem] text-accent">★ {card.award}</p>}

          <p className="text-[0.875rem] prose-soft">{card.line}</p>

          <div className={`flex flex-wrap gap-1.5 pt-2 ${wide ? "" : "mt-auto"}`}>
            {card.tags.map((t) => (
              <span key={t} className="chip">
                <TechIcon label={t} />
                {t}
              </span>
            ))}
          </div>

          {card.links.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-1">
              {card.links.map((l) => (
                <a
                  key={l.url}
                  href={l.url}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-ghost !px-3 !py-1.5 !text-[0.75rem]"
                >
                  {l.label} <span aria-hidden>↗</span>
                </a>
              ))}
            </div>
          )}
        </div>
      </article>
    </Reveal>
  );
}
