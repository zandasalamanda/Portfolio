// fetch-activity.mjs
// Real GitHub commit-activity data for the contribution-calendar graph.
// Facts only — no synthetic data, ever.
//
// With GITHUB_TOKEN: uses the GraphQL contributionsCollection.contributionCalendar
// (the canonical contribution calendar) for the last 52 weeks.
// Without a token (the normal case): honestly approximates from public data via
// REST — commits authored in the last 52 weeks across non-fork repos.
// On ANY failure the committed content/github-activity.json is left untouched
// and we exit 0 — this must never break the build.

import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outPath = path.join(root, 'content', 'github-activity.json');

const USER = 'zandasalamanda';
const TOKEN = process.env.GITHUB_TOKEN;
const WEEKS = 52;
const DAY_MS = 24 * 60 * 60 * 1000;
const WEEK_MS = 7 * DAY_MS;
const MAX_PAGES_PER_REPO = 3;
const RATE_LIMIT_FLOOR = 5; // stop before we hit the unauthenticated 60/hr wall

let rateLimitRemaining = Infinity;

/** UTC midnight of the Monday on/before the given date. */
function mondayOf(date) {
  const d = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
  const shift = (d.getUTCDay() + 6) % 7; // Mon=0 .. Sun=6
  return new Date(d.getTime() - shift * DAY_MS);
}

function isoDate(date) {
  return date.toISOString().slice(0, 10);
}

/** Empty Mon..Sun buckets for the last 52 weeks (current week last). */
function emptyWeeks(firstMonday) {
  return Array.from({ length: WEEKS }, (_, i) => ({
    start: isoDate(new Date(firstMonday.getTime() + i * WEEK_MS)),
    days: [0, 0, 0, 0, 0, 0, 0],
  }));
}

/** Add a count to the right week/day bucket; ignores out-of-window dates. */
function bucket(weeks, firstMonday, dateStr, count) {
  const t = Date.parse(`${dateStr.slice(0, 10)}T00:00:00Z`);
  if (Number.isNaN(t)) return;
  const weekIndex = Math.floor((t - firstMonday.getTime()) / WEEK_MS);
  if (weekIndex < 0 || weekIndex >= WEEKS) return;
  const dayIndex = (new Date(t).getUTCDay() + 6) % 7;
  weeks[weekIndex].days[dayIndex] += count;
}

async function rest(url) {
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
    const remaining = Number(res.headers.get('x-ratelimit-remaining'));
    if (Number.isFinite(remaining)) rateLimitRemaining = remaining;
    if (res.status === 409) return null; // empty repository — no commits to count
    if (!res.ok) throw new Error(`GitHub API ${res.status} for ${url}`);
    return res.json();
  } finally {
    clearTimeout(timer);
  }
}

/** All in-window commit dates for one repo. Returns { dates, usedAllAuthors }. */
async function repoCommitDates(repoName, sinceISO) {
  let emptyRepo = false;
  const fetchDates = async (withAuthor) => {
    const dates = [];
    for (let page = 1; page <= MAX_PAGES_PER_REPO; page++) {
      if (rateLimitRemaining < RATE_LIMIT_FLOOR) throw new RateLimitStop();
      const author = withAuthor ? `&author=${USER}` : '';
      const commits = await rest(
        `https://api.github.com/repos/${USER}/${repoName}/commits?per_page=100&since=${sinceISO}${author}&page=${page}`,
      );
      if (commits === null) {
        emptyRepo = true; // 409: repository has no git history
        break;
      }
      if (!Array.isArray(commits)) break;
      for (const c of commits) {
        const date = c?.commit?.author?.date;
        if (date) dates.push(date);
      }
      if (commits.length < 100) break;
    }
    return dates;
  };

  const authored = await fetchDates(true);
  if (emptyRepo) return { dates: [], usedAllAuthors: false };
  if (authored.length > 0) return { dates: authored, usedAllAuthors: false };
  // author= can come back empty when commits aren't attributed to the account
  // (unlinked email). All repos are original solo work, so counting all
  // authors is still honest — but we label the method accordingly.
  const all = await fetchDates(false);
  if (all.length > 0) {
    console.warn(`[fetch-activity] ${repoName}: author-filtered query empty; used all-authors fallback (${all.length} commits)`);
    return { dates: all, usedAllAuthors: true };
  }
  return { dates: [], usedAllAuthors: false };
}

class RateLimitStop extends Error {
  constructor() {
    super('rate limit floor reached');
  }
}

