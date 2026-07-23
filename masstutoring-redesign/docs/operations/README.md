# Mass Tutoring — Operations specs

This folder documents the **operational systems** behind Mass Tutoring as written
specifications, not as software. The public website is a static site hosted on
GitHub Pages: it can safely hold public information and a private, on-device study
planner, but it must **never** hold a database of students' personal information,
an admin dashboard, session logs, or authentication. Anything that stores a
minor's contact details or tracks real people belongs in an access-controlled
operational tool run by the team — not in this public repository.

These specs exist so the volunteer team runs the program **consistently and
safely** using ordinary, access-controlled tools (a shared inbox, a private
spreadsheet or form backend, a calendar). They describe *what to capture and how
to handle it*, deliberately without prescribing a specific vendor.

| Spec | What it covers |
| --- | --- |
| [request-tracking.md](./request-tracking.md) | How an incoming tutoring/referral request is captured and tracked to resolution |
| [tutor-matching.md](./tutor-matching.md) | How a request becomes a tutor↔student match |
| [session-logs.md](./session-logs.md) | What is recorded for each tutoring session, and why |
| [impact-data.md](./impact-data.md) | The only numbers we may ever publish, and how they're derived |
| [content-review.md](./content-review.md) | The recurring schedule for keeping resources and SAT dates accurate |
| [succession-and-access.md](./succession-and-access.md) | Keeping the program alive across graduating cohorts |
| [analytics-events.md](./analytics-events.md) | Privacy-respecting, optional analytics — event definitions only |

## Non-negotiable rules

1. **No student PII in this repo or on the public site.** Ever.
2. **No invented numbers.** See `impact-data.md` — every published figure traces to
   a real, dated record.
3. **Least data.** Collect only what a match requires; delete on request; delete on
   a schedule.
4. **Adult oversight.** Safeguarding commitments on the public
   [/safeguarding/](../../src/pages/safeguarding.html) page are operational
   requirements, not marketing.
