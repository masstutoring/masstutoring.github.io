# Resource library expansion & official-branding pass

Date: 2026-07-23 · Reviewer: Mass Tutoring web maintainer (this change)

This documents the July 2026 pass that (a) evaluated new candidate SAT resources
and added the strongest gap-fillers, and (b) added the system for showing official
provider logos in place of generic initials. It fulfils the brief's required
deliverables. Nothing here invented numbers, testimonials, or partnerships.

---

## 1. Existing library (baseline)

The canonical data source is [`src/data/resources.json`](../src/data/resources.json)
(32 resources before this pass, 36 after). Every page, the search browser, filters,
My Study, and saved-resources read from it — resources are **never** hardcoded per
page; topical pages reference canonical records by `id`.

Categories before: official (4), test-day (5), practice (3), desmos (1), videos (12),
books (7).

### Placeholder / visual audit

| Visual state | Resources |
| --- | --- |
| **Real image already shown** (hotlinked, with graceful fallback) | 5 YouTube channel avatars (`sat-gamified`, `learnsatmath`, `penguin-test-prep`, `james-lu-sat`, `strategic-test-prep`, `pratik-vangal`), 6 video thumbnails (`video-*`), 2 book covers (`book-meltzer-reading`, `book-meltzer-grammar`) |
| **Designed branded tile** (provider name + domain + initials mark + designed art — *not* bare initials) | All official tools/websites/registration resources and the remaining books |

> Note: the existing "fallback" tiles are **not** raw floating initials. Each shows
> the full provider name, the domain, a designed section-specific graphic, and a
> small initials mark. They are honest, on-brand, and already better than the "CB /
> KA / ML" placeholders the brief targets. The remaining upgrade — dropping in the
> genuine official logo image — is gated on asset hosting (see §5).

---

## 2. Gap analysis

Well-served already (no additions needed): official practice (Question Bank,
Bluebook, practice tests, Khan), math video instruction, books, registration/
test-day logistics, fee waivers, accommodations info, live bootcamps (Schoolhouse).

Genuine gaps identified:

| Gap | Evidence | Filled by |
| --- | --- | --- |
| **Structured Desmos instruction** | Desmos page had only the calculator *tool*, no course | Tutorllini Test Prep (free Desmos course) |
| **Reading & Writing / strategy on video** | R&W had one grammar video vs. many math videos | SupertutorTV |
| **Math strategy (vs. content) for top scorers** | Existing math channels teach content, not test tactics | Scalar Learning |
| **Deep guided question explanations** | Official explanations are terse; free tools are sparse | UWorld (7-day no-card trial) |

Deliberately **not** chased (would have been padding or risky): a 5th general SAT
overview, third-party "question of the day" tools (authorization risk), duplicate
full-length practice tests (official is better), SEO/upsell article farms.

---

## 3. Candidates evaluated (≥20) with decisions

Scoring key per candidate used the brief's rubric (digital-SAT relevance, accuracy,
explanation quality, amount free, self-study value, credibility, transparency,
account/privacy burden, originality vs. existing). Summarised as a decision below.

