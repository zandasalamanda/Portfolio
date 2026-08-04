import {
  Archivo,
  Inter,
  Instrument_Serif,
  Outfit,
  Sora,
  Space_Grotesk,
} from 'next/font/google';

/**
 * The typefaces the apps are actually set in, read out of each project's own
 * source. A card titles its product in that product's face, so the gallery
 * reads as seven products rather than one template.
 *
 * Only the one weight each card needs, latin-subset, and `preload: false` —
 * these sit below the fold, so they must not compete with the hero for
 * bandwidth. Where an app uses a font that isn't on Google Fonts, the note
 * says what it really uses and what stands in for it.
 */

/** ChronoIQ — next/font/google Inter, ChronoIQ-main/src/app/layout.tsx:11-24 */
const inter = Inter({ subsets: ['latin'], weight: ['700'], display: 'swap', preload: false });

/** Solaspace — Sora 600, its own globals.css */
const sora = Sora({ subsets: ['latin'], weight: ['600'], display: 'swap', preload: false });

/** Everdeck — Instrument Serif italic, its landing type */
const instrument = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: 'italic',
  display: 'swap',
  preload: false,
});

/** Bandr — Space Grotesk 700 */
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['700'],
  display: 'swap',
  preload: false,
});

/** Verbalist — Archivo 700, SpanishApp/style.css:347 */
const archivo = Archivo({ subsets: ['latin'], weight: ['700'], display: 'swap', preload: false });

/**
 * Ya Sabo — really set in Clash Display (Fontshare, self-hosted). That isn't on
 * Google Fonts and isn't worth a second font host for one card title, so Outfit
 * stands in: the same geometric display character.
 */
const outfit = Outfit({ subsets: ['latin'], weight: ['600'], display: 'swap', preload: false });

export const appFonts: Record<string, string> = {
  chronoiq: inter.className,
  solaspace: sora.className,
  everdeck: instrument.className,
  bandr: spaceGrotesk.className,
  verbalist: archivo.className,
  yasabo: outfit.className,
  /* Atlas Space is internal; no source was reachable to read a face from, so it
     keeps the site's own display type rather than inventing one. */
  atlas: 'h-display',
};
