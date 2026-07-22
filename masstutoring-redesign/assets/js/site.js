// Mobile navigation toggle + guide search/filter enhancement.
// The whole site works without JavaScript; this file only enhances.

(function () {
  "use strict";

  // ---------------- nav scroll shadow ----------------
  var header = document.getElementById("site-header");
  if (header) {
    var onScroll = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 4);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  // ---------------- mobile nav ----------------
  var toggle = document.querySelector(".nav-toggle");
  var links = document.getElementById("nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && links.classList.contains("is-open")) {
        links.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.focus();
      }
    });
  }

  // ---------------- guide search + filters ----------------
  var tools = document.querySelector("[data-guide-tools]");
  if (!tools) return;

  var searchInput = tools.querySelector("#guide-search");
  var chips = Array.prototype.slice.call(tools.querySelectorAll(".filter-chip input"));
  var clearBtns = Array.prototype.slice.call(document.querySelectorAll(".clear-filters"));
  var status = document.getElementById("results-status");
  var emptyState = document.querySelector("[data-empty-state]");
  // Scope search to the directory so featured cards elsewhere on the
  // page are unaffected (and not double-counted).
  var scope = document.getElementById("directory") || document;
  var cards = Array.prototype.slice.call(scope.querySelectorAll("[data-resource]"));
  var sections = Array.prototype.slice.call(scope.querySelectorAll("[data-resource-section]"));

  function activeFilters() {
    return chips
      .filter(function (c) { return c.checked; })
      .map(function (c) { return { key: c.dataset.filterKey, value: c.value }; });
  }

  function matches(card, query, filters) {
    if (query && card.dataset.haystack.indexOf(query) === -1) return false;
    // Filters within the same key are OR'd; different keys are AND'd.
    var byKey = {};
    filters.forEach(function (f) {
      (byKey[f.key] = byKey[f.key] || []).push(f.value);
    });
    return Object.keys(byKey).every(function (key) {
      return byKey[key].some(function (v) {
        var data = card.dataset[key] || "";
        return key === "topics" ? data.split(" ").indexOf(v) !== -1 : data === v;
      });
    });
  }

  var announceTimer = null;
  function apply() {
    var query = (searchInput ? searchInput.value : "").trim().toLowerCase();
    var filters = activeFilters();
    var shown = 0;
    cards.forEach(function (card) {
      var show = matches(card, query, filters);
      card.hidden = !show;
      if (show) shown++;
    });
    sections.forEach(function (sec) {
      var visible = sec.querySelectorAll("[data-resource]:not([hidden])").length;
      sec.hidden = visible === 0;
    });
    if (emptyState) emptyState.hidden = shown !== 0;
    if (status) {
      // Debounce announcements so screen readers aren't flooded per keystroke.
      clearTimeout(announceTimer);
      announceTimer = setTimeout(function () {
        status.textContent =
          shown === 1 ? "1 resource found." : shown + " resources found.";
      }, 400);
    }
  }

  if (searchInput) searchInput.addEventListener("input", apply);
  chips.forEach(function (c) { c.addEventListener("change", apply); });
  clearBtns.forEach(function (clearBtn) {
    clearBtn.addEventListener("click", function () {
      if (searchInput) searchInput.value = "";
      chips.forEach(function (c) { c.checked = false; });
      apply();
      if (searchInput) searchInput.focus();
    });
  });
})();

