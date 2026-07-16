# Mass Tutoring — masstutoring.com

Free, student-created SAT resource hub with free peer tutoring. Live at
[www.masstutoring.com](https://www.masstutoring.com).

## How this repo works

The files at the repo root are the **built site**, served directly by GitHub
Pages (no Jekyll — see `.nojekyll`). The **source** lives in
[`masstutoring-redesign/`](masstutoring-redesign/):

```
masstutoring-redesign/
  build.py                zero-dependency static site builder
  src/
    layout.html           shared shell (header, nav, footer)
    data/resources.json   THE resource inventory — edit this to change the guide
    pages/                one file per page
  assets/                 css, js, fonts, favicon
  docs/                   maintenance guide, audits, verification log
  site/                   build output
```

## Making changes

1. Edit `masstutoring-redesign/src/` (for resources, edit
   `src/data/resources.json` — see `masstutoring-redesign/docs/MAINTENANCE.md`).
2. Build and copy the output to the repo root:

   ```sh
   cd masstutoring-redesign
   python3 build.py --check     # build + verify resource links
   cp -r site/. ..
   ```

3. Commit and push. GitHub Pages deploys the root automatically.

## Routes

The main pages are `/` (home), `/sat-guide/` (hub + 12 category pages),
`/tutoring/`, `/mission/`, `/faq/`, and `/accessibility/`. Legacy URLs
(`/guide/`, `/tutors/`, `/betterq/`) redirect to their replacements.
