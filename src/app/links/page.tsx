import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ExternalLink,
  MessageCircle,
  Phone,
  Mail,
  Sparkles,
  MapPin,
  ArrowUpRight,
  CloudSun,
  Video,
  ScanEye,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import {
  linkProfile,
  quickContacts,
  primaryLinks,
  showcaseLinks,
} from "@/content/links";
import { CopyLinkButton } from "@/components/links/CopyLinkButton";

export const metadata: Metadata = {
  title: "Manu · Projekte, Tools & Links",
  description:
    "Persönliche Projekt- und Link-Übersicht von Manuel Landeck (Manu) – Firmenflow. cliManu, VidAlyzer, X-Ray & direkte Kontaktwege.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
};

export default function LinksPage() {
  return (
    <main id="main" className="pt-24 sm:pt-28 pb-20 min-h-screen">
      <Container className="max-w-xl mx-auto px-4 sm:px-6 space-y-8">
        {/* Profile Card Header */}
        <section className="text-center space-y-5 bg-white/70 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-[var(--color-line)] shadow-xl shadow-black/5 relative overflow-hidden">
          {/* Subtle Ambient Glow */}
          <div
            className="absolute -top-24 left-1/2 -translate-x-1/2 w-64 h-64 bg-[var(--color-coral)]/10 rounded-full blur-3xl pointer-events-none"
            aria-hidden="true"
          />

          {/* Avatar with Status Badge */}
          <div className="relative inline-block mx-auto">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden ring-4 ring-white shadow-lg relative bg-amber-50">
              <Image
                src={linkProfile.avatar}
                alt={linkProfile.name}
                fill
                priority
                sizes="(max-width: 640px) 96px, 112px"
                className="object-cover object-top"
              />
            </div>
            {/* Live Status Indicator */}
            <div
              className="absolute bottom-1 right-1 flex items-center justify-center p-1 bg-white rounded-full shadow-md"
              title={linkProfile.status}
            >
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
              </span>
            </div>
          </div>

          {/* Name & Role */}
          <div className="space-y-1.5">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--color-ink)] font-heading">
              {linkProfile.name}
            </h1>
            <p className="text-sm font-semibold text-[var(--color-coral)]">
              {linkProfile.role}
            </p>
            <div className="flex items-center justify-center gap-1.5 text-xs text-[var(--color-muted)] font-medium pt-1">
              <MapPin className="w-3.5 h-3.5 text-[var(--color-coral)] shrink-0" />
              <span>{linkProfile.location}</span>
            </div>
          </div>

          {/* Personal Bio */}
          <p className="text-sm text-[var(--color-muted)] leading-relaxed max-w-md mx-auto">
            {linkProfile.bio}
          </p>

          {/* Availability Badge & Share Button */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-2.5">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50/80 border border-emerald-200/80 text-emerald-800 text-xs font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
              <span>{linkProfile.status}</span>
            </div>
            <CopyLinkButton />
          </div>
        </section>

        {/* Quick Contacts Bar */}
        <section aria-label="Direkte Kontaktwege" className="grid grid-cols-3 gap-2.5 sm:gap-3">
          {quickContacts.map((contact) => {
            const isWhatsApp = contact.icon === "whatsapp";
            const isPhone = contact.icon === "phone";

            return (
              <a
                key={contact.label}
                href={contact.url}
                target={isWhatsApp ? "_blank" : undefined}
                rel={isWhatsApp ? "noopener noreferrer" : undefined}
                aria-label={contact.ariaLabel}
                className={`group flex flex-col items-center justify-center p-3 sm:p-3.5 rounded-2xl border transition-all duration-200 text-center select-none shadow-sm hover:shadow-md hover:-translate-y-0.5 ${
                  isWhatsApp
                    ? "bg-emerald-50/70 border-emerald-200/80 hover:bg-emerald-100/70 text-emerald-900"
                    : "bg-white/80 border-[var(--color-line)] hover:border-[var(--color-coral)]/40 text-[var(--color-ink)]"
                }`}
              >
                <div
                  className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center mb-1.5 transition-transform group-hover:scale-110 ${
                    isWhatsApp
                      ? "bg-emerald-500 text-white shadow-sm shadow-emerald-500/30"
                      : isPhone
                      ? "bg-amber-100 text-amber-800"
                      : "bg-sky-100 text-sky-800"
                  }`}
                >
                  {isWhatsApp && <MessageCircle className="w-5 h-5 fill-current" />}
                  {isPhone && <Phone className="w-4 h-4" />}
                  {contact.icon === "mail" && <Mail className="w-4 h-4" />}
                </div>
                <span className="text-xs font-bold leading-tight line-clamp-1">
                  {contact.label}
                </span>
              </a>
            );
          })}
        </section>

        {/* Primary Project & Tool Links */}
        <section aria-label="Projekte und Tools" className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[var(--color-muted)] font-mono">
              Tools & Web-Apps
            </h2>
            <span className="text-xs text-[var(--color-muted)] font-medium">
              Direkt im Browser nutzbar
            </span>
          </div>

          <div className="space-y-3.5">
            {primaryLinks.map((item) => {
              const isHighlight = item.highlight;
              const isClimanu = item.id === "climanu";
              const isVidalyzer = item.id === "vidalyzer";
              const isXray = item.id === "xray";
              const isMain = item.id === "firmenflow-main";

              return (
                <a
                  key={item.id}
                  href={item.url}
                  target={item.url.startsWith("http") ? "_blank" : undefined}
                  rel={item.url.startsWith("http") ? "noopener noreferrer" : undefined}
                  className={`group block relative rounded-2xl p-4 sm:p-5 transition-all duration-300 border ${
                    isHighlight
                      ? "bg-gradient-to-br from-white via-white to-amber-50/40 border-[var(--color-coral)]/40 shadow-lg shadow-[var(--color-coral)]/10 hover:shadow-xl hover:shadow-[var(--color-coral)]/20 hover:border-[var(--color-coral)]"
                      : "bg-white/80 backdrop-blur-sm border-[var(--color-line)] hover:border-[var(--color-coral)]/50 hover:bg-white shadow-sm hover:shadow-md"
                  } hover:-translate-y-0.5`}
                >
                  <div className="flex items-start gap-3.5 sm:gap-4">
                    {/* Visual Icon / Thumbnail */}
                    <div className="shrink-0 pt-0.5">
                      {isHighlight && (
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--color-coral)] to-amber-500 text-white flex items-center justify-center shadow-md shadow-[var(--color-coral)]/30 group-hover:scale-105 transition-transform">
                          <Sparkles className="w-6 h-6" />
                        </div>
                      )}
                      {isClimanu && (
                        <div className="w-12 h-12 rounded-xl bg-sky-500 text-white flex items-center justify-center shadow-md shadow-sky-500/25 group-hover:scale-105 transition-transform overflow-hidden relative">
                          {item.image ? (
                            <Image
                              src={item.image}
                              alt={item.title}
                              fill
                              sizes="48px"
                              className="object-cover"
                            />
                          ) : (
                            <CloudSun className="w-6 h-6" />
                          )}
                        </div>
                      )}
                      {isVidalyzer && (
                        <div className="w-12 h-12 rounded-xl bg-[#0F172A] border border-cyan-500/30 text-cyan-400 flex items-center justify-center shadow-md shadow-cyan-500/20 group-hover:scale-105 transition-transform overflow-hidden relative p-1.5">
                          {item.image ? (
                            <Image
                              src={item.image}
                              alt={item.title}
                              fill
                              sizes="48px"
                              className="object-contain p-1"
                            />
                          ) : (
                            <Video className="w-6 h-6" />
                          )}
                        </div>
                      )}
                      {isXray && (
                        <div className="w-12 h-12 rounded-xl bg-[#1E1B4B] border border-indigo-500/30 text-indigo-300 flex items-center justify-center shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform overflow-hidden relative p-1.5">
                          {item.image ? (
                            <Image
                              src={item.image}
                              alt={item.title}
                              fill
                              sizes="48px"
                              className="object-contain p-1"
                            />
                          ) : (
                            <ScanEye className="w-6 h-6" />
                          )}
                        </div>
                      )}
                      {isMain && (
                        <div className="w-12 h-12 rounded-xl bg-[var(--color-plum)] text-white flex items-center justify-center shadow-md shadow-[var(--color-plum)]/20 group-hover:scale-105 transition-transform overflow-hidden relative p-2">
                          <Image
                            src={item.image || "/brand/firmenflow-mark.png"}
                            alt={item.title}
                            fill
                            sizes="48px"
                            className="object-contain p-2 invert"
                          />
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0 space-y-1.5">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          {item.badge && (
                            <span
                              className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                isHighlight
                                  ? "bg-[var(--color-coral)] text-white"
                                  : "bg-[var(--color-plum)]/5 text-[var(--color-plum)] border border-[var(--color-line)]"
                              }`}
                            >
                              {item.badge}
                            </span>
                          )}
                          <span className="text-xs text-[var(--color-muted)] font-medium">
                            {item.category}
                          </span>
                        </div>
                        <ArrowUpRight className="w-4 h-4 text-[var(--color-muted)] group-hover:text-[var(--color-coral)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
                      </div>

                      <h3 className="text-base sm:text-lg font-bold text-[var(--color-ink)] group-hover:text-[var(--color-coral)] transition-colors leading-snug">
                        {item.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-[var(--color-muted)] leading-relaxed line-clamp-2">
                        {item.description}
                      </p>

                      {/* Tags */}
                      {item.tags && item.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {item.tags.map((tag) => (
                            <span
                              key={tag}
                              className="inline-flex items-center text-[11px] px-2 py-0.5 rounded-md bg-stone-100/90 text-stone-700 font-medium"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </section>

        {/* Client Showcases & Websites */}
        <section aria-label="Webdesign Referenzen" className="space-y-4 pt-2">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[var(--color-muted)] font-mono">
              Webdesign & Showcases
            </h2>
            <Link
              href="/"
              className="text-xs font-bold text-[var(--color-coral)] hover:underline inline-flex items-center gap-1"
            >
              <span>Zur Firmenflow Homepage</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {showcaseLinks.map((showcase) => (
              <a
                key={showcase.name}
                href={showcase.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col justify-between p-3.5 rounded-2xl bg-white/70 backdrop-blur-sm border border-[var(--color-line)] hover:border-[var(--color-coral)]/40 hover:bg-white transition-all shadow-sm hover:shadow-md"
              >
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-[var(--color-coral)] uppercase tracking-wider">
                      {showcase.type}
                    </span>
                    <ExternalLink className="w-3.5 h-3.5 text-[var(--color-muted)] group-hover:text-[var(--color-coral)] transition-colors" />
                  </div>
                  <h4 className="text-sm font-bold text-[var(--color-ink)] group-hover:text-[var(--color-coral)] transition-colors">
                    {showcase.name}
                  </h4>
                  <p className="text-xs text-[var(--color-muted)]">
                    {showcase.sector}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Footer Note & Legal Links */}
        <footer className="pt-6 text-center space-y-3 border-t border-[var(--color-line)]/80 text-xs text-[var(--color-muted)]">
          <p className="font-medium">
            Firmenflow · Manuel Landeck · Wesel & Niederrhein
          </p>
          <div className="flex items-center justify-center gap-4 font-medium">
            <Link
              href="/impressum"
              className="hover:text-[var(--color-ink)] hover:underline transition-colors"
            >
              Impressum
            </Link>
            <span>•</span>
            <Link
              href="/datenschutz"
              className="hover:text-[var(--color-ink)] hover:underline transition-colors"
            >
              Datenschutz
            </Link>
          </div>
          <p className="text-[11px] text-[var(--color-muted)]/70">
            🔒 Diese Seite ist nicht öffentlich indexiert (No-Index).
          </p>
        </footer>
      </Container>
    </main>
  );
}
