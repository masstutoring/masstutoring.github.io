#!/usr/bin/env python3
"""
MASS TUTORING — STATIC SITE BUILD (zero dependencies, Python 3.9+)

    python3 build.py          builds the site into ./site
    python3 build.py --check  also link-checks every published resource URL

Pages in src/pages/**/*.html are wrapped in src/layout.html; resource markers
are expanded into image-led cards from src/data/resources.json; assets are
copied; sitemap.xml + robots.txt are generated.

Front matter (first lines of each page):
  <!--meta {"title":"...","description":"...","path":"/x/","nav":"guide"} -->

Resource markers:
  <!-- resources: category=official -->                 field filters (AND)
  <!-- resources: ids=a,b,c -->                         explicit ordered list
  <!-- resources: all -->                               everything published
Options after a pipe:  | h4 compact       heading level and/or variant
  variants: feature (large), compact (small), default (full card)

See docs/MAINTENANCE.md for the editorial workflow.
"""

import html
import json
import re
import shutil
import sys
from datetime import date
from pathlib import Path

ROOT = Path(__file__).parent
SRC = ROOT / "src"
OUT = ROOT / "site"
SITE_ORIGIN = "https://www.masstutoring.com"

RESOURCES = json.loads((SRC / "data" / "resources.json").read_text())
PUBLISHED = [r for r in RESOURCES if r.get("published")]

esc = lambda s: html.escape(str(s), quote=True)

COST_BADGES = {
    "completely-free": ("badge-free", "Completely Free"),
    "freemium": ("badge-paid", "Free with Paid Options"),
    "free-trial": ("badge-paid", "Free Trial"),
    "paid": ("badge-paid", "Paid Resource"),
    "library-access": ("badge-free", "Library First"),
    "unknown": ("badge-paid", "Cost Unverified"),
}
TYPE_LABELS = {
    "official-tool": "Official tool", "website": "Website", "video": "Video",
    "channel": "YouTube channel", "book": "Book", "practice-test": "Practice tests",
    "question-bank": "Question bank", "article": "Article", "study-plan": "Study plan",
    "registration-resource": "Registration & logistics",
}
SUBJECT_LABELS = {"math": "Math", "reading-writing": "Reading & Writing",
                  "desmos": "Desmos", "general": "Both sections"}
DIFF_LABELS = {"beginner": "Beginner", "intermediate": "Intermediate",
               "advanced": "Advanced", "all-levels": "All levels"}
MONTHS = ["January", "February", "March", "April", "May", "June", "July",
          "August", "September", "October", "November", "December"]


def fmt_date(iso):
    y, m, d = (int(x) for x in iso.split("-"))
    return f"{MONTHS[m - 1]} {d}, {y}"


def initials(name):
    words = [w for w in re.split(r"[^A-Za-z0-9]+", name) if w]
    return "".join(w[0] for w in words[:2]).upper() or "MT"


def domain_of(url):
    m = re.match(r"https?://(?:www\.)?([^/]+)", url or "")
    return m.group(1) if m else ""




# ------------------------------------------------------------- icon family
# One consistent outline icon set (Lucide-style: 24px viewBox, stroke 2,
# round caps/joins, currentColor). Pages reference icons with
#   <!-- icon: name -->
ICON_PATHS = {
    "compass": '<circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>',
    "shield": '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>',
    "calculator": '<rect width="16" height="20" x="4" y="2" rx="2"/><line x1="8" x2="16" y1="6" y2="6"/><line x1="16" x2="16" y1="14" y2="18"/><path d="M16 10h.01"/><path d="M12 10h.01"/><path d="M8 10h.01"/><path d="M12 14h.01"/><path d="M8 14h.01"/><path d="M12 18h.01"/><path d="M8 18h.01"/>',
    "book-open": '<path d="M12 7v14"/><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/>',
    "chart": '<path d="M3 3v16a2 2 0 0 0 2 2h16"/><path d="m19 9-5 5-4-4-3 3"/>',
    "check-square": '<path d="m9 11 3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>',
    "video": '<path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5"/><rect x="2" y="6" width="14" height="12" rx="2"/>',
    "library": '<path d="m16 6 4 14"/><path d="M12 6v14"/><path d="M8 8v12"/><path d="M4 4v16"/>',
    "calendar": '<path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/>',
    "target": '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
    "backpack": '<path d="M4 10a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z"/><path d="M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"/><path d="M8 21v-5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v5"/>',
    "sun": '<circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>',
    "search": '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
}

