/**
 * Remounts on every route change, so the page-enter animation replays each
 * time a page is opened — the "built in front of you" feel, kept subtle.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
