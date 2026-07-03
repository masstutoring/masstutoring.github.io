// ============================================================
// APP STATE
// ============================================================

const BASE_COUNT = 1842;
let visitorCount = BASE_COUNT;

const state = {
  page: "home",
  faqOpen: 0,
  practice: {
    subject: "Math",
    domainFilter: "All",
    diffFilter: "All",
    index: 0,
    selected: "",
    revealed: false,
    missed: [],
    score: { correct: 0, total: 0 },
    finished: false,
  },
};

function getQuestions() {
  return state.practice.subject === "Math" ? MATH_QUESTIONS : RW_QUESTIONS;
}
function getDomains() {
  return state.practice.subject === "Math" ? MATH_DOMAINS : RW_DOMAINS;
}
function getPool() {
  const { domainFilter, diffFilter } = state.practice;
  return getQuestions().filter(
    (q) => (domainFilter === "All" || q.domain === domainFilter) && (diffFilter === "All" || q.difficulty === diffFilter)
  );
}

// ============================================================
// CAT MARK SVG (reused inline)
// ============================================================

function catMarkSvg(size) {
  return `
    <svg width="${size}" height="${size}" viewBox="0 0 64 64" style="flex-shrink:0">
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
  `;
}

// ============================================================
// UTIL
// ============================================================

function esc(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function escAttr(str) {
  return esc(str);
}

// ============================================================
// ROUTER
// ============================================================

function setPage(page) {
  state.page = page;
  render();
  window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
}

function render() {
  // nav active states
  document.querySelectorAll(".nav-link").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.page === state.page);
  });

  const root = document.getElementById("page-root");
  if (state.page === "practice") {
    root.innerHTML = renderPracticePage();
    wirePracticePage();
  } else if (state.page === "mission") {
    root.innerHTML = renderMissionPage();
  } else if (state.page === "guide") {
    root.innerHTML = renderGuidePage();
    wireGuidePage();
  } else {
    root.innerHTML = renderHomePage();
    wireHomePage();
  }
}

// ============================================================
// HOME PAGE
// ============================================================

function scoreBadgeHtml(before, after) {
  return `
    <div class="score-badge">
      <span class="score-after">${after}</span>
      <span class="score-delta">+${after - before} pts</span>
      <span class="score-range">${before} &rarr; ${after}</span>
    </div>
  `;
}

