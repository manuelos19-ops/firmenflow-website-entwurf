import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const root = process.cwd();
const firmenflowImage = path.join(
  root,
  "public/media/social/firmenflow-og-social.png",
);
const flowscreenImage = path.join(
  root,
  "public/media/flowscreen/flowscreen-og-social.png",
);

describe("OG-Social-Integration", () => {
  it("veröffentlicht beide freigegebenen Vorschaubilder unter stabilen URLs", () => {
    expect(existsSync(firmenflowImage)).toBe(true);
    expect(existsSync(flowscreenImage)).toBe(true);
  });

  it("verknüpft Firmenflow für OpenGraph und Twitter mit der neuen Grafik", () => {
    const layout = readFileSync(path.join(root, "src/app/layout.tsx"), "utf8");

    expect(layout.match(/\/media\/social\/firmenflow-og-social\.png/g)).toHaveLength(2);
    expect(existsSync(path.join(root, "src/app/opengraph-image.tsx"))).toBe(false);
  });

  it("verknüpft FlowScreen für OpenGraph und Twitter mit der neuen Grafik", () => {
    const page = readFileSync(path.join(root, "src/app/flowscreen/page.tsx"), "utf8");

    expect(page.match(/\/media\/flowscreen\/flowscreen-og-social\.png/g)).toHaveLength(2);
    expect(page).not.toContain("/media/flowscreen/flowscreen-share.png");
  });
});
