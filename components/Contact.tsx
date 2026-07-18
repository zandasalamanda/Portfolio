import { contact } from '@/content/site';

/** §6.5 — exact heading; email, LinkedIn, GitHub, resume. No phone number. */
export default function Contact({ resumeExists }: { resumeExists: boolean }) {
  return (
    <section id="contact" aria-label="Contact" className="relative scroll-mt-14">
      <div className="mx-auto w-full max-w-[1200px] px-6 pb-24 md:px-10 md:pb-40">
        <div className="tz border-t border-[var(--zone-hairline)] pt-14 md:pt-20">
          <h2 className="display max-w-[16ch] text-[clamp(2.25rem,5vw,4rem)] text-[var(--zone-fg)] tz">
            {contact.heading}
          </h2>
          <p className="mt-6 max-w-[48ch] text-[clamp(1.125rem,1.05rem+0.45vw,1.3125rem)] leading-relaxed">
            {contact.line}
          </p>
          <div className="mono mt-10 flex flex-wrap gap-x-8 gap-y-3">
            <a href={contact.mailto} className="link-x tz text-[var(--zone-link)]">
              {contact.email}
            </a>
            {contact.linkedin && (
              <a
                href={contact.linkedin}
                target="_blank"
                rel="noreferrer"
                className="link-x tz text-[var(--zone-link)]"
              >
                linkedin <span aria-hidden>↗</span>
              </a>
            )}
            <a
              href={contact.github}
              target="_blank"
              rel="noreferrer"
              className="link-x tz text-[var(--zone-link)]"
            >
              github/zandasalamanda <span aria-hidden>↗</span>
            </a>
            {resumeExists ? (
              <a
                href="/assets/resume-web.pdf"
                target="_blank"
                rel="noreferrer"
                className="link-x tz text-[var(--zone-link)]"
              >
                resume (pdf) <span aria-hidden>↗</span>
              </a>
            ) : (
              <span className="tz cursor-default text-[var(--zone-fg-soft)]">
                resume — awaiting file
              </span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
