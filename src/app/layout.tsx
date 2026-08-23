import type { Metadata } from 'next';
import { Inter, Instrument_Serif } from 'next/font/google';
import './globals.css';
import SmoothScroll from '../components/layout/SmoothScroll';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { cn } from '../lib/utils';

const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

const instrumentSerif = Instrument_Serif({
  subsets: ['latin', 'latin-ext'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-instrument-serif',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Manu – Webdesign für Wesel & Niederrhein | Firmenflow',
    template: '%s | Firmenflow',
  },
  description: 'Mehr Lokalpräsenz. Weniger Agenturtheater. Deine Website. Direkt mit Manu. Webdesign und Website-Relaunch für lokale Unternehmen in Wesel und am Niederrhein.',
  metadataBase: new URL('https://firmenflow.de'),
  openGraph: {
    title: 'Manu – Webdesign für Wesel & Niederrhein | Firmenflow',
    description: 'Mehr Lokalpräsenz. Weniger Agenturtheater. Deine Website. Direkt mit Manu. Webdesign und Website-Relaunch für lokale Unternehmen in Wesel und am Niederrhein.',
    locale: 'de_DE',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className={cn(inter.variable, instrumentSerif.variable, 'antialiased')}>
      <body className="min-h-screen flex flex-col bg-background text-foreground">
        <SmoothScroll>
          <Header />
          <div className="flex-1">{children}</div>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
