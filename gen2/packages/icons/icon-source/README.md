# Workflow icon source (S2 workflow icons)

Raw SVG source for the **public** workflow icons in `@adobe/spectrum-wc-icons`. These files are build inputs, not published artifacts. The generator turns them into the committed art in [`../src/`](../src/), and consumers never import from here.

## Refresh the icons

1. Download the Adobe-internal A4U **S2 Icon Global Set (Open Source)** SVGs (VPN required) into this folder. Keep the A4U filenames unchanged.
2. Run the generator from the repo root or from `gen2/packages/icons`:

   ```bash
   yarn generate:workflow-icons
   ```

3. Record the pulled set version and date in [`icon-source.json`](./icon-source.json).
4. Delete the raw SVGs and commit the regenerated `src/` and the updated metadata.

The raw `.svg` files are **git-ignored** and must not be committed. This folder stays tracked through this README and `icon-source.json` so the location is discoverable.

## What lives where

Paths are relative to `gen2/packages/icons/` unless they start with `gen2/`.

| Path                                                      | What                                                | Edit by hand? |
| --------------------------------------------------------- | --------------------------------------------------- | ------------- |
| `icon-source/*.svg`                                       | Raw A4U SVGs (git-ignored)                          | No, download  |
| `icon-source/icon-source.json`                            | Pulled A4U set, version, and date                   | Yes           |
| `scripts/generate-workflow-icons.mjs`                     | Workflow generator                                  | Yes           |
| `scripts/copy-icon-base-styles.mjs`                       | Copies the shared icon stylesheet from swc          | Yes           |
| `src/*.ts`                                                | Generated art, elements, barrels, and manifest      | No            |
| `src/stylesheets/icon-base.css`                           | Generated copy of swc's `_lit-styles/icon-base.css` | No            |
| `gen2/packages/swc/stylesheets/_lit-styles/icon-base.css` | Source of the icon stylesheet                       | Yes           |
| `gen2/packages/core/tools/icons/*.mjs`                    | Shared SVG cleanup, kebab-casing, license, banner   | Yes           |

The shared helpers are also used by the UI generator in swc. See [`core/tools/icons/README.md`](../../core/tools/icons/README.md).

## Naming convention

`S2_Icon_<LogicalName>_20_N.svg`

```
S2_Icon_Star_20_N.svg
S2_Icon_AddCircle_20_N.svg
S2_Icon_3DAsset_20_N.svg
```

Workflow icons ship **one drawing per icon** scaled to a token box, so there is no optical step. Every file carries the fixed `20` (a 20px source box) and `N` (normal) markers. The kebab-case tag suffix splits on acronym and camel boundaries: `AddCircle` becomes `swc-icon-add-circle` and `3DAsset` becomes `swc-icon-3d-asset`. See the [package README](../README.md#naming) for the full naming table.

## What the generator does

- Refuses to run if this folder has no SVGs, so a clean checkout can't wipe the committed art.
- Rewrites the A4U `var(--iconPrimary, …)` fill to `var(--swc-icon-color, currentColor)`, then cleans each SVG with SVGO (`preset-default` keeps the `viewBox`; `removeDimensions` drops `width` and `height` so the element sizes the box).
- Fails on a tag collision (two logical names mapping to the same `swc-icon-*` tag).
- Replaces every top-level module in `src/` with, per icon, an SVG-string function (`<Name>.ts`) and a custom element (`swc-icon-<kebab>.ts`), plus `index.ts`, `elements.ts`, and `manifest.ts`, then formats them with Prettier.
- Re-copies the shared stylesheet by running `yarn generate:icon-styles`.

## Icon stylesheet

The element styles (`src/stylesheets/icon-base.css`) are a generated copy of `gen2/packages/swc/stylesheets/_lit-styles/icon-base.css`. This package depends only on core, so it can't import from swc. To change icon styles:

1. Edit the swc source file, never the copy.
2. Run `yarn generate:icon-styles` from the repo root or `gen2/packages/icons`.
3. Commit both files.

`yarn build` in this package runs `yarn check:icon-styles` first and fails if the copy is out of date.

See the [icon strategy RFC](../../../../CONTRIBUTOR-DOCS/03_project-planning/05_strategies/icon-rfc.md), section 8, for the full pipeline.
