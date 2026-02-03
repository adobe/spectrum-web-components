---
'@spectrum-web-components/color-field': patch
---

**Fixed**: Color handle now positions correctly within the grid system for all label alignment variants (top, side-aligned start, and side-aligned end).

Previously, the color handle did not have proper CSS grid positioning when different label alignments were used. This fix adds a `.handle` class to the `sp-color-handle` element and implements CSS grid area positioning to ensure the handle displays in the correct location relative to the input field and label, improving visual consistency across all label configurations.
