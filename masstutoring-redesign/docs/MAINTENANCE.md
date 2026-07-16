# Resource Maintenance Guide

The guide's credibility depends on resource quality. This document is the editorial
workflow for adding, updating, and removing resources.

## The data file

All resources live in `src/data/resources.json` — one object per resource.

### Required fields

| Field | Values / notes |
|---|---|
| `id` | unique kebab-case identifier (used in page markers) |
| `slug` | URL-safe name |
| `name` | exact, verified resource name |
| `url` | verified URL — **never guess** |
| `category` | `official` \| `practice` \| `videos` \| `books` \| `desmos` \| `test-day` |
| `resourceType` | `official-tool`, `website`, `channel`, `video`, `book`, `practice-test`, `question-bank`, `article`, `study-plan`, `registration-resource` |
| `costType` | `completely-free`, `freemium`, `free-trial`, `paid`, `library-access`, `unknown` |
| `officialStatus` | `college-board-official`, `official-provider`, `third-party` |
| `digitalSATCompatible` | must be `true` to publish (or explain in limitations) |
| `description` | what it is, factually |
| `whyRecommended` | the editorial reason — every resource must have one |
| `dateLastReviewed` | ISO date, updated at every re-verification |
| `verificationStatus` | `verified`, `needs-review`, `outdated`, `unavailable` |
| `published` | `false` keeps the record out of the public site |

### Optional fields

`creator`, `subject` (`math`/`reading-writing`/`desmos`/`general`), `topics[]`,
`difficulty`, `accountRequired`, `adaptive`, `captionsAvailable`, `estimatedTime`,
`limitations`, `bestFor[]`, `prerequisites[]`, `featured`, `recommendationLabel`,
`accessibilityNotes`, `affiliateRelationship` (must stay `false` unless the org
adopts a disclosed affiliate policy).

Books additionally use: `author`, `publisher`, `edition`, `publicationYear`, `isbn`,
`approximatePrice`, `libraryRecommended`, `ebookAvailable`, `includesPracticeTests`,
`includesAnswerExplanations`.

## Verification checklist (before publishing ANY resource)

1. Confirm the exact resource name.
2. Confirm the URL loads (run `python3 build.py --check`).
3. Confirm the provider is legitimate and appropriate for high-schoolers.
4. Confirm current **digital SAT** relevance (not the retired paper SAT).
5. Confirm cost honestly: free / freemium / trial / paid. If anything is paywalled,
   it is **not** `completely-free`.
6. Confirm whether an account is required.
7. Check for excessive ads or misleading claims — reject if so.
8. Note affiliate links or paid products the creator promotes (mention in `limitations`).
9. Check captions availability for video resources.
10. Write `whyRecommended` — if you can't articulate why, don't list it.
11. Set `dateLastReviewed` to today and `verificationStatus: "verified"`.

**Never** publish a guessed URL, an unverified creator identity, or a "completely
free" label based on old information. Use `published: false` while researching.

## Recommendation labels

`recommendationLabel` (e.g., "Best Place to Start", "Best for Grammar") must have a
documented editorial reason and be unique enough to stay meaningful — don't hand out
multiple identical "best" labels. Labels can never be purchased.

## Placing resources on pages

Pages reference resources with markers that the build expands:

```html
<!-- resources: ids=bluebook,cb-question-bank -->   explicit ordered list
<!-- resources: category=books -->                   filter by field
<!-- resources: subject=math type=channel -->        multiple filters (AND)
<!-- resources: all -->                              everything published
```

Append `| h4` to change the card heading level when the surrounding section uses h3
headings (keep the heading hierarchy valid).

## Re-review schedule

`build.py` warns when a published resource hasn't been reviewed in 6+ months.
Review priorities:

- **Monthly-ish:** College Board policy/date pages, freemium platforms' pricing
- **Each school year:** book editions (new annual editions), YouTube channels
- **After any College Board announcement:** test structure claims in page copy
  (`start-here`, `math`, `strategy`, `faq` mention timings/counts — search for
  "last reviewed" strings and update the dates when you re-verify)

## Removing / downgrading

Unpublish (don't delete) a resource when its link breaks, free features become paid,
content goes stale relative to the current SAT, or a clearly better alternative
exists. Record why in a `reviewNote` field so future editors have the history.

## Held for review

(None currently. The former "Pratik Bangal" placeholder was resolved on
2026-07-15: the correct creator is **Pratik Vangal** (@PratikVangal), whose
SAT back-catalog was verified and published, including six individually
verified videos. His placeholder record was removed.)

## Visual preview fields (`visual` object on each resource)

| Field | Notes |
|---|---|
| `thumbnailUrl` | verified image URL; omit to get a designed branded fallback |
| `thumbnailAlt` | alt text; empty string when the wrapping link carries the accessible name |
| `thumbnailType` | `youtube-thumbnail` / `website-preview` / `book-cover` / `creator-image` / `official-logo` / `custom-fallback` |
| `previewSource` | `open-graph` / `official-media` / `approved-screenshot` / `generated-fallback` |
| `dominantColor` | hex used by the designed fallback panel |
| `aspectRatio` | `16:9`, `2:3` (books), `1:1` (avatars) |
| `imageWidth`/`imageHeight` | set when known to prevent layout shift |
| `previewLastVerified` | ISO date — update when you re-check the image |
| `videoId`, `duration` | video records only |

Image sourcing rules:
1. YouTube thumbnails: `https://i.ytimg.com/vi/<id>/maxresdefault.jpg`
   (fall back to `hqdefault.jpg` if maxres 404s). Verify via oEmbed first.
2. Book covers: only from the publisher or author's official site.
3. Sites without a usable official image get the designed fallback — never
   stretch a logo or hotlink a page that prohibits it.
4. All remote card images are emitted with `referrerpolicy="no-referrer"`
   (googleusercontent CDNs return 429 when a Referer is sent) and native
   lazy loading. The build warns about resources using fallbacks.

## Adding a new verified video

1. Confirm the video via oEmbed: `https://www.youtube.com/oembed?url=<watch-url>&format=json`
2. Record title, creator, duration, and captions availability.
3. Confirm digital-SAT relevance (check the publish date and content).
4. Add a record with `resourceType: "video"`, the fields above, and an honest
   description that does not repeat clickbait claims from the title.
