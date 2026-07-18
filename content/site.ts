// Single source of truth for every fact on the site.
// Every value here traces to §12 of the build brief (Facts Appendix).
// Do not add claims, metrics, or URLs that are not in the brief.

export type ProductStatus = 'live' | 'private preview';

export interface Receipt {
  label: string;
  url: string;
}

export interface Product {
  id: 'chronoiq' | 'solaspace' | 'everdeck';
  number: '01' | '02' | '03';
  name: string;
  status: ProductStatus;
  /** Display date, e.g. "DEC 2025" — from content/github.json */
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
  // NOTE: the brief lists linkedin.com/in/zanderleon, but a logged-in manual
  // check (§10) found that vanity URL belongs to a different Zander Leon
  // (University of Arizona marketing coordinator). Omitted until the client
  // supplies the correct profile URL.
  linkedin: null as string | null,
} as const;

export const positioning = {
  /** §6.1 exact copy; the ¹ renders as a real footnote fed by the build-time link check */
  line: 'I build software that ships.',
  title: 'Zander Leon — I build software that ships',
  description:
    'Portfolio of Zander Leon, student developer — ChronoIQ (Congressional App Challenge winner, NJ-07 2025), Solaspace, and Everdeck. Shipped products, live receipts.',
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
      'Google OAuth tokens never touch the database — they live only in an AES-256-GCM encrypted httpOnly cookie. The whole app runs with zero API keys: deterministic fallback scheduling, a mock Study Coach, and simulated billing keep every feature testable.',
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
    id: 'solaspace',
    number: '02',
    name: 'Solaspace',
    status: 'live',
    date: 'JUL 2026',
    tagline: 'Chart it. Focus. Arrive.',
    description:
      'An AI goal-execution app — type any goal in plain words and it maps every step, finds every resource, and builds a plan for the time you actually have today.',
    decisionsNote:
      'The AI layer degrades gracefully: if the model is ever unavailable, deterministic planning keeps the whole app working. Payments run through Stripe Checkout; the app never sees a card number.',
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
    id: 'everdeck',
    number: '03',
    name: 'Everdeck',
    status: 'private preview',
    date: 'JUL 2026',
    description:
      'Finds local businesses with weak or missing websites, designs each one a better site automatically, and drafts the outreach — so you pitch with the work already done.',
    decisionsNote:
      'The web app holds only a public anon key — row-level security is the entire tenant boundary. All privileged work runs in edge functions off a durable Postgres job queue with atomic claims, backoff, and dead-lettering, drained by cron.',
    techLine:
      'Next.js · TypeScript · Supabase Edge Functions + pg_cron · Clerk · Google Places API · Gemini (structured output)',
    receipts: [
      { label: 'everdeck.app — private preview', url: 'https://everdeck.app' },
    ],
  },
];

/** §6.2 — the award case, sourced exactly as the brief specifies */
export const award = {
  /** Judges' wording as reported by WRNJ Radio, Feb 21 2026 */
  citationSelectedFor: 'the quality of the concept, presentation and technical execution',
  citationNoting: "the app's intuitive interface and overall visual cohesiveness",
  citationAttribution:
    'Congressional App Challenge judges, as reported by WRNJ Radio, Feb 21 2026',
  citationUrl:
    'https://wrnjradio.com/kean-honors-7th-district-winners-of-congressional-app-challenge/',
  /** Source: official award page */
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

export const bandr = {
  name: 'Bandr',
  line: 'A mobile-first PWA that matches teens with legitimate ways to earn, scored by a transparent rule engine.',
  repo: 'https://github.com/zandasalamanda/Bandr',
  repoLabel: 'github/zandasalamanda/Bandr',
} as const;

/** §6.3 — proof of work; every line verified in §12 */
export const proofOfWork = {
  originalityLine: 'Original work — zero forks.',
  profileUrl: identity.github,
} as const;

/** §12 approved About paragraph — client may edit; do not embellish */
export const aboutParagraph =
  "I studied computer science at Morris County School of Technology (class of '26). The products I ship started as problems I actually had — homework that kept sliding to 11 p.m. became ChronoIQ. Building the tool beats complaining about the problem. Away from the keyboard: varsity soccer, FIRST Robotics, and ecological fieldwork in the Peruvian Amazon.";

/** Mono fact list: §12 verified + resume-sourced facts (confirm against resume-web.pdf before publish) */
export const aboutFacts = [
  'Morris County School of Technology — Academy for Computer & Information Sciences, class of 2026',
  '4.0 unweighted GPA',
  'Congressional App Challenge winner, NJ-07, 2025',
  'SkillsUSA — interactive game design competitor',
  'HACKMCST 2024 · NASA App Development Challenge submission',
  'FIRST Robotics — programming + outreach',
  'Varsity soccer, senior year',
  'Intern, Raymond James Financial Services — since Sept 2023',
  'Rainforest conservation fieldwork, Peruvian Amazon',
  'Animal rehabilitation volunteer, Patchwork Pastures',
] as const;

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
