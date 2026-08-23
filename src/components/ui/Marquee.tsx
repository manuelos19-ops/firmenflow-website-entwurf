'use client';

import { cn } from '../../lib/utils';

interface MarqueeProps {
  items: readonly string[];
  speed?: number;
  separator?: string;
  className?: string;
}

export default function Marquee({
  items,
  separator = '·',
  className,
}: MarqueeProps) {
  // Doppelte Items für nahtlosen Loop
  const duplicated = [...items, ...items];

  return (
    <div className={cn('overflow-hidden whitespace-nowrap', className)}>
      <div className="inline-flex animate-marquee">
        {duplicated.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-4 px-4">
            <span className="text-sm font-medium text-muted uppercase tracking-widest">{item}</span>
            <span className="text-accent text-lg" aria-hidden="true">{separator}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
