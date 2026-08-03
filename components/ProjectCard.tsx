import Image from 'next/image';
import type { ProjectCard as Card } from '@/content/cards';
import { asset } from '@/lib/assets';
import Reveal from './Reveal';

/**
 * One project, themed by its own product palette. The accent appears as a
 * hairline edge + status dot so fourteen cards read as one wall of work
 * without turning into a rainbow.
 */
export default function ProjectCard({
  card,
  size = 'md',
}: {
  card: Card;
  size?: 'lg' | 'md' | 'sm';
}) {
  const image = card.image ? asset(card.image.rel) : null;
  const sprite = card.sprite ? asset(card.sprite.rel) : null;
  const edge = card.accent2
    ? `linear-gradient(90deg, ${card.accent}, ${card.accent2})`
    : card.accent;

  return (
    <Reveal>
      <article
        className="card-lift group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface hover:border-line-strong"
        style={{ boxShadow: '0 1px 0 rgba(250,250,248,0.04) inset' }}
      >
        <span
          aria-hidden
          className="absolute inset-x-0 top-0 h-[2px]"
          style={{ background: edge }}
        />

        {image?.exists && image.width && image.height && card.image && (
          <div
            className={`overflow-hidden border-b border-line bg-ground ${
              size === 'lg' ? 'aspect-[16/10]' : 'aspect-[16/10]'
            }`}
          >
            <Image
              src={image.url}
              alt={card.image.alt}
              width={image.width}
              height={image.height}
              sizes={size === 'lg' ? '(min-width: 768px) 60vw, 100vw' : '(min-width: 768px) 32vw, 92vw'}
              className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
            />
          </div>
        )}

        <div className={`flex flex-1 flex-col ${size === 'sm' ? 'gap-2 p-5' : 'gap-3 p-6'}`}>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
            {sprite?.exists && card.sprite && (
              <Image
                src={sprite.url}
                alt={card.sprite.alt}
                width={sprite.width ?? 48}
                height={sprite.height ?? 48}
                unoptimized
                className="pixel h-9 w-9 shrink-0 object-contain"
              />
            )}
            <h3
              className={`font-display font-black leading-tight ${
                size === 'lg' ? 'text-2xl md:text-[1.75rem]' : 'text-lg'
              }`}
            >
              {card.name}
            </h3>
            {card.status && (
              <span className="mono ml-auto flex shrink-0 items-center gap-1.5 whitespace-nowrap text-[0.6875rem] text-fg-soft">
                <span
                  aria-hidden
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ background: card.accent }}
                />
                {card.status}
              </span>
            )}
          </div>

          {card.award && (
            <p className="mono text-[0.6875rem] text-gold">★ {card.award}</p>
          )}

          <p
            className={`leading-relaxed text-fg-soft ${
              size === 'sm' ? 'text-[0.875rem]' : 'text-[0.9375rem]'
            }`}
          >
            {card.line}
          </p>

          <p className="mono mt-auto pt-2 text-[0.6875rem] leading-relaxed text-fg-faint">
            {card.tags}
          </p>

          {card.links.length > 0 && (
            <div className="mono flex flex-wrap gap-x-4 gap-y-1 pt-1">
              {card.links.map((l) => (
                <a
                  key={l.url}
                  href={l.url}
                  target="_blank"
                  rel="noreferrer"
                  className="link-x text-[0.75rem] text-link"
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
