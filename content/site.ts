// Single source of truth for every fact on the site.
// Core facts trace to §12 of the build brief (Facts Appendix); additions are
// sourced from the client's own repos, write-ups, and app captures — each
// noted inline. Do not add claims, metrics, or URLs without a source.

export type ProductStatus = 'live' | 'private preview' | 'open source';

export interface Receipt {
  label: string;
  url: string;
}

export interface Product {
  id: 'chronoiq' | 'bandr' | 'solaspace' | 'everdeck';
  number: '01' | '02' | '03' | '04';
  name: string;
  status: ProductStatus;
  /** Display date, e.g. "DEC 2025" */
  date: string;
  description: string;
  decisionsNote: string;
  techLine: string;
  receipts: Receipt[];
  credit?: string;
  tagline?: string;
}

export const identity = {
  name: 'Zander Leon',
  school:
    'Morris County School of Technology, Academy for Computer & Information Sciences',
  classOf: '2026',
  email: 'zander.leon@gmail.com',
  github: 'https://github.com/zandasalamanda',
  githubHandle: 'github/zandasalamanda',
  // Real profile confirmed by the client (the bare /in/zanderleon vanity URL
  // belongs to a different person, so the full handle is required here).
  linkedin: 'https://www.linkedin.com/in/zander-leon-0b2a412b2/',
} as const;

export const positioning = {
  /** §6.1 exact copy; the ¹ renders as a real footnote fed by the build-time link check */
  line: 'I build software that ships.',
  title: 'Zander Leon — I build software that ships',
  description:
    'Portfolio of Zander Leon, student developer — ChronoIQ (Congressional App Challenge winner, NJ-07 2025), Bandr, Solaspace, and Everdeck. Shipped products, live receipts.',
} as const;

export const awardPageUrl = 'https://www.congressionalappchallenge.us/25-nj07/';

/** §6.1 proof line — each item is a live link */
export const proofLine = [
  { label: '3 products shipped', href: '#work' },
  { label: "Congressional App Challenge winner '25", href: awardPageUrl },
  { label: 'github/zandasalamanda', href: identity.github },
] as const;

export const products: Product[] = [
  {
    id: 'chronoiq',
    number: '01',
    name: 'ChronoIQ',
    status: 'live',
    date: 'DEC 2025',
    description:
      'AI-powered study scheduler — syncs Google Calendar and Classroom, estimates homework time with AI, and books study blocks into real free time.',
    decisionsNote:
      "One decision I stand by: your Google sign-in is never saved to a database — it stays in your own browser and nowhere else. And the app still works with the AI switched off, falling back to its own scheduling and a practice study coach, so nothing ever breaks.",
    techLine:
      'Next.js · TypeScript · Cloudflare D1 + edge · Clerk · Google Calendar/Classroom APIs · Gemini (scheduling) · Claude (Study Coach) · Stripe',
    credit: 'Built with Maxwell Brohm.',
    receipts: [
      { label: 'chronoiq.dev', url: 'https://chronoiq.dev' },
      { label: 'official award page', url: awardPageUrl },
      {
        label: "Congressman Kean's announcement",
        url: 'https://x.com/CongressmanKean/status/2001403248838590957',
      },
      {
        label: 'WRNJ Radio',
        url: 'https://wrnjradio.com/kean-honors-7th-district-winners-of-congressional-app-challenge/',
      },
    ],
  },
  {
    // Facts: Bandr repo README + captures of the running app (31 move
    // templates counted in src/data/moves.ts; no backend, localStorage only;
    // parent-first safety in every in-person launch kit).
    id: 'bandr',
    number: '02',
    name: 'Bandr',
    status: 'open source',
    date: 'JUN 2026',
    description:
      'A mobile-first app that helps teens find safe, realistic ways to make money — and builds the exact launch plan for each one.',
    decisionsNote:
      'Every recommendation comes from a rule engine you can read — all 31 money-moves are scored openly against your skills, your age, and what you already have. No accounts, no servers: the whole app lives on your phone, and every in-person move starts with a parent check.',
    techLine: 'React · TypeScript · Vite · Tailwind · PWA — no backend, everything on-device',
    receipts: [
      {
        label: 'github/zandasalamanda/Bandr',
        url: 'https://github.com/zandasalamanda/Bandr',
      },
    ],
  },
  {
    id: 'solaspace',
    number: '03',
    name: 'Solaspace',
    status: 'live',
    date: 'JUL 2026',
    tagline: 'Chart it. Focus. Arrive.',
    description:
      'An AI goal-execution app — type any goal in plain words and it maps every step, finds every resource, and builds a plan for the time you actually have today.',
    decisionsNote:
      'If the AI ever goes down, the app keeps planning on its own instead of just stopping. Payments run through Stripe, so the app never sees or stores your card.',
    techLine:
      'Next.js · TypeScript · Supabase (RLS) · Clerk · Stripe · structured-output AI planning',
    receipts: [
      { label: 'solaspace.app', url: 'https://solaspace.app' },
      {
        label: 'github/zandasalamanda/Aether',
        url: 'https://github.com/zandasalamanda/Aether',
      },
    ],
  },
  {
    // Positioning per the client (Jul 2026): present Everdeck as an AI
    // business-niche generator organizing moves as a deck of cards; the
    // product's direction is still being decided. Every clause below is true
    // of the running app (market scans, 0–100 opportunity scores, card deck).
    id: 'everdeck',
    number: '04',
    name: 'Everdeck',
    status: 'private preview',
    date: 'JUL 2026',
    description:
      'A business-strategy deck in the making — point it at a market, let it hunt down every business in a niche, size each one up, and deal your next moves back as a hand of scored cards.',
    decisionsNote:
      'The heavy lifting — scanning a market and sizing up every business in it — runs in the background on the server, so it keeps working even when the tab is closed. And every user only ever sees their own deck, locked down at the database itself.',
    techLine:
      'Next.js · TypeScript · Supabase Edge Functions + pg_cron · Clerk · Google Places API · Gemini (structured output)',
    receipts: [
      { label: 'everdeck.app — private preview', url: 'https://everdeck.app' },
    ],
  },
];

