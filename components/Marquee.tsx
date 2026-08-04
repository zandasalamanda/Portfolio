import Image from 'next/image';
import { marqueeShots } from '@/content/cards';
import { asset } from '@/lib/assets';

/**
 * A drifting band of real product captures — the "these all exist" proof,
 * shown before a single word of pitch. Pauses on hover; static under
 * prefers-reduced-motion.
 */
export default function Marquee() {
  const shots = marqueeShots
    .map((s) => ({ ...s, a: asset(s.rel) }))
    .filter((s) => s.a.exists && s.a.width && s.a.height);
  if (shots.length === 0) return null;
  const doubled = [...shots, ...shots];

  return (
    <div
      className="strip relative overflow-hidden py-2"
      role="img"
      aria-label="Screenshots of shipped work: ChronoIQ, Solaspace, Atlas Space, Bandr, Everdeck, and Ya Sabo"
    >
      <div className="strip-track flex w-max gap-5">
        {doubled.map((s, i) => (
          <figure
            key={s.rel + i}
            aria-hidden
            className="relative w-[280px] shrink-0 overflow-hidden rounded-xl border border-line bg-bg md:w-[380px]"
          >
            <Image
              src={s.a.url}
              alt=""
              width={s.a.width ?? 800}
              height={s.a.height ?? 500}
              sizes="380px"
              className="aspect-[16/10] h-auto w-full object-cover object-top opacity-90"
            />
            <figcaption className="mono absolute bottom-0 left-0 bg-bg/80 px-2.5 py-1 text-[0.625rem] text-fg-soft backdrop-blur-sm">
              {s.label}
            </figcaption>
          </figure>
        ))}
      </div>
      {/* edge fades keep the band feeling infinite */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-bg to-transparent md:w-28"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-bg to-transparent md:w-28"
      />
    </div>
  );
}
