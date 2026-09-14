"""
Wandelt die Anzeigeschrift von OTF nach WOFF2 um.

Die Atmosphere-Grotesk-Dateien lagen als unkomprimiertes OTF im public-Ordner,
waehrend alle anderen Schriften bereits WOFF2 sind. WOFF2 ist dasselbe
Schriftformat mit Brotli-Kompression - gleiche Darstellung, deutlich kleiner
und damit frueher da. Das verkuerzt den sichtbaren Sprung von der System- auf
die Hausschrift.

Aufruf:  python scripts/otf-to-woff2.py
Benoetigt: pip install fonttools brotli
"""
import os
from fontTools.ttLib import TTFont

SOURCES = [
    "public/fonts/atmosphere/AtmosphereGrotesk-Bold.otf",
    "public/fonts/atmosphere/AtmosphereGrotesk-Regular.otf",
]

for src in SOURCES:
    dst = os.path.splitext(src)[0] + ".woff2"
    font = TTFont(src)
    font.flavor = "woff2"
    font.save(dst)
    before = os.path.getsize(src)
    after = os.path.getsize(dst)
    print("%-52s %6.1f KB -> %6.1f KB  (-%d%%)" % (
        os.path.basename(dst), before / 1024, after / 1024,
        round((1 - after / before) * 100),
    ))
