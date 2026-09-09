import type { Metadata } from "next";
import { QrRedirect } from "@/components/analytics/QrRedirect";

export const metadata: Metadata = {
  title: "Firmenflow – Visitenkarte",
  robots: {
    index: false,
    follow: false,
  },
};

export default function KartePage() {
  return (
    <QrRedirect
      eventName="visitenkarte_scan"
      badgeText="Visitenkarte erkannt"
    />
  );
}
