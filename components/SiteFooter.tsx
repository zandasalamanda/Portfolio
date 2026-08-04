import Link from 'next/link';
import SocialRow from '@/components/SocialRow';
import { contact } from '@/content/site';
import { asset } from '@/lib/assets';

const NAV = [
  { label: 'About', href: '/about' },
  { label: 'Hire', href: '/hire' },
  { label: 'Projects', href: '/projects' },
  { label: 'Process', href: '/process' },
];

export default function SiteFooter() {
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
            <Link href="/hire#contact" className="btn-solid mt-6">
              Tell me what you need
            </Link>
            <a
              href={contact.mailto}
              className="mt-3 block text-[0.8125rem] text-fg-soft underline underline-offset-4 hover:text-fg"
            >
              or email {contact.email}
            </a>
            <SocialRow className="mt-7" />
          </div>

          <nav aria-label="Footer" className="flex flex-col gap-2.5">
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className="py-1.5 text-[0.875rem] text-fg-soft transition-colors duration-200 hover:text-fg"
              >
                {n.label}
              </Link>
            ))}
            {resume.exists && (
              <a
                href="/assets/resume-web.pdf"
                target="_blank"
                rel="noreferrer"
                className="py-1.5 text-[0.875rem] text-fg-soft transition-colors duration-200 hover:text-fg"
              >
                Résumé ↗
              </a>
            )}
          </nav>
        </div>

        <p className="mono mt-12 border-t border-line pt-6 text-[0.75rem] text-fg-faint">
          Designed and built by Zander Leon. Every link on this site is checked
          automatically before each release.
        </p>
      </div>
    </footer>
  );
}
