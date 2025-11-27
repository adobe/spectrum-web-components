---
'@spectrum-web-components/combobox': minor
---

**Added**: slotted visible label to resolve cross-root ARIA issues (Before: `<sp-field-label for="combo">Label</sp-field-label><sp-combobox id="combo"></sp-combobox>` / After: `<sp-combobox><span slot="field-label">Label</span></sp-combobox>`)
