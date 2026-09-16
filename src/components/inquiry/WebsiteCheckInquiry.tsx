"use client";

import { useState } from "react";
import { 
  ArrowRight, 
  CheckCircle2, 
  Globe, 
  Mail, 
  User, 
  Phone, 
  Loader2, 
  ShieldCheck,
  Calendar,
  Sparkles
} from "lucide-react";
import { cn } from "@/lib/cn";
import { siteIdentity } from "@/config/site";
import { BrandIcon } from "@/components/brand/BrandIcon";
import { trackVideoAuditSubmit, trackMeetergoClick } from "@/lib/track-inquiry";

interface WebsiteCheckInquiryProps {
  className?: string;
}

export function WebsiteCheckInquiry({ className }: WebsiteCheckInquiryProps) {
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [noWebsite, setNoWebsite] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [honeypot, setHoneypot] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [returnedMeetergoUrl, setReturnedMeetergoUrl] = useState<string>(siteIdentity.meetergoUrl);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg(null);
    setFieldErrors({});

    try {
      const payload = {
        choice: "flowray-video",
        websiteUrl: noWebsite ? "" : websiteUrl.trim(),
        noWebsite,
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        honeypot,
      };

      const res = await fetch("/api/audit-inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data.ok) {
        if (data.fieldErrors) {
          setFieldErrors(data.fieldErrors);
          setErrorMsg("Bitte überprüfe die markierten Eingabefelder.");
        } else {
          setErrorMsg(data.error || "Etwas ist schiefgelaufen. Bitte versuche es erneut.");
        }
        setIsSubmitting(false);
        return;
      }

      const meetergoTarget = data.meetergoUrl || siteIdentity.meetergoUrl;
      setReturnedMeetergoUrl(meetergoTarget);
      trackVideoAuditSubmit(!noWebsite);
      setIsSuccess(true);
      setIsSubmitting(false);
    } catch {
      setErrorMsg("Verbindungsfehler. Bitte prüfe deine Internetverbindung oder schreibe mir direkt per WhatsApp.");
      setIsSubmitting(false);
    }
  };

  return (
    <div 
      className={cn(
        "bg-white rounded-[2rem] sm:rounded-[2.5rem] border border-[var(--color-line)] shadow-2xl p-6 sm:p-10 md:p-12 text-[var(--color-ink)] transition-all relative overflow-hidden",
        className
      )}
    >
      {/* Decorative Glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[var(--color-coral)]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[var(--color-plum)]/5 rounded-full blur-3xl pointer-events-none" />

      {!isSuccess ? (
        <form onSubmit={handleSubmit} className="relative z-10 space-y-7">
          {/* Header */}
          <div className="space-y-3 text-center sm:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--color-coral)]/10 text-[var(--color-coral)] text-xs font-bold tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-[var(--color-coral)]" />
              <span>100% KOSTENLOS &amp; UNVERBINDLICH</span>
            </div>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-[var(--color-ink)] leading-tight">
              Kostenlose Website-Prüfung per Video
            </h3>
            <p className="text-sm sm:text-base text-[var(--color-muted)] max-w-2xl leading-relaxed">
              Trage einfach deine Webadresse ein. Ich schaue mir deinen Auftritt persönlich an und sende dir eine ehrliche 3- bis 5-minütige Video-Einschätzung mit konkreten Hebeln direkt ins Postfach – <strong>ohne Termin, ohne Anruf und garantiert ohne Verkaufsdruck.</strong>
            </p>
          </div>

          {/* Eingabefelder */}
          <div className="space-y-4 pt-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Website-URL Feld */}
              <div className="sm:col-span-2 space-y-1.5">
                <label htmlFor="audit-website" className="block text-xs sm:text-sm font-semibold text-[var(--color-ink)]">
                  Website-Adresse deines Betriebs {!noWebsite && <span className="text-[var(--color-coral)]">*</span>}
                </label>
                <div className="relative">
                  <Globe className="w-4 h-4 text-[var(--color-muted)] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    id="audit-website"
                    type="text"
                    disabled={noWebsite}
                    value={websiteUrl}
                    onChange={(e) => setWebsiteUrl(e.target.value)}
                    placeholder={noWebsite ? "Wird neu erstellt (keine Website vorhanden)" : "z. B. www.mein-betrieb.de"}
                    className={cn(
                      "w-full pl-11 pr-4 py-3 rounded-xl border bg-[var(--color-paper)]/50 text-sm sm:text-base text-[var(--color-ink)] transition-all focus:bg-white focus:outline-none focus:ring-2",
                      noWebsite && "opacity-60 bg-gray-100 cursor-not-allowed",
                      fieldErrors.websiteUrl 
                        ? "border-red-400 focus:ring-red-400" 
                        : "border-[var(--color-line)] focus:ring-[var(--color-coral)] focus:border-transparent"
                    )}
                  />
                </div>
                {fieldErrors.websiteUrl && (
                  <p className="text-xs text-red-500 mt-1">{fieldErrors.websiteUrl}</p>
                )}

                {/* Checkbox für Neugründung */}
                <label className="inline-flex items-center gap-2 pt-1 text-xs text-[var(--color-muted)] cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={noWebsite}
                    onChange={(e) => {
                      setNoWebsite(e.target.checked);
                      if (e.target.checked) setWebsiteUrl("");
                    }}
                    className="w-4 h-4 rounded border-[var(--color-line)] text-[var(--color-coral)] focus:ring-[var(--color-coral)]"
                  />
                  <span>Ich habe aktuell noch keine Website (Neugründung / kompletter Neuauftritt)</span>
                </label>
              </div>

              {/* Name */}
              <div className="space-y-1.5">
                <label htmlFor="audit-name" className="block text-xs sm:text-sm font-semibold text-[var(--color-ink)]">
                  Dein Name oder Betrieb <span className="text-[var(--color-coral)]">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-[var(--color-muted)] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    id="audit-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="z. B. Manuel Landeck"
                    className={cn(
                      "w-full pl-11 pr-4 py-3 rounded-xl border bg-[var(--color-paper)]/50 text-sm sm:text-base text-[var(--color-ink)] transition-all focus:bg-white focus:outline-none focus:ring-2",
                      fieldErrors.name 
                        ? "border-red-400 focus:ring-red-400" 
                        : "border-[var(--color-line)] focus:ring-[var(--color-coral)] focus:border-transparent"
                    )}
                  />
                </div>
                {fieldErrors.name && (
                  <p className="text-xs text-red-500 mt-1">{fieldErrors.name}</p>
                )}
              </div>

              {/* E-Mail */}
              <div className="space-y-1.5">
                <label htmlFor="audit-email" className="block text-xs sm:text-sm font-semibold text-[var(--color-ink)]">
                  E-Mail-Adresse für das Video <span className="text-[var(--color-coral)]">*</span>
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[var(--color-muted)] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    id="audit-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@betrieb.de"
                    className={cn(
                      "w-full pl-11 pr-4 py-3 rounded-xl border bg-[var(--color-paper)]/50 text-sm sm:text-base text-[var(--color-ink)] transition-all focus:bg-white focus:outline-none focus:ring-2",
                      fieldErrors.email 
                        ? "border-red-400 focus:ring-red-400" 
                        : "border-[var(--color-line)] focus:ring-[var(--color-coral)] focus:border-transparent"
                    )}
                  />
                </div>
                {fieldErrors.email && (
                  <p className="text-xs text-red-500 mt-1">{fieldErrors.email}</p>
                )}
              </div>

              {/* Telefon (Optional) */}
              <div className="sm:col-span-2 space-y-1.5">
                <label htmlFor="audit-phone" className="block text-xs sm:text-sm font-semibold text-[var(--color-ink)]">
                  Telefonnummer <span className="text-xs font-normal text-[var(--color-muted)]">(optional, für eventuelle Rückfragen zur Seite)</span>
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-[var(--color-muted)] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    id="audit-phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="z. B. 0155 67277155"
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-[var(--color-line)] bg-[var(--color-paper)]/50 text-sm sm:text-base text-[var(--color-ink)] transition-all focus:bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-coral)] focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Honeypot Spam-Schutz (verborgen) */}
            <input
              type="text"
              name="company"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          {/* Error Message */}
          {errorMsg && (
            <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
              {errorMsg}
            </div>
          )}

          {/* Submit Action */}
          <div className="pt-2 space-y-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 px-8 rounded-2xl font-bold text-base sm:text-lg text-white bg-[var(--color-coral)] hover:bg-[#e44d39] shadow-xl shadow-[var(--color-coral)]/25 hover:shadow-2xl hover:shadow-[var(--color-coral)]/30 transition-all flex items-center justify-center gap-3 cursor-pointer group active:scale-[0.99]"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Wird verarbeitet...</span>
                </>
              ) : (
                <>
                  <BrandIcon size="sm" variant="light" className="shrink-0" />
                  <span>Kostenlose Video-Prüfung anfordern</span>
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>

            {/* Trust Footer */}
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-[var(--color-muted)] pt-1">
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>100% vertraulich &amp; DSGVO-konform</span>
              </span>
              <span>•</span>
              <span>Garantiert kein Verkaufsdruck</span>
              <span>•</span>
              <span>Persönlich mit Manu aus Wesel</span>
            </div>
          </div>
        </form>
      ) : (
        /* SUCCESS STATE */
        <div className="relative z-10 py-6 text-center space-y-8 animate-in fade-in duration-500">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-3 max-w-xl mx-auto">
            <h3 className="text-2xl sm:text-3xl font-display font-bold text-[var(--color-ink)]">
              Klasse, {name || "vielen Dank"}!
            </h3>
            <p className="text-sm sm:text-base text-[var(--color-muted)] leading-relaxed">
              Deine Anfrage für die <strong>kostenlose Website-Prüfung per Video</strong> ist erfolgreich eingegangen. Ich schaue mir deine Website persönlich an und sende dir deine Video-Auswertung zeitnah per E-Mail.
            </p>
          </div>

          {/* DER MEETERGO-DIREKTWEG: Für Eilige */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[var(--color-paper)] border border-[var(--color-line)] max-w-xl mx-auto text-left space-y-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[var(--color-plum)] text-white flex items-center justify-center shrink-0">
                <Calendar className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-sm sm:text-base text-[var(--color-ink)]">
                  Du möchtest nicht auf das Video warten, sondern direkt sprechen?
                </h4>
                <p className="text-xs text-[var(--color-muted)]">
                  Sichere dir jetzt direkt deinen 30-Minuten-Wunschtermin via meetergo:
                </p>
              </div>
            </div>

            <a
              href={returnedMeetergoUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackMeetergoClick("audit_success")}
              className="inline-flex items-center justify-center gap-2.5 w-full py-3.5 px-6 rounded-xl bg-[var(--color-plum)] hover:bg-[#3d1c53] !text-white text-white font-bold text-sm sm:text-base shadow-md transition-all hover:scale-[1.01]"
              style={{ color: "#ffffff" }}
            >
              <span className="!text-white text-white" style={{ color: "#ffffff" }}>
                30 Min. Erstgespräch jetzt buchen
              </span>
              <ArrowRight className="w-4 h-4 !text-white text-white shrink-0" style={{ color: "#ffffff" }} />
            </a>
          </div>

          <button
            type="button"
            onClick={() => {
              setIsSuccess(false);
              setWebsiteUrl("");
              setNoWebsite(false);
              setPhone("");
            }}
            className="text-xs font-semibold text-[var(--color-muted)] hover:text-[var(--color-plum)] underline transition-colors"
          >
            Weitere Website prüfen lassen
          </button>
        </div>
      )}
    </div>
  );
}
