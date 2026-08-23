'use client';

import { useMagnetic } from '../animations/useMagnetic';
import { cn } from '../../lib/utils';

interface MagneticElementProps {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}

export default function MagneticElement({
  children,
  strength = 0.3,
  className,
}: MagneticElementProps) {
  const ref = useMagnetic(strength);

  return (
    <div ref={ref} className={cn('inline-block', className)}>
      {children}
    </div>
  );
}