// ============================================================
// Shared study-data store (local-first, versioned) + UI helpers
// ============================================================
(function () {
  "use strict";
  var KEY = "massTutoringStudyData:v1";

  function blank() {
    return { version: 1, testDateId: null, setup: null, plan: null,
             completedTasks: {}, errorLog: [], checklist: {},
             saved: { nextUp: [], later: [], completed: [] } };
  }
  function load() {
    try {
      var d = JSON.parse(localStorage.getItem(KEY));
      if (!d) return null;
      if (d.version !== 1) return migrate(d);
      return d;
    } catch (e) { return null; }
  }
  function migrate(d) { d.version = 1; return Object.assign(blank(), d); }
  function save(d) { try { localStorage.setItem(KEY, JSON.stringify(d)); } catch (e) {} }

  function nyToday() { // YYYY-MM-DD in America/New_York (DST-safe)
    return new Intl.DateTimeFormat("en-CA", { timeZone: "America/New_York" }).format(new Date());
  }
  function dayDiff(fromISO, toISO) { // whole calendar days between date-only strings
    return Math.round((Date.parse(toISO + "T00:00:00Z") - Date.parse(fromISO + "T00:00:00Z")) / 864e5);
  }
  function fmtDate(iso) {
    return new Date(iso + "T12:00:00Z").toLocaleDateString("en-US",
      { timeZone: "UTC", year: "numeric", month: "long", day: "numeric" });
  }
  function nextSat(schedule, today) {
    var list = (schedule && schedule.administrations) || [];
    for (var i = 0; i < list.length; i++) if (list[i].testDate >= today) return list[i];
    return null;
  }
  function isSaved(d, id) {
    return ["nextUp", "later", "completed"].some(function (g) {
      return d.saved[g].some(function (it) { return it.id === id; });
    });
  }
  function unsave(d, id) {
    ["nextUp", "later", "completed"].forEach(function (g) {
      d.saved[g] = d.saved[g].filter(function (it) { return it.id !== id; });
    });
  }
  function tasksThisWeek(d) {
    var cutoff = Date.now() - 7 * 864e5, n = 0;
    Object.keys(d.completedTasks).forEach(function (k) {
      if (d.completedTasks[k] >= cutoff) n++;
    });
    return n;
  }
  function currentWeekIndex(d) {
    if (!d.plan || !d.plan.startDate) return 0;
    var w = Math.floor(dayDiff(d.plan.startDate, nyToday()) / 7);
    return Math.max(0, Math.min(w, d.plan.weeks.length - 1));
  }
  function todayTask(d) { // recommendation priority per spec §18
    if (!d) return null;
    if (d.plan) {
      var cw = currentWeekIndex(d);
      for (var w = 0; w <= cw; w++) {
        var wk = d.plan.weeks[w];
        if (!wk) continue;
        for (var i = 0; i < wk.tasks.length; i++) {
          var t = wk.tasks[i];
          if (!d.completedTasks[t.id]) {
            return { task: t, overdue: w < cw, week: w };
          }
        }
      }
    }
    var skills = {};
    d.errorLog.forEach(function (e) {
      if (!e.mastered && e.skill) skills[e.skill] = (skills[e.skill] || 0) + 1;
    });
    var top = Object.keys(skills).sort(function (a, b) { return skills[b] - skills[a]; })[0];
    if (top && skills[top] >= 2) {
      return { task: { id: "review-" + top, label: "Review your repeated weak skill: " + top,
                       hint: "Drill it in the official Question Bank, then mark the log entries mastered." } };
    }
    return null;
  }

  // toast (single, polite)
  var toastEl = null, toastTimer = null;
  function toast(msg) {
    if (!toastEl) {
      toastEl = document.createElement("div");
      toastEl.className = "mt-toast";
      toastEl.setAttribute("role", "status");
      document.body.appendChild(toastEl);
    }
    toastEl.textContent = msg;
    toastEl.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.classList.remove("show"); }, 2400);
  }

  window.MT = { KEY: KEY, blank: blank, load: load, save: save, nyToday: nyToday,
                dayDiff: dayDiff, fmtDate: fmtDate, nextSat: nextSat, isSaved: isSaved,
                unsave: unsave, tasksThisWeek: tasksThisWeek, todayTask: todayTask,
                currentWeekIndex: currentWeekIndex, toast: toast };
})();

// ============================================================
// Bookmarks on resource cards
// ============================================================
(function () {
  "use strict";
  var btns = document.querySelectorAll("[data-bookmark]");
  if (!btns.length) return;
  var d = window.MT.load();
  btns.forEach(function (b) {
    if (d && window.MT.isSaved(d, b.dataset.bookmark)) b.setAttribute("aria-pressed", "true");
    b.addEventListener("click", function () {
      var data = window.MT.load() || window.MT.blank();
      var id = b.dataset.bookmark;
      if (window.MT.isSaved(data, id)) {
        window.MT.unsave(data, id);
        b.setAttribute("aria-pressed", "false");
        window.MT.toast("Removed from My Study");
      } else {
        data.saved.later.push({ id: id, name: b.dataset.name, url: b.dataset.url, note: "" });
        b.setAttribute("aria-pressed", "true");
        window.MT.toast("Saved to My Study");
      }
      window.MT.save(data);
    });
  });
})();

