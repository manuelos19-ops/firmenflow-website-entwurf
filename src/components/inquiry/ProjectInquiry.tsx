"use client";

import { useEffect, useReducer, useRef, useSyncExternalStore } from "react";
import { ArrowLeft, ArrowRight, RefreshCw } from "@/components/brand/FirmenflowUiIcon";
import { FirmenflowIcon } from "@/components/brand/FirmenflowIcon";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { TOTAL_STEPS, initialInquiryState, inquiryReducer, migrateLegacyDraft } from "@/features/inquiry/reducer";
import { inquirySchema } from "@/features/inquiry/schema";
import { InquiryProgress } from "./InquiryProgress";
import { BusinessStep } from "./steps/BusinessStep";
import { ContactStep } from "./steps/ContactStep";
import { GoalsStep } from "./steps/GoalsStep";
import { ServicesStep } from "./steps/ServicesStep";
import type { InquiryDraft } from "@/features/inquiry/types";
import { trackProjectInquirySubmit } from "@/lib/track-inquiry";
import { scrollToElement } from "@/lib/scroll";

const subscribeToHydration = () => () => undefined;

function useEnhancedForm(): boolean {
  return useSyncExternalStore(subscribeToHydration, () => true, () => false);
}

export function ProjectInquiry({ whatsappUrl }: { whatsappUrl?: string | null }) {
  const [state, dispatch] = useReducer(inquiryReducer, undefined, initialInquiryState);
  const enhanced = useEnhancedForm();
  const formTopRef = useRef<HTMLDivElement>(null);
  const errorSummaryRef = useRef<HTMLDivElement>(null);
  const isFirstMount = useRef(true);

  useEffect(() => {
    // URL-Preselect verarbeiten (neu & alt, damit bestehende Links weiter funktionieren)
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const typeParam = params.get("type");
      const serviceParam = params.get("leistung");
      if (typeParam) {
        dispatch({ type: "patch", value: migrateLegacyDraft({ projectType: typeParam }) });
      } else if (serviceParam === "website" || serviceParam === "lokalpraesenz") {
        dispatch({ type: "patch", value: { services: [serviceParam] } });
      }

      // Restore session data if available (inkl. Migration alter Draft-Formate)
      try {
        const saved = sessionStorage.getItem("firmenflow_inquiry_draft");
        if (saved) {
          const parsed = JSON.parse(saved) as Record<string, unknown>;
          const legacy = migrateLegacyDraft(parsed);
          const knownKeys = [
            "submissionId", "services", "guidance", "websiteScope", "businessName", "industry",
            "place", "currentWebsite", "goals", "supportPhotoVideo", "goalDetails",
            "name", "email", "phone", "preferredContact", "privacyAccepted", "company",
          ];
          const sanitized: Record<string, unknown> = {};
          for (const key of knownKeys) {
            if (key in parsed) sanitized[key] = parsed[key];
          }
          dispatch({ type: "patch", value: { ...sanitized, ...legacy } as Partial<InquiryDraft> });
        }
      } catch {}
    }
  }, []);

  // Save draft on change
  useEffect(() => {
    if (!enhanced) return;
    try {
      sessionStorage.setItem("firmenflow_inquiry_draft", JSON.stringify(state.data));
    } catch {}
  }, [state.data, enhanced]);

  // Smooth scroll to top of form on step change & release button focus (fixes Android Chrome jumping down)
  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }

    if (typeof document !== "undefined" && document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }

    if (formTopRef.current) {
      scrollToElement(formTopRef.current);
    }
  }, [state.step]);

  const validateCurrentStep = (): boolean => {
    const errors: Record<string, string> = {};

    if (state.step === 0) {
      if ((state.data.services || []).length === 0 && !state.data.guidance) {
        errors.services = "Leistungen: Bitte wähle mindestens eine Leistung aus oder klicke auf „deine Empfehlung“.";
      }
      if ((state.data.services || []).includes("website") && !state.data.websiteScope) {
        errors.websiteScope = "Website: Bitte gib an, ob es um eine neue oder deine bestehende Website geht.";
      }
    } else if (state.step === 1) {
      if (!state.data.goals || state.data.goals.length === 0) {
        errors.goals = "Ziele: Bitte wähle mindestens ein Ziel aus.";
      }
    } else if (state.step === 2) {
      if (!state.data.industry || state.data.industry.trim().length < 2) {
        errors.industry = "Branche: Bitte nenne deine Branche.";
      }
      if (!state.data.place || state.data.place.trim().length < 2) {
        errors.place = "Standort: Bitte nenne deinen Ort (z. B. Wesel).";
      }
    } else if (state.step === 3) {
      if (!state.data.name || state.data.name.trim().length < 2) {
        errors.name = "Name: Bitte gib deinen Vor- und Nachnamen an.";
      }
      if (!state.data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.data.email.trim())) {
        errors.email = "E-Mail-Adresse: Bitte gib eine gültige E-Mail-Adresse an (z. B. name@betrieb.de).";
      }
      if (["phone", "whatsapp"].includes(state.data.preferredContact) && (!state.data.phone || state.data.phone.trim().length < 6)) {
        errors.phone = "Telefonnummer: Für den gewählten Kontaktweg per Telefon/WhatsApp wird deine Telefonnummer benötigt.";
      }
      if (!state.data.preferredContact) {
        errors.preferredContact = "Kontaktweg: Bitte wähle deinen bevorzugten Kontaktweg.";
      }
      if (!state.data.privacyAccepted) {
        errors.privacyAccepted = "Datenschutz: Bitte bestätige die Datenschutzerklärung vor dem Absenden.";
      }
    }

    if (Object.keys(errors).length > 0) {
      dispatch({ type: "errors", value: errors });
      setTimeout(() => {
        if (errorSummaryRef.current) {
          scrollToElement(errorSummaryRef.current);
        }
      }, 80);
      return false;
    }

    return true;
  };

  const handleNext = () => {
    if (validateCurrentStep()) {
      dispatch({ type: "next" });
    }
  };

  const handleBack = () => {
    dispatch({ type: "back" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Enter-Taste / implizites Submit in früheren Schritten: wie "Weiter" behandeln
    if (enhanced && state.step < TOTAL_STEPS - 1) {
      if (validateCurrentStep()) {
        dispatch({ type: "next" });
      }
      return;
    }

    if (!validateCurrentStep()) return;

    // Full parse check
    const parseResult = inquirySchema.safeParse(state.data);
    if (!parseResult.success) {
      const fieldErrors: Record<string, string> = {};
      parseResult.error.issues.forEach((issue) => {
        const path = issue.path[0];
        if (path) fieldErrors[String(path)] = issue.message;
      });
      dispatch({ type: "errors", value: fieldErrors });
      setTimeout(() => {
        if (errorSummaryRef.current) {
          scrollToElement(errorSummaryRef.current);
        }
      }, 80);
      return;
    }

    dispatch({ type: "submitting" });

    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parseResult.data),
      });

      if (res.ok) {
        trackProjectInquirySubmit();
        dispatch({ type: "success" });
        try {
          sessionStorage.removeItem("firmenflow_inquiry_draft");
        } catch {}
      } else {
        const errData = await res.json().catch(() => null);
        dispatch({
          type: "error",
          message: errData?.error || "Die Anfrage konnte leider nicht übertragen werden.",
        });
      }
    } catch {
      dispatch({
        type: "error",
        message: "Netzwerkverbindung unterbrochen. Deine Eingaben bleiben gespeichert.",
      });
    }
  };

  if (state.status === "success") {
    return (
      <div className="relative overflow-hidden rounded-[2.5rem] border border-[var(--color-plum)]/10 bg-white p-8 text-center text-[var(--color-ink)] shadow-[0_24px_70px_rgba(72,35,97,0.12)] sm:p-12 md:p-16">
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[var(--color-coral)] via-fuchsia-500 to-violet-600" />
        <div className="relative space-y-6">
        <div className="flex justify-center">
          <FirmenflowIcon name="erfolg" size={72} decorative />
        </div>
        <div className="space-y-2 max-w-md mx-auto">
          <h3 className="text-2xl sm:text-3xl font-bold text-[var(--color-ink)] font-display">
            Deine Anfrage ist bei mir angekommen!
          </h3>
          <p className="text-sm sm:text-base text-[var(--color-muted)] leading-relaxed">
            Vielen Dank für dein Vertrauen. Ich schaue mir deine Angaben in Ruhe an und melde mich in der Regel innerhalb eines Werktags persönlich bei dir.
          </p>
        </div>
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <ButtonLink 
            href="/" 
            variant="primary" 
            size="lg" 
            className="w-full sm:w-auto shadow-xl shadow-[var(--color-coral)]/25 text-white font-bold px-8 py-4"
          >
            Zurück zur Startseite
          </ButtonLink>
          <button
            type="button"
            onClick={() => {
              try {
                sessionStorage.removeItem("firmenflow_inquiry_draft");
              } catch {}
              dispatch({ type: "reset" });
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 rounded-full text-sm font-semibold text-[var(--color-ink)] bg-[var(--color-paper)] hover:bg-stone-200 border border-[var(--color-line)] transition-all cursor-pointer"
          >
            Neue Anfrage starten
          </button>
        </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={formTopRef}
      id="projektanfrage"
      style={{ overflowAnchor: "none" }}
      className="relative scroll-mt-24 overflow-hidden rounded-[2.5rem] border border-[var(--color-plum)]/10 bg-white p-6 shadow-[0_28px_80px_rgba(72,35,97,0.13)] sm:p-10 md:p-14"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[var(--color-coral)] via-fuchsia-500 to-violet-600" />
      <form
        action="/api/inquiry"
        method="post"
        onSubmit={handleSubmit}
        noValidate
        className="relative space-y-10"
      >
        {enhanced && <InquiryProgress step={state.step} />}

        {state.status === "error" && (
          <div className="flex gap-3 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-800 shadow-sm">
            <FirmenflowIcon name="fehler" size={36} decorative className="mt-0.5" />
            <div className="space-y-2">
              <p className="font-bold">Hinweis zur Übertragung</p>
              <p>{state.serverErrorMessage || "Etwas hat nicht geklappt. Bitte versuche es erneut."}</p>
            {whatsappUrl && (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 font-semibold text-[var(--color-plum)] hover:underline"
              >
                <span>Stattdessen direkt per WhatsApp schreiben →</span>
              </a>
            )}
            </div>
          </div>
        )}

        {/* Steps container */}
        <div className="min-h-[340px]">
          {(!enhanced || state.step === 0) && (
            <ServicesStep
              data={state.data}
              errors={state.fieldErrors}
              onPatch={(v) => dispatch({ type: "patch", value: v })}
            />
          )}

          {(!enhanced || state.step === 1) && (
            <GoalsStep
              data={state.data}
              errors={state.fieldErrors}
              onPatch={(v) => dispatch({ type: "patch", value: v })}
            />
          )}

          {(!enhanced || state.step === 2) && (
            <BusinessStep
              data={state.data}
              errors={state.fieldErrors}
              onPatch={(v) => dispatch({ type: "patch", value: v })}
            />
          )}

          {(!enhanced || state.step === 3) && (
            <ContactStep
              data={state.data}
              errors={state.fieldErrors}
              onPatch={(v) => dispatch({ type: "patch", value: v })}
            />
          )}
        </div>

        {/* Prominente Fehlermeldung direkt über den Buttons */}
        {Object.keys(state.fieldErrors).length > 0 && (
          <div
            ref={errorSummaryRef}
            role="alert"
            aria-live="assertive"
            className="p-4 sm:p-5 rounded-2xl bg-rose-50 border-2 border-rose-300 text-rose-900 shadow-sm space-y-2 animate-in fade-in duration-200"
          >
            <div className="flex items-center gap-2.5 font-bold text-sm sm:text-base text-rose-800">
              <FirmenflowIcon name="fehler" size={24} decorative />
              <span>
                {state.step === TOTAL_STEPS - 1
                  ? "Bitte prüfe vor dem Absenden noch folgende Angaben:"
                  : "Bitte prüfe noch folgende Angaben, um fortzufahren:"}
              </span>
            </div>
            <ul className="list-disc list-inside space-y-1 text-xs sm:text-sm text-rose-700 pl-1 font-medium">
              {Object.entries(state.fieldErrors).map(([field, msg]) => (
                <li key={field}>{msg}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Navigation Buttons */}
        {enhanced ? (
          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[var(--color-line)] pt-6">
            {state.step > 0 ? (
              <button
                type="button"
                onClick={handleBack}
                className="inline-flex min-h-12 items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-[var(--color-muted)] transition-all hover:bg-[var(--color-paper)] hover:text-[var(--color-ink)]"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Zurück</span>
              </button>
            ) : (
              <div />
            )}

            {state.step < TOTAL_STEPS - 1 ? (
              <button
                type="button"
                onClick={handleNext}
                className="ml-auto inline-flex min-h-13 items-center gap-3 rounded-2xl border border-[var(--color-coral)]/70 bg-[linear-gradient(135deg,#351146,#21082f)] px-7 py-3.5 text-sm font-bold text-white shadow-[0_12px_30px_rgba(72,35,97,0.22),0_0_0_2px_rgba(239,57,216,0.10)] transition-all hover:-translate-y-0.5 hover:shadow-[0_16px_38px_rgba(72,35,97,0.28)] active:translate-y-px sm:text-base"
              >
                <FirmenflowIcon name="handlungsempfehlung" size={30} decorative />
                <span>Weiter</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <div className="ml-auto space-y-2">
                <button
                  type="submit"
                  disabled={state.status === "submitting"}
                  className="inline-flex min-h-14 items-center gap-3 rounded-2xl border border-[var(--color-coral)]/70 bg-[linear-gradient(135deg,#351146,#21082f)] px-8 py-4 text-base font-bold text-white shadow-[0_14px_34px_rgba(72,35,97,0.24),0_0_0_2px_rgba(239,57,216,0.10)] transition-all hover:-translate-y-0.5 hover:shadow-[0_18px_42px_rgba(72,35,97,0.3)] active:translate-y-px disabled:cursor-wait disabled:opacity-55"
                >
                  {state.status === "submitting" ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Wird an mich gesendet …</span>
                    </>
                  ) : (
                    <>
                      <FirmenflowIcon name="nachricht-senden" size={34} decorative />
                      <span>Unverbindliche Anfrage an mich senden</span>
                    </>
                  )}
                </button>
                <p className="text-xs text-[var(--color-muted)] max-w-sm sm:text-right">
                  Du beauftragst damit noch keine Leistung. Ich melde mich persönlich über deinen gewählten Kontaktweg, in der Regel innerhalb eines Werktags.
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="pt-6 border-t border-[var(--color-line)]">
            <button
              type="submit"
              className="inline-flex w-full min-h-14 items-center justify-center gap-3 rounded-2xl border border-[var(--color-coral)]/70 bg-[linear-gradient(135deg,#351146,#21082f)] px-8 py-4 text-base font-bold text-white shadow-[0_14px_34px_rgba(72,35,97,0.24)] transition-all hover:-translate-y-0.5 sm:w-auto"
            >
              <FirmenflowIcon name="nachricht-senden" size={34} decorative />
              Anfrage an mich senden
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
