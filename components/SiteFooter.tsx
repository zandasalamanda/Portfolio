import Link from 'next/link';
import SocialRow from '@/components/SocialRow';
import verification from '@/content/verification.json';
import { contact } from '@/content/site';
import { asset } from '@/lib/assets';

const NAV = [
  { label: 'About', href: '/about' },
  { label: 'Hire', href: '/hire' },
  { label: 'Projects', href: '/projects' },
  { label: 'Activity', href: '/activity' },
];

export default function SiteFooter() {
  const verifiedAt = (verification as { verifiedAt: string | null }).verifiedAt;
  const resume = asset('resume-web.pdf');

  return (
    <footer className="border-t border-line">
      <div className="mx-auto w-full max-w-[var(--shell)] px-6 py-12 md:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-[34ch]">
            <p className="h-display text-[1.1875rem]">Let&rsquo;s build something.</p>
            <p className="mt-3 text-[0.875rem] prose-soft">
              Websites, apps, and AI that does real work. Tell me what you need — I
              reply within a day.
            </p>
            <a href={contact.mailto} className="btn-solid mt-6">
              {contact.email}
            </a>
            <SocialRow className="mt-7" />
          </div>

          <nav aria-label="Footer" className="flex flex-col gap-2.5">
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className="text-[0.8125rem] text-fg-soft transition-colors duration-200 hover:text-fg"
              >
                {n.label}
              </Link>
            ))}
            {resume.exists && (
              <a
                href="/assets/resume-web.pdf"
                target="_blank"
                rel="noreferrer"
                className="text-[0.8125rem] text-fg-soft transition-colors duration-200 hover:text-fg"
              >
                Résumé ↗
              </a>
            )}
          </nav>
        </div>

        <p className="mono mt-12 border-t border-line pt-6 text-[0.6875rem] text-fg-faint">
          Designed and built by Zander Leon. All links verified at build:{' '}
          {verifiedAt ?? 'pending'}. Next.js on Vercel.
        </p>
      </div>
    </footer>
  );
}
