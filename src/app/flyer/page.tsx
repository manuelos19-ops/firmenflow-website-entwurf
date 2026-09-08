import type { Metadata } from "next";
import { QrRedirect } from "@/components/analytics/QrRedirect";

export const metadata: Metadata = {
  title: "Firmenflow – Flyer",
  robots: {
    index: false,
    follow: false,
  },
};

export default function FlyerPage() {
  return (
    <QrRedirect
      eventName="flyer_scan"
      label="Flyer-Scan erfasst"
    />
  );
}
