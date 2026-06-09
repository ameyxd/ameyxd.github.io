"use client";

import { useEffect, useState } from "react";

interface Props {
  // ISO 8601 timestamp. Pass `process.env.NEXT_PUBLIC_BUILD_TIME` from a
  // server component so the value is frozen into the static bundle.
  stampedAt: string;
}

// "this page is N minutes/hours/days old" — relative time since the static
// export was built. Updates every 30 seconds on the client. Renders nothing
// on the server (the stamp could be off by hours if hydration is slow), so
// the first paint stays clean.
export function PageAge({ stampedAt }: Props) {
  const [label, setLabel] = useState<string | null>(null);

  useEffect(() => {
    const stamp = new Date(stampedAt).getTime();
    if (!Number.isFinite(stamp)) return;

    const compute = () => {
      const diffMs = Date.now() - stamp;
      const minutes = Math.floor(diffMs / 60_000);
      if (diffMs < 60_000) return "this page is fresh";
      if (minutes < 60) return `this page is ${minutes}m old`;
      const hours = Math.floor(minutes / 60);
      if (hours < 24) return `this page is ${hours}h old`;
      const days = Math.floor(hours / 24);
      if (days < 30) return `this page is ${days}d old`;
      const months = Math.floor(days / 30);
      if (months < 12) return `this page is ${months}mo old`;
      const years = Math.floor(months / 12);
      return `this page is ${years}y old`;
    };

    setLabel(compute());
    const interval = setInterval(() => setLabel(compute()), 30_000);
    return () => clearInterval(interval);
  }, [stampedAt]);

  if (!label) return null;
  return <span className="tabular-nums">{label}</span>;
}
