export const GA_MEASUREMENT_ID = "G-EKM1716MWN";

// Google Consent Mode v2 Defaults – bevor gtag.js überhaupt geladen wird
export const GA_CONSENT_DEFAULT = {
  ad_storage: "denied",
  ad_user_data: "denied",
  ad_personalization: "denied",
  analytics_storage: "denied",
  wait_for_update: 500,
} as const;
