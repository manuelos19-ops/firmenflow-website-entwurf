const { chromium } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

// Image paths
const MAPS_IMG_PATH = 'D:/KI Projekte/01_Marke_und_Websites/Antigravity Firmenflow Website/firmenflow-website/public/images/ratgeber/google-maps-nicht-gefunden.jpg';
const MANU_PORTRAIT_PATH = 'D:/KI Projekte/01_Marke_und_Websites/Pitches/Kruemelranch Alpen/manuel_portrait.jpg';
const APP_ICON_PATH = 'D:/KI Projekte/01_Marke_und_Websites/CI - Logos - Markenkit/01_Firmenflow/firmenflow-app-icon-3d.webp';
const WORDMARK_PATH = 'D:/KI Projekte/01_Marke_und_Websites/CI - Logos - Markenkit/01_Firmenflow/firmenflow-wordmark.webp';
const ICON_PROFIL_PATH = 'D:/KI Projekte/01_Marke_und_Websites/CI - Logos - Markenkit/01_Firmenflow/3D_Icons/04_Lokalpraesenz_360/02-profil-aufraeumen.webp';
const ICON_BEWERTUNG_PATH = 'D:/KI Projekte/01_Marke_und_Websites/CI - Logos - Markenkit/01_Firmenflow/3D_Icons/04_Lokalpraesenz_360/04-mehr-bewertungen.webp';
const ICON_CHECK_PATH = 'D:/KI Projekte/01_Marke_und_Websites/CI - Logos - Markenkit/01_Firmenflow/3D_Icons/04_Lokalpraesenz_360/07-handlungsempfehlung.webp';

function toBase64(filePath, mimeType) {
  const fileData = fs.readFileSync(filePath);
  return `data:${mimeType};base64,${fileData.toString('base64')}`;
}

const mapsImgBase64 = toBase64(MAPS_IMG_PATH, 'image/jpeg');
const manuPortraitBase64 = toBase64(MANU_PORTRAIT_PATH, 'image/jpeg');
const appIconBase64 = toBase64(APP_ICON_PATH, 'image/webp');
const iconProfilBase64 = toBase64(ICON_PROFIL_PATH, 'image/webp');
const iconBewertungBase64 = toBase64(ICON_BEWERTUNG_PATH, 'image/webp');
const iconCheckBase64 = toBase64(ICON_CHECK_PATH, 'image/webp');

