'use client';

import { useScrollReveal } from '../animations/useGsap';
import { cn } from '../../lib/utils';

type RevealVariant = 'fade-up' | 'fade-in' | 'slide-left' | 'slide-right';

interface RevealOnScrollProps {
  children: React.ReactNode;
  variant?: RevealVariant;
  delay?: number;
  duration?: number;
  className?: string;
}

const variantConfig: Record<RevealVariant, { y: number; x: number; opacity: number }> = {
  'fade-up': { y: 60, x: 0, opacity: 0 },
  'fade-in': { y: 0, x: 0, opacity: 0 },
  'slide-left': { y: 0, x: -60, opacity: 0 },
  'slide-right': { y: 0, x: 60, opacity: 0 },
};

export default function RevealOnScroll({
  children,
  variant = 'fade-up',
  delay = 0,
  duration = 1,
  className,
}: RevealOnScrollProps) {
  const config = variantConfig[variant];
  const ref = useScrollReveal({ ...config, delay, duration });

  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  );
}
