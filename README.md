# zanderleon.dev

My portfolio — the work, the services I offer, and the receipts behind both.
Live at **[zanderleon.dev](https://zanderleon.dev)**.

Built with Next.js (App Router) and TypeScript, statically generated, deployed
on Vercel.

## What's interesting in here

- **Every claim is checked at build time.** `scripts/verify-links.mjs` hits each
  external receipt and records the status; the footer prints the timestamp.
- **Real activity, not badges.** `scripts/fetch-activity.mjs` counts commits from
  the public GitHub API and feeds the contribution graph on `/activity`.
- **One source of truth for facts.** Everything a visitor reads lives in
  `content/site.ts` and `content/cards.ts` — nothing is hard-coded into a page.
- **Assets are declared, not assumed.** `scripts/scan-assets.mjs` builds a
  manifest of `content/assets/`; anything missing renders a labelled placeholder
  rather than a broken image.
- **Self-hosted tech icons.** `scripts/build-tech-icons.mjs` copies only the
  devicon SVGs actually used, so there is no CDN request.

## Running it

```bash
npm install
npm run dev
```

`npm run build` runs the asset scan, link check, and activity fetch first. All
three fail safe: if the network is unavailable they keep the committed data
rather than writing empty results.

## Checks

```bash
npm run typecheck
npm run lint
npm run build
```

---

My earlier game-development portfolio — an explorable pixel-art gallery walk —
now lives at
**[github.com/zandasalamanda/game-dev-portfolio](https://github.com/zandasalamanda/game-dev-portfolio)**.
