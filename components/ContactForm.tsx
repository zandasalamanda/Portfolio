'use client';

import { useState } from 'react';
import { contact } from '@/content/site';

type Status = 'idle' | 'sending' | 'sent' | 'fallback' | 'error';

const BUDGETS = ['Under $750', '$750 – $3,000', '$3,000 – $8,000', 'Not sure yet'];

/**
 * The four-field contact form. Posts to /api/contact; when the mail service
 * is not configured (or fails) it opens a prefilled email instead, so the
 * button always leads somewhere.
 */
export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');

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
        // Mail service not configured — open a prefilled email instead.
        const subject = encodeURIComponent(`Project inquiry — ${String(data.name ?? '')}`);
        const text = encodeURIComponent(
          `${String(data.message ?? '')}\n\nBudget: ${String(data.budget ?? 'not stated')}`,
        );
        window.location.href = `mailto:${contact.email}?subject=${subject}&body=${text}`;
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
      {status === 'fallback' && (
        <p role="status" className="mt-4 text-[0.8125rem] prose-soft">
          Your email app should have opened with the message ready to send.
        </p>
      )}
    </form>
  );
}
