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
  'rgba(255,255,255,0.06)',
  'rgba(45,212,191,0.3)',
  'rgba(45,212,191,0.52)',
  'rgba(45,212,191,0.74)',
  'rgba(45,212,191,0.96)',
];

function level(n: number, max: number): number {
  if (n <= 0) return 0;
  const r = n / Math.max(max, 1);
  if (r > 0.6) return 4;
  if (r > 0.35) return 3;
  if (r > 0.15) return 2;
  return 1;
}

/** Real commit activity — 52 weeks, counted from the public GitHub API. */
export default function ActivityGraph({ compact = false }: { compact?: boolean }) {
  const data = activity as Activity;
  const weeks = data.weeks ?? [];
  if (weeks.length === 0) return null;

  const max = Math.max(...weeks.flatMap((w) => w.days));
  const total = data.totalCommits ?? weeks.flatMap((w) => w.days).reduce((a, b) => a + b, 0);

  return (
    <div>
      <div className="overflow-x-auto pb-1">
        <div className="flex gap-[3px]" style={{ minWidth: weeks.length * 13 }}>
          {weeks.map((w) => (
            <div key={w.start} className="flex flex-col gap-[3px]">
              {w.days.map((d, di) => (
                <span
                  key={di}
                  title={`${d} commit${d === 1 ? '' : 's'} — week of ${w.start}`}
                  className="block h-[10px] w-[10px] rounded-[2px]"
                  style={{ background: LEVELS[level(d, max)] }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="mono mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-[0.6875rem] text-fg-soft">
        <span>
          <span className="text-fg">{total}</span> commits · last 52 weeks
        </span>
        {data.repoCount != null && (
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
