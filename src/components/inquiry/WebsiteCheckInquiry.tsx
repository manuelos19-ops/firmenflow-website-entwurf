"use client";

import { useState } from "react";
import { 
  Video, 
  Calendar, 
  ArrowRight, 
  CheckCircle2, 
  Globe, 
  Mail, 
  User, 
  Phone, 
  Loader2, 
  ExternalLink,
  ShieldCheck,
  Clock
} from "lucide-react";
import { cn } from "@/lib/cn";
import { siteIdentity } from "@/config/site";
import { BrandIcon } from "@/components/brand/BrandIcon";

interface WebsiteCheckInquiryProps {
  className?: string;
}

export function WebsiteCheckInquiry({ className }: WebsiteCheckInquiryProps) {
  const [choice, setChoice] = useState<"xray-video" | "meetergo-call">("xray-video");
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
        choice,
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
      setIsSuccess(true);
      setIsSubmitting(false);

      // Falls Live-Gespräch gewählt: Direkt in neuem Tab öffnen
      if (choice === "meetergo-call") {
        window.open(meetergoTarget, "_blank", "noopener,noreferrer");
      }
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
        <form onSubmit={handleSubmit} className="relative z-10 space-y-8">
          {/* Header */}
          <div className="space-y-3 text-center sm:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--color-coral)]/10 text-[var(--color-coral)] text-xs font-bold tracking-wide">
              <span className="w-2 h-2 rounded-full bg-[var(--color-coral)] animate-pulse" />
              <span>100% KOSTENLOS &amp; UNVERBINDLICH</span>
            </div>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-[var(--color-ink)] leading-tight">
              Website-Einschätzung &amp; Erstgespräch
            </h3>
            <p className="text-sm sm:text-base text-[var(--color-muted)] max-w-2xl leading-relaxed">
              Finde heraus, wo dein Betrieb online Potenzial verschenkt. Wähle einfach den Weg, der am besten in deinen Alltag passt:
            </p>
          </div>

          {/* 1-Klick-Weiche: Die beiden Auswahlkarten */}
          <div className="space-y-2.5">
            <label className="text-xs font-bold uppercase tracking-wider text-[var(--color-muted)]">
              Schritt 1: Wie möchtest du deine Einschätzung erhalten?
            </label>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Option A: X-Ray Video-Analyse */}
              <button
                type="button"
                onClick={() => setChoice("xray-video")}
                className={cn(
                  "p-5 rounded-2xl border-2 text-left transition-all relative flex flex-col justify-between group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-coral)]",
                  choice === "xray-video"
                    ? "border-[var(--color-coral)] bg-[#FFF5F2] shadow-md scale-[1.01]"
                    : "border-[var(--color-line)] bg-white hover:border-[var(--color-coral)]/50 hover:bg-[var(--color-paper)]/40"
                )}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-[var(--color-coral)]/15 text-[var(--color-coral)] flex items-center justify-center">
                      <Video className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[var(--color-coral)]/10 text-[var(--color-coral)]">
                      Asynchron per E-Mail
                    </span>
                  </div>
                  <h4 className="text-base sm:text-lg font-bold text-[var(--color-ink)] mb-1.5 flex items-center gap-2">
                    <span>X-Ray Video-Analyse</span>
                    <BrandIcon size="xs" className="shrink-0" />
                  </h4>
                  <p className="text-xs sm:text-sm text-[var(--color-muted)] leading-relaxed">
                    Manu nimmt deine Website unter die Lupe und schickt dir ein 5-Minuten-Video mit klaren Hebeln direkt ins Postfach. <strong>Ohne Termin &amp; ohne Anruf.</strong>
                  </p>
                </div>

                <div className="pt-4 mt-3 border-t border-[var(--color-line)]/60 flex items-center gap-2 text-xs font-semibold text-[var(--color-coral)]">
                  <div className={cn(
                    "w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors",
                    choice === "xray-video" ? "border-[var(--color-coral)] bg-[var(--color-coral)]" : "border-[var(--color-muted)]/40"
                  )}>
                    {choice === "xray-video" && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>
                  <span>Per Video-Analyse auswählen</span>
                </div>
              </button>

              {/* Option B: 30 Min. Erstgespräch via meetergo */}
              <button
                type="button"
                onClick={() => setChoice("meetergo-call")}
                className={cn(
                  "p-5 rounded-2xl border-2 text-left transition-all relative flex flex-col justify-between group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-plum)]",
                  choice === "meetergo-call"
                    ? "border-[var(--color-plum)] bg-[#FAF5FC] shadow-md scale-[1.01]"
                    : "border-[var(--color-line)] bg-white hover:border-[var(--color-plum)]/50 hover:bg-[var(--color-paper)]/40"
                )}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-[var(--color-plum)]/15 text-[var(--color-plum)] flex items-center justify-center">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[var(--color-plum)]/10 text-[var(--color-plum)]">
                      30 Min. Live-Termin
                    </span>
                  </div>
                  <h4 className="text-base sm:text-lg font-bold text-[var(--color-ink)] mb-1.5 flex items-center gap-2">
                    <span>Erstgespräch mit Manu</span>
                    <Clock className="w-4 h-4 text-[var(--color-plum)] shrink-0" />
                  </h4>
                  <p className="text-xs sm:text-sm text-[var(--color-muted)] leading-relaxed">
                    Wir sprechen direkt: Telefonisch oder im Video-Call (Google Meet). Schnelle Bestandsaufnahme und ehrliche Antworten auf deine Fragen.
                  </p>
                </div>

                <div className="pt-4 mt-3 border-t border-[var(--color-line)]/60 flex items-center gap-2 text-xs font-semibold text-[var(--color-plum)]">
                  <div className={cn(
                    "w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors",
                    choice === "meetergo-call" ? "border-[var(--color-plum)] bg-[var(--color-plum)]" : "border-[var(--color-muted)]/40"
                  )}>
                    {choice === "meetergo-call" && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>
                  <span>Live-Termin auswählen</span>
                </div>
              </button>
            </div>
          </div>

          {/* Schritt 2: Eingabefelder */}
          <div className="space-y-4 pt-2">
            <label className="text-xs font-bold uppercase tracking-wider text-[var(--color-muted)]">
              Schritt 2: Deine Angaben
            </label>

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
                  E-Mail-Adresse <span className="text-[var(--color-coral)]">*</span>
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
                  Telefonnummer <span className="text-xs font-normal text-[var(--color-muted)]">(optional, für Rückfragen oder Telefontermin)</span>
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
              className={cn(
                "w-full py-4 px-8 rounded-2xl font-bold text-base sm:text-lg text-white shadow-xl transition-all flex items-center justify-center gap-3 cursor-pointer group active:scale-[0.99]",
                choice === "xray-video"
                  ? "bg-[var(--color-coral)] hover:bg-[#e44d39] shadow-[var(--color-coral)]/25 hover:shadow-2xl hover:shadow-[var(--color-coral)]/30"
                  : "bg-[var(--color-plum)] hover:bg-[#482361] shadow-[var(--color-plum)]/25 hover:shadow-2xl hover:shadow-[var(--color-plum)]/30"
              )}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Wird verarbeitet...</span>
                </>
              ) : choice === "xray-video" ? (
                <>
                  <BrandIcon size="sm" variant="light" className="shrink-0" />
                  <span>Kostenlose X-Ray Analyse anfordern</span>
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </>
              ) : (
                <>
                  <Calendar className="w-5 h-5" />
                  <span>Weiter zur Terminauswahl (30 Min.)</span>
                  <ExternalLink className="w-5 h-5 transition-transform group-hover:translate-x-1" />
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
              <span>Direkt mit Manu aus Wesel</span>
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
              {choice === "xray-video" ? (
                <>
                  Deine Anfrage für die <strong>kostenlose X-Ray Video-Analyse</strong> ist erfolgreich eingegangen. Ich schaue mir deine Website persönlich an und sende dir deine Auswertung zeitnah per E-Mail.
                </>
              ) : (
                <>
                  Dein <strong>30-Minuten Erstgespräch</strong> ist vorgemerkt. Der meetergo-Kalender hat sich in einem neuen Fenster geöffnet.
                </>
              )}
            </p>
          </div>

          {/* DER GENIALE MEETERGO-UPSELL: Brücke zum Live-Call */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[var(--color-paper)] border border-[var(--color-line)] max-w-xl mx-auto text-left space-y-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[var(--color-plum)] text-white flex items-center justify-center shrink-0">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm sm:text-base text-[var(--color-ink)]">
                  {choice === "xray-video"
                    ? "Du möchtest nicht warten, sondern direkt sprechen?"
                    : "Kalender nicht geöffnet?"}
                </h4>
                <p className="text-xs text-[var(--color-muted)]">
                  {choice === "xray-video"
                    ? "Sichere dir jetzt direkt deinen 30-Minuten-Wunschtermin via meetergo:"
                    : "Klicke hier, um deinen Wunschtermin direkt in meetergo auszuwählen:"}
                </p>
              </div>
            </div>

            <a
              href={returnedMeetergoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 w-full py-3.5 px-6 rounded-xl bg-[var(--color-plum)] hover:bg-[#482361] text-white font-bold text-sm sm:text-base shadow-md transition-all hover:scale-[1.01]"
            >
              <span>30 Min. Erstgespräch jetzt buchen</span>
              <ArrowRight className="w-4 h-4" />
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
            Weitere Anfrage senden
          </button>
        </div>
      )}
    </div>
  );
}
