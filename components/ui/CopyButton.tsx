'use client';

import { useEffect, useState } from 'react';
import { Check, Copy } from 'lucide-react';

/** Copies `value` to the clipboard and confirms it, visibly and to screen readers. */
export function CopyButton({ value, label }: { value: string; label: string }) {
  const [state, setState] = useState<'idle' | 'copied' | 'failed'>('idle');

  useEffect(() => {
    if (state === 'idle') return;
    const id = window.setTimeout(() => setState('idle'), 2200);
    return () => window.clearTimeout(id);
  }, [state]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setState('copied');
    } catch {
      setState('failed');
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      className="label inline-flex min-h-11 items-center gap-2.5 rounded-full border border-line px-4 text-mute transition-colors duration-300 hover:border-paper hover:text-paper"
    >
      {state === 'copied' ? <Check size={14} aria-hidden="true" /> : <Copy size={14} aria-hidden="true" />}
      <span aria-live="polite">
        {state === 'copied' ? 'Copied' : state === 'failed' ? 'Copy failed — select it instead' : label}
      </span>
    </button>
  );
}
