# Official Mass Tutoring logo — DROP POINT

Place the approved logo file here, named exactly:

    mass-tutoring-logo.png

(the black cat with glasses holding a yellow pencil, square PNG on a white
background — as supplied by the founders.)

Then run `python3 build.py` (requires `pip install pillow`). The build
automatically:

1. Preserves the original untouched (assets/branding/mass-tutoring-cat-original.png)
2. Removes ONLY the outer white background (edge flood-fill — the cat's white
   chest, eyes, and highlights are preserved)
3. Crops with breathing room around ears, pencil, tail, and feet
4. Emits responsive derivatives in assets/branding/:
   hero (900px), standard (500px), small (128px) — PNG + WebP
5. Emits favicon head-crops at 512/192/180/48/32/16px
6. Switches every brand slot automatically: navigation lockup, footer,
   homepage hero (the cat becomes the hero's principal visual, replacing
   the interface panel), guide/tutoring/mission placements, empty states,
   and 404

**Inspect the transparent derivative at large and small sizes after the
first build** — if the edge quality is poor, keep the original on a pale
surface instead (delete assets/branding/ and the build falls back).

Rules (from the brand spec): never redraw, recolor, mirror, rotate,
stretch, filter, or place text over the artwork. All site versions must
be derivatives of the supplied file.
