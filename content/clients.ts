/**
 * Paid and commissioned work — the answer to "has anyone actually paid you?"
 * Facts here are the client's engagement as Zander described it; nothing is
 * dressed up, and in-progress work says so. Quotes are absent because none
 * have been collected yet — when a client gives one, it goes in `quote` and
 * renders automatically.
 */
export interface ClientJob {
  id: string;
  client: string;
  kind: string;
  status: 'in production' | 'delivered' | 'live' | 'in progress';
  line: string;
  outcome: string;
  accent: string;
  /** real logo file under content/assets; monogram used when absent */
  logo?: string;
  /** logo needs a white tile to read on the dark ground */
  logoTile?: boolean;
  /** monogram for clients with no usable logo file */
  mark?: string;
  /** id of a drawn glyph in components/Marks when there is no logo */
  drawn?: string;
  image?: { rel: string; alt: string };
  /** further captures — the card fades through them */
  cycle?: string[];
  link?: { label: string; url: string };
  quote?: { text: string; by: string };
}

export const clientJobs: ClientJob[] = [
  {
    id: 'atlas',
    client: 'UTR Global',
    kind: 'AI workspace',
    status: 'in production',
    line: 'Atlas Space — an AI document-and-spreadsheet workspace built at UTR Global, where I intern. Their team drops in real telecom bills and works in plain English: audit charges, check rates, reconcile lines, fix files.',
    outcome: 'Runs inside the company on real invoices, where being wrong costs money.',
    accent: '#8fa6e8',
    logo: 'logos/utr.png',
    logoTile: true,
    image: {
      rel: 'atlas/atlas-light.png',
      alt: 'Atlas Space: an AI assistant beside tools for checking bills, auditing, reconciling lines, and fixing spreadsheets',
    },
    cycle: ['atlas/atlas-dark.png'],
  },
  {
    id: 'eztennis',
    client: 'EZTennis',
    kind: 'AI scheduling app',
    status: 'in progress',
    line: 'An AI tournament scheduler being built for its founder: it assembles a personalized monthly schedule from USTA, UTR, ITF, and WTN events around a player’s rating, location, and calendar, with an AI coach to adjust it.',
    outcome: 'In active development, with the client reviewing builds as it comes together.',
    accent: '#a3d537',
    logo: 'clients/eztennis-logo.png',
    image: {
      rel: 'clients/eztennis-landing.png',
      alt: 'The EZTennis landing page: "Play the right tournaments" over a personalized tournament scheduler with USTA, UTR, ITF, and WTN coverage',
    },
    cycle: ['clients/eztennis-app.png', 'clients/eztennis-pricing.png'],
  },
  {
    id: 'comics',
    client: 'Comics for Comfort',
    kind: 'Nonprofit website',
    status: 'live',
    line: 'A website for Comics for Comfort, a New Jersey nonprofit that collects donated comics, screens every issue for the right age group, and delivers them to clubs, libraries, children’s hospitals, and troops overseas — built to look like the comics it moves, down to the newsprint dots and the barcode.',
    outcome: 'Live on its own domain, with the running count, the screening promise, and the contact routes the organisation runs on.',
    accent: '#d9553f',
    logo: 'clients/comics-logo.png',
    image: {
      rel: 'clients/comics-live-hero.png',
      alt: 'The Comics for Comfort homepage: "Comics that deserve a second reader" beside a fan of real comic covers, in a retro newsprint style',
    },
    cycle: ['clients/comics-live-count.png', 'clients/comics-live-screening.png'],
    link: { label: 'comicsforcomfort.com', url: 'https://comicsforcomfort.com/' },
  },
  {
    id: 'terminal',
    client: 'Private financial group',
    kind: 'AI market terminal',
    status: 'delivered',
    line: 'A Bloomberg-terminal-style AI market tracker sold to a small financial group — an AI analyst that breaks a ticker down on demand, and live alerts that turn material events into concrete calls.',
    outcome: 'Delivered to the group for internal use.',
    accent: '#e6b877',
    drawn: 'terminal',
    image: {
      rel: 'clients/terminal-analyst.png',
      alt: 'The terminal’s Ask the Analyst view: the AI returning a full stock breakdown — pricing data, key metrics, bull case, and bear case',
    },
    cycle: ['clients/terminal-alerts.png'],
  },
];
