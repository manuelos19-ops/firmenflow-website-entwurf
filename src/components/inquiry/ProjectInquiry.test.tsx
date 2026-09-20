import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { ProjectInquiry } from "./ProjectInquiry";

describe("ProjectInquiry", () => {
  it("formuliert den Absendeweg aus Manus Perspektive", () => {
    const markup = renderToStaticMarkup(<ProjectInquiry whatsappUrl={null} />);

    expect(markup).toContain("Anfrage an mich senden");
    expect(markup).not.toContain("Anfrage an Manu senden");
    expect(markup).not.toContain("bei Manu angekommen");
  });
});
