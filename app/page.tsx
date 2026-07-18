import About from '@/components/About';
import CaseChronoIQ from '@/components/CaseChronoIQ';
import CaseEverdeck from '@/components/CaseEverdeck';
import CaseSolaspace from '@/components/CaseSolaspace';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import LabStrip from '@/components/LabStrip';
import Proof from '@/components/Proof';
import TakeoverLayer, { type ZoneId } from '@/components/TakeoverLayer';
import { asset } from '@/lib/assets';

export default function Home() {
  const resumeExists = asset('resume-web.pdf').exists;

  // Demotion rule (§6.2): Everdeck is a full takeover case only when at least
  // one of its screenshots exists at build; otherwise it joins the lab strip.
  const everdeckPromoted =
    asset('everdeck/shot-deck.png').exists || asset('everdeck/shot-prospect.png').exists;

  const zones: ZoneId[] = everdeckPromoted
    ? ['chronoiq', 'solaspace', 'everdeck']
    : ['chronoiq', 'solaspace'];

  return (
    <>
      <TakeoverLayer zones={zones} />
      <Header resumeExists={resumeExists} />
      <main id="top" className="flex-1">
        <Hero />

        <div id="work" className="scroll-mt-[52px]">
          <div className="mx-auto w-full max-w-[1200px] px-6 pt-20 md:px-10 md:pt-28">
            <div className="tz flex items-baseline justify-between border-b border-[var(--zone-hairline)] pb-3">
              <h2 className="eyebrow tz">Shipped</h2>
              <p className="mono tz text-[0.6875rem] text-[var(--zone-fg-soft)]">
                2025 — 2026
              </p>
            </div>
          </div>

          <CaseChronoIQ />
          <CaseSolaspace />
          {everdeckPromoted && <CaseEverdeck />}
          <LabStrip includeEverdeck={!everdeckPromoted} />
        </div>

        <Proof />
        <About />
        <Contact resumeExists={resumeExists} />
      </main>
      <Footer />
    </>
  );
}
