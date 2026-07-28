import Image from 'next/image';
import { everdeckPreview, labItems, productById } from '@/content/site';
import { asset } from '@/lib/assets';
import Reveal from './Reveal';

/**
 * In the lab — current side projects. Ya Sabo leads with real phone captures;
 * the rest are hairline rows with repo receipts where public source exists.
 */
const SHOT_ALTS: Record<string, string> = {
  'yasabo/shot-home.png':
    'Ya Sabo home screen: daily goal ring completed, phrase of the day, and the daily listening clip',
  'yasabo/shot-loop.png':
    'Ya Sabo practice loop: a transcript with the slang phrase highlighted, its explanation, and got-it controls',
  'yasabo/shot-third.png':
    'Ya Sabo collection: banked Colombian slang cards with a weekly streak strip',
};

export default function Lab({ includeEverdeck }: { includeEverdeck: boolean }) {
  const everdeck = productById('everdeck');
  const yasabo = labItems.find((i) => i.name === 'Ya Sabo');
  const rows = labItems.filter((i) => i !== yasabo);

  return (
    <section aria-label="In the lab" className="relative">
      <div className="mx-auto w-full max-w-[1200px] px-6 pb-20 pt-4 md:px-10 md:pb-28">
        <div className="tz flex items-baseline justify-between border-b border-[var(--zone-hairline)] pb-3">
          <h2 className="eyebrow tz">In the lab</h2>
          <p className="mono tz hidden text-[0.6875rem] text-[var(--zone-fg-soft)] sm:block">
            current side projects
          </p>
        </div>

        {/* Ya Sabo — featured with real captures */}
        {yasabo && (
          <div className="mt-8 grid gap-8 md:grid-cols-[5fr_7fr] md:gap-12">
            <div>
              <div className="flex items-baseline gap-4">
                <h3 className="display text-3xl text-[var(--zone-fg)] tz">
                  {yasabo.name}
                </h3>
                {yasabo.status && <span className="eyebrow tz">{yasabo.status}</span>}
              </div>
              <p className="mt-4 max-w-[48ch] leading-relaxed">{yasabo.line}</p>
            </div>
            {yasabo.shots && (
              <div className="flex gap-4">
                {yasabo.shots.map((rel, i) => {
                  const a = asset(rel);
                  if (!a.exists || !a.width || !a.height) return null;
                  return (
                    <Reveal key={rel} className={`w-1/3 ${i === 1 ? 'mt-6' : ''}`}>
                      <figure className="evidence-lift tz overflow-hidden rounded-[6px] bg-[var(--frame-bg)] shadow-[0_0_0_1px_var(--frame-ring)]">
                        <Image
                          src={a.url}
                          alt={SHOT_ALTS[rel] ?? 'Ya Sabo app screen'}
                          width={a.width}
                          height={a.height}
                          sizes="(min-width: 768px) 18vw, 30vw"
                          className="block h-auto w-full"
                        />
                      </figure>
                    </Reveal>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {includeEverdeck && (
          <div className="tz mt-10 flex flex-wrap items-baseline gap-x-6 gap-y-2 border-t border-[var(--zone-hairline)] py-6">
            <h3 className="display text-2xl text-[var(--zone-fg)] tz">Everdeck</h3>
            <span className="eyebrow tz">private preview</span>
            <p className="w-full max-w-[62ch] leading-relaxed md:w-auto md:flex-1">
              {everdeck.description}
            </p>
            <p className="tz w-full text-[var(--zone-fg-soft)]">
              {everdeckPreview.copy}
              <a href={everdeckPreview.mailto} className="link-u tz text-[var(--zone-link)]">
                {everdeckPreview.linkText}
              </a>
            </p>
          </div>
        )}

        <ul className="mt-10">
          {rows.map((item) => (
            <li
              key={item.name}
              className="tz flex flex-wrap items-baseline gap-x-6 gap-y-1.5 border-t border-[var(--zone-hairline)] py-4 last:border-b"
            >
              <h3 className="font-display w-[110px] shrink-0 text-[1.0625rem] font-black text-[var(--zone-fg)] tz">
                {item.name}
              </h3>
              <p className="w-full leading-relaxed text-[0.9375rem] md:w-auto md:flex-1">
                {item.line}
              </p>
              {item.repo && (
                <a
                  href={item.repo}
                  target="_blank"
                  rel="noreferrer"
                  className="mono link-x tz text-[var(--zone-link)]"
                >
                  {item.repoLabel} <span aria-hidden>↗</span>
                </a>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