def icon_svg(name, size=24):
    body = ICON_PATHS[name]
    return (f'<svg class="icon" width="{size}" height="{size}" viewBox="0 0 24 24" fill="none" '
            f'stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" '
            f'aria-hidden="true" focusable="false">{body}</svg>')

def expand_icons(content):
    return re.sub(r"<!--\s*icon:\s*([a-z-]+)\s*-->",
                  lambda m: icon_svg(m.group(1)), content)

# ------------------------------------------------------------- brand / logo
# Official logo integration (see docs/MAINTENANCE.md → "Official logo").
# Drop the approved asset at assets/logo/mass-tutoring-logo.png and rebuild:
# every brand slot switches from the interim mark to the official logo.
LOGO_FILE = ROOT / "assets" / "logo" / "mass-tutoring-logo.png"
LOGO_PRESENT = LOGO_FILE.exists()

INTERIM_MARK = '''<svg class="brand-mark" width="{s}" height="{s}" viewBox="0 0 64 64" aria-hidden="true" focusable="false">
  <circle cx="32" cy="32" r="30" fill="#FFFFFF" stroke="#347FC4" stroke-width="3" />
  <path d="M18 20 L24 30 L20 30 Z" fill="#16283A" />
  <path d="M46 20 L40 30 L44 30 Z" fill="#16283A" />
  <ellipse cx="32" cy="36" rx="15" ry="13" fill="#E3EEFB" />
  <circle cx="26" cy="33" r="2.4" fill="#16283A" />
  <circle cx="38" cy="33" r="2.4" fill="#16283A" />
  <path d="M30 40 Q32 42 34 40" stroke="#16283A" stroke-width="1.8" fill="none" stroke-linecap="round" />
  <line x1="14" y1="37" x2="22" y2="36" stroke="#16283A" stroke-width="1.4" />
  <line x1="14" y1="40" x2="22" y2="40" stroke="#16283A" stroke-width="1.4" />
  <line x1="50" y1="37" x2="42" y2="36" stroke="#16283A" stroke-width="1.4" />
  <line x1="50" y1="40" x2="42" y2="40" stroke="#16283A" stroke-width="1.4" />
</svg>'''

def brand_logo(size):
    """Brand image at a given rendered height. Empty alt: the wrapping link
    carries the accessible name (avoids duplicate announcements)."""
    if LOGO_PRESENT:
        return (f'<img class="brand-logo" src="/assets/logo/mass-tutoring-logo.png" alt="" '
                f'width="{size}" height="{size}" decoding="async" />')
    return INTERIM_MARK.format(s=size)

def expand_brand(html):
    return (html
            .replace("{{brand-logo-nav}}", brand_logo(38))
            .replace("{{brand-logo-footer}}", brand_logo(44))
            .replace("{{brand-logo-hero}}", brand_logo(28)))


def badges_html(r):
    # Max three badges on a card (spec: reduce badge overload). Account
    # requirements and other metadata live in the card's details disclosure.
    out = []
    if r["officialStatus"] == "college-board-official":
        out.append('<span class="badge badge-official">Official College Board</span>')
    elif r["officialStatus"] == "official-provider":
        out.append('<span class="badge badge-official">Official Practice Partner</span>')
    cls, label = COST_BADGES.get(r.get("costType", "unknown"), COST_BADGES["unknown"])
    out.append(f'<span class="badge {cls}">{esc(label)}</span>')
    if r.get("recommendationLabel"):
        out.append(f'<span class="badge badge-recommended">{esc(r["recommendationLabel"])}</span>')
    return "\n        ".join(out[:3])


