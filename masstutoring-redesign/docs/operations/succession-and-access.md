# Spec: Succession & access runbook

**Goal:** a student-run program survives its founders graduating. Access and
knowledge must transfer cleanly, and no single person can be a permanent point of
failure.

## Roles (assign real people; rotate before graduation)

| Role | Responsibility |
| --- | --- |
| Lead / coordinator | Owns the request tracker and matching; primary inbox responder |
| Tutor lead | Roster, onboarding, safeguarding completion tracking |
| Content maintainer | Runs the content-review schedule; owns `sat-dates.json` accuracy |
| Site maintainer | Builds/deploys the static site; owns this repo |
| Adult overseer | Safeguarding accountability; named contact for schools/families |

> As of this writing the adult-advisor role is **in progress**, not yet filled. It
> must be in place before any in-person program (e.g. the proposed Access Corps) runs.

## Access inventory (keep current in a private, access-controlled vault)

- Shared inbox (`masstutoringea@gmail.com`) credentials / recovery.
- GitHub org + repo admin (`masstutoring/masstutoring.github.io`).
- Domain / DNS registrar for masstutoring.com.
- Any form-backend or tracker tooling.
- The private request tracker, tutor roster, and session logs.

For **each** item record: what it is, who currently has access, how access is
granted/revoked. Never store the secrets themselves in this repo.

## Handover checklist (run every spring, before graduations)

1. Name successors for each role above.
2. Grant them access to each inventory item; confirm they can actually use it.
3. Walk through one full request → match → session cycle together.
4. Review the content-review schedule and run one cycle jointly.
5. **Revoke** access for anyone leaving.
6. Update this runbook's role table with the new names + date.

## Continuity risks to watch

- Single-owner inbox or GitHub access (bus factor of 1).
- Adult-overseer role unfilled while offering in-person programs.
- Undocumented tooling only one person understands.
