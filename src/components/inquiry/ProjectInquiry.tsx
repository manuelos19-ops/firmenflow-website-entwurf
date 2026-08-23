"use client";

import { useEffect, useReducer, useState } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2, RefreshCw } from "lucide-react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { initialInquiryState, inquiryReducer } from "@/features/inquiry/reducer";
import { inquirySchema, type InquiryPayload } from "@/features/inquiry/schema";
import { InquiryProgress } from "./InquiryProgress";
import { BusinessStep } from "./steps/BusinessStep";
import { ContactStep } from "./steps/ContactStep";
import { FrameStep } from "./steps/FrameStep";
import { GoalsStep } from "./steps/GoalsStep";
import { ProjectTypeStep } from "./steps/ProjectTypeStep";

export function ProjectInquiry({ whatsappUrl }: { whatsappUrl?: string | null }) {
  const [state, dispatch] = useReducer(inquiryReducer, undefined, initialInquiryState);
  const [enhanced, setEnhanced] = useState(false);

  useEffect(() => {
    setEnhanced(true);

    // Check URL parameters for preselected type
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const typeParam = params.get("type");
      if (typeParam && ["new-site", "relaunch", "google-business"].includes(typeParam)) {
        dispatch({ type: "patch", value: { projectType: typeParam as InquiryPayload["projectType"] } });
      }

      // Restore session data if available
      try {
        const saved = sessionStorage.getItem("firmenflow_inquiry_draft");
        if (saved) {
          const parsed = JSON.parse(saved);
          dispatch({ type: "patch", value: parsed });
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

  const validateCurrentStep = (): boolean => {
    const errors: Record<string, string> = {};

    if (state.step === 0) {
      if (!state.data.projectType) {
        errors.projectType = "Bitte wähle eine Projektart aus.";
      }
    } else if (state.step === 1) {
      if (!state.data.businessName || state.data.businessName.trim().length < 2) {
        errors.businessName = "Bitte gib den Namen deines Betriebs an.";
      }
      if (!state.data.industry || state.data.industry.trim().length < 2) {
        errors.industry = "Bitte nenne deine Branche.";
      }
      if (!state.data.place || state.data.place.trim().length < 2) {
        errors.place = "Bitte nenne deinen Standort (z. B. Wesel).";
      }
    } else if (state.step === 2) {
      if (!state.data.goals || state.data.goals.length === 0) {
        errors.goals = "Bitte wähle mindestens ein Ziel aus.";
      }
    } else if (state.step === 4) {
      if (!state.data.name || state.data.name.trim().length < 2) {
        errors.name = "Bitte gib deinen Namen an.";
      }
      if (!state.data.email && !state.data.phone) {
        errors.email = "Bitte gib eine E-Mail-Adresse oder Telefonnummer an.";
      }
      if (state.data.preferredContact === "email" && !state.data.email) {
        errors.preferredContact = "Für Rückmeldung per E-Mail fehlt deine E-Mail-Adresse.";
      }
      if (["phone", "whatsapp"].includes(state.data.preferredContact) && !state.data.phone) {
        errors.preferredContact = "Für diesen Rückweg fehlt deine Telefonnummer.";
      }
      if (!state.data.privacyAccepted) {
        errors.privacyAccepted = "Bitte bestätige den Datenschutzhinweis.";
      }
    }

    if (Object.keys(errors).length > 0) {
      dispatch({ type: "errors", value: errors });
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
      <div className="bg-white rounded-[2.5rem] p-8 sm:p-12 md:p-16 border border-[var(--color-line)] shadow-xl text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <div className="space-y-2 max-w-md mx-auto">
          <h3 className="text-2xl sm:text-3xl font-bold text-[var(--color-ink)]">
            Anfrage ist bei Manu angekommen!
          </h3>
          <p className="text-sm sm:text-base text-[var(--color-muted)] leading-relaxed">
            Vielen Dank für dein Vertrauen. Ich schaue mir deine Angaben in Ruhe an und melde mich persönlich bei dir.
          </p>
        </div>
        <div className="pt-4">
          <ButtonLink href="/" variant="secondary" size="default">
            Zurück zur Startseite
          </ButtonLink>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-[2.5rem] p-6 sm:p-10 md:p-14 border border-[var(--color-line)] shadow-xl">
      <form action="/api/inquiry" method="post" onSubmit={handleSubmit} className="space-y-8">
        {enhanced && <InquiryProgress step={state.step} />}

        {state.status === "error" && (
          <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-sm space-y-3">
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
        )}

        {/* Steps container */}
        <div className="min-h-[280px]">
          {(!enhanced || state.step === 0) && (
            <ProjectTypeStep
              data={state.data}
              errors={state.fieldErrors}
              onPatch={(v) => dispatch({ type: "patch", value: v })}
            />
          )}

          {(!enhanced || state.step === 1) && (
            <BusinessStep
              data={state.data}
              errors={state.fieldErrors}
              onPatch={(v) => dispatch({ type: "patch", value: v })}
            />
          )}

          {(!enhanced || state.step === 2) && (
            <GoalsStep
              data={state.data}
              errors={state.fieldErrors}
              onPatch={(v) => dispatch({ type: "patch", value: v })}
            />
          )}

          {(!enhanced || state.step === 3) && (
            <FrameStep
              data={state.data}
              errors={state.fieldErrors}
              onPatch={(v) => dispatch({ type: "patch", value: v })}
            />
          )}

          {(!enhanced || state.step === 4) && (
            <ContactStep
              data={state.data}
              errors={state.fieldErrors}
              onPatch={(v) => dispatch({ type: "patch", value: v })}
            />
          )}
        </div>

        {/* Navigation Buttons */}
        {enhanced ? (
          <div className="pt-6 border-t border-[var(--color-line)] flex items-center justify-between gap-4 flex-wrap">
            {state.step > 0 ? (
              <button
                type="button"
                onClick={handleBack}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-semibold text-[var(--color-muted)] hover:text-[var(--color-ink)] hover:bg-[var(--color-paper)] transition-all cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Zurück</span>
              </button>
            ) : (
              <div />
            )}

            {state.step < 4 ? (
              <button
                type="button"
                onClick={handleNext}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm sm:text-base font-medium bg-[var(--color-coral)] text-white hover:bg-[var(--color-coral-hover)] transition-all shadow-md cursor-pointer ml-auto"
              >
                <span>Weiter</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={state.status === "submitting"}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-base font-medium bg-[var(--color-coral)] text-white hover:bg-[var(--color-coral-hover)] transition-all shadow-lg cursor-pointer ml-auto disabled:opacity-50"
              >
                {state.status === "submitting" ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Wird an Manu gesendet …</span>
                  </>
                ) : (
                  <span>Anfrage an Manu senden</span>
                )}
              </button>
            )}
          </div>
        ) : (
          <div className="pt-6 border-t border-[var(--color-line)]">
            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-4 rounded-full text-base font-medium bg-[var(--color-coral)] text-white hover:bg-[var(--color-coral-hover)] transition-all shadow-lg cursor-pointer"
            >
              Anfrage an Manu senden
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
