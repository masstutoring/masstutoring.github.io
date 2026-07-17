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


# --------------------------------------------------- category visuals
# One visual language for every owned graphic: 2px strokes, blue on
# pale-blue, rounded corners, no text baked into the image (the card's
# own heading carries the information — graphics are aria-hidden).

def _viz(body):
    return ('<svg viewBox="0 0 220 130" fill="none" xmlns="http://www.w3.org/2000/svg" '
            'aria-hidden="true" focusable="false" '
            'stroke-linecap="round" stroke-linejoin="round">' + body + "</svg>")

CAT_VIZ = {
    # coordinate plane with a parabola
    "math": _viz('''
      <line x1="30" y1="108" x2="196" y2="108" stroke="#BCC9D3" stroke-width="2"/>
      <line x1="46" y1="16" x2="46" y2="120" stroke="#BCC9D3" stroke-width="2"/>
      <line x1="84" y1="104" x2="84" y2="112" stroke="#BCC9D3" stroke-width="2"/>
      <line x1="122" y1="104" x2="122" y2="112" stroke="#BCC9D3" stroke-width="2"/>
      <line x1="160" y1="104" x2="160" y2="112" stroke="#BCC9D3" stroke-width="2"/>
      <path d="M56 34 Q 112 178 178 26" stroke="#1769AA" stroke-width="3"/>
      <circle cx="117" cy="93" r="5" fill="#0E4776"/>
      <circle cx="170" cy="38" r="5" fill="#FFFFFF" stroke="#1769AA" stroke-width="2.5"/>'''),
    # passage with a highlighted phrase and an edit caret
    "rw": _viz('''
      <rect x="30" y="22" width="160" height="10" rx="5" fill="#DCEAF6"/>
      <rect x="30" y="44" width="126" height="10" rx="5" fill="#DCEAF6"/>
      <rect x="86" y="66" width="76" height="14" rx="7" fill="#1769AA" opacity="0.25"/>
      <rect x="30" y="68" width="48" height="10" rx="5" fill="#DCEAF6"/>
      <rect x="30" y="90" width="142" height="10" rx="5" fill="#DCEAF6"/>
      <path d="M88 86 q 20 8 38 0 q 18 -8 36 0" stroke="#1769AA" stroke-width="2.5" fill="none"/>
      <path d="M186 24 l10 10 M196 24 l-10 10" stroke="#0E4776" stroke-width="2.5"/>'''),
    # two curves meeting at an intersection point
    "desmos": _viz('''
      <line x1="24" y1="24" x2="24" y2="106" stroke="#BCC9D3" stroke-width="2"/>
      <line x1="24" y1="106" x2="198" y2="106" stroke="#BCC9D3" stroke-width="2"/>
      <path d="M32 100 C 80 96 120 60 190 28" stroke="#1769AA" stroke-width="3"/>
      <path d="M32 30 C 90 34 140 78 194 98" stroke="#0E4776" stroke-width="3"/>
      <circle cx="112" cy="65" r="6" fill="#FFFFFF" stroke="#1769AA" stroke-width="3"/>'''),
    # timed module: timer pill, answer rows, progress dots
    "practice": _viz('''
      <rect x="30" y="18" width="160" height="16" rx="8" fill="#DCEAF6"/>
      <rect x="146" y="21" width="40" height="10" rx="5" fill="#1769AA"/>
      <circle cx="44" cy="58" r="8" stroke="#1769AA" stroke-width="2.5" fill="#FFFFFF"/>
      <rect x="62" y="53" width="118" height="10" rx="5" fill="#DCEAF6"/>
      <circle cx="44" cy="86" r="8" fill="#1769AA"/>
      <path d="M40.5 86 l2.5 2.5 5 -5" stroke="#FFFFFF" stroke-width="2"/>
      <rect x="62" y="81" width="94" height="10" rx="5" fill="#DCEAF6"/>
      <circle cx="88" cy="112" r="4" fill="#1769AA"/>
      <circle cx="104" cy="112" r="4" fill="#1769AA"/>
      <circle cx="120" cy="112" r="4" fill="#BCC9D3"/>
      <circle cx="136" cy="112" r="4" fill="#BCC9D3"/>'''),
    # month grid with checked study days
    "plans": _viz('''
      <rect x="40" y="20" width="140" height="94" rx="10" stroke="#1769AA" stroke-width="2.5" fill="#FFFFFF"/>
      <line x1="40" y1="42" x2="180" y2="42" stroke="#1769AA" stroke-width="2.5"/>
      <rect x="54" y="54" width="20" height="14" rx="4" fill="#DCEAF6"/>
      <rect x="82" y="54" width="20" height="14" rx="4" fill="#1769AA"/>
      <rect x="110" y="54" width="20" height="14" rx="4" fill="#DCEAF6"/>
      <rect x="138" y="54" width="20" height="14" rx="4" fill="#DCEAF6"/>
      <rect x="54" y="78" width="20" height="14" rx="4" fill="#DCEAF6"/>
      <rect x="82" y="78" width="20" height="14" rx="4" fill="#DCEAF6"/>
      <rect x="110" y="78" width="20" height="14" rx="4" fill="#1769AA"/>
      <rect x="138" y="78" width="20" height="14" rx="4" fill="#0E4776"/>'''),
    # stacked video tiles with play marks
    "videos": _viz('''
      <rect x="56" y="34" width="130" height="76" rx="10" fill="#DCEAF6"/>
      <rect x="34" y="22" width="130" height="76" rx="10" fill="#FFFFFF" stroke="#1769AA" stroke-width="2.5"/>
      <circle cx="99" cy="60" r="18" fill="#1769AA"/>
      <path d="M94 51 l14 9 -14 9 z" fill="#FFFFFF"/>
      <rect x="42" y="106" width="80" height="8" rx="4" fill="#BCC9D3"/>'''),
    # shelf of book spines
    "books": _viz('''
      <rect x="38" y="30" width="20" height="76" rx="4" fill="#1769AA"/>
      <rect x="62" y="20" width="24" height="86" rx="4" fill="#FFFFFF" stroke="#1769AA" stroke-width="2.5"/>
      <rect x="90" y="36" width="18" height="70" rx="4" fill="#0E4776"/>
      <rect x="112" y="26" width="24" height="80" rx="4" fill="#DCEAF6" stroke="#1769AA" stroke-width="2"/>
      <rect x="140" y="40" width="20" height="66" rx="4" fill="#BCC9D3"/>
      <path d="M166 106 l0 -70 22 12 0 58" fill="#FFFFFF" stroke="#1769AA" stroke-width="2.5"/>
      <line x1="28" y1="108" x2="194" y2="108" stroke="#101820" stroke-width="3"/>'''),
    # shield with a check
    "official": _viz('''
      <path d="M110 18 l44 14 v34 c0 26 -20 40 -44 48 c-24 -8 -44 -22 -44 -48 v-34 z"
            fill="#DCEAF6" stroke="#1769AA" stroke-width="3"/>
      <path d="M92 64 l13 13 25 -26" stroke="#0E4776" stroke-width="4" fill="none"/>'''),
    # target with an arrow in the bull's-eye
    "strategy": _viz('''
      <circle cx="104" cy="66" r="44" stroke="#BCC9D3" stroke-width="2.5" fill="#FFFFFF"/>
      <circle cx="104" cy="66" r="28" stroke="#1769AA" stroke-width="2.5" fill="#DCEAF6"/>
      <circle cx="104" cy="66" r="10" fill="#0E4776"/>
      <line x1="104" y1="66" x2="152" y2="22" stroke="#101820" stroke-width="2.5"/>
      <path d="M152 22 l-14 2 M152 22 l-2 14" stroke="#101820" stroke-width="2.5"/>'''),
    # test-day checklist and clock
    "test-day": _viz('''
      <rect x="36" y="20" width="104" height="90" rx="10" fill="#FFFFFF" stroke="#1769AA" stroke-width="2.5"/>
      <rect x="66" y="12" width="44" height="16" rx="8" fill="#1769AA"/>
      <path d="M50 48 l6 6 10 -10" stroke="#0E4776" stroke-width="2.5"/>
      <rect x="74" y="44" width="52" height="8" rx="4" fill="#DCEAF6"/>
      <path d="M50 72 l6 6 10 -10" stroke="#0E4776" stroke-width="2.5"/>
      <rect x="74" y="68" width="42" height="8" rx="4" fill="#DCEAF6"/>
      <rect x="74" y="92" width="48" height="8" rx="4" fill="#DCEAF6"/>
      <circle cx="164" cy="82" r="26" fill="#DCEAF6" stroke="#1769AA" stroke-width="2.5"/>
      <path d="M164 68 v14 l10 6" stroke="#0E4776" stroke-width="2.5" fill="none"/>'''),
    # calm concentric arcs
    "wellness": _viz('''
      <path d="M60 96 a 50 50 0 0 1 100 0" stroke="#BCC9D3" stroke-width="2.5" fill="none"/>
      <path d="M74 96 a 36 36 0 0 1 72 0" stroke="#1769AA" stroke-width="2.5" fill="none"/>
      <path d="M88 96 a 22 22 0 0 1 44 0" stroke="#0E4776" stroke-width="2.5" fill="none"/>
      <circle cx="110" cy="96" r="6" fill="#1769AA"/>
      <line x1="46" y1="110" x2="174" y2="110" stroke="#BCC9D3" stroke-width="2.5"/>'''),
    # numbered route from start to goal
    "start-here": _viz('''
      <path d="M40 100 C 80 100 70 44 110 44 C 150 44 140 86 180 86"
            stroke="#BCC9D3" stroke-width="2.5" stroke-dasharray="1 9" fill="none"/>
      <circle cx="40" cy="100" r="12" fill="#1769AA"/>
      <circle cx="110" cy="44" r="12" fill="#FFFFFF" stroke="#1769AA" stroke-width="2.5"/>
      <circle cx="180" cy="86" r="12" fill="#FFFFFF" stroke="#BCC9D3" stroke-width="2.5"/>
      <path d="M180 74 l4 8 8 1 -6 6 2 9 -8 -5 -8 5 2 -9 -6 -6 8 -1 z"
            fill="#0E4776" transform="scale(0.62) translate(112 44)"/>'''),
}

