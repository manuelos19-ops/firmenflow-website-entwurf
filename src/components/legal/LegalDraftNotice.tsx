import { AlertCircle } from "lucide-react";
import { legalContent } from "@/content/legal";

export function LegalDraftNotice({ text }: { text?: string }) {
  if (legalContent.ready) return null;

  return (
    <div className="mb-8 p-4 sm:p-5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 flex items-start gap-3.5 text-xs sm:text-sm leading-relaxed">
      <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
      <div>
        <p className="font-bold mb-0.5">Vorschau-Hinweis</p>
        <p>{text || legalContent.imprintNotice}</p>
      </div>
    </div>
  );
}