// ==========================================
// 1. LIGHT PAPER EDITORIAL VERSION (MASTER)
// ==========================================
const htmlPaper = `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <title>Firmenflow WhatsApp Status - Ratgeber Google Maps (Paper)</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Space+Grotesk:wght@500;600;700;800&display=swap" rel="stylesheet">
  <style>
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      width: 1080px;
      height: 1920px;
      background-color: #FCFAF7;
      background-image: 
        radial-gradient(circle at 18% 12%, rgba(255, 112, 93, 0.09) 0%, transparent 42%),
        radial-gradient(circle at 82% 38%, rgba(101, 54, 131, 0.08) 0%, transparent 45%),
        radial-gradient(circle at 50% 88%, rgba(72, 35, 97, 0.06) 0%, transparent 52%);
      font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
      color: #17131A;
      overflow: hidden;
      position: relative;
      -webkit-font-smoothing: antialiased;
    }

    /* Ambient paper texture grid subtle */
    .bg-grid {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-size: 36px 36px;
      background-image: radial-gradient(rgba(101, 54, 131, 0.045) 1.5px, transparent 1.5px);
      pointer-events: none;
      z-index: 1;
    }

    /* Status Container with precise safe zones */
    .status-container {
      width: 1080px;
      height: 1920px;
      padding: 150px 64px 170px 64px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      position: relative;
      z-index: 10;
    }

    /* 1. Header Bar */
    .header-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      height: 84px;
    }

    .author-pill {
      display: flex;
      align-items: center;
      gap: 16px;
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(16px);
      border: 1.5px solid #E7E2DC;
      border-radius: 999px;
      padding: 8px 24px 8px 8px;
      box-shadow: 0 6px 20px rgba(72, 35, 97, 0.06);
    }

    .author-avatar {
      width: 64px;
      height: 64px;
      border-radius: 50%;
      object-fit: cover;
      object-position: top;
      border: 2px solid #FFFFFF;
      box-shadow: 0 3px 10px rgba(72, 35, 97, 0.18);
    }

    .author-info {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .author-name {
      font-size: 24px;
      font-weight: 700;
      color: #17131A;
      letter-spacing: -0.02em;
      line-height: 1.2;
    }

    .author-meta {
      font-size: 18px;
      font-weight: 600;
      color: #653683;
      letter-spacing: -0.01em;
    }

    .badge-pill {
      display: flex;
      align-items: center;
      gap: 12px;
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(16px);
      border: 1.5px solid #E7E2DC;
      border-radius: 999px;
      padding: 12px 24px;
      box-shadow: 0 6px 20px rgba(72, 35, 97, 0.06);
    }

    .app-icon {
      width: 38px;
      height: 38px;
      border-radius: 10px;
      object-fit: contain;
    }

    .badge-text {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 20px;
      font-weight: 700;
      color: #653683;
      letter-spacing: 0.04em;
      text-transform: uppercase;
    }

    .badge-dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: #FF705D;
      box-shadow: 0 0 10px #FF705D;
    }

    /* 2. Headline & Hook */
    .hero-text-block {
      display: flex;
      flex-direction: column;
      gap: 14px;
    }

    .kicker-pill {
      align-self: flex-start;
      display: inline-flex;
      align-items: center;
      gap: 10px;
      background: rgba(255, 112, 93, 0.12);
      border: 1.5px solid rgba(255, 112, 93, 0.32);
      border-radius: 999px;
      padding: 9px 20px;
      font-family: 'Space Grotesk', sans-serif;
      font-size: 20px;
      font-weight: 700;
      color: #D34330;
      letter-spacing: 0.04em;
      text-transform: uppercase;
    }

    .headline {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 56px;
      font-weight: 800;
      line-height: 1.14;
      color: #17131A;
      letter-spacing: -0.035em;
    }

    .headline-highlight {
      background: linear-gradient(135deg, #653683 0%, #482361 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .subline {
      font-size: 27px;
      font-weight: 500;
      line-height: 1.38;
      color: #58505C;
      letter-spacing: -0.015em;
    }

    .subline strong {
      color: #17131A;
      font-weight: 700;
    }

    /* 3. Centerpiece Showcase Visual */
    .visual-card {
      width: 952px;
      height: 540px;
      border-radius: 32px;
      background: linear-gradient(145deg, #FFFFFF 0%, #F6F2EC 100%);
      border: 2px solid #EAE5DF;
      box-shadow: 
        0 28px 60px -12px rgba(72, 35, 97, 0.16),
        0 10px 24px rgba(255, 112, 93, 0.1);
      position: relative;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .visual-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      border-radius: 30px;
    }

    .float-tag-top {
      position: absolute;
      top: 22px;
      left: 24px;
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(14px);
      border: 1.5px solid #E7E2DC;
      border-radius: 999px;
      padding: 10px 24px;
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 21px;
      font-weight: 700;
      color: #17131A;
      box-shadow: 0 6px 20px rgba(72, 35, 97, 0.12);
    }

    .float-tag-bottom {
      position: absolute;
      bottom: 22px;
      right: 24px;
      background: rgba(72, 35, 97, 0.96);
      backdrop-filter: blur(14px);
      border: 1.5px solid rgba(255, 255, 255, 0.25);
      border-radius: 999px;
      padding: 10px 24px;
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 21px;
      font-weight: 700;
      color: #FFFFFF;
      box-shadow: 0 10px 28px rgba(72, 35, 97, 0.35);
    }

    /* 4. Three Core Points */
    .points-stack {
      display: flex;
      flex-direction: column;
      gap: 15px;
    }

    .point-card {
      display: flex;
      align-items: center;
      gap: 22px;
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(14px);
      border: 1.5px solid #E7E2DC;
      border-radius: 22px;
      padding: 18px 26px;
      box-shadow: 0 5px 18px rgba(72, 35, 97, 0.05);
    }

    .point-icon-box {
      width: 70px;
      height: 70px;
      border-radius: 18px;
      background: #F7F4EE;
      border: 1.5px solid #EAE5DF;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      padding: 6px;
    }

    .point-icon-box img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      filter: drop-shadow(0 3px 6px rgba(72, 35, 97, 0.18));
    }

    .point-body {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .point-title {
      font-size: 27px;
      font-weight: 700;
      color: #17131A;
      letter-spacing: -0.02em;
    }

    .point-text {
      font-size: 22px;
      font-weight: 500;
      color: #6E6872;
      line-height: 1.32;
      letter-spacing: -0.01em;
    }

    .point-tag {
      font-size: 16px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      padding: 7px 16px;
      border-radius: 999px;
      white-space: nowrap;
    }

    .tag-coral {
      background: rgba(255, 112, 93, 0.12);
      color: #D34330;
      border: 1px solid rgba(255, 112, 93, 0.28);
    }

    .tag-plum {
      background: rgba(101, 54, 131, 0.12);
      color: #653683;
      border: 1px solid rgba(101, 54, 131, 0.24);
    }

    /* 5. CTA Box */
    .cta-card {
      width: 100%;
      height: 150px;
      border-radius: 26px;
      background: linear-gradient(135deg, #482361 0%, #5B2F75 60%, #431E5B 100%);
      border: 2px solid rgba(255, 112, 93, 0.4);
      box-shadow: 
        0 18px 40px rgba(72, 35, 97, 0.35),
        0 6px 16px rgba(255, 112, 93, 0.25);
      padding: 0 34px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: relative;
      overflow: hidden;
    }

    .cta-left {
      display: flex;
      flex-direction: column;
      gap: 6px;
      z-index: 2;
    }

    .cta-eyebrow {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      font-family: 'Space Grotesk', sans-serif;
      font-size: 18px;
      font-weight: 700;
      color: #FF9B8E;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .cta-url {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 40px;
      font-weight: 800;
      color: #FFFFFF;
      letter-spacing: -0.02em;
    }

    .cta-url span {
      color: #FF705D;
    }

    .cta-button {
      display: inline-flex;
      align-items: center;
      gap: 12px;
      background: linear-gradient(135deg, #FF705D 0%, #FA5D48 100%);
      color: #FFFFFF;
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: 26px;
      font-weight: 700;
      padding: 19px 34px;
      border-radius: 18px;
      box-shadow: 0 8px 24px rgba(255, 112, 93, 0.5);
      letter-spacing: -0.01em;
      border: 1px solid rgba(255, 255, 255, 0.3);
      z-index: 2;
    }

    .cta-button-arrow {
      font-size: 28px;
      line-height: 1;
    }
  </style>
</head>
<body>
  <div class="bg-grid"></div>

  <div class="status-container">
    <!-- 1. Header Bar -->
    <div class="header-bar">
      <div class="author-pill">
        <img src="${manuPortraitBase64}" alt="Manuel Landeck" class="author-avatar">
        <div class="author-info">
          <span class="author-name">Manuel Landeck</span>
          <span class="author-meta">Persönlich mit Manu &bull; Firmenflow</span>
        </div>
      </div>

      <div class="badge-pill">
        <img src="${appIconBase64}" alt="Firmenflow" class="app-icon">
        <span class="badge-text">Ratgeber</span>
        <span class="badge-dot"></span>
      </div>
    </div>

    <!-- 2. Headline & Hook -->
    <div class="hero-text-block">
      <div class="kicker-pill">
        <span>📍 LOKALE SICHTBARKEIT &bull; GOOGLE MAPS</span>
      </div>
      <h1 class="headline">
        Warum dein Betrieb bei <span class="headline-highlight">Google Maps</span> nicht gefunden wird.
      </h1>
      <p class="subline">
        Ein Kunde sucht deine Leistung im Ort – und sieht <strong>3 andere Betriebe</strong>. Die 5 häufigsten Fehler &amp; der 30-Sekunden-Selbsttest.
      </p>
    </div>

    <!-- 3. Centerpiece Showcase Visual -->
    <div class="visual-card">
      <img src="${mapsImgBase64}" alt="Google Maps Sichtbarkeit" class="visual-image">
      <div class="float-tag-top">
        <span>📍 198 Betriebe am Niederrhein analysiert</span>
      </div>
      <div class="float-tag-bottom">
        <span>⚠️ Fast jeder 2. Betrieb verliert Anfragen</span>
      </div>
    </div>

    <!-- 4. Three Core Points -->
    <div class="points-stack">
      <div class="point-card">
        <div class="point-icon-box">
          <img src="${iconProfilBase64}" alt="Kein Inhaber-Zugriff">
        </div>
        <div class="point-body">
          <span class="point-title">1. Kein Inhaber-Zugriff</span>
          <span class="point-text">Profil ist herrenlos: Fremde können Zeiten &amp; Nummern ändern</span>
        </div>
        <div class="point-tag tag-coral">Profil-Lücke</div>
      </div>

      <div class="point-card">
        <div class="point-icon-box">
          <img src="${iconBewertungBase64}" alt="Bewertungen ohne Text">
        </div>
        <div class="point-body">
          <span class="point-title">2. Bewertungen ohne Text</span>
          <span class="point-text">Warum reine 5 Sterne ohne Suchbegriffe Google kaum helfen</span>
        </div>
        <div class="point-tag tag-coral">Ranking-Falle</div>
      </div>

      <div class="point-card">
        <div class="point-icon-box">
          <img src="${iconCheckBase64}" alt="Handy-Selbsttest">
        </div>
        <div class="point-body">
          <span class="point-title">3. Der 30-Sekunden-Selbsttest</span>
          <span class="point-text">Sofort am Smartphone prüfen: Stehst du unter den Top 3 Treffern?</span>
        </div>
        <div class="point-tag tag-plum">Selbsttest</div>
      </div>
    </div>

    <!-- 5. CTA Box -->
    <div class="cta-card">
      <div class="cta-left">
        <div class="cta-eyebrow">
          <span>🔥 NEUER RATGEBER &bull; KOSTENLOS ONLINE</span>
        </div>
        <div class="cta-url">
          firmenflow.de/<span>ratgeber</span>
        </div>
      </div>
      <div class="cta-button">
        <span>Jetzt lesen</span>
        <span class="cta-button-arrow">&rarr;</span>
      </div>
    </div>
  </div>
</body>
</html>`;

