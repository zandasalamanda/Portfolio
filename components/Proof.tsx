import github from '@/content/github.json';
import { identity, proofOfWork } from '@/content/site';

interface Lang {
  name: string;
  pct: number;
}

/** §6.3 — short, mostly mono. Real language split; no charts, no widgets. */
export default function Proof() {
  const languages = (github as { languages: Lang[] | null }).languages;

  return (
    <section aria-label="Proof of work" className="relative">
      <div className="mx-auto w-full max-w-[1200px] px-6 pb-20 md:px-10 md:pb-32">
        <div className="tz border-t border-[var(--zone-hairline)] pt-14 md:pt-20">
          <h2 className="eyebrow tz">Proof of work</h2>
          {languages && languages.length > 0 && (
            <p className="mono tz mt-6 text-[var(--zone-fg-soft)]">
              {languages.map((l) => `${l.name} ${l.pct}%`).join(' · ')}
              {' — '}across public repositories
            </p>
          )}
          <p className="mono tz mt-2 text-[var(--zone-fg)]">
            {proofOfWork.originalityLine}
          </p>
          <p className="mono tz mt-6">
            <a
              href={proofOfWork.profileUrl}
              target="_blank"
              rel="noreferrer"
              className="link-x tz text-[var(--zone-link)]"
            >
              {identity.githubHandle} <span aria-hidden>↗</span>
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
