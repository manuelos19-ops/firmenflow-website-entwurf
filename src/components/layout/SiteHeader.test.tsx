import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { SiteHeader } from "./SiteHeader";

describe("SiteHeader", () => {
  it("nutzt die kompakte Navigation bis zum breiten Desktop-Breakpoint", () => {
    const markup = renderToStaticMarkup(<SiteHeader />);

    expect(markup).toContain('class="hidden xl:flex');
    expect(markup).toContain('class="xl:hidden relative');
    expect(markup).toContain("xl:hidden max-h-[calc(100vh-6rem)]");
  });
});