def details_block(r, include_book=False):
    """Secondary information in a single expandable disclosure, keeping the
    default card scannable while preserving all data."""
    bits = []
    if r.get("whyRecommended"):
        bits.append(f'<p class="card-why"><strong>Why we recommend it:</strong> {esc(r["whyRecommended"])}</p>')
    mr = meta_row(r)
    if mr:
        bits.append(f'<p class="card-meta">{mr}</p>')
    if r.get("accountRequired"):
        bits.append('<p class="card-note">Requires a free account.</p>')
    if r.get("limitations"):
        bits.append(f'<p class="card-limitations"><strong>Know before you go:</strong> {esc(r["limitations"])}</p>')
    if include_book:
        rows = [("Author", r.get("author")), ("Publisher", r.get("publisher")),
                ("Edition", r.get("edition")), ("Approximate price", r.get("approximatePrice")),
                ("Practice tests included",
                 None if "includesPracticeTests" not in r else ("Yes" if r["includesPracticeTests"] else "No")),
                ("Answer explanations",
                 None if "includesAnswerExplanations" not in r else ("Yes" if r["includesAnswerExplanations"] else "No"))]
        dl = "".join(f'<div class="book-detail"><dt>{esc(k)}</dt><dd>{esc(v)}</dd></div>'
                     for k, v in rows if v is not None)
        if dl:
            bits.append(f'<dl class="book-details">{dl}</dl>')
        if r.get("libraryRecommended"):
            bits.append('<p class="library-note">Check your school or local library (and interlibrary loan) before buying. Used copies are fine if the edition is current.</p>')
    if not bits:
        return ""
    inner = "\n        ".join(bits)
    return (f'<details class="card-more"><summary>Why we recommend it &amp; details</summary>'
            f'<div class="card-more-body">{inner}</div></details>')


def meta_row(r):
    bits = [TYPE_LABELS.get(r["resourceType"], r["resourceType"])]
    if r.get("subject"):
        bits.append(SUBJECT_LABELS.get(r["subject"], r["subject"]))
    if r.get("difficulty"):
        bits.append(DIFF_LABELS.get(r["difficulty"], r["difficulty"]))
    if r.get("estimatedTime") and r["resourceType"] != "video":
        bits.append(r["estimatedTime"])
    return "".join(f'<span class="card-meta-item">{esc(b)}</span>' for b in bits)


def data_attrs(r):
    haystack = " ".join([r["name"], r.get("creator", ""), r["description"],
                         " ".join(r.get("topics", []))]).lower()
    return (f'data-resource\n      data-name="{esc(r["name"].lower())}"'
            f'\n      data-category="{esc(r["category"])}"'
            f'\n      data-subject="{esc(r.get("subject", ""))}"'
            f'\n      data-type="{esc(r["resourceType"])}"'
            f'\n      data-cost="{esc(r.get("costType", ""))}"'
            f'\n      data-official="{"no" if r["officialStatus"] == "third-party" else "yes"}"'
            f'\n      data-topics="{esc(" ".join(r.get("topics", [])))}"'
            f'\n      data-haystack="{esc(haystack)}"')


# ---------------------------------------------------------------- media blocks

def fallback_media(r, kind_label):
    """Designed branded preview panel for resources without a verified image."""
    color = (r.get("visual") or {}).get("dominantColor", "#2F609B")
    dom = domain_of(r.get("url"))
    return f'''<span class="media-fallback" style="--fb:{esc(color)}" aria-hidden="true">
        <span class="fb-mark">{esc(initials(r.get("creator") or r["name"]))}</span>
        <span class="fb-name">{esc(r["name"])}</span>
        {f'<span class="fb-domain">{esc(dom)}</span>' if dom else ''}
        <span class="fb-kind">{esc(kind_label)}</span>
      </span>'''


def media_img(v, cls="", eager=False):
    w = v.get("imageWidth")
    h = v.get("imageHeight")
    dims = f' width="{w}" height="{h}"' if w and h else ""
    loading = "eager" if eager else "lazy"
    # no-referrer: googleusercontent image CDNs reject hotlinks that carry a
    # Referer header (HTTP 429); omitting it is the documented-safe pattern.
    return (f'<img class="{cls}" src="{esc(v["thumbnailUrl"])}" alt="{esc(v.get("thumbnailAlt", ""))}"'
            f' loading="{loading}" decoding="async" referrerpolicy="no-referrer"{dims}'
            f' onerror="this.closest(\'[data-media]\').classList.add(\'media-error\')" />')


def new_tab(label):
    return f'{esc(label)}<span class="visually-hidden"> (opens in a new tab)</span>'


# ---------------------------------------------------------------- card variants

