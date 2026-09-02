import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt = "Firmenflow – für deine Lokalpräsenz. Persönlich mit Manu.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
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
          <div style={{ display: "flex", fontSize: 44, fontWeight: "bold", color: "#3B0D4F" }}>
            Firmenflow
          </div>
          <div style={{ display: "flex", fontSize: 24, color: "#FF705D", fontWeight: 600 }}>
            für deine Lokalpräsenz
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", flexDirection: "column", fontSize: 58, fontWeight: "bold", color: "#17131A", lineHeight: 1.15 }}>
            <div style={{ display: "flex" }}>Mehr Lokalpräsenz.</div>
            <div style={{ display: "flex", color: "#3B0D4F" }}>Weniger Agenturtheater.</div>
          </div>
          <div style={{ display: "flex", fontSize: 36, color: "#FF705D", fontStyle: "italic" }}>
            Deine Website. Persönlich mit Manu.
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "2px solid #E5E0D8", paddingTop: 24, width: "100%" }}>
          <div style={{ display: "flex", fontSize: 20, color: "#746D76" }}>
            Webdesign für Wesel & den Niederrhein
          </div>
          <div style={{ display: "flex", fontSize: 20, color: "#3B0D4F", fontWeight: "bold" }}>
            firmenflow.de
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
