import { chromium } from "playwright";
import fs from "fs";
import path from "path";

async function generate() {
  const outputDir = path.resolve("public/signatures");
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Load local images as base64 data URLs for 100% offline, crisp rendering
  const portraitPath = path.resolve("public/media/manu-about.webp");
  const portraitBase64 = `data:image/webp;base64,${fs.readFileSync(portraitPath).toString("base64")}`;

  const wordmarkPath = path.resolve("public/brand/firmenflow-wordmark.png");
  const wordmarkBase64 = `data:image/png;base64,${fs.readFileSync(wordmarkPath).toString("base64")}`;

  const htmlContent = `
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8" />
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Instrument+Serif:ital@0;1&display=swap');

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    body {
      background-color: #F0EDE8;
      font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      padding: 40px;
      display: flex;
      flex-direction: column;
      gap: 60px;
      align-items: center;
    }

    /* ========================================================
       VARIANTE 1: THE SIGNATURE CARD (Horizontales Duo, Website-Stil)
       ======================================================== */
    .sig-v1 {
      width: 760px;
      height: 220px;
      display: flex;
      background: #FFFFFF;
      border-radius: 20px;
      border: 1px solid #E5E0D8;
      box-shadow: 0 10px 30px -10px rgba(59, 13, 79, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04);
      overflow: hidden;
      position: relative;
    }

    .v1-left {
      width: 190px;
      background: #3B0D4F;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      position: relative;
      padding: 16px;
      flex-shrink: 0;
      overflow: hidden;
    }

    .v1-left-glow {
      position: absolute;
      top: -30px;
      right: -30px;
      width: 120px;
      height: 120px;
      background: #FF705D;
      opacity: 0.25;
      filter: blur(35px);
      border-radius: 50%;
    }

    .v1-avatar-container {
      position: relative;
      width: 104px;
      height: 104px;
      border-radius: 50%;
      border: 3px solid #FF705D;
      box-shadow: 0 8px 20px rgba(0,0,0,0.35), 0 0 0 4px rgba(255, 112, 93, 0.2);
      overflow: hidden;
      margin-bottom: 12px;
      z-index: 2;
      background: #17131A;
    }

    .v1-avatar-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center 15%;
    }

    .v1-badge {
      font-size: 9.5px;
      font-weight: 800;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: #FCFAF7;
      text-align: center;
      position: relative;
      z-index: 2;
    }

    .v1-badge::after {
      content: '';
      display: block;
      width: 28px;
      height: 2px;
      background: #FF705D;
      margin: 4px auto 0 auto;
      border-radius: 2px;
    }

    .v1-right {
      flex: 1;
      padding: 20px 24px 18px 24px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      background: #FCFAF7;
    }

    .v1-top-row {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
    }

    .v1-logo-box {
      display: flex;
      flex-direction: column;
    }

    .v1-logo {
      height: 28px;
      width: auto;
      object-fit: contain;
      object-position: left;
    }

    .v1-name-box {
      margin-top: 6px;
    }

    .v1-name {
      font-size: 20px;
      font-weight: 800;
      color: #17131A;
      letter-spacing: -0.02em;
      line-height: 1.15;
    }

    .v1-role {
      font-size: 12.5px;
      font-weight: 600;
      color: #653683;
      margin-top: 2px;
    }

    .v1-divider {
      height: 1px;
      background: #E5E0D8;
      width: 100%;
      margin: 10px 0;
    }

    .v1-contacts {
      display: flex;
      align-items: center;
      gap: 16px;
      flex-wrap: wrap;
    }

    .v1-contact-item {
      display: flex;
      align-items: center;
      gap: 6px;
      text-decoration: none;
    }

    .v1-icon-badge {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 10px;
      font-weight: 800;
      color: #FFFFFF;
      flex-shrink: 0;
    }

    .v1-icon-badge.coral {
      background: #FF705D;
    }

    .v1-icon-badge.plum {
      background: #3B0D4F;
    }

    .v1-contact-text {
      font-size: 12px;
      font-weight: 600;
      color: #17131A;
    }

    .v1-footer-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 8px;
      font-size: 11px;
      color: #746D76;
      font-weight: 500;
    }

    .v1-dots {
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .v1-dot {
      width: 5px;
      height: 5px;
      border-radius: 50%;
    }

    /* ========================================================
       VARIANTE 2: EDITORIAL MODERN (Nahtloses edles Branding)
       ======================================================== */
    .sig-v2 {
      width: 740px;
      height: 195px;
      display: flex;
      align-items: center;
      background: #FFFFFF;
      border-radius: 24px;
      border: 1px solid #E5E0D8;
      padding: 20px 28px;
      gap: 24px;
      box-shadow: 0 12px 32px -8px rgba(59, 13, 79, 0.07);
      position: relative;
    }

    .v2-avatar-wrapper {
      position: relative;
      width: 100px;
      height: 100px;
      flex-shrink: 0;
    }

    .v2-avatar-img {
      width: 100px;
      height: 100px;
      border-radius: 22px;
      object-fit: cover;
      object-position: center 15%;
      border: 2px solid #FF705D;
      box-shadow: 0 6px 16px rgba(59, 13, 79, 0.15);
    }

    .v2-status-pill {
      position: absolute;
      bottom: -6px;
      left: 50%;
      transform: translateX(-50%);
      background: #3B0D4F;
      color: #FFFFFF;
      font-size: 8.5px;
      font-weight: 800;
      padding: 2.5px 8px;
      border-radius: 12px;
      white-space: nowrap;
      letter-spacing: 0.04em;
      border: 1.5px solid #FFFFFF;
    }

    .v2-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    .v2-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 6px;
    }

    .v2-name {
      font-size: 21px;
      font-weight: 800;
      color: #17131A;
      letter-spacing: -0.02em;
    }

    .v2-logo {
      height: 24px;
      width: auto;
      object-fit: contain;
    }

    .v2-subtitle {
      font-size: 12.5px;
      color: #746D76;
      margin-bottom: 12px;
    }

    .v2-subtitle strong {
      color: #3B0D4F;
      font-weight: 700;
    }

    .v2-pills-row {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .v2-pill {
      display: flex;
      align-items: center;
      gap: 6px;
      background: #FCFAF7;
      border: 1px solid #E5E0D8;
      padding: 6px 12px;
      border-radius: 30px;
      font-size: 11.5px;
      font-weight: 600;
      color: #17131A;
    }

    .v2-pill .dot-coral {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: #FF705D;
    }

    .v2-pill .dot-plum {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: #3B0D4F;
    }

    /* ========================================================
       VARIANTE 3: MINIMAL PREMIUM (Kompakt & Ultra-Clean)
       ======================================================== */
    .sig-v3 {
      width: 680px;
      height: 160px;
      display: flex;
      align-items: center;
      background: #FCFAF7;
      border-radius: 18px;
      border: 1.5px solid #3B0D4F;
      padding: 18px 24px;
      gap: 22px;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05);
    }

    .v3-avatar {
      width: 84px;
      height: 84px;
      border-radius: 50%;
      border: 2.5px solid #FF705D;
      object-fit: cover;
      object-position: center 15%;
      flex-shrink: 0;
    }

    .v3-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 100%;
    }

    .v3-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .v3-name-title {
      font-size: 18px;
      font-weight: 800;
      color: #17131A;
    }

    .v3-tagline {
      font-size: 12px;
      color: #653683;
      font-weight: 600;
      margin-top: 1px;
    }

    .v3-links {
      display: flex;
      align-items: center;
      gap: 16px;
      font-size: 12px;
      font-weight: 600;
      color: #17131A;
      margin-top: 8px;
      padding-top: 8px;
      border-top: 1px solid #E5E0D8;
    }

    .v3-links span.sep {
      color: #D1C9C0;
    }

    .v3-links a {
      color: #17131A;
      text-decoration: none;
    }

    .v3-links .highlight {
      color: #FF705D;
      font-weight: 700;
    }
  </style>
</head>
<body>

  <!-- ============================================== -->
  <!-- VARIANTE 1: DUO CARD (Optimiertes GPT-Layout)  -->
  <!-- ============================================== -->
  <div id="card-v1" class="sig-v1">
    <div class="v1-left">
      <div class="v1-left-glow"></div>
      <div class="v1-avatar-container">
        <img class="v1-avatar-img" src="${portraitBase64}" alt="Manuel Landeck" />
      </div>
      <div class="v1-badge">Direkt mit Manu</div>
    </div>
    <div class="v1-right">
      <div class="v1-top-row">
        <div class="v1-logo-box">
          <img class="v1-logo" src="${wordmarkBase64}" alt="Firmenflow" />
        </div>
      </div>
      <div class="v1-name-box">
        <div class="v1-name">Manuel Landeck</div>
        <div class="v1-role">Inhaber Firmenflow · Webdesign &amp; Lokalpräsenz aus Wesel</div>
      </div>
      <div class="v1-divider"></div>
      <div class="v1-contacts">
        <div class="v1-contact-item">
          <div class="v1-icon-badge coral">T</div>
          <span class="v1-contact-text">0155 67277155</span>
        </div>
        <div class="v1-contact-item">
          <div class="v1-icon-badge plum">E</div>
          <span class="v1-contact-text">manu@firmenflow.de</span>
        </div>
        <div class="v1-contact-item">
          <div class="v1-icon-badge plum">W</div>
          <span class="v1-contact-text">firmenflow.de</span>
        </div>
      </div>
      <div class="v1-footer-row">
        <span>Websites für lokale Unternehmen am Niederrhein</span>
        <div class="v1-dots">
          <div class="v1-dot" style="background: #FF705D;"></div>
          <div class="v1-dot" style="background: #653683;"></div>
          <div class="v1-dot" style="background: #3B0D4F;"></div>
        </div>
      </div>
    </div>
  </div>

  <!-- ============================================== -->
  <!-- VARIANTE 2: EDITORIAL LUXURY CARD              -->
  <!-- ============================================== -->
  <div id="card-v2" class="sig-v2">
    <div class="v2-avatar-wrapper">
      <img class="v2-avatar-img" src="${portraitBase64}" alt="Manuel Landeck" />
      <div class="v2-status-pill">WESEL · NRW</div>
    </div>
    <div class="v2-content">
      <div class="v2-top">
        <div>
          <div class="v2-name">Manuel Landeck</div>
          <div class="v2-subtitle">Webdesign &amp; Lokalpräsenz · <strong>Firmenflow</strong></div>
        </div>
        <img class="v2-logo" src="${wordmarkBase64}" alt="Firmenflow" />
      </div>
      <div class="v2-pills-row">
        <div class="v2-pill">
          <span class="dot-coral"></span>
          <span>0155 67277155</span>
        </div>
        <div class="v2-pill">
          <span class="dot-plum"></span>
          <span>manu@firmenflow.de</span>
        </div>
        <div class="v2-pill">
          <span class="dot-coral"></span>
          <span style="color: #FF705D; font-weight: 700;">firmenflow.de</span>
        </div>
      </div>
    </div>
  </div>

  <!-- ============================================== -->
  <!-- VARIANTE 3: COMPACT PREMIUM                    -->
  <!-- ============================================== -->
  <div id="card-v3" class="sig-v3">
    <img class="v3-avatar" src="${portraitBase64}" alt="Manuel Landeck" />
    <div class="v3-content">
      <div class="v3-header">
        <div>
          <div class="v3-name-title">Manuel Landeck</div>
          <div class="v3-tagline">Inhaber Firmenflow · Direkt mit Manu</div>
        </div>
        <img style="height: 22px; width: auto;" src="${wordmarkBase64}" alt="Firmenflow" />
      </div>
      <div class="v3-links">
        <span>📞 0155 67277155</span>
        <span class="sep">·</span>
        <span>✉️ manu@firmenflow.de</span>
        <span class="sep">·</span>
        <span class="highlight">🌐 firmenflow.de</span>
      </div>
    </div>
  </div>

</body>
</html>
`;

  const htmlPath = path.resolve("public/signatures/preview.html");
  fs.writeFileSync(htmlPath, htmlContent, "utf-8");

  console.log("Launching Playwright Chromium to capture 3x Ultra-HD signatures...");
  const browser = await chromium.launch({ headless: true });
  // Render at deviceScaleFactor: 3 for crystal clear Retina rendering (300 DPI equivalent)
  const context = await browser.newContext({
    deviceScaleFactor: 3,
  });
  const page = await context.newPage();
  await page.setContent(htmlContent, { waitUntil: "networkidle" });

  // 1. Capture Variante 1 (The Signature Card)
  const v1El = await page.$("#card-v1");
  if (v1El) {
    const v1Buffer = await v1El.screenshot({ type: "png", omitBackground: true });
    fs.writeFileSync(path.resolve("public/signatures/firmenflow-signatur-v1-duo-card.png"), v1Buffer);
    console.log("✓ Generated: public/signatures/firmenflow-signatur-v1-duo-card.png");
  }

  // 2. Capture Variante 2 (Editorial Luxury)
  const v2El = await page.$("#card-v2");
  if (v2El) {
    const v2Buffer = await v2El.screenshot({ type: "png", omitBackground: true });
    fs.writeFileSync(path.resolve("public/signatures/firmenflow-signatur-v2-editorial.png"), v2Buffer);
    console.log("✓ Generated: public/signatures/firmenflow-signatur-v2-editorial.png");
  }

  // 3. Capture Variante 3 (Compact Premium)
  const v3El = await page.$("#card-v3");
  if (v3El) {
    const v3Buffer = await v3El.screenshot({ type: "png", omitBackground: true });
    fs.writeFileSync(path.resolve("public/signatures/firmenflow-signatur-v3-compact.png"), v3Buffer);
    console.log("✓ Generated: public/signatures/firmenflow-signatur-v3-compact.png");
  }

  // Also update the primary email signature with the perfected V1
  if (v1El) {
    const v1Buffer = await v1El.screenshot({ type: "png", omitBackground: true });
    fs.writeFileSync(path.resolve("public/media/firmenflow-email-signature.png"), v1Buffer);
    console.log("✓ Updated: public/media/firmenflow-email-signature.png with ultra-crisp V1");
  }

  await browser.close();
  console.log("All signatures generated successfully in 3x Ultra-HD!");
}

generate().catch(console.error);
