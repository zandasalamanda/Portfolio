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
    links: [{ label: 'source', url: 'https://github.com/zandasalamanda/Verbalist' }],
  },
  {
    id: 'tharthar',
    name: 'The Legend of TharThar II',
    status: 'HACKMCST 2024',
    line: 'A tile-based tower defense — heroes against real cyber threats like Trojans and Worms. Every sprite and system built from scratch.',
    tags: ['Java', 'Processing', 'Tower defense'],
    accent: '#c77dff',
    drawn: 'game',
    sprite: {
      rel: 'artifacts/tharthar-hero.gif',
      alt: 'Pixel-art hero from The Legend of TharThar II',
    },
    links: [],
  },
  {
    id: 'king',
    name: 'Please Impress The King',
    status: 'SkillsUSA',
    line: "A retro turn-based comedy RPG — a failed squire's last chance at knighthood, inspired by Stardew Valley and King's Quest.",
    tags: ['Unity', 'C#', 'Aseprite'],
    accent: '#8ed17f',
    drawn: 'game',
    sprite: {
      rel: 'artifacts/king-knight.png',
      alt: 'Pixel-art knight from Please Impress The King',
    },
    links: [],
  },
  {
    id: 'flatearthrz',
    name: 'FLAT-EARTHRZ',
    status: 'co-op',
    line: 'A two-player survival game — harvest floating islands, leap the void, and craft to fill construction orders.',
    tags: ['JavaScript', 'Canvas', 'Co-op'],
    accent: '#9cd6ff',
    drawn: 'game',
    sprite: {
      rel: 'artifacts/flatearthrz-alien.gif',
      alt: 'Pixel-art alien worker from FLAT-EARTHRZ',
    },
    links: [{ label: 'source', url: 'https://github.com/zandasalamanda/GJ26' }],
  },
  {
    id: 'volleyball',
    name: 'Volleyball 1',
    status: 'arcade',
    line: '2D retro volleyball against a smart AI opponent — real ball physics: gravity, elasticity, and drag.',
    tags: ['Java', 'Processing', 'Physics'],
    accent: '#5adcdc',
    drawn: 'game',
    sprite: {
      rel: 'artifacts/volleyball-spike.gif',
      alt: 'Pixel-art volleyball player mid-spike',
    },
    links: [],
  },
  {
    id: 'pipkin',
    name: 'Pipkin Parade',
    status: 'puzzle',
    line: 'A Lemmings-inspired puzzler — guide the parade with Builder, Blocker, Digger, and Floater abilities.',
    tags: ['JavaScript', 'Canvas', 'Puzzle'],
    accent: '#ff9ec4',
    drawn: 'game',
    sprite: { rel: 'artifacts/pipkin-idle.png', alt: 'Pixel-art pink Pipkin' },
    links: [],
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
