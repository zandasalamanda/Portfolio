// verify-links.mjs
// Build-time link check feeding the hero footnote and footer colophon.
// Writes content/verification.json with the final HTTP status of each receipt URL.
//
// RESILIENCE: if any fetch throws (network down, DNS failure), the existing
// committed content/verification.json is left untouched and we exit 0 — the
// committed file is the fallback. We only write when every URL returned an
// actual HTTP response.

import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outPath = path.join(root, 'content', 'verification.json');

// Keep this list in sync with `receiptUrlsToVerify` in content/site.ts.
const URLS = [
  'https://chronoiq.dev',
  'https://solaspace.app',
  'https://everdeck.app',
  'https://www.congressionalappchallenge.us/25-nj07/',
  'https://wrnjradio.com/kean-honors-7th-district-winners-of-congressional-app-challenge/',
];

const TIMEOUT_MS = 12_000;
const USER_AGENT =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36';

function hostOf(url) {
  return new URL(url).hostname.replace(/^www\./, '');
}

// "ok" rule: 200–299 for all URLs, except everdeck.app where any 200–499
// response counts as healthy (its password gate is by design).
function isOk(url, status) {
  if (hostOf(url) === 'everdeck.app') return status >= 200 && status <= 499;
  return status >= 200 && status <= 299;
}

async function check(url) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      method: 'GET',
      redirect: 'follow',
      signal: controller.signal,
      // Note: only a browser UA. Adding a browser-ish `Accept` header sends
      // everdeck.app's gate middleware into a redirect loop.
      headers: { 'User-Agent': USER_AGENT },
    });
    return { url, host: hostOf(url), status: res.status, ok: isOk(url, res.status) };
  } finally {
    clearTimeout(timer);
  }
}

async function main() {
  const results = [];
  let failed = false;

  for (const url of URLS) {
    try {
      const result = await check(url);
      results.push(result);
      console.log(`[verify-links] ${result.status} ${result.ok ? 'ok' : 'NOT OK'}  ${url}`);
    } catch (err) {
      failed = true;
      console.warn(`[verify-links] fetch threw for ${url}: ${err?.cause?.code ?? err?.name ?? err}`);
    }
  }

  if (failed) {
    console.warn('[verify-links] network failure — keeping existing content/verification.json as fallback');
    process.exit(0);
  }

  const payload = { verifiedAt: new Date().toISOString(), results };
  await fs.writeFile(outPath, JSON.stringify(payload, null, 2) + '\n');
  console.log(`[verify-links] wrote ${path.relative(root, outPath)}`);

  const notOk = results.filter((r) => !r.ok);
  if (notOk.length) {
    console.warn(`[verify-links] WARNING: ${notOk.length} URL(s) not healthy: ${notOk.map((r) => `${r.host} (${r.status})`).join(', ')}`);
  }
}

main().catch((err) => {
  // Unexpected script error: same fallback posture — never break the build.
  console.warn('[verify-links] unexpected error, keeping existing verification.json:', err);
  process.exit(0);
});
