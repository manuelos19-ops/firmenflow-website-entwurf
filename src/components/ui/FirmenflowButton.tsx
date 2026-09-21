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
  size?: "default" | "compact";
  subline?: string;
  label?: string;
  ariaExpanded?: boolean;
  ariaControls?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
};

export function FirmenflowButton({
  children,
  href,
  external = false,
  onClick,
  className,
  style,
  buttonIcon = "projekt-besprechen",
  size = "default",
  subline,
  label,
  ariaExpanded,
  ariaControls,
  type = "button",
  disabled = false,
}: FirmenflowButtonProps) {
  const ariaLabel = label ?? (typeof children === "string" ? children : undefined);
  const classes = cn("ff-btn", size === "compact" && "ff-btn--compact", className);
  const imageSize = size === "compact" ? "36px" : "48px";

  const inner = (
    <span className="ff-btn-core">
      <span className="ff-btn-icon" aria-hidden="true">
        <Image
          src={firmenflowButtonIconPaths[buttonIcon]}
          alt=""
          width={96}
          height={96}
          sizes={imageSize}
          className="ff-btn-icon-img"
        />
      </span>
      <span className="ff-btn-copy">
        <span className="ff-btn-title">{children}</span>
        {subline ? <span className="ff-btn-sub">{subline}</span> : null}
      </span>
    </span>
  );

  const isSamePageHash =
    !!href &&
    (href.startsWith("#") ||
      (typeof window !== "undefined" && window.location.pathname === "/" && href.startsWith("/#")));

  const handleHashClick = (e: React.MouseEvent) => {
    if (!href) return;
    const targetId = href.startsWith("/#") ? href.slice(2) : href.startsWith("#") ? href.slice(1) : "";
    if (!targetId) return;
    e.preventDefault();
    try {
      window.history.replaceState(null, "", href.startsWith("/#") ? href.slice(1) : href);
    } catch {}
    scrollToId(targetId);
    if (onClick) onClick();
  };

  if (href) {
    if (isSamePageHash) {
      return (
        <a
          href={href}
          className={classes}
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
          className={classes}
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
        className={classes}
        style={style}
        onClick={onClick}
        aria-label={ariaLabel}
      >
        {inner}
      </Link>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled}
      className={classes}
      style={style}
      onClick={onClick}
      aria-label={ariaLabel}
      aria-expanded={ariaExpanded}
      aria-controls={ariaControls}
    >
      {inner}
    </button>
  );
}
