import spectrum from './spectrum.json';
import { awardPageUrl, productById, type Receipt } from './site';

/**
 * One ordered gallery — best work first, everything present, every entry the
 * same species of card. Each carries its own logo (real file where one
 * exists, drawn glyph otherwise) and accent so the wall reads as a set.
 */
export interface ProjectCard {
  id: string;
  name: string;
  status?: string;
  line: string;
  tags: string[];
  accent: string;
  accent2?: string;
  /** real logo file under content/assets */
  logo?: string;
  /** logo needs a white tile to read on the dark ground */
  logoTile?: boolean;
  /** id of a drawn glyph in components/Marks when there is no logo */
  drawn?: string;
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
    status: 'live',
    line: chronoiq.description,
    tags: ['Next.js', 'TypeScript', 'Cloudflare D1', 'Google APIs', 'Gemini', 'Claude', 'Stripe'],
    accent: spectrum.coral,
    accent2: spectrum.violet,
    logo: 'chronoiq/logo.png',
    image: {
      rel: 'chronoiq/shot-dashboard.png',
      alt: "ChronoIQ dashboard: today's plan with scheduled study blocks on a timeline",
    },
    links: [
      { label: 'chronoiq.dev', url: 'https://chronoiq.dev' },
      { label: 'award', url: awardPageUrl },
    ],
    award: 'Congressional App Challenge winner — NJ-07, 2025',
  },
  {
    id: 'solaspace',
    name: 'Solaspace',
    status: 'live',
    line: solaspace.description,
    tags: ['Next.js', 'TypeScript', 'Supabase', 'Clerk', 'Stripe', 'AI planning'],
    accent: '#e6b877',
    logo: 'solaspace/logo.svg',
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
    status: 'built at UTR Global',
    line: 'An AI workspace for telecom-expense operations — drop in a bill or spreadsheet and work in plain English: ask, audit, reconcile lines, check rates, compare months, fix files.',
    tags: ['AI workspace', 'Document + spreadsheet AI', 'Light + dark themes'],
    accent: '#8fa6e8',
    logo: 'logos/utr.png',
    logoTile: true,
    drawn: 'atlas',
    image: {
      rel: 'atlas/atlas-light.png',
      alt: 'Atlas Space: an AI assistant with tools to check bills, audit, reconcile lines, check rates, and fix spreadsheets',
    },
    links: [],
  },
  {
    id: 'everdeck',
    name: 'Everdeck',
    status: 'private preview',
    line: everdeck.description,
    tags: ['Next.js', 'Supabase Edge Functions', 'Google Places', 'Gemini'],
    accent: '#c9bbff',
    logo: 'everdeck/logo.svg',
    image: {
      rel: 'everdeck/shot-deck.png',
      alt: 'Everdeck: a deck of scored business-opportunity cards',
    },
    links: [{ label: 'everdeck.app', url: 'https://everdeck.app' }],
  },
  {
    id: 'bandr',
    name: 'Bandr',
    status: 'open source',
    line: bandr.description,
    tags: ['React', 'TypeScript', 'Vite', 'PWA', 'Rule engine'],
    accent: '#7ee8a8',
    drawn: 'bandr',
    image: {
      rel: 'bandr/shot-home.png',
      alt: 'Bandr on a phone: ranked money moves with open scores',
    },
    links: [{ label: 'source', url: 'https://github.com/zandasalamanda/Bandr' }],
  },
  {
    id: 'yasabo',
    name: 'Ya Sabo',
    status: 'in development',
    line: 'A judgment-free Spanish-comprehension app for “no sabo” heritage speakers — real Colombian voices, slang, and speed. Installable PWA, fully on-device.',
    tags: ['React', 'Vite', 'TypeScript', 'PWA', 'On-device'],
    accent: '#fb8a6d',
    drawn: 'yasabo',
    image: {
      rel: 'yasabo/shot-loop.png',
      alt: 'Ya Sabo: a listening rep with the slang phrase highlighted in the transcript',
    },
    links: [],
  },
  {
    id: 'verbalist',
    name: 'Verbalist',
    status: 'open source',
    line: 'An interactive speech coach that flags filler words, brainrot, and jargon as you speak.',
    tags: ['JavaScript', 'Node', 'Speech'],
    accent: '#b3a6ff',
    logo: 'logos/verbalist.png',
    image: {
      rel: 'verbalist/shot-app.png',
      alt: 'Verbalist analysing a spoken passage: filler words and jargon highlighted in the live transcript, with a speech-integrity score and word metrics',
    },
    links: [{ label: 'source', url: 'https://github.com/zandasalamanda/Verbalist' }],
  },
  {
    id: 'libero',
    name: 'Libero',
    status: 'computer vision',
    line: 'A real-time AI ball tracker — YOLOv8 fused with colour detection over live screen capture, with an on-screen overlay.',
    tags: ['Python', 'YOLOv8', 'OpenCV'],
    accent: '#7fd4ff',
    drawn: 'libero',
    links: [{ label: 'source', url: 'https://github.com/zandasalamanda/Libero' }],
  },
];

export const featuredCards = projectCards.slice(0, 3);

/** Real captures for the home strip. */
export const marqueeShots = [
  { rel: 'chronoiq/shot-dashboard.png', alt: 'ChronoIQ dashboard', label: 'chronoiq.dev' },
  { rel: 'solaspace/shot-map.png', alt: 'Solaspace goal map', label: 'solaspace.app' },
  { rel: 'atlas/atlas-dark.png', alt: 'Atlas Space, dark theme', label: 'Atlas Space' },
  { rel: 'bandr/shot-home.png', alt: 'Bandr on a phone', label: 'Bandr' },
  { rel: 'everdeck/shot-deck.png', alt: 'Everdeck prospect deck', label: 'everdeck.app' },
  { rel: 'yasabo/shot-home.png', alt: 'Ya Sabo home', label: 'Ya Sabo' },
] as const;