| # | Candidate | Decision | Reason |
| --- | --- | --- | --- |
| 1 | **Tutorllini Test Prep** (YouTube) | **ADD** | Only free start-to-finish Desmos-for-SAT course; fills the empty Desmos-instruction gap |
| 2 | **SupertutorTV** (YouTube) | **ADD** | Perfect-scorer; strong R&W + strategy + study-plan coverage where video was thin |
| 3 | **Scalar Learning** (YouTube) | **ADD** | 800-scorer math strategy/tactics; differentiated from content channels |
| 4 | **UWorld Digital SAT** | **ADD** | Best-in-class explanations; genuine 7-day full-access trial, no credit card. Labeled precisely |
| 5 | Schoolhouse.world | reject | Already present (`schoolhouse`) |
| 6 | Khan Academy | reject | Already present (`khan-academy-sat`) |
| 7 | 1600.io | reject | Already present (`1600io`) |
| 8 | Miyagi Labs | reject | Already present (`miyagi-labs`) |
| 9 | College Board paper/linear practice tests | reject | **Duplicate** — already covered by `cb-practice-tests` (its description + URL include the paper tests) |
| 10 | Galvanize "SAT Question of the Day" | reject | Third-party "authentic" questions — authorization/quality risk |
| 11 | Test Ninjas "Questions of the Day" | reject | Same authorization/quality concern |
| 12 | Magoosh free practice test | reject | Duplicates official practice; upsell-driven |
| 13 | Mometrix practice test | reject | Duplicates official practice |
| 14 | PrepScholar free articles | reject | SEO/upsell blog; not a better next step than existing guide |
| 15 | r/SAT subreddit | reject | Uncurated community; quality/safety variance |
| 16 | Southern Edge Math (Desmos) | reject | Paid Gumroad product, not free |
| 17 | LearnQ.ai app | reject | Freemium app with heavier account/data burden |
| 18 | Desmos Help "Assessment Resources & FAQ" | hold | Official but marginal/thin as a standalone student card |
| 19 | SupertutorTV website free course | hold | Website is freemium; the YouTube channel (added) is the free part |
| 20 | Miscellaneous "SAT Prep 2026" app-store apps | reject | Unverified quality, ad-heavy, data collection |
| 21 | TestBright / The Test Advantage / Acely blogs | reject | Marketing blogs, not primary resources |

**Approved: 4. Rejected/held: 17.** Fewer than the 6–12 ceiling by design — several
strong-sounding candidates were duplicates of better existing records, and the brief
forbids adding resources merely to grow the guide.

---

## 4. What was added to the data

All four use the existing schema, so they flow automatically into the resource
browser, search, filters, related sections, My Study selection, and saved resources.
Topical pages were also updated to reference them by `id`:

| id | Cost label | Placed on |
| --- | --- | --- |
| `tutorllini` | Completely Free | Desmos, Videos (Desmos course), browser |
| `supertutortv` | Completely Free | Reading & Writing, Videos, browser |
| `scalar-learning` | Completely Free | Math, Videos, browser |
| `uworld-sat` | **Free Trial · No Card** | Practice, browser |

A new `free-trial-no-card` cost type + badge was added so UWorld is labeled honestly
(full access free for 7 days, no credit card, then paid). Its description and
limitations state the trial window and that questions are approximations, keeping
official practice primary.

---

## 5. Official logo system + asset manifest

### System (shipped)
`build.py` now supports a `visual.logoUrl` (+ `logoAlt`, `logoWidth`, `logoHeight`).
When present, the card layers the official logo in a neutral white
`.resource-logo-frame` over the designed tile. If the logo ever fails to load, the
`logo-error` rule hides the frame and the branded tile shows through — a guaranteed
fallback, never a broken-image icon. Frame styling follows the brief (contained, no
distortion, light surface).

### Why logos aren't populated in this change
This build environment blocks outbound access to all non-package hosts, so official
logo binaries **cannot be downloaded or hosted from here**. Per the chosen hybrid
approach, real images are used only where the site already reliably hotlinks them
(YouTube avatars/thumbnails, book covers). Website/tool logos are **documented below
and flagged for human review** rather than guessed at — inserting an unverifiable
image URL risks showing the wrong or a broken logo, which the brief forbids.

### Asset manifest — official logo sources (human-review-required)
Each entry: verify the asset at the official source, download an optimized copy to
`assets/resources/<provider>/`, then set `visual.logoUrl`/`logoAlt` on the record.

