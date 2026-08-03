import Link from 'next/link';
import verification from '@/content/verification.json';
import { contact, identity } from '@/content/site';
import { asset } from '@/lib/assets';

export default function SiteFooter() {
  const verifiedAt = (verification as { verifiedAt: string | null }).verifiedAt;
  const resume = asset('resume-web.pdf');

  return (
    <footer className="border-t border-line">
      <div className="mx-auto w-full max-w-[1200px] px-6 py-14 md:px-10">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-[36ch]">
            <p className="display text-3xl md:text-4xl">Let&rsquo;s build something.</p>
            <p className="mt-4 leading-relaxed text-fg-soft">
              Web design, full-stack builds, and AI that does real work. Tell me what
              you need — I reply within a day.
            </p>
            <a href={contact.mailto} className="cta mt-6 inline-block">
              {contact.email}
            </a>
          </div>

          <nav aria-label="Footer" className="mono flex flex-col gap-2 text-fg-soft">
            <Link href="/work" className="link-x w-fit hover:text-fg">
              Work
            </Link>
            <Link href="/hire" className="link-x w-fit hover:text-fg">
              Hire
            </Link>
            <Link href="/activity" className="link-x w-fit hover:text-fg">
              Activity
            </Link>
            <Link href="/about" className="link-x w-fit hover:text-fg">
              About
            </Link>
            <a
              href={identity.github}
              target="_blank"
              rel="noreferrer"
              className="link-x w-fit hover:text-fg"
            >
              GitHub ↗
            </a>
            <a
              href={contact.linkedin}
              target="_blank"
              rel="noreferrer"
              className="link-x w-fit hover:text-fg"
            >
              LinkedIn ↗
            </a>
            {resume.exists && (
              <a
                href="/assets/resume-web.pdf"
                target="_blank"
                rel="noreferrer"
                className="link-x w-fit hover:text-fg"
              >
                Résumé ↗
              </a>
            )}
          </nav>
        </div>

        <p className="mono mt-12 border-t border-line pt-6 text-[0.6875rem] leading-relaxed text-fg-faint">
          Designed and built by Zander Leon. All links verified at build:{' '}
          {verifiedAt ?? 'pending'}. Next.js on Vercel.
        </p>
      </div>
    </footer>
  );
}
