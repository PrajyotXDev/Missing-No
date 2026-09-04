import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const name = String(body.name ?? '').trim();
    const email = String(body.email ?? '').trim();
    const subject = String(body.subject ?? 'Portfolio enquiry').trim();
    const message = String(body.message ?? '').trim();

    if (!name || !email || !message) return NextResponse.json({ error: 'Name, email and message are required.' }, { status: 400 });
    if (!/^\S+@\S+\.\S+$/.test(email)) return NextResponse.json({ error: 'Please enter a valid email.' }, { status: 400 });
    if (name.length > 100 || subject.length > 160 || message.length > 5000) return NextResponse.json({ error: 'Message is too long.' }, { status: 400 });

    // Production hook: connect this endpoint to Resend, Formspree, Supabase, etc.
    // It intentionally returns success without exposing credentials or logging personal data.
    return NextResponse.json({ ok: true, message: `Thanks ${name}, your message is ready to be delivered.` });
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }
}
