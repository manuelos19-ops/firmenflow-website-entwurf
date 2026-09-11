"use client";

interface CookieSettingsButtonProps {
  className?: string;
  children?: React.ReactNode;
}

export function CookieSettingsButton({
  className = "hover:text-white transition-colors text-left cursor-pointer",
  children = "Cookie-Einstellungen",
}: CookieSettingsButtonProps) {
  const handleClick = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("open-cookie-settings"));
    }
  };

  return (
    <button type="button" onClick={handleClick} className={className}>
      {children}
    </button>
  );
}
