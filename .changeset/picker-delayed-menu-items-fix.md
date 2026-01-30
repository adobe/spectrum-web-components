---
'@spectrum-web-components/picker': patch
---

**Fixed** issue where Picker component doesn't show label when value is set before menu-items are rendered. When menu-items are added later (e.g., conditionally rendered with Lit's `when()` directive or lazy loaded), the Picker now preserves the value and correctly displays the label once menu-items become available.

This fix ensures the value is preserved when `manageSelection()` runs before menu-items exist or when items exist but don't have values yet (e.g., during async custom element upgrade). The value is only cleared when menu-items with meaningful values exist but none match the picker's value.
