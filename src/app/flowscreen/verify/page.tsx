import type { Metadata } from "next";
import { FlowscreenVerifyView } from "@/components/flowscreen/FlowscreenVerifyView";

export const metadata: Metadata = {
  title: "FlowScreen Echtheit prüfen – SHA256 & VirusTotal | Firmenflow",
  description:
    "Prüfe in 3 Schritten, ob deine FlowScreen-Datei echt und unverändert ist: SHA256-Hash vergleichen oder auf VirusTotal scannen.",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
  alternates: {
    canonical: "/flowscreen/verify",
  },
};

export default function FlowscreenVerifyPage() {
  return <FlowscreenVerifyView />;
}
