import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';
import github from '@/content/github.json';
import { positioning } from '@/content/site';

export const alt = positioning.title;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// Static-weight font files — satori does not support variable fonts (§3).
async function loadFont(file: string): Promise<ArrayBuffer> {
  const buf = await readFile(join(process.cwd(), 'content/fonts', file));
  return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength) as ArrayBuffer;
}

export default async function OgImage() {
  const [libre, mono] = await Promise.all([
    loadFont('libre-franklin-latin-900-normal.woff'),
    loadFont('jetbrains-mono-latin-400-normal.woff'),
  ]);

  const rows = (
    github as { products: { name: string; status: string; date: string }[] }
  ).products.slice(0, 3);

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#0b0b0e',
          color: '#fafaf8',
          padding: '56px 64px',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontFamily: 'JetBrains Mono',
            fontSize: 20,
            color: 'rgba(250,250,248,0.6)',
          }}
        >
          <span>student developer</span>
          <span>shipped work · live receipts</span>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            marginTop: 'auto',
          }}
        >
          <div
            style={{
              fontFamily: 'Libre Franklin',
              fontSize: 118,
              letterSpacing: '-0.03em',
              lineHeight: 0.95,
              textTransform: 'uppercase',
            }}
          >
            Zander Leon
          </div>
          <div
            style={{
              marginTop: 28,
              fontFamily: 'JetBrains Mono',
              fontSize: 26,
              color: 'rgba(250,250,248,0.92)',
            }}
          >
            I build software that ships.
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            marginTop: 'auto',
            borderTop: '1px solid rgba(250,250,248,0.14)',
            paddingTop: 24,
            gap: 40,
            fontFamily: 'JetBrains Mono',
            fontSize: 20,
            color: 'rgba(250,250,248,0.6)',
          }}
        >
          {rows.map((p) => (
            <span key={p.name}>
              {p.name} — {p.status}
            </span>
          ))}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'Libre Franklin', data: libre, weight: 900, style: 'normal' },
        { name: 'JetBrains Mono', data: mono, weight: 400, style: 'normal' },
      ],
    },
  );
}
