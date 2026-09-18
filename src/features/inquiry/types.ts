import type { InquiryPayload } from "./schema";

export type InquiryDraft = Omit<
  InquiryPayload,
  "services" | "guidance" | "websiteScope" | "privacyAccepted" | "supportPhotoVideo"
> & {
  services: InquiryPayload["services"];
  guidance: boolean;
  websiteScope: InquiryPayload["websiteScope"] | "";
  supportPhotoVideo: boolean;
  privacyAccepted: boolean;
};
