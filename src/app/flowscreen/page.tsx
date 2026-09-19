import type { Metadata } from "next";
import { FlowscreenView } from "@/components/views/FlowscreenView";
import { FlowscreenJsonLd } from "@/components/seo/FlowscreenJsonLd";

// Hinweis: /flowscreen ist bewusst auf index/follow (Go-Live v1.1.1).
export const metadata: Metadata = {
  title: "FlowScreen – Das Windows 11 Screenshot-Studio",
  description:
    "Kostenloses Windows 11 Screenshot-Tool mit 1-Klick-Mockups, automatischem Schrittzähler, Zensur, Lupe und Vektor-Editor. Ohne Cloud-Zwang, 100% lokal auf deinem PC.",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: "/flowscreen",
  },
  openGraph: {
    title: "FlowScreen – Das Windows 11 Screenshot-Studio",
    description:
      "Kostenloses Windows 11 Screenshot-Tool mit 1-Klick-Mockups, automatischem Schrittzähler, Zensur, Lupe und Vektor-Editor.",
    url: "/flowscreen",
    locale: "de_DE",
    type: "website",
    images: [
      {
        url: "/media/flowscreen/flowscreen-og-social.png",
        width: 1200,
        height: 630,
        alt: "FlowScreen App-Icon und Screenshot-Studio für Windows 11",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FlowScreen – Das Windows 11 Screenshot-Studio",
    description:
      "Kostenloses Windows 11 Screenshot-Tool mit 1-Klick-Mockups, automatischem Schrittzähler, Zensur, Lupe und Vektor-Editor.",
    images: ["/media/flowscreen/flowscreen-og-social.png"],
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
