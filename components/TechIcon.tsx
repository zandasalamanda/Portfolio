import Image from 'next/image';
import { asset } from '@/lib/assets';

/**
 * A tech chip's icon: the real devicon SVG (self-hosted, copied at build by
 * scripts/build-tech-icons.mjs) where one exists, otherwise a small drawn
 * glyph so nothing ships as a bare word.
 */
const DRAWN: Record<string, React.ReactNode> = {
  claude: (
    <path
      d="M12 2.6 14.2 9l6.4 2.2-6.4 2.2L12 19.8 9.8 13.4 3.4 11.2 9.8 9z"
      fill="#d97757"
    />
  ),
  gemini: (
    <path
      d="M12 2.4c.5 4.7 4.5 8.7 9.2 9.2-4.7.5-8.7 4.5-9.2 9.2-.5-4.7-4.5-8.7-9.2-9.2 4.7-.5 8.7-4.5 9.2-9.2z"
      fill="#8ab4f8"
    />
  ),
  stripe: (
    <>
      <rect x="2.5" y="3.5" width="19" height="17" rx="3.5" fill="#635bff" />
      <path
        d="M11.6 9.9c0-.5.42-.7 1.1-.7.98 0 2.22.3 3.2.83V7.5a8.4 8.4 0 0 0-3.2-.6c-2.6 0-4.35 1.37-4.35 3.65 0 3.56 4.88 2.98 4.88 4.52 0 .6-.52.8-1.24.8-1.07 0-2.45-.44-3.53-1.04v2.6c1.2.52 2.4.74 3.53.74 2.67 0 4.5-1.32 4.5-3.63 0-3.84-4.9-3.15-4.9-4.63z"
        fill="#fff"
      />
    </>
  ),
  ai: (
    <>
      <circle cx="12" cy="12" r="8.4" stroke="#9c89fa" strokeWidth="1.5" fill="none" />
      <circle cx="12" cy="12" r="2.6" fill="#9c89fa" />
      <path
        d="M12 3.6v2.4M12 18v2.4M3.6 12H6M18 12h2.4"
        stroke="#9c89fa"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </>
  ),
  pwa: (
    <>
      <rect
        x="7.5"
        y="2.6"
        width="9"
        height="18.8"
        rx="2.4"
        stroke="#a1a1aa"
        strokeWidth="1.5"
        fill="none"
      />
      <path d="M10.7 18.6h2.6" stroke="#a1a1aa" strokeWidth="1.5" strokeLinecap="round" />
    </>
  ),
  code: (
    <path
      d="M8.6 8.2 4.8 12l3.8 3.8M15.4 8.2 19.2 12l-3.8 3.8M13.4 6.4l-2.8 11.2"
      stroke="#a1a1aa"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  ),
};

/** label → drawn glyph, for tech devicon does not carry */
const DRAWN_FOR: Record<string, string> = {
  Claude: 'claude',
  Gemini: 'gemini',
  'Gemini (structured output)': 'gemini',
  Stripe: 'stripe',
  'AI planning': 'ai',
  'AI workspace': 'ai',
  'Document + spreadsheet AI': 'ai',
  'Structured output': 'ai',
  'Deterministic fallbacks': 'ai',
  'Google APIs': 'ai',
  'Google Places': 'ai',
  'Supabase Edge Functions': 'code',
  'Rule engine': 'code',
  PWA: 'pwa',
  'On-device': 'pwa',
  Speech: 'code',
  Clerk: 'code',
  'Light + dark themes': 'code',
};

function slugify(label: string) {
  return label.toLowerCase().replace(/[^a-z0-9]+/g, '-');
}

export default function TechIcon({
  label,
  className = 'h-3.5 w-3.5',
}: {
  label: string;
  className?: string;
}) {
  const svg = asset(`tech/${slugify(label)}.svg`);
  if (svg.exists) {
    return (
      <Image
        src={svg.url}
        alt=""
        width={14}
        height={14}
        unoptimized
        className={`${className} shrink-0 object-contain`}
      />
    );
  }
  const drawn = DRAWN_FOR[label];
  if (!drawn) return null;
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={`${className} shrink-0`}>
      {DRAWN[drawn]}
    </svg>
  );
}
