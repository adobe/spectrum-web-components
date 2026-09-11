---
'@adobe/spectrum-wc-core': minor
'@adobe/spectrum-wc': minor
---

**feat(core, text-field):** Added `HelpTextMixin`, a Lit mixin that owns description/error-text rendering and accessible-description wiring for form fields, replacing the description/error-text half of the never-built `LabellingController` from the forms-strategy RFC. Companion to `LabellingMixin`.

- **`@adobe/spectrum-wc-core`**: adds `HelpTextMixin` (`/mixins`), which tracks the `description` and `error-text` slots and wires the role element's `ariaDescribedByElements`. Unlike accessible-name sources, description sources **combine**: a slotted `description` and the elements resolved from `accessibleDescribedby` are listed together, in-shadow description first, then external elements. Following React Spectrum's TextField strategy, an in-shadow `error-text` element is folded into that same `ariaDescribedByElements` list (after the description) only while the host reads as `invalid`, rather than being pointed at via `aria-errormessage`, since assistive-technology support for `aria-errormessage` is still inconsistent while `aria-describedby` is universally read. The mixin warns in development builds when `accessibleDescribedby` references an id that resolves to no element. Rendering is delegated to a new stateless directive, `renderFieldHelpText` (`/directives/render-help-text`). Both are documented in Storybook (Mixins → Help text mixin) with stories and tests.
- **`@adobe/spectrum-wc`**: `swc-text-field` now consumes `HelpTextMixin`: it renders the slotted `description`/`error-text` in its own shadow root and wires them onto the rendered `<input>`. Labelling (`LabellingMixin`) is tracked separately and not part of this change.
