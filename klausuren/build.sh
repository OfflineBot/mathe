#!/usr/bin/env bash
# Baut alle 5 Klausur-PDFs.  Aufruf:  ./build.sh
# Erfordert: latexmk + pdflatex (TeX Live).
cd "$(dirname "$0")"
fail=0
for d in 01-diskrete-mathematik 02-optimierungsverfahren 03-lineare-algebra 04-numerik 05-analysis-2; do
  echo "=== $d ==="
  ( cd "$d" && latexmk -pdf -f -silent -interaction=nonstopmode klausur.tex >/dev/null 2>&1 ) || true
  if [ -f "$d/klausur.pdf" ]; then
    echo "  -> $d/klausur.pdf ($(stat -c%s "$d/klausur.pdf") bytes)"
  else
    echo "  ! FEHLER: $d/klausur.pdf nicht erstellt"
    fail=1
  fi
done
echo
echo "Fertig. Aufrauemen mit:  ./build.sh clean"
if [ "$1" = clean ]; then for d in 0*-*/; do (cd "$d" && latexmk -c klausur.tex >/dev/null); done; fi
exit $fail