def expand_catviz(content):
    return re.sub(r"<!--\s*catviz:\s*([a-z-]+)\s*-->",
                  lambda m: CAT_VIZ.get(m.group(1), ""), content)


# --------------------------------------------- fallback preview art
# Interface-style motifs for resources without a verified image (spec:
# "official logo on a designed preview" / "designed interface graphics").
# Drawn in white on the panel's brand color; decorative (aria-hidden).

def _art(body, vb="0 0 160 110"):
    return (f'<svg viewBox="{vb}" fill="none" xmlns="http://www.w3.org/2000/svg" '
            'stroke-linecap="round" stroke-linejoin="round">' + body + "</svg>")

FB_ART = {
    # filterable question bank: search, filter chips, question rows
    "qbank": _art('''
      <rect x="8" y="8" width="144" height="18" rx="9" fill="rgba(255,255,255,0.92)"/>
      <circle cx="20" cy="17" r="5" stroke="#1D4E79" stroke-width="2" fill="none"/>
      <line x1="24" y1="21" x2="28" y2="25" stroke="#1D4E79" stroke-width="2"/>
      <rect x="8" y="34" width="42" height="14" rx="7" fill="rgba(255,255,255,0.85)"/>
      <rect x="56" y="34" width="42" height="14" rx="7" fill="rgba(255,255,255,0.35)"/>
      <rect x="104" y="34" width="42" height="14" rx="7" fill="rgba(255,255,255,0.35)"/>
      <rect x="8" y="58" width="144" height="20" rx="6" fill="rgba(255,255,255,0.25)"/>
      <rect x="16" y="64" width="8" height="8" rx="2" fill="rgba(255,255,255,0.9)"/>
      <rect x="32" y="65" width="76" height="6" rx="3" fill="rgba(255,255,255,0.7)"/>
      <rect x="8" y="84" width="144" height="20" rx="6" fill="rgba(255,255,255,0.25)"/>
      <rect x="16" y="90" width="8" height="8" rx="2" fill="rgba(255,255,255,0.9)"/>
      <rect x="32" y="91" width="58" height="6" rx="3" fill="rgba(255,255,255,0.7)"/>'''),
    # digital testing app: timer, question, answer choices
    "testing": _art('''
      <rect x="8" y="8" width="144" height="14" rx="7" fill="rgba(255,255,255,0.25)"/>
      <rect x="110" y="11" width="36" height="8" rx="4" fill="rgba(255,255,255,0.9)"/>
      <rect x="8" y="32" width="112" height="7" rx="3.5" fill="rgba(255,255,255,0.7)"/>
      <rect x="8" y="45" width="88" height="7" rx="3.5" fill="rgba(255,255,255,0.5)"/>
      <rect x="8" y="62" width="144" height="18" rx="9" fill="rgba(255,255,255,0.9)"/>
      <circle cx="20" cy="71" r="5" stroke="#1D4E79" stroke-width="2" fill="none"/>
      <rect x="32" y="68" width="66" height="6" rx="3" fill="#1D4E79" opacity="0.55"/>
      <rect x="8" y="86" width="144" height="18" rx="9" fill="rgba(255,255,255,0.3)"/>
      <circle cx="20" cy="95" r="5" stroke="rgba(255,255,255,0.9)" stroke-width="2" fill="none"/>
      <rect x="32" y="92" width="50" height="6" rx="3" fill="rgba(255,255,255,0.7)"/>'''),
    # graphing calculator: grid, curve, intersection
    "graph": _art('''
      <line x1="12" y1="12" x2="12" y2="98" stroke="rgba(255,255,255,0.5)" stroke-width="2"/>
      <line x1="12" y1="98" x2="148" y2="98" stroke="rgba(255,255,255,0.5)" stroke-width="2"/>
      <line x1="46" y1="12" x2="46" y2="98" stroke="rgba(255,255,255,0.15)" stroke-width="1.5"/>
      <line x1="80" y1="12" x2="80" y2="98" stroke="rgba(255,255,255,0.15)" stroke-width="1.5"/>
      <line x1="114" y1="12" x2="114" y2="98" stroke="rgba(255,255,255,0.15)" stroke-width="1.5"/>
      <line x1="12" y1="40" x2="148" y2="40" stroke="rgba(255,255,255,0.15)" stroke-width="1.5"/>
      <line x1="12" y1="69" x2="148" y2="69" stroke="rgba(255,255,255,0.15)" stroke-width="1.5"/>
      <path d="M16 92 C 60 88 90 40 144 18" stroke="rgba(255,255,255,0.95)" stroke-width="3" fill="none"/>
      <path d="M16 22 C 66 28 108 70 144 88" stroke="rgba(255,255,255,0.55)" stroke-width="3" fill="none"/>
      <circle cx="86" cy="52" r="5.5" fill="#FFFFFF"/>'''),
    # practice test: score dial and module progress
    "ptest": _art('''
      <path d="M40 74 a 34 34 0 1 1 68 0" stroke="rgba(255,255,255,0.35)" stroke-width="8" fill="none"/>
      <path d="M40 74 a 34 34 0 0 1 50 -30" stroke="rgba(255,255,255,0.95)" stroke-width="8" fill="none"/>
      <circle cx="74" cy="74" r="5" fill="#FFFFFF"/>
      <rect x="24" y="90" width="112" height="9" rx="4.5" fill="rgba(255,255,255,0.3)"/>
      <rect x="24" y="90" width="64" height="9" rx="4.5" fill="rgba(255,255,255,0.9)"/>'''),
    # website: browser frame with content
    "browser": _art('''
      <rect x="8" y="8" width="144" height="96" rx="10" fill="rgba(255,255,255,0.14)"/>
      <circle cx="20" cy="20" r="3.5" fill="rgba(255,255,255,0.9)"/>
      <circle cx="32" cy="20" r="3.5" fill="rgba(255,255,255,0.6)"/>
      <circle cx="44" cy="20" r="3.5" fill="rgba(255,255,255,0.35)"/>
      <rect x="56" y="14" width="88" height="12" rx="6" fill="rgba(255,255,255,0.3)"/>
      <rect x="18" y="38" width="60" height="42" rx="6" fill="rgba(255,255,255,0.9)"/>
      <path d="M24 72 l12 -14 8 8 10 -12 12 18 z" fill="#1D4E79" opacity="0.5"/>
      <rect x="86" y="40" width="56" height="7" rx="3.5" fill="rgba(255,255,255,0.8)"/>
      <rect x="86" y="53" width="44" height="7" rx="3.5" fill="rgba(255,255,255,0.5)"/>
      <rect x="86" y="66" width="50" height="7" rx="3.5" fill="rgba(255,255,255,0.5)"/>
      <rect x="18" y="88" width="124" height="8" rx="4" fill="rgba(255,255,255,0.25)"/>'''),
    # registration and logistics: calendar with a marked date
    "calendar": _art('''
      <rect x="20" y="14" width="120" height="90" rx="10" fill="rgba(255,255,255,0.14)"/>
      <rect x="20" y="14" width="120" height="22" rx="10" fill="rgba(255,255,255,0.9)"/>
      <line x1="48" y1="8" x2="48" y2="22" stroke="rgba(255,255,255,0.95)" stroke-width="3"/>
      <line x1="112" y1="8" x2="112" y2="22" stroke="rgba(255,255,255,0.95)" stroke-width="3"/>
      <rect x="32" y="46" width="20" height="14" rx="4" fill="rgba(255,255,255,0.35)"/>
      <rect x="58" y="46" width="20" height="14" rx="4" fill="rgba(255,255,255,0.35)"/>
      <rect x="84" y="46" width="20" height="14" rx="4" fill="rgba(255,255,255,0.9)"/>
      <rect x="110" y="46" width="20" height="14" rx="4" fill="rgba(255,255,255,0.35)"/>
      <rect x="32" y="68" width="20" height="14" rx="4" fill="rgba(255,255,255,0.35)"/>
      <rect x="58" y="68" width="20" height="14" rx="4" fill="rgba(255,255,255,0.35)"/>
      <rect x="84" y="68" width="20" height="14" rx="4" fill="rgba(255,255,255,0.35)"/>
      <rect x="110" y="68" width="20" height="14" rx="4" fill="rgba(255,255,255,0.35)"/>
      <path d="M88 50 l4 4 8 -8" stroke="#1D4E79" stroke-width="2.5" fill="none"/>'''),
}

