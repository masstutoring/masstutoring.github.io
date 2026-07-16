# Mass Tutoring — masstutoring.com

Free peer-to-peer SAT tutoring, built by students, for students. Live at
[www.masstutoring.com](https://www.masstutoring.com).

## What's here

| File | Purpose |
| --- | --- |
| `index.html` | Site entry point: nav, footer, fonts, and the `#page-root` mount |
| `styles.css` | The full design system ("study binder": loose-leaf paper, scantron bubbles, highlighter accents) |
| `app.js` | Client-side renderer and router for the Home, Mission, Guide, and Practice pages |
| `data.js` | Content: 200 original SAT questions (100 Math, 100 Reading & Writing), testimonials, features, FAQs |
| `CNAME` | Custom domain for GitHub Pages |
| `betterq/`, `guide/`, `mission/`, `tutors/` | Legacy standalone pages |

## How it works

The site is a single-page app served by GitHub Pages. `app.js` renders each
page into `#page-root` and re-renders on navigation. The Practice page filters
`data.js` questions by subject, domain, and difficulty, grades answers
(multiple-choice via scantron-style bubbles, or free response), and shows a
worked solution with either the fastest Desmos move or a reusable strategy for
every question.

## Development

No build step. Serve the folder and open it:

```sh
python3 -m http.server 8000
# then visit http://localhost:8000
```
