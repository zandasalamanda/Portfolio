'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

/**
 * Click-to-load facade (§6.2): a static poster via next/image; the
 * youtube-nocookie iframe injects only on click. No YouTube JS loads before
 * interaction. Focus moves to the iframe when it replaces the button.
 */
export default function VideoFacade({
  videoId,
  poster,
  title,
}: {
  videoId: string;
  poster: { exists: boolean; url: string; width?: number | null; height?: number | null };
  title: string;
}) {
  const [playing, setPlaying] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  // The caption is visible *and* part of the button's accessible name, so someone
  // driving the page by voice can say the words they can actually see.
  const hint = 'plays on click';

  useEffect(() => {
    if (playing) iframeRef.current?.focus();
  }, [playing]);

  if (playing) {
    return (
      <div className="aspect-video overflow-hidden rounded-[6px] bg-void">
        <iframe
          ref={iframeRef}
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1`}
          title={title}
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
          className="h-full w-full"
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      aria-label={`Play ${title} — ${hint}`}
      className="evidence-lift group relative block w-full overflow-hidden rounded-[6px] bg-void text-left"
    >
      {poster.exists && poster.width && poster.height ? (
        <Image
          src={poster.url}
          alt=""
          width={poster.width}
          height={poster.height}
          sizes="(min-width: 768px) 44vw, 100vw"
          className="block aspect-video h-auto w-full object-cover opacity-90"
        />
      ) : (
        <div className="mono flex aspect-video items-center justify-center text-[0.75rem] text-paper/50">
          awaiting: chronoiq/video-poster.jpg
        </div>
      )}
      <span className="absolute inset-0 flex items-center justify-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-paper/90 motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover:scale-105">
          <svg width="18" height="20" viewBox="0 0 18 20" aria-hidden className="ml-1">
            <path d="M0 0 L18 10 L0 20 Z" fill="#101014" />
          </svg>
        </span>
      </span>
      <span className="mono absolute bottom-3 left-3 text-[0.6875rem] text-paper/70">
        {hint}
      </span>
    </button>
  );
}
