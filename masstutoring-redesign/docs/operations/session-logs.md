# Spec: Session logs

**Goal:** keep a light, honest record of each tutoring session — enough for
safeguarding, continuity, and de-identified impact reporting — and nothing more.

This record is **private and access-controlled**. It never enters this repo or the
public site.

## One record per session

| Field | Notes |
| --- | --- |
| Session ID | e.g. `2026-0142-03` (request ID + session number) |
| Date & time | On an approved platform |
| Tutor | |
| Student | First name / initial only in the log; full identity lives only in the request record |
| Subject / focus | e.g. "Math — linear equations" |
| Platform | Must be an approved, adult-visible channel |
| Duration | |
| Attended? | held / no-show / rescheduled |
| Notes | Brief, factual, no sensitive personal detail |
| Follow-up | Next session or "completed" |

## Why each field exists

- **Safeguarding:** documented time, platform, and participants back the commitments
  on the public [/safeguarding/](../../src/pages/safeguarding.html) page.
- **Continuity:** if a tutor graduates or steps back, another can pick up.
- **Impact:** counts of *sessions held* and *students supported* — de-identified —
  are the only figures that may later be published (see impact-data.md).

## Constraints

- No transcripts, no recordings stored beyond what a platform requires, no sensitive
  personal narrative.
- Access limited to the coordinator(s) and the adult overseer.
- Retention: keep de-identified counts; purge identifying detail on the same schedule
  as request records, or immediately on a deletion request.
