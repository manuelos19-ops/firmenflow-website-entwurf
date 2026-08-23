import { cn } from '../../lib/utils';
import Link from 'next/link';

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'default' | 'lg';
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
  disabled?: boolean;
  icon?: React.ReactNode;
}

export default function Button({
  children,
  href,
  variant = 'primary',
  size = 'default',
  className,
  onClick,
  type = 'button',
  disabled = false,
  icon,
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center gap-2 font-medium transition-all duration-300 ease-out rounded-full cursor-pointer select-none';
  
  const variants = {
    primary: 'bg-primary text-white hover:bg-primary-light active:scale-[0.98] shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30',
    secondary: 'bg-surface text-foreground hover:bg-surface-dark active:scale-[0.98] border border-border',
    ghost: 'text-foreground hover:text-primary underline-offset-4 hover:underline',
  };
  
  const sizes = {
    default: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base',
  };

  const classes = cn(baseStyles, variants[variant], sizes[size], disabled && 'opacity-50 pointer-events-none', className);

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
        {icon && <span className="transition-transform duration-300 group-hover:translate-x-1">{icon}</span>}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} onClick={onClick} disabled={disabled}>
      {children}
      {icon && <span className="transition-transform duration-300 group-hover:translate-x-1">{icon}</span>}
    </button>
  );
}
