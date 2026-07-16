---
'@spectrum-web-components/core': minor
---

**feat(dev-validation):** Added reusable dev-mode validation helpers (`validateEnum`, `warnIf`, `validateRequiredSlot`, `validateAllowedChildren`) in `@spectrum-web-components/core/utils`, and fixed `window.__swc.warn`'s dedup key so two distinct warnings on the same component no longer suppress each other.

Component authors should use these helpers instead of hand-rolled `includes()` + `window.__swc.warn()` checks for union/enum values, required and conditionally required properties, mutually exclusive/no-effect combinations, required slots, and allowed slotted children. See the "Reusable validation helpers" and "Slot validation" sections of the [Debug and validation style guide](https://github.com/adobe/spectrum-web-components/blob/main/CONTRIBUTOR-DOCS/02_style-guide/02_typescript/17_debug-validation.md).
