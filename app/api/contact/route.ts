import { NextResponse, type NextRequest } from 'next/server';

export const runtime = 'nodejs';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const MIN_FILL_MS = 2500;

/** Best-effort, per-instance rate limit. Good enough to blunt bursts on a personal site. */
const hits = new Map<string, number[]>();

function limited(key: string): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((time) => now - time < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(key, recent);
    return true;
  }
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5000) hits.clear();
  return false;
}

const text = (value: unknown) => (typeof value === 'string' ? value.trim() : '');
const fail = (error: string, status: number) => NextResponse.json({ error }, { status });

export async function POST(request: NextRequest) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO;
  if (!apiKey || !to) {
    return fail('Email delivery is not configured on this deployment. Please email me directly.', 503);
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return fail('Invalid request.', 400);
  }

  // Bots fill the hidden field or submit instantly. Accept quietly so they learn nothing.
  const elapsed = typeof body.elapsed === 'number' ? body.elapsed : 0;
  if (text(body.company) !== '' || elapsed < MIN_FILL_MS) {
    return NextResponse.json({ ok: true });
  }

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  if (limited(ip)) return fail('Too many messages for now. Please try again later or email me directly.', 429);

  const name = text(body.name);
  const email = text(body.email);
  const message = text(body.message);

  if (name.length < 2 || name.length > 100) return fail('Please enter your name.', 400);
  if (!EMAIL_PATTERN.test(email) || email.length > 200) return fail('Please enter a valid email address.', 400);
  if (message.length < 10 || message.length > 5000) return fail('Please write a message of 10 to 5000 characters.', 400);

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM ?? 'Portfolio <onboarding@resend.dev>',
        to: [to],
        reply_to: email,
        subject: `Portfolio — message from ${name.replace(/[\r\n]+/g, ' ')}`,
        text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      }),
    });
    if (!response.ok) return fail('The message could not be delivered. Please email me directly.', 502);
  } catch {
    return fail('The message could not be delivered. Please email me directly.', 502);
  }

  return NextResponse.json({ ok: true });
}
