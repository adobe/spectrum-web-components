---
'@spectrum-web-components/textfield': patch
'@spectrum-web-components/number-field': patch
---

**Added**: Added truncated-value tooltip behavior for single-line text inputs.

- `<sp-textfield>` now shows a tooltip with the full value when the displayed value is visually truncated.
- Tooltip placement can be controlled with the `tooltip-placement` attribute on `<sp-textfield>` or `<sp-number-field>`
- `<sp-number-field>` inherits the same truncation tooltip behavior from `TextfieldBase`, including formatted numeric/currency values.
