---
'@adobe/spectrum-wc': minor
'@adobe/spectrum-wc-core': minor
---

**feat(radio-group, text-field):** Added `<swc-radio-group>` and `<swc-radio>`, and aligned `<swc-text-field>` with the shared form-field behavior.

- **Radio group**: Added `<swc-radio-group>` and `<swc-radio>`, the Spectrum 2 successors to `<sp-radio-group>` and `<sp-radio>`, with keyboard navigation and native form participation. Consumer action: see the radio group migration guide.
- **Text field**:
  - Stopped reflecting `disabled` and `readonly` attributes onto its host. Consumer action: style with `:state(disabled)` or `[field-status]` instead.
  - Removed native `required` and the necessity indicator while `field-status="readonly"`, because a read-only field is barred from validation.
  - Corrected label spacing to the Spectrum 2 tokens: the necessity indicator and side-label gaps are smaller, and a side label now spans the description row.
