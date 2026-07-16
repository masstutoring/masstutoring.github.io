# Resource Verification Log — July 15, 2026

Method: web search to confirm identity/offering + HTTP check of every published URL
(`python3 build.py --check`). All published URLs return 200 except where noted.

## Official College Board (all verified)

| Resource | URL | Notes |
|---|---|---|
| SAT Suite Question Bank | satsuitequestionbank.collegeboard.org | Free, no account, filterable official questions |
| Bluebook | bluebook.collegeboard.org | 10+ full-length adaptive tests as of Feb 2026 (Test 11 added) |
| Practice tests hub | satsuite.collegeboard.org/practice/practice-tests | Adaptive + linear formats |
| Registration / dates / fee waivers / scores / accommodations | satsuite.collegeboard.org, accommodations.collegeboard.org | Policy pages — linked rather than summarized |

Note: collegeboard.org rejects old TLS clients; the link checker uses `curl`
(modern TLS) for this reason. All URLs verified 200.

## Official practice partner

- **Khan Academy Digital SAT** (khanacademy.org/digital-sat) — verified still the
  official College Board practice partner as of July 2026. Free, account for
  progress tracking, Bluebook score-linking feature confirmed.

## Platforms

- **Miyagi Labs** (miyagilabs.ai/sat) — verified. Y Combinator company; free
  full-length practice exams and question practice; iOS app has in-app purchases →
  labeled **freemium**, not "completely free". Account required.
- **1600.io** — verified. Free trial bundle (strategy course + official-test video
  explanations); most content paid ($19.99+/mo tiers observed) → **freemium**.
- **Schoolhouse.world** — verified. Free peer SAT bootcamps, nonprofit, account required.
- **Desmos calculator** (desmos.com/calculator) — verified free web tool.

## YouTube creators

| Creator | Handle | Status |
|---|---|---|
| The SAT Gamified | @satgamified | ✅ verified |
| LearnSATMath | @learnsatmath | ✅ verified (math-only; sells tutoring via own site — noted) |
| Penguin Test Prep | @PenguinTestPrep | ✅ verified (promotes paid membership — noted) |
| James Lu SAT | @JamesLuSAT | ✅ verified (free Skool community; paid program — noted) |
| Strategic Test Prep | channel/UC2TGPMA4BhH5sD0M_M8jbcw | ✅ verified (Laura Whitmore; paid program — noted; their "94% of students" marketing claim NOT republished) |
| Pratik Vangal | @PratikVangal | ✅ verified July 15, 2026 (correct spelling of the previously held "Pratik Bangal"). Channel now focuses on admissions and promotes a paid advisory service (disclosed on the card); the SAT back-catalog is strong and six videos were individually verified. |

## Books

| Book | Verification |
|---|---|
| SAT Prep Black Book, 3rd ed. (digital SAT) | ✅ Digital-SAT 3rd edition confirmed via multiple reviews; Amazon listing responds 200. Edition warning included on card. |
| The Critical Reader, 6th ed. — Meltzer | ✅ Verified on thecriticalreader.com (March 2025, digital SAT, covers official tests 1–10). Product page linked. |
| The Ultimate Guide to SAT Grammar, 6th ed. — Meltzer | ✅ Verified on thecriticalreader.com product page (title corrected during verification from generic "grammar guide"). |
| Princeton Review Digital SAT Prep | ⚠️ needs-review: annual editions churn; card links to publisher search and tells students to get the newest year. No specific edition/ISBN claimed. |
| Kaplan Digital SAT Prep | ⚠️ needs-review (same annual-edition approach). kaptest.com/sat returns 403 to bots but loads fine in a real browser (verified manually). |
| Official Digital SAT Study Guide (College Board) | ⚠️ needs-review for current printing; card honestly notes the same tests are free in Bluebook. Links to official CB practice page (200). |
| Barron's Digital SAT | ⚠️ needs-review (annual edition; links to publisher home). |

“needs-review” books are published because their cards make no edition-specific
claims and direct students to check the newest year + libraries first. Tighten to
specific editions/ISBNs when a human editor confirms the current year's printing.

## Facts deliberately NOT carried over from older advice

- Old paper-SAT structure, the retired essay, 2400-scale scoring
- Old Khan Academy "mastery level" instructions
- Claims that specific third-party trials/discounts still exist
- Any specific score-improvement statistics (including College Board's "115-point"
  Khan Academy study — dated, and score promises are against content policy)
- The supplied Reddit-style resource post's wording, scores, and personal story
  (its durable principles — consistency, reviewing tests, error logs, learning
  grammar rules directly — are incorporated as original writing)


## Individually verified videos (July 15, 2026)

All verified via YouTube oEmbed (title/author/thumbnail) + watch-page caption
check; durations from channel data. All are digital-SAT era content.

| Video | ID | Length | Captions |
|---|---|---|---|
| Every SAT Grammar Rule You Need (in 18 min) | 8cxBQnzCyUM | 18:57 | ✅ |
| I Tried Every DSAT Resource, These Got Me a 1550+ | TXhsGW5HWrs | 13:08 | ✅ |
| Stuck at 1400? Do This for a 1500+ SAT (2026) | uwVVBfb6FnE | 20:22 | ✅ |
| Digital SAT Mistakes Costing You 100+ Points in 2025 | wLTbifAiT3Y | 17:55 | ✅ (hqdefault thumb; no maxres) |
| My SECRET Digital SAT Hacks For 150+ Points | HcG867qFZ5A | 11:08 | ✅ |
| My SECRET SAT Study Schedule for EASY 1600s (in 2025) | dRYq4Ga2K2k | 18:53 | ✅ |

Editorial note: card descriptions do not repeat the clickbait score promises in
some titles, and explicitly tell students to ignore them.

## Image previews

- Verified: 6 video thumbnails (i.ytimg.com), 6 creator avatars (channel
  og:image), 2 Meltzer covers (author's official product pages).
- Designed branded fallbacks (no verified image available or generic og:image
  only): all College Board properties, Khan Academy, Miyagi Labs, 1600.io,
  Schoolhouse, Desmos, and 5 books (Black Book, Princeton Review, Kaplan,
  CB Official Guide, Barron's). The build lists these on every run.
