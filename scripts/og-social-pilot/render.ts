import { PILOT, type PilotAssets } from "./spec";

export function renderPilotDocument(assets: PilotAssets): string {
  const { colors, cards } = PILOT;
  return `<!doctype html>
<html lang="de">
<head>
  <meta charset="utf-8">
  <style>
    @font-face { font-family: "Space Grotesk"; src: url("${assets.displayFont}") format("woff2"); font-weight: 300 700; }
    @font-face { font-family: "Switzer"; src: url("${assets.sansFont}") format("woff2"); font-weight: 100 900; }
    @font-face { font-family: "Crimson Text"; src: url("${assets.serifFont}") format("woff2"); font-style: italic; font-weight: 400 700; }
    * { box-sizing: border-box; }
    html, body { margin: 0; padding: 0; background: #ddd6df; }
    body { display: flex; flex-direction: column; gap: 40px; width: 1200px; }
    .og-card { --safe: 64px; position: relative; width: 1200px; height: 630px; overflow: hidden; isolation: isolate; }
    .ff-card { background: ${colors.paper}; color: ${colors.ink}; }
    .ff-glow { position: absolute; inset: -120px 420px 80px -140px; z-index: -1; border-radius: 45%; background: radial-gradient(circle at 52% 50%, #ffd9d1 0, #f8e7e3 35%, transparent 72%); transform: rotate(-12deg); }
    .ff-wordmark { position: absolute; left: 76px; top: 54px; width: 246px; height: auto; }
    .ff-eyebrow { position: absolute; left: 80px; top: 138px; font: 700 19px/1.2 "Switzer"; letter-spacing: .18em; color: ${colors.plum}; }
    .ff-copy { position: absolute; left: 78px; top: 186px; width: 555px; }
    .ff-primary { font: 650 70px/.96 "Space Grotesk"; letter-spacing: -.045em; color: ${colors.plum}; }
    .ff-editorial { margin-top: 12px; font: italic 72px/.88 "Crimson Text"; letter-spacing: -.025em; color: ${colors.coral}; }
    .ff-subline { margin-top: 24px; max-width: 520px; font: 430 27px/1.25 "Switzer"; color: #514b52; }
    .ff-portrait-shell { position: absolute; right: 64px; top: 38px; width: 454px; height: 548px; overflow: hidden; border-radius: 50% 50% 26px 26px; background: #eadfdc; box-shadow: 0 28px 80px rgb(72 35 97 / .16); }
    .ff-portrait { width: 100%; height: 100%; object-fit: cover; object-position: 50% 34%; }
    .ff-badge, .fs-badge { position: absolute; right: 70px; bottom: 38px; padding: 10px 19px 9px; border-radius: 999px; background: #fffaf7; color: ${colors.plum}; font: 750 15px/1 "Switzer"; letter-spacing: .08em; box-shadow: 0 10px 32px rgb(23 19 26 / .14); }
    .fs-card { background: ${colors.flowDark}; color: white; }
    .fs-card::after { content: ""; position: absolute; inset: auto -110px -180px 300px; height: 420px; z-index: -1; background: radial-gradient(circle, rgb(255 112 93 / .28), transparent 67%); }
    .fs-logo { position: absolute; left: 78px; top: 58px; width: 242px; height: auto; }
    .fs-copy { position: absolute; left: 78px; top: 170px; width: 470px; z-index: 2; }
    .fs-primary { font: 650 66px/.98 "Space Grotesk"; letter-spacing: -.045em; }
    .fs-accent { color: ${colors.coral}; }
    .fs-subline { margin-top: 28px; max-width: 420px; font: 430 27px/1.25 "Switzer"; color: #f0e8f0; }
    .fs-editor-shell { position: absolute; left: 535px; top: 116px; width: 720px; height: 445px; padding: 10px; border: 3px solid ${colors.mint}; border-radius: 24px; background: #2c2530; box-shadow: 0 34px 90px rgb(0 0 0 / .44), 0 0 50px rgb(101 214 193 / .15); transform: rotate(-1.6deg); overflow: hidden; }
    .fs-editor { width: 100%; height: 100%; object-fit: cover; object-position: left top; border-radius: 13px; }
    .fs-badge { right: 70px; bottom: 38px; color: ${colors.plum}; }
  </style>
</head>
<body>
  <section class="og-card ff-card" data-card="firmenflow" aria-label="Firmenflow OG-Vorschau">
    <div class="ff-glow"></div>
    <img class="ff-wordmark" src="${assets.firmenflowWordmark}" alt="Firmenflow">
    <div class="ff-eyebrow">${cards.firmenflow.eyebrow}</div>
    <div class="ff-copy">
      <div class="ff-primary">${cards.firmenflow.primaryLine}</div>
      <div class="ff-editorial">${cards.firmenflow.editorialLine}</div>
      <div class="ff-subline">${cards.firmenflow.subline}</div>
    </div>
    <div class="ff-portrait-shell"><img class="ff-portrait" src="${assets.manuPortrait}" alt="Manu"></div>
    <div class="ff-badge">${cards.firmenflow.badge}</div>
  </section>
  <section class="og-card fs-card" data-card="flowscreen" aria-label="FlowScreen OG-Vorschau">
    <img class="fs-logo" src="${assets.flowscreenLogo}" alt="FlowScreen">
    <div class="fs-copy">
      <div class="fs-primary">${cards.flowscreen.lineOne}<br><span class="fs-accent">${cards.flowscreen.accentLine}</span></div>
      <div class="fs-subline">${cards.flowscreen.subline}</div>
    </div>
    <div class="fs-editor-shell"><img class="fs-editor" src="${assets.flowscreenEditor}" alt="FlowScreen Editor"></div>
    <div class="fs-badge">${cards.flowscreen.badge}</div>
  </section>
</body>
</html>`;
}
