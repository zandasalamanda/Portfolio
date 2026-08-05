'use client';

import { useState } from 'react';
import { contact } from '@/content/site';

type Status = 'idle' | 'sending' | 'sent' | 'fallback' | 'error';

interface Draft {
  name: string;
  email: string;
  message: string;
  budget: string;
}

const BUDGETS = ['Under $750', '$750 – $3,000', '$3,000 – $8,000', 'Not sure yet'];

/**
 * The four-field contact form. Posts to /api/contact and, when the mail
 * service is not configured, hands the visitor a written message plus every
 * way to send it.
 *
 * It deliberately does NOT navigate to a mailto: link. On a machine with no
 * default mail client — plenty of Windows PCs — mailto: does nothing at all,
 * so the button appeared broken. Webmail compose links open in any browser,
 * and copy-to-clipboard works even when nothing else does.
 */
export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');
  const [draft, setDraft] = useState<Draft | null>(null);
  const [copied, setCopied] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus('sending');
    setError('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setStatus('sent');
        form.reset();
        return;
      }
      const body = (await res.json().catch(() => ({}))) as {
        fallback?: boolean;
        error?: string;
      };
      if (body.fallback) {
        /* Mail service not configured — hand the message back with every
           route out, rather than firing a mailto: that may go nowhere. */
        setDraft({
          name: String(data.name ?? ''),
          email: String(data.email ?? ''),
          message: String(data.message ?? ''),
          budget: String(data.budget ?? 'not stated'),
        });
        setStatus('fallback');
      } else {
        setStatus('error');
        setError(body.error ?? 'Something went wrong.');
      }
    } catch {
      setStatus('error');
      setError('Could not reach the server.');
    }
  }

  if (status === 'fallback' && draft) {
    const subject = `Project inquiry — ${draft.name}`;
    const bodyText = `${draft.message}\n\nBudget: ${draft.budget}\nFrom: ${draft.name} <${draft.email}>`;
    const q = (v: string) => encodeURIComponent(v);
    const routes = [
      {
        label: 'Open in Gmail',
        href: `https://mail.google.com/mail/?view=cm&fs=1&to=${q(contact.email)}&su=${q(subject)}&body=${q(bodyText)}`,
        external: true,
      },
      {
        label: 'Open in Outlook',
        href: `https://outlook.live.com/mail/0/deeplink/compose?to=${q(contact.email)}&subject=${q(subject)}&body=${q(bodyText)}`,
        external: true,
      },
      {
        label: 'Use my mail app',
        href: `mailto:${contact.email}?subject=${q(subject)}&body=${q(bodyText)}`,
        external: false,
      },
    ];

    return (
      <div className="card p-6 md:p-8" role="status">
        <p className="h-ui text-[1.0625rem]">Almost there — your message is ready.</p>
        <p className="mt-2 max-w-[52ch] text-[0.9375rem] prose-soft">
          Send it with one of these, or copy it and email me however you like.
          Either way it reaches {contact.email}.
        </p>

        <pre className="mt-5 max-h-56 overflow-auto whitespace-pre-wrap rounded-lg border border-line bg-black/30 p-4 text-[0.875rem] text-fg-soft">
          {bodyText}
        </pre>

        <div className="mt-5 flex flex-wrap gap-2.5">
          {routes.map((r, i) => (
            <a
              key={r.label}
              href={r.href}
              {...(r.external ? { target: '_blank', rel: 'noreferrer' } : {})}
              className={i === 0 ? 'btn-solid' : 'btn-ghost'}
            >
              {r.label}
              {r.external && <span aria-hidden> ↗</span>}
            </a>
          ))}
          <button
            type="button"
            className="btn-ghost"
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(bodyText);
                setCopied(true);
                window.setTimeout(() => setCopied(false), 2500);
              } catch {
                setCopied(false);
              }
            }}
          >
            {copied ? 'Copied ✓' : 'Copy message'}
          </button>
        </div>

        <p className="mt-5 border-t border-line pt-4 text-[0.875rem] prose-soft">
          Would rather talk?{' '}
          <a href={contact.tel} className="text-accent underline underline-offset-4">
            {contact.phone}
          </a>
        </p>
      </div>
    );
  }

  if (status === 'sent') {
    return (
      <div className="card p-6 text-center md:p-8" role="status">
        <p aria-hidden className="text-accent">
          ✓
        </p>
        <p className="h-ui mt-2 text-[1.0625rem]">Got it — thank you.</p>
        <p className="mt-2 text-[0.9375rem] prose-soft">
          I read every message myself and reply within a day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="card p-6 md:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mono text-[0.6875rem] uppercase tracking-[0.12em] text-fg-soft">
            Your name
          </span>
          <input name="name" required maxLength={120} autoComplete="name" className="field mt-1.5" />
        </label>
        <label className="block">
          <span className="mono text-[0.6875rem] uppercase tracking-[0.12em] text-fg-soft">
            Email
          </span>
          <input
            name="email"
            type="email"
            required
            maxLength={200}
            autoComplete="email"
            className="field mt-1.5"
          />
        </label>
      </div>

      <label className="mt-4 block">
        <span className="mono text-[0.6875rem] uppercase tracking-[0.12em] text-fg-soft">
          What is going wrong, or what do you need?
        </span>
        <textarea
          name="message"
          required
          maxLength={4000}
          rows={5}
          placeholder="Plain words are perfect. Send the messy version."
          className="field mt-1.5 resize-y"
        />
      </label>

      <fieldset className="mt-4">
        <legend className="mono text-[0.6875rem] uppercase tracking-[0.12em] text-fg-soft">
          Rough budget <span className="normal-case tracking-normal">(optional)</span>
        </legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {BUDGETS.map((b) => (
            <label key={b} className="budget-chip">
              <input type="radio" name="budget" value={b} className="sr-only" />
              <span>{b}</span>
            </label>
          ))}
        </div>
      </fieldset>

      {/* honeypot — hidden from people, tempting to bots */}
      <label className="hidden" aria-hidden>
        Company
        <input name="company" tabIndex={-1} autoComplete="off" />
      </label>

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <button type="submit" disabled={status === 'sending'} className="btn-solid">
          {status === 'sending' ? 'Sending…' : 'Send it over'}
        </button>
        <a href={contact.mailto} className="text-[0.8125rem] text-fg-soft underline underline-offset-4 hover:text-fg">
          or email {contact.email}
        </a>
      </div>

      {status === 'error' && (
        <p role="alert" className="mt-4 text-[0.8125rem] text-[#ff9d94]">
          {error} You can email me directly instead: {contact.email}
        </p>
      )}
    </form>
  );
}
