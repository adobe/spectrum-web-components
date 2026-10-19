# @adobe/spectrum-wc-icons

## 2.0.0-beta.5

### Minor Changes

- [#6733](https://github.com/adobe/spectrum-web-components/pull/6733) [`a452024`](https://github.com/adobe/spectrum-web-components/commit/a452024db3b745563105463b91384f1fad2fe1c8) Thanks [@caseyisonit](https://github.com/caseyisonit)! - Publish consumer documentation for the Spectrum 2 icon families and make UI icons deliverable.
  - **UI icons are now deliverable.** `<swc-ui-icon>` (chevrons, checkmarks, arrows, and other control internals) ships from `@adobe/spectrum-wc` with its own consumer docs page next to workflow icons, rather than being internal-only.
  - **Custom SVG contract documented.** The `<swc-icon>` frame now has a public docs page describing the contract for a slotted SVG: a single `<svg>` with a `viewBox`, no `width`/`height`, and `fill="currentColor"` so it follows text color and `--swc-icon-color`.
  - **Per-family usage docs** for UI icons and the `<swc-icon>` frame, plus the 1st-gen icon migration guide, are now part of the published Storybook build (previously excluded as internal-only pages).
  - **Removed the `elements/*` shared-template catalog.** `@adobe/spectrum-wc/icon` no longer re-exports the `elements/*` `TemplateResult` helpers. Slot a workflow icon (as its custom element) or your own SVG into `<swc-icon>` instead.
  - **Removed `--swc-close-button-icon-size` (breaking).** This documented `@cssprop` is gone from `<swc-close-button>`. The cross icon now sizes from the button's `size` attribute (forwarded to `<swc-ui-icon>`), keeping the box and the optical step in sync. Remove any `--swc-close-button-icon-size` override; use `size` to change the icon, and `--swc-close-button-size` to size the button box.
  - **Icon hosts now render `display: block` (breaking).** `<swc-icon>`, `<swc-ui-icon>`, and every workflow icon element previously rendered `inline-flex`. If you relied on an icon flowing inline with text, place it inside an inline or flex container.
  - **New workflow icons.** `AIMark` (`<swc-icon-ai-mark>`, `Icon_AIMark`) and `MoreVertical` (`<swc-icon-more-vertical>`, `Icon_MoreVertical`) ship from `@adobe/spectrum-wc-icons`, pulled from S2 Icon Global Set Open Source 7.2.0. The `Tag` icon artwork updates to match that set.

  The `@adobe/spectrum-wc-icons` change also moves the ambient `*.css` module declaration into `src/` so the package's generated type declarations resolve icon stylesheet imports cleanly.

### Patch Changes

- [#6821](https://github.com/adobe/spectrum-web-components/pull/6821) [`71cd416`](https://github.com/adobe/spectrum-web-components/commit/71cd4165c055d9c282a2d128d16a684c33cd4954) Thanks [@caseyisonit](https://github.com/caseyisonit)! - **fix(icons):** The element stylesheet (`stylesheets/icon-base.css`) is now a generated, verbatim copy of the shared `<swc-icon>` stylesheet in `@adobe/spectrum-wc`, so workflow icons can no longer drift from `<swc-icon>` and `<swc-ui-icon>`. The copy adds `box-sizing: border-box` to the inner `svg`, which has no visual effect. Contributors edit `gen2/packages/swc/stylesheets/_lit-styles/icon-base.css` and run `yarn generate:icon-styles`; the package build fails if the copy is out of date.

- Updated dependencies [[`47d8337`](https://github.com/adobe/spectrum-web-components/commit/47d8337520627732d7a758abd9c0d04275227444), [`c310499`](https://github.com/adobe/spectrum-web-components/commit/c3104990927a7927a5579a16380cd80eb3e96b6c)]:
  - @adobe/spectrum-wc-core@2.0.0-beta.5

## 2.0.0-beta.4

### Minor Changes

- [#6562](https://github.com/adobe/spectrum-web-components/pull/6562) [`f927ec3`](https://github.com/adobe/spectrum-web-components/commit/f927ec347b6a46f9857759b6830679d4cfdc5c14) - Add `@adobe/spectrum-wc-icons`, a new public package delivering the Spectrum 2 **workflow icons** (the icons consumers pick: star, folder, arrows, and the like).
  - **Two outputs per icon, neither coupling a consumer to Lit**: a per-icon custom element (`<swc-icon-star>`) that renders in any framework with zero ceremony, and a per-icon SVG-string function (`Icon_Star()`) as the framework-agnostic, tree-shakeable substrate (usable via `innerHTML`, React `dangerouslySetInnerHTML`, Vue `v-html`, or Lit `unsafeSVG`).
  - **API**: every element extends `IconBase`, so it carries `size` (`xs`–`xl`) and host-owned accessibility (`accessible-label` sets `role="img"` + `aria-label`; empty is decorative `aria-hidden`). Color follows CSS `color` with a `--swc-icon-color` override.
  - **Tree-shaking**: per-icon subpath exports (`@adobe/spectrum-wc-icons/swc-icon-star.js`, `@adobe/spectrum-wc-icons/Star.js`) mean an app ships only the icons it imports; a register-all `elements.js` and a `manifest.js` (name + tag list) are provided for galleries and pickers.
  - **Naming**: for an A4U logical name `<Name>`, the function is `Icon_`<Name>`()`, the element class `Icon`<Name>`, and the tag `swc-icon-`<kebab>` (`AddCircle` → `<swc-icon-add-circle>`, `3DAsset` → `<swc-icon-3d-asset>`).
  - **Generation, docs, and tests**: art is generated from the Adobe A4U S2 Icon Global Set (Open Source) by a workflow generator that reuses the shared `icon-source/utils/` cleanup; a custom-elements manifest is produced, a Storybook gallery previews the full set, and the package ships unit, accessibility, VRT, and tree-shaking coverage.

## 2.0.0-beta.3

### Minor Changes

- [#6562](https://github.com/adobe/spectrum-web-components/pull/6562) [`f927ec3`](https://github.com/adobe/spectrum-web-components/commit/f927ec347b6a46f9857759b6830679d4cfdc5c14) Add `@adobe/spectrum-wc-icons`, a new public package delivering the Spectrum 2 **workflow icons** (the icons consumers pick: star, folder, arrows, and the like).
  - **Two outputs per icon, neither coupling a consumer to Lit**: a per-icon custom element (`<swc-icon-star>`) that renders in any framework with zero ceremony, and a per-icon SVG-string function (`Icon_Star()`) as the framework-agnostic, tree-shakeable substrate (usable via `innerHTML`, React `dangerouslySetInnerHTML`, Vue `v-html`, or Lit `unsafeSVG`).
  - **API**: every element extends `IconBase`, so it carries `size` (`xs`–`xl`) and host-owned accessibility (`accessible-label` sets `role="img"` + `aria-label`; empty is decorative `aria-hidden`). Color follows CSS `color` with a `--swc-icon-color` override.
  - **Tree-shaking**: per-icon subpath exports (`@adobe/spectrum-wc-icons/swc-icon-star.js`, `@adobe/spectrum-wc-icons/Star.js`) mean an app ships only the icons it imports; a register-all `elements.js` and a `manifest.js` (name + tag list) are provided for galleries and pickers.
  - **Naming**: for an A4U logical name `<Name>`, the function is `Icon_`<Name>`()`, the element class `Icon`<Name>`, and the tag `swc-icon-`<kebab>` (`AddCircle` → `<swc-icon-add-circle>`, `3DAsset` → `<swc-icon-3d-asset>`).
  - **Generation, docs, and tests**: art is generated from the Adobe A4U S2 Icon Global Set (Open Source) by a workflow generator that reuses the shared `icon-source/utils/` cleanup; a custom-elements manifest is produced, a Storybook gallery previews the full set, and the package ships unit, accessibility, VRT, and tree-shaking coverage.