export function productById(id: Product['id']): Product {
  const p = products.find((x) => x.id === id);
  if (!p) throw new Error(`unknown product: ${id}`);
  return p;
}

/** §6.2 — the award case, sourced exactly as the brief specifies */
export const award = {
  citationSelectedFor: 'the quality of the concept, presentation and technical execution',
  citationNoting: "the app's intuitive interface and overall visual cohesiveness",
  citationAttribution:
    'Congressional App Challenge judges, as reported by WRNJ Radio, Feb 21 2026',
  citationUrl:
    'https://wrnjradio.com/kean-honors-7th-district-winners-of-congressional-app-challenge/',
  scaleLine: 'selected from 4,600+ apps · 13,800+ participants · 394 districts',
  capitolLine: 'Displayed at the U.S. Capitol — House of Code, Washington, D.C.',
  jsonLd: 'Congressional App Challenge, NJ-07, 2025',
  videoId: 'Z4pOUTWQaOk',
} as const;

export const everdeckPreview = {
  copy: 'In private preview — ',
  linkText: 'ask me for the password.',
  mailto: `mailto:${identity.email}?subject=${encodeURIComponent('Everdeck preview')}`,
} as const;

/**
 * In the lab — real, current side projects. Lines derive from each project's
 * own README/package.json (quoted in the research notes); repo links only
 * where a public repo with source actually exists.
 */
export interface LabItem {
  name: string;
  status?: string;
  line: string;
  repo?: string;
  repoLabel?: string;
  /** §9-style asset paths for phone screenshots, when captured */
  shots?: string[];
}

