import type { InquiryDraft } from "./types";

export const TOTAL_STEPS = 4;

export type InquiryState = {
  step: 0 | 1 | 2 | 3;
  status: "idle" | "submitting" | "success" | "error";
  data: InquiryDraft;
  fieldErrors: Record<string, string>;
  serverErrorMessage?: string;
};

export type InquiryAction =
  | { type: "patch"; value: Partial<InquiryDraft> }
  | { type: "next" }
  | { type: "back" }
  | { type: "errors"; value: Record<string, string> }
  | { type: "submitting" }
  | { type: "success" }
  | { type: "error"; message?: string }
  | { type: "reset" };

export function initialInquiryState(): InquiryState {
  return {
    step: 0,
    status: "idle",
    data: {
      submissionId: typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : "",
      services: [],
      guidance: false,
      websiteScope: "",
      businessName: "",
      industry: "",
      place: "",
      currentWebsite: "",
      goals: [],
      supportPhotoVideo: false,
      goalDetails: "",
      name: "",
      email: "",
      phone: "",
      preferredContact: "email",
      privacyAccepted: false,
      company: "",
    },
    fieldErrors: {},
  };
}

/**
 * Migriert alte Draft-Formate (projectType, alte Ziel-Werte) aus dem
 * sessionStorage bzw. URL-Preselects in das neue Datenmodell.
 */
const legacyGoalMap: Record<string, InquiryDraft["goals"][number]> = {
  "more-inquiries": "more-inquiries",
  "modern-look": "professional-presentation",
  "clear-offer": "clear-offer",
  "better-local-presence": "better-findability",
  "better-reviews": "reviews-handled",
};

export function migrateLegacyDraft(raw: Record<string, unknown>): Partial<InquiryDraft> {
  const migrated: Partial<InquiryDraft> = {};

  // Altes projectType → services + websiteScope
  if (typeof raw.projectType === "string" && raw.projectType) {
    if (raw.projectType === "new-site" || raw.projectType === "relaunch") {
      migrated.services = ["website"];
      migrated.websiteScope = raw.projectType === "new-site" ? "new" : "relaunch";
    } else if (raw.projectType === "google-business") {
      migrated.services = ["lokalpraesenz"];
    }
  }
  if (Array.isArray(raw.services)) {
    const valid = raw.services.filter(
      (s): s is InquiryDraft["services"][number] => s === "website" || s === "lokalpraesenz"
    );
    if (valid.length > 0) migrated.services = valid;
  }

  // Alte Ziel-Werte filtern/mappen
  if (Array.isArray(raw.goals)) {
    const mapped = raw.goals
      .map((g) => (typeof g === "string" ? legacyGoalMap[g] : undefined))
      .filter((g): g is InquiryDraft["goals"][number] => Boolean(g));
    migrated.goals = mapped;
  }

  return migrated;
}

export function inquiryReducer(state: InquiryState, action: InquiryAction): InquiryState {
  switch (action.type) {
    case "patch":
      return {
        ...state,
        data: { ...state.data, ...action.value },
        fieldErrors: {},
      };
    case "next":
      return {
        ...state,
        step: Math.min(TOTAL_STEPS - 1, state.step + 1) as InquiryState["step"],
        fieldErrors: {},
      };
    case "back":
      return {
        ...state,
        step: Math.max(0, state.step - 1) as InquiryState["step"],
        fieldErrors: {},
      };
    case "errors":
      return {
        ...state,
        fieldErrors: action.value,
      };
    case "submitting":
      return {
        ...state,
        status: "submitting",
        fieldErrors: {},
      };
    case "success":
      return {
        ...state,
        status: "success",
        fieldErrors: {},
      };
    case "error":
      return {
        ...state,
        status: "error",
        serverErrorMessage: action.message,
      };
    case "reset":
      return initialInquiryState();
    default:
      return state;
  }
}
