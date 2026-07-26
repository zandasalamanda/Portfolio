import Image from 'next/image';
import { bandr, everdeckPreview, products } from '@/content/site';
import { asset } from '@/lib/assets';

/**
 * Compact hairline-ruled rows for work in the lab (§6.2). Also hosts the
 * demoted Everdeck row when neither of its screenshots exists at build.
 */
export default function LabStrip({ includeEverdeck }: { includeEverdeck: boolean }) {
  const everdeck = products[2];
  const bandrShot = asset('bandr/shot-home.png');

  return (
    <section aria-label="In the lab" className="relative">
      <div className="mx-auto w-full max-w-[1200px] px-6 pb-20 pt-4 md:px-10 md:pb-32">
        <h2 className="eyebrow tz">In the lab</h2>

        {includeEverdeck && (
          <div className="tz mt-6 flex flex-wrap items-baseline gap-x-6 gap-y-2 border-t border-[var(--zone-hairline)] py-6">
            <h3 className="display text-2xl text-[var(--zone-fg)] tz">Everdeck</h3>
            <span className="eyebrow tz">private preview</span>
            <p className="w-full max-w-[62ch] leading-relaxed md:w-auto md:flex-1">
              {everdeck.description}
            </p>
            <p className="tz w-full text-[var(--zone-fg-soft)]">
              {everdeckPreview.copy}
              <a
                href={everdeckPreview.mailto}
                className="link-u tz text-[var(--zone-link)]"
              >
                {everdeckPreview.linkText}
              </a>
            </p>
          </div>
        )}

        <div
          className={`tz flex flex-wrap items-baseline gap-x-6 gap-y-2 border-[var(--zone-hairline)] py-6 ${includeEverdeck ? 'border-b' : 'mt-6 border-y'}`}
        >
          <h3 className="display text-2xl text-[var(--zone-fg)] tz">{bandr.name}</h3>
          <p className="w-full max-w-[62ch] leading-relaxed md:w-auto md:flex-1">
            {bandr.line}
          </p>
          <a
            href={bandr.repo}
            target="_blank"
            rel="noreferrer"
            className="mono link-x tz text-[var(--zone-link)]"
          >
            {bandr.repoLabel} <span aria-hidden>↗</span>
          </a>
          {bandrShot.exists && bandrShot.width && bandrShot.height && (
            <figure className="evidence-lift tz w-[104px] shrink-0 overflow-hidden rounded-[6px] bg-[var(--frame-bg)] shadow-[0_0_0_1px_var(--frame-ring)]">
              <Image
                src={bandrShot.url}
                alt="Bandr on a phone: ranked earning options, each with a move score and a plain-language reason it fits"
                width={bandrShot.width}
                height={bandrShot.height}
                sizes="104px"
                className="block h-auto w-full"
              />
            </figure>
          )}
        </div>
      </div>
    </section>
  );
}
