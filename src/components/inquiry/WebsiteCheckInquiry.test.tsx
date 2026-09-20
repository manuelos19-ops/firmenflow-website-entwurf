import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { WebsiteCheckInquiry } from "./WebsiteCheckInquiry";

describe("WebsiteCheckInquiry", () => {
  it("sendet die Video-Anfrage über einen Firmenflow-Submit-Button", () => {
    const markup = renderToStaticMarkup(<WebsiteCheckInquiry />);

    expect(markup).toContain('type="submit"');
    expect(markup).toContain('class="ff-btn ff-btn--compact w-full"');
    expect(markup).toContain("video-einschaetzung.png");
    expect(markup).toContain("Kostenlose Video-Einschätzung anfordern");
  });
});
