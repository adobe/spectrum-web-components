---
'@spectrum-web-components/picker': patch
---

**Fixed** issue where Picker component doesn't show label when value is set before menu-items are rendered. When menu-items are added later (e.g., conditionally rendered with Lit's `when()` directive or lazy loaded), the Picker now preserves the value and correctly displays the label once menu-items become available.

This fix ensures the value is preserved when `manageSelection()` runs before menu-items exist, allowing the value to be matched and the label to display correctly when menu-items are added.
