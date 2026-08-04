import Image from 'next/image';
import { DrawnMark, ProjectMark } from '@/components/Marks';
import TechIcon from '@/components/TechIcon';
import { brandFor } from '@/content/brands';
import type { ProjectCard as Card } from '@/content/cards';
import { asset } from '@/lib/assets';
import { isLight } from '@/lib/color';
import { frameFor } from '@/lib/frame';
import Reveal from './Reveal';

/**
 * A project card. Every card is built the same way, but each is dressed in its
 * own app's colour, typeface and corner radius, and its screenshot is framed
 * the way the capture actually is — a window for desktop shots, a phone
 * standing on the stage for portrait ones.
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
  const brand = brandFor(card.id);
  const frame = frameFor(image?.width, image?.height);
  const chromeLabel = brand.label ?? card.links[0]?.label ?? card.name;

  /* Every stage is 16:10 — close to what the desktop captures actually are, so
     covering them costs a few percent at the edges rather than a hard crop.
     Anything much wider than the stage (Atlas is 2.06) is fitted instead of
     cropped, so its sidebar survives. */
  const ratio = (image?.width ?? 16) / (image?.height ?? 10);
  const fit = ratio > 1.9 ? 'object-contain' : 'object-cover object-top';
  const lightStage = isLight(brand.stage);

  const stage = (
    <div
      className="app-stage flex aspect-[16/10] flex-col border-b border-line"
      style={{ ['--brand-stage' as string]: brand.stage }}
    >
      {!hasImage || !card.image || !image ? (
        <div className="flex h-full w-full items-center justify-center">
          <DrawnMark
            id={card.drawn ?? 'code'}
            accent={brand.primary}
            className="h-12 w-12 transition-transform duration-500 group-hover:scale-110"
          />
        </div>
      ) : frame === 'phone' ? (
        /* A portrait capture is a phone, so it stands on the stage at full
           width and is cut off at the bottom — never squeezed into a strip. */
        <div className="relative h-full w-full">
          <div className="absolute inset-x-0 top-[9%] flex justify-center">
            <div className="device-phone w-[40%] max-w-[136px] transition-transform duration-500 group-hover:-translate-y-1.5">
              <Image
                src={image.url}
                alt={card.image.alt}
                width={image.width ?? 1170}
                height={image.height ?? 2532}
                sizes="(min-width: 1024px) 140px, 40vw"
                priority={priority}
                className="block h-auto w-full"
              />
            </div>
          </div>
          <div
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-14"
            style={{
              background: `linear-gradient(to top, ${brand.stage}, transparent)`,
            }}
          />
        </div>
      ) : (
        /* A desktop capture is a window: title bar, then the page below it. */
        <>
          <div
            className={`flex shrink-0 items-center gap-1.5 border-b px-3 py-2 ${
              lightStage ? 'border-black/[0.08]' : 'border-white/[0.07]'
            }`}
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className={`h-1.5 w-1.5 rounded-full ${
                  lightStage ? 'bg-black/20' : 'bg-white/20'
                }`}
              />
            ))}
            <span
              className={`mono ml-1.5 truncate text-[0.5625rem] ${
                lightStage ? 'text-black/45' : 'text-white/40'
              }`}
            >
              {chromeLabel}
            </span>
          </div>
          <div className="relative min-h-0 flex-1 overflow-hidden">
            <Image
              src={image.url}
              alt={card.image.alt}
              width={image.width ?? 1600}
              height={image.height ?? 1000}
              sizes={
                wide ? '(min-width: 1024px) 64vw, 92vw' : '(min-width: 1024px) 31vw, 92vw'
              }
              priority={priority}
              className={`h-full w-full ${fit} transition-transform duration-500 group-hover:scale-[1.03]`}
            />
          </div>
        </>
      )}

      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-[2px]"
        style={{
          background: brand.gradient
            ? `linear-gradient(90deg, ${brand.gradient[0]}, ${brand.gradient[1]})`
            : brand.primary,
        }}
      />
    </div>
  );

  return (
    <Reveal className={wide ? 'sm:col-span-2' : ''}>
      <article
        className="app-card group flex h-full flex-col overflow-hidden"
        style={{
          ['--brand' as string]: brand.primary,
          ['--brand-radius' as string]: brand.radius,
        }}
      >
        {stage}

        <div className="flex flex-1 flex-col gap-3 p-5">
          <div className="flex items-center gap-2.5">
            <ProjectMark
              logo={card.logo}
              drawn={card.drawn}
              accent={brand.primary}
              name={card.name}
              tile={card.logoTile}
            />
            <h3
              className={`${brand.fontClass} leading-tight ${
                wide ? 'text-[1.25rem]' : 'text-[1.0625rem]'
              }`}
              style={{ fontWeight: brand.weight, letterSpacing: brand.tracking }}
            >
              {card.name}
            </h3>
            {card.status && (
              <span className="mono ml-auto flex shrink-0 items-center gap-1.5 whitespace-nowrap text-[0.625rem] text-fg-faint">
                <span
                  aria-hidden
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ background: brand.primary }}
                />
                {card.status}
              </span>
            )}
          </div>

          {card.hook && (
            <p
              className="border-l-2 pl-3 text-[0.8125rem] font-medium"
              style={{ borderColor: brand.primary, color: brand.ink }}
            >
              {card.hook}
            </p>
          )}

          {card.award && (
            <p className="mono text-[0.625rem]" style={{ color: brand.ink }}>
              ★ {card.award}
            </p>
          )}

          <p className="text-[0.875rem] prose-soft">{card.line}</p>

          <div className={`flex flex-wrap gap-1.5 pt-2 ${wide ? '' : 'mt-auto'}`}>
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
