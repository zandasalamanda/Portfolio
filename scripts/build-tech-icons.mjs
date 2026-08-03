// Copies the devicon SVGs this site actually uses into content/assets/tech/,
// so the icons are self-hosted (no CDN request) and only what we need ships.
// Tech with no devicon entry (Claude, Gemini, Stripe, PWA…) is drawn in
// components/TechIcon.tsx instead.
import { copyFile, mkdir, readdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = new URL('..', import.meta.url).pathname;
const SRC = join(ROOT, 'node_modules/devicon/icons');
const OUT = join(ROOT, 'content/assets/tech');

/** label used on the site → devicon folder + variant */
const MAP = {
  React: ['react', 'original'],
  'Next.js': ['nextjs', 'original'],
  TypeScript: ['typescript', 'original'],
  JavaScript: ['javascript', 'original'],
  Tailwind: ['tailwindcss', 'original'],
  'Node.js': ['nodejs', 'original'],
  Node: ['nodejs', 'original'],
  Python: ['python', 'original'],
  Java: ['java', 'original'],
  'C#': ['csharp', 'original'],
  Unity: ['unity', 'original'],
  Supabase: ['supabase', 'original'],
  Postgres: ['postgresql', 'original'],
  Vite: ['vitejs', 'original'],
  OpenCV: ['opencv', 'original'],
  Cloudflare: ['cloudflare', 'original'],
  'Cloudflare D1': ['cloudflare', 'original'],
  Git: ['git', 'original'],
  CSS: ['css3', 'original'],
  HTML: ['html5', 'original'],
  'C++': ['cplusplus', 'original'],
  Docker: ['docker', 'original'],
  Figma: ['figma', 'original'],
  YOLOv8: ['python', 'original'],
  Processing: ['java', 'original'],
};

await mkdir(OUT, { recursive: true });

let copied = 0;
const missing = [];
for (const [label, [name, variant]] of Object.entries(MAP)) {
  const dir = join(SRC, name);
  if (!existsSync(dir)) {
    missing.push(label);
    continue;
  }
  const files = await readdir(dir);
  const file =
    files.find((f) => f === `${name}-${variant}.svg`) ??
    files.find((f) => f.endsWith('-original.svg')) ??
    files.find((f) => f.endsWith('.svg'));
  if (!file) {
    missing.push(label);
    continue;
  }
  const slug = label.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  await copyFile(join(dir, file), join(OUT, `${slug}.svg`));
  copied += 1;
}

console.log(`[tech-icons] copied ${copied} devicon svgs to content/assets/tech`);
if (missing.length) console.log(`[tech-icons] no devicon for: ${missing.join(', ')}`);
