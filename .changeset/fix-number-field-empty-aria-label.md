---
'@spectrum-web-components/textfield': patch
---

- **Fixed**: `aria-label` on the internal `<input>` and `<textarea>` elements is now omitted when no label value is available, rather than being set to an empty string. An explicit `aria-label=""` was suppressing the accessible name for screen reader users, causing the field to be announced as "edit blank" even when a visible `<sp-field-label>` was associated. Resolves WCAG 2.5.3 (Label in Name) violation.
