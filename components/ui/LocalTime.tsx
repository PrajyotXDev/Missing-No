'use client';

import { useEffect, useState } from 'react';

type Props = { timeZone: string; label?: string };

/** Live clock for a fixed time zone. Renders a stable placeholder until mounted. */
export function LocalTime({ timeZone, label = 'IST' }: Props) {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const format = new Intl.DateTimeFormat('en-GB', {
      timeZone,
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
    const update = () => setTime(format.format(new Date()));
    update();
    const id = window.setInterval(update, 15_000);
    return () => window.clearInterval(id);
  }, [timeZone]);

  return (
    <span className="tabular-nums">
      {time ?? '--:--'} {label}
    </span>
  );
}
