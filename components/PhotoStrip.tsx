import Image from 'next/image';
import { galleryPhotos } from '@/content/gallery';
import { asset } from '@/lib/assets';

/**
 * The tilted photo strip. Drifts slowly, pauses on hover, and each card
 * dims to reveal a word + line about how the work gets done.
 */
export default function PhotoStrip() {
  const photos = galleryPhotos.map((p) => ({ ...p, a: asset(p.rel) }));
  const present = photos.filter((p) => p.a.exists && p.a.width && p.a.height);
  const track = present.length > 0 ? [...present, ...present] : photos;

  return (
    <div className="strip relative overflow-hidden py-4">
      <div
        className={`flex w-max gap-5 px-5 ${present.length > 0 ? 'strip-track' : ''}`}
      >
        {track.map((p, i) => (
          <figure
            key={p.rel + i}
            tabIndex={0}
            aria-label={`${p.word} — ${p.caption}`}
            className="photo group relative h-[260px] w-[200px] shrink-0 overflow-hidden rounded-2xl border border-line bg-surface md:h-[330px] md:w-[254px]"
            style={{ transform: `rotate(${p.rotate}deg)` }}
          >
            {p.a.exists && p.a.width && p.a.height ? (
              <Image
                src={p.a.url}
                alt={p.alt}
                width={p.a.width}
                height={p.a.height}
                sizes="254px"
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="mono flex h-full w-full items-center justify-center px-4 text-center text-[0.625rem] text-fg-faint">
                awaiting: {p.rel}
              </span>
            )}

            <figcaption className="photo-word pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-2 px-5 text-center">
              <span className="h-display text-[1.35rem] text-white">{p.word}</span>
              <span className="mono text-[0.625rem] leading-relaxed text-white/80">
                {p.caption}
              </span>
            </figcaption>
          </figure>
        ))}
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-14 bg-gradient-to-r from-bg to-transparent md:w-28"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 w-14 bg-gradient-to-l from-bg to-transparent md:w-28"
      />
    </div>
  );
}