def art_kind(r):
    if r["id"] == "desmos-calculator":
        return "graph"
    if r["resourceType"] == "official-tool":
        return "testing"
    return {"question-bank": "qbank", "practice-test": "ptest",
            "website": "browser", "registration-resource": "calendar"}.get(r["resourceType"], "")

def fb_art(r):
    art = FB_ART.get(art_kind(r))
    return f'<span class="fb-art" aria-hidden="true">{art}</span>' if art else ""

# ------------------------------------------------------------- brand / logo
# Official logo integration (see docs/MAINTENANCE.md → "Official logo").
# Drop the approved asset at assets/logo/mass-tutoring-logo.png and rebuild:
# every brand slot switches from the interim mark to the official logo.
LOGO_FILE = ROOT / "assets" / "logo" / "mass-tutoring-logo.png"
LOGO_PRESENT = LOGO_FILE.exists()

INTERIM_MARK = '''<svg class="brand-mark" width="{s}" height="{s}" viewBox="0 0 64 64" aria-hidden="true" focusable="false">
  <circle cx="32" cy="32" r="30" fill="#FFFFFF" stroke="#1769AA" stroke-width="3" />
  <path d="M18 20 L24 30 L20 30 Z" fill="#101820" />
  <path d="M46 20 L40 30 L44 30 Z" fill="#101820" />
  <ellipse cx="32" cy="36" rx="15" ry="13" fill="#DCEAF6" />
  <circle cx="26" cy="33" r="2.4" fill="#101820" />
  <circle cx="38" cy="33" r="2.4" fill="#101820" />
  <path d="M30 40 Q32 42 34 40" stroke="#101820" stroke-width="1.8" fill="none" stroke-linecap="round" />
  <line x1="14" y1="37" x2="22" y2="36" stroke="#101820" stroke-width="1.4" />
  <line x1="14" y1="40" x2="22" y2="40" stroke="#101820" stroke-width="1.4" />
  <line x1="50" y1="37" x2="42" y2="36" stroke="#101820" stroke-width="1.4" />
  <line x1="50" y1="40" x2="42" y2="40" stroke="#101820" stroke-width="1.4" />
</svg>'''

