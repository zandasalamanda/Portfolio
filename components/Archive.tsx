import Image from 'next/image';
import { archiveGames } from '@/content/site';
import { asset } from '@/lib/assets';

/**
 * The archive — earlier game work, shown as what it is: pixel art and
 * one-line write-ups adapted from the client's own project notes. The
 * sprites are the games' real assets; animated GIFs fall back to a static
 * first frame under prefers-reduced-motion (WCAG 2.2.2).
 */
function Sprite({
  rel,
  alt,
}: {
  rel: string;
  alt: string;
}) {
  const a = asset(rel);
  if (!a.exists) return null;
  const isGif = rel.endsWith('.gif');
  const still = isGif ? asset(rel.replace(/\.gif$/, '-still.png')) : null;
  const img = (src: string, cls: string) => (
    <Image
      src={src}
      alt={alt}
      width={a.width ?? 64}
      height={a.height ?? 64}
      unoptimized
      className={`pixel h-14 w-14 object-contain ${cls}`}
    />
  );
  if (isGif && still?.exists) {
    return (
      <>
        {img(a.url, 'motion-reduce:hidden')}
        {img(still.url, 'motion-safe:hidden')}
      </>
    );
  }
  return img(a.url, '');
}

export default function Archive() {
  return (
    <section aria-label="The archive" className="relative">
      <div className="mx-auto w-full max-w-[1200px] px-6 pb-20 md:px-10 md:pb-28">
        <div className="tz flex items-baseline justify-between border-t border-[var(--zone-hairline)] pt-14 md:pt-20">
          <h2 className="eyebrow tz">The archive — game work</h2>
          <p className="mono tz hidden text-[0.6875rem] text-[var(--zone-fg-soft)] sm:block">
            original pixel art throughout
          </p>
        </div>

        <ul className="mt-8 grid grid-cols-1 gap-px overflow-hidden border border-[var(--zone-hairline)] bg-[var(--zone-hairline)] sm:grid-cols-2 lg:grid-cols-5">
          {archiveGames.map((g, i) => (
            <li
              key={g.title}
              className={`tz flex flex-col gap-3 bg-[var(--zone-ground)] p-5 ${
                i === archiveGames.length - 1 && archiveGames.length % 2 === 1
                  ? 'sm:col-span-2 lg:col-span-1'
                  : ''
              }`}
            >
              <div className="flex h-16 items-center">
                {g.sprite ? (
                  <Sprite rel={g.sprite} alt={g.spriteAlt ?? ''} />
                ) : (
                  <span
                    aria-hidden
                    className="mono tz text-[0.625rem] text-[var(--zone-fg-soft)]"
                  >
                    {g.title.slice(0, 2)}
                  </span>
                )}
              </div>
              <div>
                <h3 className="font-display text-[1.0625rem] font-black leading-tight text-[var(--zone-fg)] tz">
                  {g.title}
                </h3>
                <p className="eyebrow tz mt-1 text-[0.625rem]">{g.context}</p>
              </div>
              <p className="text-[0.875rem] leading-relaxed">{g.line}</p>
              <p className="mono tz mt-auto flex items-baseline justify-between gap-2 pt-2 text-[0.6875rem] text-[var(--zone-fg-soft)]">
                {g.tags}
                {g.repo && (
                  <a
                    href={g.repo}
                    target="_blank"
                    rel="noreferrer"
                    className="link-x tz text-[var(--zone-link)]"
                  >
                    source <span aria-hidden>↗</span>
                  </a>
                )}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
