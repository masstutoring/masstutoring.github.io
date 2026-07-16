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
  var clearBtn = tools.querySelector(".clear-filters");
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
  if (clearBtn) {
    clearBtn.addEventListener("click", function () {
      if (searchInput) searchInput.value = "";
      chips.forEach(function (c) { c.checked = false; });
      apply();
      if (searchInput) searchInput.focus();
    });
  }
})();