function renderHomePage() {
  const loop = [...TESTIMONIALS, ...TESTIMONIALS];

  const testimonialCards = loop
    .map(
      (t) => `
      <div class="testimonial-card mt-card-hover">
        ${scoreBadgeHtml(t.before, t.after)}
        <p class="testimonial-text">&ldquo;${esc(t.text)}&rdquo;</p>
        <p class="testimonial-name">&mdash; ${esc(t.name)}</p>
      </div>
    `
    )
    .join("");

  const featureCards = FEATURES.map(
    (f, i) => `
      <div class="feature-card mt-card-hover">
        <div class="feature-num">${i + 1}</div>
        <h3>${esc(f.title)}</h3>
        <p>${esc(f.desc)}</p>
      </div>
    `
  ).join("");

  const faqItems = FAQS.map(
    (f, i) => `
      <div class="faq-item">
        <button class="faq-question mt-btn" data-faq-index="${i}">
          ${esc(f.q)}
          <span class="plusminus">${state.faqOpen === i ? "&minus;" : "+"}</span>
        </button>
        <p class="faq-answer mt-fade-in${state.faqOpen === i ? " open" : ""}">${esc(f.a)}</p>
      </div>
    `
  ).join("");

  return `
    <section class="hero">
      <div class="hero-badge">Built by high schoolers. 100% free, always.</div>
      <h1>We tutor the SAT.<br />For free.</h1>
      <p class="lede">A free, peer-to-peer SAT tutoring platform. Real tutors who scored 1530+, a full study guide, and 200 original practice questions across Math and Reading &amp; Writing &mdash; no $200/hour required.</p>
      <div style="margin-bottom:30px">
        <div class="visitor-badge">
          <span class="visitor-dot"></span>
          <span class="label"><strong id="visitor-count">${visitorCount.toLocaleString()}</strong> students helped so far</span>
        </div>
      </div>
      <div class="hero-actions">
        <button class="btn-primary mt-btn" data-page="practice">Get Started &mdash; Try a Question</button>
        <button class="btn-secondary mt-btn" data-page="guide">See the Free Guide</button>
      </div>
      <div class="hero-image-wrap">
        <img src="https://images.unsplash.com/photo-1655337690727-5224680c8c07?auto=format&fit=crop&w=1600&q=80" alt="Students studying together in a classroom" />
      </div>
    </section>

    <section class="testimonials-section">
      <h2>No tuition. No catch. <span class="accent">Just show up ready to learn.</span></h2>
      <div class="mt-marquee">${testimonialCards}</div>
    </section>

    <section class="features-section">
      <h2 class="section-title">Everything you need. None of the cost.</h2>
      <p class="section-sub">Princeton Review charges $200+/hour. Here's what you get from us for $0.</p>
      <div class="features-grid">${featureCards}</div>
    </section>

    <section class="involved-section">
      <h2 class="section-title">How to get involved</h2>
      <p class="section-sub">No tiers, no plans, no payment info. Just pick one.</p>
      <div class="involved-grid">
        <div class="involved-card highlight mt-card-hover">
          <p class="involved-tag accent">STUDENT</p>
          <h3>Get a free tutor</h3>
          <p>Get matched with a tutor who scored 1530+, on Math or Reading &amp; Writing, completely free.</p>
          <a href="https://forms.gle/twdbjZLheSdaHJa28" target="_blank" rel="noreferrer" class="involved-link-primary mt-btn">Request a Tutor</a>
        </div>
        <div class="involved-card mt-card-hover">
          <p class="involved-tag dim">TUTOR</p>
          <h3>Become a tutor</h3>
          <p>Scored 1530+? Teach what you know, build real teaching experience, and help close the access gap.</p>
          <a href="https://docs.google.com/forms/d/e/1FAIpQLSeKoQbKU6eqq6AaF3wdkfqWPHH0u3a5ggu-5eNA_uPe2h3lWg/viewform" target="_blank" rel="noreferrer" class="involved-link-secondary mt-btn">Apply to Tutor</a>
        </div>
      </div>
    </section>

    <section class="faq-section">
      <h2 class="section-title">FAQ</h2>
      <div class="faq-list">${faqItems}</div>
    </section>
  `;
}

function wireHomePage() {
  document.querySelectorAll("[data-page]").forEach((el) => {
    el.addEventListener("click", () => setPage(el.dataset.page));
  });
  document.querySelectorAll("[data-faq-index]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const i = Number(btn.dataset.faqIndex);
      state.faqOpen = state.faqOpen === i ? -1 : i;
      render();
    });
  });
}

// ============================================================
// MISSION PAGE
// ============================================================

const MISSION_CARDS = [
  { emoji: "\u{1F4B8}", title: "Test prep is expensive.", body: "The average cost of SAT tutoring is $200+/hour. Companies like Princeton Review charge upwards of $10,000 for complete prep programs." },
  { emoji: "\u2705", title: "You don't need to overpay for a good score.", body: "Our founders scored 1550 and 1560 without any paid tutoring. We built Mass Tutoring on the strategies that actually worked for us." },
  { emoji: "\u{1F4DA}", title: "Don't over-complicate studying.", body: "There's no magic strategy — just a solid study plan, consistent practice, and personalized guidance. That's what we provide, for free." },
  { emoji: "\u{1F91D}", title: "Learn from peers, not strangers.", body: "Every tutor just took the test themselves. They know what works because they recently succeeded using these exact methods." },
  { emoji: "\u{1F3AF}", title: "The SAT matters more than ever.", body: "With more universities reinstating SAT requirements, a strong score is crucial. We're here to help you reach it." },
  { emoji: "\u{1F30D}", title: "Economics shouldn't limit opportunity.", body: "There's a direct correlation between income and SAT scores — not because wealthier students are smarter, but because they can afford tutoring. We're working to close that gap." },
];

