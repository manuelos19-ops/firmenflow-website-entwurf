import Image from "next/image";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { scrollToId } from "@/lib/scroll";

export type FirmenflowButtonIcon =
  | "video-einschaetzung"
  | "kennenlernen"
  | "projekt-besprechen"
  | "anrufen"
  | "whatsapp"
  | "lokalpraesenz"
  | "details"
  | "live-website"
  | "flowscreen"
  | "navigation";

export const firmenflowButtonIconPaths: Record<FirmenflowButtonIcon, string> = {
  "video-einschaetzung": "/images/buttons/video-einschaetzung.png",
  kennenlernen: "/images/buttons/kennenlernen.png",
  "projekt-besprechen": "/images/buttons/projekt-besprechen.png",
  anrufen: "/images/buttons/anrufen.png",
  whatsapp: "/images/buttons/whatsapp.png",
  lokalpraesenz: "/images/buttons/lokalpraesenz.png",
  details: "/images/buttons/details.png",
  "live-website": "/images/buttons/live-website.png",
  flowscreen: "/images/buttons/flowscreen.png",
  navigation: "/images/buttons/navigation.png",
};

type FirmenflowButtonProps = {
  children: ReactNode;
  href?: string;
  external?: boolean;
  onClick?: () => void;
  className?: string;
  style?: CSSProperties;
  buttonIcon?: FirmenflowButtonIcon;
  subline?: string;
  label?: string;
};

export function FirmenflowButton({
  children,
  href,
  external = false,
  onClick,
  className,
  style,
  buttonIcon = "projekt-besprechen",
  subline,
  label,
}: FirmenflowButtonProps) {
  const ariaLabel = label ?? (typeof children === "string" ? children : undefined);

  const inner = (
    <span className="ff-btn-core">
      <span className="ff-btn-icon" aria-hidden="true">
        <Image
          src={firmenflowButtonIconPaths[buttonIcon]}
          alt=""
          width={96}
          height={96}
          sizes="48px"
          className="ff-btn-icon-img"
        />
      </span>
      <span className="ff-btn-copy">
        <span className="ff-btn-title">{children}</span>
        {subline ? <span className="ff-btn-sub">{subline}</span> : null}
      </span>
      <span className="ff-btn-action" aria-hidden="true">
        <Image
          src="/images/buttons/action-arrow.png"
          alt=""
          width={96}
          height={96}
          sizes="48px"
          className="ff-btn-action-img"
        />
      </span>
    </span>
  );

  const handleHashClick = (e: React.MouseEvent) => {
    if (!href || !href.startsWith("#")) return;
    e.preventDefault();
    try {
      window.history.replaceState(null, "", href);
    } catch {}
    scrollToId(href.slice(1));
    if (onClick) onClick();
  };

  if (href) {
    if (href.startsWith("#")) {
      return (
        <a
          href={href}
          className={cn("ff-btn", className)}
          style={style}
          onClick={handleHashClick}
          aria-label={ariaLabel}
        >
          {inner}
        </a>
      );
    }
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          className={cn("ff-btn", className)}
          style={style}
          onClick={onClick}
          aria-label={ariaLabel}
        >
          {inner}
        </a>
      );
    }
    return (
      <Link
        href={href}
        className={cn("ff-btn", className)}
        style={style}
        onClick={onClick}
        aria-label={ariaLabel}
      >
        {inner}
      </Link>
    );
  }

  return (
    <button type="button" className={cn("ff-btn", className)} style={style} onClick={onClick} aria-label={ariaLabel}>
      {inner}
    </button>
  );
}