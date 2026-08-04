import { NextResponse } from 'next/server';

/**
 * Receives the /hire contact form and forwards it by email through Resend.
 * Needs RESEND_API_KEY in the environment (free tier is fine — with an
 * unverified domain Resend delivers from onboarding@resend.dev to the
 * account owner's own address, which is exactly this use). Without the key
 * the route answers { fallback: true } and the form falls back to a
 * prefilled mailto link — it degrades, it never dead-ends.
 */

const TO = 'zander.leon@gmail.com';
const MAX = { name: 120, email: 200, message: 4000, budget: 60 };

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Bad request.' }, { status: 400 });
  }

  // Honeypot: real people never see this field, bots fill it.
  if (typeof body.company === 'string' && body.company.length > 0) {
    return NextResponse.json({ ok: true });
  }

  const name = String(body.name ?? '').trim().slice(0, MAX.name);
  const email = String(body.email ?? '').trim().slice(0, MAX.email);
  const message = String(body.message ?? '').trim().slice(0, MAX.message);
  const budget = String(body.budget ?? '').trim().slice(0, MAX.budget);

  if (!name || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { error: 'Name, a real email, and a message are required.' },
      { status: 400 },
    );
  }

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    return NextResponse.json({ fallback: true }, { status: 503 });
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: 'Portfolio <onboarding@resend.dev>',
      to: [TO],
      reply_to: email,
      subject: `New project inquiry — ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nBudget: ${budget || 'not stated'}\n\n${message}`,
    }),
  });

  if (!res.ok) {
    return NextResponse.json({ fallback: true }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