function renderMissionPage() {
  const cards = MISSION_CARDS.map(
    (c) => `
      <div class="mission-card mt-card-hover">
        <div class="emoji">${c.emoji}</div>
        <h3>${esc(c.title)}</h3>
        <p>${esc(c.body)}</p>
      </div>
    `
  ).join("");

  return `
    <section class="mission-hero">
      <h1>Our Mission</h1>
    </section>

    <section class="mission-intro">
      <p class="lede"><strong>Ethan Moran</strong> and <strong>Albert Wen</strong>, students at Buckingham Browne &amp; Nichols School in Cambridge, Massachusetts, founded Mass Tutoring with one mission: make SAT prep simple, accessible, and free for every student.</p>
      <div class="mission-image-wrap">
        <img src="https://images.unsplash.com/photo-1721702754494-fdd7189f946c?auto=format&fit=crop&w=1400&q=80" alt="A library filled with books" />
      </div>
      <div class="mission-cards-grid">${cards}</div>
    </section>

    <section class="founders-section">
      <h2>Meet the Founders</h2>
      <div class="founders-grid">
        <div class="founder">
          <div class="founder-avatar">EM</div>
          <p class="founder-name">Ethan Moran</p>
          <p class="founder-score">SAT Superscore: 1550</p>
          <p class="founder-placeholder">[ photo placeholder ]</p>
        </div>
        <div class="founder">
          <div class="founder-avatar">AW</div>
          <p class="founder-name">Albert Wen</p>
          <p class="founder-score">SAT Superscore: 1560</p>
          <p class="founder-placeholder">[ photo placeholder ]</p>
        </div>
      </div>
      <div class="founders-letter">
        <p>Hi, we're Ethan and Albert. In every student's journey, standardized testing plays a vital role. While the SAT definitely isn't a measure of intelligence, it matters for college admissions and can shape your opportunities.</p>
        <p>The major problem? Access to tutoring. With companies charging over $200/hour, quality test prep isn't accessible to most families. Wealthier students score higher — not because they're smarter, but because they can afford expensive tutoring.</p>
        <p>We created Mass Tutoring to break that cycle. Both of us scored highly (1550 and 1560) without any paid tutoring. By connecting tutors who scored 1530+ with students who need help, we're making test prep accessible to everyone.</p>
        <p class="signoff"><strong>Your goals are our goals too.</strong><br />With care, Ethan Moran &amp; Albert Wen</p>
      </div>
    </section>
  `;
}

// ============================================================
// GUIDE PAGE
// ============================================================

const GUIDE_STEPS = [
  { title: "Schedule your test", body: "Find a high school nearby and schedule a date. You don't want to be driving an hour to your exam Saturday morning." },
  { title: "Start 3 months before", body: "This varies person to person, but 3 months gives plenty of time to improve significantly." },
  { title: "Take a diagnostic test", body: "Take a full, timed, no-help practice test on Blue Book first. Don't worry if it isn't great — you need a baseline before you know what to study." },
  { title: "Drill your weaknesses", body: "Use Erica Meltzer for grammar, or Khan Academy / Miyagi Labs for math. Target the specific question types you missed." },
  { title: "Take regular practice tests", body: "Every 2–3 weeks, retest to track progress. Don't burn all 10 Blue Book tests early — save some for closer to test day." },
  { title: "Review and repeat", body: "Understand why you got each question wrong, learn the pattern, and keep cycling through practice → review → drill." },
];