// ============================================================
// Resource quick view (drawer; bottom sheet on mobile)
// ============================================================
(function () {
  "use strict";
  var opener = null, root = null;
  function close() {
    if (!root) return;
    root.remove(); root = null;
    document.body.classList.remove("qv-open");
    if (opener) opener.focus();
  }
  function open(btn) {
    var card = btn.closest(".rcard") || document;
    var tpl = card.querySelector('.qv-src[data-qv-id="' + btn.dataset.quickview + '"]');
    if (!tpl) return;
    opener = btn;
    root = document.createElement("div");
    root.className = "qv-root";
    root.innerHTML =
      '<div class="qv-overlay" data-qv-close></div>' +
      '<aside class="qv-panel" role="dialog" aria-modal="true" aria-labelledby="qv-title">' +
      '<div class="qv-head"><div><h2 id="qv-title">' + tpl.dataset.qvName + "</h2>" +
      (tpl.dataset.qvCreator ? '<p class="qv-creator">' + tpl.dataset.qvCreator + "</p>" : "") +
      '</div><button type="button" class="icon-btn qv-close" data-qv-close aria-label="Close details">' +
      '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>' +
      '</button></div><div class="qv-body"></div></aside>';
    root.querySelector(".qv-body").appendChild(tpl.content.cloneNode(true));
    document.body.appendChild(root);
    document.body.classList.add("qv-open");
    root.addEventListener("click", function (e) {
      if (e.target.closest("[data-qv-close]")) close();
    });
    root.addEventListener("keydown", function (e) {
      if (e.key === "Escape") { close(); return; }
      if (e.key !== "Tab") return;
      var f = root.querySelectorAll("a[href], button:not([disabled])");
      if (!f.length) return;
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });
    root.querySelector(".qv-close").focus();
  }
  document.addEventListener("click", function (e) {
    var btn = e.target.closest("[data-quickview]");
    if (btn) open(btn);
  });
})();

// ============================================================
// Next-SAT countdown
// ============================================================
(function () {
  "use strict";
  var el = document.querySelector("[data-sat-countdown]");
  if (!el) return;
  var lastShown = null;
  function render() {
    var sched = window.MT_SAT_SCHEDULE;
    var today = window.MT.nyToday();
    var adm = sched && window.MT.nextSat(sched, today);
    var daysEl = el.querySelector("[data-sc-days]");
    var dateEl = el.querySelector("[data-sc-date]");
    var statusEl = el.querySelector("[data-sc-status]");
    var detailEl = el.querySelector("[data-sc-detail]");
    if (!adm) {
      daysEl.textContent = "—";
      dateEl.textContent = "New SAT dates are being confirmed.";
      statusEl.textContent = "Check the official College Board page for the latest schedule.";
      el.hidden = false;
      return;
    }
    var days = window.MT.dayDiff(today, adm.testDate);
    var label = days === 0 ? "The SAT is today" : days === 1 ? "Tomorrow" : days + " days";
    if (label === lastShown) return;
    lastShown = label;
    daysEl.textContent = label;
    dateEl.textContent = window.MT.fmtDate(adm.testDate);
    dateEl.setAttribute("datetime", adm.testDate);
    if (days === 0) statusEl.textContent = "Good luck — you are ready for this.";
    else if (adm.regularRegistrationDeadline) {
      if (today <= adm.regularRegistrationDeadline) statusEl.textContent = "Registration is open (closes " + window.MT.fmtDate(adm.regularRegistrationDeadline) + ")";
      else if (adm.lateRegistrationDeadline && today <= adm.lateRegistrationDeadline) statusEl.textContent = "Late registration open until " + window.MT.fmtDate(adm.lateRegistrationDeadline);
      else statusEl.textContent = "Registration closed for this date";
    } else statusEl.textContent = "Registration deadlines: check the official dates page";
    var rest = sched.administrations.filter(function (a) { return a.testDate > adm.testDate; }).slice(0, 3);
    detailEl.innerHTML = "<p>Upcoming weekend SATs:</p><ul>" +
      [adm].concat(rest).map(function (a) {
        var dl = a.regularRegistrationDeadline
          ? " — register by " + window.MT.fmtDate(a.regularRegistrationDeadline) +
            (a.lateRegistrationDeadline ? " (late/changes until " + window.MT.fmtDate(a.lateRegistrationDeadline) + ", fees apply)" : "")
          : "";
        return "<li><time datetime=\"" + a.testDate + "\">" + window.MT.fmtDate(a.testDate) + "</time>" + dl + "</li>";
      }).join("") + "</ul><p>Borrowing a device from College Board? Register and request it at least 30 days before test day. Confirm everything on the official page.</p>";
    el.hidden = false;
  }
  render();
  document.addEventListener("visibilitychange", function () { if (!document.hidden) render(); });
  (function scheduleMidnight() {
    var now = new Date(), next = new Date(now); next.setHours(24, 0, 30, 0);
    setTimeout(function () { render(); scheduleMidnight(); }, next - now);
  })();
})();

