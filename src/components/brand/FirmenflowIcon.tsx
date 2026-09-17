import Image from "next/image";
import { cn } from "@/lib/cn";
import { firmenflowIconPaths } from "@/content/firmenflow-icons";
import type { FirmenflowIconName } from "@/content/firmenflow-icons";
import { flowscreenIconPaths } from "@/content/firmenflow-icons";
import type { FlowscreenIconName } from "@/content/firmenflow-icons";
type IconSize = number | "sm" | "md" | "lg" | "xl";
const sizeMap: Record<string, number> = { sm: 24, md: 40, lg: 72, xl: 112 };
function resolveSize(size: IconSize): number {
  return typeof size === "number" ? size : (sizeMap[size] ?? 40);
}
interface BaseProps {
  size?: IconSize;
  className?: string;
  priority?: boolean;
  alt?: string;
  decorative?: boolean;
}
export function FirmenflowIcon(p: BaseProps & { name: FirmenflowIconName }) {
  const px = resolveSize(p.size ?? "md");
  // Standard ist dekorativ (alt leer), damit kein Slug vorgelesen wird.
  // Nur mit explizitem alt-Text wird das Icon informativ.
  const alt = p.alt ?? "";
  const decorative = p.decorative ?? p.alt === undefined;
  return (
    <span
      className={cn("relative inline-flex shrink-0 overflow-hidden", p.className)}
      style={{ width: px, height: px, aspectRatio: "1 / 1" }}
      aria-hidden={decorative ? true : undefined}
    >
      <Image
        src={firmenflowIconPaths[p.name]}
        alt={alt}
        width={px}
        height={px}
        sizes={`${px}px`}
        loading={p.priority ? undefined : "lazy"}
        priority={p.priority}
        className="h-full w-full object-contain"
      />
    </span>
  );
}
export function FlowscreenIcon(p: BaseProps & { name: FlowscreenIconName }) {
  const px = resolveSize(p.size ?? "md");
  const alt = p.alt ?? "";
  const decorative = p.decorative ?? p.alt === undefined;
  return (
    <span
      className={cn("relative inline-flex shrink-0 overflow-hidden", p.className)}
      style={{ width: px, height: px, aspectRatio: "1 / 1" }}
      aria-hidden={decorative ? true : undefined}
    >
      <Image
        src={flowscreenIconPaths[p.name]}
        alt={alt}
        width={px}
        height={px}
        sizes={`${px}px`}
        loading={p.priority ? undefined : "lazy"}
        priority={p.priority}
        className="h-full w-full object-contain"
      />
    </span>
  );
}