function renderGuidePage() {
  const steps = GUIDE_STEPS.map(
    (s, i) => `
      <div class="guide-step mt-card-hover">
        <div class="guide-step-num">${i + 1}</div>
        <div>
          <h4>${esc(s.title)}</h4>
          <p>${esc(s.body)}</p>
        </div>
      </div>
    `
  ).join("");

  return `
    <section class="guide-hero">
      <h1>Ultimate SAT Study Guide</h1>
      <p>Everything you need to ace the SAT, completely free.</p>
    </section>

    <div class="guide-image-wrap">
      <div class="guide-image-inner">
        <img src="https://images.unsplash.com/photo-1514369118554-e20d93546b30?auto=format&fit=crop&w=1400&q=80" alt="A student writing in a notebook" />
      </div>
    </div>

    <section class="guide-section">
      <div class="guide-resources-grid">
        <div class="guide-card mt-card-hover">
          <span class="guide-pill free">FREE — $0</span>
          <h3>Practice Questions</h3>
          <p>200 original questions on this site (100 Math, 100 Reading &amp; Writing), plus Question Bank (non-active), Khan Academy, and Miyagi Labs.</p>
          <h3>Videos</h3>
          <p>Khan Academy.</p>
          <h3>Practice Tests</h3>
          <p>Blue Book (official College Board — only 10, use wisely), Princeton Review (1 free with sign-up), Miyagi Labs.</p>
        </div>
        <div class="guide-card mt-card-hover">
          <span class="guide-pill paid">OPTIONAL — PAID</span>
          <h3>Recommended Books</h3>
          <p>Princeton Review, Erica Meltzer (highly recommended for R&amp;W), Kaplan. Some can be found secondhand.</p>
        </div>
      </div>

      <h2 class="guide-plan-title">Example Study Plan</h2>
      <div class="guide-steps">${steps}</div>

      <div class="vocab-note">
        <p class="label">A NOTE ON VOCABULARY</p>
        <p class="body">This is the one section almost everyone agrees you can't really study for short-term. Unless you start 6+ months out or read consistently for a year, vocab is partially out of your control. If you're missing more than 3–5 vocab questions, try SAT vocab lists on Quizlet.</p>
      </div>

      <div class="strategy-cards-grid">
        <div class="strategy-card mt-card-hover">
          <p class="strategy-pill">DESMOS</p>
          <h3>The 15-second Desmos decision</h3>
          <p>Identify the requested quantity → ask if it's an intersection, intercept, vertex, regression, parameter, or batch-check problem → write the equation(s) before opening Desmos → choose the shortest move → read only what's asked → check sign, scale, domain, and rounding.</p>
        </div>
        <div class="strategy-card mt-card-hover">
          <p class="strategy-pill">READING &amp; WRITING</p>
          <h3>The same-pattern approach</h3>
          <p>Name the question type first (words in context, transitions, agreement, etc.) → answer the question using only the passage, before reading the choices → eliminate choices that are true but off-topic, or that add unsupported claims → for grammar, isolate the core subject and verb before worrying about commas.</p>
        </div>
      </div>

      <div class="guide-cta-row">
        <button class="btn-primary mt-btn" id="guide-try-all">Try all 200 questions →</button>
      </div>
    </section>
  `;
}

function wireGuidePage() {
  const btn = document.getElementById("guide-try-all");
  if (btn) btn.addEventListener("click", () => setPage("practice"));
}

// ============================================================
// PRACTICE PAGE
// ============================================================

function resetRun() {
  state.practice.index = 0;
  state.practice.selected = "";
  state.practice.revealed = false;
  state.practice.missed = [];
  state.practice.score = { correct: 0, total: 0 };
  state.practice.finished = false;
}

function switchSubject(newSubject) {
  state.practice.subject = newSubject;
  state.practice.domainFilter = "All";
  state.practice.diffFilter = "All";
  resetRun();
  render();
}

function applyFilters(newDomain, newDiff) {
  state.practice.domainFilter = newDomain;
  state.practice.diffFilter = newDiff;
  resetRun();
  render();
}

function subjectToggleHtml() {
  const subjects = ["Math", "Reading & Writing"];
  const buttons = subjects
    .map(
      (s) =>
        `<button class="${state.practice.subject === s ? "active" : ""}" data-subject="${escAttr(s)}">${esc(s)}</button>`
    )
    .join("");
  return `<div class="subject-toggle">${buttons}</div>`;
}

