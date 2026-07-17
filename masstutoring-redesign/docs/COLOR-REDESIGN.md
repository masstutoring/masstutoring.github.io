# Color Redesign — Blue / White / Black / Neutral Gray (Design System v3)

Applied 2026-07. Replaces the multicolored v2 palette with a unified
blue-white-black-gray system. Principle: **blue guides attention, white
creates clarity, black provides structure, neutral gray supports hierarchy.**

## 1. Audit of the previous palette (v2)

| Removed color | Old role |
|---|---|
| `#F0805A` coral (`--accent`) | decorative accent, hero glow, illustration details |
| `#B44A1E` / `#983D17` burnt orange (`--accent-strong`) | primary CTAs, play-button hover |
| `#FDE8DF` peach (`--accent-soft`, `--recommended-background`) | recommended badges, illustration tiles |
| `#FFF5EF` warm cream (`--surface-warm`) | tutoring hero background |
| `#EDF8F4` mint (`--surface-mint`, `--tint-desmos`) | Desmos category, section backgrounds |
| `#F3EFFB` lavender (`--surface-lavender`, `--tint-rw`) | Reading & Writing category |
| `#FFF3E8` / `#FFF8DC` yellows (`--tint-practice`, `--tint-plans`) | Practice / Study Plans categories |
| `#FDECEF` pink (`--tint-wellness`) | Wellness category |
| `#1F7A5C` green | Desmos icon tiles, resource fallback color |
| `#946A2E` brown | book-cover fallback color |
| `#6B4FA3` purple | illustration detail |
| `#FFC94B` / `#57B98A` yellow/green | illustration window dots, pencil, star |
| `#347FC4` / `#286DAE` old blues | replaced by the new single blue system |
| rgba(240,128,90,…) coral gradients | hero glows |

Green (`#96431F`-family recommended badge tint) was also retired; the
Recommended badge is now near-black with white text.

## 2. Final design tokens

Defined in `assets/css/site.css` `:root`:

- Surfaces: page `#F5F7FA`, white `#FFFFFF`, soft blue `#EEF4FA`,
  muted `#F8FAFC`, dark `#0D1721` (gradient partner `#15242F`)
- Blue system: primary `#1769AA`, hover `#12578F`, active `#0E4776`,
  light `#DCEAF6`, extra-light `#F1F6FA`
- Text: black `#101820`, primary `#1D2935`, secondary `#5E6B76`,
  on-dark `#FFFFFF`, on-dark secondary `#B8C4CE`
- Borders: light `#DCE3E9`, medium `#BCC9D3`
- Category tints (blue-gray only): `#E5F0F8`, `#DCEAF6`, `#EDF3F7`,
  `#EEF1F4`, `#F1F6FA`, `#EAF1F6` — categories are differentiated by
  icon + label, not hue
- Resource fallback-panel colors (`dominantColor` in resources.json):
  `#1D4E79` (official), `#12578F` (community sites), `#0E4776` (tools),
  `#37444F` (books — neutral slate)
- Shadows: rgba(13, 23, 33, …) at 0.06 / 0.07 / 0.12

**Legacy variable names** (`--accent*`, `--surface-warm/mint/lavender`)
are retained as aliases into the blue/gray system so old class names
cannot reintroduce off-palette color.

## 3. Colors intentionally retained (status only)

Reserved for meaning, never decoration (all AA-checked):

- Success: `#27653F` on `#E7F4EC` (6.14:1) — form success
- Warning: `#75550E` on `#FFF4D8` (6.26:1) — paid-resource badges, cautions
- Error: `#9B3030` on `#FBE9E9` (6.27:1) — form errors
- YouTube thumbnails keep their original artwork (may contain red);
  the surrounding interface is blue/white/black/gray.

Status meaning is always paired with text labels, never color alone.

## 4. Contrast test results (WCAG 2.2 AA)

All checked programmatically (see git history for the script). Text
threshold 4.5:1; non-text 3:1. **32/32 pass**, including:

| Pair | Ratio |
|---|---|
| White on `#1769AA` (primary buttons, selected filters) | 5.77:1 |
| White on `#12578F` / `#0E4776` (hover/active) | 7.54 / 9.63:1 |
| `#101820` headings on all four light surfaces | 14.6–17.9:1 |
| `#1D2935` body on white / page / soft blue | 13.3–14.8:1 |
| `#5E6B76` metadata on white / muted / page | 5.1–5.5:1 |
| `#1769AA` links on white / page / soft blue | 5.2–5.8:1 |
| White on `#0D1721` dark sections | 18.1:1 |
| `#B8C4CE` secondary on dark | 10.2:1 |
| `#9FCBF2` / `#B9CFE3` links on dark | 10.6 / 11.3:1 |
| Official badge `#0E4776` on `#DCEAF6` | 7.86:1 |
| Free badge `#12578F` on `#EEF4FA` | 6.80:1 |
| Type badge `#45525D` on `#F1F3F5` | 7.21:1 |
| Recommended: white on `#101820` | 17.9:1 |
| Focus ring `#12578F` vs white / page | 7.5 / 7.0:1 |

## 5. Brand independence

- The Mass Tutoring interim cat mark is retained everywhere (nav,
  footer, hero, favicon, 404), recolored only within its own existing
  blue/near-black scheme to match the new tokens.
- Official College Board resources are labeled "Official College Board"
  and the official sections on the homepage and guide hub carry the
  note: *"These resources are provided by College Board. Mass Tutoring
  is an independent resource hub and is not affiliated with or endorsed
  by College Board."* The footer carries the standing disclaimer.
- No College Board logo, layout, illustration, or typography is used.

## 6. Where color lives

Everything routes through `:root` tokens in `assets/css/site.css`.
The only hex values outside the stylesheet are: the brand mark
(build.py / favicon / 404), resource `dominantColor` values
(resources.json), and the two hero illustrations (SVG in
src/pages/sat-guide/index.html and src/pages/tutoring.html) — all
drawn from the token palette above.
