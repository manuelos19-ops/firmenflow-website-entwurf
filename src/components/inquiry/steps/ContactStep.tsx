import Link from "next/link";
import type { InquiryDraft } from "@/features/inquiry/types";
import { cn } from "@/lib/cn";
import { Check } from "@/components/brand/FirmenflowUiIcon";
import { FirmenflowIcon } from "@/components/brand/FirmenflowIcon";
import { InquirySummary } from "@/components/inquiry/InquirySummary";

type StepProps = {
  data: InquiryDraft;
  errors: Record<string, string>;
  onPatch: (value: Partial<InquiryDraft>) => void;
};

const contactPreferences = [
  { value: "email", label: "Per E-Mail", icon: "email" },
  { value: "phone", label: "Telefonisch", icon: "telefon" },
  { value: "whatsapp", label: "Per WhatsApp", icon: "nachricht-senden" },
] as const;

export function ContactStep({ data, errors, onPatch }: StepProps) {
  const phoneMandatory = data.preferredContact === "phone" || data.preferredContact === "whatsapp";

  return (
    <fieldset className="space-y-6">
      <legend className="mb-2 w-full text-xl font-bold text-[var(--color-ink)] sm:text-2xl">
        <span className="flex items-center gap-3">
          <span className="grid h-14 w-14 place-items-center rounded-2xl border border-[var(--color-plum)]/10 bg-[var(--color-plum)]/[0.04]">
            <FirmenflowIcon name="nachricht-senden" size={50} decorative />
          </span>
          <span>Wie darf ich mich bei dir melden?</span>
        </span>
      </legend>
      <p className="text-sm text-[var(--color-muted)]">
        Ich melde mich persönlich über deinen gewählten Kontaktweg, in der Regel innerhalb eines Werktags, mit einer ersten Einschätzung und dem passenden nächsten Schritt.
      </p>

      <InquirySummary data={data} />

      {/* Honeypot für Spam-Bots (für Screenreader & Browser-Autofill unsichtbar) */}
      <div style={{ display: "none", position: "absolute", left: "-9999px" }} aria-hidden="true">
        <label htmlFor="ff_security_check">Bitte dieses Feld frei lassen</label>
        <input
          id="ff_security_check"
          name="ff_security_check"
          type="text"
          tabIndex={-1}
          autoComplete="new-password"
          value={data.company}
          onChange={(e) => onPatch({ company: e.target.value })}
        />
      </div>

      <div className="space-y-4">
        {/* Bevorzugter Kontaktweg zuerst */}
        <div className="space-y-2 pt-2">
          <label className="block text-xs sm:text-sm font-semibold text-[var(--color-ink)]">
            Bevorzugter Kontaktweg *
          </label>
          <div className="grid grid-cols-3 gap-3">
            {contactPreferences.map((pref) => {
              const isSelected = data.preferredContact === pref.value;

              return (
                <label
                  key={pref.value}
                  className={cn(
                    "relative flex min-h-24 cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 p-3 text-center transition-all",
                    isSelected
                      ? "border-[var(--color-coral)] bg-[linear-gradient(145deg,#351146,#21082f)] font-semibold text-white shadow-[0_10px_26px_rgba(72,35,97,0.18)]"
                      : "border-[var(--color-line)] bg-white text-[var(--color-muted)] hover:border-[var(--color-plum)]/30"
                  )}
                >
                  <input
                    type="radio"
                    name="preferredContact"
                    value={pref.value}
                    checked={isSelected}
                    onChange={() => onPatch({ preferredContact: pref.value })}
                    className="sr-only"
                  />
                  <FirmenflowIcon name={pref.icon} size={40} decorative />
                  <span className="text-xs sm:text-sm">{pref.label}</span>
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute right-2.5 top-2.5 grid h-5 w-5 place-items-center rounded-full border-2",
                      isSelected
                        ? "border-[var(--color-coral)] bg-[var(--color-coral)] text-white"
                        : "border-[var(--color-plum)]/15 bg-white",
                    )}
                  >
                    {isSelected ? <Check className="h-3 w-3" /> : null}
                  </span>
                </label>
              );
            })}
          </div>
          {errors.preferredContact && (
            <p className="text-xs font-semibold text-rose-700 mt-1 flex items-center gap-2" role="alert">
              <FirmenflowIcon name="warnung" size={22} decorative />
              <span>{errors.preferredContact}</span>
            </p>
          )}
        </div>

        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-xs sm:text-sm font-semibold text-[var(--color-ink)] mb-1.5">
            Dein Vor- und Nachname *
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={data.name}
            onChange={(e) => onPatch({ name: e.target.value })}
            placeholder="z. B. Anna Beispiel"
            className={cn(
              "w-full rounded-2xl border bg-[var(--color-paper)]/45 px-4 py-3.5 text-sm text-[var(--color-ink)] outline-none transition-all placeholder:text-[var(--color-muted)]/50 focus:bg-white focus:ring-4 sm:text-base",
              errors.name
                ? "border-rose-500 bg-rose-50/30 focus:border-rose-600 focus:ring-rose-200"
                : "border-[var(--color-line)] focus:border-[var(--color-coral)] focus:ring-[var(--color-coral)]/20"
            )}
            aria-describedby={errors.name ? "name-error" : undefined}
          />
          {errors.name && (
            <p id="name-error" className="mt-1 flex items-center gap-2 text-xs font-semibold text-rose-700" role="alert">
              <FirmenflowIcon name="warnung" size={22} decorative />
              <span>{errors.name}</span>
            </p>
          )}
        </div>

        {/* Email & Phone Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="email" className="block text-xs sm:text-sm font-semibold text-[var(--color-ink)] mb-1.5">
              E-Mail-Adresse *
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={data.email}
              onChange={(e) => onPatch({ email: e.target.value })}
              placeholder="name@betrieb.de"
              className={cn(
                "w-full rounded-2xl border bg-[var(--color-paper)]/45 px-4 py-3.5 text-sm text-[var(--color-ink)] outline-none transition-all placeholder:text-[var(--color-muted)]/50 focus:bg-white focus:ring-4 sm:text-base",
                errors.email
                  ? "border-rose-500 bg-rose-50/30 focus:border-rose-600 focus:ring-rose-200"
                  : "border-[var(--color-line)] focus:border-[var(--color-coral)] focus:ring-[var(--color-coral)]/20"
              )}
              aria-describedby={errors.email ? "email-error" : undefined}
            />
            {phoneMandatory && (
              <p className="text-xs text-[var(--color-muted)] mt-1.5">
                Auch bei telefonischer Rückmeldung: Ich schicke dir kurz per E-Mail eine Bestätigung deiner Anfrage.
              </p>
            )}
            {errors.email && (
              <p id="email-error" className="mt-1 flex items-center gap-2 text-xs font-semibold text-rose-700" role="alert">
                <FirmenflowIcon name="warnung" size={22} decorative />
                <span>{errors.email}</span>
              </p>
            )}
          </div>

          <div>
            <label htmlFor="phone" className="block text-xs sm:text-sm font-semibold text-[var(--color-ink)] mb-1.5">
              Telefonnummer / WhatsApp{" "}
              {phoneMandatory ? (
                <span className="text-[var(--color-coral)] font-semibold">* (erforderlich für deinen gewählten Kontaktweg)</span>
              ) : (
                <span className="text-[var(--color-muted)] font-normal">(optional)</span>
              )}
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              required={phoneMandatory}
              value={data.phone}
              onChange={(e) => onPatch({ phone: e.target.value })}
              placeholder="0171 1234567"
              className={cn(
                "w-full rounded-2xl border bg-[var(--color-paper)]/45 px-4 py-3.5 text-sm text-[var(--color-ink)] outline-none transition-all placeholder:text-[var(--color-muted)]/50 focus:bg-white focus:ring-4 sm:text-base",
                errors.phone
                  ? "border-rose-500 bg-rose-50/30 focus:border-rose-600 focus:ring-rose-200"
                  : "border-[var(--color-line)] focus:border-[var(--color-coral)] focus:ring-[var(--color-coral)]/20"
              )}
              aria-describedby={errors.phone ? "phone-error" : undefined}
            />
            {errors.phone && (
              <p id="phone-error" className="mt-1 flex items-center gap-2 text-xs font-semibold text-rose-700" role="alert">
                <FirmenflowIcon name="warnung" size={22} decorative />
                <span>{errors.phone}</span>
              </p>
            )}
          </div>
        </div>

        {/* Privacy Notice */}
        <div className={cn(
          "pt-4 border-t transition-all",
          errors.privacyAccepted ? "border-rose-300 bg-rose-50/40 p-3 rounded-xl" : "border-[var(--color-line)]"
        )}>
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              name="privacyAccepted"
              required
              checked={data.privacyAccepted}
              onChange={(e) => onPatch({ privacyAccepted: e.target.checked })}
              className="sr-only"
              aria-describedby={errors.privacyAccepted ? "privacy-error" : undefined}
            />
            <span
              aria-hidden="true"
              className={cn(
                "mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-lg border-2",
                data.privacyAccepted
                  ? "border-[var(--color-coral)] bg-[var(--color-coral)] text-white"
                  : "border-[var(--color-plum)]/20 bg-white",
              )}
            >
              {data.privacyAccepted ? <Check className="h-3.5 w-3.5" /> : null}
            </span>
            <span className="text-xs sm:text-sm text-[var(--color-muted)] leading-relaxed">
              Ich stimme zu, dass meine Angaben zur Kontaktaufnahme und Zuordnung meiner Anfrage verarbeitet werden. Weitere Details in der{" "}
              <Link href="/datenschutz" target="_blank" className="text-[var(--color-plum)] font-semibold underline hover:text-[var(--color-coral)]">
                Datenschutzerklärung
              </Link>
              . *
            </span>
          </label>
          {errors.privacyAccepted && (
            <p id="privacy-error" className="text-xs font-semibold text-rose-700 mt-2 flex items-center gap-2" role="alert">
              <FirmenflowIcon name="warnung" size={22} decorative />
              <span>{errors.privacyAccepted}</span>
            </p>
          )}
        </div>
      </div>
    </fieldset>
  );
}
