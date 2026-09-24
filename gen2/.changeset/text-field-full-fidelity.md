---
'@adobe/spectrum-wc-core': minor
'@adobe/spectrum-wc': minor
---

**feat(core, text-field):** Delivered the full-fidelity Spectrum 2 render and behavior for `swc-text-field`, building on the API, labelling, help-text, and form-association work already landed.

- **`@adobe/spectrum-wc`**: `swc-text-field` now ships its complete Spectrum 2 appearance and interaction — label, control wrapper, native `<input>`, `prefix` slot, trailing validation icon, and help text, with hover / focus / invalid / disabled states (including cascaded `<fieldset disabled>`). Sizes `s` / `m` / `l` / `xl`, no default width (fills its container) with label wrapping controllable via the `--swc-field-label-max-inline-size` custom property. Adds the `necessity-indicator` (`icon` | `label`) API, the non-interactive `prefix` slot, and text-selection delegation (`setSelectionRange()`, `select()`) to the native input. A single tab stop via `delegatesFocus`; clicking anywhere in the field (including the prefix) focuses the input.
- **`@adobe/spectrum-wc-core`**: shared form-field styling extracted to `_lit-styles/form-fields.css` for reuse across form components.
