import About from '@/components/About';
import Archive from '@/components/Archive';
import CaseBandr from '@/components/CaseBandr';
import CaseChronoIQ from '@/components/CaseChronoIQ';
import CaseEverdeck, { everdeckShots } from '@/components/CaseEverdeck';
import CaseSolaspace from '@/components/CaseSolaspace';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Lab from '@/components/Lab';
import Proof from '@/components/Proof';
import TakeoverLayer, { type ZoneId } from '@/components/TakeoverLayer';
import TeamHelios from '@/components/TeamHelios';
import { asset } from '@/lib/assets';

export default function Home() {
  const resumeExists = asset('resume-web.pdf').exists;

  // Demotion rule (§6.2): Everdeck is a full takeover case only when at least
  // one of its screenshots exists at build; otherwise it joins the lab.
  const everdeckPromoted = everdeckShots.some((rel) => asset(rel).exists);

  const zones: ZoneId[] = everdeckPromoted
    ? ['chronoiq', 'bandr', 'solaspace', 'everdeck']
    : ['chronoiq', 'bandr', 'solaspace'];

  return (
    <>
      <TakeoverLayer zones={zones} />
      <Header resumeExists={resumeExists} />
      <main id="top" className="flex-1">
        <Hero />
        <About />

        <div id="work" className="scroll-mt-[52px]">
          <div className="mx-auto w-full max-w-[1200px] px-6 pt-10 md:px-10 md:pt-14">
            <div className="tz flex items-baseline justify-between border-b border-[var(--zone-hairline)] pb-3">
              <h2 className="eyebrow tz">The work</h2>
              <p className="mono tz text-[0.6875rem] text-[var(--zone-fg-soft)]">
                2025 — 2026 · in build order
              </p>
            </div>
          </div>

          <CaseChronoIQ />
          <CaseBandr />
          <CaseSolaspace />
          {everdeckPromoted && <CaseEverdeck />}
          <Lab includeEverdeck={!everdeckPromoted} />
          <Archive />
          <TeamHelios />
        </div>

        <Proof />
        <Contact resumeExists={resumeExists} />
      </main>
      <Footer />
    </>
  );
}
