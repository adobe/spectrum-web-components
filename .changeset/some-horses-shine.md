---
'@spectrum-web-components/overlay': patch
'@spectrum-web-components/textfield': patch
'@spectrum-web-components/number-field': patch
---

**Added**: Added truncated-value tooltip behavior for single-line text inputs.

- `<sp-textfield>` now shows a tooltip with the full value when the displayed value is visually truncated.
- Tooltip placement can be controlled with the `tooltip-placement` attribute on `<sp-textfield>` or `<sp-number-field>`
- `<sp-number-field>` inherits the same truncation tooltip behavior from `TextfieldBase`, including formatted numeric/currency values.
- `type="password"` textfields no longer use ellipsis truncation styling (`text-overflow: clip`) to avoid awkward visual truncation.

**Changed**: `sp-overlay` (internal)

- Added internal property `describeTrigger` (`'auto' | 'none'`, default `'auto'`). When set to `'none'`, the overlay does not set `aria-describedby` on the trigger when open, avoiding double announcement for screen readers when the overlay content duplicates the trigger (e.g. truncated-value tooltips). Textfield’s truncated-value tooltip uses this so the tooltip is visual-only for a11y.