def video_card(r, h):
    v = r.get("visual", {})
    dur = v.get("duration") or r.get("estimatedTime", "")
    aria = f"Watch {r['name']} by {r.get('creator', '')} on YouTube (opens in a new tab)"
    thumb = media_img(v) if v.get("thumbnailUrl") else fallback_media(r, "Video")
    return f'''
    <article class="rcard video-card" {data_attrs(r)}>
      <a class="card-media ratio-16x9" data-media href="{esc(r["url"])}" target="_blank" rel="noopener"
         aria-label="{esc(aria)}" tabindex="-1">
        {thumb}
        <span class="play-badge" aria-hidden="true"><svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg></span>
        {f'<span class="duration-badge">{esc(dur)}</span>' if dur else ''}
        <span class="media-cta" aria-hidden="true">Watch video ↗</span>
      </a>
      <div class="card-body">
        <h{h} class="card-title"><a href="{esc(r["url"])}" target="_blank" rel="noopener">{new_tab(r["name"])}</a></h{h}>
        <p class="card-creator">{esc(r.get("creator", ""))}{f" · {esc(dur)}" if dur else ""}</p>
        <div class="card-badges">{badges_html(r)}</div>
        <p class="card-desc">{esc(r["description"])}</p>
        {details_block(r)}
        <p class="card-reviewed">Verified <time datetime="{esc(r["dateLastReviewed"])}">{esc(fmt_date(r["dateLastReviewed"]))}</time> · Captions available</p>
      </div>
    </article>'''


def book_card(r, h):
    v = r.get("visual", {})
    aria = f"View the current edition of {r['name']} by {r.get('author', r.get('creator', ''))} (opens in a new tab)"
    if v.get("thumbnailUrl"):
        cover = f'<a class="book-cover" data-media href="{esc(r["url"])}" target="_blank" rel="noopener" aria-label="{esc(aria)}" tabindex="-1">{media_img(v, cls="cover-img")}<span class="media-cta" aria-hidden="true">View book ↗</span></a>'
    else:
        color = v.get("dominantColor", "#946A2E")
        cover = f'''<a class="book-cover cover-designed" data-media href="{esc(r["url"])}" target="_blank" rel="noopener" aria-label="{esc(aria)}" tabindex="-1" style="--fb:{esc(color)}">
        <span aria-hidden="true" class="cover-text"><span class="cover-title">{esc(r["name"])}</span><span class="cover-author">{esc(r.get("author", ""))}</span><span class="cover-note">Designed preview — see current cover at the source</span></span>
        <span class="media-cta" aria-hidden="true">View book ↗</span></a>'''
    return f'''
    <article class="rcard book-card" {data_attrs(r)}>
      {cover}
      <div class="card-body">
        <h{h} class="card-title"><a href="{esc(r["url"])}" target="_blank" rel="noopener">{new_tab(r["name"])}</a></h{h}>
        <p class="card-creator">{esc(r.get("author", r.get("creator", "")))}</p>
        <div class="card-badges">{badges_html(r)}</div>
        <p class="card-desc">{esc(r["description"])}</p>
        {details_block(r, include_book=True)}
        <p class="card-reviewed">Last reviewed <time datetime="{esc(r["dateLastReviewed"])}">{esc(fmt_date(r["dateLastReviewed"]))}</time></p>
      </div>
    </article>'''


def creator_card(r, h):
    v = r.get("visual", {})
    aria = f"Open the {r['name']} YouTube channel (opens in a new tab)"
    avatar = (media_img(v, cls="creator-avatar") if v.get("thumbnailUrl")
              else f'<span class="creator-avatar avatar-fallback" aria-hidden="true">{esc(initials(r["name"]))}</span>')
    return f'''
    <article class="rcard creator-card" {data_attrs(r)}>
      <div class="creator-head">
        <a class="creator-avatar-link" data-media href="{esc(r["url"])}" target="_blank" rel="noopener" aria-label="{esc(aria)}" tabindex="-1">{avatar}</a>
        <div>
          <h{h} class="card-title"><a href="{esc(r["url"])}" target="_blank" rel="noopener">{new_tab(r["name"])}</a></h{h}>
          <p class="card-creator">YouTube channel</p>
        </div>
      </div>
      <div class="card-body creator-body">
        <div class="card-badges">{badges_html(r)}</div>
        <p class="card-desc">{esc(r["description"])}</p>
        {details_block(r)}
        <p class="card-reviewed">Last reviewed <time datetime="{esc(r["dateLastReviewed"])}">{esc(fmt_date(r["dateLastReviewed"]))}</time></p>
      </div>
    </article>'''


