// My Study — local-first SAT workspace. Depends on window.MT (site.js)
// and window.MT_SAT_SCHEDULE / window.MT_RESOURCES (mt-data.js).
(function () {
  "use strict";
  function init() {
  var app = document.getElementById("ms-app");
  if (!app || !window.MT) return;
  var MT = window.MT;
  var state = MT.load() || MT.blank();
  var RES = {};
  (window.MT_RESOURCES || []).forEach(function (r) { RES[r.id] = r; });

  function persist() { MT.save(state); renderStatus(); renderToday(); }
  function el(html) { var d = document.createElement("div"); d.innerHTML = html.trim(); return d.firstChild; }
  function escT(s) { var d = document.createElement("div"); d.textContent = s == null ? "" : String(s); return d.innerHTML; }

  // ---------------- status row + today card ----------------
  function selectedAdm() {
    if (!state.testDateId || !window.MT_SAT_SCHEDULE) return null;
    return window.MT_SAT_SCHEDULE.administrations.filter(function (a) { return a.id === state.testDateId; })[0] || null;
  }
  function renderStatus() {
    var adm = selectedAdm();
    app.querySelector("[data-st-days]").textContent = adm ? Math.max(0, MT.dayDiff(MT.nyToday(), adm.testDate)) : "–";
    app.querySelector("[data-st-week]").textContent = MT.tasksThisWeek(state);
    var skills = {};
    state.errorLog.forEach(function (e) { if (!e.mastered && e.skill) skills[e.skill] = (skills[e.skill] || 0) + 1; });
    var top = Object.keys(skills).sort(function (a, b) { return skills[b] - skills[a]; })[0];
    app.querySelector("[data-st-skill]").textContent = top || "–";
    app.querySelector("[data-st-saved]").textContent =
      state.saved.nextUp.length + state.saved.later.length + state.saved.completed.length;
  }
  // Optional study check-in reminder (Task 3.4). On-device only: builds a
  // weekly recurring calendar file and downloads it. Nothing is sent to us
  // and no contact info is collected.
  function downloadReminder() {
    var adm = selectedAdm();
    var until = adm ? adm.testDate.replace(/-/g, "") + "T235900Z" : "";
    function dt(iso) { return iso.replace(/-/g, "") + "T210000Z"; } // ~4pm ET-ish
    var start = MT.nyToday();
    var rrule = "RRULE:FREQ=WEEKLY;INTERVAL=1" + (until ? ";UNTIL=" + until : ";COUNT=12");
    var ics = [
      "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Mass Tutoring//My Study//EN",
      "BEGIN:VEVENT",
      "UID:mt-study-" + Date.now() + "@masstutoring.com",
      "DTSTAMP:" + dt(start),
      "DTSTART:" + dt(start),
      "DURATION:PT30M",
      rrule,
      "SUMMARY:SAT study check-in",
      "DESCRIPTION:Open My Study at masstutoring.com/my-study for today's task. Delete this event anytime to stop the reminders.",
      "END:VEVENT", "END:VCALENDAR"
    ].join("\r\n");
    var blob = new Blob([ics], { type: "text/calendar" });
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "mass-tutoring-study-checkin.ics";
    a.click();
    URL.revokeObjectURL(a.href);
    MT.toast("Calendar reminder downloaded");
  }

  var swapOffset = 0;
  function pickTask(offset) {
    if (!state.plan) return null;
    var found = [], cw = MT.currentWeekIndex(state);
    for (var w = 0; w < state.plan.weeks.length && found.length < offset + 1; w++) {
      state.plan.weeks[w].tasks.forEach(function (t) {
        if (!state.completedTasks[t.id] && w <= cw + 1) found.push({ task: t, overdue: w < cw, week: w });
      });
    }
    return found[Math.min(offset, found.length - 1)] || null;
  }
  function renderToday() {
    var label = app.querySelector("[data-today-label]");
    var hint = app.querySelector("[data-today-hint]");
    var openB = app.querySelector("[data-today-open]");
    var doneB = app.querySelector("[data-today-done]");
    var swapB = app.querySelector("[data-today-swap]");
    var rec = state.plan ? pickTask(swapOffset) : MT.todayTask(state);
    if (!rec) {
      var caught = state.plan ? "All planned tasks are done — nice work. Add error-log entries or review saved resources." :
        "Set up your study plan below to get one clear task each day.";
      label.textContent = caught; hint.textContent = "";
      openB.hidden = doneB.hidden = swapB.hidden = true;
      return;
    }
    label.textContent = (rec.overdue ? "Catch up: " : "") + rec.task.label;
    hint.textContent = rec.task.hint || "";
    var r = rec.task.resourceId && RES[rec.task.resourceId];
    openB.hidden = !r;
    if (r) { openB.href = r.url; openB.textContent = "Open " + r.name; }
    doneB.hidden = false;
    swapB.hidden = !state.plan;
    doneB.onclick = function () { state.completedTasks[rec.task.id] = Date.now(); swapOffset = 0; persist(); renderPlan(); MT.toast("Task completed"); };
    swapB.onclick = function () { swapOffset = (swapOffset + 1) % 3; renderToday(); };
  }

  // ---------------- tabs ----------------
  var tabs = Array.prototype.slice.call(app.querySelectorAll("[role=tab]"));
  function selectTab(tab) {
    tabs.forEach(function (t) {
      var on = t === tab;
      t.setAttribute("aria-selected", on ? "true" : "false");
      t.tabIndex = on ? 0 : -1;
      document.getElementById(t.getAttribute("aria-controls")).hidden = !on;
    });
    tab.focus();
  }
  tabs.forEach(function (t, i) {
    t.addEventListener("click", function () { selectTab(t); });
    t.addEventListener("keydown", function (e) {
      var d = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
      if (d) selectTab(tabs[(i + d + tabs.length) % tabs.length]);
    });
  });

  // ---------------- plan wizard + plan view ----------------
  var planPanel = document.getElementById("panel-plan");
  var wiz = { step: 0, testDateId: null, diagnostic: null, current: "", target: "",
              weak: "math", days: 4, session: 45 };
  function futureAdms() {
    var today = MT.nyToday();
    return ((window.MT_SAT_SCHEDULE || {}).administrations || []).filter(function (a) { return a.testDate >= today; });
  }
  function renderWizard() {
    var steps = [stepDate, stepDiag, stepSchedule, stepReview];
    planPanel.innerHTML = "";
    var box = el('<div class="ms-wizard"><p class="ms-wiz-progress">Step ' + (wiz.step + 1) + ' of 4</p><div class="ms-wiz-body"></div><div class="ms-wiz-nav"></div></div>');
    steps[wiz.step](box.querySelector(".ms-wiz-body"));
    var nav = box.querySelector(".ms-wiz-nav");
    if (wiz.step > 0) nav.appendChild(el('<button type="button" class="button-secondary" data-back>Back</button>'));
    nav.appendChild(el('<button type="button" class="button-primary" data-next>' + (wiz.step === 3 ? "Create my plan" : "Continue") + "</button>"));
    nav.addEventListener("click", function (e) {
      if (e.target.closest("[data-back]")) { wiz.step--; renderWizard(); }
      if (e.target.closest("[data-next]")) {
        if (wiz.step === 3) { generatePlan(); } else { wiz.step++; renderWizard(); }
      }
    });
    planPanel.appendChild(box);
  }
  function stepDate(body) {
    var opts = futureAdms().map(function (a) {
      return '<option value="' + a.id + '"' + (wiz.testDateId === a.id ? " selected" : "") + ">" + MT.fmtDate(a.testDate) + "</option>";
    }).join("");
    body.innerHTML = '<h3>When do you plan to take the SAT?</h3>' +
      '<label class="ms-field">Test date<select data-w="testDateId"><option value="">Not decided yet</option>' + opts + "</select></label>" +
      '<p class="ms-note">Dates come from the official College Board schedule. Confirm registration deadlines on their site.</p>';
  }
  function stepDiag(body) {
    body.innerHTML = "<h3>Where are you starting from?</h3>" +
      '<fieldset class="ms-field"><legend>Have you taken a Bluebook diagnostic?</legend>' +
      '<label><input type="radio" name="diag" value="yes"' + (wiz.diagnostic === true ? " checked" : "") + " /> Yes</label>" +
      '<label><input type="radio" name="diag" value="no"' + (wiz.diagnostic === false ? " checked" : "") + " /> Not yet</label></fieldset>" +
      '<label class="ms-field">Current score (optional)<input type="number" min="400" max="1600" step="10" data-w="current" value="' + escT(wiz.current) + '" /></label>' +
      '<label class="ms-field">Target score (optional)<input type="number" min="400" max="1600" step="10" data-w="target" value="' + escT(wiz.target) + '" /></label>';
  }
  function stepSchedule(body) {
    body.innerHTML = "<h3>Your study schedule</h3>" +
      '<label class="ms-field">Weaker section<select data-w="weak"><option value="math"' + (wiz.weak === "math" ? " selected" : "") + '>Math</option><option value="reading-writing"' + (wiz.weak === "reading-writing" ? " selected" : "") + ">Reading &amp; Writing</option></select></label>" +
      '<label class="ms-field">Study days per week<input type="number" min="1" max="7" data-w="days" value="' + wiz.days + '" /></label>' +
      '<label class="ms-field">Typical session length (minutes)<input type="number" min="15" max="180" step="15" data-w="session" value="' + wiz.session + '" /></label>';
  }
  function stepReview(body) {
    var adm = futureAdms().filter(function (a) { return a.id === wiz.testDateId; })[0];
    body.innerHTML = "<h3>Ready to build your plan</h3><ul>" +
      "<li>Test date: <strong>" + (adm ? MT.fmtDate(adm.testDate) : "not decided (8-week plan)") + "</strong></li>" +
      "<li>Diagnostic done: <strong>" + (wiz.diagnostic ? "yes" : "not yet — week 1 starts with one") + "</strong></li>" +
      "<li>Focus section: <strong>" + (wiz.weak === "math" ? "Math" : "Reading & Writing") + "</strong></li>" +
      "<li>Schedule: <strong>" + wiz.days + " days/week, ~" + wiz.session + " min</strong></li></ul>" +
      '<label class="ms-optin"><input type="checkbox" data-w-reminder' + (wiz.reminder ? " checked" : "") + ' /> <span>Add a weekly study check-in to my calendar <em>(optional)</em>. Downloads a calendar file to this device — nothing is sent to us, and no email or phone number is collected. To stop, just delete the event from your calendar.</span></label>' +
      '<p class="ms-note">Plans use verified guide resources. No score is guaranteed — steady review is what moves results.</p>';
  }
  planPanel.addEventListener("change", function (e) {
    var w = e.target.getAttribute("data-w");
    if (w) wiz[w] = e.target.type === "number" ? Number(e.target.value) : e.target.value || null;
    if (e.target.name === "diag") wiz.diagnostic = e.target.value === "yes";
    if (e.target.hasAttribute("data-w-reminder")) wiz.reminder = e.target.checked;
  });

  var FOCUS = {
    "math": [
      { label: "Do 10 official Math questions on your weakest domain", resourceId: "cb-question-bank", hint: "Filter the Question Bank by domain and difficulty." },
      { label: "Watch one Math lesson on a weak topic", resourceId: "khan-academy-sat" },
      { label: "Practice one Desmos technique until it's automatic", resourceId: "desmos-calculator" }
    ],
    "reading-writing": [
      { label: "Do 10 official Reading & Writing questions on one question type", resourceId: "cb-question-bank", hint: "Pick a single skill in the Question Bank." },
      { label: "Watch one grammar or reading lesson", resourceId: "khan-academy-sat" },
      { label: "Review one grammar rule and write two example sentences", resourceId: "cb-question-bank" }
    ]
  };
  function generatePlan() {
    state.testDateId = wiz.testDateId;
    var adm = selectedAdm();
    var today = MT.nyToday();
    var totalDays = adm ? Math.max(7, MT.dayDiff(today, adm.testDate)) : 56;
    var nWeeks = Math.min(24, Math.max(1, Math.round(totalDays / 7)));
    var perWeek = Math.min(5, Math.max(2, wiz.days));
    var weeks = [];
    for (var w = 0; w < nWeeks; w++) {
      var tasks = [], strong = wiz.weak === "math" ? "reading-writing" : "math";
      var lastWeek = w === nWeeks - 1 && adm;
      if (w === 0 && wiz.diagnostic === false) {
        tasks.push({ id: "w0-diag", label: "Take a full Bluebook diagnostic test", resourceId: "bluebook", hint: "Timed, no help — you need an honest baseline." });
        tasks.push({ id: "w0-review", label: "Review every missed question and start your error log", hint: "Use the Error Log tab as you review." });
      } else if (lastWeek) {
        tasks.push({ id: "w" + w + "-light1", label: "Light review of your error log — no new material", hint: "Re-read your own corrections; they're your best notes." });
        tasks.push({ id: "w" + w + "-check", label: "Finish your test-day checklist", hint: "It's in the Test Day tab." });
        tasks.push({ id: "w" + w + "-rest", label: "Get a full night's sleep before test day" });
      } else {
        var menu = FOCUS[wiz.weak], other = FOCUS[strong];
        tasks.push(Object.assign({ id: "w" + w + "-t1" }, menu[w % menu.length]));
        if (perWeek >= 3) tasks.push(Object.assign({ id: "w" + w + "-t2" }, menu[(w + 1) % menu.length]));
        if (perWeek >= 4) tasks.push(Object.assign({ id: "w" + w + "-t3" }, other[w % other.length]));
        tasks.push({ id: "w" + w + "-log", label: "Error-log session: add this week's misses and review old ones" });
        if (w > 0 && w % 3 === 0) tasks.push({ id: "w" + w + "-pt", label: "Take a full Bluebook practice test and review it", resourceId: "bluebook" });
      }
      weeks.push({ tasks: tasks });
    }
    state.plan = { startDate: today, weeks: weeks, setup: JSON.parse(JSON.stringify(wiz)) };
    // new date → fresh checklist
    if (state.checklistFor !== state.testDateId) { state.checklist = {}; state.checklistFor = state.testDateId; }
    persist(); renderPlan(); renderChecklist(); MT.toast("Study plan created");
    if (wiz.reminder) downloadReminder();
  }
  function renderPlan() {
    if (!state.plan) { renderWizard(); return; }
    var cw = MT.currentWeekIndex(state);
    var html = '<div class="ms-plan-head"><h3 style="margin:0">Your plan</h3><button type="button" class="ms-mini-btn" data-replan>Rebuild plan</button></div>';
    state.plan.weeks.forEach(function (wk, i) {
      var done = wk.tasks.filter(function (t) { return state.completedTasks[t.id]; }).length;
      var open = i === cw || i === cw + 1;
      html += '<details class="ms-week"' + (i === cw ? " open" : "") + (open ? "" : ' data-later="1"') + ">" +
        "<summary>Week " + (i + 1) + (i === cw ? " — this week" : "") + ' <span class="ms-week-count">' + done + "/" + wk.tasks.length + "</span></summary><ul class=\"ms-tasklist\">" +
        wk.tasks.map(function (t) {
          var r = t.resourceId && RES[t.resourceId];
          return '<li><label><input type="checkbox" data-task="' + t.id + '"' + (state.completedTasks[t.id] ? " checked" : "") + " /> <span>" + escT(t.label) +
            (r ? ' — <a href="' + r.url + '" target="_blank" rel="noopener">' + escT(r.name) + '<span class="visually-hidden"> (opens in a new tab)</span></a>' : "") + "</span></label></li>";
        }).join("") + "</ul></details>";
    });
    planPanel.innerHTML = html;
  }
  planPanel.addEventListener("change", function (e) {
    var id = e.target.getAttribute("data-task");
    if (!id) return;
    if (e.target.checked) state.completedTasks[id] = Date.now();
    else delete state.completedTasks[id];
    persist(); 
  });
  planPanel.addEventListener("click", function (e) {
    if (e.target.closest("[data-replan]") && confirm("Rebuild your plan? Completed-task history is kept.")) {
      state.plan = null; wiz.step = 0; persist(); renderPlan();
    }
  });

  // ---------------- error log ----------------
  var errPanel = document.getElementById("panel-errors");
  var MISTAKES = ["Content gap", "Misread question", "Misread answer choice", "Careless calculation",
                  "Timing problem", "Desmos-entry error", "Grammar-rule gap", "Vocabulary gap",
                  "Strategy problem", "Unsupported inference", "Guessing"];
  function normSkill(s) { return (s || "").trim().toLowerCase(); }
  function tutoringEscalation() {
    // Suggest free tutoring when the same weak skill keeps coming up (3+ unmastered logs).
    var counts = {}, labels = {};
    state.errorLog.forEach(function (e) {
      if (e.mastered || !e.skill) return;
      var k = normSkill(e.skill);
      if (!k) return;
      counts[k] = (counts[k] || 0) + 1;
      labels[k] = e.skill.trim();
    });
    var hot = Object.keys(counts).filter(function (k) { return counts[k] >= 3; })
      .sort(function (a, b) { return counts[b] - counts[a]; })[0];
    if (!hot) return "";
    state.tutoringDismissed = state.tutoringDismissed || {};
    if (state.tutoringDismissed[hot]) return "";
    return '<div class="ms-escalate callout" role="note"><button type="button" class="ms-escalate-x" ' +
      'data-escdismiss="' + escT(hot) + '" aria-label="Dismiss this suggestion">&times;</button>' +
      "<p><strong>Stuck on " + escT(labels[hot]) + "?</strong> You've logged this skill " + counts[hot] +
      " times without marking it mastered. A skill that keeps coming back is exactly what a free one-on-one " +
      "session is good for.</p>" +
      '<p style="margin-bottom:0"><a class="button-primary" href="/tutoring/request/">Request free tutoring</a> ' +
      '<a class="text-link" href="/sat-guide/diagnose/" style="margin-left:0.8rem">Or work through the diagnose guide ' +
      '<span class="arr" aria-hidden="true">&rarr;</span></a></p></div>';
  }
  function renderErrors() {
    var ins = "";
    if (state.errorLog.length) {
      function topOf(field) {
        var c = {};
        state.errorLog.forEach(function (e) { if (!e.mastered && e[field]) c[e[field]] = (c[e[field]] || 0) + 1; });
        return Object.keys(c).sort(function (a, b) { return c[b] - c[a]; })[0] || "–";
      }
      var mastered = state.errorLog.filter(function (e) { return e.mastered; }).length;
      ins = '<div class="ms-insights"><span>Most missed section: <strong>' + escT(topOf("section")) + "</strong></span>" +
        "<span>Top weak skill: <strong>" + escT(topOf("skill")) + "</strong></span>" +
        "<span>Common mistake: <strong>" + escT(topOf("mistakeType")) + "</strong></span>" +
        "<span>Mastered: <strong>" + mastered + "/" + state.errorLog.length + "</strong></span></div>";
      ins += tutoringEscalation();
    }
    var rows = state.errorLog.slice().reverse().map(function (e, ri) {
      var i = state.errorLog.length - 1 - ri;
      return '<details class="ms-err"' + "><summary><span>" + escT(e.date) + " · " + escT(e.section) + " · " + escT(e.skill || e.domain || "") + "</span>" +
        '<span class="ms-err-tags">' + escT(e.mistakeType) + (e.mastered ? " · ✓ mastered" : "") + "</span></summary>" +
        '<div class="ms-err-body">' +
        (e.source ? "<p><strong>Source:</strong> " + escT(e.source) + "</p>" : "") +
        (e.wrong ? "<p><strong>What I did:</strong> " + escT(e.wrong) + "</p>" : "") +
        (e.right ? "<p><strong>Correct reasoning:</strong> " + escT(e.right) + "</p>" : "") +
        '<p class="ms-err-actions"><button type="button" class="ms-mini-btn" data-master="' + i + '">' + (e.mastered ? "Mark not mastered" : "Mark mastered") + "</button>" +
        '<button type="button" class="ms-mini-btn" data-delerr="' + i + '">Delete</button></p></div></details>';
    }).join("");
    errPanel.innerHTML =
      '<details class="ms-addform"><summary>Add an entry</summary><form data-errform class="ms-form">' +
      '<div class="ms-form-grid">' +
      '<label class="ms-field">Date<input type="date" name="date" value="' + MT.nyToday() + '" required /></label>' +
      '<label class="ms-field">Test or resource<input type="text" name="source" placeholder="Bluebook Test 2" /></label>' +
      '<label class="ms-field">Section<select name="section"><option>Math</option><option>Reading &amp; Writing</option></select></label>' +
      '<label class="ms-field">Skill or domain<input type="text" name="skill" placeholder="Linear equations" required /></label>' +
      '<label class="ms-field">Mistake type<select name="mistakeType">' + MISTAKES.map(function (m) { return "<option>" + m + "</option>"; }).join("") + "</select></label>" +
      '<label class="ms-field">Question ID (optional)<input type="text" name="qid" /></label></div>' +
      '<label class="ms-field">What went wrong<textarea name="wrong" rows="2"></textarea></label>' +
      '<label class="ms-field">Correct reasoning<textarea name="right" rows="2"></textarea></label>' +
      '<p style="margin:0"><button class="button-primary" type="submit">Add to log</button></p></form></details>' +
      ins +
      (rows || '<div class="empty-state"><p><strong>No entries yet.</strong></p><p style="margin-bottom:0">After each practice set, log every miss — the pattern in your mistakes is the fastest path to points.</p></div>') ;
  }
  errPanel.addEventListener("submit", function (e) {
    var f = e.target.closest("[data-errform]");
    if (!f) return;
    e.preventDefault();
    var fd = new FormData(f);
    state.errorLog.push({ date: fd.get("date"), source: fd.get("source"), section: fd.get("section"),
      skill: fd.get("skill"), mistakeType: fd.get("mistakeType"), qid: fd.get("qid"),
      wrong: fd.get("wrong"), right: fd.get("right"), mastered: false });
    persist(); renderErrors(); MT.toast("Entry added");
    var form = errPanel.querySelector(".ms-addform");
    if (form) { form.open = true; form.querySelector("input[name=skill]").focus(); }
  });
  errPanel.addEventListener("click", function (e) {
    var m = e.target.closest("[data-master]"), del = e.target.closest("[data-delerr]"),
        esc = e.target.closest("[data-escdismiss]");
    if (esc) { state.tutoringDismissed = state.tutoringDismissed || {}; state.tutoringDismissed[esc.dataset.escdismiss] = true; persist(); renderErrors(); }
    if (m) { var i = +m.dataset.master; state.errorLog[i].mastered = !state.errorLog[i].mastered; persist(); renderErrors(); }
    if (del && confirm("Delete this entry?")) { state.errorLog.splice(+del.dataset.delerr, 1); persist(); renderErrors(); }
  });

  // ---------------- saved resources ----------------
  var savedPanel = document.getElementById("panel-saved");
  var GROUPS = [["nextUp", "Next Up"], ["later", "Saved for Later"], ["completed", "Completed"]];
  function renderSaved() {
    var any = GROUPS.some(function (g) { return state.saved[g[0]].length; });
    if (!any) {
      savedPanel.innerHTML = '<div class="empty-state"><p><strong>Nothing saved yet.</strong></p><p style="margin-bottom:0">Use the bookmark icon on any resource in the <a href="/sat-guide/resources/">resource browser</a> and it will appear here.</p></div>';
      return;
    }
    savedPanel.innerHTML = GROUPS.map(function (g) {
      var key = g[0], items = state.saved[key];
      return "<h3>" + g[1] + " <span class=\"ms-week-count\">" + items.length + "</span></h3>" +
        (items.length ? '<ul class="ms-savedlist">' + items.map(function (it, i) {
          return "<li><a href=\"" + it.url + '" target="_blank" rel="noopener">' + escT(it.name) + '<span class="visually-hidden"> (opens in a new tab)</span></a>' +
            '<span class="ms-saved-actions">' +
            (key !== "nextUp" ? '<button type="button" class="ms-mini-btn" data-mv="' + key + ":" + i + ':nextUp">Next up</button>' : "") +
            (key !== "completed" ? '<button type="button" class="ms-mini-btn" data-mv="' + key + ":" + i + ':completed">Done</button>' : "") +
            '<button type="button" class="ms-mini-btn" data-rm="' + key + ":" + i + '">Remove</button></span></li>';
        }).join("") + "</ul>" : '<p class="ms-note">Empty.</p>');
    }).join("");
  }
  savedPanel.addEventListener("click", function (e) {
    var mv = e.target.closest("[data-mv]"), rm = e.target.closest("[data-rm]");
    if (mv) {
      var p = mv.dataset.mv.split(":");
      var item = state.saved[p[0]].splice(+p[1], 1)[0];
      state.saved[p[2]].push(item);
      persist(); renderSaved();
    }
    if (rm) {
      var q = rm.dataset.rm.split(":");
      state.saved[q[0]].splice(+q[1], 1);
      persist(); renderSaved();
    }
  });

  // ---------------- test-day checklist ----------------
  var tdPanel = document.getElementById("panel-testday");
  var CHECKLIST = [
    ["Registration", ["Registration confirmed", "Test center confirmed", "ID requirements reviewed", "Accommodations confirmed (if applicable)"]],
    ["Device", ["Bluebook installed", "Bluebook exam setup completed", "Device fully charged", "Charger packed", "Borrowed-device plan confirmed (if applicable)"]],
    ["Materials", ["Admission ticket ready", "Acceptable photo ID ready", "Pencil or pen packed", "Approved calculator packed (optional)", "Snacks and water prepared (if permitted)"]],
    ["Logistics", ["Arrival time confirmed", "Transportation planned", "Test-center updates checked", "Sleep plan set"]]
  ];
  function renderChecklist() {
    tdPanel.innerHTML = '<p class="ms-note">Verify each item against current official College Board guidance — requirements can change.</p>' +
      CHECKLIST.map(function (cat, ci) {
        return "<h3>" + cat[0] + "</h3><ul class=\"ms-checklist\">" + cat[1].map(function (item, ii) {
          var id = "cl-" + ci + "-" + ii;
          return '<li><label><input type="checkbox" data-check="' + id + '"' + (state.checklist[id] ? " checked" : "") + " /> " + item + "</label></li>";
        }).join("") + "</ul>";
      }).join("");
  }
  tdPanel.addEventListener("change", function (e) {
    var id = e.target.getAttribute("data-check");
    if (!id) return;
    if (e.target.checked) state.checklist[id] = true; else delete state.checklist[id];
    persist();
  });

  // ---------------- settings: export / import / clear ----------------
  app.querySelector("[data-export]").addEventListener("click", function () {
    var blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "mass-tutoring-study-data.json";
    a.click();
    URL.revokeObjectURL(a.href);
  });
  app.querySelector("[data-import]").addEventListener("change", function (e) {
    var file = e.target.files[0];
    if (!file) return;
    var rd = new FileReader();
    rd.onload = function () {
      try {
        var d = JSON.parse(rd.result);
        if (!d || typeof d !== "object" || !d.saved) throw 0;
        state = Object.assign(MT.blank(), d, { version: 1 });
        persist(); renderPlan(); renderErrors(); renderSaved(); renderChecklist();
        MT.toast("Data imported");
      } catch (err) { MT.toast("That file isn't valid My Study data"); }
    };
    rd.readAsText(file);
  });
  app.querySelector("[data-clear]").addEventListener("click", function () {
    if (!confirm("Delete all My Study data from this device? This cannot be undone.")) return;
    localStorage.removeItem(MT.KEY);
    state = MT.blank();
    persist(); renderPlan(); renderErrors(); renderSaved(); renderChecklist();
    MT.toast("Data cleared");
  });

  // ---------------- boot ----------------
  // Returning-student "welcome back" state (Task 3.3): only when a saved
  // plan already exists; first-time visitors see the normal setup flow.
  function renderWelcome() {
    var wrap = app.querySelector("[data-ms-welcome]");
    if (!wrap) return;
    if (!state.plan) { wrap.hidden = true; return; }
    var adm = selectedAdm();
    var bits = [];
    var cw = MT.currentWeekIndex(state) + 1;
    bits.push("You're on week " + cw + " of your plan");
    if (adm) bits.push(Math.max(0, MT.dayDiff(MT.nyToday(), adm.testDate)) + " days until the SAT");
    if (state.errorLog.length) bits.push(state.errorLog.length + " error-log " + (state.errorLog.length === 1 ? "entry" : "entries"));
    wrap.querySelector("[data-ms-welcome-sub]").textContent = bits.join(" · ") + ". Pick up your next task below.";
    wrap.hidden = false;
  }

  renderWelcome();
  renderStatus(); renderToday(); renderPlan(); renderErrors(); renderSaved(); renderChecklist();
  app.hidden = false;
  }
  // this deferred file executes before site.js defines window.MT;
  // DOMContentLoaded fires only after every deferred script has run.
  if (window.MT) init();
  else document.addEventListener("DOMContentLoaded", init);
})();
