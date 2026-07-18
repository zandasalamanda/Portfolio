// fetch-github.mjs
// Best-effort refresh of content/github.json (products + language mix + fork count).
// Unauthenticated by default; set GITHUB_TOKEN for higher rate limits and to
// enable product-date refresh. On ANY failure the committed file is left
// untouched and we exit 0 — this must never break the build.

import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outPath = path.join(root, 'content', 'github.json');

const USER = 'zandasalamanda';
const TOKEN = process.env.GITHUB_TOKEN;
const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

async function gh(url) {
  const headers = {
    Accept: 'application/vnd.github+json',
    'User-Agent': 'portfolio-build-script',
    'X-GitHub-Api-Version': '2022-11-28',
  };
  if (TOKEN) headers.Authorization = `Bearer ${TOKEN}`;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 15_000);
  try {
    const res = await fetch(url, { headers, signal: controller.signal });
    if (!res.ok) throw new Error(`GitHub API ${res.status} for ${url}`);
    return res.json();
  } finally {
    clearTimeout(timer);
  }
}

function formatDate(iso) {
  const d = new Date(iso);
  return `${MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
}

async function main() {
  const existing = JSON.parse(await fs.readFile(outPath, 'utf8'));

  const repos = await gh(`https://api.github.com/users/${USER}/repos?per_page=100`);
  if (!Array.isArray(repos)) throw new Error('unexpected repos payload');

  const forkCount = repos.filter((r) => r.fork).length;
  if (forkCount > 0) {
    console.warn('!'.repeat(72));
    console.warn(`[fetch-github] WARNING: found ${forkCount} fork(s) on ${USER} — the site`);
    console.warn('[fetch-github] claims ZERO forks. Update the copy or remove the forks.');
    console.warn('!'.repeat(72));
  }

  // Aggregate language bytes across all non-fork repos.
  const totals = new Map();
  for (const repo of repos) {
    if (repo.fork) continue;
    const langs = await gh(repo.languages_url);
    for (const [name, bytes] of Object.entries(langs)) {
      totals.set(name, (totals.get(name) ?? 0) + bytes);
    }
  }
  const totalBytes = [...totals.values()].reduce((a, b) => a + b, 0);
  const languages = [...totals.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4)
    .map(([name, bytes]) => ({ name, pct: Math.floor((bytes / totalBytes) * 100) }));

  // Product dates: only touch them when authenticated (private repos visible).
  // ChronoIQ stays "DEC 2025" (no public repo); Everdeck has no repo.
  const products = (existing.products ?? []).map((p) => ({ ...p }));
  if (TOKEN) {
    const sola = products.find((p) => p.name === 'Solaspace');
    const aether = repos.find((r) => r.name.toLowerCase() === 'aether');
    if (sola && aether?.pushed_at) {
      sola.date = formatDate(aether.pushed_at);
      console.log(`[fetch-github] Solaspace date <- Aether pushed_at: ${sola.date}`);
    }
  }

  const payload = {
    ...existing,
    verifiedAt: new Date().toISOString(),
    products,
    forkCount,
    languages,
  };
  await fs.writeFile(outPath, JSON.stringify(payload, null, 2) + '\n');
  console.log(`[fetch-github] wrote ${path.relative(root, outPath)}`);
  console.log(`[fetch-github] forkCount: ${forkCount}`);
  console.log(`[fetch-github] languages: ${languages.map((l) => `${l.name} ${l.pct}%`).join(', ') || '(none)'}`);
}

main().catch((err) => {
  console.warn(`[fetch-github] failed (${err?.message ?? err}) — leaving content/github.json untouched`);
  process.exit(0);
});