// ============================================================
// Homepage My Study snapshot
// ============================================================
(function () {
  "use strict";
  var snap = document.querySelector("[data-mystudy-snapshot]");
  if (!snap) return;
  var d = window.MT.load();
  var savedCount = d ? d.saved.nextUp.length + d.saved.later.length + d.saved.completed.length : 0;
  if (!d || (!d.plan && !d.errorLog.length && !savedCount)) return;
  var cta = document.querySelector("[data-mystudy-cta]");
  if (cta) cta.textContent = "Open My Study";
  var rec = window.MT.todayTask(d);
  snap.querySelector("[data-ms-task]").textContent = rec ? rec.task.label : "You're all caught up — open My Study to plan ahead.";
  var days = "–";
  if (d.testDateId && window.MT_SAT_SCHEDULE) {
    var adm = window.MT_SAT_SCHEDULE.administrations.filter(function (a) { return a.id === d.testDateId; })[0];
    if (adm) days = Math.max(0, window.MT.dayDiff(window.MT.nyToday(), adm.testDate));
  }
  snap.querySelector("[data-ms-days]").textContent = days;
  snap.querySelector("[data-ms-done]").textContent = window.MT.tasksThisWeek(d);
  snap.querySelector("[data-ms-saved]").textContent =
    d.saved.nextUp.length + d.saved.later.length + d.saved.completed.length;
  snap.hidden = false;
})();

// ============================================================
// In-guide tutoring nudge — per-session dismissal (Task 2.1)
// ============================================================
(function () {
  "use strict";
  var nudges = document.querySelectorAll("[data-tutoring-nudge]");
  if (!nudges.length) return;
  var KEY = "mtTutoringNudgeDismissed";
  var dismissed = false;
  try { dismissed = sessionStorage.getItem(KEY) === "1"; } catch (e) {}
  nudges.forEach(function (n) {
    if (dismissed) return;            // stays hidden this session
    n.hidden = false;
    var btn = n.querySelector("[data-tn-dismiss]");
    if (btn) btn.addEventListener("click", function () {
      n.hidden = true;
      try { sessionStorage.setItem(KEY, "1"); } catch (e) {}
    });
  });
})();

// ============================================================
// "Download as PDF" — native print-to-PDF, no dependency (Task 3.1)
// ============================================================
(function () {
  "use strict";
  document.addEventListener("click", function (e) {
    var btn = e.target.closest("[data-print]");
    if (!btn) return;
    e.preventDefault();
    // Expand My Study plan/log details so they print in full.
    document.querySelectorAll(".ms-week, .ms-err, .ms-addform").forEach(function (d) {
      if (d.tagName === "DETAILS") { d.dataset.printPrev = d.open ? "1" : "0"; d.open = true; }
    });
    window.print();
  });
  window.addEventListener("afterprint", function () {
    document.querySelectorAll("[data-print-prev]").forEach(function (d) {
      d.open = d.dataset.printPrev === "1";
      delete d.dataset.printPrev;
    });
  });
})();
