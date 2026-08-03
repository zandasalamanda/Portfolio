import spectrum from './spectrum.json';
import { awardPageUrl, productById, type Receipt } from './site';

/**
 * The unified project registry for the studio site. Every entry is real and
 * sourced (products from §12 + captures; lab/games from the client's own
 * repos and write-ups). Tiers size the cards; every project is present —
 * the wall itself is the point.
 */
export type CardTier = 'flagship' | 'product' | 'lab' | 'game';

export interface ProjectCard {
  id: string;
  name: string;
  tier: CardTier;
  status?: string;
  line: string;
  tags: string;
  /** per-card identity accent (from the product's real palette) */
  accent: string;
  /** optional second accent for gradient edges (ChronoIQ spectrum only) */
  accent2?: string;
  image?: { rel: string; alt: string };
  sprite?: { rel: string; alt: string };
  links: Receipt[];
  award?: string;
}

const chronoiq = productById('chronoiq');
const bandr = productById('bandr');
const solaspace = productById('solaspace');
const everdeck = productById('everdeck');

export const projectCards: ProjectCard[] = [
  {
    id: 'chronoiq',
    name: 'ChronoIQ',
    tier: 'flagship',
    status: 'live',
    line: chronoiq.description,
    tags: 'Next.js · TypeScript · Cloudflare D1 · Google APIs · Gemini · Claude · Stripe',
    accent: spectrum.coral,
    accent2: spectrum.violet,
    image: {
      rel: 'chronoiq/shot-dashboard.png',
      alt: "ChronoIQ dashboard: today's plan with scheduled study blocks on a timeline",
    },
    links: [
      { label: 'chronoiq.dev', url: 'https://chronoiq.dev' },
      { label: 'award page', url: awardPageUrl },
    ],
    award: 'Congressional App Challenge winner — NJ-07, 2025',
  },
  {
    id: 'solaspace',
    name: 'Solaspace',
    tier: 'flagship',
    status: 'live',
    line: solaspace.description,
    tags: 'Next.js · TypeScript · Supabase · Clerk · Stripe · AI planning',
    accent: '#e6b877',
    image: {
      rel: 'solaspace/shot-map.png',
      alt: 'Solaspace living goal map: connected goal nodes on a dark canvas',
    },
    links: [
      { label: 'solaspace.app', url: 'https://solaspace.app' },
      { label: 'source', url: 'https://github.com/zandasalamanda/Aether' },
    ],
  },
  {
    id: 'atlas',
    name: 'Atlas Space',
    tier: 'flagship',
    status: 'built at UTR Global',
    line: 'An AI workspace for telecom-expense operations — drop in a bill or spreadsheet and work in plain English: ask, audit, reconcile lines, check rates, compare months, fix files.',
    tags: 'AI workspace · document + spreadsheet intelligence · light/dark themes',
    accent: '#5d7cc9',
    image: {
      rel: 'atlas/atlas-light.png',
      alt: 'Atlas Space: an AI assistant with tools to check bills, audit, reconcile lines, check rates, compare months, and fix spreadsheets',
    },
    links: [],
  },
  {
    id: 'everdeck',
    name: 'Everdeck',
    tier: 'product',
    status: 'private preview',
    line: everdeck.description,
    tags: 'Next.js · Supabase Edge Functions · Google Places · Gemini',
    accent: '#c9bbff',
    image: {
      rel: 'everdeck/shot-deck.png',
      alt: 'Everdeck: a deck of scored business-opportunity cards',
    },
    links: [{ label: 'everdeck.app — private preview', url: 'https://everdeck.app' }],
  },
  {
    id: 'bandr',
    name: 'Bandr',
    tier: 'product',
    status: 'open source',
    line: bandr.description,
    tags: 'React · TypeScript · Vite · PWA · rule engine',
    accent: '#28e07a',
    image: {
      rel: 'bandr/shot-home.png',
      alt: 'Bandr on a phone: ranked money moves with open scores',
    },
    links: [{ label: 'source', url: 'https://github.com/zandasalamanda/Bandr' }],
  },
  {
    id: 'yasabo',
    name: 'Ya Sabo',
    tier: 'product',
    status: 'in development',
    line: 'A judgment-free Spanish-comprehension app for “no sabo” heritage speakers — real Colombian voices, slang, and speed. Installable PWA, fully on-device.',
    tags: 'React · Vite · TypeScript · PWA · on-device',
    accent: '#fb5b3d',
    image: {
      rel: 'yasabo/shot-loop.png',
      alt: 'Ya Sabo: a listening rep with the slang phrase highlighted in the transcript',
    },
    links: [],
  },
  {
    id: 'libero',
    name: 'Libero',
    tier: 'lab',
    line: 'A real-time AI ball tracker — YOLOv8 fused with color detection over live screen capture, with an on-screen overlay.',
    tags: 'Python · YOLOv8 · OpenCV',
    accent: '#9cd6ff',
    links: [{ label: 'source', url: 'https://github.com/zandasalamanda/Libero' }],
  },
  {
    id: 'verbalist',
    name: 'Verbalist',
    tier: 'lab',
    line: 'An interactive speech coach that flags filler words, brainrot, and jargon as you speak.',
    tags: 'JavaScript · Node',
    accent: '#b5f5d8',
    links: [{ label: 'source', url: 'https://github.com/zandasalamanda/Verbalist' }],
  },
  {
    id: 'astrovia',
    name: 'Astrovia',
    tier: 'lab',
    line: 'A 3D solar-system simulation built in Python for the NASA App Development Challenge.',
    tags: 'Python · Ursina',
    accent: '#ffc24b',
    links: [
      { label: 'source', url: 'https://github.com/zandasalamanda/Astrovia-NASA-ADC' },
    ],
  },
  {
    id: 'tharthar',
    name: 'The Legend of TharThar II',
    tier: 'game',
    status: 'HACKMCST 2024',
    line: 'A tile-based tower defense — heroes vs. real cyber threats like Trojans and Worms. All visuals and code from scratch.',
    tags: 'Java · Processing',
    accent: '#c77dff',
    sprite: {
      rel: 'artifacts/tharthar-hero.gif',
      alt: 'Pixel-art hero from The Legend of TharThar II',
    },
    links: [],
  },
  {
    id: 'king',
    name: 'Please Impress The King',
    tier: 'game',
    status: 'SkillsUSA',
    line: "A retro turn-based comedy RPG — a failed squire's last chance at knighthood.",
    tags: 'Unity · C# · Aseprite',
    accent: '#4a8c3f',
    sprite: {
      rel: 'artifacts/king-knight.png',
      alt: 'Pixel-art knight from Please Impress The King',
    },
    links: [],
  },
  {
    id: 'flatearthrz',
    name: 'FLAT-EARTHRZ',
    tier: 'game',
    line: 'A two-player co-op survival game — harvest floating islands, leap the void, craft to fill orders.',
    tags: 'JavaScript · Canvas',
    accent: '#9cd6ff',
    sprite: {
      rel: 'artifacts/flatearthrz-alien.gif',
      alt: 'Pixel-art alien worker from FLAT-EARTHRZ',
    },
    links: [{ label: 'source', url: 'https://github.com/zandasalamanda/GJ26' }],
  },
  {
    id: 'volleyball',
    name: 'Volleyball 1',
    tier: 'game',
    line: '2D retro volleyball against a smart AI — real ball physics: gravity, elasticity, drag.',
    tags: 'Java · Processing',
    accent: '#5adcdc',
    sprite: {
      rel: 'artifacts/volleyball-spike.gif',
      alt: 'Pixel-art volleyball player mid-spike',
    },
    links: [],
  },
  {
    id: 'pipkin',
    name: 'Pipkin Parade',
    tier: 'game',
    line: 'A Lemmings-inspired puzzler — guide the parade with Builder, Blocker, Digger, and Floater abilities.',
    tags: 'JavaScript · Canvas',
    accent: '#ff80b0',
    sprite: { rel: 'artifacts/pipkin-idle.png', alt: 'Pixel-art pink Pipkin' },
    links: [],
  },
];

export const featuredCards = projectCards.filter((c) => c.tier === 'flagship');

/** Real captures for the home marquee — every frame is a real product. */
export const marqueeShots = [
  { rel: 'chronoiq/shot-dashboard.png', alt: 'ChronoIQ dashboard', label: 'chronoiq.dev' },
  { rel: 'solaspace/shot-map.png', alt: 'Solaspace goal map', label: 'solaspace.app' },
  { rel: 'atlas/atlas-dark.png', alt: 'Atlas Space, dark theme', label: 'Atlas Space' },
  { rel: 'bandr/shot-home.png', alt: 'Bandr on a phone', label: 'Bandr' },
  { rel: 'everdeck/shot-deck.png', alt: 'Everdeck prospect deck', label: 'everdeck.app' },
  { rel: 'yasabo/shot-home.png', alt: 'Ya Sabo home', label: 'Ya Sabo' },
] as const;
