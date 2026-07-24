# UI icons (internal)

The internal UI icon set: chevrons, checkmarks, arrows, and other control
internals. Not published for consumers; consumed by other swc components through the
`<swc-ui-icon>` element.

Contents:

- **`<swc-ui-icon>` element** (`UiIcon.ts` + `swc-ui-icon.ts`): takes `icon`, `size`,
  and `accessible-label`; maps the size to the numeral optical step and renders the
  matching template (no `unsafeSVG`). Host owns a11y: labeled → `role="img"`,
  unlabeled → `aria-hidden`.
- **`icon-set/`** — generated per-logical-icon bundles (`icon-set/<Name>.ts`), each a
  numeral-step to Lit `html` `TemplateResult` map for one logical icon (for example
  `Chevron`). `icon-set/index.ts` is the `UI_ICONS` registry, keyed by the kebab-case
  `icon` name. **Generated: do not hand-edit.**
- **`ui-icons.types.ts`** (hand-authored): `UiStep`, `UiIconArt`, `SIZE_TO_STEP`, and
  `uiStepFor`.

Source and generation:

- `icon-set/` is built from `../../svg-source/ui/` by `yarn generate:ui-icons`.
- The A4U set version is recorded in `../../svg-source/icon-source.json`.

Preview:

- The available icons and their optical sizes render in dev Storybook under
  **UI icons** (`stories/ui-icons.internal.stories.ts`, `ui-icons.internal.mdx`).
  The `.internal.*` files are excluded from the production Storybook build.
