export function buildWhatsAppUrl(number: string | undefined, message: string | undefined) {
  const digits = number?.replace(/\D/g, "") ?? "";
  if (!digits) return null;
  const text = encodeURIComponent(message?.trim() || "Hallo Manu, ich möchte über meine Website sprechen.");
  return `https://wa.me/${digits}?text=${text}`;
}
