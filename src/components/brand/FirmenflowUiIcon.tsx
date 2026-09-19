import type { ComponentType, SVGProps } from "react";

export const firmenflowUiIconNames = [
  "arrow-left",
  "arrow-right",
  "arrow-up-right",
  "check",
  "chevron-down",
  "chevron-left",
  "chevron-right",
  "clock",
  "close",
  "download",
  "external-link",
  "globe",
  "hard-drive",
  "loader",
  "mail",
  "map-pin",
  "message-circle",
  "minus",
  "monitor",
  "pause",
  "phone",
  "play",
  "plus",
  "refresh",
  "share",
  "shield-check",
  "user",
] as const;

export type FirmenflowUiIconName = (typeof firmenflowUiIconNames)[number];

type FirmenflowUiIconProps = Omit<SVGProps<SVGSVGElement>, "name"> & {
  name: FirmenflowUiIconName;
  label?: string;
  size?: number | string;
};

const glyphs: Record<FirmenflowUiIconName, React.ReactNode> = {
  "arrow-left": (
    <>
      <path d="M20 12H6" />
      <path d="M11 7 6 12l5 5" />
      <path d="M17.8 8.8c-1.7-.7-3.4-.8-5.1-.4" opacity=".48" />
    </>
  ),
  "arrow-right": (
    <>
      <path d="M4.5 13.5c3.9-4.2 8.7-4.8 14-1.5" />
      <path d="m14 7.5 4.5 4.5-4.5 4.5" />
      <path d="M5.3 9.1c1.5-.8 3-1.3 4.6-1.4" opacity=".48" />
    </>
  ),
  "arrow-up-right": (
    <>
      <path d="M5 18c3.8-4.8 7.5-8.8 13-12" />
      <path d="M11.5 6H18v6.5" />
      <path d="M5.2 14.1c2-1.1 3.8-2.6 5.4-4.3" opacity=".48" />
    </>
  ),
  check: (
    <>
      <path d="m4.8 12.6 4.3 4.2L19.3 7" />
      <path d="M7.8 12.2c2.2-.2 4.2-1 5.9-2.5" opacity=".48" />
    </>
  ),
  "chevron-down": <path d="m6.5 9 5.5 5.5L17.5 9" />,
  "chevron-left": <path d="m14.8 6.5-5.5 5.5 5.5 5.5" />,
  "chevron-right": <path d="m9.2 6.5 5.5 5.5-5.5 5.5" />,
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.4v5l3.4 2" />
      <path d="M6.4 8.4c1.2-1.7 3-2.8 5-3" opacity=".48" />
    </>
  ),
  close: (
    <>
      <path d="m6.5 6.5 11 11" />
      <path d="m17.5 6.5-11 11" />
    </>
  ),
  download: (
    <>
      <path d="M12 4.5v10" />
      <path d="m7.8 10.7 4.2 4.2 4.2-4.2" />
      <path d="M5 18.7c4.6 1.1 9.4 1.1 14 0" />
      <path d="M7.2 6.8c1.2-.6 2.5-.8 3.8-.8" opacity=".48" />
    </>
  ),
  "external-link": (
    <>
      <path d="M18.5 13.2v4.3a2 2 0 0 1-2 2h-10a2 2 0 0 1-2-2v-10a2 2 0 0 1 2-2h4.3" />
      <path d="M10 14c2.5-3.2 5.2-5.8 9.5-9.5" />
      <path d="M13.5 4.5h6v6" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="8.7" />
      <path d="M3.6 12h16.8" />
      <path d="M12 3.3c2.3 2.5 3.5 5.4 3.5 8.7s-1.2 6.2-3.5 8.7c-2.3-2.5-3.5-5.4-3.5-8.7S9.7 5.8 12 3.3Z" />
      <path d="M5.7 7.1c4 1.1 8.6 1.1 12.6 0" opacity=".48" />
    </>
  ),
  "hard-drive": (
    <>
      <rect x="3.8" y="5.2" width="16.4" height="13.6" rx="3" />
      <path d="M4.3 14.2c4.4-1.4 10.5-1.4 15.4 0" />
      <circle cx="16.8" cy="16.2" r=".8" fill="currentColor" stroke="none" />
      <path d="M7 8.5h6.5" opacity=".48" />
    </>
  ),
  loader: (
    <>
      <path d="M20 12a8 8 0 0 1-8 8" />
      <path d="M12 4a8 8 0 0 0-8 8" opacity=".45" />
      <path d="m17.6 5.8 2.2.2-.2-2.2" />
    </>
  ),
  mail: (
    <>
      <rect x="3.5" y="5.2" width="17" height="13.6" rx="3" />
      <path d="m5 7 7 5.2L19 7" />
      <path d="M5.2 15.8c3-1.6 5.8-1.8 8.5-.7" opacity=".48" />
    </>
  ),
  "map-pin": (
    <>
      <path d="M19 10.1c0 5.3-7 10.3-7 10.3s-7-5-7-10.3a7 7 0 1 1 14 0Z" />
      <circle cx="12" cy="10" r="2.3" />
      <path d="M8.3 17.4c2.3-.9 4.8-.9 7.3 0" opacity=".48" />
    </>
  ),
  "message-circle": (
    <>
      <path d="M20 11.5a7.7 7.7 0 0 1-8 7.5 8.7 8.7 0 0 1-3.4-.7L4 20l1.6-4.3A7.3 7.3 0 0 1 4 11.2 7.7 7.7 0 0 1 12 4a7.7 7.7 0 0 1 8 7.5Z" />
      <path d="M7.8 12.7c2.6-2.2 5.5-2.5 8.6-.9" />
      <path d="M8.3 9.1h.1M12 8.3h.1M15.7 9.1h.1" strokeWidth="2.2" />
    </>
  ),
  minus: <path d="M5 12h14" />,
  monitor: (
    <>
      <rect x="3.2" y="4.5" width="17.6" height="12.5" rx="2.6" />
      <path d="M9 20h6M12 17v3" />
      <path d="M6.3 13c3.3-3.5 7.1-4.2 11.4-1.9" opacity=".6" />
    </>
  ),
  pause: (
    <>
      <path d="M9 7v10" strokeWidth="2.4" />
      <path d="M15 7v10" strokeWidth="2.4" />
    </>
  ),
  phone: (
    <>
      <path d="M8.1 4.3 5.6 5.5c-1.2.6-1.5 2-.9 3.5 2 5 6 9 11 11 1.5.6 2.9.3 3.5-.9l1.2-2.5-4.4-2-1.1 1.7c-2.7-1.2-5-3.5-6.2-6.2L10.4 9l-2.3-4.7Z" />
      <path d="M13.8 4.8c2.8.5 4.9 2.6 5.4 5.4" opacity=".55" />
    </>
  ),
  play: (
    <>
      <path d="M8.5 6.4c0-1 1.1-1.6 2-.9l7.1 5.5c.7.5.7 1.5 0 2l-7.1 5.5c-.9.7-2 .1-2-.9V6.4Z" />
      <path d="M5.2 8.2c-.7 2.5-.6 5 .4 7.4" opacity=".48" />
    </>
  ),
  plus: (
    <>
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </>
  ),
  refresh: (
    <>
      <path d="M19.5 8.5A8 8 0 0 0 5.2 7" />
      <path d="M5.2 7 5 3.8M5.2 7l3.3-.2" />
      <path d="M4.5 15.5A8 8 0 0 0 18.8 17" />
      <path d="m18.8 17 .2 3.2m-.2-3.2-3.3.2" />
    </>
  ),
  share: (
    <>
      <circle cx="18" cy="5.5" r="2.2" />
      <circle cx="6" cy="12" r="2.2" />
      <circle cx="18" cy="18.5" r="2.2" />
      <path d="M8.1 11c2.5-1.2 5-2.6 7.8-4.3M8.1 13c2.7 1.1 5.2 2.5 7.8 4.3" />
    </>
  ),
  "shield-check": (
    <>
      <path d="M12 3.2c2.3 1.6 4.8 2.5 7.4 2.7v5.4c0 4.5-2.7 7.7-7.4 9.5-4.7-1.8-7.4-5-7.4-9.5V5.9c2.6-.2 5.1-1.1 7.4-2.7Z" />
      <path d="m8.4 12 2.2 2.2 5-5" />
      <path d="M6.9 7.7c2-.3 3.7-.9 5.1-1.8" opacity=".48" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8" r="3.4" />
      <path d="M5.2 20c.6-4 3.1-6.2 6.8-6.2s6.2 2.2 6.8 6.2" />
      <path d="M8.2 16.1c2.2-.8 4.5-.8 7.6 0" opacity=".48" />
    </>
  ),
};

