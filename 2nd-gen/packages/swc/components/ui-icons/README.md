# UI icons (internal component)

The internal UI-icon component and its generated art. Not published for consumers;
consumed by other swc components to render control internals (chevrons, checkmarks,
arrows).

Contents:

- **`<swc-ui-icon>` element** (added in the functional phase): extends `IconBase`,
  takes `icon`, `size`, and `accessibleLabel`, maps `size` to the numeral step, and
  renders the matching template with no `unsafeSVG`.
- **Generated per-logical-icon bundles** (added by the generator): each exports a
  numeral-step to Lit `svg` `TemplateResult` map for one logical icon (for example
  `Chevron`). **Generated: do not hand-edit.**

Source and generation:

- Built from `../../svg-source/ui/` by the icon generator (a later step).
- The A4U set version is recorded in `../../svg-source/icon-source.json`.

This folder holds only this README until the generator and element land; functional
code is a later step.
