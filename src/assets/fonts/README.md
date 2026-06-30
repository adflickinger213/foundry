# Fonts (vendored)

These two families are self-hosted so the app runs fully offline — no CDN link
at runtime. The `@font-face` rules in `src/styles/globals.css` point at these
exact filenames.

| Family | Weights | Files |
|---|---|---|
| Cormorant Garamond | 500, 600, italic 500 | `cormorant-garamond-{500,600,500-italic}.woff2` |
| Inter | 400, 500, 600 | `inter-{400,500,600}.woff2` |

Both are licensed under the SIL Open Font License 1.1 (see `Cormorant-Garamond-OFL.txt`
and `Inter-OFL.txt`). The `.woff2` files are the `latin` subset.

## Refreshing / changing weights

The files were extracted from the `@fontsource/cormorant-garamond` and
`@fontsource/inter` npm packages. To regenerate or add a weight:

```bash
npm install --no-save @fontsource/cormorant-garamond @fontsource/inter
# copy node_modules/@fontsource/<family>/files/<family>-latin-<weight>-<style>.woff2
# into this folder, renamed to match the @font-face rules in globals.css
```

(Google Fonts directly, or https://gwfh.mranftl.com, are equivalent sources if
you have unrestricted internet access.)
