export { contact } from './site';

/**
 * Productized offers. Scope and timelines are commitments the client chooses
 * to make — edit here to change them everywhere. Prices are deliberately not
 * printed: each project is quoted individually within 24 hours (see the Hire
 * page copy), which keeps the promise honest while the client settles on his
 * own rate card.
 */
export interface Service {
  name: string;
  timeline: string;
  line: string;
  includes: string[];
  bestFor: string;
}

export const services: Service[] = [
  {
    name: 'Website',
    timeline: '1–2 weeks',
    line: 'A fast, sharp, mobile-first site for a business that is losing work to the one it has now.',
    includes: [
      'Design and build, start to finish',
      'Mobile-first, loads fast on a phone',
      'Copy tightened, not just poured in',
      'Google-ready: titles, previews, sitemap',
      'You own the domain, code, and hosting',
    ],
    bestFor: 'local service businesses, trades, clinics, studios',
  },
  {
    name: 'App build',
    timeline: '3–6 weeks',
    line: 'A working product with accounts, payments, and real data — the same stack behind the apps on this site.',
    includes: [
      'Accounts and secure sign-in',
      'Payments (Stripe) if you sell something',
      'Real database, real dashboard',
      'Live preview link from day one',
      'Repository and credentials handed over',
    ],
    bestFor: 'founders needing a first version people can actually use',
  },
  {
    name: 'AI integration',
    timeline: '1–3 weeks',
    line: 'An assistant or automation wired into the tools you already use — with fallbacks so nothing breaks when the model is down.',
    includes: [
      'Reads your real documents and spreadsheets',
      'Plain-English actions your team already does by hand',
      'Deterministic fallback when the model fails',
      'Your data stays in systems you control',
      'Handover doc so your team can run it',
    ],
    bestFor: 'small teams drowning in manual document or spreadsheet work',
  },
];
