# Spec: Content review schedule

**Goal:** keep the public site accurate — especially SAT dates, deadlines, and
resource links — so a student never acts on stale information.

## Recurring reviews

| Cadence | What to check | Where |
| --- | --- | --- |
| **Monthly** | All external resource links still resolve and point to the right thing | `src/data/` resource entries; guide pages |
| **Monthly** | SAT dates & registration deadlines match College Board's official published schedule | `src/data/sat-dates.json` |
| **Each new College Board release** | Add newly announced administrations; update the `lastVerified` date | `src/data/sat-dates.json` |
| **Quarterly** | Claims audit still holds (no drift toward unverifiable claims) | `../CLAIMS-AUDIT.md` |
| **Quarterly** | Accessibility spot-check (contrast, focus, mobile at 320–375px) | `../ACCESSIBILITY-AUDIT.md` |
| **On any content change** | `lastVerified` / verification-log entry updated | `../VERIFICATION-LOG.md` |

## SAT dates procedure (highest-stakes)

1. Open College Board's official SAT dates page.
2. Compare every row in `sat-dates.json`: test date, regular deadline, late deadline.
3. Correct any mismatch; bump `lastVerified` to today.
4. Rebuild (`python3 build.py`) and redeploy so `mt-data.js` and the countdown update.
5. Log the check in `VERIFICATION-LOG.md`.

> History note: a prior recall of these dates was wrong and was corrected against the
> official source. This is exactly why the schedule and the `lastVerified` stamp
> exist — treat the official page as the only source of truth.

## Ownership

Assign each cadence to a named role (see succession-and-access.md) so reviews survive
graduating cohorts. A missed review is a content-accuracy risk, not a cosmetic one.