| Resource id | Provider | Official logo source (start here) | Asset status |
| --- | --- | --- | --- |
| `cb-question-bank`, `bluebook`, `cb-*` | College Board | College Board brand/press pages on collegeboard.org | human-review-required |
| `khan-academy-sat` | Khan Academy | khanacademy.org brand assets / press | human-review-required |
| `desmos-calculator` | Desmos | desmos.com brand / help center | human-review-required |
| `schoolhouse` | Schoolhouse.world | schoolhouse.world official site | human-review-required |
| `miyagi-labs` | Miyagi Labs | miyagilabs.ai | human-review-required |
| `1600io` | 1600.io | 1600.io | human-review-required |
| `uworld-sat` | UWorld | collegeprep.uworld.com brand assets | human-review-required |
| `tutorllini` | Tutorllini (YouTube) | youtube.com/@Tutorllini channel avatar (yt3) | human-review-required |
| `supertutortv` | SupertutorTV (YouTube) | youtube.com/@supertutortv channel avatar (yt3) | human-review-required |
| `scalar-learning` | Scalar Learning (YouTube) | youtube.com/@ScalarLearning channel avatar (yt3) | human-review-required |

Existing already-populated assets (approved, hotlinked): the 6 `video-*` thumbnails
(i.ytimg.com), 6 channel avatars (yt3.googleusercontent.com), and 2 book covers
(thecriticalreader.com). Sources are recorded in each record's `visual` block.

### Trademark note
Logos are shown only to help students recognize a linked resource. They do not imply
sponsorship, endorsement, or partnership. The site-wide disclaimer ("Mass Tutoring is
independent and not affiliated with or endorsed by College Board") remains in the
footer. Do not recolor, distort, animate, or combine external logos with the Mass
Tutoring mark.

---

## 6. Link & free-access verification

| Resource | URL | Free access verified |
| --- | --- | --- |
| Tutorllini | https://www.youtube.com/@Tutorllini | Completely free (YouTube) |
| SupertutorTV | https://www.youtube.com/@supertutortv | Channel completely free (site sells paid courses) |
| Scalar Learning | https://www.youtube.com/@ScalarLearning | Completely free (YouTube) |
| UWorld | https://collegeprep.uworld.com/free-sat-exam-prep/ | 7-day full trial, no credit card; paid after |

URLs were confirmed via web research on 2026-07-23. All use HTTPS. **A final manual
click-through of each new link and any newly added logo image is required before
this is considered done** (see Definition of Done in the brief) — automated checks
alone are not sufficient.

---

## 7. How to add a future resource

1. Confirm it fills a real gap and isn't a duplicate of an existing record.
2. Verify: official URL (HTTPS), exact free-access terms, digital-SAT relevance,
   account/credit-card requirements, no unauthorized official questions.
3. Add a record to `src/data/resources.json` using the existing field set
   (`id, slug, name, creator, url, category, resourceType, subject, topics,
   difficulty, costType, officialStatus, accountRequired, digitalSATCompatible,
   description, whyRecommended, limitations, bestFor, dateLastReviewed,
   verificationStatus, published, visual`). Write a full editorial description —
   never a name-and-link stub.
4. Choose an accurate `costType` (see `COST_BADGES` in `build.py`). Don't call a
   platform "Completely Free" because one piece of it is.
5. Reference the `id` from the relevant topical page marker(s); the browser, search,
   and filters pick it up automatically by category/type.
6. Rebuild (`python3 build.py`), deploy, and manually verify the card, its link, and
   its placement on desktop and mobile.

## 8. How to update a rebranded or outdated logo

1. Obtain the current official asset from the provider's official brand/press page.
2. Save an optimized copy under `assets/resources/<provider>/` with a descriptive
   filename (e.g. `khan-academy-logo.svg`, not `download.png`).
3. Set `visual.logoUrl` + `logoAlt` (and `logoWidth`/`logoHeight`) on the record.
   Alt text: the provider/resource name (or empty when the name sits right beside it).
4. Rebuild and confirm the logo sits centered and undistorted in its frame, with the
   designed tile still showing if the image is removed.
5. Update this manifest's status and the record's `visual.previewLastVerified`.
