import { ImageResponse } from "next/og";
import fs from "node:fs";
import path from "node:path";

export const runtime = "nodejs";
export const alt = "Firmenflow – für deine Lokalpräsenz. Persönlich mit Manu.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  let markBase64: string | null = null;
  try {
    const markPath = path.join(process.cwd(), "public/brand/firmenflow-mark.png");
    if (fs.existsSync(markPath)) {
      markBase64 = `data:image/png;base64,${fs.readFileSync(markPath).toString("base64")}`;
    }
  } catch {
    markBase64 = null;
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "#FCFAF7",
          color: "#17131A",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            {markBase64 ? (
              <img
                src={markBase64}
                width="52"
                height="52"
                alt="Firmenflow"
                style={{ width: 52, height: 52, borderRadius: 12 }}
              />
            ) : null}
            <div style={{ display: "flex", fontSize: 44, fontWeight: "bold", color: "#482361" }}>
              Firmenflow
            </div>
          </div>
          <div style={{ display: "flex", fontSize: 24, color: "#FA5D48", fontWeight: 600 }}>
            für deine Lokalpräsenz
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", flexDirection: "column", fontSize: 58, fontWeight: "bold", color: "#17131A", lineHeight: 1.15 }}>
            <div style={{ display: "flex" }}>Mehr Lokalpräsenz.</div>
            <div style={{ display: "flex", color: "#482361" }}>Weniger Agenturtheater.</div>
          </div>
          <div style={{ display: "flex", fontSize: 36, color: "#FA5D48", fontStyle: "italic" }}>
            Deine Website. Persönlich mit Manu.
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "2px solid #E5E0D8", paddingTop: 24, width: "100%" }}>
          <div style={{ display: "flex", fontSize: 20, color: "#746D76" }}>
            Webdesign für Wesel & den Niederrhein
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            {markBase64 ? (
              <img
                src={markBase64}
                width="24"
                height="24"
                alt="Firmenflow"
                style={{ width: 24, height: 24, borderRadius: 6 }}
              />
            ) : null}
            <div style={{ display: "flex", fontSize: 20, color: "#482361", fontWeight: "bold" }}>
              firmenflow.de
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

