# Fonts go here (one-time setup)

This sandbox can't reach Google's font CDN, so the two font families used by
the app aren't bundled in this drop. The app is built to run fully offline,
so the right move is to self-host them rather than link a CDN at runtime.

Grab these once, from a machine with normal internet access:

1. **Cormorant Garamond** — weights 500, 600, italic 500 — https://fonts.google.com/specimen/Cormorant+Garamond
2. **Inter** — weights 400, 500, 600 — https://fonts.google.com/specimen/Inter

Easiest path: use https://google-webfonts-helper.herokuapp.com (or the
`gwfh` CLI) to download `.woff2` files for exactly those weights, then drop
them in this folder as:

```
src/assets/fonts/
  cormorant-garamond-500.woff2
  cormorant-garamond-600.woff2
  cormorant-garamond-500-italic.woff2
  inter-400.woff2
  inter-500.woff2
  inter-600.woff2
```

The `@font-face` rules in `src/styles/globals.css` already point at these
exact filenames — nothing else to wire up. Until the files are added, the
app falls back to the system serif/sans stack, so it still looks reasonable.
