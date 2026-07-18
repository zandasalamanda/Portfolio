import verification from '@/content/verification.json';

/** §6.5 — footer on --void; the verification timestamp is the colophon. */
export default function Footer() {
  const verifiedAt = (verification as { verifiedAt: string | null }).verifiedAt;

  return (
    <footer className="bg-void">
      <div className="mx-auto w-full max-w-[1200px] px-6 py-10 md:px-10">
        <p className="mono text-[0.6875rem] leading-relaxed text-paper/60">
          Designed and built by Zander Leon. All links verified at build:{' '}
          {verifiedAt ?? 'pending'}. Next.js on Vercel.
        </p>
      </div>
    </footer>
  );
}
