import Image from 'next/image';
import type { ResolvedAsset } from '@/lib/assets';

/**
 * A card's tour of its own screens: frames sit side by side on a track that
 * glides from one to the next, holds, and rewinds at the end — a slide
 * carousel, not a crossfade. Pure CSS (see .slide-track); pauses while
 * hovered, and under reduced motion the first frame simply stays.
 *
 * mode 'cover' fills a fixed-height window (browser frames, client cards);
 * mode 'natural' lets the image set the height (the phone frames).
 */
export default function ScreenSlide({
  frames,
  alt,
  sizes,
  priority = false,
  mode = 'cover',
  coverFit = 'object-cover object-top',
}: {
  frames: ResolvedAsset[];
  alt: string;
  sizes: string;
  priority?: boolean;
  mode?: 'cover' | 'natural';
  coverFit?: string;
}) {
  const shown = frames.slice(0, 4);
  const n = shown.length;
  const cover = mode === 'cover';
  return (
    <div
      className={`slide-track flex ${cover ? 'h-full' : ''} ${n > 1 ? `slide-n${n}` : ''}`}
      style={{ width: `${n * 100}%` }}
    >
      {shown.map((f, i) => (
        <div
          key={f.rel}
          className={`shrink-0 ${cover ? 'h-full' : ''}`}
          style={{ width: `${100 / n}%` }}
        >
          <Image
            src={f.url}
            alt={i === 0 ? alt : ''}
            aria-hidden={i > 0 || undefined}
            width={f.width ?? 1600}
            height={f.height ?? 1000}
            sizes={sizes}
            priority={priority && i === 0}
            loading={i === 0 ? undefined : 'lazy'}
            className={cover ? `h-full w-full ${coverFit}` : 'block h-auto w-full'}
          />
        </div>
      ))}
    </div>
  );
}
