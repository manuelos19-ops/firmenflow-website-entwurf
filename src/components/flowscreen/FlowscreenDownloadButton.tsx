"use client";

import type { ReactNode } from "react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { getFlowscreenDownloadUrl, type FlowscreenVariant } from "@/lib/flowscreen";
import { trackFlowscreenDownload } from "@/lib/track-flowscreen";

type Props = {
  variant: FlowscreenVariant;
  placement: string;
  children: ReactNode;
  buttonVariant?: "primary" | "secondary" | "dark" | "ghost" | "whatsapp";
  size?: "default" | "lg";
  className?: string;
};

/**
 * Einheitlicher FlowScreen-Download-Button:
 * trackt den Klick (Vercel + GA4 mit Consent) und leitet über
 * /flowscreen/download auf GitHub Releases weiter.
 */
export function FlowscreenDownloadButton({
  variant,
  placement,
  children,
  buttonVariant = "primary",
  size = "lg",
  className,
}: Props) {
  return (
    <ButtonLink
      href={getFlowscreenDownloadUrl(variant)}
      external={true}
      variant={buttonVariant}
      size={size}
      showArrow={false}
      className={className}
      onClick={() => trackFlowscreenDownload(variant, placement)}
    >
      {children}
    </ButtonLink>
  );
}
