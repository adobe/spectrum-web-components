# Icon source (S2 icons)

Raw SVG source for the icon generators, organized by icon family. These files are **build inputs**, not published artifacts: a generator converts them into the committed art bundles, and consumers never import from here.

See the icon strategy RFC (`CONTRIBUTOR-DOCS/03_project-planning/05_strategies/icon-rfc.md`, section 8) for the full pipeline.

## Families

| Folder      | Family                                  | Generator                 | Output                          | Status    |
| ----------- | --------------------------------------- | ------------------------- | ------------------------------- | --------- |
| `ui/`       | Internal UI icons (control internals)   | `yarn generate:ui-icons`  | `components/ui-icons/icon-set/` | Available |
| `workflow/` | Public workflow icons (consumer-facing) | (added in RFC Phases 3–4) | `@adobe/spectrum-wc-icons`      | Planned   |

Add a new family by creating its folder here and pointing its generator at it; the `icon-source.json` metadata and this README are shared across families. Family-agnostic generator helpers (SVG cleanup, kebab-casing, license and banner) live in `utils/`.

## Raw SVGs are not committed

The per-family folders (`ui/`, and later `workflow/`) are **git-ignored**. Downloaded source SVGs are transient: pull them in, run the generator, and the generated bundles are what live in version control. We do not let the raw assets persist after they have been generated and transformed. Only the tracked metadata (`icon-source.json`), the shared `utils/`, and this README remain here between refreshes.

To refresh a family: download its SVGs into the family folder, run the generator, then record the pulled set version in `icon-source.json`.

## Where these come from

- **Source:** Adobe-internal A4U icon sets (UI: S2 UI Icon Global Set; workflow: S2 Icon Global Set).
- **How:** downloaded manually. A4U is a private registry, so it is never a dependency of this repo; only the transient SVGs (locally) and the generated output (committed) exist in the tree.
- Record the pulled set version in `icon-source.json` on each refresh.

## Naming convention

Upload the raw A4U files unchanged; each generator parses the native A4U filename.

### UI icons (`ui/`)

`S2_Icon_UI<LogicalName>_Size<numeralStep>_N.svg`

```
S2_Icon_UIChevron_Size50_N.svg
S2_Icon_UIChevron_Size75_N.svg
S2_Icon_UIChevron_Size100_N.svg
S2_Icon_UIChevron_Size200_N.svg
S2_Icon_UIChevron_Size300_N.svg
…
```

The generator groups files by `<LogicalName>` (collapsing all steps into one `Chevron` bundle keyed by numeral step). The `icon` attribute value the component uses is the kebab-case logical name (`chevron`, `corner-triangle`, `drag-handle`).

#### Numeral step to t-shirt size

| Numeral step | `size` |
| ------------ | ------ |
| 50           | `xs`   |
| 75           | `s`    |
| 100          | `m`    |
| 200          | `l`    |
| 300          | `xl`   |

Not every logical icon ships every step; the element falls back to the nearest available step.

### Workflow icons (`workflow/`)

Naming and pipeline are defined when the workflow family lands (RFC Phases 3–4). Workflow icons ship one drawing per icon scaled to a token box, so they do not use the per-step numeral scale above.

## What the generators do

Run the family's generator (for UI icons, `yarn generate:ui-icons` from the swc package) after adding or updating that family's SVGs.

- Cleans each SVG with SVGO (`preset-default` keeps the `viewBox`; `removeDimensions` drops `width`/`height` so the element sizes the box) and rewrites the A4U `var(--iconPrimary, …)` fill to `var(--swc-icon-color, currentColor)`.
- Emits per-logical-icon Lit `html` `TemplateResult` bundles (UI icons) or per-icon elements and SVG-string functions (workflow icons) to the family's output above.
- For UI icons, the internal `<swc-ui-icon>` element (`icon`, `size`, `accessible-label`) maps `size` to the numeral step and renders the matching template, with no `unsafeSVG`.
