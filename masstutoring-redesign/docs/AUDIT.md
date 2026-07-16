# Original Site Audit & Redesign Change Log

Audit date: July 15, 2026 (live site at https://www.masstutoring.com)

## What the original site was

A single-page static site (`index.html` + `app.js` + `data.js` + `liquid-ether.js`):

- **Dark theme** (near-black `#0b0f17`, amber `#f59e0b` accent) with a Three.js
  "liquid" WebGL hero effect loaded from a CDN.
- **Client-side page switching** — Home / Mission / Guide / Practice were rendered
  into one `<main>` by JS. No real URLs, so no deep links, no SEO for inner
  content, and navigation used `<button>` elements instead of links.
- **Practice tool ("BetterQ" equivalent)** — 200 original questions (100 Math /
  100 R&W) in `data.js` with filters, scoring, and explanations. This was the
  primary CTA ("Get Started — Try a Question").
- **Guide** — a single short page with two resource cards and a 6-step plan.
- **Tutoring** — via two Google Forms (student request + tutor application).
- **Mission** — founders' story (Ethan Moran 1550, Albert Wen 1560, BB&N).

### Integrity problems found (removed in redesign)

1. **Fabricated visitor counter** — hardcoded `BASE_COUNT = 1842` presented as
   "students helped so far", incremented per page load. Removed; no usage
   statistics are shown anywhere until real ones exist.
2. **Unverifiable testimonials with score deltas** (e.g. "+150 pts") — removed.
   Per the content policy, testimonials return only when real and approved.
3. **"Non-profit" claim** in the FAQ — removed pending confirmation of legal
   status. The site now says "free, student-created" only.
4. **Unsplash stock photos** implying real students/classrooms — removed.

### What was preserved

- Cat mascot (recolored for the light theme), used sparingly (header, hero note, 404).
- Both Google Form links for tutoring (verified working).
- Founder story and scores (their own, from the existing site) on the Mission page.
- The strongest editorial content: the Desmos 15-second decision framework, the
  R&W same-pattern approach, the study-plan skeleton, FAQ seeds, and the
  Math/R&W domain taxonomy — all rewritten and expanded.

## Strategic changes implemented

| Area | Before | After |
|---|---|---|
| Flagship | Internal practice tool | **SAT Guide & Resource Hub** (`/sat-guide/`) |
| BetterQ/practice tool | Primary CTA | **Removed**; students directed to official College Board Question Bank & Bluebook |
| Tutoring | Main identity | Secondary support service (`/tutoring/`) |
| Architecture | 1 JS-rendered page | 19 static, semantic HTML pages with real URLs |
| Theme | Dark + WebGL effects | Light academic theme per design spec; zero external JS |
| Navigation | Buttons, no URLs | Real links: Home / SAT Guide / Free Tutoring / Our Mission |
| Resources | 2 cards, hardcoded | 25 published resources in a structured JSON data model with search/filters |
| SEO | Single title/meta for everything | Per-page titles, descriptions, canonical URLs, OG tags, sitemap.xml, robots.txt |
| Accessibility | No skip links, div-buttons, dark-theme contrast issues, marquee animation | WCAG 2.2 AA implementation (see ACCESSIBILITY-AUDIT.md) |

## Performance notes

- No web fonts, no CDN scripts, no WebGL, no images beyond inline SVG.
  Largest page (guide hub) is ~90KB of HTML; CSS is one ~15KB file; JS is one
  ~4KB progressive-enhancement file.
- No YouTube embeds anywhere — creators are linked, not embedded, per the
  performance requirement.

## Analytics

The original site had no analytics; none were added (nothing to preserve, and
adding a tracker is an organizational decision). Recommendation: if analytics are
wanted, use a privacy-conscious, cookieless option (e.g., self-hosted or a
GDPR-safe hosted service), track only page views, outbound resource clicks,
search terms, and filter usage, and disclose it. The `card-link` elements and
search input are stable hooks for event instrumentation.

## Known follow-ups

1. Decide hosting/deployment for `site/` (the original hosting setup wasn't
   visible from this machine — only the live site was auditable).
2. Configure the host to serve `404.html` for missing routes and to redirect
   the old JS "routes" (none had URLs, so no redirects are strictly needed).
3. Individual video records (title/length/date per video) are supported by the
   data model but not yet populated — each needs human verification per the
   no-invention rule. Channel-level records are published instead.
4. Real testimonials/statistics can be added once collected and approved.
5. Confirm organizational status (nonprofit or not) before restoring any such claim.


---

# Visual Redesign — July 15, 2026 (v2)

## What made v1 look plain

- Every section sat on the same near-white background; no layered surfaces
- System font stack only — no display typography, weak hierarchy
- All resources rendered as identical text-only cards (no thumbnails, covers,
  or previews); the guide read as a directory of links
- Repetitive "heading → paragraph → identical card grid" section rhythm
- Small hero with no product preview; no imagery anywhere except the mascot

## v2 design direction

"A premium, light-mode SAT resource platform combining an editorial learning
guide with a modern software-product interface." Apple-inspired hierarchy and
restraint; Crackd-inspired student-product energy. Nothing copied from either.

Key systems (all in `assets/css/site.css`):
- **Typography:** self-hosted Sora (display, 600–800) + Inter (body, 400–700),
  clamp()-scaled display sizes with tight letter-spacing.
- **Surfaces:** #F5F7FB page base, white cards, pale blue/warm/mint/lavender
  section tints, one dark navy mission/stats section + navy footer.
- **Depth:** soft radial-gradient hero atmospheres, layered card shadows
  (2/12/18px tiers), 10–28px radius scale.
- **Cards:** distinct VideoResourceCard (16:9 thumbnail, play badge, duration),
  BookResourceCard (2:3 cover, designed typographic cover fallback),
  WebsiteResourceCard (preview or branded fallback panel), CreatorCard
  (avatar), FeaturedResourceCard (bento span-2), CompactResourceCard.
- **Bento grids** for official essentials (Question Bank as the large feature).
- **Motion:** 160ms hover elevations, image zoom ≤3.5%, play-badge scale,
  media-CTA reveal on hover AND focus-within, nav shadow on scroll, hero
  entrance rise — all gated behind prefers-reduced-motion.
- **Hero:** two-column with a pure-HTML/CSS product preview (search UI, filter
  chips, resource rows, one real verified video thumbnail, pathway badge).

## Content corrections in v2

- **Pratik Vangal** (previously held as misspelled "Pratik Bangal") verified
  and published: channel + six individually verified digital-SAT videos
  (title/URL/duration/captions checked via oEmbed and watch pages).
- Creator avatars (5 channels) sourced from channel og:image.
- Meltzer book covers sourced from the author's official product pages.
- 18 resources use designed branded fallbacks (logged by the build).

## Performance decisions

- No YouTube iframes anywhere — thumbnails link out (spec §8/§22).
- All below-fold images lazy-load; hero thumb eager. width/height set where
  known; aspect-ratio boxes prevent CLS for the rest.
- Fonts self-hosted as latin-subset woff2 (~90KB actually downloaded),
  preloaded, `font-display: swap` via Google's CSS.
- Homepage: 47KB HTML + 36KB CSS + 3.8KB JS; zero external scripts.
- Image CDN quirk handled: googleusercontent returns 429 with a Referer, so
  card images ship `referrerpolicy="no-referrer"`.


---

# Visual Simplification & Logo Integration — July 15, 2026 (v3)

## Inconsistencies found in v2 (and fixes)

| Inconsistency | Fix |
|---|---|
| Four border-radius steps (10/14/20/28) plus stray hardcoded values (9/11/12/13/15px) | One 3-step token system (10/16/24) + pills (999px) and circles only; all strays normalized |
| Four shadow tokens | Three levels (small / card / hover); nav and "soft" alias to them |
| Emoji as category icons (🧮📖📈…) mixed with SVG UI icons | One Lucide-style outline family (24px grid, stroke 2, round joins) rendered at build time via `<!-- icon: name -->` markers — 13 icons, single color system |
| Cards front-loaded with why-blocks, meta pills, limitations, book specs, and up to 5 badges | Default card = image, title, creator, one description, ≤3 badges, action; everything else moved into a "Why we recommend it & details" `<details>` disclosure (data preserved, cards scannable) |
| "Account Required" badge noise | Moved into the details disclosure as a sentence |
| Hero preview was a floating pile (main panel + overlapping video card + floating badge with staggered entrance animations) | One coherent panel: search, chips, two resource rows, inline video row, single pathway footer; one entrance animation |
| Hero title up to 4.6rem | Capped at 4rem for balance |
| Ad-hoc spacing values | `--space-1…8` scale added and used by new/updated components |
| Site-card media at 16:9 (same as videos) | Websites now 16:10 (`--website-ratio`), videos 16:9, books 2:3, avatars 1:1 |

## Logo integration

The official logo (black cat with glasses holding a pencil, supplied
2026-07-15) could not be extracted as a file from the design handoff, so per
the brand spec the integration ships with a **documented drop point**:

- Put the approved file at `assets/logo/mass-tutoring-logo.png`
  (see `assets/logo/README.md`) and run `python3 build.py`.
- Brand slots switch automatically: navigation (38px, inside an
  `aria-label="Mass Tutoring home"` link, empty img alt to avoid double
  announcement), footer (44px on a white clean-surface chip, since the dark
  logo must not sit directly on the navy footer), homepage hero
  "By Mass Tutoring" signature (28px).
- Until then the interim cat mark (the site's pre-existing brand SVG) renders
  and every build prints a warning.
- Favicon: generate from the official PNG with
  `sips -Z 64 mass-tutoring-logo.png --out favicon-64.png`, then update the
  `<link rel="icon">` in `src/layout.html`. An Open Graph image
  (1200×630, logo on warm-white) is recommended once the asset exists.
- No recoloring, cropping, filtering, or animation is applied anywhere.

## Removed or simplified elements

- Floating hero video card + floating badge (merged into the main panel)
- Staggered entrance animation delays (one subtle rise remains)
- All emoji icons (13 replaced with the outline icon family)
- Per-card metadata pill rows from the default view (now in details)
- "Account Required" badge (now a details sentence)
- Duplicate radius/shadow tokens
