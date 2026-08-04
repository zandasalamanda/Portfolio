import { appFonts } from './app-fonts';

/**
 * What each app actually looks like, read out of its own source rather than
 * invented — see the citation on each entry. The gallery uses these so a card
 * feels like a page from that product instead of a uniform tile.
 *
 * `primary` is the app's real signature colour and is used for surfaces the
 * eye reads as colour: the top rule, the glow, the status dot. `ink` is what
 * text is set in — several apps sign with a colour that is legible on their
 * own white but not on this near-black, so those get a lightened tint of the
 * same hue. Everything else uses `primary` directly.
 */
export interface AppBrand {
  /** the app's real signature colour */
  primary: string;
  /** the same hue, but readable as text on the dark card */
  ink: string;
  /** the ground its screenshot stands on — the app's own background */
  stage: string;
  /** two-stop rule across the top, where the product really uses one */
  gradient?: [string, string];
  /** next/font class for the app's own display face */
  fontClass: string;
  weight: number;
  tracking: string;
  radius: string;
  /** what the window chrome is labelled with */
  label?: string;
}

const fallback: AppBrand = {
  primary: '#b3a6ff',
  ink: '#b3a6ff',
  stage: '#0d0d10',
  fontClass: 'h-display',
  weight: 900,
  tracking: '-0.01em',
  radius: '0.875rem',
};

const brands: Record<string, AppBrand> = {
  /* ChronoIQ-main/src/app/globals.css:24 --primary 262 72% 55% (brand violet);
     :47-49 brand coral + violet are the logo gradient; :18 background #FBFBFB.
     Face: Inter, layout.tsx:13. */
  chronoiq: {
    primary: '#763adf',
    ink: '#ab8bf5',
    stage: '#fbfbfb',
    gradient: ['#ff8d5c', '#a855f7'],
    fontClass: appFonts.chronoiq,
    weight: 700,
    tracking: '-0.02em',
    radius: '0.875rem',
    label: 'chronoiq.dev',
  },
  /* Solaspace: Sora 600 (app/layout.tsx), champagne gold on near-black. */
  solaspace: {
    primary: '#e6b877',
    ink: '#e6b877',
    stage: '#0a0b0d',
    fontClass: appFonts.solaspace,
    weight: 600,
    tracking: '-0.01em',
    radius: '1.125rem',
    label: 'solaspace.app',
  },
  /* Atlas Space is internal — no source was reachable, so it keeps the site's
     own face and the blue already used for it across the site. */
  atlas: {
    primary: '#8fa6e8',
    ink: '#8fa6e8',
    stage: '#f4f6fb',
    fontClass: appFonts.atlas,
    weight: 900,
    tracking: '-0.01em',
    radius: '1rem',
    label: 'Atlas Space',
  },
  /* Everdeck: Instrument Serif italic display, lilac #C9BBFF on #0A0A0B. */
  everdeck: {
    primary: '#c9bbff',
    ink: '#c9bbff',
    stage: '#0a0a0b',
    fontClass: appFonts.everdeck,
    weight: 400,
    tracking: '0',
    radius: '1.25rem',
    label: 'everdeck.app',
  },
  /* Bandr: tailwind.config.js:69 display Space Grotesk; green #3DC489 on #0E1412. */
  bandr: {
    primary: '#3dc489',
    ink: '#5fd8a2',
    stage: '#0e1412',
    fontClass: appFonts.bandr,
    weight: 700,
    tracking: '-0.01em',
    radius: '1.25rem',
    label: 'Bandr',
  },
  /* YaSaboApp/src/design/tokens.css:8 --coral #fb5b3d; a light, warm app. */
  yasabo: {
    primary: '#fb5b3d',
    ink: '#ff8163',
    stage: '#fff7f1',
    fontClass: appFonts.yasabo,
    weight: 600,
    tracking: '-0.01em',
    radius: '1.375rem',
    label: 'Ya Sabo',
  },
  /* SpanishApp/style.css:347 wordmark Archivo 700; red on-air tally on near-black. */
  verbalist: {
    primary: '#ff4a3d',
    ink: '#ff7a70',
    stage: '#07080a',
    fontClass: appFonts.verbalist,
    weight: 700,
    tracking: '-0.015em',
    radius: '1rem',
    label: 'Verbalist',
  },
};

export function brandFor(id: string): AppBrand {
  return brands[id] ?? fallback;
}
