import Image from "next/image";
import { cn } from "@/lib/cn";

interface BrandIconProps {
  variant?: "dark" | "light";
  className?: string;
  size?: "xs" | "sm" | "md" | "lg";
}

export function BrandIcon({ variant = "dark", className, size = "sm" }: BrandIconProps) {
  const isLight = variant === "light";
  const src = isLight 
    ? "/brand/firmenflow-mark-light.webp" 
    : "/brand/firmenflow-mark.webp";

  const sizeClasses = {
    xs: "w-3.5 h-3.5",
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  }[size];

  return (
    <span className={cn("inline-flex items-center justify-center shrink-0 relative", sizeClasses, className)}>
      <Image
        src={src}
        alt="Firmenflow"
        fill
        className="object-contain"
        sizes="32px"
      />
    </span>
  );
}
