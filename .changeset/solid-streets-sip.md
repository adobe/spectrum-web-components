---
'@spectrum-web-components/textfield': minor
---

**Added**: slotted visible label to resolve cross-root ARIA issues (Before: `<sp-field-label for="text">Label</sp-field-label><sp-textfield id="text"></sp-textfield>` / After: `<sp-textfield>Label</sp-textfield>`)
