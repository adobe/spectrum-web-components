# UI icon source (S2 UI icons)

Raw SVG source for the **internal** UI icons: chevrons, checkmarks, arrows, and other control internals rendered by `<swc-ui-icon>`. These files are build inputs, not published artifacts. The generator turns them into the committed art in [`../icon-set/`](../icon-set/), and consumers never import from here.

## Refresh the icons

1. Download the Adobe-internal A4U **S2 UI Icon Global Set** SVGs (VPN required) into this folder. Keep the A4U filenames unchanged.
2. Run the generator from the repo root or from `gen2/packages/swc`:

   ```bash
   yarn generate:ui-icons
   ```

3. Record the pulled set version and date in [`icon-source.json`](./icon-source.json).
4. Delete the raw SVGs and commit the regenerated `icon-set/` and the updated metadata.

The raw `.svg` files are **git-ignored** and must not be committed. This folder stays tracked through this README and `icon-source.json` so the location is discoverable.

## What lives where

Paths are relative to `gen2/packages/swc/components/ui-icons/` unless they start with `gen2/`.

| Path                                   | What                                              | Edit by hand? |
| -------------------------------------- | ------------------------------------------------- | ------------- |
| `icon-source/*.svg`                    | Raw A4U SVGs (git-ignored)                        | No, download  |
| `icon-source/icon-source.json`         | Pulled A4U set, version, and date                 | Yes           |
| `scripts/generate-ui-icons.mjs`        | UI generator                                      | Yes           |
| `icon-set/*.ts`                        | Generated art and `UI_ICONS` registry             | No            |
| `gen2/packages/core/tools/icons/*.mjs` | Shared SVG cleanup, kebab-casing, license, banner | Yes           |

The shared helpers are also used by the workflow generator in `@adobe/spectrum-wc-icons`. See [`core/tools/icons/README.md`](../../../../core/tools/icons/README.md).

## Naming convention

`S2_Icon_UI<LogicalName>_Size<numeralStep>_N.svg`

```
S2_Icon_UIChevron_Size50_N.svg
S2_Icon_UIChevron_Size75_N.svg
S2_Icon_UIChevron_Size100_N.svg
S2_Icon_UIChevron_Size200_N.svg
S2_Icon_UIChevron_Size300_N.svg
```

The generator groups files by `<LogicalName>`, collapsing all steps into one bundle (`Chevron`) keyed by numeral step. The `icon` attribute value is the kebab-case logical name (`chevron`, `corner-triangle`, `drag-handle`).

| Numeral step | `size` |
| ------------ | ------ |
| 50           | `xs`   |
| 75           | `s`    |
| 100          | `m`    |
| 200          | `l`    |
| 300          | `xl`   |

Not every logical icon ships every step. The element falls back to the nearest available step.

## What the generator does

- Refuses to run if this folder has no SVGs, so a clean checkout can't wipe the committed art.
- Rewrites the A4U `var(--iconPrimary, …)` fill to `var(--swc-icon-color, currentColor)`, then cleans each SVG with SVGO (`preset-default` keeps the `viewBox`; `removeDimensions` drops `width` and `height` so the element sizes the box).
- Replaces every module in `icon-set/` with one Lit `html` bundle per logical icon plus the `index.ts` registry, then formats them with Prettier.

See the [icon strategy RFC](../../../../../../CONTRIBUTOR-DOCS/03_project-planning/05_strategies/icon-rfc.md), section 8, for the full pipeline.