// ==========================================
// 2. DARK PLUM LUXURY VERSION (ALTERNATIVE)
// ==========================================
const htmlDark = `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <title>Firmenflow WhatsApp Status - Ratgeber Google Maps (Dark Plum)</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Space+Grotesk:wght@500;600;700;800&display=swap" rel="stylesheet">
  <style>
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      width: 1080px;
      height: 1920px;
      background-color: #130C1A;
      background-image: 
        radial-gradient(circle at 18% 12%, rgba(255, 112, 93, 0.18) 0%, transparent 45%),
        radial-gradient(circle at 82% 38%, rgba(139, 98, 207, 0.22) 0%, transparent 50%),
        radial-gradient(circle at 50% 88%, rgba(255, 112, 93, 0.14) 0%, transparent 55%);
      font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
      color: #FFFFFF;
      overflow: hidden;
      position: relative;
      -webkit-font-smoothing: antialiased;
    }

    .bg-grid {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-size: 40px 40px;
      background-image: radial-gradient(rgba(255, 255, 255, 0.06) 1.5px, transparent 1.5px);
      pointer-events: none;
      z-index: 1;
    }

    .status-container {
      width: 1080px;
      height: 1920px;
      padding: 150px 64px 170px 64px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      position: relative;
      z-index: 10;
    }

    /* 1. Header Bar */
    .header-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      height: 84px;
    }

    .author-pill {
      display: flex;
      align-items: center;
      gap: 16px;
      background: rgba(255, 255, 255, 0.08);
      backdrop-filter: blur(18px);
      border: 1px solid rgba(255, 255, 255, 0.16);
      border-radius: 999px;
      padding: 8px 24px 8px 8px;
      box-shadow: 0 6px 24px rgba(0, 0, 0, 0.4);
    }

    .author-avatar {
      width: 64px;
      height: 64px;
      border-radius: 50%;
      object-fit: cover;
      object-position: top;
      border: 2px solid rgba(255, 255, 255, 0.4);
      box-shadow: 0 3px 12px rgba(0, 0, 0, 0.3);
    }

    .author-info {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .author-name {
      font-size: 24px;
      font-weight: 700;
      color: #FFFFFF;
      letter-spacing: -0.02em;
      line-height: 1.2;
    }

    .author-meta {
      font-size: 18px;
      font-weight: 600;
      color: #FF9B8E;
      letter-spacing: -0.01em;
    }

    .badge-pill {
      display: flex;
      align-items: center;
      gap: 12px;
      background: rgba(255, 255, 255, 0.08);
      backdrop-filter: blur(18px);
      border: 1px solid rgba(255, 255, 255, 0.16);
      border-radius: 999px;
      padding: 12px 24px;
      box-shadow: 0 6px 24px rgba(0, 0, 0, 0.4);
    }

    .app-icon {
      width: 38px;
      height: 38px;
      border-radius: 10px;
      object-fit: contain;
    }

    .badge-text {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 20px;
      font-weight: 700;
      color: #FF705D;
      letter-spacing: 0.04em;
      text-transform: uppercase;
    }

    .badge-dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: #FF705D;
      box-shadow: 0 0 12px #FF705D;
    }

    /* 2. Headline & Hook */
    .hero-text-block {
      display: flex;
      flex-direction: column;
      gap: 14px;
    }

    .kicker-pill {
      align-self: flex-start;
      display: inline-flex;
      align-items: center;
      gap: 10px;
      background: rgba(255, 112, 93, 0.18);
      border: 1.5px solid rgba(255, 112, 93, 0.45);
      border-radius: 999px;
      padding: 9px 20px;
      font-family: 'Space Grotesk', sans-serif;
      font-size: 20px;
      font-weight: 700;
      color: #FF8878;
      letter-spacing: 0.04em;
      text-transform: uppercase;
    }

    .headline {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 56px;
      font-weight: 800;
      line-height: 1.14;
      color: #FFFFFF;
      letter-spacing: -0.035em;
    }

    .headline-highlight {
      background: linear-gradient(135deg, #FF8878 0%, #FF705D 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .subline {
      font-size: 27px;
      font-weight: 400;
      line-height: 1.38;
      color: rgba(255, 255, 255, 0.75);
      letter-spacing: -0.015em;
    }

    .subline strong {
      color: #FFFFFF;
      font-weight: 700;
    }

    /* 3. Centerpiece Showcase Visual */
    .visual-card {
      width: 952px;
      height: 540px;
      border-radius: 32px;
      background: linear-gradient(145deg, #22152C 0%, #170E1F 100%);
      border: 2px solid rgba(255, 255, 255, 0.14);
      box-shadow: 
        0 30px 70px -15px rgba(0, 0, 0, 0.6),
        0 10px 30px rgba(255, 112, 93, 0.2);
      position: relative;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .visual-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      border-radius: 30px;
    }

    .float-tag-top {
      position: absolute;
      top: 22px;
      left: 24px;
      background: rgba(19, 12, 26, 0.88);
      backdrop-filter: blur(14px);
      border: 1.5px solid rgba(255, 255, 255, 0.2);
      border-radius: 999px;
      padding: 10px 24px;
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 21px;
      font-weight: 700;
      color: #FFFFFF;
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.5);
    }

    .float-tag-bottom {
      position: absolute;
      bottom: 22px;
      right: 24px;
      background: rgba(255, 112, 93, 0.95);
      backdrop-filter: blur(14px);
      border: 1.5px solid rgba(255, 255, 255, 0.3);
      border-radius: 999px;
      padding: 10px 24px;
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 21px;
      font-weight: 700;
      color: #FFFFFF;
      box-shadow: 0 10px 28px rgba(255, 112, 93, 0.4);
    }

    /* 4. Three Core Points */
    .points-stack {
      display: flex;
      flex-direction: column;
      gap: 15px;
    }

    .point-card {
      display: flex;
      align-items: center;
      gap: 22px;
      background: rgba(255, 255, 255, 0.05);
      backdrop-filter: blur(14px);
      border: 1.5px solid rgba(255, 255, 255, 0.1);
      border-radius: 22px;
      padding: 18px 26px;
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
    }

    .point-icon-box {
      width: 70px;
      height: 70px;
      border-radius: 18px;
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid rgba(255, 255, 255, 0.15);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      padding: 6px;
    }

    .point-icon-box img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.4));
    }

    .point-body {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .point-title {
      font-size: 27px;
      font-weight: 700;
      color: #FFFFFF;
      letter-spacing: -0.02em;
    }

    .point-text {
      font-size: 22px;
      font-weight: 400;
      color: rgba(255, 255, 255, 0.72);
      line-height: 1.32;
      letter-spacing: -0.01em;
    }

    .point-tag {
      font-size: 16px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      padding: 7px 16px;
      border-radius: 999px;
      white-space: nowrap;
      background: rgba(255, 112, 93, 0.18);
      color: #FF8878;
      border: 1px solid rgba(255, 112, 93, 0.35);
    }

    /* 5. CTA Box */
    .cta-card {
      width: 100%;
      height: 150px;
      border-radius: 26px;
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.09) 0%, rgba(255, 255, 255, 0.04) 100%);
      border: 2px solid rgba(255, 112, 93, 0.45);
      box-shadow: 
        0 18px 45px rgba(0, 0, 0, 0.5),
        0 6px 16px rgba(255, 112, 93, 0.2);
      padding: 0 34px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: relative;
      overflow: hidden;
      backdrop-filter: blur(20px);
    }

    .cta-left {
      display: flex;
      flex-direction: column;
      gap: 6px;
      z-index: 2;
    }

    .cta-eyebrow {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      font-family: 'Space Grotesk', sans-serif;
      font-size: 18px;
      font-weight: 700;
      color: #FF9B8E;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .cta-url {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 40px;
      font-weight: 800;
      color: #FFFFFF;
      letter-spacing: -0.02em;
    }

    .cta-url span {
      color: #FF705D;
    }

    .cta-button {
      display: inline-flex;
      align-items: center;
      gap: 12px;
      background: linear-gradient(135deg, #FF705D 0%, #FA5D48 100%);
      color: #FFFFFF;
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: 26px;
      font-weight: 700;
      padding: 19px 34px;
      border-radius: 18px;
      box-shadow: 0 8px 24px rgba(255, 112, 93, 0.5);
      letter-spacing: -0.01em;
      border: 1px solid rgba(255, 255, 255, 0.3);
      z-index: 2;
    }

    .cta-button-arrow {
      font-size: 28px;
      line-height: 1;
    }
  </style>
</head>
<body>
  <div class="bg-grid"></div>

  <div class="status-container">
    <!-- 1. Header Bar -->
    <div class="header-bar">
      <div class="author-pill">
        <img src="${manuPortraitBase64}" alt="Manuel Landeck" class="author-avatar">
        <div class="author-info">
          <span class="author-name">Manuel Landeck</span>
          <span class="author-meta">Persönlich mit Manu &bull; Firmenflow</span>
        </div>
      </div>

      <div class="badge-pill">
        <img src="${appIconBase64}" alt="Firmenflow" class="app-icon">
        <span class="badge-text">Ratgeber</span>
        <span class="badge-dot"></span>
      </div>
    </div>

    <!-- 2. Headline & Hook -->
    <div class="hero-text-block">
      <div class="kicker-pill">
        <span>📍 LOKALE SICHTBARKEIT &bull; GOOGLE MAPS</span>
      </div>
      <h1 class="headline">
        Warum dein Betrieb bei <span class="headline-highlight">Google Maps</span> nicht gefunden wird.
      </h1>
      <p class="subline">
        Ein Kunde sucht deine Leistung im Ort – und sieht <strong>3 andere Betriebe</strong>. Die 5 häufigsten Fehler &amp; der 30-Sekunden-Selbsttest.
      </p>
    </div>

    <!-- 3. Centerpiece Showcase Visual -->
    <div class="visual-card">
      <img src="${mapsImgBase64}" alt="Google Maps Sichtbarkeit" class="visual-image">
      <div class="float-tag-top">
        <span>📍 198 Betriebe am Niederrhein analysiert</span>
      </div>
      <div class="float-tag-bottom">
        <span>⚠️ Fast jeder 2. Betrieb verliert Anfragen</span>
      </div>
    </div>

    <!-- 4. Three Core Points -->
    <div class="points-stack">
      <div class="point-card">
        <div class="point-icon-box">
          <img src="${iconProfilBase64}" alt="Kein Inhaber-Zugriff">
        </div>
        <div class="point-body">
          <span class="point-title">1. Kein Inhaber-Zugriff</span>
          <span class="point-text">Profil ist herrenlos: Fremde können Zeiten &amp; Nummern ändern</span>
        </div>
        <div class="point-tag">Profil-Lücke</div>
      </div>

      <div class="point-card">
        <div class="point-icon-box">
          <img src="${iconBewertungBase64}" alt="Bewertungen ohne Text">
        </div>
        <div class="point-body">
          <span class="point-title">2. Bewertungen ohne Text</span>
          <span class="point-text">Warum reine 5 Sterne ohne Suchbegriffe Google kaum helfen</span>
        </div>
        <div class="point-tag">Ranking-Falle</div>
      </div>

      <div class="point-card">
        <div class="point-icon-box">
          <img src="${iconCheckBase64}" alt="Handy-Selbsttest">
        </div>
        <div class="point-body">
          <span class="point-title">3. Der 30-Sekunden-Selbsttest</span>
          <span class="point-text">Sofort am Smartphone prüfen: Stehst du unter den Top 3 Treffern?</span>
        </div>
        <div class="point-tag">Selbsttest</div>
      </div>
    </div>

    <!-- 5. CTA Box -->
    <div class="cta-card">
      <div class="cta-left">
        <div class="cta-eyebrow">
          <span>🔥 NEUER RATGEBER &bull; KOSTENLOS ONLINE</span>
        </div>
        <div class="cta-url">
          firmenflow.de/<span>ratgeber</span>
        </div>
      </div>
      <div class="cta-button">
        <span>Jetzt lesen</span>
        <span class="cta-button-arrow">&rarr;</span>
      </div>
    </div>
  </div>
</body>
</html>`;

