# Mass Tutoring — Redesigned Site

The redesigned masstutoring.com: a **free, student-created SAT resource hub** with the
SAT Guide as the flagship feature and free tutoring as a secondary support service.

## Quick start

```bash
python3 build.py            # build the site into ./site
python3 build.py --check    # build + link-check every published resource URL
python3 serve.py            # preview at http://localhost:8642
```

No dependencies beyond Python 3 (preinstalled on macOS). Deploy by uploading the
contents of `site/` to any static host. The 404 page is `site/404.html` — configure
your host to serve it for missing paths.

## Project layout

```
build.py                  zero-dependency static site builder
serve.py                  local preview server (with custom 404 handling)
src/
  layout.html             shared shell: header, nav, footer, metadata
  data/resources.json     THE resource inventory — edit this to change the guide
  pages/                  one file per page (content only, wrapped by layout)
    index.html            homepage
    sat-guide/            the guide hub + 12 category pages
    tutoring.html, mission.html, faq.html, accessibility.html, 404.html
assets/
  css/site.css            light-theme design system
  js/site.js              mobile nav + guide search/filters (progressive enhancement)
docs/
  MAINTENANCE.md          how to add/edit/verify resources
  AUDIT.md                original-site audit and list of changes
  VERIFICATION-LOG.md     per-resource verification results
  ACCESSIBILITY-AUDIT.md  WCAG 2.2 AA test results and known limitations
```

## Editing resources (the common task)

1. Edit `src/data/resources.json` (see `docs/MAINTENANCE.md` for the field reference
   and the verification checklist — **verify before you publish**).
2. Run `python3 build.py --check`.
3. Fix anything the link checker flags, then deploy `site/`.

Resources appear automatically everywhere a page references them via
`<!-- resources: ... -->` markers. Set `"published": false` to pull a resource from
the public site without deleting its record.

## Site structure

| Route | Purpose |
|---|---|
| `/` | Homepage — guide-first hero, categories, pathways |
| `/sat-guide/` | Guide hub: search, filters, featured resources, full directory |
| `/sat-guide/start-here/` | New-student orientation and first steps |
| `/sat-guide/official/` | Official College Board resources (Question Bank featured) |
| `/sat-guide/math/`, `/sat-guide/reading-writing/`, `/sat-guide/desmos/` | Subject guides |
| `/sat-guide/practice/` | Practice sources + how to review tests |
| `/sat-guide/books/`, `/sat-guide/videos/` | Curated books and creators |
| `/sat-guide/study-plans/`, `/sat-guide/strategy/` | Plans and tactics |
| `/sat-guide/test-day/` | Registration, logistics, retakes, ACT-vs-SAT, score sending |
| `/sat-guide/wellness/` | Test anxiety and burnout |
| `/tutoring/` | Free tutoring (request + volunteer forms) |
| `/mission/`, `/faq/`, `/accessibility/` | About, FAQ, accessibility statement |

## Positioning rules (do not regress these)

- The SAT Guide is the primary product; tutoring is secondary support.
- No internal question bank (BetterQ was intentionally removed — link to official
  College Board practice instead).
- Never invent testimonials, statistics, prices, URLs, or creators. Placeholders
  beat fabrications.
- No score guarantees, no affiliate links, no "partner of College Board" claims.
- Free means free: label freemium/paid resources honestly.
