'use client';

import { useRef, useState, type FormEvent } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Magnetic } from '@/components/ui/Magnetic';

type Props = {
  email: string;
  /** True when the server can deliver mail. Otherwise the form composes a message in the visitor's mail app. */
  delivery: boolean;
};

type Fields = { name: string; email: string; message: string };
type Errors = Partial<Record<keyof Fields, string>>;
type Status =
  | { kind: 'idle' }
  | { kind: 'sending' }
  | { kind: 'sent' }
  | { kind: 'composed' }
  | { kind: 'error'; message: string };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(fields: Fields): Errors {
  const errors: Errors = {};
  if (fields.name.trim().length < 2) errors.name = 'Please tell me your name.';
  if (!EMAIL_PATTERN.test(fields.email.trim())) errors.email = 'That email address does not look right.';
  if (fields.message.trim().length < 10) errors.message = 'A sentence or two is enough — at least 10 characters.';
  return errors;
}

export function ContactForm({ email, delivery }: Props) {
  const [fields, setFields] = useState<Fields>({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>({ kind: 'idle' });
  const honeypot = useRef<HTMLInputElement>(null);
  const mountedAt = useRef(Date.now());

  const set = (key: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFields((current) => ({ ...current, [key]: e.target.value }));
    if (errors[key]) setErrors((current) => ({ ...current, [key]: undefined }));
  };

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = validate(fields);
    setErrors(found);
    const first = (Object.keys(found) as Array<keyof Fields>)[0];
    if (first) {
      e.currentTarget.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    if (!delivery) {
      const subject = encodeURIComponent(`Hello from ${fields.name.trim()}`);
      const body = encodeURIComponent(`${fields.message.trim()}\n\n— ${fields.name.trim()}\n${fields.email.trim()}`);
      window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
      setStatus({ kind: 'composed' });
      return;
    }

    setStatus({ kind: 'sending' });
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...fields,
          company: honeypot.current?.value ?? '',
          elapsed: Date.now() - mountedAt.current,
        }),
      });
      const data: { error?: string } = await response.json().catch(() => ({}));
      if (!response.ok) {
        setStatus({ kind: 'error', message: data.error ?? 'Something went wrong. Please email me directly.' });
        return;
      }
      setStatus({ kind: 'sent' });
      setFields({ name: '', email: '', message: '' });
    } catch {
      setStatus({ kind: 'error', message: 'Network error. Please email me directly instead.' });
    }
  }

  const sending = status.kind === 'sending';

  return (
    <form onSubmit={onSubmit} noValidate aria-label="Contact form">
      <div className="grid gap-x-6 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className="label text-mute">
            Name
          </label>
          <input
            id="cf-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            maxLength={100}
            value={fields.name}
            onChange={set('name')}
            aria-invalid={errors.name ? 'true' : undefined}
            aria-describedby={errors.name ? 'cf-name-error' : undefined}
            placeholder="Your name"
            className="field"
          />
          <p id="cf-name-error" role="alert" className="min-h-6 pt-1.5 text-sm text-[#ff9c82]">
            {errors.name}
          </p>
        </div>
        <div>
          <label htmlFor="cf-email" className="label text-mute">
            Email
          </label>
          <input
            id="cf-email"
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            required
            maxLength={200}
            value={fields.email}
            onChange={set('email')}
            aria-invalid={errors.email ? 'true' : undefined}
            aria-describedby={errors.email ? 'cf-email-error' : undefined}
            placeholder="you@domain.com"
            className="field"
          />
          <p id="cf-email-error" role="alert" className="min-h-6 pt-1.5 text-sm text-[#ff9c82]">
            {errors.email}
          </p>
        </div>
      </div>

      <div className="mt-2">
        <label htmlFor="cf-message" className="label text-mute">
          Message
        </label>
        <textarea
          id="cf-message"
          name="message"
          required
          rows={4}
          maxLength={5000}
          value={fields.message}
          onChange={set('message')}
          aria-invalid={errors.message ? 'true' : undefined}
          aria-describedby={errors.message ? 'cf-message-error' : undefined}
          placeholder="What are you building?"
          className="field"
        />
        <p id="cf-message-error" role="alert" className="min-h-6 pt-1.5 text-sm text-[#ff9c82]">
          {errors.message}
        </p>
      </div>

      {/* Honeypot: hidden from people, irresistible to bots. */}
      <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="cf-company">Company</label>
        <input ref={honeypot} id="cf-company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-4">
        <Magnetic>
          <button type="submit" disabled={sending} className="btn btn-solid">
            {sending ? 'Sending…' : delivery ? 'Send message' : 'Compose in mail app'}
            <ArrowUpRight size={16} aria-hidden="true" />
          </button>
        </Magnetic>
        <p role="status" aria-live="polite" className="max-w-[22rem] text-sm leading-relaxed text-mute">
          {status.kind === 'sent' && <span className="text-paper">Sent. Thank you — I will reply soon.</span>}
          {status.kind === 'composed' && (
            <span className="text-paper">Your mail app should have opened with the message ready to send.</span>
          )}
          {status.kind === 'error' && <span className="text-[#ff9c82]">{status.message}</span>}
          {(status.kind === 'idle' || status.kind === 'sending') &&
            (delivery
              ? 'Goes straight to my inbox.'
              : 'Opens your mail app with this message filled in — nothing is stored here.')}
        </p>
      </div>
    </form>
  );
}
