import Image from 'next/image';
import { asset } from '@/lib/assets';

/**
 * Placeholder protocol (§9): a missing asset renders a labeled hairline box
 * with the expected filename in mono — never stock, never AI imagery.
 */
export function AwaitingAsset({
  rel,
  aspect = '16 / 10',
  className = '',
}: {
  rel: string;
  aspect?: string;
  className?: string;
}) {
  return (
    <figure
      className={`tz flex items-center justify-center border border-[var(--zone-hairline)] ${className}`}
      style={{ aspectRatio: aspect }}
    >
      <figcaption className="mono text-[0.75rem] text-[var(--zone-fg-soft)] tz px-4 text-center">
        awaiting: {rel}
      </figcaption>
    </figure>
  );
}

/** §9 placeholder for a missing logo asset — compact hairline box, mono label. */
export function AwaitingLogo({ rel }: { rel: string }) {
  return (
    <span className="mono tz flex h-14 items-center border border-[var(--zone-hairline)] px-3 text-[0.625rem] text-[var(--zone-fg-soft)] md:h-[72px]">
      awaiting: {rel}
    </span>
  );
}

/**
 * Evidence frame: a minimal browser frame with the product's real domain as
 * its title, 6px radius. The chrome is zone-aware (--frame-* in globals.css)
 * so a light screenshot on the warm ChronoIQ ground reads as a mounted
 * document rather than a dark mass punched into the page.
 */
export function Frame({
  rel,
  alt,
  domain,
  sizes,
  aspect,
  priority = false,
  className = '',
  /** Optional calendar-block edge tint (ChronoIQ zone) */
  edge,
}: {
  rel: string;
  alt: string;
  domain: string;
  sizes?: string;
  /** Fallback aspect ratio for the placeholder when the asset is missing */
  aspect?: string;
  priority?: boolean;
  className?: string;
  edge?: string;
}) {
  const a = asset(rel);
  if (!a.exists || !a.width || !a.height) {
    return <AwaitingAsset rel={rel} aspect={aspect} className={className} />;
  }
  return (
    <figure
      className={`evidence-lift tz overflow-hidden rounded-[6px] bg-[var(--frame-bg)] shadow-[0_1px_0_var(--frame-ring)_inset,0_0_0_1px_var(--frame-ring)] ${className}`}
      style={edge ? { borderLeft: `2px solid ${edge}` } : undefined}
    >
      <div className="flex items-center px-3 py-[7px]">
        <span className="mono tz text-[0.6875rem] leading-none text-[var(--frame-label)]">
          {domain}
        </span>
      </div>
      <Image
        src={a.url}
        alt={alt}
        width={a.width}
        height={a.height}
        sizes={sizes}
        priority={priority}
        className="block h-auto w-full"
      />
    </figure>
  );
}
