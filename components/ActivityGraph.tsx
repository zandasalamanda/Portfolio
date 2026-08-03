import activity from '@/content/github-activity.json';

interface Week {
  start: string;
  days: number[];
}

interface Activity {
  fetchedAt: string | null;
  method?: string;
  totalCommits?: number;
  repoCount?: number;
  weeks: Week[];
  topRepos?: { name: string; commits: number }[];
}

const LEVELS = [
  'rgba(255,255,255,0.07)',
  'rgba(179,166,255,0.3)',
  'rgba(179,166,255,0.52)',
  'rgba(179,166,255,0.76)',
  'rgba(179,166,255,0.98)',
];

function level(n: number, max: number): number {
  if (n <= 0) return 0;
  const r = n / Math.max(max, 1);
  if (r > 0.6) return 4;
  if (r > 0.35) return 3;
  if (r > 0.15) return 2;
  return 1;
}

/**
 * Real commit activity from the public GitHub API. The compact variant shows
 * the most recent half-year so it fits a sidebar card without scrolling —
 * the full 52 weeks live on /activity.
 */
export default function ActivityGraph({ compact = false }: { compact?: boolean }) {
  const data = activity as Activity;
  const all = data.weeks ?? [];
  if (all.length === 0) return null;

  const weeks = compact ? all.slice(-24) : all;
  const cell = compact ? 8 : 10;
  const gap = compact ? 2 : 3;
  const max = Math.max(...all.flatMap((w) => w.days), 1);
  const total = compact
    ? weeks.flatMap((w) => w.days).reduce((a, b) => a + b, 0)
    : (data.totalCommits ?? all.flatMap((w) => w.days).reduce((a, b) => a + b, 0));

  return (
    <div>
      <div className={compact ? '' : 'overflow-x-auto pb-1'}>
        <div
          className={compact ? 'flex w-full justify-between' : 'flex'}
          style={{
            gap,
            ...(compact ? {} : { minWidth: weeks.length * (cell + gap) }),
          }}
        >
          {weeks.map((w) => (
            <div key={w.start} className="flex flex-col" style={{ gap }}>
              {w.days.map((d, di) => (
                <span
                  key={di}
                  title={`${d} commit${d === 1 ? '' : 's'} — week of ${w.start}`}
                  className="block rounded-[2px]"
                  style={{
                    width: cell,
                    height: cell,
                    background: LEVELS[level(d, max)],
                  }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      <div
        className={`mono mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 ${
          compact ? 'text-[0.625rem]' : 'text-[0.6875rem]'
        } text-fg-soft`}
      >
        <span>
          <span className="text-fg">{total}</span> commits ·{' '}
          {compact ? 'last 24 weeks' : 'last 52 weeks'}
        </span>
        {!compact && data.repoCount != null && (
          <span>
            across <span className="text-fg">{data.repoCount}</span> repositories
          </span>
        )}
        {!compact && (
          <span className="flex items-center gap-1.5">
            less
            {LEVELS.map((c) => (
              <span
                key={c}
                aria-hidden
                className="h-[10px] w-[10px] rounded-[2px]"
                style={{ background: c }}
              />
            ))}
            more
          </span>
        )}
      </div>
    </div>
  );
}
