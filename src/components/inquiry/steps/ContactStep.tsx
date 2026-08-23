import Link from "next/link";
import type { InquiryDraft } from "@/features/inquiry/types";
import { cn } from "@/lib/cn";

type StepProps = {
  data: InquiryDraft;
  errors: Record<string, string>;
  onPatch: (value: Partial<InquiryDraft>) => void;
};

const contactPreferences = [
  { value: "email", label: "Per E-Mail" },
  { value: "phone", label: "Telefonisch" },
  { value: "whatsapp", label: "Per WhatsApp" },
] as const;

export function ContactStep({ data, errors, onPatch }: StepProps) {
  return (
    <fieldset className="space-y-6">
      <legend className="text-xl sm:text-2xl font-bold text-[var(--color-ink)] mb-2">
        Wie kann Manu dich am besten erreichen?
      </legend>
      <p className="text-sm text-[var(--color-muted)]">
        Ich melde mich persönlich bei dir, um offene Fragen direkt zu besprechen.
      </p>

      {/* Honeypot */}
      <div className="sr-only" aria-hidden="true">
        <label htmlFor="company">Firma (bitte frei lassen)</label>
        <input
          id="company"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={data.company}
          onChange={(e) => onPatch({ company: e.target.value })}
        />
      </div>

      <div className="space-y-4">
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
            className="w-full px-4 py-3.5 rounded-xl border border-[var(--color-line)] bg-white text-[var(--color-ink)] placeholder:text-[var(--color-muted)]/50 focus:border-[var(--color-coral)] focus:ring-2 focus:ring-[var(--color-coral)]/20 transition-all text-sm sm:text-base outline-none"
            aria-describedby={errors.name ? "name-error" : undefined}
          />
          {errors.name && (
            <p id="name-error" className="text-xs font-semibold text-rose-600 mt-1" role="alert">
              {errors.name}
            </p>
          )}
        </div>

        {/* Email & Phone Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="email" className="block text-xs sm:text-sm font-semibold text-[var(--color-ink)] mb-1.5">
              E-Mail-Adresse
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={data.email}
              onChange={(e) => onPatch({ email: e.target.value })}
              placeholder="name@betrieb.de"
              className="w-full px-4 py-3.5 rounded-xl border border-[var(--color-line)] bg-white text-[var(--color-ink)] placeholder:text-[var(--color-muted)]/50 focus:border-[var(--color-coral)] focus:ring-2 focus:ring-[var(--color-coral)]/20 transition-all text-sm sm:text-base outline-none"
              aria-describedby={errors.email ? "email-error" : undefined}
            />
            {errors.email && (
              <p id="email-error" className="text-xs font-semibold text-rose-600 mt-1" role="alert">
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="phone" className="block text-xs sm:text-sm font-semibold text-[var(--color-ink)] mb-1.5">
              Telefonnummer / WhatsApp
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={data.phone}
              onChange={(e) => onPatch({ phone: e.target.value })}
              placeholder="0171 1234567"
              className="w-full px-4 py-3.5 rounded-xl border border-[var(--color-line)] bg-white text-[var(--color-ink)] placeholder:text-[var(--color-muted)]/50 focus:border-[var(--color-coral)] focus:ring-2 focus:ring-[var(--color-coral)]/20 transition-all text-sm sm:text-base outline-none"
              aria-describedby={errors.phone ? "phone-error" : undefined}
            />
            {errors.phone && (
              <p id="phone-error" className="text-xs font-semibold text-rose-600 mt-1" role="alert">
                {errors.phone}
              </p>
            )}
          </div>
        </div>

        {/* Preferred Contact Method */}
        <div className="space-y-2 pt-2">
          <label className="block text-xs sm:text-sm font-semibold text-[var(--color-ink)]">
            Bevorzugter Rückmeldekanal *
          </label>
          <div className="grid grid-cols-3 gap-3">
            {contactPreferences.map((pref) => {
              const isSelected = data.preferredContact === pref.value;

              return (
                <label
                  key={pref.value}
                  className={cn(
                    "flex items-center justify-center p-3 rounded-xl border cursor-pointer text-center transition-all",
                    isSelected
                      ? "border-[var(--color-coral)] bg-[var(--color-coral)]/5 font-semibold text-[var(--color-ink)]"
                      : "border-[var(--color-line)] bg-white hover:border-[var(--color-plum)]/30 text-[var(--color-muted)]"
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
                  <span className="text-xs sm:text-sm">{pref.label}</span>
                </label>
              );
            })}
          </div>
          {errors.preferredContact && (
            <p className="text-xs font-semibold text-rose-600 mt-1" role="alert">
              {errors.preferredContact}
            </p>
          )}
        </div>

        {/* Privacy Notice */}
        <div className="pt-4 border-t border-[var(--color-line)]">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              name="privacyAccepted"
              required
              checked={data.privacyAccepted}
              onChange={(e) => onPatch({ privacyAccepted: e.target.checked })}
              className="w-5 h-5 rounded border-[var(--color-line)] text-[var(--color-coral)] focus:ring-[var(--color-coral)] mt-0.5"
              aria-describedby={errors.privacyAccepted ? "privacy-error" : undefined}
            />
            <span className="text-xs sm:text-sm text-[var(--color-muted)] leading-relaxed">
              Ich stimme zu, dass meine Angaben zur Kontaktaufnahme und Zuordnung meiner Anfrage verarbeitet werden. Weitere Details in der{" "}
              <Link href="/datenschutz" target="_blank" className="text-[var(--color-plum)] font-semibold underline hover:text-[var(--color-coral)]">
                Datenschutzerklärung
              </Link>
              . *
            </span>
          </label>
          {errors.privacyAccepted && (
            <p id="privacy-error" className="text-xs font-semibold text-rose-600 mt-1" role="alert">
              {errors.privacyAccepted}
            </p>
          )}
        </div>
      </div>
    </fieldset>
  );
}
