# Spec: Tutor matching

**Goal:** turn an acknowledged request into a good, safe tutor↔student pairing, using
a simple, repeatable process a volunteer coordinator can run by hand.

## Inputs

- An acknowledged request (see request-tracking.md).
- A **tutor roster** kept in the same private, access-controlled space. Per tutor:
  name, contact, subjects, weekly availability, capacity (max active students),
  onboarding/safeguarding completed (yes/no + date), active student count.

## Matching order (first workable match wins — this is not an algorithm to over-engineer)

1. **Eligibility gate.** Tutor has completed safeguarding onboarding and is under
   capacity. If not eligible, skip.
2. **Subject fit.** Tutor covers the requested subject(s).
3. **Availability overlap.** At least one shared weekly window.
4. **Load balancing.** Prefer the eligible tutor with the fewest active students, to
   spread load and avoid burnout.
5. **Tie-break.** Coordinator judgment (continuity, prior rapport, language, etc.).

## Steps

1. Coordinator picks the match, sets request status `matching → matched`, and records
   the pairing (request ID ↔ tutor).
2. Introduce over an **approved platform** with an adult in the loop per
   safeguarding rules — never a private channel set up ad hoc.
3. Confirm the first session; set status `active`.
4. Increment the tutor's active-student count.

## No-match / capacity

- If no eligible tutor fits, mark the request `at-capacity`, tell the student
  honestly (per the public promise), and offer the SAT Guide / group options.
- Track at-capacity counts over time — it's the clearest signal of when to recruit
  more tutors (see succession-and-access.md).

## Safety constraints (non-negotiable)

- Only safeguarding-onboarded tutors may be matched.
- All contact happens on approved, logged channels (see session-logs.md).
- Coordinators never share a student's full contact list with a tutor beyond the one
  agreed channel.