BRANDING = ROOT / "assets" / "branding"

def build_brand_derivatives():
    """When the official mascot PNG exists, generate every site derivative:
    transparent background, tight crop, hero/standard/small sizes (PNG+WebP),
    and favicon crops. Never modifies the original file."""
    if not LOGO_PRESENT:
        return False
    try:
        from PIL import Image
    except ImportError:
        print("  ⚠ Pillow not installed — brand derivatives skipped (pip install pillow)")
        return False
    marker = BRANDING / ".generated-from"
    if marker.exists() and marker.read_text() == str(LOGO_FILE.stat().st_mtime):
        return True  # up to date
    BRANDING.mkdir(parents=True, exist_ok=True)
    src = Image.open(LOGO_FILE).convert("RGBA")
    (BRANDING / "mass-tutoring-cat-original.png").write_bytes(LOGO_FILE.read_bytes())

    # Remove ONLY the outer white background: flood-fill near-white pixels
    # connected to the border, so the cat's white chest/eyes are preserved.
    from collections import deque
    w, h = src.size
    px = src.load()
    seen = bytearray(w * h)
    q = deque()
    def near_white(p):
        return p[0] > 238 and p[1] > 238 and p[2] > 238
    for x in range(w):
        for y in (0, h - 1):
            if near_white(px[x, y]) and not seen[y * w + x]:
                seen[y * w + x] = 1; q.append((x, y))
    for y in range(h):
        for x in (0, w - 1):
            if near_white(px[x, y]) and not seen[y * w + x]:
                seen[y * w + x] = 1; q.append((x, y))
    while q:
        x, y = q.popleft()
        px[x, y] = (255, 255, 255, 0)
        for nx, ny in ((x+1,y),(x-1,y),(x,y+1),(x,y-1)):
            if 0 <= nx < w and 0 <= ny < h and not seen[ny * w + nx] and near_white(px[nx, ny]):
                seen[ny * w + nx] = 1; q.append((nx, ny))

    # tight crop with ~4% breathing room around ears/pencil/tail/feet
    bbox = src.getbbox()
    pad = max(2, int(0.04 * max(bbox[2] - bbox[0], bbox[3] - bbox[1])))
    crop = src.crop((max(0, bbox[0]-pad), max(0, bbox[1]-pad),
                     min(w, bbox[2]+pad), min(h, bbox[3]+pad)))
    crop.save(BRANDING / "mass-tutoring-cat-transparent.png")

    def emit(img, stem, size):
        im = img.copy(); im.thumbnail((size, size), Image.LANCZOS)
        im.save(BRANDING / f"{stem}.png")
        im.save(BRANDING / f"{stem}.webp", quality=92, method=6)
        return im.size
    emit(crop, "mass-tutoring-cat-hero", 900)
    emit(crop, "mass-tutoring-cat-standard", 500)
    emit(crop, "mass-tutoring-cat-small", 128)

    # favicon: head-and-glasses crop from the top of the artwork (no redraw)
    cw, ch = crop.size
    head = crop.crop((int(cw*0.24), 0, int(cw*0.92), int(ch*0.52)))
    side = max(head.size)
    sq = Image.new("RGBA", (side, side), (255, 255, 255, 0))
    sq.paste(head, ((side - head.size[0]) // 2, (side - head.size[1]) // 2), head)
    for s in (512, 192, 180, 48, 32, 16):
        f = sq.copy(); f.thumbnail((s, s), Image.LANCZOS)
        f.save(BRANDING / f"mass-tutoring-cat-favicon-{s}.png")
    marker.write_text(str(LOGO_FILE.stat().st_mtime))
    print(f"  ✔ Brand derivatives generated from {LOGO_FILE.name}")
    return True

BRAND_READY = build_brand_derivatives()

def brand_logo(size):
    """Brand image at a given rendered height. Empty alt: the wrapping link
    carries the accessible name (avoids duplicate announcements)."""
    if BRAND_READY:
        return (f'<img class="brand-logo" src="/assets/branding/mass-tutoring-cat-small.png" alt="" '
                f'width="{size}" height="{size}" decoding="async" style="object-fit:contain" />')
    return INTERIM_MARK.format(s=size)

def brand_mascot(size, cls="mascot-img"):
    """Larger mascot placement (guide/tutoring/mission/empty states)."""
    if BRAND_READY:
        return (f'<img class="{cls}" src="/assets/branding/mass-tutoring-cat-standard.png" alt="" '
                f'width="{size}" height="{size}" loading="lazy" decoding="async" style="object-fit:contain" />')
    return INTERIM_MARK.format(s=size)

def expand_brand(html):
    html = (html
            .replace("{{brand-logo-nav}}", brand_logo(38))
            .replace("{{brand-logo-footer}}", brand_logo(44))
            .replace("{{brand-logo-hero}}", brand_logo(28))
            .replace("{{brand-logo-mascot}}", brand_mascot(64))
            .replace("{{brand-mascot-medium}}", brand_mascot(220))
            .replace("{{brand-mascot-hero}}",
                      ('<img class="hero-mascot" src="/assets/branding/mass-tutoring-cat-hero.png" '
                       'alt="Mass Tutoring cat mascot holding a pencil" width="900" height="900" '
                       'fetchpriority="high" decoding="async" />') if BRAND_READY else ""))
    # conditional blocks: keep the logo branch only when the official art exists
    keep, drop = ("if-logo", "if-no-logo") if BRAND_READY else ("if-no-logo", "if-logo")
    html = re.sub(rf"<!--\s*{drop}\s*-->[\s\S]*?<!--\s*end-{drop}\s*-->", "", html)
    html = re.sub(rf"<!--\s*(end-)?{keep}\s*-->", "", html)
    if BRAND_READY:
        og = ""
        if (BRANDING / "og-image.png").exists():
            og = (f'<meta property="og:image" content="{SITE_ORIGIN}/assets/branding/og-image.png" />\n'
                  f'<meta property="og:image:width" content="1200" />\n'
                  f'<meta property="og:image:height" content="630" />\n'
                  f'<meta name="twitter:card" content="summary_large_image" />\n')
        html = html.replace(
            '<link rel="icon" href="/assets/favicon.svg" type="image/svg+xml" />',
            og +
            '<link rel="icon" href="/assets/branding/mass-tutoring-cat-favicon-32.png" sizes="32x32" type="image/png" />\n'
            '<link rel="icon" href="/assets/branding/mass-tutoring-cat-favicon-192.png" sizes="192x192" type="image/png" />\n'
            '<link rel="apple-touch-icon" href="/assets/branding/mass-tutoring-cat-favicon-180.png" />')
    return html


def badges_html(r, limit=3):
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
    return "\n        ".join(out[:limit])


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



BOOKMARK_ICON = ('<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" '
                 'stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'
                 '<path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/></svg>')
INFO_ICON = ('<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" '
             'stroke-width="2" stroke-linecap="round" aria-hidden="true">'
             '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>')

def card_actions(r):
    """Bookmark + info icon buttons — the card's only non-destination controls."""
    return (f'<div class="card-actions">'
            f'<button type="button" class="icon-btn" data-bookmark="{esc(r["id"])}" '
            f'data-name="{esc(r["name"])}" data-url="{esc(r["url"])}" aria-pressed="false" '
            f'aria-label="Save {esc(r["name"])} to My Study">{BOOKMARK_ICON}</button>'
            f'<button type="button" class="icon-btn" data-quickview="{esc(r["id"])}" '
            f'aria-haspopup="dialog" aria-label="Details for {esc(r["name"])}">{INFO_ICON}</button>'
            f'</div>')

def qv_src(r, include_book=False):
    """Inert quick-view payload; the drawer in site.js clones it on demand."""
    verb = "Open" if r["resourceType"] in ("official-tool", "website", "question-bank") else "Visit"
    bits = []
    mr = meta_row(r)
    if mr:
        bits.append(f'<p class="card-meta">{mr}</p>')
    if r.get("whyRecommended"):
        bits.append(f'<p class="card-why"><strong>Why we recommend it:</strong> {esc(r["whyRecommended"])}</p>')
    if r.get("accountRequired"):
        bits.append('<p class="card-note">Requires a free account.</p>')
    if r.get("limitations"):
        bits.append(f'<p class="card-limitations"><strong>Know before you go:</strong> {esc(r["limitations"])}</p>')
    if include_book:
        rows = [("Author", r.get("author")), ("Publisher", r.get("publisher")),
                ("Edition", r.get("edition")), ("Approximate price", r.get("approximatePrice"))]
        dl = "".join(f'<div class="book-detail"><dt>{esc(k)}</dt><dd>{esc(v)}</dd></div>'
                     for k, v in rows if v is not None)
        if dl:
            bits.append(f'<dl class="book-details">{dl}</dl>')
        if r.get("libraryRecommended"):
            bits.append('<p class="library-note">Check your school or local library before buying.</p>')
    bits.append(f'<p class="card-reviewed">Last reviewed <time datetime="{esc(r["dateLastReviewed"])}">{esc(fmt_date(r["dateLastReviewed"]))}</time></p>')
    bits.append(f'<p class="qv-action"><a class="button-primary" href="{esc(r["url"])}" target="_blank" rel="noopener">{esc(verb)} {esc(r["name"])}<span class="visually-hidden"> (opens in a new tab)</span></a></p>')
    body = "\n      ".join(bits)
    return (f'<template class="qv-src" data-qv-id="{esc(r["id"])}" data-qv-name="{esc(r["name"])}" '
            f'data-qv-creator="{esc(r.get("creator", r.get("author", "")))}">{body}</template>')


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
    color = (r.get("visual") or {}).get("dominantColor", "#1D4E79")
    dom = domain_of(r.get("url"))
    return f'''<span class="media-fallback" style="--fb:{esc(color)}" aria-hidden="true">
        {fb_art(r)}
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
        <div class="card-badges">{badges_html(r, limit=2)}</div>
        <p class="card-desc">{esc(r["description"])}</p>
        {card_actions(r)}
        {qv_src(r)}
      </div>
    </article>'''


def book_card(r, h):
    v = r.get("visual", {})
    aria = f"View the current edition of {r['name']} by {r.get('author', r.get('creator', ''))} (opens in a new tab)"
    if v.get("thumbnailUrl"):
        cover = f'<a class="book-cover" data-media href="{esc(r["url"])}" target="_blank" rel="noopener" aria-label="{esc(aria)}" tabindex="-1">{media_img(v, cls="cover-img")}<span class="media-cta" aria-hidden="true">View book ↗</span></a>'
    else:
        color = v.get("dominantColor", "#37444F")
        cover = f'''<a class="book-cover cover-designed" data-media href="{esc(r["url"])}" target="_blank" rel="noopener" aria-label="{esc(aria)}" tabindex="-1" style="--fb:{esc(color)}">
        <span aria-hidden="true" class="cover-text"><span class="cover-title">{esc(r["name"])}</span><span class="cover-author">{esc(r.get("author", ""))}</span><span class="cover-note">Designed preview — see current cover at the source</span></span>
        <span class="media-cta" aria-hidden="true">View book ↗</span></a>'''
    return f'''
    <article class="rcard book-card" {data_attrs(r)}>
      {cover}
      <div class="card-body">
        <h{h} class="card-title"><a href="{esc(r["url"])}" target="_blank" rel="noopener">{new_tab(r["name"])}</a></h{h}>
        <p class="card-creator">{esc(r.get("author", r.get("creator", "")))}</p>
        <div class="card-badges">{badges_html(r, limit=2)}</div>
        <p class="card-desc">{esc(r["description"])}</p>
        {card_actions(r)}
        {qv_src(r, include_book=True)}
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
        <div class="card-badges">{badges_html(r, limit=2)}</div>
        <p class="card-desc">{esc(r["description"])}</p>
        {card_actions(r)}
        {qv_src(r)}
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
        <div class="card-badges">{badges_html(r, limit=2)}</div>
        <p class="card-desc">{esc(r["description"])}</p>
        {card_actions(r)}
        {qv_src(r)}
      </div>
    </article>'''


def compact_card(r, h):
    aria = f"Open {r['name']} (opens in a new tab)"
    color = (r.get("visual") or {}).get("dominantColor", "#1D4E79")
    return f'''
    <article class="rcard compact-card" {data_attrs(r)}>
      <span class="compact-mark" style="--fb:{esc(color)}" aria-hidden="true">{esc(initials(r.get("creator") or r["name"]))}</span>
      <div class="card-body">
        <h{h} class="card-title"><a href="{esc(r["url"])}" target="_blank" rel="noopener" aria-label="{esc(aria)}">{new_tab(r["name"])}</a></h{h}>
        <p class="card-desc">{esc(r["description"])}</p>
        <div class="card-badges">{badges_html(r, limit=2)}</div>
      </div>
    </article>'''


def essential_card(r, h):
    """Compact homepage card: image, title, provider, description, two badges."""
    v = r.get("visual", {})
    verb = "Open" if r["resourceType"] in ("official-tool", "website", "question-bank") else "Visit"
    aria = f"{verb} {r['name']} (opens in a new tab)"
    kind = TYPE_LABELS.get(r["resourceType"], "Website")
    media_inner = media_img(v) if v.get("thumbnailUrl") else fallback_media(r, kind)
    return f'''
    <article class="rcard site-card essential-card" {data_attrs(r)}>
      <a class="card-media ratio-16x10" data-media href="{esc(r["url"])}" target="_blank" rel="noopener"
         aria-label="{esc(aria)}" tabindex="-1">
        {media_inner}
        <span class="media-cta" aria-hidden="true">{esc(verb)} resource ↗</span>
      </a>
      <div class="card-body">
        <h{h} class="card-title"><a href="{esc(r["url"])}" target="_blank" rel="noopener">{new_tab(r["name"])}</a></h{h}>
        <p class="card-creator">{esc(r.get("creator", ""))}</p>
        <div class="card-badges">{badges_html(r, limit=2)}</div>
        <p class="card-desc">{esc(r["description"].split(". ")[0].rstrip(".") + ".")}</p>
        {card_actions(r)}
        {qv_src(r)}
      </div>
    </article>'''


def card_html(r, h=3, variant="default"):
    if variant == "essential":
        return essential_card(r, h)
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
    content = expand_icons(expand_catviz(expand_markers(raw[m.end():].strip(), meta["path"])))

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

    # runtime data for the countdown, quick views, and My Study planner
    sat_dates = json.loads((SRC / "data" / "sat-dates.json").read_text())
    lite = [{"id": r["id"], "name": r["name"], "url": r["url"],
             "creator": r.get("creator", ""), "type": r["resourceType"],
             "subject": r.get("subject", "general"),
             "topics": r.get("topics", []), "cost": r.get("costType", "")}
            for r in PUBLISHED]
    (OUT / "assets" / "js" / "mt-data.js").write_text(
        "// generated by build.py — edit src/data/*.json, not this file\n"
        f"window.MT_SAT_SCHEDULE = {json.dumps(sat_dates)};\n"
        f"window.MT_RESOURCES = {json.dumps(lite)};\n")

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