export const labItems: LabItem[] = [
  {
    // Source: YaSaboApp README (local project, in active development; its
    // GitHub repo is empty, so no repo receipt).
    name: 'Ya Sabo',
    status: 'in development',
    line: 'A judgment-free Spanish-comprehension app for “no sabo” heritage speakers — real Colombian voices, slang, and speed. An installable PWA that runs entirely on-device.',
    shots: ['yasabo/shot-home.png', 'yasabo/shot-loop.png', 'yasabo/shot-third.png'],
  },
  {
    // Source: Libero repo (pinned) — config.py: "Configuration for LIBERO — AI
    // Ball Tracker"; main.py: YOLOv8n + HSV fusion, overlay, mouse control.
    name: 'Libero',
    line: 'A real-time AI ball tracker — YOLOv8 fused with color detection over live screen capture, with an on-screen overlay.',
    repo: 'https://github.com/zandasalamanda/Libero',
    repoLabel: 'github/zandasalamanda/Libero',
  },
  {
    // Source: Verbalist repo (pinned) — package.json description.
    name: 'Verbalist',
    line: 'An interactive speech coach that flags filler words, brainrot, and jargon as you speak.',
    repo: 'https://github.com/zandasalamanda/Verbalist',
    repoLabel: 'github/zandasalamanda/Verbalist',
  },
];

/**
 * Team Helios — the NASA App Development Challenge entry (§12 About fact).
 * Sources: the Astrovia-NASA-ADC repo (Python/Ursina 3D visualization,
 * created Nov 2024); client-supplied team logo + mission velocity plot;
 * instagram.com/@helios.nasa verified live (public team outreach account,
 * #NextGenSTEM posts).
 */
export const helios = {
  name: 'Team Helios',
  context: 'NASA App Development Challenge',
  line: "My team's entry to NASA's App Development Challenge — we built a 3D mission visualization in Python and ran the team's STEM outreach on Instagram.",
  plotCaption: 'Mission data — velocity over time',
  receipts: [
    {
      label: 'instagram/@helios.nasa',
      url: 'https://www.instagram.com/helios.nasa/',
    },
    {
      label: 'github/zandasalamanda/Astrovia-NASA-ADC',
      url: 'https://github.com/zandasalamanda/Astrovia-NASA-ADC',
    },
  ],
} as const;

/**
 * The archive — earlier game work. Titles, context, and lines adapt the
 * client's own write-ups from his previous portfolio (js/interactables.js);
 * sprites are the games' real pixel art. Only FLAT-EARTHRZ has public source.
 */
export interface ArchiveGame {
  title: string;
  context: string;
  line: string;
  tags: string;
  /** asset path under content/assets/ */
  sprite?: string;
  spriteAlt?: string;
  repo?: string;
  repoLabel?: string;
}

export const archiveGames: ArchiveGame[] = [
  {
    title: 'The Legend of TharThar II',
    context: 'HACKMCST 2024 — Lost in Cyberspace',
    line: 'A tile-based tower defense — heroes vs. real cyber threats like Trojans and Worms. All visuals and code from scratch.',
    tags: 'Java · Processing',
    sprite: 'artifacts/tharthar-hero.gif',
    spriteAlt: 'Pixel-art hero character from The Legend of TharThar II',
  },
  {
    title: 'Please Impress The King',
    context: 'SkillsUSA game development',
    line: "A retro turn-based comedy RPG — a failed squire's last chance at knighthood, inspired by Stardew Valley and King's Quest.",
    tags: 'Unity · C# · Aseprite',
    sprite: 'artifacts/king-knight.png',
    spriteAlt: 'Pixel-art knight from Please Impress The King',
  },
  {
    title: 'FLAT-EARTHRZ',
    context: '2-player co-op survival',
    line: 'Alien workers harvest floating flat islands, leap across the void, and craft to fill construction orders.',
    tags: 'JavaScript · Canvas',
    sprite: 'artifacts/flatearthrz-alien.gif',
    spriteAlt: 'Pixel-art alien worker from FLAT-EARTHRZ',
    repo: 'https://github.com/zandasalamanda/GJ26',
    repoLabel: 'source ↗',
  },
  {
    title: 'Volleyball 1',
    context: 'Java arcade',
    line: '2D retro volleyball against a smart AI — real ball physics: gravity, elasticity, drag.',
    tags: 'Java · Processing',
    sprite: 'artifacts/volleyball-spike.gif',
    spriteAlt: 'Pixel-art volleyball player mid-spike from Volleyball 1',
  },
  {
    title: 'Pipkin Parade',
    context: 'Puzzle-strategy',
    line: 'A Lemmings-inspired puzzler — guide the parade with Builder, Blocker, Digger, and Floater abilities.',
    tags: 'JavaScript · Canvas',
    sprite: 'artifacts/pipkin-idle.png',
    spriteAlt: 'Pixel-art pink Pipkin from Pipkin Parade',
  },
];

