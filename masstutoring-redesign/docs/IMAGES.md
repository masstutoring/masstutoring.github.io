# Image System — Inventory, Sources, and Approval Queue

Applied 2026-07 as part of the image-rich redesign. Governing principle:
**imagery makes resources recognizable, useful, and inviting — never filler.**
No image URL is published without verification (see the workflow below).

## 1. Image audit

### Verified real images (14 resources)

| Resource | Image | Source | Type |
|---|---|---|---|
| 6 videos (`video-*`) | Real YouTube thumbnails (`i.ytimg.com`, maxres/hq) | YouTube CDN, derived from verified video IDs | `youtube-thumbnail` 16:9 |
| 6 channels (`channel-*`) | Real channel avatars (`yt3.googleusercontent.com`) | YouTube channel pages | `creator-avatar` 1:1 |
| `book-meltzer-reading`, `book-meltzer-grammar` | Current-edition covers | thecriticalreader.com (author's own site) | `book-cover` 2:3 |

### Designed previews (18 resources — Mass Tutoring-owned graphics)

Every resource without a verified image gets a **designed interface-style
preview** in one visual language (white 2px strokes on the resource's brand
color), plus name, provider initials, domain, and type label:

| Fallback art | Used by |
|---|---|
| `qbank-interface` (search + filters + question rows) | cb-question-bank |
| `testing-interface` (timer + answer choices) | bluebook |
| `graph` (grid + intersecting curves) | desmos-calculator |
| `score-dial` (dial + module progress) | cb-practice-tests |
| `browser-preview` (window chrome + content) | khan-academy-sat, miyagi-labs, 1600io, schoolhouse |
| `calendar` (marked date + check) | cb-registration, cb-test-dates, cb-fee-waivers, cb-accommodations, cb-scores |
| `designed-cover` (typographic cover, labeled "Designed preview") | book-black-book, book-princeton-review, book-kaplan, book-cb-official-guide, book-barrons |

### Category visuals (12 owned graphics)

Each guide category has its own SVG graphic — coordinate plane (Math),
annotated passage (R&W), intersecting curves (Desmos), timed module
(Practice), study calendar (Plans), video tiles, book shelf, shield
(Official), target (Strategy), checklist + clock (Test Day), breathing
arcs (Wellness), numbered route (Start Here) — used on the category cards
and each category page's hero. One drawing system: 2–3px strokes,
`#1769AA`/`#0E4776`/`#BCC9D3` on white/pale blue, rounded caps, no text
baked into the image (all are `aria-hidden`; headings carry the meaning).

## 2. Images requiring approval / verification (swap-in queue)

These would upgrade designed previews to real images. Each needs its URL
verified (correct, current, public, high-res) before being added to
`visual.thumbnailUrl` — **verification could not be performed from the
current build environment (external image hosts unreachable), so none
were added**:

1. College Board Question Bank / Bluebook / practice-test **official
   product screenshots or Open Graph images** (collegeboard.org)
2. Khan Academy **Open Graph image or brand asset** (khanacademy.org)
3. Desmos **calculator screenshot or brand asset** (desmos.com)
4. Miyagi Labs, 1600.io, Schoolhouse.world **logos or OG images**
5. Current-edition covers for **Black Book, Princeton Review, Kaplan,
   Official Study Guide, Barron's** (publisher sites or Open Library;
   verify edition matches the linked edition)
6. Approved **Mass Tutoring team/tutor photos** for the Tutoring and
   Mission pages (until then: branded illustration + interface graphics)

## 3. Rejected image options (and why)

- Auto-scraped OG images without verification — violates the
  no-unverified-URLs rule; could silently 404 or change.
- Older-edition book covers from retailer listings — edition mismatch.
- Stock photos of students/calculators — spec forbids decorative stock.
- Unofficial creator photos from social media — not usage-approved.
- Full YouTube iframes per card — performance; thumbnails link out instead.

## 4. Image schema (resources.json → `visual`)

```jsonc
"visual": {
  "thumbnailUrl": "…",        // omit → designed preview is used
  "thumbnailAlt": "…",        // meaningful, or "" when decorative
  "imageWidth": 1280,          // explicit dims prevent layout shift
  "imageHeight": 720,
  "imageType": "youtube-thumbnail | creator-avatar | book-cover |
                website-preview | official-brand-image | fallback | …",
  "aspectRatio": "16:9 | 16:10 | 2:3 | 1:1 | …",
  "imageSourceName": "YouTube | Publisher website | …",
  "usageApproved": true,       // must be true to publish
  "dateLastVerified": "YYYY-MM-DD",
  "fallbackType": "qbank-interface | browser-preview | …",
  "dominantColor": "#1D4E79"   // brand color for the designed preview
}
```

Maintenance: verify per `docs/MAINTENANCE.md`, then fill `thumbnailUrl`,
alt, dims, source, `dateLastVerified`, and set `usageApproved: true`.
The designed preview remains the automatic fallback (also used by the
`media-error` handler if a published image ever breaks).

## 5. Performance and accessibility rules in force

- Fixed aspect-ratio containers everywhere (no cumulative layout shift);
  explicit `width`/`height` on all `<img>`.
- `loading="lazy"` below the fold; only the hero preview loads eagerly.
- Skeleton shimmer on media panels while thumbnails load (pure CSS,
  disabled under `prefers-reduced-motion`).
- No YouTube iframes — thumbnails link out with descriptive accessible
  names ("Watch … by … on YouTube (opens in a new tab)").
- Broken images: `onerror` → branded panel; never a broken-image icon.
- All owned graphics are `aria-hidden` decorative; adjacent headings and
  text carry the information (WCAG 1.1.1).
- Hover/focus zoom is 1.025–1.035 scale, disabled under reduced motion.
