const DEFAULT_WHATSAPP_NUMBER = "4915567277155";
const DEFAULT_WHATSAPP_MESSAGE = "Hallo Manu, ich möchte über meine Website sprechen.";

export function buildWhatsAppUrl(number?: string, message?: string): string {
  const rawNumber = number || DEFAULT_WHATSAPP_NUMBER;
  let digits = rawNumber.replace(/\D/g, "");
  if (digits.startsWith("0")) {
    digits = "49" + digits.slice(1);
  }
  const text = encodeURIComponent(message?.trim() || DEFAULT_WHATSAPP_MESSAGE);
  return `https://wa.me/${digits}?text=${text}`;
}
