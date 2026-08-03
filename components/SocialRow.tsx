import { contact, identity } from '@/content/site';

const ICONS: Record<string, React.ReactNode> = {
  github: (
    <path d="M12 .5a12 12 0 0 0-3.79 23.4c.6.1.82-.26.82-.58v-2.2c-3.34.72-4.04-1.6-4.04-1.6-.55-1.4-1.34-1.77-1.34-1.77-1.1-.75.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.84 2.81 1.31 3.5 1 .1-.78.42-1.31.76-1.61-2.67-.3-5.47-1.34-5.47-5.96 0-1.32.47-2.4 1.24-3.24-.12-.3-.54-1.52.12-3.18 0 0 1-.32 3.3 1.24a11.4 11.4 0 0 1 6 0c2.3-1.56 3.3-1.24 3.3-1.24.66 1.66.24 2.88.12 3.18.77.84 1.24 1.92 1.24 3.24 0 4.63-2.8 5.65-5.48 5.95.43.37.81 1.1.81 2.22v3.29c0 .32.22.69.83.57A12 12 0 0 0 12 .5Z" />
  ),
  linkedin: (
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.42v1.56h.05a3.75 3.75 0 0 1 3.37-1.85c3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.55V9h3.57v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0Z" />
  ),
  mail: (
    <path d="M1.5 4.5h21v15h-21v-15Zm1.8 1.8v.6l8.7 5.44 8.7-5.44v-.6H3.3Zm17.4 3.06-7.7 4.82a1.5 1.5 0 0 1-1.6 0L3.7 9.36v8.34h16.6V9.36Z" />
  ),
};

const LINKS = [
  { key: 'github', label: 'GitHub', href: identity.github },
  { key: 'linkedin', label: 'LinkedIn', href: contact.linkedin },
  { key: 'mail', label: 'Email', href: contact.mailto },
];

/** Monochrome icon row, like the template's social strip. */
export default function SocialRow({ className = '' }: { className?: string }) {
  return (
    <ul className={`flex items-center gap-5 ${className}`}>
      {LINKS.map((l) => (
        <li key={l.key}>
          <a
            href={l.href}
            {...(l.href.startsWith('http') ? { target: '_blank', rel: 'noreferrer' } : {})}
            aria-label={l.label}
            className="block text-fg-soft transition-colors duration-200 hover:text-fg"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-[22px] w-[22px]">
              {ICONS[l.key]}
            </svg>
          </a>
        </li>
      ))}
    </ul>
  );
}