/** §6.3 — proof of work; every line verified */
export const proofOfWork = {
  originalityLine: 'Original work — zero forks.',
  profileUrl: identity.github,
} as const;

/** §12 approved About paragraph — client may edit; do not embellish */
export const aboutParagraph =
  "I studied computer science at Morris County School of Technology (class of '26). The products I ship started as problems I actually had — homework that kept sliding to 11 p.m. became ChronoIQ. Building the tool beats complaining about the problem. Away from the keyboard: varsity soccer, FIRST Robotics, and ecological fieldwork in the Peruvian Amazon.";

/**
 * About timeline — dated, verifiable events only.
 * Sources: §12 facts; GitHub account created 2024-02-09 (profile API);
 * product dates from content/github.json.
 */
export const timeline = [
  { stamp: 'SEP 2023', text: 'Intern, Raymond James Financial Services' },
  { stamp: 'FEB 2024', text: 'Joined GitHub — every repo since is original work' },
  { stamp: '2024', text: 'HACKMCST hackathon · NASA App Development Challenge' },
  { stamp: 'DEC 2025', text: 'Congressional App Challenge winner, NJ-07 — ChronoIQ' },
  { stamp: '2026', text: 'Graduated MCST — Academy for Computer & Information Sciences' },
  { stamp: 'JUL 2026', text: 'Solaspace live · Everdeck in private preview' },
] as const;

/** Undated facts (§12 verified + resume-sourced) — rendered as chips */
export const aboutFacts = [
  '4.0 unweighted GPA',
  'Varsity soccer — senior year',
  'SkillsUSA — interactive game design',
  'FIRST Robotics — programming + outreach',
  'Rainforest conservation fieldwork — Peruvian Amazon',
  'Animal rehabilitation volunteer — Patchwork Pastures',
] as const;

/**
 * Experience — §12 (Raymond James, Team Helios) + client-supplied (UTR
 * Global, Jul 2026): "redesigning bugged web systems in classic ASP/VBScript
 * files, and implementing AI" — Atlas Space, verified by the client's own
 * screenshots of the running product. Client names of UTR's customers and
 * internal roadmap details are deliberately NOT published.
 */
export const experience = [
  {
    org: 'UTR Global',
    role: 'Software developer intern — web + AI',
    period: 'current',
    line: 'Rebuilding bugged legacy web systems (classic ASP/VBScript) and building Atlas Space — an AI workspace where telecom-expense work happens in plain English: drop in a bill, audit it, reconcile lines, check rates, compare months.',
  },
  {
    org: 'Raymond James Financial Services',
    role: 'Intern',
    period: 'Sept 2023 — present',
    line: 'Research, documents, and day-to-day operations support inside a financial services office.',
  },
  {
    org: 'Team Helios — NASA App Development Challenge',
    role: 'Developer',
    period: '2024',
    line: "Built a 3D mission visualization in Python and ran the team's STEM outreach on Instagram.",
  },
] as const;

/** Atlas Space — presented from what the screenshots verifiably show. */
export const atlas = {
  name: 'Atlas Space',
  context: 'Built at UTR Global',
  line: 'An AI workspace for telecom-expense operations — drop in a bill or spreadsheet and work in plain English: ask questions, audit charges, reconcile lines, check rates, compare months, and fix files. Ships with full light and dark themes.',
  note: 'Internal product — no public link.',
} as const;

export const contact = {
  heading: 'Hiring interns? Building something?',
  line: "I'm looking for software internships and interesting collaborations.",
  email: identity.email,
  mailto: `mailto:${identity.email}`,
  linkedin: identity.linkedin,
  github: identity.github,
} as const;

/** §10 — URLs the build-time link check must hit */
export const receiptUrlsToVerify = [
  'https://chronoiq.dev',
  'https://solaspace.app',
  'https://everdeck.app',
  awardPageUrl,
  'https://wrnjradio.com/kean-honors-7th-district-winners-of-congressional-app-challenge/',
] as const;