async function viaRest(firstMonday, sinceISO) {
  const repos = await rest(`https://api.github.com/users/${USER}/repos?per_page=100`);
  if (!Array.isArray(repos)) throw new Error('unexpected repos payload');

  const fifteenMonthsAgo = new Date();
  fifteenMonthsAgo.setUTCMonth(fifteenMonthsAgo.getUTCMonth() - 15);
  const candidates = repos.filter(
    (r) => !r.fork && r.pushed_at && new Date(r.pushed_at) >= fifteenMonthsAgo,
  );

  const weeks = emptyWeeks(firstMonday);
  const perRepo = [];
  let usedAllAuthors = false;
  let processed = 0;

  try {
    for (const repo of candidates) {
      if (rateLimitRemaining < RATE_LIMIT_FLOOR) throw new RateLimitStop();
      const { dates, usedAllAuthors: fellBack } = await repoCommitDates(repo.name, sinceISO);
      usedAllAuthors = usedAllAuthors || fellBack;
      for (const date of dates) bucket(weeks, firstMonday, date, 1);
      perRepo.push({ name: repo.name, commits: dates.length, pushedAt: repo.pushed_at });
      processed++;
    }
  } catch (err) {
    if (!(err instanceof RateLimitStop)) throw err;
    const pct = candidates.length === 0 ? 1 : processed / candidates.length;
    console.warn(
      `[fetch-activity] rate limit floor hit after ${processed}/${candidates.length} repos (${Math.round(pct * 100)}%)`,
    );
    if (pct < 0.8) {
      throw new Error('rate-limited before 80% of candidate repos were processed — keeping existing file');
    }
    console.warn('[fetch-activity] >=80% processed — keeping partial (still real) data');
  }

  const totalCommits = perRepo.reduce((sum, r) => sum + r.commits, 0);
  const topRepos = perRepo
    .filter((r) => r.commits > 0)
    .sort((a, b) => b.commits - a.commits)
    .slice(0, 6);

  return {
    method: usedAllAuthors ? 'rest-approximation-allauthors' : 'rest-approximation',
    totalCommits,
    repoCount: processed,
    weeks,
    topRepos,
  };
}

async function viaGraphql(firstMonday) {
  const from = firstMonday.toISOString();
  const to = new Date().toISOString();
  const query = `
    query($login: String!, $from: DateTime!, $to: DateTime!) {
      user(login: $login) {
        contributionsCollection(from: $from, to: $to) {
          totalCommitContributions
          totalRepositoriesWithContributedCommits
          contributionCalendar {
            weeks { contributionDays { date contributionCount } }
          }
          commitContributionsByRepository(maxRepositories: 10) {
            repository { name pushedAt }
            contributions { totalCount }
          }
        }
      }
    }`;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 15_000);
  let body;
  try {
    const res = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        'Content-Type': 'application/json',
        'User-Agent': 'portfolio-build-script',
      },
      body: JSON.stringify({ query, variables: { login: USER, from, to } }),
      signal: controller.signal,
    });
    if (!res.ok) throw new Error(`GitHub GraphQL ${res.status}`);
    body = await res.json();
  } finally {
    clearTimeout(timer);
  }
  if (body.errors?.length) throw new Error(`GraphQL errors: ${body.errors.map((e) => e.message).join('; ')}`);
  const cc = body?.data?.user?.contributionsCollection;
  if (!cc) throw new Error('unexpected GraphQL payload');

  const weeks = emptyWeeks(firstMonday);
  for (const week of cc.contributionCalendar.weeks) {
    for (const day of week.contributionDays) {
      if (day.contributionCount > 0) bucket(weeks, firstMonday, day.date, day.contributionCount);
    }
  }

  const topRepos = cc.commitContributionsByRepository
    .map((r) => ({
      name: r.repository.name,
      commits: r.contributions.totalCount,
      pushedAt: r.repository.pushedAt,
    }))
    .sort((a, b) => b.commits - a.commits)
    .slice(0, 6);

  return {
    method: 'graphql-calendar',
    totalCommits: cc.totalCommitContributions,
    repoCount: cc.totalRepositoriesWithContributedCommits,
    weeks,
    topRepos,
  };
}

async function main() {
  // Last 52 weeks, Mon..Sun, current (possibly partial) week last.
  const firstMonday = new Date(mondayOf(new Date()).getTime() - (WEEKS - 1) * WEEK_MS);
  const sinceISO = firstMonday.toISOString();

  const data = TOKEN ? await viaGraphql(firstMonday) : await viaRest(firstMonday, sinceISO);
  const payload = { fetchedAt: new Date().toISOString(), ...data };

  // Pretty-print, but keep each "days" array on one line.
  const json = JSON.stringify(payload, null, 2).replace(
    /"days": \[\s*([\s\S]*?)\s*\]/g,
    (_, inner) => `"days": [${inner.replace(/\s*\n\s*/g, '')}]`,
  );
  await fs.writeFile(outPath, json + '\n');

  const busiest = payload.weeks.reduce(
    (best, w) => {
      const total = w.days.reduce((a, b) => a + b, 0);
      return total > best.total ? { start: w.start, total } : best;
    },
    { start: null, total: 0 },
  );
  console.log(`[fetch-activity] wrote ${path.relative(root, outPath)} (method: ${payload.method})`);
  console.log(`[fetch-activity] totalCommits: ${payload.totalCommits} across ${payload.repoCount} repos`);
  console.log(`[fetch-activity] busiest week: ${busiest.start} (${busiest.total} commits)`);
  console.log(
    `[fetch-activity] top repos: ${payload.topRepos.map((r) => `${r.name} ${r.commits}`).join(', ') || '(none)'}`,
  );
}

main().catch(async (err) => {
  console.warn(`[fetch-activity] failed (${err?.message ?? err}) — leaving ${path.relative(root, outPath)} untouched`);
  try {
    await fs.access(outPath);
  } catch {
    await fs.writeFile(outPath, JSON.stringify({ fetchedAt: null, weeks: [] }, null, 2) + '\n');
    console.warn('[fetch-activity] no existing file — wrote empty skeleton');
  }
  process.exit(0);
});
