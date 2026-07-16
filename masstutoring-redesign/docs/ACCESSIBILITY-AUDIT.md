# Accessibility Audit & Test Results

Target: WCAG 2.2 Level AA. Audit date: July 15, 2026.

## Original-site barriers (all resolved by the rebuild)

1. Navigation used `<button>` elements with JS page-swapping — no real links,
   no URLs, no `aria-current`, back button broken.
2. No skip link; no landmarks beyond a single `<main>` swap target.
3. Dark theme with several sub-AA text combinations (e.g., muted slate `#94a3b8`
   at small sizes on `#161d2b` panels ≈ 4.0:1; amber-on-dark button text edge cases).
4. Auto-scrolling testimonial marquee with no pause control (2.2.2 failure).
5. WebGL fluid animation ran regardless of `prefers-reduced-motion`.
6. Practice tool answered via color-only correct/incorrect states in places.
7. Stock photos with generic alt text.

## Implementation summary (new site)

- **Semantics:** one `<h1>` per page; no heading-level jumps (verified across all
  19 pages by script); `<header>/<nav>/<main>/<footer>`, labeled nav landmarks,
  breadcrumbs on guide subpages; native `<details>` for FAQ disclosure;
  data tables use `<caption>` + `<th scope>`.
- **Keyboard:** skip link (first tab stop, visible on focus — verified in browser);
  all interactivity is native links, buttons, checkboxes, inputs, `<details>`;
  mobile menu is a real button with `aria-expanded`, Escape closes it and returns
  focus; `:focus-visible` outline 3px `#2F72B1` + offset.
- **Color:** all text/background pairs computed ≥ 4.5:1 (see results below);
  non-text UI ≥ 3:1; badges/states always carry text, never color alone.
- **Search/filters:** visible label; native checkboxes in `<fieldset>/<legend>`
  groups; result counts announced via `role="status"` live region, debounced;
  focus is never moved by filtering; "Clear search and filters" control; empty
  state with guidance. Works without JS (all cards simply remain visible).
- **Motion:** `prefers-reduced-motion` kills all transitions/animations; no
  autoplaying or flashing content anywhere; no parallax.
- **Zoom/reflow:** relative units throughout; verified no horizontal scroll at
  375px; grids collapse to one column; wide tables scroll inside their own
  `overflow-x` container.
- **Links:** descriptive text everywhere ("Visit College Board SAT Suite Question
  Bank", not "click here"); external resource links open in a new tab **with**
  visually-hidden "(opens in a new tab)" text (verified 0 missing by script);
  inline body links underlined.
- **Touch targets:** buttons/inputs/chips ≥ 40–44px height; nav items padded.
- **No overlay widget** — accessibility is native.

## Design-token changes made for contrast (documented per spec)

| Spec value | Issue | Shipped value |
|---|---|---|
| Link text `#3B82C4` | 3.94:1 on white — fails AA for body text | `#2F72B1` (5.04:1); `#3B82C4` kept for borders/icons (non-text, ≥3:1) |
| CTA: white on `#F28C62` | 2.53:1 — fails badly | `--accent-strong #B14A1E` (5.43:1); soft coral kept for decorative uses |
| Secondary text `#6B7885` | 4.54:1 — passes but no margin on tinted bgs | `#5C6B7A` (5.47:1 white / 5.08:1 soft blue) |
| Badge text colors | tightened | success `#1F5E43`, warning `#6B4E10`, recommended `#96431F` — all ≥ 5.5:1 |

## Test results (July 15, 2026)

**Automated/scripted**
- Heading structure: 19/19 pages — exactly one h1, zero level jumps ✅
- Images without alt: 0 (site uses only `aria-hidden` decorative SVG) ✅
- New-tab links missing SR notice: 0 ✅
- Contrast: 15/15 checked pairs pass (computed WCAG ratios) ✅
- External links: 25/25 published resource URLs verified (one — kaptest.com —
  bot-blocks curl but verified manually in a browser) ✅

**Manual, in-browser**
- Skip link: first Tab stop, visible, focuses `#main` ✅
- Mobile (375px): no horizontal scroll; menu toggles with correct `aria-expanded` ✅
- Guide search/filters: live count announces ("4 resources found."), filters
  AND/OR logic correct, clear-control resets and refocuses search ✅
- Empty search state appears and offers a path forward ✅

## Known limitations / remediation plan

1. **Screen-reader testing with real AT (VoiceOver/NVDA) not yet performed** —
   the structural prerequisites are verified, but a human pass with VoiceOver
   (Safari) and NVDA (Firefox/Chrome) should happen before claiming full
   conformance. → Owner: next maintainer; checklist in this doc's test list.
2. **Google Forms dependency for tutoring** — generally accessible, but outside
   our control; the accessibility statement offers an email alternative.
3. **Third-party resource destinations** are outside our control; cards can carry
   `accessibilityNotes` and the statement invites reports.
4. **No user testing with people with disabilities yet** — recommended before
   any "conformant" claim stronger than the current statement's wording.

The public statement at `/accessibility/` reflects exactly this posture (committed
to WCAG 2.2 AA, no overclaims, working contact method, alternative formats offered).


---

# v2 Visual Redesign — accessibility re-test (July 15, 2026)

Palette v2 contrast (computed WCAG ratios): **22/22 pairs pass**, including
dark-navy sections (text 13.9:1, secondary 7.8:1, links 8.8:1), all badges,
media overlays (15:1), and the CTA terracotta (#B44A1E, 5.3:1 with white).
Token adjustments vs. the raw spec palette: links #286DAE instead of #347FC4
(3.9:1 → 5.4:1); CTA #B44A1E instead of white-on-#F0805A (2.5:1 → 5.3:1);
secondary text #5D6C7B instead of #687887 (4.4:1 → 5.4:1).

Re-tested after the redesign:
- 19/19 pages: one h1, no heading jumps ✅
- 0 new-tab links without a screen-reader notice ✅
- 0 images missing alt attributes; clickable previews carry descriptive
  aria-labels ("Watch … by … on YouTube", "Open …", "View the current edition
  of …") with the redundant image link set tabindex="-1" so keyboard users hit
  one well-named link per card ✅
- Hover cues (media CTA, play-badge emphasis, image zoom) also trigger on
  :focus-within; duration/type info is plain text, never hover-only ✅
- prefers-reduced-motion disables all animation including the hero entrance ✅
- 375px: no horizontal scroll; menu, search, and filters verified working ✅
- Search live-region announcements re-verified ("5 resources found.") ✅

Known limitations (unchanged): real screen-reader (VoiceOver/NVDA) and
disabled-user testing still recommended before strong conformance claims.


---

# v3 Simplification — accessibility re-test (July 15, 2026)

- Structure: 19/19 pages one h1, no heading jumps; 0 new-tab links without
  notice; 0 remote images missing alt/no-referrer ✅
- Badge cap did not remove information: account requirements, limitations,
  and metadata moved to a native `<details>` disclosure (keyboard-operable,
  correct expand/collapse semantics for screen readers) ✅
- Logo link carries `aria-label="Mass Tutoring home"`; the adjacent visible
  wordmark is `aria-hidden` to prevent duplicate announcements; footer logo
  link labeled identically ✅
- Icon family is `aria-hidden` decorative SVG inside labeled links —
  no icon-only actions introduced ✅
- Contrast: no new color pairs introduced (icons use the existing
  #286DAE-on-tint pattern, ≥4.8:1); card focus ring per spec §6 verified
  ≥3:1 against white ✅
- Max 3 badges per card verified by script across all pages ✅
