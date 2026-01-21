---
'@spectrum-web-components/table': patch
---

**Fixed**: Fixed accessibility violation (WCAG 4.1.2) where table checkbox inputs were missing accessible labels. The axe DevTools "Form elements must have labels" error is now resolved.

**Added**: `select-all-label` attribute to `<sp-table>` to customize the accessible label for the header "select all" checkbox. Defaults to "Select All".

**Added**: `label` property to `<sp-table-checkbox-cell>` for setting the accessible label on individual checkboxes.

**Added**: `itemLabel` function property to `<sp-table>` for virtualized tables, allowing custom accessible labels to be extracted from item data. Defaults to "Select row N".

**Changed**: For non-virtualized tables, body row checkboxes now automatically use the text content of the first `<sp-table-cell>` as their accessible label, with fallback to the row's `value` attribute.
