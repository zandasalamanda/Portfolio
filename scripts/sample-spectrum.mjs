// Samples the ChronoIQ takeover spectrum from the real logo asset (§3 of the
// brief forbids speculative hexes). Finds the most vivid outline pixel in three
// vertical bands of the brain mark — coral (top), pink (middle), violet (bottom) —
// and writes them to content/spectrum.json.
import sharp from 'sharp';
import { writeFile } from 'node:fs/promises';

const SRC = new URL('../content/assets/chronoiq/logo.png', import.meta.url);
const OUT = new URL('../content/spectrum.json', import.meta.url);

const { data, info } = await sharp(SRC.pathname)
  .raw()
  .toBuffer({ resolveWithObject: true });

const { width, height, channels } = info;

function vividness(r, g, b) {
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const sat = max === 0 ? 0 : (max - min) / max;
  return sat * (max / 255);
}

function sampleBand(y0, y1) {
  let best = { score: -1, r: 0, g: 0, b: 0 };
  for (let y = Math.floor(height * y0); y < Math.floor(height * y1); y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * channels;
      const r = data[i], g = data[i + 1], b = data[i + 2];
      const score = vividness(r, g, b);
      if (score > best.score) best = { score, r, g, b };
    }
  }
  const hex = (n) => n.toString(16).padStart(2, '0').toUpperCase();
  return `#${hex(best.r)}${hex(best.g)}${hex(best.b)}`;
}

const spectrum = {
  source: 'content/assets/chronoiq/logo.png',
  coral: sampleBand(0.12, 0.3),
  pink: sampleBand(0.42, 0.55),
  violet: sampleBand(0.6, 0.72),
};

await writeFile(OUT, JSON.stringify(spectrum, null, 2) + '\n');
console.log('sampled spectrum:', spectrum);
