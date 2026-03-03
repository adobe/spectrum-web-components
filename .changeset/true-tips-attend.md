---
'@spectrum-web-components/combobox': patch
---

**Fixed**: Align combobox slotted field label with standalone label and improve accessibility:

- Slotted native `<label>` now receives the same typography and spacing as standalone `sp-field-label` via `::slotted(label)` styling (preferred, most accessible pattern)
- Slotted `sp-field-label` and native label font sizes now match standalone; removed combobox overrides so the field-label mixin size scale applies consistently
- Switched combobox layout from flex to CSS Grid so the picker button stays aligned with the input row when a label is present
- Disabled combobox in forced-colors mode now uses `GrayText` for the label and picker button
- Stories updated to document preferred (slotted native `<label>`), alternative (sibling `sp-field-label`), and legacy (slotted `sp-field-label`) patterns
