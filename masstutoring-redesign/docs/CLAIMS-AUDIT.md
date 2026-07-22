# Public Claims Audit (Phase Zero)

Audited 2026-07. Every public claim on masstutoring.com involving the
categories the brief calls out. Schema mirrors the brief's `PublicClaim`.

Legend for `status`: **verified** (true & sourced) · **founder-attested**
(true per the founders, not independently verifiable) · **qualitative**
(widely-documented general claim, no specific figure) · **needs-review**
(operational value that must be re-confirmed on a schedule).

| id | claim | route(s) | status | note / evidence |
|----|-------|----------|--------|-----------------|
| tutor-threshold | Tutors scored **1530+** on the digital SAT | /, /tutoring/, /sat-guide/, /mission/, /for-educators/, tutoring meta | **verified (consistent)** | Uniform across all pages. No `1540` anywhere — nothing to reconcile. Operationally, tutor scores must actually be verified before a tutor is activated (operational, see OPERATIONS.md). |
| founder-scores | Founders scored **1550 and 1560** via self-study | /mission/ | **founder-attested** | First-person founder bios, not aggregate/outcome stats. Presented as their own results. Not used as a promise to students. |
| free | Tutoring & guide are **completely free / no account** | site-wide | **verified** | True: no payment path, no login, on-device My Study only. |
| response-time | "We typically match … **within one week**" | /tutoring/ | **needs-review** | Owner-confirmed (2026). Must stay honest — reframed to "we'll confirm your request and whether a tutor is currently available." Re-verify against real matching capacity each term. |
| cost-of-tutoring | SAT tutoring "**commonly costs $200+/hour**" | /mission/, /tutoring/ | **qualitative** | Widely-reported market range, not an invented precise figure. Owner elected to keep. |
| income-score | "**well-documented correlation** between family income and SAT scores" | /mission/ | **qualitative** | Well-established in education research; stated qualitatively, no fabricated figure. Owner elected to keep. |
| independence | "Independent — not affiliated with or endorsed by College Board" | footer, official sections | **verified** | Correct and prominent. |

## Categories checked and found ABSENT (nothing to remove)

- **Number of students helped / tutors / sessions / partners** — none published anywhere. (The pre-redesign fake "1,842 students helped" counter was already removed.)
- **Score-improvement / outcome claims** — none. No "students gained X points."
- **Testimonials** — none on the site.
- **Partnerships / school endorsements** — none claimed.
- **AI tutor / "S(Ai)T" / BetterQ** — no references in `src/` or JS. Nothing to redirect or relabel.
- **Number of resources** — the guide says "30+ reviewed resources," which is literally true against `resources.json` (verify count stays ≥30 on edits).

## Inconsistencies found

None. The only value needing ongoing attention is the **response-time**
statement (operational — depends on real capacity).

## Unsupported claims removed

None required — no unsupported/invented claims exist in the current site.

## Ongoing rule

Any future impact number must come from the documented data model
(see IMPACT-DATA-MODEL.md) with a defined collection method and adult
approval before it goes public. No illustrative/placeholder numbers.
