import { cn } from '../../lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'live' | 'concept' | 'pilot' | 'default';
  className?: string;
}

export default function Badge({ children, variant = 'default', className }: BadgeProps) {
  const variants = {
    live: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    concept: 'bg-amber-50 text-amber-700 border-amber-200',
    pilot: 'bg-blue-50 text-blue-700 border-blue-200',
    default: 'bg-surface text-muted border-border',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium',
        variants[variant],
        className
      )}
    >
      {variant === 'live' && (
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
        </span>
      )}
      {children}
    </span>
  );
}
