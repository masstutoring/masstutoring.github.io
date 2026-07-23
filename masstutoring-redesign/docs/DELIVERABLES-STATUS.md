# Deliverables status — Trust, Tutoring Access, Impact & Growth

This maps the "Trust, Tutoring Access, Impact, and Growth" brief to what actually
shipped, what still needs **non-technical / human** action, what was **intentionally
not built**, and the **remaining risks**. It exists so the team knows exactly where
things stand and what only they (not the website) can do next.

## 1. Shipped as code (public site)

| Area | What shipped |
| --- | --- |
| Claims honesty | `docs/CLAIMS-AUDIT.md` — site confirmed free of invented numbers, testimonials, partnerships, or AI-tutor claims |
| Trust pages | `/privacy/`, `/safeguarding/`, `/impact/` (no invented numbers), `/tutoring/what-happens-next/` |
| Tutoring clarity | Tutoring page: "what tutoring can't promise", safety/privacy section; hero "Request Free Tutoring" CTA |
| Discovery | `/sat-guide/diagnose/`; contextual tutoring nudges on practice & study-plans guides |
| Access & partners | `/for-families/`; `/for-educators/` expanded (refer / workshop / pilot / partnership); footer links |
| Access Corps | `/access-corps/` — **clearly labeled a proposal, not an active service** |
| My Study | Dismissible tutoring escalation when the same weak skill is logged 3+ times |
| Offline | Print/PDF buttons on start-here, study-plans, test-day |
| Operations | `docs/operations/*` — honest specs for the systems that must live off-site |

## 2. Needs human / non-technical action (the site can't do these)

| Item | Owner | Notes |
| --- | --- | --- |
| Fill the **adult-overseer / advisor** role | Team | Required before any in-person program (Access Corps) runs |
| Stand up the **private request tracker + tutor roster** | Coordinator | Per `docs/operations/` — access-controlled, off-repo |
| Actually **run the ~1-week acknowledgement** commitment | Coordinator | The site promises it; humans keep it |
| Recruit/onboard tutors with **safeguarding** completed | Tutor lead | Gate for matching |
| Find a **first Access Corps pilot partner** | Team | Page invites this; conversation is human |
| Compile **real impact numbers** when records exist | Coordinator | Only then does `/impact/` gain figures — never before |
| Run the **content-review schedule** (esp. SAT dates) | Content maintainer | `docs/operations/content-review.md` |
| Complete the **succession/access handover** each spring | Lead | `docs/operations/succession-and-access.md` |
| Decide on (optional) **privacy-first analytics** | Team | Definitions ready; adoption is a choice + disclosure |

## 3. Intentionally NOT built (and why)

| Not built | Why |
| --- | --- |
| Request database / admin dashboard on the site | A public GitHub Pages repo must never hold minors' PII |
| Tutor–student matching engine in the browser | Matching involves real people + safeguarding; belongs in a private tool |
| Session logs / attendance tracking UI | Sensitive; access-controlled off-site only |
| Accounts / login | My Study is deliberately account-free, local-first |
| Fabricated impact metrics, testimonials, or partner logos | Honesty rule — never publish what we can't substantiate |
| "Active program" framing for Access Corps | It isn't running; presenting it as active would be dishonest |

These are delivered instead as **written specs** in `docs/operations/`.

## 4. Remaining risks

| Risk | Mitigation in place | Residual |
| --- | --- | --- |
| Stale SAT dates mislead students | `sat-dates.json` + `lastVerified` + monthly review spec | Depends on humans running the review |
| Capacity: more requests than tutors | Honest "at-capacity" messaging; capacity tracked | Needs ongoing tutor recruitment |
| Safeguarding gap before adult overseer is named | Public commitments + `access-corps` labeled proposal | Real gap until the role is filled |
| Bus factor on inbox/GitHub/domain access | Access inventory + spring handover spec | Depends on execution |
| Drift toward unverifiable claims over time | Quarterly claims audit spec | Needs discipline each cycle |
| PII leaking into the repo | Rule #1 + no student data collected on-site | Human vigilance on any future tooling |

## How to keep this current

Update this file whenever a brief item moves between sections (e.g. the advisor role
gets filled, or real impact numbers get published). It's the single place to see
"what's real vs. what's still a plan."
