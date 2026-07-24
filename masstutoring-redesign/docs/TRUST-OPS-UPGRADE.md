# Trust, Tutoring Operations, Partnership & Impact upgrade

Date: 2026-07-23. This documents the changes made for the "Trust, Tutoring
Operations, Partnership, and Impact Upgrade" brief, and — importantly —
separates what is **done in code** from what is an **operational commitment
requiring real people** and what is **awaiting human verification**.

Guiding rule, applied throughout: *adding something to a webpage never makes an
operational claim true.* Nothing here publishes an invented number, testimonial,
or partnership.

---

## 1. What shipped in code

| Area | Change |
| --- | --- |
| **Countdown reliability** | Internal `console.warn` when the SAT schedule nears its last date or has none; unit tests (`tests/countdown.test.mjs`) covering boundaries, time zones, DST, expired, and empty schedules. The component already handled the fallback/Tomorrow/today states, official-dates link, and midnight + visibility recalculation. |
| **Branded tutoring request** | New `/tutoring/request/` explains everything up front (free, who it's for, what tutoring can't promise, response process, ~1-week matching, capacity behavior, what's collected, who sees it, deletion, safety reporting, accommodations) then opens the existing Google Form. New `/tutoring/request/submitted/` confirmation with next steps, response window, correction/withdrawal, and what to study while waiting. Homepage, tutoring page, and the contextual nudge now point here. |
| **Tutor-quality messaging** | Reframed across tutoring, homepage, what-happens-next, and for-educators: tutors are *selected and trained* for subject mastery, clear explanation, patience, reliability, training, and a signed conduct/safeguarding agreement — with a 1530+ score as **one factor**, not proof of teaching ability. |
| **Claim qualification** | Softened the "$200+/hour" figure to measured language ("well over $100 an hour") on the tutoring and mission pages. |
| **Data-driven program status** | Access Corps status now comes from `src/data/program-status.json` (states: concept, seeking-pilot-partner, pilot-scheduled, pilot-active, pilot-completed, paused) via a `<!-- program-status: accessCorps -->` marker — not hand-edited marketing copy. Currently `seeking-pilot-partner`. |
| **Data-driven impact** | `src/data/impact-metrics.json` + a `<!-- impact-metrics -->` marker. Renders **nothing** until a metric is both `approvedForPublication` and `verifiedBy` a reviewer, so the Impact page keeps its honest empty state. Rendered metrics show definition, period, category, sample size/response rate, and a self-reported label. |
| **Partner pathway** | Expanded request types (refer a student, one-time workshop, Digital SAT orientation, diagnostic-review clinic, six-week Access Corps pilot, printable materials, ongoing partnership) plus organization / role / approximate-student-count fields on the For Educators & Partners form. |

Design discipline (brief §17) preserved: no new button clusters, one primary
action per section, secondary actions as text links, existing card/icon system,
honest empty states retained.

---

## 2. Claims registry (reviewed this pass)

`PublicClaim` shape from the brief. Statuses: verified / needs-source /
needs-operational-confirmation / outdated / remove.

| id | text (paraphrased) | route | category | status | action taken |
| --- | --- | --- | --- | --- | --- |
| tutor-score | Tutors scored 1530+ | multiple | qualification | needs-operational-confirmation | Kept the threshold (the org's real bar) but reframed as one selection factor, not proof of teaching |
| tutor-training | Tutors are "trained" | tutoring, etc. | qualification | needs-operational-confirmation | Reworded to name the concrete selection + training + conduct-agreement steps; the actual training must exist (see §3) |
| match-week | Match within ~1 week | tutoring, request | response-time | needs-operational-confirmation | Kept as "we aim to" / "typically"; depends on the operational workflow being run |
| price-200 | Private tutoring "$200+/hour" | mission, tutoring | pricing | needs-source | Softened to "well over $100 an hour" (measured, defensible) |
| income-score | Income↔score correlation | mission | research | verified | Well-documented; kept as correlation, not causation |
| every-resource-verified | "Every resource verified" | guide | program | verified | Each record carries `dateLastReviewed`; keep the monthly content-review running |
| no-sharing | "We don't sell or share your information" | privacy, tutoring | program | needs-operational-confirmation | True by intent; must remain an enforced practice |
| access-corps-status | Access Corps described as a proposal | access-corps | program | verified | Now sourced from `program-status.json`, not prose |
| impact-numbers | (none published) | impact | impact | verified | Honest empty state preserved; data-gated rendering added |
| founder-scores | Founder-attested scores | mission/about | founder | needs-source | Labeled founder-attested; unchanged this pass |

No unsupported numerical claim is left presented as fact.

---

## 3. Operational — requires real people (NOT code)

These are **specifications**, delivered as docs, because a static GitHub Pages
site must never hold student PII. See also `docs/operations/`.

### Request workflow & states
`new → acknowledged → reviewing → waiting-for-tutor → contacted → matched →
active → completed` plus `withdrawn` / `closed-unmatched`. Tracked in a private,
access-controlled tool (spreadsheet/Airtable) — not this repo. Alerts to run:
unacknowledged requests, requests past the public response window, unconfirmed
matches, approaching test dates, tutor no-shows, pending deletions, stale
waitlist entries. Full model in `docs/operations/request-tracking.md`.

### Tutor profile model
```ts
interface TutorProfile {
  id; status: "applicant"|"screening"|"training"|"active"|"paused"|"inactive";
  verifiedScore?; subjectStrengths[]; availability[]; timeZone; languages?;
  teachingDemoCompleted; trainingCompleted; conductAgreementSigned;
  groupSessionApproved; capacity; activeStudentCount;
}
```
Private records only — never published. Selection is multi-factor (see §1).

### Session & attendance model
```ts
interface TutoringSession {
  id; requestId; tutorId; scheduledAt; durationMinutes?;
  format: "virtual"|"partner-site"|"group";
  attendance: "scheduled"|"completed"|"student-no-show"|"tutor-no-show"|"cancelled";
  subjectAreas[]; skillTags[]; nextStep?; studentFeedbackRequested; concernFlagged;
}
```
Topic tags, not personal narratives. Detail in `docs/operations/session-logs.md`.

### Feedback flow (optional, 2–3 questions)
Understand your next step? · Want another session? · Anything to improve? ·
**Did anything make you uncomfortable?** — the safety question routes
**separately** for immediate review, never mixed with satisfaction data.

### Waitlist
`waiting-for-tutor` requests, ordered by submission date and test-date urgency;
students told honestly when at capacity; capacity/at-capacity counts tracked as
the recruit-more-tutors signal.

### Tutor training handbook
A private/downloadable handbook (diagnose misconceptions, explain vs. answer,
questioning, reviewing misses, supporting stressed students, session structure,
boundaries, communicating with minors, privacy, safeguarding, no-show handling,
reporting, accessibility, cultural humility, proper use of official materials,
no score/admissions guarantees) + the standard 9-step session structure. **Must
be authored by the team** — it is a real commitment, not web copy.

### Contact addresses & advisor
Role-based addresses (hello@ / tutoring@ / partners@ / safety@) should be
configured, tested, and monitored **before** replacing the current shared inbox.
Retention periods and any "compliance" language wait on an adult advisor /
qualified reviewer (role still to be filled — see `docs/operations/
succession-and-access.md`).

---

## 4. Analytics event dictionary (privacy-first, aggregate only)

If/when a cookieless, privacy-first analytics tool is adopted and disclosed, use
these aggregate events. **No personal data, no PII, no query-string identifiers.**

Funnel (each a count, tied to path + date bucket):
`homepage_view → tutoring_view → request_view → request_opened → request_submitted`
then operational stages tracked off-site: `request_acknowledged → match_offered →
match_confirmed → first_session_completed → additional_session → program_completed`.

Also: `guide_tutoring_prompt_click`, `partner_view`, `partner_inquiry_submitted`,
`workshop_requested`, `resource_open`, `printable_download`, `countdown_failure`
(fires with the internal warning above).

My Study `localStorage` is **never** an analytics source. See
`docs/operations/analytics-events.md`.

---

## 5. Deliverables status (code / operational / awaiting verification)

| Brief deliverable | Status |
| --- | --- |
| Fixed countdown + tests | ✅ code |
| Branded tutoring intake + confirmation | ✅ code (Google Form backend) |
| Updated tutoring / tutor-quality messaging | ✅ code |
| Contextual tutoring component | ✅ already shipped; now targets `/tutoring/request/` |
| Partner landing + expanded inquiry | ✅ code (mailto transport; swap in a partner Form when ready) |
| Access Corps status system | ✅ code (data-driven) |
| Impact metric system | ✅ code (data-gated; empty state kept) |
| Resource visuals + asset manifest | ✅ shipped previously (`docs/RESOURCE-EXPANSION.md`) |
| Claims audit / registry | ✅ this doc + `docs/CLAIMS-AUDIT.md` |
| Analytics event dictionary | ✅ this doc + `docs/operations/analytics-events.md` |
| Privacy/deletion, content-review registry | ✅ `docs/operations/` + `docs/RESOURCE-EXPANSION.md` |
| Secure operations architecture / request-status / tutor-profile / session / waitlist / feedback | 📋 spec only — **operational, real people** (§3). A static site must not hold PII |
| Tutor training infrastructure | 📋 operational — team must author the handbook |
| Role-based email addresses, adult advisor, retention periods | ⏳ awaiting human setup/verification |
| Real impact numbers, real pilot/partner status | ⏳ awaiting real data / signed agreements before publication |
| Official logo binaries | ⏳ awaiting an environment that can host assets (see `RESOURCE-EXPANSION.md`) |

---

## 6. Deployment & rollback

- **Build:** `cd masstutoring-redesign && python3 build.py` → outputs to `site/`.
- **Deploy:** `cp -r site/. ..` copies into the repo root, which GitHub Pages
  serves from `main`. Merging to `main` publishes.
- **Verify:** run `node tests/countdown.test.mjs`; load `/tutoring/request/`,
  `/access-corps/`, and `/impact/`; confirm the countdown renders and no console
  errors.
- **Rollback:** revert the merge commit on `main` (or `git revert <sha>`), which
  redeploys the previous build. All changes here are static HTML/CSS/JS + JSON
  data — no migrations, no server state to unwind.
