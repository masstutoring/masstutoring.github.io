# Spec: Impact data

**Goal:** be able to show honest impact **without ever inventing a number.** Every
figure that appears on the public [/impact/](../../src/pages/impact.html) page must
trace to a real, dated operational record.

## The rule

> If we cannot point to the records that produced a number, we do not publish it.

No estimates, no "students helped" rounded up, no score-improvement claims we can't
substantiate, no testimonials we didn't receive with permission.

## Numbers we *may* publish (once real records exist)

Derived only from the request tracker and session logs, de-identified and aggregated:

| Metric | Source | Definition |
| --- | --- | --- |
| Tutoring requests received | request tracker | Count of requests in a period |
| Students matched | request tracker | Distinct students reaching `matched`+ |
| Sessions held | session logs | Sessions with `attended = held` |
| Active tutors | tutor roster | Tutors with ≥1 active student in the period |
| Resources verified | verification log | Resources with a current verification date |

Each published number carries the **period** it covers and the date it was compiled.

## Numbers we must NOT publish

- Score improvements / point gains (we don't measure students' real scores).
- Any per-student outcome.
- Partnerships or endorsements not in writing.
- Anything projected, targeted, or hoped-for stated as if achieved.

## Testimonials / quotes

Only with **explicit written permission**, attributed exactly as the person allows
(often first name + role), and never edited to change meaning. Absent that, the
impact page stays qualitative and honest about being early-stage.

## Compilation process

1. Pull counts from the private tracker/logs for the period.
2. De-identify (counts only — no names).
3. Record the compile date and source in `../VERIFICATION-LOG.md`.
4. Update the `/impact/` page; state the period and "as of" date.
