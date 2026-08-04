export type Frame = 'phone' | 'browser';

/**
 * How a screenshot should be presented, decided by the capture's real shape
 * rather than by hand. Phone captures (1170×2532) are portrait; forcing those
 * into a landscape crop threw away most of the screen, which is what the old
 * uniform 16:10 tile did. Anything landscape reads as a window.
 */
export function frameFor(width?: number | null, height?: number | null): Frame {
  if (!width || !height) return 'browser';
  return width / height < 0.85 ? 'phone' : 'browser';
}
