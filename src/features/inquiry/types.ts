import type { InquiryPayload } from "./schema";

export type InquiryDraft = Omit<InquiryPayload, "projectType" | "privacyAccepted"> & {
  projectType: InquiryPayload["projectType"] | "";
  privacyAccepted: boolean;
};
