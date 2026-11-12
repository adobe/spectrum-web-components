---
'@adobe/spectrum-wc': minor
'@adobe/spectrum-wc-core': minor
---

**feat(radio-group, text-field):** Added `<swc-radio-group>` and `<swc-radio>`, and aligned `<swc-text-field>` with the shared form-field behavior.

- **Radio group**: Added `<swc-radio-group>` and `<swc-radio>`, the Spectrum 2 successors to `<sp-radio-group>` and `<sp-radio>`, with keyboard navigation and native form participation. Consumer action: see the radio group migration guide.
- **Text field**:
  - No longer reflects `disabled` or `readonly` attributes onto its host. Consumer action: style with `:state(disabled)` or `[field-status]` instead.
  - While `field-status="readonly"`, no longer sets native `required` or shows a necessity indicator, because a read-only field is barred from validation.
  - Corrected label spacing to the Spectrum 2 tokens: the necessity indicator and side-label gaps are smaller, and a side label now spans the description row.
