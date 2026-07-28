/**
 * First-view reveal for evidence imagery — zero-JS: a CSS scroll-driven
 * animation (`animation-timeline: view()`) where supported, simply visible
 * everywhere else. Server component; no hydration cost.
 */
export default function Reveal({
  children,
  className = '',
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div className={`reveal-v ${className}`} style={style}>
      {children}
    </div>
  );
}
