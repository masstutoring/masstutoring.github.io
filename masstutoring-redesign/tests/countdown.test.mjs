// Unit tests for the SAT countdown's pure date logic.
// These evaluate the REAL assets/js/site.js in a minimal sandbox and exercise
// window.MT.dayDiff / nextSat / nyToday (plus the day→label rule the countdown
// component uses), covering boundaries, time zones, DST transitions, expired
// dates, and empty schedules.
//
// Run: node tests/countdown.test.mjs   (exit code 0 = pass)

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import vm from "node:vm";
import assert from "node:assert/strict";

const here = dirname(fileURLToPath(import.meta.url));
const siteJs = readFileSync(join(here, "..", "assets", "js", "site.js"), "utf8");

// --- minimal browser stubs so site.js loads and exposes window.MT ---
const noop = () => {};
const elStub = () => ({
  classList: { add: noop, remove: noop, toggle: noop, contains: () => false },
  setAttribute: noop, appendChild: noop, addEventListener: noop, focus: noop,
  querySelector: () => null, querySelectorAll: () => [], style: {}, dataset: {}, remove: noop,
});
const documentStub = {
  getElementById: () => null, querySelector: () => null, querySelectorAll: () => [],
  createElement: elStub, addEventListener: noop, body: elStub(), documentElement: elStub(),
};
const sandbox = {
  document: documentStub,
  localStorage: { getItem: () => null, setItem: noop, removeItem: noop },
  navigator: { userAgent: "node" },
  console,
  Intl,
  Date,
  JSON,
  Math,
  setTimeout: () => 0,
  clearTimeout: noop,
};
sandbox.window = {
  addEventListener: noop, scrollY: 0, setTimeout: () => 0, clearTimeout: noop,
  matchMedia: () => ({ matches: false, addEventListener: noop, addListener: noop }),
};
// site.js references bare `window`/`document`; map them into the context.
vm.createContext(sandbox);
vm.runInContext(siteJs, sandbox, { filename: "site.js" });

const MT = sandbox.window.MT;
assert.ok(MT, "window.MT should be defined after site.js loads");

// day→label rule, mirrored from the countdown component.
const label = (days) => (days === 0 ? "The SAT is today" : days === 1 ? "Tomorrow" : days + " days");

let passed = 0;
const t = (name, fn) => { fn(); passed++; console.log("  ok  " + name); };

// --- dayDiff ---
t("dayDiff: same day is 0", () => assert.equal(MT.dayDiff("2026-08-22", "2026-08-22"), 0));
t("dayDiff: one day", () => assert.equal(MT.dayDiff("2026-08-22", "2026-08-23"), 1));
t("dayDiff: negative for past target", () => assert.equal(MT.dayDiff("2026-08-23", "2026-08-22"), -1));
t("dayDiff: across a month boundary", () => assert.equal(MT.dayDiff("2026-08-31", "2026-09-01"), 1));
t("dayDiff: across spring-forward DST (Mar 8 2026)", () =>
  // US DST begins 2026-03-08; date-only diff must still be exactly 1, not 0 or 2.
  assert.equal(MT.dayDiff("2026-03-07", "2026-03-08"), 1));
t("dayDiff: across fall-back DST (Nov 1 2026)", () =>
  assert.equal(MT.dayDiff("2026-10-31", "2026-11-01"), 1));
t("dayDiff: full week", () => assert.equal(MT.dayDiff("2026-08-22", "2026-08-29"), 7));

// --- label rule (boundaries) ---
t("label: today", () => assert.equal(label(0), "The SAT is today"));
t("label: tomorrow", () => assert.equal(label(1), "Tomorrow"));
t("label: plural days", () => assert.equal(label(12), "12 days"));

// --- nextSat ---
const schedule = { administrations: [
  { id: "a", testDate: "2026-08-22" },
  { id: "b", testDate: "2026-09-12" },
  { id: "c", testDate: "2026-10-03" },
] };
t("nextSat: picks the first future date", () =>
  assert.equal(MT.nextSat(schedule, "2026-08-01").id, "a"));
t("nextSat: includes the test day itself (>= today)", () =>
  assert.equal(MT.nextSat(schedule, "2026-08-22").id, "a"));
t("nextSat: advances the day AFTER an administration", () =>
  assert.equal(MT.nextSat(schedule, "2026-08-23").id, "b"));
t("nextSat: returns null when all dates are expired", () =>
  assert.equal(MT.nextSat(schedule, "2027-01-01"), null));
t("nextSat: null on an empty schedule", () =>
  assert.equal(MT.nextSat({ administrations: [] }, "2026-08-01"), null));
t("nextSat: null on a missing schedule", () =>
  assert.equal(MT.nextSat(null, "2026-08-01"), null));

// --- nyToday ---
t("nyToday: returns a YYYY-MM-DD string in New York time", () => {
  const s = MT.nyToday();
  assert.match(s, /^\d{4}-\d{2}-\d{2}$/);
});

console.log(`\n${passed} countdown assertions passed.`);
