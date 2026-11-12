---
'@adobe/spectrum-wc': minor
'@adobe/spectrum-wc-core': minor
---

`Radio group` — Added `<swc-radio-group>` and `<swc-radio>`, the Spectrum 2 successors to `<sp-radio-group>` and `<sp-radio>`, with keyboard navigation and native form participation. Consumer action: see the radio group migration guide.

`Text field` — `<swc-text-field>` no longer reflects `disabled` or `readonly` attributes onto its host. Consumer action: style with `:state(disabled)` or `[field-status]` instead.

`Text field` — While `field-status="readonly"`, `<swc-text-field>` no longer sets native `required` or shows a necessity indicator, because a read-only field is barred from validation.
