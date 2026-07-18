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
    <span
      className="mono tz flex h-14 items-center border border-[var(--zone-hairline)] px-3 text-[0.625rem] text-[var(--zone-fg-soft)] md:h-[72px]"
    >
      awaiting: {rel}
    </span>
  );
}

/**
 * Evidence frame (§3): screenshots sit in minimal --void browser frames,
 * 6px radius max, with the product's real domain as the frame's title.
 */
export function Frame({
  rel,
  alt,
  domain,
  sizes,
  aspect,
  priority = false,
  className = '',
}: {
  rel: string;
  alt: string;
  domain: string;
  sizes?: string;
  /** Fallback aspect ratio for the placeholder when the asset is missing */
  aspect?: string;
  priority?: boolean;
  className?: string;
}) {
  const a = asset(rel);
  if (!a.exists || !a.width || !a.height) {
    return <AwaitingAsset rel={rel} aspect={aspect} className={className} />;
  }
  return (
    <figure
      className={`evidence-lift overflow-hidden rounded-[6px] bg-void ring-1 ring-white/[0.08] ${className}`}
    >
      <div className="flex items-center px-3 py-[7px]">
        <span className="mono text-[0.6875rem] leading-none text-paper/50">
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
