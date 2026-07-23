# Spec: Analytics events

**Goal:** understand whether the site helps students — **without** tracking
individuals, building profiles, or collecting personal data. Analytics are
**optional** and, if adopted, must be privacy-respecting by design.

## Principles

- **No personal data, no cross-site tracking, no ad networks.**
- Prefer a privacy-first, cookieless approach (aggregate counts only). If none is in
  place, the site functions perfectly without any analytics — this is a nice-to-have.
- The on-device study planner's data (`localStorage`) is the student's alone and is
  **never** transmitted. Nothing in My Study is an analytics source.
- Be transparent on the [/privacy/](../../src/pages/privacy.html) page about whatever
  is (or isn't) collected.

## Event definitions (aggregate counts only — no user IDs)

| Event | When | Why it's useful |
| --- | --- | --- |
| `guide_view` | A guide page loads | Which resources students actually reach |
| `resource_open` | An outbound resource link is clicked | Which resources get used |
| `tutoring_intent` | Tutoring intake form opened/submitted | Demand for tutoring |
| `educator_referral` | Educator referral form submitted | Partner/counselor engagement |
| `my_study_start` | A student begins the study-plan wizard | Planner adoption |
| `countdown_view` | SAT countdown rendered | Interest in dates/deadlines |
| `print_page` | A "print/PDF" button is used | Demand for offline copies |

Each is a **count**, tied to a page path and date bucket — never to a person.

## What is explicitly out of scope

- Any identifier that could re-identify a visitor.
- Session recording, heatmaps tied to individuals, fingerprinting.
- Selling, sharing, or exporting any of it.

Until a privacy-first tool is deliberately adopted and disclosed, treat this spec as a
**definition of terms**, not an active data flow.