const HTML_PAPER_PATH = path.join(__dirname, 'whatsapp_status_maps_paper.html');
const HTML_DARK_PATH = path.join(__dirname, 'whatsapp_status_maps_dark.html');

fs.writeFileSync(HTML_PAPER_PATH, htmlPaper, 'utf-8');
fs.writeFileSync(HTML_DARK_PATH, htmlDark, 'utf-8');
console.log('✅ HTML files written.');

(async () => {
  console.log('🚀 Launching Playwright to render WhatsApp Status graphics...');
  const browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--allow-file-access-from-files']
  });

  const OUT_DIR_BRAND = 'D:/KI Projekte/01_Marke_und_Websites/Antigravity Firmenflow Website/firmenflow-website/public/brand/whatsapp';
  const OUT_DIR_BRAIN = 'C:/Users/manue/.gemini/antigravity/brain/3631f3ac-4436-4487-b05e-241e82eb8265';

  if (!fs.existsSync(OUT_DIR_BRAND)) {
    fs.mkdirSync(OUT_DIR_BRAND, { recursive: true });
  }

  const page = await browser.newPage();
  await page.setViewportSize({ width: 1080, height: 1920 });

  // Render Paper (Master Version)
  console.log('📄 Rendering Paper version (Master)...');
  await page.goto('file:///' + HTML_PAPER_PATH.replace(/\\/g, '/'), { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(2000);

  const outJpgPaper = path.join(OUT_DIR_BRAND, '01_Status_Ratgeber_Google_Maps_1080x1920.jpg');
  const outPngPaper = path.join(OUT_DIR_BRAND, '01_Status_Ratgeber_Google_Maps_1080x1920.png');
  const outJpgPaperNamed = path.join(OUT_DIR_BRAND, '01_Status_Ratgeber_Google_Maps_Paper_1080x1920.jpg');
  const outJpgBrainPaper = path.join(OUT_DIR_BRAIN, '01_Status_Ratgeber_Google_Maps_1080x1920.jpg');

  await page.screenshot({ path: outJpgPaper, type: 'jpeg', quality: 95 });
  await page.screenshot({ path: outPngPaper, type: 'png' });
  await page.screenshot({ path: outJpgPaperNamed, type: 'jpeg', quality: 95 });
  await page.screenshot({ path: outJpgBrainPaper, type: 'jpeg', quality: 95 });

  // Render Dark Plum (Alternative Version)
  console.log('🌙 Rendering Dark Plum version (Alternative)...');
  await page.goto('file:///' + HTML_DARK_PATH.replace(/\\/g, '/'), { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(2000);

  const outJpgDark = path.join(OUT_DIR_BRAND, '02_Status_Ratgeber_Google_Maps_DarkPlum_1080x1920.jpg');
  const outPngDark = path.join(OUT_DIR_BRAND, '02_Status_Ratgeber_Google_Maps_DarkPlum_1080x1920.png');
  const outJpgBrainDark = path.join(OUT_DIR_BRAIN, '02_Status_Ratgeber_Google_Maps_DarkPlum_1080x1920.jpg');

  await page.screenshot({ path: outJpgDark, type: 'jpeg', quality: 95 });
  await page.screenshot({ path: outPngDark, type: 'png' });
  await page.screenshot({ path: outJpgBrainDark, type: 'jpeg', quality: 95 });

  console.log('✅ All status graphics rendered successfully!');
  await browser.close();
})();