def website_card(r, h, variant="default"):
    v = r.get("visual", {})
    verb = "Open" if r["resourceType"] in ("official-tool", "website", "question-bank") else "Visit"
    aria = f"{verb} {r['name']} (opens in a new tab)"
    kind = TYPE_LABELS.get(r["resourceType"], "Website")
    media_inner = media_img(v) if v.get("thumbnailUrl") else fallback_media(r, kind)
    feature_cls = " feature-card" if variant == "feature" else ""
    return f'''
    <article class="rcard site-card{feature_cls}" {data_attrs(r)}>
      <a class="card-media ratio-16x10" data-media href="{esc(r["url"])}" target="_blank" rel="noopener"
         aria-label="{esc(aria)}" tabindex="-1">
        {media_inner}
        <span class="media-cta" aria-hidden="true">{esc(verb)} resource ↗</span>
      </a>
      <div class="card-body">
        <h{h} class="card-title"><a href="{esc(r["url"])}" target="_blank" rel="noopener">{new_tab(r["name"])}</a></h{h}>
        <p class="card-creator">{esc(r.get("creator", ""))}</p>
        <div class="card-badges">{badges_html(r)}</div>
        <p class="card-desc">{esc(r["description"])}</p>
        {details_block(r)}
        <p class="card-reviewed">Last reviewed <time datetime="{esc(r["dateLastReviewed"])}">{esc(fmt_date(r["dateLastReviewed"]))}</time></p>
      </div>
    </article>'''


def compact_card(r, h):
    aria = f"Open {r['name']} (opens in a new tab)"
    color = (r.get("visual") or {}).get("dominantColor", "#2F609B")
    return f'''
    <article class="rcard compact-card" {data_attrs(r)}>
      <span class="compact-mark" style="--fb:{esc(color)}" aria-hidden="true">{esc(initials(r.get("creator") or r["name"]))}</span>
      <div class="card-body">
        <h{h} class="card-title"><a href="{esc(r["url"])}" target="_blank" rel="noopener" aria-label="{esc(aria)}">{new_tab(r["name"])}</a></h{h}>
        <p class="card-desc">{esc(r["description"])}</p>
        <div class="card-badges">{badges_html(r)}</div>
      </div>
    </article>'''


def card_html(r, h=3, variant="default"):
    if variant == "compact":
        return compact_card(r, h)
    t = r["resourceType"]
    if t == "video":
        return video_card(r, h)
    if t == "book":
        return book_card(r, h)
    if t == "channel":
        return creator_card(r, h)
    return website_card(r, h, variant)


# ---------------------------------------------------------------- markers

def select_resources(expr):
    expr = expr.strip()
    if expr == "all":
        return PUBLISHED
    m = re.fullmatch(r"ids=([\w,-]+)", expr)
    if m:
        by_id = {r["id"]: r for r in PUBLISHED}
        return [by_id[i] for i in m.group(1).split(",") if i in by_id]
    clauses = [c.split("=", 1) for c in expr.split()]
    def match(r):
        for k, v in clauses:
            key = "resourceType" if k == "type" else k
            if k == "topic":
                if v not in r.get("topics", []):
                    return False
            elif str(r.get(key, "")) != v:
                return False
        return True
    return [r for r in PUBLISHED if match(r)]


def expand_markers(content, page_path):
    def repl(m):
        expr = m.group(1)
        opts = (m.group(2) or "").split()
        h = 3
        variant = "default"
        for o in opts:
            if re.fullmatch(r"h\d", o):
                h = int(o[1])
            else:
                variant = o
        rs = select_resources(expr)
        if not rs:
            print(f"  ⚠ no resources matched '{expr}' in {page_path}")
            return ""
        return "\n".join(card_html(r, h, variant) for r in rs)
    return re.sub(r"<!--\s*resources:\s*(.*?)\s*(?:\|\s*([^>]*?))?\s*-->", repl, content)


# ---------------------------------------------------------------- pages