export function FirmenflowUiIcon({
  name,
  label,
  size = 24,
  strokeWidth = 1.65,
  className,
  role,
  "aria-label": ariaLabel,
  ...props
}: FirmenflowUiIconProps) {
  const accessibleLabel = label ?? ariaLabel;

  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      focusable="false"
      role={accessibleLabel ? role ?? "img" : role}
      aria-label={accessibleLabel}
      aria-hidden={accessibleLabel ? undefined : true}
      className={className}
      data-firmenflow-icon={name}
      {...props}
    >
      {glyphs[name]}
    </svg>
  );
}

type CompatibleIconProps = Omit<FirmenflowUiIconProps, "name">;

function createCompatibleIcon(
  name: FirmenflowUiIconName,
  displayName: string,
): ComponentType<CompatibleIconProps> {
  function CompatibleIcon(props: CompatibleIconProps) {
    return <FirmenflowUiIcon name={name} {...props} />;
  }

  CompatibleIcon.displayName = displayName;
  return CompatibleIcon;
}

export const ArrowLeft = createCompatibleIcon("arrow-left", "FirmenflowArrowLeft");
export const ArrowRight = createCompatibleIcon("arrow-right", "FirmenflowArrowRight");
export const ArrowUpRight = createCompatibleIcon("arrow-up-right", "FirmenflowArrowUpRight");
export const Check = createCompatibleIcon("check", "FirmenflowCheck");
export const ChevronDown = createCompatibleIcon("chevron-down", "FirmenflowChevronDown");
export const ChevronLeft = createCompatibleIcon("chevron-left", "FirmenflowChevronLeft");
export const ChevronRight = createCompatibleIcon("chevron-right", "FirmenflowChevronRight");
export const Clock = createCompatibleIcon("clock", "FirmenflowClock");
export const Download = createCompatibleIcon("download", "FirmenflowDownload");
export const ExternalLink = createCompatibleIcon("external-link", "FirmenflowExternalLink");
export const Globe = createCompatibleIcon("globe", "FirmenflowGlobe");
export const HardDrive = createCompatibleIcon("hard-drive", "FirmenflowHardDrive");
export const Loader2 = createCompatibleIcon("loader", "FirmenflowLoader");
export const Mail = createCompatibleIcon("mail", "FirmenflowMail");
export const MapPin = createCompatibleIcon("map-pin", "FirmenflowMapPin");
export const MessageCircle = createCompatibleIcon("message-circle", "FirmenflowMessageCircle");
export const Minus = createCompatibleIcon("minus", "FirmenflowMinus");
export const Monitor = createCompatibleIcon("monitor", "FirmenflowMonitor");
export const Pause = createCompatibleIcon("pause", "FirmenflowPause");
export const Phone = createCompatibleIcon("phone", "FirmenflowPhone");
export const Play = createCompatibleIcon("play", "FirmenflowPlay");
export const Plus = createCompatibleIcon("plus", "FirmenflowPlus");
export const RefreshCw = createCompatibleIcon("refresh", "FirmenflowRefresh");
export const Share2 = createCompatibleIcon("share", "FirmenflowShare");
export const ShieldCheck = createCompatibleIcon("shield-check", "FirmenflowShieldCheck");
export const User = createCompatibleIcon("user", "FirmenflowUser");
export const X = createCompatibleIcon("close", "FirmenflowClose");
