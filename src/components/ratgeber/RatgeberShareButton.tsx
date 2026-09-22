"use client";

import { useState, useEffect, useRef } from "react";
import { track } from "@vercel/analytics";
import { Share2, Check, MessageCircle, ExternalLink } from "@/components/brand/FirmenflowUiIcon";
import { cn } from "@/lib/cn";

interface RatgeberShareButtonProps {
  title: string;
  description?: string;
  url: string;
  className?: string;
}

export function RatgeberShareButton({
  title,
  description,
  url,
  className,
}: RatgeberShareButtonProps) {
  const [canNativeShare, setCanNativeShare] = useState(false);
  const [copied, setCopied] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof navigator !== "undefined" && typeof navigator.share === "function") {
      setCanNativeShare(true);
    }
  }, []);

  // Close desktop popover on click outside or Escape
  useEffect(() => {
    if (!menuOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  const handleShareClick = async () => {
    const shareUrl = typeof window !== "undefined" ? window.location.href : url;

    // Mobile / Web Share API
    if (canNativeShare) {
      try {
        await navigator.share({
          title,
          text: description ? `${title} – ${description}` : title,
          url: shareUrl,
        });
        try {
          track("ratgeber_share_click", {
            title,
            method: "native",
          });
        } catch {}
      } catch (err) {
        // User aborted share sheet -> do nothing
        if ((err as Error).name !== "AbortError") {
          // Fallback to desktop menu if share fails
          setMenuOpen(true);
        }
      }
      return;
    }

    // Desktop / Fallback -> toggle menu
    setMenuOpen((prev) => !prev);
  };

  const handleCopyLink = async () => {
    const shareUrl = typeof window !== "undefined" ? window.location.href : url;
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(shareUrl);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = shareUrl;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }
      try {
        track("ratgeber_share_click", {
          title,
          method: "copy",
        });
      } catch {}
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
        setMenuOpen(false);
      }, 2000);
    } catch {
      // Fallback
    }
  };

  const cleanSlug = url.split("/").filter(Boolean).pop() || "ratgeber";
  const whatsappTargetUrl = `${url}?utm_source=whatsapp&utm_medium=share_button&utm_campaign=${encodeURIComponent(cleanSlug)}`;
  const shareText = encodeURIComponent(
    `${title} – Spannender Ratgeber von Firmenflow:\n${whatsappTargetUrl}`
  );
  const whatsappUrl = `https://api.whatsapp.com/send?text=${shareText}`;

  return (
    <div className={cn("relative inline-flex items-center", className)} ref={popoverRef}>
      <button
        type="button"
        onClick={handleShareClick}
        aria-label="Artikel teilen"
        aria-haspopup={!canNativeShare ? "menu" : undefined}
        aria-expanded={!canNativeShare ? menuOpen : undefined}
        className={cn(
          "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-all cursor-pointer select-none",
          "border border-[var(--color-line)] bg-[var(--color-paper)] text-[var(--color-ink)]",
          "hover:border-[var(--color-coral)]/40 hover:bg-[var(--color-coral)]/10 hover:text-[var(--color-plum)]",
          "active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-coral)]/50",
          menuOpen && "border-[var(--color-plum)]/40 bg-[var(--color-plum)]/10 text-[var(--color-plum)]"
        )}
      >
        <Share2 className="w-3.5 h-3.5 text-[var(--color-coral)]" />
        <span>Teilen</span>
      </button>

      {/* Desktop Fallback Popover */}
      {menuOpen && !canNativeShare && (
        <div
          role="menu"
          aria-orientation="vertical"
          className="absolute left-0 sm:left-auto sm:right-0 top-full mt-2 w-56 p-1.5 rounded-2xl border border-[var(--color-line)] bg-white/95 backdrop-blur-md shadow-xl z-50 animate-in fade-in zoom-in-95 duration-150"
        >
          <div className="px-2.5 py-1.5 text-[11px] font-mono font-semibold uppercase tracking-wider text-[var(--color-muted)] border-b border-[var(--color-line)]/50 mb-1">
            Artikel teilen
          </div>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            role="menuitem"
            onClick={() => {
              try {
                track("ratgeber_share_click", {
                  title,
                  method: "whatsapp",
                });
              } catch {}
              setMenuOpen(false);
            }}
            className="flex items-center gap-2.5 w-full px-2.5 py-2 rounded-xl text-xs font-semibold text-[var(--color-ink)] hover:bg-[#25D366]/10 hover:text-[#128C7E] transition-colors"
          >
            <span className="w-6 h-6 rounded-lg bg-[#25D366]/15 flex items-center justify-center text-[#25D366] shrink-0">
              <MessageCircle className="w-3.5 h-3.5" />
            </span>
            <span className="flex-1 text-left">Per WhatsApp</span>
            <ExternalLink className="w-3 h-3 opacity-40" />
          </a>

          <button
            type="button"
            role="menuitem"
            onClick={handleCopyLink}
            className="flex items-center gap-2.5 w-full px-2.5 py-2 rounded-xl text-xs font-semibold text-[var(--color-ink)] hover:bg-[var(--color-coral)]/10 hover:text-[var(--color-plum)] transition-colors cursor-pointer"
          >
            <span className="w-6 h-6 rounded-lg bg-[var(--color-paper)] border border-[var(--color-line)] flex items-center justify-center text-[var(--color-muted)] shrink-0">
              {copied ? (
                <Check className="w-3.5 h-3.5 text-emerald-600 animate-in zoom-in-50" />
              ) : (
                <Share2 className="w-3.5 h-3.5" />
              )}
            </span>
            <span className="flex-1 text-left">
              {copied ? "Link kopiert! ✓" : "Link kopieren"}
            </span>
          </button>
        </div>
      )}
    </div>
  );
}
