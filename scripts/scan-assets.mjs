// scan-assets.mjs
// Syncs client-provided assets from content/assets/ into public/assets/ and
// writes content/asset-manifest.json describing what exists (with dimensions).
// public/assets/ is generated output and is gitignored; content/assets/ is committed.

import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const srcDir = path.join(root, 'content', 'assets');
const destDir = path.join(root, 'public', 'assets');
const manifestPath = path.join(root, 'content', 'asset-manifest.json');
const gitignorePath = path.join(root, '.gitignore');

// Expected asset list (design brief § 9). Every key appears in the manifest
// even when the file is missing (exists: false).
const EXPECTED = [
  { key: 'chronoiq/logo.png', optional: false },
  { key: 'chronoiq/shot-dashboard.png', optional: false },
  { key: 'chronoiq/shot-focus.png', optional: false },
  { key: 'chronoiq/video-poster.jpg', optional: false },
  { key: 'chronoiq/award-photo.jpg', optional: true },
  { key: 'solaspace/logo.svg', optional: false },
  { key: 'solaspace/shot-map.png', optional: false },
  { key: 'solaspace/shot-sola.png', optional: false },
  { key: 'solaspace/shot-review.png', optional: false },
  { key: 'solaspace/shot-list.png', optional: true },
  { key: 'solaspace/shot-focus.png', optional: true },
  { key: 'everdeck/logo.svg', optional: false },
  { key: 'everdeck/shot-landing.png', optional: false },
  { key: 'everdeck/shot-landing-2.png', optional: true },
  { key: 'bandr/shot-home.png', optional: false },
  { key: 'bandr/shot-detail.png', optional: false },
  { key: 'bandr/shot-quiz.png', optional: false },
  { key: 'bandr/shot-kit.png', optional: false },
  { key: 'yasabo/shot-home.png', optional: true },
  { key: 'yasabo/shot-loop.png', optional: true },
  { key: 'yasabo/shot-third.png', optional: true },
  { key: 'helios/logo.png', optional: false },
  { key: 'helios/velocity-plot.png', optional: false },
  { key: 'helios/team-photo.jpg', optional: true },
  { key: 'gallery/work-01.jpg', optional: false },
  { key: 'gallery/work-02.jpg', optional: false },
  { key: 'gallery/work-03.jpg', optional: false },
  { key: 'gallery/work-04.jpg', optional: false },
  { key: 'gallery/work-05.jpg', optional: false },
  { key: 'headshot.jpg', optional: true },
  { key: 'resume-web.pdf', optional: true, dimensions: false },
];

const IMAGE_EXT = new Set(['.png', '.jpg', '.jpeg', '.webp', '.gif', '.avif', '.svg', '.tiff']);

async function listFiles(dir, base = dir) {
  let entries;
  try {
    entries = await fs.readdir(dir, { withFileTypes: true });
  } catch {
    return [];
  }
  const files = [];
  for (const entry of entries) {
    if (entry.name === '.DS_Store') continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await listFiles(full, base)));
    } else if (entry.isFile()) {
      files.push(path.relative(base, full).split(path.sep).join('/'));
    }
  }
  return files;
}

async function imageDimensions(filePath) {
  try {
    const meta = await sharp(filePath).metadata();
    if (meta.width && meta.height) return { width: meta.width, height: meta.height };
  } catch {
    // not something sharp can read — no dimensions
  }
  return null;
}

async function ensureGitignore() {
  const line = '/public/assets/';
  let text = '';
  try {
    text = await fs.readFile(gitignorePath, 'utf8');
  } catch {
    // no .gitignore yet — create one
  }
  const hasLine = text
    .split(/\r?\n/)
    .some((l) => l.trim() === line || l.trim() === 'public/assets/' || l.trim() === 'public/assets');
  if (!hasLine) {
    const chunk = `${text.length && !text.endsWith('\n') ? '\n' : ''}\n# generated at build from content/assets (committed source)\n${line}\n`;
    await fs.writeFile(gitignorePath, text + chunk);
    console.log(`[scan-assets] added ${line} to .gitignore`);
  }
}

async function main() {
  const present = await listFiles(srcDir);

  // Sync: recursive copy content/assets -> public/assets, preserving names.
  await fs.mkdir(destDir, { recursive: true });
  for (const rel of present) {
    const from = path.join(srcDir, ...rel.split('/'));
    const to = path.join(destDir, ...rel.split('/'));
    await fs.mkdir(path.dirname(to), { recursive: true });
    await fs.copyFile(from, to);
  }

  const presentSet = new Set(present);
  const assets = {};

  const describe = async (key, optional, wantDimensions) => {
    const exists = presentSet.has(key);
    const entry = { exists, optional };
    if (exists && wantDimensions && IMAGE_EXT.has(path.extname(key).toLowerCase())) {
      const dims = await imageDimensions(path.join(srcDir, ...key.split('/')));
      if (dims) {
        entry.width = dims.width;
        entry.height = dims.height;
      }
    }
    return entry;
  };

  for (const { key, optional, dimensions = true } of EXPECTED) {
    assets[key] = await describe(key, optional, dimensions);
  }

  // Extras: anything present in content/assets that isn't in the expected list.
  const expectedKeys = new Set(EXPECTED.map((e) => e.key));
  for (const rel of present.sort()) {
    if (!expectedKeys.has(rel)) {
      assets[rel] = await describe(rel, true, true);
    }
  }

  const manifest = { generatedAt: new Date().toISOString(), assets };
  await fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2) + '\n');
  await ensureGitignore();

  const missingRequired = EXPECTED.filter((e) => !e.optional && !presentSet.has(e.key)).map((e) => e.key);
  const missingOptional = EXPECTED.filter((e) => e.optional && !presentSet.has(e.key)).map((e) => e.key);
  console.log(`[scan-assets] synced ${present.length} file(s) to public/assets/`);
  console.log(`[scan-assets] wrote ${path.relative(root, manifestPath)} (${Object.keys(assets).length} entries)`);
  if (missingRequired.length) console.warn(`[scan-assets] MISSING required: ${missingRequired.join(', ')}`);
  if (missingOptional.length) console.log(`[scan-assets] missing optional: ${missingOptional.join(', ')}`);
}

main().catch((err) => {
  console.error('[scan-assets] failed:', err);
  process.exit(1);
});
