# Official Mass Tutoring logo — DROP POINT

Place the approved logo file here, named exactly:

    mass-tutoring-logo.png

(the black cat with glasses holding a pencil, square, transparent or white
background — as supplied by the founders on 2026-07-15).

Then run `python3 build.py`. Every brand slot (navigation, footer, homepage
hero signature) switches to the official asset automatically; until the file
exists, the build prints a warning and renders the interim mark.

Rules (from the brand spec):
- Do NOT redraw, recolor, crop, stretch, filter, or animate the logo.
- Use it on white/pale backgrounds only; request an approved light variant
  before placing it on the dark footer if legibility is poor.
- Favicon: once the PNG is here, generate sizes with
  `sips -Z 64 mass-tutoring-logo.png --out favicon-64.png` and update
  src/layout.html to reference it.
