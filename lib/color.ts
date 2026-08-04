/**
 * Whether a stage colour is light enough that white window chrome would
 * disappear on it. ChronoIQ and Atlas are light-themed apps, so their cards
 * need dark dots and a dark label where the dark-themed ones need pale ones.
 */
export function isLight(hex: string): boolean {
  const raw = hex.replace('#', '');
  const full =
    raw.length === 3
      ? raw
          .split('')
          .map((c) => c + c)
          .join('')
      : raw;
  if (full.length < 6) return false;
  const r = parseInt(full.slice(0, 2), 16);
  const g = parseInt(full.slice(2, 4), 16);
  const b = parseInt(full.slice(4, 6), 16);
  if ([r, g, b].some(Number.isNaN)) return false;
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255 > 0.6;
}