def build_page(src_file, layout):
    raw = src_file.read_text()
    m = re.match(r"<!--meta\s+([\s\S]*?)-->", raw)
    if not m:
        raise SystemExit(f"Missing <!--meta ...--> front matter in {src_file}")
    meta = json.loads(m.group(1))
    content = expand_icons(expand_markers(raw[m.end():].strip(), meta["path"]))

    page = (layout
            .replace("{{title}}", esc(meta["title"]))
            .replace("{{description}}", esc(meta["description"]))
            .replace("{{path}}", meta["path"])
            .replace("{{canonical}}", SITE_ORIGIN + meta["path"])
            .replace("{{content}}", content))
    page = expand_brand(page)

    def nav_state(mo):
        key = mo.group(1)
        if key == meta.get("nav"):
            return f'data-nav="{key}" class="nav-link is-active" aria-current="page"'
        return f'data-nav="{key}" class="nav-link"'
    page = re.sub(r'data-nav="([a-z-]+)"', nav_state, page)

    if meta["path"] == "/404.html":
        out_path = OUT / "404.html"
    else:
        out_path = OUT / meta["path"].lstrip("/") / "index.html"
    out_path.parent.mkdir(parents=True, exist_ok=True)
    out_path.write_text(page)
    return meta


def link_check():
    # Uses curl (present on every Mac) because the system Python's TLS
    # stack is too old for some sites, e.g. collegeboard.org.
    import subprocess
    print("\nLink-checking published resource URLs…")
    failures = []
    urls = [(r["id"], r["url"]) for r in PUBLISHED if r.get("url")]
    urls += [(f'{r["id"]}:thumb', r["visual"]["thumbnailUrl"]) for r in PUBLISHED
             if (r.get("visual") or {}).get("thumbnailUrl")]
    for rid, url in urls:
        try:
            proc = subprocess.run(
                ["curl", "-sL", "-o", "/dev/null", "-w", "%{http_code}",
                 "-m", "25", "-A", "Mozilla/5.0", url],
                capture_output=True, text=True, timeout=40)
            status = int(proc.stdout.strip() or 0)
        except Exception as e:
            status = str(e)
        ok = isinstance(status, int) and 200 <= status < 400
        print(f"  {'✓' if ok else '✗'} [{status}] {rid}: {url}")
        if not ok:
            failures.append((rid, url, status))
    if failures:
        print(f"\n  {len(failures)} link(s) need attention:")
        for rid, url, status in failures:
            print(f"    - {rid} [{status}] {url}")
    else:
        print("  All resource links and thumbnails respond OK.")
    return failures


def main():
    if OUT.exists():
        shutil.rmtree(OUT)
    OUT.mkdir(parents=True)

    layout = (SRC / "layout.html").read_text()
    metas = []
    for f in sorted((SRC / "pages").rglob("*.html")):
        meta = build_page(f, layout)
        metas.append(meta)
        print(f"  ✓ {meta['path']}")

    shutil.copytree(ROOT / "assets", OUT / "assets")

    urls = "\n".join(f"  <url><loc>{SITE_ORIGIN}{m['path']}</loc></url>"
                     for m in metas if m["path"] != "/404.html")
    (OUT / "sitemap.xml").write_text(
        '<?xml version="1.0" encoding="UTF-8"?>\n'
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
        f"{urls}\n</urlset>\n")
    (OUT / "robots.txt").write_text(
        f"User-agent: *\nAllow: /\nSitemap: {SITE_ORIGIN}/sitemap.xml\n")

    if not LOGO_PRESENT:
        print("\n  ⚠ OFFICIAL LOGO MISSING: drop the approved asset at"
              "\n    assets/logo/mass-tutoring-logo.png and rebuild —"
              "\n    brand slots are using the interim mark until then.")

    held = [r for r in RESOURCES if not r.get("published")]
    if held:
        print(f"\n  ℹ {len(held)} unpublished resource(s) held for review:")
        for r in held:
            print(f"    - {r['id']} ({r.get('verificationStatus')})")

    missing_previews = [r["id"] for r in PUBLISHED
                        if not (r.get("visual") or {}).get("thumbnailUrl")]
    if missing_previews:
        print(f"\n  ℹ {len(missing_previews)} resource(s) using designed fallback previews:")
        print("    " + ", ".join(missing_previews))

    stale = [r for r in PUBLISHED
             if (date.today() - date.fromisoformat(r["dateLastReviewed"])).days > 180]
    if stale:
        print(f"\n  ⚠ {len(stale)} resource(s) not reviewed in 6+ months — re-verify them:")
        for r in stale:
            print(f"    - {r['id']} (last reviewed {r['dateLastReviewed']})")

    print(f"\nBuilt {len(metas)} pages → site/")

    if "--check" in sys.argv:
        link_check()


if __name__ == "__main__":
    main()
