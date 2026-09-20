import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { InquiryProgress } from "./InquiryProgress";

describe("InquiryProgress", () => {
  it("kennzeichnet den aktiven Schritt semantisch und zeigt alle vier Stationen", () => {
    const markup = renderToStaticMarkup(<InquiryProgress step={1} />);

    expect(markup).toContain('aria-label="Fortschritt der Anfrage"');
    expect(markup.match(/data-inquiry-step=/g)).toHaveLength(4);
    expect(markup).toContain('aria-current="step"');
    expect(markup).toContain('data-state="current"');
    expect(markup.match(/data-state="complete"/g)).toHaveLength(1);
    expect(markup.match(/data-state="upcoming"/g)).toHaveLength(2);
  });
});
