import type { Metadata } from "next";
import { FlowscreenView } from "@/components/views/FlowscreenView";
import { FlowscreenJsonLd } from "@/components/seo/FlowscreenJsonLd";

// Hinweis: noindex bleibt bewusst bis zum finalen Go-Live aktiv.
// JSON-LD ist bereits eingebaut, damit der Release spaeter nur noch
// aus dem Umschalten von index/follow + Sitemap/llms besteht.
export const metadata: Metadata = {
  title: "FlowScreen – Das Windows 11 Screenshot-Studio | Firmenflow",
  description:
    "Kostenloses Windows 11 Screenshot-Tool mit 1-Klick-Mockups, automatischem Schrittzähler, Zensur, Lupe und Vektor-Editor. Ohne Cloud-Zwang, 100% lokal auf deinem PC.",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
  alternates: {
    canonical: "/flowscreen",
  },
  openGraph: {
    title: "FlowScreen – Das Windows 11 Screenshot-Studio | Firmenflow",
    description:
      "Kostenloses Windows 11 Screenshot-Tool mit 1-Klick-Mockups, automatischem Schrittzähler, Zensur, Lupe und Vektor-Editor.",
    url: "/flowscreen",
    locale: "de_DE",
    type: "website",
    images: [
      {
        url: "/media/flowscreen/editor-preview.png",
        width: 1280,
        height: 800,
        alt: "FlowScreen Screenshot Studio für Windows 11",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FlowScreen – Das Windows 11 Screenshot-Studio | Firmenflow",
    description:
      "Kostenloses Windows 11 Screenshot-Tool mit 1-Klick-Mockups, automatischem Schrittzähler, Zensur, Lupe und Vektor-Editor.",
    images: ["/media/flowscreen/editor-preview.png"],
  },
};

export default function FlowscreenPage() {
  return (
    <>
      <FlowscreenJsonLd />
      <FlowscreenView />
    </>
  );
}