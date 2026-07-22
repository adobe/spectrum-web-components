# UI icon source (S2 UI icons)

Raw SVG source for the **internal** UI icons (chevrons, checkmarks, arrows, and
other control internals). These files are committed build inputs for the icon
generator; they are not published and are never imported by consumers.

See the icon strategy RFC (`icon-rfc.md` at the repo root, section 8) for the full
pipeline.

## Where these come from

- **Set:** S2 UI Icon Global Set (Adobe-internal A4U).
- **How:** downloaded manually and committed here. A4U is a private registry, so it
  is never a dependency of this repo; only the SVGs live in the tree.
- Record the pulled set version in `../icon-source.json` on each refresh.

## Naming convention

One file per optical step, named `<LogicalName><numeralStep>.svg` in PascalCase:

```
Chevron50.svg
Chevron75.svg
Chevron100.svg
Chevron200.svg
Chevron300.svg
Checkmark75.svg
Checkmark100.svg
…
```

The generator groups files by logical name (collapsing `Chevron50/75/100/200/300`
into a single `Chevron` bundle) and emits the numeral-step-to-size map.

### Numeral step to t-shirt size

| Numeral step | `size` |
| --- | --- |
| 50 | `xs` |
| 75 | `s` |
| 100 | `m` |
| 200 | `l` |
| 300 | `xl` |

Not every logical icon ships every step; the element falls back to the nearest
available step.

## What the generator will do with these (later)

- Clean each SVG (SVGO with `removeViewBox: false`, strip `data-*`, prefix or strip
  ids), rewrite `fill` to `var(--swc-icon-color, currentColor)`, and keep a tight,
  square `viewBox`.
- Emit per-logical-icon Lit `svg` `TemplateResult` bundles to
  `../../components/ui-icons/`.
- The internal `<swc-ui-icon>` element (`icon`, `size`, `accessibleLabel`) maps
  `size` to the numeral step and renders the matching template, with no `unsafeSVG`.
