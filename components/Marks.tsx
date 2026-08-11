import Image from 'next/image';
import { asset } from '@/lib/assets';

/**
 * Drawn marks for projects that have no logo file. Simple, monochrome-ish
 * glyphs that take the project's accent so every card carries an identity.
 */
const DRAWN: Record<string, (c: string) => React.ReactNode> = {
  // Libero — an AI ball tracker: a ball inside tracking brackets
  libero: (c) => (
    <>
      <path
        d="M6 3.5H3.5V6M18 3.5h2.5V6M6 20.5H3.5V18M18 20.5h2.5V18"
        stroke={c}
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="12" cy="12" r="4.25" stroke={c} strokeWidth="1.5" fill="none" />
      <path d="M8.2 10.4c2.6.5 5 2.2 6.4 4.6" stroke={c} strokeWidth="1.2" fill="none" />
      <circle cx="12" cy="12" r="1" fill={c} />
    </>
  ),
  // Bandr — earning: a coin with a spark
  bandr: (c) => (
    <>
      <circle cx="11" cy="13" r="6.5" stroke={c} strokeWidth="1.5" fill="none" />
      <path
        d="M11 9.8v6.4M9.2 11.2h3a1.4 1.4 0 0 1 0 2.8h-2.6a1.4 1.4 0 0 0 0 2.8h3"
        stroke={c}
        strokeWidth="1.3"
        strokeLinecap="round"
        fill="none"
      />
      <path d="M18.5 4.2l.7 1.9 1.9.7-1.9.7-.7 1.9-.7-1.9-1.9-.7 1.9-.7z" fill={c} />
    </>
  ),
  // Ya Sabo — speech, with sound waves
  yasabo: (c) => (
    <>
      <path
        d="M4 6.5A2.5 2.5 0 0 1 6.5 4h7A2.5 2.5 0 0 1 16 6.5v5A2.5 2.5 0 0 1 13.5 14H9l-3.5 3v-3H6.5A2.5 2.5 0 0 1 4 11.5z"
        stroke={c}
        strokeWidth="1.5"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M18.4 7.6a4.6 4.6 0 0 1 0 6.6M20.6 5.4a7.8 7.8 0 0 1 0 11"
        stroke={c}
        strokeWidth="1.4"
        strokeLinecap="round"
        fill="none"
      />
    </>
  ),
  // Atlas Space — a compass rose (the product's own mascot motif)
  atlas: (c) => (
    <>
      <circle cx="12" cy="12" r="7.5" stroke={c} strokeWidth="1.5" fill="none" />
      <path d="M12 2.6v3M12 18.4v3M2.6 12h3M18.4 12h3" stroke={c} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M9.3 14.7l2-4.6 4.6-2-2 4.6z" fill={c} />
    </>
  ),
  // Neuromaker — a brain in two hemispheres
  neuro: (c) => (
    <>
      <path d="M12 3.2c-2.4 0-4 1.5-4 3.1 -1.7.3-2.8 1.6-2.8 3 0 .9.4 1.7 1.1 2.2 -.6.5-1 1.3-1 2.1 0 1.6 1.4 2.9 3.1 2.9 .3 1.4 1.8 2.3 3.6 2.3z" stroke={c} strokeWidth="1.5" fill="none" strokeLinejoin="round" />
      <path d="M12 3.2c2.4 0 4 1.5 4 3.1 1.7.3 2.8 1.6 2.8 3 0 .9-.4 1.7-1.1 2.2 .6.5 1 1.3 1 2.1 0 1.6-1.4 2.9-3.1 2.9 -.3 1.4-1.8 2.3-3.6 2.3z" stroke={c} strokeWidth="1.5" fill="none" strokeLinejoin="round" />
      <path d="M12 3.2v17.6" stroke={c} strokeWidth="1.5" />
    </>
  ),
  // the market terminal — a chart in a frame
  terminal: (c) => (
    <>
      <path d="M4 4h16v16H4z" stroke={c} strokeWidth="1.6" fill="none" />
      <path d="M7 14l3-3 2.5 2L17 8" stroke={c} strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M17 8h-2.6M17 8v2.6" stroke={c} strokeWidth="1.6" fill="none" strokeLinecap="round" />
    </>
  ),
  // Games — a controller
  game: (c) => (
    <>
      <path
        d="M7.5 8h9a4.5 4.5 0 0 1 4.4 5.4l-.6 3A3 3 0 0 1 15.5 17l-1-1.2h-5L8.5 17a3 3 0 0 1-4.8-.6l-.6-3A4.5 4.5 0 0 1 7.5 8z"
        stroke={c}
        strokeWidth="1.5"
        fill="none"
      />
      <path d="M7.4 11v2.6M6.1 12.3h2.6" stroke={c} strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="16" cy="11.8" r="1" fill={c} />
      <circle cx="17.6" cy="13.6" r="1" fill={c} />
    </>
  ),
};

export function DrawnMark({
  id,
  accent,
  className = 'h-5 w-5',
}: {
  id: string;
  accent: string;
  className?: string;
}) {
  const draw = DRAWN[id] ?? DRAWN.game;
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className}>
      {draw(accent)}
    </svg>
  );
}

/**
 * A project's mark: the real logo file when one exists, otherwise a drawn
 * glyph in the project's accent. Light logos get a white tile so they read.
 */
export function ProjectMark({
  logo,
  drawn,
  accent,
  name,
  tile = false,
}: {
  logo?: string;
  drawn?: string;
  accent: string;
  name: string;
  tile?: boolean;
}) {
  const a = logo ? asset(logo) : null;
  if (a?.exists) {
    return (
      <span
        className={`flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-lg ${
          tile ? 'bg-white p-1' : 'border border-line bg-white/[0.04] p-1'
        }`}
      >
        <Image
          src={a.url}
          alt={`${name} logo`}
          width={a.width ?? 32}
          height={a.height ?? 32}
          /* the mark only ever draws in a 32px box — without this the browser
             picks the 2048px variant off the srcset and spends 27 KB on it */
          sizes="32px"
          unoptimized={a.url.endsWith('.svg')}
          className="h-full w-full object-contain"
        />
      </span>
    );
  }
  return (
    <span
      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border"
      style={{ borderColor: `${accent}44`, background: `${accent}12` }}
    >
      <DrawnMark id={drawn ?? 'game'} accent={accent} />
    </span>
  );
}
