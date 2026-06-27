<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Mass Tutoring — Free SAT Prep</title>
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
    padding: 90px 5% 70px; text-align: center;
    /* Keep the subtle radial as a fallback; the canvas sits behind everything via z-index */
    background: radial-gradient(circle at 50% 0%, #1f2937 0%, #0b0f17 60%);
    position: relative;    /* ← needed so the absolute canvas is scoped here */
    overflow: hidden;      /* ← keeps the canvas clipped to the hero */
    isolation: isolate;    /* ← new stacking context so hero content sits above canvas */
  }
  /* All hero content must sit above the canvas (z-index: 0) */
  .hero > * { position: relative; z-index: 1; }

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

  /* ===== reduced-motion: pause the fluid ===== */
  @media (prefers-reduced-motion: reduce) {
    #hero-liquid-canvas { display: none !important; }
  }
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

<main id="page-root"></main>

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

<!--
  Load order:
  1. Three.js  (from CDN — r128 is the version the original component targets)
  2. LiquidEther vanilla port
  3. Your existing data + app files
-->
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
<script src="liquid-ether.js"></script>
<script src="data.js"></script>
<script src="app.js"></script>

<script>
// ── Wire up LiquidEther to the hero section ──────────────────────────────────
// The hero is rendered dynamically by app.js, so we watch for it with a
// MutationObserver and initialise LiquidEther once the .hero element exists.

(function () {
  let leInstance = null;

  function initHeroFluid() {
    const hero = document.querySelector(".hero");
    if (!hero || hero.dataset.leInit) return;   // already initialised
    hero.dataset.leInit = "1";

    leInstance = new LiquidEther(hero, {
      // ── palette tuned to Mass Tutoring's amber/dark-blue brand ──
      colors: ["#f59e0b", "#fbbf24", "#1f2937", "#ae7a00"],
      mouseForce: 18,
      cursorSize: 120,
      isViscous: true,
      viscous: 28,
      iterationsViscous: 28,
      iterationsPoisson: 28,
      resolution: 0.45,
      isBounce: false,
      dt: 0.014,
      BFECC: true,
      autoDemo: true,
      autoSpeed: 0.45,
      autoIntensity: 2.0,
      takeoverDuration: 0.25,
      autoResumeDelay: 1500,
      autoRampDuration: 0.8,
    });
    leInstance.start();
  }

  // Clean up the old instance whenever we navigate away from home
  function maybeDestroyFluid() {
    if (leInstance) {
      leInstance.destroy();
      leInstance = null;
    }
  }

  // Observe DOM changes so we catch when the hero is first painted
  const observer = new MutationObserver(function () {
    const hero = document.querySelector(".hero");
    if (hero && !hero.dataset.leInit) {
      initHeroFluid();
    } else if (!hero) {
      maybeDestroyFluid();
    }
  });

  document.addEventListener("DOMContentLoaded", function () {
    observer.observe(document.getElementById("page-root"), {
      childList: true,
      subtree: true,
    });
    // In case home is already the first render
    initHeroFluid();
  });
})();
</script>

</body>
</html>
