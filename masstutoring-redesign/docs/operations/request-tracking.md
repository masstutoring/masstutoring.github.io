# Spec: Request tracking

**Goal:** every tutoring request or educator referral is captured once, acknowledged
quickly, and driven to a clear resolution — without ever storing student PII in this
public repository.

## Where requests come from

- The public tutoring intake and educator-referral forms both `mailto:` the shared
  inbox (`masstutoringea@gmail.com`). No form data touches a server we run.
- Direct emails from students, families, counselors.

## Where requests live (operational, private)

A single private, access-controlled tracker (a spreadsheet or a form-backend the
team controls — **not** this repo). One row per request.

### Fields to capture

| Field | Notes |
| --- | --- |
| Request ID | Sequential or date-based, e.g. `2026-0142` |
| Received date | |
| Source | intake form / educator referral / direct email |
| Student first name or initial | Minimize; never store more than needed |
| Contact method | One channel the student/guardian chose |
| Grade | |
| Target test date | |
| Subjects needed | Math / R&W / both |
| Availability | Free-text |
| Guardian aware? | For minors, note whether a guardian is looped in |
| Status | `new → acknowledged → matching → matched → active → closed` |
| Assigned tutor | Link to match record (see tutor-matching.md) |
| Last update | Date + who |
| Deletion requested? | If yes, honor and purge (see below) |

## Service commitment

- **Acknowledge within ~1 week** (the promise made publicly on
  [/tutoring/what-happens-next/](../../src/pages/tutoring-what-happens-next.html)).
- If at capacity, say so honestly and point to the SAT Guide and any group session —
  never leave a request silently unresolved.

## Status lifecycle

```
new ──▶ acknowledged ──▶ matching ──▶ matched ──▶ active ──▶ closed
  │                                                            ▲
  └────────────── declined / at-capacity / withdrawn ──────────┘
```

## Retention & deletion

- Purge a request's PII when it is `closed` and no longer needed, or **immediately**
  on a deletion request (public promise on [/privacy/](../../src/pages/privacy.html)).
- Keep only de-identified aggregates for impact reporting (see impact-data.md).
- Never export this tracker into the public repo, an artifact, or any shared link.
