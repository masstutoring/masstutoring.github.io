<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Mass Tutoring — Free SAT Prep</title>
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
<style>
  :root {
    --bg: #0b0f17;
    --panel: #161d2b;
    --border: #263244;
    --border-soft: #1f2937;
    --text: #ffffff;
    --text-dim: #cbd5e1;
    --text-mute: #94a3b8;
    --text-faint: #64748b;
    --accent: #f59e0b;
    --accent-dark: #111827;
  }

  * { box-sizing: border-box; }
  html, body { margin: 0; padding: 0; }
  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    background: var(--bg);
    min-height: 100vh;
    color: var(--text);
  }
  img { max-width: 100%; }
  button { font-family: inherit; }
  a { text-decoration: none; }

  ::selection { background: #f59e0b55; }

  /* ===== animations ===== */
  @keyframes mt-scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
  .mt-marquee { display: flex; gap: 20px; width: max-content; animation: mt-scroll 28s linear infinite; }
  .mt-marquee:hover { animation-play-state: paused; }

  @keyframes mt-fade-in { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
  .mt-fade-in { animation: mt-fade-in 0.25s ease-out; }

  @keyframes mt-pop { 0% { transform: scale(0.97); } 60% { transform: scale(1.01); } 100% { transform: scale(1); } }
  .mt-pop { animation: mt-pop 0.18s ease-out; }

  .mt-btn { transition: transform 0.12s ease, box-shadow 0.12s ease, background 0.12s ease, border-color 0.12s ease, opacity 0.12s ease; cursor: pointer; }
  .mt-btn:hover:not(:disabled) { transform: translateY(-1px); }
  .mt-btn:active:not(:disabled) { transform: translateY(0) scale(0.98); }
  .mt-btn:disabled { cursor: not-allowed; }

  .mt-choice { transition: transform 0.12s ease, background 0.12s ease, border-color 0.12s ease, color 0.12s ease; cursor: pointer; }
  .mt-choice:hover:not(:disabled) { transform: translateX(2px); border-color: #f59e0b66; }
  .mt-choice:disabled { cursor: default; }

  .mt-card-hover { transition: transform 0.15s ease, border-color 0.15s ease; }
  .mt-card-hover:hover { transform: translateY(-3px); border-color: #f59e0b55; }

  .mt-chip { transition: all 0.15s ease; cursor: pointer; }

  /* ===== layout shells ===== */
  .page { display: none; }
  .page.active { display: block; }

  .container { max-width: 1100px; margin: 0 auto; }

  /* ===== nav ===== */
  .nav {
    position: sticky; top: 0; z-index: 50;
    background: rgba(17,24,39,0.92);
    backdrop-filter: blur(8px);
    border-bottom: 1px solid var(--border-soft);
    display: flex; align-items: center; justify-content: space-between;
    padding: 12px 5%;
  }
  .nav-brand { display: flex; align-items: center; gap: 10px; background: none; border: none; cursor: pointer; }
  .nav-brand span { color: white; font-weight: 800; font-size: 18px; }
  .nav-links { display: flex; gap: 18px; align-items: center; }
  .nav-link { color: #cbd5e1; background: none; border: none; cursor: pointer; font-weight: 600; font-size: 15px; padding: 8px 4px; font-family: inherit; }
  .nav-link.active { color: var(--accent); }
  .nav-cta {
    background: var(--accent); color: var(--accent-dark); border: none; border-radius: 999px;
    padding: 9px 18px; font-weight: 700; cursor: pointer; font-size: 14px;
  }

  /* ===== footer ===== */
  .footer {
    background: var(--bg); color: var(--text-mute); padding: 40px 5%;
    text-align: center; font-size: 14px; border-top: 1px solid var(--border-soft);
  }
  .footer-logo { display: flex; justify-content: center; margin-bottom: 14px; }
  .footer-name { color: white; font-weight: 700; margin-bottom: 6px; }

  /* ===== visitor badge ===== */
  .visitor-badge {
    display: inline-flex; align-items: center; gap: 8px; background: var(--panel);
    border: 1px solid var(--border); border-radius: 999px; padding: 8px 16px; font-size: 13.5px;
  }
  .visitor-dot {
    width: 8px; height: 8px; border-radius: 50%; background: #34d399; display: inline-block;
    box-shadow: 0 0 0 3px rgba(52,211,153,0.18);
  }
  .visitor-badge strong { color: var(--accent); }
  .visitor-badge span.label { color: #e2e8f0; }

  /* ===== hero ===== */
  .hero {
    position: relative;
    padding: 90px 5% 70px; text-align: center;
    background: radial-gradient(circle at 50% 0%, #1f2937 0%, #0b0f17 60%);
    overflow: hidden;
  }

  /* LiquidEther canvas sits behind hero content */
  #liquid-ether-mount {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 0;
  }
  #liquid-ether-mount canvas {
    display: block;
    width: 100% !important;
    height: 100% !important;
  }

  /* Hero content sits on top */
  .hero-content {
    position: relative;
    z-index: 1;
  }

  .hero-badge {
    display: inline-block; background: rgba(245,158,11,0.12); border: 1px solid var(--accent);
    color: var(--accent); border-radius: 999px; padding: 6px 16px; font-size: 13px; font-weight: 700; margin-bottom: 22px;
  }
  .hero h1 { color: white; font-size: clamp(2.4rem,6vw,4rem); font-weight: 900; line-height: 1.1; margin: 0 0 18px; }
  .hero p.lede { color: var(--text-dim); font-size: 19px; max-width: 640px; margin: 0 auto 28px; }
  .hero-actions { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; margin-bottom: 0; }
  .btn-primary {
    background: var(--accent); color: var(--accent-dark); border: none; border-radius: 999px;
    padding: 14px 30px; font-weight: 800; font-size: 16px; cursor: pointer;
  }
  .btn-secondary {
    background: transparent; color: white; border: 2px solid #374151; border-radius: 999px;
    padding: 14px 30px; font-weight: 700; font-size: 16px; cursor: pointer;
  }
  .hero-image-wrap {
    max-width: 880px; margin: 48px auto 0; border-radius: 20px; overflow: hidden;
    border: 1px solid var(--border); box-shadow: 0 20px 60px rgba(0,0,0,0.45);
  }
  .hero-image-wrap img { width: 100%; height: auto; max-height: 380px; object-fit: cover; display: block; }

  /* ===== testimonials marquee ===== */
  .testimonials-section {
    background: var(--bg); padding: 50px 0; overflow: hidden;
    border-top: 1px solid var(--border-soft); border-bottom: 1px solid var(--border-soft);
  }
  .testimonials-section h2 { color: white; text-align: center; font-size: 28px; font-weight: 800; margin-bottom: 30px; }
  .testimonials-section h2 .accent { color: var(--accent); }
  .testimonial-card {
    width: 320px; flex-shrink: 0; background: var(--panel); border: 1px solid var(--border);
    border-radius: 16px; padding: 22px;
  }
  .score-badge { display: flex; align-items: baseline; gap: 8px; margin-bottom: 10px; }
  .score-after { font-size: 26px; font-weight: 900; color: var(--accent); }
  .score-delta { font-size: 13px; color: var(--text-mute); }
  .score-range { font-size: 13px; color: var(--text-faint); }
  .testimonial-text { color: #e2e8f0; font-size: 14.5px; line-height: 1.55; margin-bottom: 14px; min-height: 80px; }
  .testimonial-name { color: var(--accent); font-weight: 700; font-size: 14px; }

  /* ===== features ===== */
  .features-section { background: var(--bg); padding: 80px 5%; }
  .section-title { color: white; text-align: center; font-size: 32px; font-weight: 800; margin-bottom: 12px; }
  .section-sub { color: var(--text-mute); text-align: center; margin-bottom: 50px; font-size: 17px; }
  .features-grid { display: grid; grid-template-columns: repeat(auto-fit,minmax(280px,1fr)); gap: 22px; max-width: 1100px; margin: 0 auto; }
  .feature-card { background: var(--panel); border: 1px solid var(--border); border-radius: 16px; padding: 26px; }
  .feature-num {
    width: 38px; height: 38px; border-radius: 10px; background: rgba(245,158,11,0.15); color: var(--accent);
    display: flex; align-items: center; justify-content: center; font-weight: 800; margin-bottom: 14px;
  }
  .feature-card h3 { color: white; font-size: 18px; font-weight: 700; margin: 0 0 8px; }
  .feature-card p { color: var(--text-mute); font-size: 14.5px; line-height: 1.6; margin: 0; }

  /* ===== get involved ===== */
  .involved-section { background: var(--bg); padding: 20px 5% 80px; }
  .involved-grid { display: grid; grid-template-columns: repeat(auto-fit,minmax(300px,1fr)); gap: 24px; max-width: 820px; margin: 0 auto; }
  .involved-card { background: var(--panel); border: 1px solid var(--border); border-radius: 20px; padding: 32px; }
  .involved-card.highlight { border: 2px solid var(--accent); }
  .involved-tag { font-weight: 800; font-size: 13px; letter-spacing: 1px; margin-bottom: 10px; }
  .involved-tag.accent { color: var(--accent); }
  .involved-tag.dim { color: var(--text-mute); }
  .involved-card h3 { color: white; font-size: 24px; font-weight: 800; margin: 0 0 14px; }
  .involved-card p { color: var(--text-mute); font-size: 14.5px; margin-bottom: 22px; line-height: 1.6; }
  .involved-link-primary {
    display: block; text-align: center; background: var(--accent); color: var(--accent-dark);
    padding: 12px 0; border-radius: 999px; font-weight: 800; text-decoration: none;
  }
  .involved-link-secondary {
    display: block; text-align: center; background: transparent; color: white; border: 2px solid #374151;
    padding: 10px 0; border-radius: 999px; font-weight: 700; text-decoration: none;
  }

  /* ===== FAQ ===== */
  .faq-section { background: var(--bg); padding: 0 5% 90px; }
  .faq-list { max-width: 700px; margin: 0 auto; }
  .faq-item { border-bottom: 1px solid var(--border-soft); }
  .faq-question {
    width: 100%; background: none; border: none; color: white; text-align: left; padding: 18px 4px;
    font-size: 16px; font-weight: 700; cursor: pointer; display: flex; justify-content: space-between;
    font-family: inherit;
  }
  .faq-question .plusminus { color: var(--accent); }
  .faq-answer { color: var(--text-mute); padding: 0 4px 18px; font-size: 14.5px; line-height: 1.6; display: none; }
  .faq-answer.open { display: block; }

  /* ===== practice page ===== */
  .practice-wrap { background: var(--bg); min-height: 80vh; padding: 32px 5% 80px; }
  .practice-inner { max-width: 780px; margin: 0 auto; }
  .practice-header { display: flex; align-items: center; gap: 10px; margin-bottom: 18px; }
  .practice-header h1 { color: white; font-size: 22px; font-weight: 800; margin: 0; }
  .practice-header p { color: var(--text-faint); font-size: 12.5px; margin: 0; }

  .subject-toggle {
    display: inline-flex; background: var(--panel); border: 1px solid var(--border); border-radius: 999px;
    padding: 4px; margin-bottom: 18px;
  }
  .subject-toggle button {
    background: transparent; color: var(--text-mute); border: none; border-radius: 999px;
    padding: 8px 18px; font-size: 13.5px; font-weight: 700; cursor: pointer; font-family: inherit;
  }
  .subject-toggle button.active { background: var(--accent); color: var(--accent-dark); }

  .chip-row { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 10px; }
  .chip-row.domains { margin-bottom: 20px; }
  .chip {
    border-radius: 999px; padding: 6px 13px; font-size: 12.5px; font-weight: 700; cursor: pointer;
    background: var(--panel); color: var(--text-mute); border: 1px solid var(--border); font-family: inherit;
  }
  .chip.active-diff { color: #0b0f17; border-color: transparent; }
  .chip.active-domain { background: var(--accent); color: var(--accent-dark); border-color: var(--accent); }

  .practice-meta-row {
    display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;
    flex-wrap: wrap; gap: 8px;
  }
  .practice-meta-row span.q-of { color: var(--text-mute); font-size: 13.5px; }
  .score-pill {
    background: var(--panel); border: 1px solid var(--border); border-radius: 999px; padding: 5px 13px;
    color: var(--accent); font-weight: 700; font-size: 12.5px;
  }

  .progress-bar { display: flex; gap: 4px; margin-bottom: 22px; }
  .progress-seg { flex: 1; height: 5px; border-radius: 4px; transition: background 0.2s ease; background: var(--border); }
  .progress-seg.done { background: var(--accent); }
  .progress-seg.current { background: #f59e0b88; }

  .question-card { background: var(--panel); border: 1px solid var(--border); border-radius: 20px; padding: 30px; }
  .question-tags { display: flex; gap: 8px; margin-bottom: 18px; flex-wrap: wrap; align-items: center; }
  .tag-num { background: var(--bg); color: var(--text-faint); border: 1px solid var(--border); border-radius: 999px; padding: 4px 10px; font-size: 11.5px; font-weight: 700; }
  .tag-diff { border-radius: 999px; padding: 5px 12px; font-size: 12px; font-weight: 700; }
  .tag-domain { background: rgba(245,158,11,0.10); color: var(--accent); border-radius: 999px; padding: 5px 12px; font-size: 12px; font-weight: 700; }

  .question-prompt { color: white; font-size: 18px; line-height: 1.6; margin-bottom: 26px; white-space: pre-line; }

  .choices { display: grid; gap: 10px; margin-bottom: 20px; }
  .choice-btn {
    text-align: left; padding: 13px 16px; border-radius: 12px; border: 1.5px solid var(--border);
    background: var(--bg); color: #e2e8f0; font-size: 15px; font-weight: 600; font-family: inherit;
  }
  .choice-btn.correct { background: rgba(16,185,129,0.12); border-color: #10b981; color: #6ee7b7; }
  .choice-btn.incorrect { background: rgba(248,113,113,0.12); border-color: #f87171; color: #fca5a5; }

  .free-response-row { display: flex; gap: 10px; margin-bottom: 20px; }
  .free-response-row input {
    flex: 1; padding: 12px 14px; border-radius: 10px; border: 1px solid #374151; background: var(--bg);
    color: white; font-size: 15px; font-family: inherit;
  }
  .free-response-row button {
    background: var(--accent); color: var(--accent-dark); border: none; border-radius: 10px;
    padding: 0 22px; font-weight: 800; cursor: pointer; font-family: inherit;
  }
  .free-response-row button:disabled { opacity: 0.5; cursor: default; }

  .explanation { background: var(--bg); border: 1px solid #f87171; border-radius: 14px; padding: 20px; margin-top: 4px; }
  .explanation.is-correct { border-color: #10b981; }
  .explanation-status { font-weight: 800; font-size: 14px; margin-bottom: 10px; color: #fca5a5; }
  .explanation-status.is-correct { color: #6ee7b7; }
  .explanation-body { color: #cbd5e1; font-size: 14px; line-height: 1.6; margin-bottom: 14px; }
  .explanation-label { color: var(--text-mute); font-size: 12px; font-weight: 700; margin-bottom: 8px; }
  .desmos-lines { display: flex; flex-direction: column; gap: 6px; }
  .desmos-line {
    background: #111827; color: var(--accent); padding: 8px 12px; border-radius: 8px; font-size: 13.5px;
    font-family: monospace;
  }
  .strategy-box { background: #111827; color: var(--accent); padding: 10px 12px; border-radius: 8px; font-size: 13.5px; margin: 0; }

  .question-footer { display: flex; justify-content: flex-end; margin-top: 24px; }
  .next-btn {
    background: var(--border); color: var(--text-faint); border: none; border-radius: 999px;
    padding: 11px 26px; font-weight: 800; cursor: not-allowed; font-family: inherit;
  }
  .next-btn.ready { background: var(--accent); color: var(--accent-dark); cursor: pointer; }

  .practice-footnote { color: var(--text-faint); font-size: 13px; text-align: center; margin-top: 24px; }
  .practice-footnote strong { color: var(--text-mute); }

  .no-questions { background: var(--bg); min-height: 60vh; padding: 60px 5%; display: flex; flex-direction: column; align-items: center; }
  .no-questions p { color: var(--text-mute); }

  /* ===== results screen ===== */
  .results-wrap { background: var(--bg); min-height: 80vh; padding: 60px 5%; display: flex; justify-content: center; }
  .results-inner { max-width: 540px; width: 100%; text-align: center; }
  .results-emoji { font-size: 46px; margin-bottom: 10px; }
  .results-inner h1 { color: white; font-size: 28px; font-weight: 800; margin-bottom: 8px; }
  .results-inner p.score-line { color: var(--text-mute); margin-bottom: 30px; }
  .results-inner p.score-line strong { color: var(--accent); }
  .results-summary { background: var(--panel); border: 1px solid var(--border); border-radius: 18px; padding: 26px; text-align: left; margin-bottom: 26px; }
  .results-summary p.headline { color: white; font-weight: 700; margin-bottom: 10px; }
  .results-summary p.detail { color: var(--text-mute); font-size: 14px; line-height: 1.6; margin: 0; }
  .results-actions { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }
  .btn-outline-accent {
    background: transparent; color: var(--accent); border: 2px solid var(--accent); border-radius: 999px;
    padding: 12px 24px; font-weight: 700; cursor: pointer; font-family: inherit;
  }
  .btn-outline {
    background: transparent; color: white; border: 2px solid #374151; border-radius: 999px;
    padding: 12px 24px; font-weight: 700; cursor: pointer; font-family: inherit;
  }
  .btn-solid {
    background: var(--accent); color: var(--accent-dark); border: none; border-radius: 999px;
    padding: 12px 24px; font-weight: 800; cursor: pointer; font-family: inherit;
  }

  /* ===== mission page ===== */
  .mission-hero { padding: 80px 5% 50px; text-align: center; }
  .mission-hero h1 { color: white; font-size: clamp(2rem,5vw,3rem); font-weight: 900; margin: 0; }
  .mission-intro { padding: 0 5% 60px; max-width: 1100px; margin: 0 auto; }
  .mission-intro > p.lede { color: var(--text-dim); font-size: 18px; line-height: 1.8; max-width: 700px; margin: 0 auto 36px; text-align: center; }
  .mission-intro > p.lede strong { color: var(--accent); }
  .mission-image-wrap { max-width: 760px; margin: 0 auto 50px; border-radius: 18px; overflow: hidden; border: 1px solid var(--border); }
  .mission-image-wrap img { width: 100%; height: auto; max-height: 320px; object-fit: cover; display: block; }
  .mission-cards-grid { display: grid; grid-template-columns: repeat(auto-fit,minmax(280px,1fr)); gap: 22px; }
  .mission-card { background: var(--panel); border: 1px solid var(--border); border-radius: 18px; padding: 28px; }
  .mission-card .emoji { font-size: 30px; margin-bottom: 12px; }
  .mission-card h3 { color: white; font-size: 18px; font-weight: 700; margin: 0 0 10px; }
  .mission-card p { color: var(--text-mute); font-size: 14.5px; line-height: 1.6; margin: 0; }

  .founders-section { background: #111827; padding: 70px 5%; }
  .founders-section h2 { color: white; text-align: center; font-size: 28px; font-weight: 800; margin-bottom: 40px; }
  .founders-grid { display: grid; grid-template-columns: repeat(auto-fit,minmax(260px,1fr)); gap: 30px; max-width: 700px; margin: 0 auto 40px; }
  .founder { text-align: center; }
  .founder-avatar {
    width: 140px; height: 140px; border-radius: 50%; margin: 0 auto 16px; background: var(--bg);
    border: 3px solid var(--accent); display: flex; align-items: center; justify-content: center;
    color: white; font-size: 36px; font-weight: 800;
  }
  .founder-name { color: white; font-size: 20px; font-weight: 800; margin: 0; }
  .founder-score { color: var(--accent); font-weight: 700; font-size: 14px; margin: 4px 0; }
  .founder-placeholder { color: var(--text-faint); font-size: 12px; margin: 0; }
  .founders-letter { max-width: 700px; margin: 0 auto; color: var(--text-dim); font-size: 15.5px; line-height: 1.8; }
  .founders-letter p { margin: 0 0 16px; }
  .founders-letter p.signoff { text-align: center; margin-top: 30px; }

  /* ===== guide page ===== */
  .guide-hero { padding: 80px 5% 40px; text-align: center; }
  .guide-hero h1 { color: white; font-size: clamp(2rem,5vw,3rem); font-weight: 900; margin: 0 0 14px; }
  .guide-hero p { color: var(--text-mute); font-size: 17px; margin: 0; }
  .guide-image-wrap { max-width: 800px; margin: 0 auto 10px; padding: 0 5%; }
  .guide-image-inner { border-radius: 18px; overflow: hidden; border: 1px solid var(--border); }
  .guide-image-inner img { width: 100%; height: auto; max-height: 300px; object-fit: cover; display: block; }
  .guide-section { padding: 30px 5% 60px; max-width: 1000px; margin: 0 auto; }
  .guide-resources-grid { display: grid; grid-template-columns: repeat(auto-fit,minmax(300px,1fr)); gap: 22px; margin-bottom: 50px; }
  .guide-card { background: var(--panel); border: 1px solid var(--border); border-radius: 18px; padding: 26px; }
  .guide-pill { border-radius: 999px; padding: 4px 12px; font-size: 12px; font-weight: 800; }
  .guide-pill.free { background: #10b98122; color: #34d399; }
  .guide-pill.paid { background: #f59e0b22; color: var(--accent); }
  .guide-card h3 { color: white; font-size: 18px; font-weight: 800; margin: 14px 0 6px; }
  .guide-card p { color: var(--text-mute); font-size: 14px; line-height: 1.6; margin: 0; }

  .guide-plan-title { color: white; font-size: 26px; font-weight: 800; margin-bottom: 24px; text-align: center; }
  .guide-steps { display: flex; flex-direction: column; gap: 16px; }
  .guide-step { background: var(--panel); border: 1px solid var(--border); border-radius: 16px; padding: 22px; display: flex; gap: 18px; }
  .guide-step-num {
    width: 34px; height: 34px; border-radius: 50%; background: var(--accent); color: var(--accent-dark);
    font-weight: 800; display: flex; align-items: center; justify-content: center; flex-shrink: 0;
  }
  .guide-step h4 { color: white; font-size: 16px; font-weight: 700; margin: 0 0 6px; }
  .guide-step p { color: var(--text-mute); font-size: 14px; line-height: 1.6; margin: 0; }

  .vocab-note { background: #1f2937; border: 1px solid var(--accent); border-radius: 16px; padding: 22px; margin-top: 28px; }
  .vocab-note p.label { color: var(--accent); font-weight: 800; font-size: 13px; margin-bottom: 8px; }
  .vocab-note p.body { color: #e2e8f0; font-size: 14px; line-height: 1.6; margin: 0; }

  .strategy-cards-grid { display: grid; grid-template-columns: repeat(auto-fit,minmax(300px,1fr)); gap: 22px; margin-top: 28px; }
  .strategy-card { background: var(--panel); border: 1px solid var(--border); border-radius: 16px; padding: 26px; }
  .strategy-pill { background: #f59e0b22; color: var(--accent); display: inline-block; border-radius: 999px; padding: 4px 12px; font-size: 12px; font-weight: 800; margin-bottom: 12px; }
  .strategy-card h3 { color: white; font-size: 18px; font-weight: 800; margin: 0 0 10px; }
  .strategy-card p { color: var(--text-mute); font-size: 14px; line-height: 1.7; margin: 0; }
  .guide-cta-row { text-align: center; margin-top: 24px; }
</style>
</head>
<body>

<nav class="nav" id="nav">
  <button class="nav-brand" data-page="home">
    <svg width="36" height="36" viewBox="0 0 64 64" style="flex-shrink:0">
      <circle cx="32" cy="32" r="31" fill="#111827" stroke="#f59e0b" stroke-width="2" />
      <path d="M18 20 L24 30 L20 30 Z" fill="white" />
      <path d="M46 20 L40 30 L44 30 Z" fill="white" />
      <ellipse cx="32" cy="36" rx="15" ry="13" fill="white" />
      <circle cx="26" cy="33" r="2.4" fill="#111827" />
      <circle cx="38" cy="33" r="2.4" fill="#111827" />
      <path d="M30 40 Q32 42 34 40" stroke="#111827" stroke-width="1.6" fill="none" stroke-linecap="round" />
      <line x1="14" y1="37" x2="22" y2="36" stroke="#111827" stroke-width="1.2" />
      <line x1="14" y1="40" x2="22" y2="40" stroke="#111827" stroke-width="1.2" />
      <line x1="50" y1="37" x2="42" y2="36" stroke="#111827" stroke-width="1.2" />
      <line x1="50" y1="40" x2="42" y2="40" stroke="#111827" stroke-width="1.2" />
    </svg>
    <span>Mass Tutoring</span>
  </button>
  <div class="nav-links">
    <button class="nav-link mt-btn" data-page="home">Home</button>
    <button class="nav-link mt-btn" data-page="mission">Mission</button>
    <button class="nav-link mt-btn" data-page="guide">Guide</button>
    <button class="nav-cta mt-btn" data-page="practice">Get Started</button>
  </div>
</nav>

<main id="page-root">

<!-- ===== HOME PAGE ===== -->
<div id="page-home" class="page active">

  <!-- HERO with LiquidEther background -->
  <section class="hero" id="hero-section">
    <!-- WebGL fluid mount point -->
    <div id="liquid-ether-mount"></div>

    <!-- Hero content -->
    <div class="hero-content">
      <div class="visitor-badge" style="margin-bottom:22px; display:inline-flex;">
        <span class="visitor-dot"></span>
        <span class="label">Free for every student — always.</span>
      </div>
      <div class="hero-badge">🎓 Built by students, for students</div>
      <h1>Ace the SAT.<br>Pay nothing.</h1>
      <p class="lede">AI-powered practice questions, expert strategies, and a community of tutors — completely free, forever.</p>
      <div class="hero-actions">
        <button class="btn-primary mt-btn" data-page="practice">Start Practicing Free</button>
        <button class="btn-secondary mt-btn" data-page="guide">Study Guide →</button>
      </div>
    </div>
  </section>

  <!-- Testimonials -->
  <section class="testimonials-section">
    <h2>Students who <span class="accent">actually improved</span></h2>
    <div style="overflow:hidden; padding: 0 20px;">
      <div class="mt-marquee" id="marquee-inner">
        <!-- Cards injected by JS -->
      </div>
    </div>
  </section>

  <!-- Features -->
  <section class="features-section">
    <h2 class="section-title">Everything you need. Nothing you don't.</h2>
    <p class="section-sub">No paywalls, no ads, no nonsense — just tools that work.</p>
    <div class="features-grid">
      <div class="feature-card mt-card-hover">
        <div class="feature-num">1</div>
        <h3>Adaptive Practice</h3>
        <p>Questions that adapt to your level across every SAT domain — math, reading, and writing.</p>
      </div>
      <div class="feature-card mt-card-hover">
        <div class="feature-num">2</div>
        <h3>Instant Explanations</h3>
        <p>Every question comes with a detailed breakdown, strategy tip, and Desmos walkthrough.</p>
      </div>
      <div class="feature-card mt-card-hover">
        <div class="feature-num">3</div>
        <h3>Score Tracking</h3>
        <p>See your progress by domain and difficulty. Know exactly where to focus next.</p>
      </div>
      <div class="feature-card mt-card-hover">
        <div class="feature-num">4</div>
        <h3>Study Guide</h3>
        <p>Curated resources, a week-by-week prep plan, and pro strategies from perfect scorers.</p>
      </div>
    </div>
  </section>

  <!-- Get involved -->
  <section class="involved-section">
    <h2 class="section-title">Get Involved</h2>
    <p class="section-sub">Whether you're studying or want to give back, there's a place for you.</p>
    <div class="involved-grid">
      <div class="involved-card highlight">
        <p class="involved-tag accent">STUDENT</p>
        <h3>Start Practicing</h3>
        <p>Thousands of real SAT-style questions across every section and difficulty level — completely free.</p>
        <button class="involved-link-primary mt-btn" data-page="practice">Practice Now →</button>
      </div>
      <div class="involved-card">
        <p class="involved-tag dim">VOLUNTEER</p>
        <h3>Become a Tutor</h3>
        <p>Help other students by writing questions, reviewing explanations, or hosting live sessions.</p>
        <a href="#" class="involved-link-secondary">Apply to Tutor →</a>
      </div>
    </div>
  </section>

  <!-- FAQ -->
  <section class="faq-section">
    <h2 class="section-title">Frequently asked</h2>
    <div class="faq-list" id="faq-list">
      <!-- Injected by JS -->
    </div>
  </section>

</div><!-- /home -->

<!-- ===== MISSION PAGE ===== -->
<div id="page-mission" class="page">
  <div class="mission-hero">
    <div class="hero-badge" style="display:inline-block; margin-bottom:18px;">Our Mission</div>
    <h1>Equal access to<br>every student.</h1>
  </div>
  <div class="mission-intro">
    <p class="lede">The SAT shouldn't be a test of your parents' income. <strong>We're changing that.</strong></p>
    <div class="mission-cards-grid">
      <div class="mission-card">
        <div class="emoji">📚</div>
        <h3>Why it matters</h3>
        <p>Private SAT tutoring can cost $150–$300/hour. Students without access score hundreds of points lower on average — not because they're less capable, but because they never had the tools.</p>
      </div>
      <div class="mission-card">
        <div class="emoji">🤝</div>
        <h3>How we help</h3>
        <p>We provide the same quality of adaptive practice, expert strategies, and personalized feedback that elite tutoring services charge thousands for — at zero cost, forever.</p>
      </div>
      <div class="mission-card">
        <div class="emoji">🌎</div>
        <h3>Who we serve</h3>
        <p>Any student preparing for the SAT. We especially focus on reaching students in under-resourced schools who have the most to gain from free, high-quality prep.</p>
      </div>
    </div>
  </div>
  <section class="founders-section">
    <h2>Built by students who've been there</h2>
    <div class="founders-letter">
      <p>We started Mass Tutoring after realizing our classmates at well-funded schools had access to expensive prep courses and private tutors, while students a few miles away had nothing. That felt wrong.</p>
      <p>We scored well on our own SATs — not because we were smarter, but because we had access to resources most students don't. So we decided to build what we wish everyone had.</p>
      <p>Every question, every explanation, every strategy on this site is designed by students who took the actual test — and who believe the only thing that should determine your score is how hard you work.</p>
      <p class="signoff">— The Mass Tutoring Team</p>
    </div>
  </section>
</div>

<!-- ===== GUIDE PAGE ===== -->
<div id="page-guide" class="page">
  <div class="guide-hero">
    <div class="hero-badge" style="display:inline-block; margin-bottom:14px;">Free Study Guide</div>
    <h1>Your complete SAT prep roadmap</h1>
    <p>Everything you need, in order. No fluff.</p>
  </div>
  <div class="guide-section">
    <h2 class="guide-plan-title">The 8-Week Plan</h2>
    <div class="guide-steps">
      <div class="guide-step">
        <div class="guide-step-num">1</div>
        <div>
          <h4>Take a diagnostic</h4>
          <p>Start with a full practice test so you know your baseline and where to focus. Use College Board's free tests.</p>
        </div>
      </div>
      <div class="guide-step">
        <div class="guide-step-num">2</div>
        <div>
          <h4>Target your weakest domains</h4>
          <p>Focus the first three weeks on your two lowest-scoring areas. Use our practice filter to drill those domains.</p>
        </div>
      </div>
      <div class="guide-step">
        <div class="guide-step-num">3</div>
        <div>
          <h4>Practice daily — even 20 minutes helps</h4>
          <p>Consistency beats intensity. Do 5–10 questions a day and review every explanation, especially for questions you got right by guessing.</p>
        </div>
      </div>
      <div class="guide-step">
        <div class="guide-step-num">4</div>
        <div>
          <h4>Take another full practice test</h4>
          <p>At week 5, retake a practice test. Track which domains improved and which still need work.</p>
        </div>
      </div>
      <div class="guide-step">
        <div class="guide-step-num">5</div>
        <div>
          <h4>Final week: timing and strategy</h4>
          <p>Stop drilling new content. Focus on test-taking strategies, pacing, and reviewing your personal error patterns.</p>
        </div>
      </div>
    </div>

    <div class="vocab-note" style="margin-top: 36px;">
      <p class="label">📖 VOCAB TIP</p>
      <p class="body">The digital SAT has fewer vocabulary-in-context questions than the old paper test, but they still appear. Focus on understanding how words function in context rather than memorizing long word lists.</p>
    </div>

    <h2 class="guide-plan-title" style="margin-top:50px;">Best Free Resources</h2>
    <div class="guide-resources-grid">
      <div class="guide-card">
        <span class="guide-pill free">FREE</span>
        <h3>Khan Academy SAT</h3>
        <p>Official College Board partnership. Full-length tests, personalized practice, and video lessons.</p>
      </div>
      <div class="guide-card">
        <span class="guide-pill free">FREE</span>
        <h3>College Board Bluebook</h3>
        <p>The official digital SAT app. Take real adaptive practice tests in the exact test environment.</p>
      </div>
      <div class="guide-card">
        <span class="guide-pill free">FREE</span>
        <h3>Mass Tutoring Practice</h3>
        <p>Our adaptive question bank — filter by domain, difficulty, and subject to target exactly what you need.</p>
      </div>
    </div>

    <h2 class="guide-plan-title">Top Strategies</h2>
    <div class="strategy-cards-grid">
      <div class="strategy-card">
        <span class="strategy-pill">MATH</span>
        <h3>Use Desmos early</h3>
        <p>The built-in graphing calculator is powerful. For any equation question, graph it first — you can often read the answer directly off the screen faster than solving algebraically.</p>
      </div>
      <div class="strategy-card">
        <span class="strategy-pill">READING</span>
        <h3>Answer must be in the passage</h3>
        <p>Every correct answer for Reading questions is directly supported by text in the passage. If you can't point to the exact sentence that proves your answer, it's probably wrong.</p>
      </div>
      <div class="strategy-card">
        <span class="strategy-pill">WRITING</span>
        <h3>Shorter is usually better</h3>
        <p>The SAT rewards concise, clear writing. When two answer choices are both grammatically correct, the shorter and more direct one is almost always right.</p>
      </div>
    </div>

    <div class="guide-cta-row">
      <button class="btn-primary mt-btn" data-page="practice" style="margin-top: 16px;">Start Practicing →</button>
    </div>
  </div>
</div>

<!-- ===== PRACTICE PAGE ===== -->
<div id="page-practice" class="page">
  <div class="practice-wrap">
    <div class="practice-inner">
      <div class="practice-header">
        <div>
          <h1>SAT Practice</h1>
          <p>Powered by Mass Tutoring</p>
        </div>
      </div>
      <div id="practice-body">
        <!-- Injected by practice JS -->
      </div>
    </div>
  </div>
</div>

</main>

<footer class="footer">
  <div class="footer-logo">
    <svg width="32" height="32" viewBox="0 0 64 64" style="flex-shrink:0">
      <circle cx="32" cy="32" r="31" fill="#111827" stroke="#f59e0b" stroke-width="2" />
      <path d="M18 20 L24 30 L20 30 Z" fill="white" />
      <path d="M46 20 L40 30 L44 30 Z" fill="white" />
      <ellipse cx="32" cy="36" rx="15" ry="13" fill="white" />
      <circle cx="26" cy="33" r="2.4" fill="#111827" />
      <circle cx="38" cy="33" r="2.4" fill="#111827" />
      <path d="M30 40 Q32 42 34 40" stroke="#111827" stroke-width="1.6" fill="none" stroke-linecap="round" />
      <line x1="14" y1="37" x2="22" y2="36" stroke="#111827" stroke-width="1.2" />
      <line x1="14" y1="40" x2="22" y2="40" stroke="#111827" stroke-width="1.2" />
      <line x1="50" y1="37" x2="42" y2="36" stroke="#111827" stroke-width="1.2" />
      <line x1="50" y1="40" x2="42" y2="40" stroke="#111827" stroke-width="1.2" />
    </svg>
  </div>
  <p class="footer-name">Mass Tutoring</p>
  <p>Free SAT tutoring, built by students, for students.</p>
</footer>

<!-- ============================================================
     LIQUID ETHER — Vanilla JS port of the React component
     ============================================================ -->
<script>
(function() {
  'use strict';

  // Wait for THREE to load
  function initLiquidEther() {
    if (typeof THREE === 'undefined') {
      setTimeout(initLiquidEther, 50);
      return;
    }

    const container = document.getElementById('liquid-ether-mount');
    if (!container) return;

    // ---- Config ----
    const CONFIG = {
      colors: ['#ae4700', '#f9a316', '#dac06f'],
      mouseForce: 20,
      cursorSize: 100,
      isViscous: true,
      viscous: 30,
      iterationsViscous: 32,
      iterationsPoisson: 32,
      dt: 0.014,
      BFECC: true,
      resolution: 0.5,
      isBounce: false,
      autoDemo: true,
      autoSpeed: 0.5,
      autoIntensity: 2.2,
      takeoverDuration: 0.25,
      autoResumeDelay: 3000,
      autoRampDuration: 0.6
    };

    // ---- Palette texture ----
    function makePaletteTexture(stops) {
      let arr = (stops && stops.length > 0)
        ? (stops.length === 1 ? [stops[0], stops[0]] : stops)
        : ['#ffffff', '#ffffff'];
      const w = arr.length;
      const data = new Uint8Array(w * 4);
      for (let i = 0; i < w; i++) {
        const c = new THREE.Color(arr[i]);
        data[i*4+0] = Math.round(c.r * 255);
        data[i*4+1] = Math.round(c.g * 255);
        data[i*4+2] = Math.round(c.b * 255);
        data[i*4+3] = 255;
      }
      const tex = new THREE.DataTexture(data, w, 1, THREE.RGBAFormat);
      tex.magFilter = THREE.LinearFilter;
      tex.minFilter = THREE.LinearFilter;
      tex.wrapS = THREE.ClampToEdgeWrapping;
      tex.wrapT = THREE.ClampToEdgeWrapping;
      tex.generateMipmaps = false;
      tex.needsUpdate = true;
      return tex;
    }

    const paletteTex = makePaletteTexture(CONFIG.colors);
    const bgVec4 = new THREE.Vector4(0, 0, 0, 0);

    // ---- Shaders ----
    const face_vert = `
      attribute vec3 position;
      uniform vec2 px;
      uniform vec2 boundarySpace;
      varying vec2 uv;
      precision highp float;
      void main(){
        vec3 pos = position;
        vec2 scale = 1.0 - boundarySpace * 2.0;
        pos.xy = pos.xy * scale;
        uv = vec2(0.5)+(pos.xy)*0.5;
        gl_Position = vec4(pos, 1.0);
      }
    `;
    const line_vert = `
      attribute vec3 position;
      uniform vec2 px;
      precision highp float;
      varying vec2 uv;
      void main(){
        vec3 pos = position;
        uv = 0.5 + pos.xy * 0.5;
        vec2 n = sign(pos.xy);
        pos.xy = abs(pos.xy) - px * 1.0;
        pos.xy *= n;
        gl_Position = vec4(pos, 1.0);
      }
    `;
    const mouse_vert = `
      precision highp float;
      attribute vec3 position;
      attribute vec2 uv;
      uniform vec2 center;
      uniform vec2 scale;
      uniform vec2 px;
      varying vec2 vUv;
      void main(){
        vec2 pos = position.xy * scale * 2.0 * px + center;
        vUv = uv;
        gl_Position = vec4(pos, 0.0, 1.0);
      }
    `;
    const advection_frag = `
      precision highp float;
      uniform sampler2D velocity;
      uniform float dt;
      uniform bool isBFECC;
      uniform vec2 fboSize;
      uniform vec2 px;
      varying vec2 uv;
      void main(){
        vec2 ratio = max(fboSize.x, fboSize.y) / fboSize;
        if(isBFECC == false){
          vec2 vel = texture2D(velocity, uv).xy;
          vec2 uv2 = uv - vel * dt * ratio;
          vec2 newVel = texture2D(velocity, uv2).xy;
          gl_FragColor = vec4(newVel, 0.0, 0.0);
        } else {
          vec2 spot_new = uv;
          vec2 vel_old = texture2D(velocity, uv).xy;
          vec2 spot_old = spot_new - vel_old * dt * ratio;
          vec2 vel_new1 = texture2D(velocity, spot_old).xy;
          vec2 spot_new2 = spot_old + vel_new1 * dt * ratio;
          vec2 error = spot_new2 - spot_new;
          vec2 spot_new3 = spot_new - error / 2.0;
          vec2 vel_2 = texture2D(velocity, spot_new3).xy;
          vec2 spot_old2 = spot_new3 - vel_2 * dt * ratio;
          vec2 newVel2 = texture2D(velocity, spot_old2).xy;
          gl_FragColor = vec4(newVel2, 0.0, 0.0);
        }
      }
    `;
    const color_frag = `
      precision highp float;
      uniform sampler2D velocity;
      uniform sampler2D palette;
      uniform vec4 bgColor;
      varying vec2 uv;
      void main(){
        vec2 vel = texture2D(velocity, uv).xy;
        float lenv = clamp(length(vel), 0.0, 1.0);
        vec3 c = texture2D(palette, vec2(lenv, 0.5)).rgb;
        vec3 outRGB = mix(bgColor.rgb, c, lenv);
        float outA = mix(bgColor.a, 1.0, lenv);
        gl_FragColor = vec4(outRGB, outA);
      }
    `;
    const divergence_frag = `
      precision highp float;
      uniform sampler2D velocity;
      uniform float dt;
      uniform vec2 px;
      varying vec2 uv;
      void main(){
        float x0 = texture2D(velocity, uv-vec2(px.x, 0.0)).x;
        float x1 = texture2D(velocity, uv+vec2(px.x, 0.0)).x;
        float y0 = texture2D(velocity, uv-vec2(0.0, px.y)).y;
        float y1 = texture2D(velocity, uv+vec2(0.0, px.y)).y;
        float divergence = (x1 - x0 + y1 - y0) / 2.0;
        gl_FragColor = vec4(divergence / dt);
      }
    `;
    const externalForce_frag = `
      precision highp float;
      uniform vec2 force;
      uniform vec2 center;
      uniform vec2 scale;
      uniform vec2 px;
      varying vec2 vUv;
      void main(){
        vec2 circle = (vUv - 0.5) * 2.0;
        float d = 1.0 - min(length(circle), 1.0);
        d *= d;
        gl_FragColor = vec4(force * d, 0.0, 1.0);
      }
    `;
    const poisson_frag = `
      precision highp float;
      uniform sampler2D pressure;
      uniform sampler2D divergence;
      uniform vec2 px;
      varying vec2 uv;
      void main(){
        float p0 = texture2D(pressure, uv + vec2(px.x * 2.0, 0.0)).r;
        float p1 = texture2D(pressure, uv - vec2(px.x * 2.0, 0.0)).r;
        float p2 = texture2D(pressure, uv + vec2(0.0, px.y * 2.0)).r;
        float p3 = texture2D(pressure, uv - vec2(0.0, px.y * 2.0)).r;
        float div = texture2D(divergence, uv).r;
        float newP = (p0 + p1 + p2 + p3) / 4.0 - div;
        gl_FragColor = vec4(newP);
      }
    `;
    const pressure_frag = `
      precision highp float;
      uniform sampler2D pressure;
      uniform sampler2D velocity;
      uniform vec2 px;
      uniform float dt;
      varying vec2 uv;
      void main(){
        float step = 1.0;
        float p0 = texture2D(pressure, uv + vec2(px.x * step, 0.0)).r;
        float p1 = texture2D(pressure, uv - vec2(px.x * step, 0.0)).r;
        float p2 = texture2D(pressure, uv + vec2(0.0, px.y * step)).r;
        float p3 = texture2D(pressure, uv - vec2(0.0, px.y * step)).r;
        vec2 v = texture2D(velocity, uv).xy;
        vec2 gradP = vec2(p0 - p1, p2 - p3) * 0.5;
        v = v - gradP * dt;
        gl_FragColor = vec4(v, 0.0, 1.0);
      }
    `;
    const viscous_frag = `
      precision highp float;
      uniform sampler2D velocity;
      uniform sampler2D velocity_new;
      uniform float v;
      uniform vec2 px;
      uniform float dt;
      varying vec2 uv;
      void main(){
        vec2 old = texture2D(velocity, uv).xy;
        vec2 new0 = texture2D(velocity_new, uv + vec2(px.x * 2.0, 0.0)).xy;
        vec2 new1 = texture2D(velocity_new, uv - vec2(px.x * 2.0, 0.0)).xy;
        vec2 new2 = texture2D(velocity_new, uv + vec2(0.0, px.y * 2.0)).xy;
        vec2 new3 = texture2D(velocity_new, uv - vec2(0.0, px.y * 2.0)).xy;
        vec2 newv = 4.0 * old + v * dt * (new0 + new1 + new2 + new3);
        newv /= 4.0 * (1.0 + v * dt);
        gl_FragColor = vec4(newv, 0.0, 0.0);
      }
    `;

    // ---- Common ----
    const Common = {
      width: 0, height: 0, aspect: 1,
      pixelRatio: Math.min(window.devicePixelRatio || 1, 2),
      renderer: null, clock: null, time: 0, delta: 0, container: null,
      init(cont) {
        this.container = cont;
        this.resize();
        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        this.renderer.autoClear = false;
        this.renderer.setClearColor(new THREE.Color(0x000000), 0);
        this.renderer.setPixelRatio(this.pixelRatio);
        this.renderer.setSize(this.width, this.height);
        this.renderer.domElement.style.position = 'absolute';
        this.renderer.domElement.style.inset = '0';
        this.renderer.domElement.style.width = '100%';
        this.renderer.domElement.style.height = '100%';
        this.renderer.domElement.style.display = 'block';
        this.clock = new THREE.Clock();
        this.clock.start();
      },
      resize() {
        if (!this.container) return;
        const rect = this.container.getBoundingClientRect();
        this.width = Math.max(1, Math.floor(rect.width));
        this.height = Math.max(1, Math.floor(rect.height));
        this.aspect = this.width / this.height;
        if (this.renderer) this.renderer.setSize(this.width, this.height, false);
      },
      update() {
        this.delta = this.clock.getDelta();
        this.time += this.delta;
      }
    };

    // ---- Mouse ----
    const Mouse = {
      mouseMoved: false,
      coords: new THREE.Vector2(),
      coords_old: new THREE.Vector2(),
      diff: new THREE.Vector2(),
      timer: null,
      container: null,
      isHoverInside: false,
      hasUserControl: false,
      isAutoActive: false,
      autoIntensity: 2.2,
      takeoverActive: false,
      takeoverStartTime: 0,
      takeoverDuration: 0.25,
      takeoverFrom: new THREE.Vector2(),
      takeoverTo: new THREE.Vector2(),
      onInteract: null,

      init(cont) {
        this.container = cont;
        this._onMouseMove = this.onMouseMove.bind(this);
        this._onTouchStart = this.onTouchStart.bind(this);
        this._onTouchMove = this.onTouchMove.bind(this);
        this._onTouchEnd = this.onTouchEnd.bind(this);
        window.addEventListener('mousemove', this._onMouseMove);
        window.addEventListener('touchstart', this._onTouchStart, { passive: true });
        window.addEventListener('touchmove', this._onTouchMove, { passive: true });
        window.addEventListener('touchend', this._onTouchEnd);
      },
      dispose() {
        window.removeEventListener('mousemove', this._onMouseMove);
        window.removeEventListener('touchstart', this._onTouchStart);
        window.removeEventListener('touchmove', this._onTouchMove);
        window.removeEventListener('touchend', this._onTouchEnd);
      },
      isPointInside(x, y) {
        if (!this.container) return false;
        const rect = this.container.getBoundingClientRect();
        return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
      },
      setCoords(x, y) {
        if (!this.container) return;
        if (this.timer) clearTimeout(this.timer);
        const rect = this.container.getBoundingClientRect();
        if (!rect.width || !rect.height) return;
        const nx = (x - rect.left) / rect.width;
        const ny = (y - rect.top) / rect.height;
        this.coords.set(nx * 2 - 1, -(ny * 2 - 1));
        this.mouseMoved = true;
        this.timer = setTimeout(() => { this.mouseMoved = false; }, 100);
      },
      setNormalized(nx, ny) {
        this.coords.set(nx, ny);
        this.mouseMoved = true;
      },
      onMouseMove(e) {
        if (!this.isPointInside(e.clientX, e.clientY)) {
          this.isHoverInside = false;
          return;
        }
        this.isHoverInside = true;
        if (this.onInteract) this.onInteract();
        if (this.isAutoActive && !this.hasUserControl && !this.takeoverActive) {
          const rect = this.container.getBoundingClientRect();
          const nx = (e.clientX - rect.left) / rect.width;
          const ny = (e.clientY - rect.top) / rect.height;
          this.takeoverFrom.copy(this.coords);
          this.takeoverTo.set(nx * 2 - 1, -(ny * 2 - 1));
          this.takeoverStartTime = performance.now();
          this.takeoverActive = true;
          this.hasUserControl = true;
          this.isAutoActive = false;
          return;
        }
        this.setCoords(e.clientX, e.clientY);
        this.hasUserControl = true;
      },
      onTouchStart(e) {
        if (e.touches.length !== 1) return;
        const t = e.touches[0];
        if (!this.isPointInside(t.clientX, t.clientY)) return;
        this.isHoverInside = true;
        if (this.onInteract) this.onInteract();
        this.setCoords(t.clientX, t.clientY);
        this.hasUserControl = true;
      },
      onTouchMove(e) {
        if (e.touches.length !== 1) return;
        const t = e.touches[0];
        if (!this.isPointInside(t.clientX, t.clientY)) return;
        if (this.onInteract) this.onInteract();
        this.setCoords(t.clientX, t.clientY);
      },
      onTouchEnd() { this.isHoverInside = false; },
      update() {
        if (this.takeoverActive) {
          const t = (performance.now() - this.takeoverStartTime) / (this.takeoverDuration * 1000);
          if (t >= 1) {
            this.takeoverActive = false;
            this.coords.copy(this.takeoverTo);
            this.coords_old.copy(this.coords);
            this.diff.set(0, 0);
          } else {
            const k = t * t * (3 - 2 * t);
            this.coords.copy(this.takeoverFrom).lerp(this.takeoverTo, k);
          }
        }
        this.diff.subVectors(this.coords, this.coords_old);
        this.coords_old.copy(this.coords);
        if (this.coords_old.x === 0 && this.coords_old.y === 0) this.diff.set(0, 0);
        if (this.isAutoActive && !this.takeoverActive) this.diff.multiplyScalar(this.autoIntensity);
      }
    };

    // ---- AutoDriver ----
    class AutoDriver {
      constructor(mouse, manager, opts) {
        this.mouse = mouse;
        this.manager = manager;
        this.enabled = opts.enabled;
        this.speed = opts.speed;
        this.resumeDelay = opts.resumeDelay || 3000;
        this.rampDurationMs = (opts.rampDuration || 0) * 1000;
        this.active = false;
        this.current = new THREE.Vector2(0, 0);
        this.target = new THREE.Vector2();
        this.lastTime = performance.now();
        this.activationTime = 0;
        this.margin = 0.2;
        this._tmpDir = new THREE.Vector2();
        this.pickNewTarget();
      }
      pickNewTarget() {
        const r = Math.random;
        this.target.set((r() * 2 - 1) * (1 - this.margin), (r() * 2 - 1) * (1 - this.margin));
      }
      forceStop() {
        this.active = false;
        this.mouse.isAutoActive = false;
      }
      update() {
        if (!this.enabled) return;
        const now = performance.now();
        const idle = now - this.manager.lastUserInteraction;
        if (idle < this.resumeDelay) { if (this.active) this.forceStop(); return; }
        if (this.mouse.isHoverInside) { if (this.active) this.forceStop(); return; }
        if (!this.active) {
          this.active = true;
          this.current.copy(this.mouse.coords);
          this.lastTime = now;
          this.activationTime = now;
        }
        this.mouse.isAutoActive = true;
        let dtSec = (now - this.lastTime) / 1000;
        this.lastTime = now;
        if (dtSec > 0.2) dtSec = 0.016;
        const dir = this._tmpDir.subVectors(this.target, this.current);
        const dist = dir.length();
        if (dist < 0.01) { this.pickNewTarget(); return; }
        dir.normalize();
        let ramp = 1;
        if (this.rampDurationMs > 0) {
          const t = Math.min(1, (now - this.activationTime) / this.rampDurationMs);
          ramp = t * t * (3 - 2 * t);
        }
        const step = this.speed * dtSec * ramp;
        this.current.addScaledVector(dir, Math.min(step, dist));
        this.mouse.setNormalized(this.current.x, this.current.y);
      }
    }

    // ---- ShaderPass base ----
    class ShaderPass {
      constructor(props) {
        this.props = props || {};
        this.uniforms = this.props.material && this.props.material.uniforms;
        this.scene = null; this.camera = null; this.material = null;
      }
      init() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.Camera();
        if (this.uniforms) {
          this.material = new THREE.RawShaderMaterial(this.props.material);
          const geo = new THREE.PlaneGeometry(2, 2);
          this.scene.add(new THREE.Mesh(geo, this.material));
        }
      }
      update() {
        Common.renderer.setRenderTarget(this.props.output || null);
        Common.renderer.render(this.scene, this.camera);
        Common.renderer.setRenderTarget(null);
      }
    }

    // ---- Advection ----
    class Advection extends ShaderPass {
      constructor(simProps) {
        super({
          material: {
            vertexShader: face_vert,
            fragmentShader: advection_frag,
            uniforms: {
              boundarySpace: { value: simProps.cellScale },
              px: { value: simProps.cellScale },
              fboSize: { value: simProps.fboSize },
              velocity: { value: simProps.src.texture },
              dt: { value: simProps.dt },
              isBFECC: { value: true }
            }
          },
          output: simProps.dst
        });
        this.uniforms = this.props.material.uniforms;
        this.init();
        // boundary
        const geo = new THREE.BufferGeometry();
        const verts = new Float32Array([-1,-1,0,-1,1,0,-1,1,0,1,1,0,1,1,0,1,-1,0,1,-1,0,-1,-1,0]);
        geo.setAttribute('position', new THREE.BufferAttribute(verts, 3));
        const mat = new THREE.RawShaderMaterial({ vertexShader: line_vert, fragmentShader: advection_frag, uniforms: this.uniforms });
        this.line = new THREE.LineSegments(geo, mat);
        this.scene.add(this.line);
      }
      update({ dt, isBounce, BFECC }) {
        this.uniforms.dt.value = dt;
        this.line.visible = isBounce;
        this.uniforms.isBFECC.value = BFECC;
        super.update();
      }
    }

    // ---- ExternalForce ----
    class ExternalForce extends ShaderPass {
      constructor(simProps) {
        super({ output: simProps.dst });
        this.init();
        const geo = new THREE.PlaneGeometry(1, 1);
        const mat = new THREE.RawShaderMaterial({
          vertexShader: mouse_vert,
          fragmentShader: externalForce_frag,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
          uniforms: {
            px: { value: simProps.cellScale },
            force: { value: new THREE.Vector2() },
            center: { value: new THREE.Vector2() },
            scale: { value: new THREE.Vector2(simProps.cursor_size, simProps.cursor_size) }
          }
        });
        this.mouse = new THREE.Mesh(geo, mat);
        this.scene.add(this.mouse);
        this._uniforms = mat.uniforms;
      }
      update(props) {
        const u = this._uniforms;
        const fx = (Mouse.diff.x / 2) * props.mouse_force;
        const fy = (Mouse.diff.y / 2) * props.mouse_force;
        const csX = props.cursor_size * props.cellScale.x;
        const csY = props.cursor_size * props.cellScale.y;
        const cx = Math.min(Math.max(Mouse.coords.x, -1 + csX + props.cellScale.x * 2), 1 - csX - props.cellScale.x * 2);
        const cy = Math.min(Math.max(Mouse.coords.y, -1 + csY + props.cellScale.y * 2), 1 - csY - props.cellScale.y * 2);
        u.force.value.set(fx, fy);
        u.center.value.set(cx, cy);
        u.scale.value.set(props.cursor_size, props.cursor_size);
        super.update();
      }
    }

    // ---- Viscous ----
    class Viscous extends ShaderPass {
      constructor(simProps) {
        super({
          material: {
            vertexShader: face_vert, fragmentShader: viscous_frag,
            uniforms: {
              boundarySpace: { value: simProps.boundarySpace },
              velocity: { value: simProps.src.texture },
              velocity_new: { value: simProps.dst_.texture },
              v: { value: simProps.viscous },
              px: { value: simProps.cellScale },
              dt: { value: simProps.dt }
            }
          },
          output: simProps.dst, output0: simProps.dst_, output1: simProps.dst
        });
        this.init();
      }
      update({ viscous, iterations, dt }) {
        this.uniforms.v.value = viscous;
        let fbo_out;
        for (let i = 0; i < iterations; i++) {
          const fbo_in = i % 2 === 0 ? this.props.output0 : this.props.output1;
          fbo_out = i % 2 === 0 ? this.props.output1 : this.props.output0;
          this.uniforms.velocity_new.value = fbo_in.texture;
          this.props.output = fbo_out;
          this.uniforms.dt.value = dt;
          super.update();
        }
        return fbo_out;
      }
    }

    // ---- Divergence ----
    class Divergence extends ShaderPass {
      constructor(simProps) {
        super({
          material: {
            vertexShader: face_vert, fragmentShader: divergence_frag,
            uniforms: {
              boundarySpace: { value: simProps.boundarySpace },
              velocity: { value: simProps.src.texture },
              px: { value: simProps.cellScale },
              dt: { value: simProps.dt }
            }
          },
          output: simProps.dst
        });
        this.init();
      }
      update({ vel }) { this.uniforms.velocity.value = vel.texture; super.update(); }
    }

    // ---- Poisson ----
    class Poisson extends ShaderPass {
      constructor(simProps) {
        super({
          material: {
            vertexShader: face_vert, fragmentShader: poisson_frag,
            uniforms: {
              boundarySpace: { value: simProps.boundarySpace },
              pressure: { value: simProps.dst_.texture },
              divergence: { value: simProps.src.texture },
              px: { value: simProps.cellScale }
            }
          },
          output: simProps.dst, output0: simProps.dst_, output1: simProps.dst
        });
        this.init();
      }
      update({ iterations }) {
        let p_out;
        for (let i = 0; i < iterations; i++) {
          const p_in = i % 2 === 0 ? this.props.output0 : this.props.output1;
          p_out = i % 2 === 0 ? this.props.output1 : this.props.output0;
          this.uniforms.pressure.value = p_in.texture;
          this.props.output = p_out;
          super.update();
        }
        return p_out;
      }
    }

    // ---- Pressure ----
    class Pressure extends ShaderPass {
      constructor(simProps) {
        super({
          material: {
            vertexShader: face_vert, fragmentShader: pressure_frag,
            uniforms: {
              boundarySpace: { value: simProps.boundarySpace },
              pressure: { value: simProps.src_p.texture },
              velocity: { value: simProps.src_v.texture },
              px: { value: simProps.cellScale },
              dt: { value: simProps.dt }
            }
          },
          output: simProps.dst
        });
        this.init();
      }
      update({ vel, pressure }) {
        this.uniforms.velocity.value = vel.texture;
        this.uniforms.pressure.value = pressure.texture;
        super.update();
      }
    }

    // ---- Simulation ----
    class Simulation {
      constructor(options) {
        this.options = Object.assign({
          iterations_poisson: 32, iterations_viscous: 32, mouse_force: 20, resolution: 0.5,
          cursor_size: 100, viscous: 30, isBounce: false, dt: 0.014, isViscous: false, BFECC: true
        }, options);
        this.fbos = {};
        this.fboSize = new THREE.Vector2();
        this.cellScale = new THREE.Vector2();
        this.boundarySpace = new THREE.Vector2();
        this.init();
      }
      getFloatType() {
        return /iPad|iPhone|iPod/i.test(navigator.userAgent) ? THREE.HalfFloatType : THREE.FloatType;
      }
      init() {
        this.calcSize();
        this.createFBOs();
        this.createPasses();
      }
      calcSize() {
        const w = Math.max(1, Math.round(this.options.resolution * Common.width));
        const h = Math.max(1, Math.round(this.options.resolution * Common.height));
        this.cellScale.set(1 / w, 1 / h);
        this.fboSize.set(w, h);
      }
      createFBOs() {
        const type = this.getFloatType();
        const opts = { type, depthBuffer: false, stencilBuffer: false, minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter, wrapS: THREE.ClampToEdgeWrapping, wrapT: THREE.ClampToEdgeWrapping };
        ['vel_0','vel_1','vel_viscous0','vel_viscous1','div','pressure_0','pressure_1'].forEach(k => {
          this.fbos[k] = new THREE.WebGLRenderTarget(this.fboSize.x, this.fboSize.y, opts);
        });
      }
      createPasses() {
        this.advection = new Advection({ cellScale: this.cellScale, fboSize: this.fboSize, dt: this.options.dt, src: this.fbos.vel_0, dst: this.fbos.vel_1 });
        this.externalForce = new ExternalForce({ cellScale: this.cellScale, cursor_size: this.options.cursor_size, dst: this.fbos.vel_1 });
        this.viscous = new Viscous({ cellScale: this.cellScale, boundarySpace: this.boundarySpace, viscous: this.options.viscous, src: this.fbos.vel_1, dst: this.fbos.vel_viscous1, dst_: this.fbos.vel_viscous0, dt: this.options.dt });
        this.divergence = new Divergence({ cellScale: this.cellScale, boundarySpace: this.boundarySpace, src: this.fbos.vel_viscous0, dst: this.fbos.div, dt: this.options.dt });
        this.poisson = new Poisson({ cellScale: this.cellScale, boundarySpace: this.boundarySpace, src: this.fbos.div, dst: this.fbos.pressure_1, dst_: this.fbos.pressure_0 });
        this.pressure = new Pressure({ cellScale: this.cellScale, boundarySpace: this.boundarySpace, src_p: this.fbos.pressure_0, src_v: this.fbos.vel_viscous0, dst: this.fbos.vel_0, dt: this.options.dt });
      }
      resize() {
        this.calcSize();
        Object.values(this.fbos).forEach(fbo => fbo.setSize(this.fboSize.x, this.fboSize.y));
      }
      update() {
        const bs = this.options.isBounce ? new THREE.Vector2(0,0) : this.cellScale;
        this.boundarySpace.copy(bs);
        this.advection.update({ dt: this.options.dt, isBounce: this.options.isBounce, BFECC: this.options.BFECC });
        this.externalForce.update({ cursor_size: this.options.cursor_size, mouse_force: this.options.mouse_force, cellScale: this.cellScale });
        let vel = this.fbos.vel_1;
        if (this.options.isViscous) {
          vel = this.viscous.update({ viscous: this.options.viscous, iterations: this.options.iterations_viscous, dt: this.options.dt });
        }
        this.divergence.update({ vel });
        const pressure = this.poisson.update({ iterations: this.options.iterations_poisson });
        this.pressure.update({ vel, pressure });
      }
    }

    // ---- Output ----
    class Output {
      constructor() {
        this.simulation = new Simulation({
          iterations_poisson: CONFIG.iterationsPoisson,
          iterations_viscous: CONFIG.iterationsViscous,
          mouse_force: CONFIG.mouseForce,
          resolution: CONFIG.resolution,
          cursor_size: CONFIG.cursorSize,
          viscous: CONFIG.viscous,
          isBounce: CONFIG.isBounce,
          dt: CONFIG.dt,
          isViscous: CONFIG.isViscous,
          BFECC: CONFIG.BFECC
        });
        this.scene = new THREE.Scene();
        this.camera = new THREE.Camera();
        const mat = new THREE.RawShaderMaterial({
          vertexShader: face_vert,
          fragmentShader: color_frag,
          transparent: true,
          depthWrite: false,
          uniforms: {
            velocity: { value: this.simulation.fbos.vel_0.texture },
            boundarySpace: { value: new THREE.Vector2() },
            palette: { value: paletteTex },
            bgColor: { value: bgVec4 }
          }
        });
        this.scene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), mat));
      }
      resize() { this.simulation.resize(); }
      render() {
        Common.renderer.setRenderTarget(null);
        Common.renderer.render(this.scene, this.camera);
      }
      update() {
        this.simulation.update();
        this.render();
      }
    }

    // ---- WebGLManager ----
    class WebGLManager {
      constructor(cont) {
        this.container = cont;
        this.lastUserInteraction = performance.now();
        this.running = false;
        this.rafId = null;

        Common.init(cont);
        Mouse.init(cont);
        Mouse.autoIntensity = CONFIG.autoIntensity;
        Mouse.takeoverDuration = CONFIG.takeoverDuration;
        Mouse.onInteract = () => {
          this.lastUserInteraction = performance.now();
          if (this.autoDriver) this.autoDriver.forceStop();
        };

        this.output = new Output();
        cont.appendChild(Common.renderer.domElement);

        this.autoDriver = new AutoDriver(Mouse, this, {
          enabled: CONFIG.autoDemo,
          speed: CONFIG.autoSpeed,
          resumeDelay: CONFIG.autoResumeDelay,
          rampDuration: CONFIG.autoRampDuration
        });

        this._loop = this.loop.bind(this);
        window.addEventListener('resize', () => this.resize());
        document.addEventListener('visibilitychange', () => {
          if (document.hidden) this.pause(); else this.start();
        });
      }
      resize() {
        Common.resize();
        this.output.resize();
      }
      loop() {
        if (!this.running) return;
        if (this.autoDriver) this.autoDriver.update();
        Mouse.update();
        Common.update();
        this.output.update();
        this.rafId = requestAnimationFrame(this._loop);
      }
      start() {
        if (this.running) return;
        this.running = true;
        this._loop();
      }
      pause() {
        this.running = false;
        if (this.rafId) { cancelAnimationFrame(this.rafId); this.rafId = null; }
      }
      dispose() {
        this.pause();
        Mouse.dispose();
        if (Common.renderer) {
          const c = Common.renderer.domElement;
          if (c && c.parentNode) c.parentNode.removeChild(c);
          Common.renderer.dispose();
        }
      }
    }

    // ---- Boot ----
    const mgr = new WebGLManager(container);
    mgr.start();

    // Pause when hero scrolls out of view
    const io = new IntersectionObserver(entries => {
      const v = entries[0].isIntersecting;
      if (v && !document.hidden) mgr.start(); else mgr.pause();
    }, { threshold: [0, 0.01] });
    io.observe(container);

    // Handle resize when hero section size changes (e.g. page switch)
    const ro = new ResizeObserver(() => mgr.resize());
    ro.observe(container);
  }

  // Kick off after DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLiquidEther);
  } else {
    initLiquidEther();
  }
})();
</script>

<!-- ============================================================
     PAGE ROUTER + ORIGINAL APP LOGIC
     ============================================================ -->
<script src="data.js"></script> <script src="app.js"></script>

</body>
</html>
