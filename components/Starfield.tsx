/** Deterministic PRNG so the sky is identical on server and client. */
function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const rand = mulberry32(70324);
const STARS = Array.from({ length: 280 }, () => ({
  x: Math.round(rand() * 1000) / 10,
  y: Math.round(rand() * 1000) / 10,
  s: Math.round((0.7 + rand() * 1.6) * 10) / 10,
  o: Math.round((0.14 + rand() * 0.62) * 100) / 100,
  tw: Math.round((3 + rand() * 5) * 10) / 10,
  twd: Math.round(rand() * 50) / 10,
}));

/* Long cycles make a streak an event rather than weather — the flight itself
   is quick, then the sky stays quiet for the rest of the cycle. */
const SHOOTERS = [
  { top: '6%', left: '-8%', dx: '1200px', dy: '720px', dur: '38s', delay: '3s', a: '31deg' },
  { top: '-4%', left: '34%', dx: '900px', dy: '540px', dur: '47s', delay: '21s', a: '31deg' },
];

/** Night sky with occasional shooting stars — the Projects hero backdrop. */
export default function Starfield() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {STARS.map((s, i) => (
        <span
          key={i}
          className="twinkle absolute rounded-full bg-white"
          style={{
            top: `${s.y}%`,
            left: `${s.x}%`,
            width: s.s,
            height: s.s,
            opacity: s.o,
            ['--tw' as string]: `${s.tw}s`,
            ['--twd' as string]: `${s.twd}s`,
          }}
        />
      ))}
      {SHOOTERS.map((s, i) => (
        <span
          key={`sh-${i}`}
          className="shooting-star"
          style={{
            top: s.top,
            left: s.left,
            ['--dx' as string]: s.dx,
            ['--dy' as string]: s.dy,
            ['--dur' as string]: s.dur,
            ['--delay' as string]: s.delay,
            ['--a' as string]: s.a,
          }}
        />
      ))}
    </div>
  );
}
