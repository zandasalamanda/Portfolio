// gen-favicon.mjs
// Generates the site favicon: "ZL" monogram in Libre Franklin Black, converted
// to outlined vector paths (the written SVG contains no typeface reference at
// all — background rect + <path> elements only). Writes app/icon.svg, then
// rasterizes it to app/icon.png (32x32) with sharp.

import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import opentype from 'opentype.js';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const svgPath = path.join(root, 'app', 'icon.svg');
const pngPath = path.join(root, 'app', 'icon.png');

const TILE = 64;
const BG = '#FAFAF8';
const FG = '#101014';
const TRACKING_EM = -0.04; // tight tracking between Z and L, fraction of size
const TARGET_WIDTH = 0.66 * TILE; // monogram fills ~62-70% of tile width

const CANDIDATE_FILES = [
  'node_modules/@fontsource/libre-franklin/files/libre-franklin-latin-900-normal.woff',
  'node_modules/@fontsource/libre-franklin/files/libre-franklin-latin-800-normal.woff',
];

async function loadTypeface() {
  const errors = [];
  for (const rel of CANDIDATE_FILES) {
    const file = path.join(root, rel);
    try {
      const buf = await fs.readFile(file);
      const ab = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
      const parsed = opentype.parse(ab);
      console.log(`[gen-favicon] loaded ${rel}`);
      return parsed;
    } catch (err) {
      errors.push(`${rel}: ${err?.message ?? err}`);
    }
  }
  throw new Error(`could not parse any weight:\n  ${errors.join('\n  ')}`);
}

function unionBBox(a, b) {
  return {
    x1: Math.min(a.x1, b.x1),
    y1: Math.min(a.y1, b.y1),
    x2: Math.max(a.x2, b.x2),
    y2: Math.max(a.y2, b.y2),
  };
}

// Render Z then L at the given size/offset, with tight negative tracking
// between them, and return their path data + combined bounding box.
function compose(face, size, ox = 0, oy = 0) {
  const glyphZ = face.charToGlyph('Z');
  const glyphL = face.charToGlyph('L');
  const scale = size / face.unitsPerEm;
  const xL = ox + glyphZ.advanceWidth * scale + TRACKING_EM * size;
  const pathZ = glyphZ.getPath(ox, oy, size);
  const pathL = glyphL.getPath(xL, oy, size);
  const bbox = unionBBox(pathZ.getBoundingBox(), pathL.getBoundingBox());
  return { d: [pathZ.toPathData(2), pathL.toPathData(2)], bbox };
}

async function main() {
  const face = await loadTypeface();

  // First pass at a probe size to measure, then solve for the target width.
  const probe = compose(face, 100);
  const probeWidth = probe.bbox.x2 - probe.bbox.x1;
  const size = (TARGET_WIDTH / probeWidth) * 100;

  // Second pass: measure at final size, then offset so the ink box is
  // centered in the tile.
  const measured = compose(face, size);
  const w = measured.bbox.x2 - measured.bbox.x1;
  const h = measured.bbox.y2 - measured.bbox.y1;
  const dx = (TILE - w) / 2 - measured.bbox.x1;
  const dy = (TILE - h) / 2 - measured.bbox.y1;
  const final = compose(face, size, dx, dy);

  const svg = [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${TILE} ${TILE}">`,
    `<rect width="${TILE}" height="${TILE}" fill="${BG}"/>`,
    ...final.d.map((d) => `<path d="${d}" fill="${FG}"/>`),
    `</svg>`,
  ].join('');

  await fs.writeFile(svgPath, svg + '\n');

  // Sanity check the written file: outlined paths only, no typeface reference.
  const written = await fs.readFile(svgPath, 'utf8');
  if (!written.includes('<path')) throw new Error('sanity check failed: no <path> in icon.svg');
  if (written.toLowerCase().includes('font')) throw new Error('sanity check failed: typeface reference leaked into icon.svg');
  if (written.includes('<text')) throw new Error('sanity check failed: <text> element in icon.svg');

  await sharp(Buffer.from(written)).resize(32, 32).png().toFile(pngPath);

  const svgSize = (await fs.stat(svgPath)).size;
  const pngSize = (await fs.stat(pngPath)).size;
  console.log(`[gen-favicon] wrote app/icon.svg (${svgSize} bytes) and app/icon.png 32x32 (${pngSize} bytes)`);
  console.log(`[gen-favicon] monogram ink box: ${w.toFixed(1)}x${h.toFixed(1)} in ${TILE}x${TILE} (${((w / TILE) * 100).toFixed(0)}% width)`);
}

main().catch((err) => {
  console.error('[gen-favicon] failed:', err);
  process.exit(1);
});
