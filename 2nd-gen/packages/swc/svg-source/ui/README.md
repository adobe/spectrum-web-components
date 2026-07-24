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

Upload the raw A4U files unchanged; the generator parses the native A4U filename:

`S2_Icon_UI<LogicalName>_Size<numeralStep>_N.svg`

```
S2_Icon_UIChevron_Size50_N.svg
S2_Icon_UIChevron_Size75_N.svg
S2_Icon_UIChevron_Size100_N.svg
S2_Icon_UIChevron_Size200_N.svg
S2_Icon_UIChevron_Size300_N.svg
…
```

The generator groups files by `<LogicalName>` (collapsing all steps into one
`Chevron` bundle keyed by numeral step). The `icon` attribute value the component
uses is the kebab-case logical name (`chevron`, `corner-triangle`, `drag-handle`).

### Numeral step to t-shirt size

| Numeral step | `size` |
| ------------ | ------ |
| 50           | `xs`   |
| 75           | `s`    |
| 100          | `m`    |
| 200          | `l`    |
| 300          | `xl`   |

Not every logical icon ships every step; the element falls back to the nearest
available step.

## What the generator does with these

Run `yarn generate:ui-icons` (from the swc package) after adding or updating SVGs.

- Cleans each SVG with SVGO (`preset-default` keeps the `viewBox`; `removeDimensions`
  drops `width`/`height` so the element sizes the box) and rewrites the A4U
  `var(--iconPrimary, …)` fill to `var(--swc-icon-color, currentColor)`.
- Emits per-logical-icon Lit `html` `TemplateResult` bundles to
  `../../components/ui-icons/icon-set/` (one `<Name>.ts` per icon, plus `index.ts`).
- The internal `<swc-ui-icon>` element (`icon`, `size`, `accessibleLabel`) maps
  `size` to the numeral step and renders the matching template, with no `unsafeSVG`.