function renderPracticePage() {
  const p = state.practice;
  const pool = getPool();
  const DOMAINS = getDomains();
  const q = pool.length ? pool[p.index % pool.length] : null;

  if (!q) {
    return `
      <div class="no-questions">
        ${subjectToggleHtml()}
        <p>No questions match these filters.</p>
      </div>
    `;
  }

  if (p.finished) {
    const pct = Math.round((p.score.correct / p.score.total) * 100);
    const emoji = pct >= 80 ? "\u{1F3AF}" : pct >= 50 ? "\u{1F4C8}" : "\u{1F4AA}";
    const headline = p.missed.length === 0 ? "Clean sweep — nice work." : `Questions to review: #${p.missed.join(", #")}`;
    const detail =
      p.missed.length === 0
        ? "Try a harder difficulty or a different domain to keep building speed."
        : "Restart this set to drill the ones you missed again — repetition on the exact move is what sticks.";
    const otherSubject = p.subject === "Math" ? "Reading & Writing" : "Math";

    return `
      <div class="results-wrap mt-fade-in">
        <div class="results-inner">
          <div class="results-emoji">${emoji}</div>
          <h1>Set complete!</h1>
          <p class="score-line">You got <strong>${p.score.correct}/${p.score.total}</strong> correct (${pct}%).</p>
          <div class="results-summary">
            <p class="headline">${esc(headline)}</p>
            <p class="detail">${esc(detail)}</p>
          </div>
          <div class="results-actions">
            <button class="btn-solid mt-btn" id="try-again-btn">Try Again</button>
            <button class="btn-outline mt-btn" id="all-questions-btn">All ${getQuestions().length} Questions</button>
            <button class="btn-outline-accent mt-btn" id="switch-subject-btn">Switch to ${esc(otherSubject)}</button>
          </div>
        </div>
      </div>
    `;
  }

  const diffChips = ["All", ...DIFFICULTIES]
    .map((d) => {
      const isActive = p.diffFilter === d;
      const activeColor = DIFF_COLORS[d] ? DIFF_COLORS[d].text : "#f59e0b";
      const style = isActive
        ? `background:${activeColor};color:#0b0f17;border-color:transparent;`
        : `color:${DIFF_COLORS[d] ? DIFF_COLORS[d].text : "#94a3b8"};`;
      return `<button class="chip mt-chip" style="${style}" data-diff="${escAttr(d)}">${esc(d)}</button>`;
    })
    .join("");

  const domainChips = ["All", ...DOMAINS]
    .map((d) => {
      const isActive = p.domainFilter === d;
      return `<button class="chip mt-chip${isActive ? " active-domain" : ""}" data-domain="${escAttr(d)}">${esc(d)}</button>`;
    })
    .join("");

  const progressSegs = Array.from({ length: pool.length })
    .map((_, i) => {
      const cls = i < p.index ? "done" : i === p.index ? "current" : "";
      return `<div class="progress-seg ${cls}"></div>`;
    })
    .join("");

  let choicesHtml = "";
  if (q.type === "mc") {
    const buttons = q.choices
      .map((c) => {
        const isThisCorrect = c.trim().toLowerCase() === q.answer.trim().toLowerCase();
        const isThisSelected = c === p.selected;
        let cls = "";
        if (p.revealed && isThisCorrect) cls = "correct mt-pop";
        else if (p.revealed && isThisSelected && !isThisCorrect) cls = "incorrect";
        return `<button class="choice-btn mt-choice ${cls}" data-choice="${escAttr(c)}" ${p.revealed ? "disabled" : ""}>${esc(c)}</button>`;
      })
      .join("");
    choicesHtml = `<div class="choices">${buttons}</div>`;
  } else {
    choicesHtml = `
      <div class="free-response-row">
        <input type="text" id="free-response-input" placeholder="Type your answer" value="${escAttr(p.selected)}" ${p.revealed ? "disabled" : ""} />
        <button id="free-response-check" ${p.revealed || !p.selected ? "disabled" : ""}>Check</button>
      </div>
    `;
  }

  const isCorrect = p.revealed && p.selected.trim().toLowerCase() === q.answer.trim().toLowerCase();

  let explanationHtml = "";
  if (p.revealed) {
    const statusText = isCorrect ? "Correct!" : `Not quite — the answer is ${q.answer}`;
    let methodHtml = "";
    if (q.desmos) {
      const lines = q.desmos.map((line) => `<code class="desmos-line">${esc(line)}</code>`).join("");
      methodHtml = `<p class="explanation-label">DESMOS METHOD</p><div class="desmos-lines">${lines}</div>`;
    } else {
      methodHtml = `<p class="explanation-label">STRATEGY</p><p class="strategy-box">${esc(q.strategy)}</p>`;
    }
    explanationHtml = `
      <div class="explanation mt-fade-in${isCorrect ? " is-correct" : ""}">
        <p class="explanation-status${isCorrect ? " is-correct" : ""}">${esc(statusText)}</p>
        <p class="explanation-body">${esc(q.solution)}</p>
        ${methodHtml}
      </div>
    `;
  }

  const isLast = p.index + 1 >= pool.length;

  return `
    <div class="practice-wrap">
      <div class="practice-inner">
        <div class="practice-header">
          ${catMarkSvg(30)}
          <div>
            <h1>Practice — 200 Questions</h1>
            <p>${visitorCount.toLocaleString()} students have used this tool</p>
          </div>
        </div>

        ${subjectToggleHtml()}

        <div class="chip-row">${diffChips}</div>
        <div class="chip-row domains">${domainChips}</div>

        <div class="practice-meta-row">
          <span class="q-of">Question ${p.index + 1} of ${pool.length}</span>
          <span class="score-pill">${p.score.correct}/${p.score.total} correct</span>
        </div>
        <div class="progress-bar">${progressSegs}</div>

        <div class="question-card mt-fade-in" key="${state.practice.subject}-${q.n}">
          <div class="question-tags">
            <span class="tag-num">#${q.n}</span>
            <span class="tag-diff" style="background:${DIFF_COLORS[q.difficulty].bg};color:${DIFF_COLORS[q.difficulty].text}">${esc(q.difficulty)}</span>
            <span class="tag-domain">${esc(q.domain)}</span>
          </div>

          <p class="question-prompt">${esc(q.prompt)}</p>

          ${choicesHtml}
          ${explanationHtml}

          <div class="question-footer">
            <button class="next-btn mt-btn${p.revealed ? " ready" : ""}" id="next-question-btn" ${p.revealed ? "" : "disabled"}>
              ${p.revealed ? (isLast ? "See Results →" : "Next Question →") : "Answer to continue"}
            </button>
          </div>
        </div>

        <p class="practice-footnote">
          ${
            p.subject === "Math"
              ? `Every solution shows the algebra <em>and</em> the fastest Desmos move. Want the full breakdown? Check the <strong>Guide</strong> page.`
              : `Every solution comes with a reusable strategy for that question type. Want the full breakdown? Check the <strong>Guide</strong> page.`
          }
        </p>
      </div>
    </div>
  `;
}

