import type { InquiryDraft } from "./types";

export type InquiryState = {
  step: 0 | 1 | 2 | 3 | 4;
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
  | { type: "error"; message?: string };

export function initialInquiryState(projectType?: InquiryDraft["projectType"]): InquiryState {
  return {
    step: 0,
    status: "idle",
    data: {
      submissionId: typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : "",
      projectType: projectType || "",
      businessName: "",
      industry: "",
      place: "",
      currentWebsite: "",
      goals: [],
      goalDetails: "",
      timeframe: "flexible",
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
        step: Math.min(4, state.step + 1) as InquiryState["step"],
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
    default:
      return state;
  }
}
