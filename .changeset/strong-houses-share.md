---
'@spectrum-web-components/button': patch
---

**deprecate(button):** Mark 1st-gen `sp-button` properties and exports as deprecated ahead of 2nd-gen migration.

- `quiet` property: deprecated with `@deprecated` JSDoc and runtime `window.__swc.warn()`; use `treatment="outline"` instead
- `treatment` property: deprecated with `@deprecated` JSDoc; use `fill-style` in 2nd-gen
- `no-wrap` property: deprecated with `@deprecated` JSDoc; use `truncate` in 2nd-gen
- Type and const exports deprecated: `ButtonVariants`, `ButtonTreatments`, `ButtonStaticColors`, `DeprecatedButtonVariants`, `VALID_VARIANTS`, `VALID_STATIC_COLORS`