function checkAnswer(choice) {
  const p = state.practice;
  const pool = getPool();
  const q = pool[p.index % pool.length];
  if (p.revealed || !q) return;
  p.selected = choice;
  p.revealed = true;
  const isCorrect = choice.trim().toLowerCase() === q.answer.trim().toLowerCase();
  p.score.total += 1;
  if (isCorrect) p.score.correct += 1;
  else p.missed.push(q.n);
  render();
}

function nextQuestion() {
  const p = state.practice;
  const pool = getPool();
  if (p.index + 1 >= pool.length) {
    p.finished = true;
    render();
    return;
  }
  p.index += 1;
  p.selected = "";
  p.revealed = false;
  render();
}

function wirePracticePage() {
  const p = state.practice;

  document.querySelectorAll("[data-subject]").forEach((btn) => {
    btn.addEventListener("click", () => switchSubject(btn.dataset.subject));
  });

  document.querySelectorAll("[data-diff]").forEach((btn) => {
    btn.addEventListener("click", () => applyFilters(p.domainFilter, btn.dataset.diff));
  });

  document.querySelectorAll("[data-domain]").forEach((btn) => {
    btn.addEventListener("click", () => applyFilters(btn.dataset.domain, p.diffFilter));
  });

  document.querySelectorAll("[data-choice]").forEach((btn) => {
    btn.addEventListener("click", () => checkAnswer(btn.dataset.choice));
  });

  const freeInput = document.getElementById("free-response-input");
  const freeCheck = document.getElementById("free-response-check");
  if (freeInput) {
    freeInput.addEventListener("input", (e) => {
      p.selected = e.target.value;
      if (freeCheck) freeCheck.disabled = !p.selected;
    });
    freeInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && p.selected && !p.revealed) checkAnswer(p.selected);
    });
  }
  if (freeCheck) {
    freeCheck.addEventListener("click", () => checkAnswer(p.selected));
  }

  const nextBtn = document.getElementById("next-question-btn");
  if (nextBtn) nextBtn.addEventListener("click", () => { if (p.revealed) nextQuestion(); });

  const tryAgainBtn = document.getElementById("try-again-btn");
  if (tryAgainBtn) tryAgainBtn.addEventListener("click", () => { resetRun(); render(); });

  const allQuestionsBtn = document.getElementById("all-questions-btn");
  if (allQuestionsBtn) allQuestionsBtn.addEventListener("click", () => applyFilters("All", "All"));

  const switchSubjectBtn = document.getElementById("switch-subject-btn");
  if (switchSubjectBtn) {
    switchSubjectBtn.addEventListener("click", () => {
      switchSubject(p.subject === "Math" ? "Reading & Writing" : "Math");
    });
  }
}

// ============================================================
// INIT
// ============================================================

function wireNav() {
  document.querySelectorAll(".nav [data-page]").forEach((el) => {
    el.addEventListener("click", () => setPage(el.dataset.page));
  });
}

document.addEventListener("DOMContentLoaded", () => {
  visitorCount += 1; // count this visit, like the React useEffect did on mount
  wireNav();
  render();
});
