import type { Metadata } from 'next';
import ActivityGraph from '@/components/ActivityGraph';
import TechIcon from '@/components/TechIcon';
import activity from '@/content/github-activity.json';
import github from '@/content/github.json';
import { identity, proofOfWork } from '@/content/site';

export const metadata: Metadata = {
  title: 'Activity',
  description:
    "Zander Leon's real GitHub activity — commits, repositories, and language mix, counted from the public API at build time.",
};

interface Lang {
  name: string;
  pct: number;
}

export default function ActivityPage() {
  const languages = (github as { languages: Lang[] | null }).languages ?? [];
  const data = activity as {
    fetchedAt: string | null;
    method?: string;
    totalCommits?: number;
    repoCount?: number;
    weeks?: { start: string; days: number[] }[];
    topRepos?: { name: string; commits: number }[];
  };
  const weeks = data.weeks ?? [];
  const totalCommits =
    data.totalCommits ?? weeks.flatMap((w) => w.days).reduce((a, b) => a + b, 0);
  const repoCount = data.repoCount ?? 0;
  const busiest = weeks.reduce(
    (m, w) => Math.max(m, w.days.reduce((a, b) => a + b, 0)),
    0,
  );

  return (
    <main id="main" className="flex-1 pt-[104px] md:pt-[124px]">
      <div className="mx-auto w-full max-w-[1120px] px-6 md:px-8">
        <p className="rise-1 mono uppercase tracking-[0.16em] text-fg-soft">Activity</p>
        <h1 className="rise-1 h-display mt-4 max-w-[16ch] text-[clamp(1.75rem,3.6vw,2.5rem)]">
          The work rate, not the résumé version.
        </h1>
        <p className="rise-2 mt-5 max-w-[56ch] text-[0.9375rem] prose-soft">
          Counted straight from the public GitHub API when this page was built. No
          badges, no estimates.
        </p>

        <dl className="rise-3 mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { k: 'Commits', v: String(totalCommits), s: 'last 52 weeks' },
            { k: 'Repositories', v: String(repoCount), s: 'public, original' },
            { k: 'Forks', v: '0', s: 'all my own work' },
            { k: 'Busiest week', v: String(busiest), s: 'commits in 7 days' },
          ].map((t) => (
            <div key={t.k} className="card p-4">
              <dt className="mono text-[0.625rem] uppercase tracking-[0.14em] text-fg-faint">
                {t.k}
              </dt>
              <dd className="h-display mt-1.5 text-[1.5rem] text-accent">{t.v}</dd>
              <p className="mono mt-0.5 text-[0.625rem] text-fg-faint">{t.s}</p>
            </div>
          ))}
        </dl>
      </div>

      <section
        aria-labelledby="graph-h"
        className="mx-auto w-full max-w-[1200px] px-6 pt-14 md:px-10 md:pt-20"
      >
        <h2 id="graph-h" className="mono border-b border-line pb-3 uppercase tracking-[0.16em] text-fg-soft">
          Last 52 weeks
        </h2>
        <div className="mt-8 card p-6 md:p-8">
          <ActivityGraph />
        </div>
        <p className="mono mt-4 text-[0.6875rem] text-fg-faint">
          Fetched {data.fetchedAt ?? 'pending'}
          {data.method ? ` · ${data.method}` : ''} · counts commits authored in public
          repositories.
        </p>
      </section>

      <section
        aria-labelledby="repos-h"
        className="mx-auto w-full max-w-[1200px] px-6 pt-20 md:px-10 md:pt-28"
      >
        <div className="grid gap-12 md:grid-cols-2 md:gap-16">
          <div>
            <h2 id="repos-h" className="mono border-b border-line pb-3 uppercase tracking-[0.16em] text-fg-soft">
              Where the commits went
            </h2>
            <ul className="mt-6">
              {(data.topRepos ?? []).map((r) => (
                <li
                  key={r.name}
                  className="flex items-baseline justify-between gap-4 border-b border-line py-3"
                >
                  <a
                    href={`https://github.com/zandasalamanda/${r.name}`}
                    target="_blank"
                    rel="noreferrer"
                    className="mono text-accent"
                  >
                    {r.name} ↗
                  </a>
                  <span className="mono text-[0.75rem] text-fg-soft">
                    {r.commits} commits
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="mono border-b border-line pb-3 uppercase tracking-[0.16em] text-fg-soft">What it is written in</h2>
            <ul className="mt-6 space-y-4">
              {languages.map((l) => (
                <li key={l.name}>
                  <div className="mono flex items-baseline justify-between text-[0.8125rem]">
                    <span className="flex items-center gap-2">
                      <TechIcon label={l.name} className="h-4 w-4" />
                      {l.name}
                    </span>
                    <span className="text-fg-soft">{l.pct}%</span>
                  </div>
                  <div
                    aria-hidden
                    className="mt-2 h-[3px] w-full overflow-hidden rounded-full bg-[rgba(250,250,248,0.08)]"
                  >
                    <span
                      className="block h-full rounded-full bg-accent"
                      style={{ width: `${l.pct}%` }}
                    />
                  </div>
                </li>
              ))}
            </ul>
            <p className="mono mt-8 text-[0.8125rem] text-fg">
              {proofOfWork.originalityLine}
            </p>
            <a
              href={identity.github}
              target="_blank"
              rel="noreferrer"
              className="mono mt-3 inline-block text-[0.75rem] text-accent"
            >
              {identity.githubHandle} ↗
            </a>
          </div>
        </div>
      </section>

      <div className="pb-24 md:pb-32" />
    </main>
  );
}
