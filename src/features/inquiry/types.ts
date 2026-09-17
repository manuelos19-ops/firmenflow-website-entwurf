import type { InquiryPayload } from "./schema";

export type InquiryDraft = Omit<
  InquiryPayload,
  "services" | "guidance" | "websiteScope" | "privacyAccepted" | "supportPhotoVideo" | "timeframe"
> & {
  services: InquiryPayload["services"];
  guidance: boolean;
  websiteScope: InquiryPayload["websiteScope"] | "";
  supportPhotoVideo: boolean;
  timeframe: InquiryPayload["timeframe"] | "";
  privacyAccepted: boolean;
};
