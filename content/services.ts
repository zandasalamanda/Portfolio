export { contact } from './site';

/**
 * Productized offers. Scope and timelines are commitments the client chooses
 * to make — edit here to change them everywhere. Prices are deliberately not
 * printed: each project is quoted individually within 24 hours, which keeps
 * the promise honest while the client settles on his own rate card.
 */
export interface Service {
  name: string;
  timeline: string;
  /** the published starting band — set by Zander, Aug 2026 */
  from: string;
  line: string;
  includes: string[];
  bestFor: string;
}

export const services: Service[] = [
  {
    name: 'Website',
    timeline: '1–2 weeks',
    from: 'from $750',
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
    from: 'from $3,000',
    line: 'A working product with accounts, payments, and real data — the same stack behind the apps on this site.',
    includes: [
      'Accounts and secure sign-in',
      'Payments (Stripe) if you sell something',
      'Real database, real dashboard',
      'Live preview link from day one',
      'Repository and credentials handed over',
    ],
    bestFor: 'founders needing a first version people can use',
  },
  {
    name: 'AI integration',
    timeline: '1–3 weeks',
    from: 'from $1,500',
    line: 'An assistant or automation wired into the tools you already use — with fallbacks so nothing breaks when the model is down.',
    includes: [
      'Reads your real documents and spreadsheets',
      'Plain-English actions your team does by hand today',
      'Deterministic fallback when the model fails',
      'Your data stays in systems you control',
      'Handover doc so your team can run it',
    ],
    bestFor: 'small teams drowning in manual document work',
  },
];

/**
 * Everything here is in work already delivered — and picking up a stack that isn't is
 * part of the job. Grouped the way a buyer thinks about it.
 */
export const stack = [
  {
    title: 'Frontend',
    mark: '{ }',
    items: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'Vite', 'HTML/CSS', 'PWA'],
  },
  {
    title: 'Backend + data',
    mark: '</>',
    items: ['Node.js', 'Supabase', 'Postgres', 'Cloudflare D1 + edge', 'SQL', 'REST APIs', 'Clerk', 'Stripe'],
  },
  {
    title: 'AI + ML',
    mark: '✳',
    items: [
      'Claude',
      'Gemini',
      'Structured output',
      'Document parsing',
      'Spreadsheet parsing',
      'Deterministic fallbacks',
      'Speech recognition',
      'YOLOv8 / OpenCV',
    ],
  },
  {
    title: 'Platforms + more',
    mark: '#',
    items: ['Vercel', 'Cloudflare', 'Git + GitHub', 'Google APIs', 'Python', 'Java', 'C#', 'Unity', 'Classic ASP/VBScript'],
  },
];

/**
 * Why me and how I work, merged into one list a buyer can read in twenty
 * seconds. Every claim is checkable on this site.
 */
export const whyMe = [
  'Everything on this site is live — click anything and check the work before you pay for it.',
  'Fixed scope, one written price, and a delivery date before any work starts.',
  'A live preview link from day one — the person you talk to is the person writing the code.',
  'You own the domain, code, and credentials from the start. No lock-in, no ransom.',
  'AI features come with a backup plan, so the product still works when the AI is unavailable.',
  'If I am not the right fit for the job, I say so instead of taking it.',
];

