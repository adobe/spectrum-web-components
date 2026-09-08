---
'@adobe/spectrum-wc-core': minor
'@adobe/spectrum-wc': minor
---

**feat(core, text-field):** Added `LabellingMixin`, a Lit mixin that owns visible-label rendering and precedence-ordered accessible-name wiring for form fields, replacing the never-built `LabellingController` from the forms-strategy RFC.

- **`@adobe/spectrum-wc-core`**: adds `LabellingMixin` (`/mixins`), which wires three accessible-name sources in precedence order (highest first): `accessibleLabelledby` (resolved against the host's root node, written to the role element's `ariaLabelledByElements`), `accessibleLabel` (written to `aria-label`), and a slotted visible label (rendered as a real, same-root `<label for>`). Only the highest-precedence source that is actually set is wired; a lower-precedence slotted label still renders visually, just excluded from the accessible-name computation. The mixin warns in development builds when no accessible-name source resolves to anything, and separately warns when `accessibleLabel` is set alongside a visible label, since a differently-worded `accessibleLabel` would silently override it and risk a [WCAG 2.5.3 (Label in Name)](https://www.w3.org/WAI/WCAG22/Understanding/label-in-name.html) mismatch. Rendering is delegated to a new stateless directive, `renderFieldLabel` (`/directives/render-label`). Both are documented in Storybook (Mixins → Labelling mixin) with stories and tests.
- **`@adobe/spectrum-wc`**: `swc-text-field` now consumes `LabellingMixin` as its first proving-ground component: it renders a slotted `label` as a real `<label for>`, resolves `accessible-labelledby` to external elements, and wires the rendered `<input>` accordingly. Description/error-text association (`HelpTextMixin`) is tracked separately and not part of this change.
