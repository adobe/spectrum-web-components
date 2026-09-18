# UI icons

The Spectrum UI icon set: chevrons, checkmarks, arrows, and other control internals. Spectrum components render these through the `<swc-ui-icon>` element, and the element also ships in `@adobe/spectrum-wc` so consumers can use the same optically-tuned set directly.

Contents:

- **`<swc-ui-icon>` element** (`UiIcon.ts` + `swc-ui-icon.ts`): takes `icon`, `size`, and `accessible-label`; maps the size to the numeral optical step and renders the matching template (no `unsafeSVG`). Host owns a11y: labeled → `role="img"`, unlabeled → `aria-hidden`.
- **`icon-set/`:** generated per-logical-icon bundles (`icon-set/<Name>.ts`), each a numeral-step to Lit `html` `TemplateResult` map for one logical icon (for example `Chevron`). `icon-set/index.ts` is the `UI_ICONS` registry, keyed by the kebab-case `icon` name. **Generated: do not hand-edit.**
- **`ui-icons.types.ts`** (hand-authored): `UiStep`, `UiIconArt`, `SIZE_TO_STEP`, and `uiStepFor`.

Source and generation:

- `icon-set/` is built from `../../icon-source/ui/` by `yarn generate:ui-icons`.
- The A4U set version is recorded in `../../icon-source/icon-source.json`.

Documentation:

- The consumer docs page (usage, available icons, optical sizes, and accessibility) lives in `ui-icons.mdx`, backed by `stories/ui-icons.stories.ts`. It renders in Storybook under **UI icons**.
